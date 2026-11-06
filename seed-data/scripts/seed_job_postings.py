#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Script tự động hóa seed 100 tin tuyển dụng (Job Postings) chất lượng cao vào hệ thống SmartHire qua API backend.
- Đọc thông tin các công ty đã tạo thành công từ result/result_company.json.
- Phân bổ 100 tin tuyển dụng từ dataset/job_postings_dataset.json ngẫu nhiên vào các công ty (cho phép công ty có 0, 1 hoặc nhiều JD).
- Nhóm các công việc theo tài khoản HR sở hữu công ty, đăng nhập HR lấy Bearer Token và gửi request tạo tin tuyển dụng.
- Đảm bảo 100% tuân thủ CreateJobPostingPayload, mức lương chuẩn VNĐ, deadline UTC, đầy đủ kỹ năng và ngành nghề.

Endpoints sử dụng:
  1. POST /api/v1/auth/login        -> Đăng nhập HR lấy Access Token
  2. POST /api/v1/job-postings      -> Tạo tin tuyển dụng mới (Bearer Token)
"""

import argparse
from datetime import datetime, timedelta, timezone
import json
import os
import random
import sys
import time
import uuid
from typing import Any, Dict, List, Optional, Tuple

# Cấu hình UTF-8 cho Windows Console tránh lỗi UnicodeEncodeError
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except AttributeError:
        pass

try:
    import requests
except ImportError:
    print("[ERROR] Thư viện 'requests' chưa được cài đặt. Vui lòng cài đặt bằng lệnh:")
    print("        pip install requests")
    sys.exit(1)


def load_json_file(file_path: str) -> Any:
    """Đọc dữ liệu từ file JSON an toàn."""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Không tìm thấy file: {file_path}")

    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    if isinstance(data, list):
        return data
    elif isinstance(data, dict):
        for key in ["details", "companies", "recruiters", "users", "data", "items", "jobs"]:
            if key in data and isinstance(data[key], list):
                return data[key]
        return data
    else:
        raise ValueError(f"Định dạng JSON trong {file_path} không hợp lệ.")


def login_hr(api_url: str, email: str, password: str, timeout: int = 10) -> Tuple[bool, Optional[str], Optional[str]]:
    """
    Đăng nhập tài khoản HR để lấy Access Token.
    Returns: (is_success, access_token, error_message)
    """
    endpoint = f"{api_url.rstrip('/')}/api/v1/auth/login"
    corr_id = str(uuid.uuid4())
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Correlation-ID": corr_id,
    }
    payload = {
        "email": email.strip().lower(),
        "password": password,
    }

    try:
        response = requests.post(endpoint, json=payload, headers=headers, timeout=timeout)
        try:
            body = response.json()
        except Exception:
            body = {"raw": response.text}

        if response.status_code in (200, 201):
            token = body.get("data", {}).get("accessToken")
            if token:
                return True, token, None
            return False, None, "Không tìm thấy accessToken trong response đăng nhập."
        else:
            err_msg = "Đăng nhập thất bại"
            if isinstance(body, dict):
                error_obj = body.get("error", {})
                if isinstance(error_obj, dict):
                    err_msg = error_obj.get("message") or error_obj.get("code") or str(error_obj)
            return False, None, f"HTTP {response.status_code}: {err_msg}"

    except requests.exceptions.RequestException as e:
        return False, None, f"Lỗi kết nối mạng khi đăng nhập: {str(e)}"


def create_job_posting(
    api_url: str,
    access_token: str,
    payload: Dict[str, Any],
    timeout: int = 15,
) -> Tuple[bool, int, Dict[str, Any], str]:
    """
    Gửi request tạo Job Posting kèm Bearer Token của HR sở hữu công ty.
    Returns: (is_success, status_code, response_body, correlation_id)
    """
    endpoint = f"{api_url.rstrip('/')}/api/v1/job-postings"
    corr_id = str(uuid.uuid4())
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": f"Bearer {access_token}",
        "X-Correlation-ID": corr_id,
    }

    try:
        response = requests.post(endpoint, json=payload, headers=headers, timeout=timeout)
        try:
            body = response.json()
        except Exception:
            body = {"raw": response.text}

        is_success = response.status_code in (200, 201)
        return is_success, response.status_code, body, corr_id

    except requests.exceptions.RequestException as e:
        return False, 0, {"error": str(e)}, corr_id


def format_currency(amount: Optional[int]) -> str:
    """Format số tiền VNĐ dễ đọc."""
    if amount is None:
        return "Thỏa thuận"
    return f"{amount:,.0f} đ".replace(",", ".")


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    default_dataset_dir = os.path.join(script_dir, "dataset")
    default_result_dir = os.path.join(script_dir, "result")

    parser = argparse.ArgumentParser(
        description="Script seed 100 tin tuyển dụng (Job Postings) phân bổ ngẫu nhiên vào các công ty qua API backend."
    )
    parser.add_argument(
        "--api-url",
        default="http://localhost:5190",
        help="Base URL của Backend API (mặc định: http://localhost:5190)",
    )
    parser.add_argument(
        "--recruiters-file",
        default=os.path.join(default_dataset_dir, "recruiters_sample.json"),
        help="Đường dẫn file tài khoản HR (mặc định: dataset/recruiters_sample.json)",
    )
    parser.add_argument(
        "--companies-file",
        default=os.path.join(default_result_dir, "result_company.json"),
        help="Đường dẫn file kết quả tạo công ty (mặc định: result/result_company.json)",
    )
    parser.add_argument(
        "--jobs-file",
        default=os.path.join(default_dataset_dir, "job_postings_dataset.json"),
        help="Đường dẫn file dataset 100 JD (mặc định: dataset/job_postings_dataset.json)",
    )
    parser.add_argument(
        "--output",
        default=os.path.join(default_result_dir, "result_job_postings.json"),
        help="Đường dẫn file JSON xuất kết quả (mặc định: result/result_job_postings.json)",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=0.15,
        help="Thời gian nghỉ (giây) giữa các request tạo job (mặc định: 0.15s)",
    )
    parser.add_argument(
        "--random-seed",
        type=int,
        default=42,
        help="Seed ngẫu nhiên để phân bổ JD vào các công ty có thể tái lập (mặc định: 42)",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=0,
        help="Giới hạn số lượng JD cần tạo để test thử (mặc định: 0 = tạo toàn bộ)",
    )

    args = parser.parse_args()

    print("=" * 80)
    print("🚀 BẮT ĐẦU SEED HÀNG LOẠT TIN TUYỂN DỤNG (JOB POSTINGS)")
    print("=" * 80)
    print(f"  - Backend API URL:    {args.api_url}")
    print(f"  - File tài khoản HR:  {args.recruiters_file}")
    print(f"  - File kết quả Cty:   {args.companies_file}")
    print(f"  - File dataset 100 JD:{args.jobs_file}")
    print(f"  - File kết quả xuất:  {args.output}")
    print(f"  - Random Seed:        {args.random_seed}")
    print("=" * 80)

    # 1. Đọc dữ liệu đầu vào
    try:
        raw_recruiters = load_json_file(args.recruiters_file)
        recruiters_map = {
            r.get("email", "").strip().lower(): r.get("password", "Password123@")
            for r in raw_recruiters
            if r.get("email")
        }
    except Exception as e:
        print(f"[ERROR] Không thể đọc file recruiters: {e}")
        sys.exit(1)

    try:
        raw_companies = load_json_file(args.companies_file)
        # Chỉ lấy các công ty đã tạo thành công và có companyId
        valid_companies = [
            c for c in raw_companies
            if c.get("status") in ("SUCCESS", "ALREADY_EXISTS") and c.get("companyId") and c.get("hrEmail")
        ]
        if not valid_companies:
            print("[ERROR] Không tìm thấy công ty nào hợp lệ trong file result_company.json!")
            sys.exit(1)
        print(f"📦 Đã tải {len(valid_companies)} doanh nghiệp hợp lệ để phân bổ JD.")
    except Exception as e:
        print(f"[ERROR] Không thể đọc file companies: {e}")
        sys.exit(1)

    try:
        jobs_dataset = load_json_file(args.jobs_file)
        if not isinstance(jobs_dataset, list) or len(jobs_dataset) == 0:
            print("[ERROR] File job_postings_dataset.json rỗng hoặc không đúng định dạng mảng!")
            sys.exit(1)
        print(f"📋 Đã tải {len(jobs_dataset)} tin tuyển dụng chi tiết từ dataset.")
    except Exception as e:
        print(f"[ERROR] Không thể đọc file dataset jobs: {e}")
        sys.exit(1)

    # Giới hạn số lượng nếu có cờ --limit
    if args.limit > 0:
        jobs_dataset = jobs_dataset[:args.limit]
        print(f"⚠️  Áp dụng giới hạn: Chỉ tạo {len(jobs_dataset)} tin tuyển dụng.")

    # 2. Phân bổ 100 JD ngẫu nhiên vào các công ty
    random.seed(args.random_seed)
    
    # Phân bổ ngẫu nhiên: Với mỗi JD, bốc ngẫu nhiên 1 công ty từ danh sách 100 công ty
    # Điều này cho phép một số công ty có 0 JD, một số có 1, 2, 3 JD đúng yêu cầu
    assignments: List[Dict[str, Any]] = []
    for job in jobs_dataset:
        assigned_company = random.choice(valid_companies)
        assignments.append({
            "job": job,
            "company": assigned_company,
        })

    # Thống kê phân bổ
    company_job_counts: Dict[str, int] = {}
    for item in assignments:
        cid = item["company"]["companyId"]
        company_job_counts[cid] = company_job_counts.get(cid, 0) + 1

    zero_jd_companies = len(valid_companies) - len(company_job_counts)
    print(f"\n📊 Thống kê phân bổ ngẫu nhiên:")
    print(f"  - Tổng số JD cần tạo:                   {len(assignments)}")
    print(f"  - Số công ty nhận JD (>= 1 JD):         {len(company_job_counts)} công ty")
    print(f"  - Số công ty không có JD nào (0 JD):    {zero_jd_companies} công ty")
    print(f"  - Số JD tối đa trên 1 công ty:          {max(company_job_counts.values()) if company_job_counts else 0} JD")

    # 3. Nhóm các JD cần tạo theo HR Email
    hr_grouped: Dict[str, List[Dict[str, Any]]] = {}
    for item in assignments:
        hr_email = item["company"]["hrEmail"].strip().lower()
        if hr_email not in hr_grouped:
            hr_grouped[hr_email] = []
        hr_grouped[hr_email].append(item)

    print(f"\n👥 Phân bổ qua {len(hr_grouped)} tài khoản HR phụ trách.")

    # 4. Tiến hành tạo Job Postings
    success_count = 0
    failed_count = 0
    results_summary: List[Dict[str, Any]] = []
    global_index = 0
    now_utc = datetime.now(timezone.utc)

    for hr_email, hr_items in hr_grouped.items():
        hr_password = recruiters_map.get(hr_email, "Password123@")
        print(f"\n🔑 Đăng nhập HR: {hr_email} (quản lý {len(hr_items)} tin tuyển dụng)...")

        is_logged_in, access_token, login_err = login_hr(args.api_url, hr_email, hr_password)
        if not is_logged_in or not access_token:
            print(f"  ❌ Đăng nhập thất bại: {login_err}. Bỏ qua {len(hr_items)} JD của HR này.")
            for it in hr_items:
                global_index += 1
                failed_count += 1
                results_summary.append({
                    "index": global_index,
                    "title": it["job"]["title"],
                    "companyId": it["company"]["companyId"],
                    "companyName": it["company"]["companyName"],
                    "hrEmail": hr_email,
                    "status": "FAILED_LOGIN",
                    "error": login_err,
                })
            continue

        print(f"  ✅ Đăng nhập thành công! Bắt đầu đăng tin tuyển dụng...")

        for sub_i, item in enumerate(hr_items, start=1):
            global_index += 1
            job_spec = item["job"]
            comp = item["company"]
            comp_id = comp["companyId"]
            comp_name = comp["companyName"]

            # Tính deadline UTC chuẩn kết thúc bằng 'Z'
            deadline_days = job_spec.get("deadlineDays", 45)
            deadline_dt = now_utc + timedelta(days=deadline_days)
            deadline_str = deadline_dt.strftime("%Y-%m-%dT%H:%M:%SZ")

            # Chuẩn bị payload khớp CreateJobPostingPayload
            salary_negotiable = bool(job_spec.get("salaryNegotiable", False))
            payload = {
                "companyId": comp_id,
                "title": job_spec["title"],
                "provinceId": job_spec["provinceId"],
                "wardId": None,
                "detailedLocation": job_spec.get("detailedLocation"),
                "experienceYears": int(job_spec.get("experienceYears", 0)),
                "jobLevel": job_spec.get("jobLevel", "Staff"),
                "educationLevel": job_spec.get("educationLevel", "Bachelor"),
                "vacancies": int(job_spec.get("vacancies", 1)),
                "workMode": job_spec.get("workMode", "Onsite"),
                "jobType": job_spec.get("jobType", "FullTime"),
                "description": job_spec["description"],
                "requirements": job_spec["requirements"],
                "benefits": job_spec.get("benefits"),
                "salaryMin": None if salary_negotiable else job_spec.get("salaryMin"),
                "salaryMax": None if salary_negotiable else job_spec.get("salaryMax"),
                "salaryNegotiable": salary_negotiable,
                "deadline": deadline_str,
                "industryIds": job_spec["industryIds"],
                "skillIds": job_spec["skillIds"],
            }

            salary_str = "Thỏa thuận" if salary_negotiable else f"{format_currency(job_spec.get('salaryMin'))} - {format_currency(job_spec.get('salaryMax'))}"

            is_ok, status_code, body, corr_id = create_job_posting(args.api_url, access_token, payload)

            if is_ok:
                job_id = body.get("data", {}).get("id") or "N/A"
                print(f"  [{global_index:03d}/{len(assignments):03d}] ✅ [THÀNH CÔNG] {job_spec['title']}")
                print(f"         🏢 Cty: {comp_name} | 💰 Lương: {salary_str} | ID: {job_id}")
                success_count += 1
                results_summary.append({
                    "index": global_index,
                    "jobPostingId": job_id,
                    "title": job_spec["title"],
                    "companyId": comp_id,
                    "companyName": comp_name,
                    "hrEmail": hr_email,
                    "status": "SUCCESS",
                    "statusCode": status_code,
                    "correlationId": corr_id,
                })
            else:
                err_msg = "Không xác định"
                if isinstance(body, dict):
                    err_obj = body.get("error", {})
                    if isinstance(err_obj, dict):
                        err_msg = err_obj.get("message") or err_obj.get("code") or str(err_obj)
                        if err_obj.get("details"):
                            err_msg += f" - Chi tiết: {json.dumps(err_obj.get('details'), ensure_ascii=False)}"
                    elif "error" in body:
                        err_msg = str(body.get("error"))
                    elif "raw" in body:
                        err_msg = body["raw"]

                print(f"  [{global_index:03d}/{len(assignments):03d}] ❌ [THẤT BẠI] {job_spec['title']}")
                print(f"         🏢 Cty: {comp_name} | HTTP {status_code} | Lỗi: {err_msg}")

                if "Company must be verified before posting jobs" in err_msg:
                    print("         ⚠️  LƯU Ý: Công ty chưa được duyệt! Hãy chạy script 'verify_all_companies.sql' trên DBeaver trước!")

                failed_count += 1
                results_summary.append({
                    "index": global_index,
                    "title": job_spec["title"],
                    "companyId": comp_id,
                    "companyName": comp_name,
                    "hrEmail": hr_email,
                    "status": "FAILED",
                    "statusCode": status_code,
                    "error": err_msg,
                    "correlationId": corr_id,
                })

            if args.delay > 0:
                time.sleep(args.delay)

    # 5. Xuất file báo cáo JSON
    try:
        report_data = {
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "totalProcessed": len(results_summary),
            "success": success_count,
            "failed": failed_count,
            "details": results_summary,
        }
        output_path = os.path.abspath(args.output)
        output_dir = os.path.dirname(output_path)
        if output_dir:
            os.makedirs(output_dir, exist_ok=True)

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(report_data, f, ensure_ascii=False, indent=2)
        print(f"\n📄 Báo cáo chi tiết đã được lưu tại: {output_path}")
    except Exception as e:
        print(f"\n⚠️  Không thể lưu file báo cáo: {e}")

    # 6. In tổng kết
    print("\n" + "=" * 80)
    print("📊 TỔNG KẾT KẾT QUẢ TẠO TIN TUYỂN DỤNG")
    print(f"  - Tổng số tin đã xử lý:    {len(results_summary)}")
    print(f"  - Đăng tin thành công:     {success_count} jobs")
    print(f"  - Thất bại / Lỗi dữ liệu:  {failed_count} jobs")
    print("=" * 80)


if __name__ == "__main__":
    main()

