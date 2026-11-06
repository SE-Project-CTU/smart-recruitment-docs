#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Script tạo hàng loạt tài khoản HR (Recruiter) từ file JSON cho SmartHire Backend.
Endpoint sử dụng: POST /api/v1/auth/register/recruiter
"""

import argparse
import json
import os
import sys
import time
import uuid
from typing import Any, Dict, List, Optional

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


def load_recruiters_from_json(file_path: str) -> List[Dict[str, Any]]:
    """Đọc dữ liệu từ file JSON, hỗ trợ định dạng danh sách [...] hoặc object bọc {"recruiters": [...]}"""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Không tìm thấy file: {file_path}")

    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    if isinstance(data, list):
        return data
    elif isinstance(data, dict):
        # Hỗ trợ các key phổ biến
        for key in ["recruiters", "users", "data", "items", "accounts"]:
            if key in data and isinstance(data[key], list):
                return data[key]
        raise ValueError(
            "Cấu trúc JSON object không hợp lệ. Vui lòng cung cấp mảng [ {...} ] "
            "hoặc object có chứa key 'recruiters' / 'data' dạng mảng."
        )
    else:
        raise ValueError("Nội dung file JSON phải là một mảng hoặc object chứa mảng danh sách.")


def validate_local_record(record: Dict[str, Any], index: int, default_password: Optional[str]) -> tuple[bool, Optional[str], Dict[str, Any]]:
    """Kiểm tra sơ bộ tính hợp lệ của từng bản ghi trước khi gửi lên API."""
    full_name = record.get("fullName") or record.get("full_name") or record.get("name")
    email = record.get("email")
    phone = record.get("phone") or record.get("phoneNumber") or record.get("phone_number")
    password = record.get("password") or default_password

    if not email or not isinstance(email, str) or "@" not in email:
        return False, "Thiếu email hoặc email không đúng định dạng.", record

    if not full_name or not isinstance(full_name, str) or len(full_name.strip()) < 2:
        return False, "Tên người dùng (fullName) phải có ít nhất 2 ký tự.", record

    if not password or not isinstance(password, str) or len(password) < 8:
        return False, "Mật khẩu (password) phải có ít nhất 8 ký tự.", record

    # Xử lý phone nếu có
    formatted_phone = None
    if phone:
        phone_str = str(phone).strip()
        if phone_str.lower() not in ["null", "none", ""]:
            formatted_phone = phone_str

    payload = {
        "fullName": full_name.strip(),
        "email": email.strip().lower(),
        "password": password,
        "phone": formatted_phone
    }

    return True, None, payload


def register_recruiter(api_url: str, payload: Dict[str, Any], correlation_id: Optional[str] = None, timeout: int = 10) -> tuple[bool, int, Dict[str, Any], str]:
    """Gọi API đăng ký tài khoản Recruiter kèm X-Correlation-ID."""
    endpoint = f"{api_url.rstrip('/')}/api/v1/auth/register/recruiter"
    corr_id = correlation_id or str(uuid.uuid4())
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Correlation-ID": corr_id
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
    parser = argparse.ArgumentParser(
        description="Script tạo hàng loạt tài khoản HR (Recruiter) từ file JSON cho SmartHire."
    )
    parser.add_argument(
        "--file", "-f",
        default="dataset/recruiters_sample.json",
        help="Đường dẫn đến file JSON chứa danh sách HR (mặc định: dataset/recruiters_sample.json)"
    )
    parser.add_argument(
        "--url", "-u",
        default="http://localhost:5190",
        help="Base URL của Backend API (mặc định: http://localhost:5190)"
    )
    parser.add_argument(
        "--default-password", "-p",
        default="Password123@",
        help="Mật khẩu mặc định nếu record trong JSON không khai báo mật khẩu (mặc định: Password123@)"
    )
    parser.add_argument(
        "--delay", "-d",
        type=float,
        default=0.1,
        help="Thời gian nghỉ (giây) giữa mỗi request (mặc định: 0.1s)"
    )
    parser.add_argument(
        "--output", "-o",
        default="hr_creation_report.json",
        help="Đường dẫn file JSON xuất kết quả báo cáo (mặc định: hr_creation_report.json)"
    )

    args = parser.parse_args()

    print("=" * 60)
    print("🚀 BẮT ĐẦU QUÁ TRÌNH TẠO HÀNG LOẠT TÀI KHOẢN HR")
    print(f"📁 File dữ liệu:   {args.file}")
    print(f"🌐 Backend URL:    {args.url}")
    print(f"⏱️  Độ trễ mỗi lần: {args.delay}s")
    print("=" * 60)

    # 1. Đọc dữ liệu từ file
    try:
        raw_records = load_recruiters_from_json(args.file)
        total_records = len(raw_records)
        print(f"ℹ️  Đã đọc được {total_records} bản ghi từ file JSON.\n")
    except Exception as e:
        print(f"❌ [LỖI ĐỌC FILE] {e}")
        sys.exit(1)

    if total_records == 0:
        print("⚠️  Danh sách rỗng. Không có tài khoản nào để tạo.")
        sys.exit(0)

    # 2. Xử lý từng bản ghi
    success_count = 0
    fail_count = 0
    results_summary = []

    for idx, raw_record in enumerate(raw_records, start=1):
        is_valid, validation_msg, payload = validate_local_record(raw_record, idx, args.default_password)

        if not is_valid:
            print(f"[{idx}/{total_records}] ⚠️ [BỎ QUA - DỮ LIỆU LỖI] {validation_msg} (Input: {raw_record})")
            fail_count += 1
            results_summary.append({
                "index": idx,
                "input": raw_record,
                "status": "VALIDATION_FAILED",
                "error": validation_msg
            })
            continue

        email = payload["email"]
        is_success, status_code, resp_body, corr_id = register_recruiter(args.url, payload)

        if is_success:
            user_data = resp_body.get("data", {})
            user_id = user_data.get("id", "N/A")
            created_roles = user_data.get("roles", [])
            print(f"[{idx}/{total_records}] ✅ [THÀNH CÔNG] Email: {email} | ID: {user_id} | Roles: {created_roles}")
            success_count += 1
            results_summary.append({
                "index": idx,
                "email": email,
                "status": "SUCCESS",
                "statusCode": status_code,
                "correlationId": corr_id,
                "data": user_data
            })
        else:
            # Phân tích thông báo lỗi từ backend
            error_msg = "Không xác định"
            if isinstance(resp_body, dict):
                error_obj = resp_body.get("error", {})
                if isinstance(error_obj, dict):
                    error_msg = error_obj.get("message") or error_obj.get("code") or str(error_obj)
                    details = error_obj.get("details")
                    if details:
                        error_msg += f" - Chi tiết: {details}"
                elif "error" in resp_body:
                    error_msg = str(resp_body.get("error"))
                elif "raw" in resp_body:
                    error_msg = resp_body["raw"]

            print(f"[{idx}/{total_records}] ❌ [THẤT BẠI] Email: {email} | Mã HTTP: {status_code} | CorrelationId: {corr_id} | Lỗi: {error_msg}")
            fail_count += 1
            results_summary.append({
                "index": idx,
                "email": email,
                "status": "FAILED",
                "statusCode": status_code,
                "correlationId": corr_id,
                "error": error_msg,
                "response": resp_body
            })

        if args.delay > 0:
            time.sleep(args.delay)

    # 3. Xuất file báo cáo
    try:
        report_data = {
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "total": total_records,
            "success": success_count,
            "failed": fail_count,
            "details": results_summary
        }
        with open(args.output, "w", encoding="utf-8") as f:
            json.dump(report_data, f, ensure_ascii=False, indent=2)
        print(f"\n📄 Báo cáo chi tiết đã được lưu tại: {args.output}")
    except Exception as e:
        print(f"\n⚠️  Không thể lưu file báo cáo: {e}")

    # 4. In tổng kết
    print("\n" + "=" * 60)
    print("📊 TỔNG KẾT KẾT QUẢ")
    print(f"  - Tổng số bản ghi xử lý: {total_records}")
    print(f"  - Thành công:            {success_count} tài khoản")
    print(f"  - Thất bại / Bỏ qua:     {fail_count} tài khoản")
    print("=" * 60)


if __name__ == "__main__":
    main()
