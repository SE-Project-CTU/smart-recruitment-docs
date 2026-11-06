#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Script tạo hàng loạt doanh nghiệp (Companies) được phân bổ cho các tài khoản HR (Recruiter).
Mỗi tài khoản HR sẽ đăng nhập và khởi tạo một số lượng công ty nhất định (mặc định: 5 công ty/HR).
Tài khoản tạo công ty sẽ tự động trở thành Chủ sở hữu (Owner) của công ty đó.

Endpoints sử dụng:
  1. POST /api/v1/auth/login        -> Đăng nhập HR lấy Access Token
  2. POST /api/v1/companies         -> Tạo hồ sơ doanh nghiệp mới (Bearer Token)
"""

import argparse
import json
import os
import re
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
        for key in ["companies", "recruiters", "users", "data", "items", "accounts"]:
            if key in data and isinstance(data[key], list):
                return data[key]
        return data
    else:
        raise ValueError(f"Định dạng JSON trong {file_path} không hợp lệ (phải là mảng hoặc object chứa mảng).")


def normalize_phone(phone_input: Any) -> str:
    """
    Chuẩn hóa số điện thoại đáp ứng yêu cầu của Backend:
    - MinLength: 10, MaxLength: 11
    - Toàn bộ là chữ số (char.IsAsciiDigit)
    """
    if not phone_input:
        return "02439749999"

    digits = re.sub(r"\D", "", str(phone_input).strip())
    if len(digits) == 8:
        # Số tổng đài 1800/1900 8 chữ số -> thêm mã vùng 024 để thành 11 chữ số hợp lệ
        return "024" + digits
    elif len(digits) == 9:
        return "0" + digits
    elif 10 <= len(digits) <= 11:
        return digits
    elif len(digits) > 11:
        return digits[:11]
    else:
        return digits.ljust(10, "0")


def normalize_website(website_input: Any) -> Optional[str]:
    """
    Chuẩn hóa website thành absolute URL (có http:// hoặc https://)
    đáp ứng Uri.TryCreate(..., UriKind.Absolute) của Backend.
    """
    if not website_input:
        return None

    site = str(website_input).strip()
    if not site or site.lower() in ["none", "null", ""]:
        return None

    if not site.startswith(("http://", "https://")):
        return f"https://{site}"
    return site


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


def create_company(
    api_url: str,
    access_token: str,
    company_data: Dict[str, Any],
    timeout: int = 10,
) -> Tuple[bool, int, Dict[str, Any], str]:
    """
    Gửi request tạo công ty mới kèm Bearer Token của HR.
    Returns: (is_success, status_code, response_body, correlation_id)
    """
    endpoint = f"{api_url.rstrip('/')}/api/v1/companies"
    corr_id = str(uuid.uuid4())
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": f"Bearer {access_token}",
        "X-Correlation-ID": corr_id,
    }

    payload = {
        "name": company_data.get("name", "").strip(),
        "taxCode": re.sub(r"\s+", "", str(company_data.get("taxCode", ""))).strip(),
        "email": company_data.get("email", "").strip().lower(),
        "phone": normalize_phone(company_data.get("phone")),
        "address": company_data.get("address", "").strip(),
        "website": normalize_website(company_data.get("website")),
        "description": company_data.get("description", "").strip() or None,
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


def main():
    default_base_dir = os.path.dirname(os.path.abspath(__file__))
    default_hr_file = os.path.normpath(os.path.join(default_base_dir, "..", "seed-hr", "dataset", "recruiters_sample.json"))
    default_company_file = os.path.normpath(os.path.join(default_base_dir, "..", "..", "raw-data", "company.json"))

    parser = argparse.ArgumentParser(
        description="Script tự động phân bổ và tạo doanh nghiệp cho các tài khoản HR trong SmartHire."
    )
    parser.add_argument(
        "--hr-file", "-r",
        default=default_hr_file,
        help="Đường dẫn file JSON danh sách tài khoản HR (mặc định: seed-hr/dataset/recruiters_sample.json)"
    )
    parser.add_argument(
        "--company-file", "-c",
        default=default_company_file,
        help="Đường dẫn file JSON danh sách công ty (mặc định: raw-data/company.json)"
    )
    parser.add_argument(
        "--url", "-u",
        default="http://localhost:5190",
        help="Base URL của Backend API (mặc định: http://localhost:5190)"
    )
    parser.add_argument(
        "--companies-per-hr", "-n",
        type=int,
        default=5,
        help="Số lượng công ty mỗi HR phụ trách tạo (mặc định: 5)"
    )
    parser.add_argument(
        "--default-password", "-p",
        default="Password123@",
        help="Mật khẩu HR mặc định nếu không khai báo trong file (mặc định: Password123@)"
    )
    parser.add_argument(
        "--delay", "-d",
        type=float,
        default=0.2,
        help="Độ trễ nghỉ (giây) giữa mỗi request tạo công ty (mặc định: 0.2s)"
    )
    parser.add_argument(
        "--output", "-o",
        default="company_creation_report.json",
        help="File JSON xuất báo cáo chi tiết (mặc định: company_creation_report.json)"
    )

    args = parser.parse_args()

    print("=" * 75)
    print("🏢 BẮT ĐẦU QUÁ TRÌNH TẠO DOANH NGHIỆP TỰ ĐỘNG CHO HR")
    print(f"📁 File HR:          {args.hr_file}")
    print(f"📁 File Công ty:     {args.company_file}")
    print(f"🌐 Backend URL:      {args.url}")
    print(f"🎯 Phân bổ:          {args.companies_per_hr} công ty / mỗi tài khoản HR")
    print(f"⏱️  Độ trễ mỗi lần:   {args.delay}s")
    print("=" * 75)

    # 1. Tải danh sách HR
    try:
        hr_list = load_json_file(args.hr_file)
        print(f"ℹ️  Đã nạp {len(hr_list)} tài khoản HR.")
    except Exception as e:
        print(f"❌ [LỖI NẠP FILE HR] {e}")
        sys.exit(1)

    # 2. Tải danh sách Công ty
    try:
        company_list = load_json_file(args.company_file)
        print(f"ℹ️  Đã nạp {len(company_list)} doanh nghiệp từ file JSON.\n")
    except Exception as e:
        print(f"❌ [LỖI NẠP FILE CÔNG TY] {e}")
        sys.exit(1)

    if not hr_list:
        print("⚠️  Danh sách HR rỗng. Kết thúc.")
        sys.exit(0)

    if not company_list:
        print("⚠️  Danh sách Công ty rỗng. Kết thúc.")
        sys.exit(0)

    total_companies = len(company_list)
    total_hrs = len(hr_list)
    max_creatable = total_hrs * args.companies_per_hr

    print(f"📊 Dự kiến gán: {min(total_companies, max_creatable)}/{total_companies} công ty cho {total_hrs} HR.\n")

    success_count = 0
    skipped_count = 0
    failed_count = 0
    results_summary = []

    # 3. Duyệt từng HR và phân bổ công ty
    company_idx = 0

    for hr_idx, hr in enumerate(hr_list, start=1):
        if company_idx >= total_companies:
            print(f"\n⚠️  Đã hết danh sách công ty để phân bổ tại HR #{hr_idx}.")
            break

        hr_email = hr.get("email", "").strip()
        hr_name = hr.get("fullName") or hr.get("full_name") or hr.get("name") or "HR"
        hr_password = hr.get("password") or args.default_password

        if not hr_email:
            print(f"\n[{hr_idx}/{total_hrs}] ⚠️  Bỏ qua HR do thiếu email: {hr}")
            continue

        print(f"\n[{hr_idx}/{total_hrs}] 🔑 Đang đăng nhập HR: {hr_name} ({hr_email})...")
        login_ok, token, login_err = login_hr(args.url, hr_email, hr_password)

        if not login_ok or not token:
            print(f"    ❌ Đăng nhập thất bại: {login_err}. Bỏ qua HR này.")
            # Bỏ qua args.companies_per_hr công ty gán cho HR này
            company_idx += args.companies_per_hr
            continue

        print(f"    ✅ Đăng nhập thành công! Bắt đầu tạo {args.companies_per_hr} công ty:")

        # Tạo lần lượt N công ty cho HR này
        for sub_i in range(1, args.companies_per_hr + 1):
            if company_idx >= total_companies:
                break

            comp = company_list[company_idx]
            company_idx += 1
            comp_name = comp.get("name", "N/A")
            tax_code = comp.get("taxCode", "N/A")

            ok, status_code, body, corr_id = create_company(args.url, token, comp)

            if ok:
                created_id = body.get("data", {}).get("id", "N/A")
                print(f"    ({sub_i}/{args.companies_per_hr}) ✅ [TẠO THÀNH CÔNG] {comp_name} (MST: {tax_code}) | ID: {created_id}")
                success_count += 1
                results_summary.append({
                    "hrEmail": hr_email,
                    "companyName": comp_name,
                    "taxCode": tax_code,
                    "status": "SUCCESS",
                    "statusCode": status_code,
                    "companyId": created_id,
                    "correlationId": corr_id,
                })
            elif status_code == 409:
                # Xung đột Tax code đã tồn tại
                print(f"    ({sub_i}/{args.companies_per_hr}) ⚠️  [ĐÃ TỒN TẠI - BỎ QUA] {comp_name} (MST: {tax_code}) | Mã: 409 Conflict")
                skipped_count += 1
                results_summary.append({
                    "hrEmail": hr_email,
                    "companyName": comp_name,
                    "taxCode": tax_code,
                    "status": "ALREADY_EXISTS",
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
                            err_msg += f" - Chi tiết: {err_obj.get('details')}"
                    elif "error" in body:
                        err_msg = str(body.get("error"))
                    elif "raw" in body:
                        err_msg = body["raw"]

                print(f"    ({sub_i}/{args.companies_per_hr}) ❌ [THẤT BẠI] {comp_name} (MST: {tax_code}) | HTTP {status_code} | Lỗi: {err_msg}")
                failed_count += 1
                results_summary.append({
                    "hrEmail": hr_email,
                    "companyName": comp_name,
                    "taxCode": tax_code,
                    "status": "FAILED",
                    "statusCode": status_code,
                    "error": err_msg,
                    "correlationId": corr_id,
                    "response": body,
                })

            if args.delay > 0:
                time.sleep(args.delay)

    # 4. Xuất file báo cáo JSON
    try:
        report_data = {
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "totalProcessed": len(results_summary),
            "success": success_count,
            "alreadyExists": skipped_count,
            "failed": failed_count,
            "details": results_summary,
        }
        with open(args.output, "w", encoding="utf-8") as f:
            json.dump(report_data, f, ensure_ascii=False, indent=2)
        print(f"\n📄 Báo cáo chi tiết đã được lưu tại: {args.output}")
    except Exception as e:
        print(f"\n⚠️  Không thể lưu file báo cáo: {e}")

    # 5. In tổng kết
    print("\n" + "=" * 75)
    print("📊 TỔNG KẾT KẾT QUẢ TẠO DOANH NGHIỆP")
    print(f"  - Tổng số doanh nghiệp đã xử lý: {len(results_summary)}")
    print(f"  - Tạo mới thành công:            {success_count} công ty")
    print(f"  - Đã tồn tại trước đó (bỏ qua):  {skipped_count} công ty")
    print(f"  - Thất bại / Lỗi dữ liệu:        {failed_count} công ty")
    print("=" * 75)


if __name__ == "__main__":
    main()

