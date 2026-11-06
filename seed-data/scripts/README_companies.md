# Script Seed Doanh Nghiệp (Companies) cho SmartHire

Script tự động phân bổ và khởi tạo hàng loạt hồ sơ doanh nghiệp từ file `company.json`, gán quyền Chủ sở hữu (**Owner**) lần lượt cho từng tài khoản HR trong hệ thống.

---

## 📌 Cơ chế hoạt động

1. **Đọc dữ liệu:**
   - Danh sách HR: `smart-recruitment-docs/seed-data/script/seed-hr/dataset/recruiters_sample.json` (20 HRs).
   - Danh sách Công ty: `smart-recruitment-docs/seed-data/raw-data/company.json` (100 công ty).
2. **Quy tắc phân bổ:**
   - Mặc định: Mỗi 1 tài khoản HR sẽ tạo **5 công ty** (`20 HR * 5 = 100 công ty`).
   - HR #1: Tạo công ty 1 đến 5.
   - HR #2: Tạo công ty 6 đến 10.
   - ...
   - HR #20: Tạo công ty 96 đến 100.
3. **Đăng nhập & Xác thực:**
   - Script tự động gọi API `POST /api/v1/auth/login` cho từng HR để lấy `accessToken`.
   - Gửi request `POST /api/v1/companies` kèm `Bearer Token` của HR đó.
   - Người tạo sẽ tự động trở thành **Owner** của công ty theo nghiệp vụ hệ thống.
4. **Chuẩn hóa dữ liệu thông minh:**
   - Số điện thoại: Tự động chuẩn hóa các đầu số tổng đài 8 số (`1800/1900`) thành 11 số (thêm mã vùng `024`) để thỏa mãn `PhoneValidator` (10-11 số).
   - Website: Tự động bổ sung `https://` nếu chưa có protocol.
5. **Chống xung đột (Idempotency):**
   - Nếu công ty đã tồn tại (`409 Conflict - TaxCode đã có`), script sẽ đánh dấu `ALREADY_EXISTS` và tiếp tục chạy các công ty tiếp theo mà không làm gián đoạn tiến trình.

---

## 🚀 Hướng dẫn thực thi

Mở terminal tại thư mục `smart-recruitment-docs/seed-data/script/seed-company`:

```bash
# 1. Cài đặt thư viện requests (nếu chưa có)
pip install requests

# 2. Chạy với cấu hình chuẩn mặc định
python scripts/create_companies.py -u http://localhost:5190 -n 5 -d 0.2 -o result_companies.json
```

### Các tùy chọn tham số (CLI Options)

| Tham số | Viết tắt | Mặc định | Mô tả |
|---|---|---|---|
| `--url` | `-u` | `http://localhost:5190` | Base URL của Backend API |
| `--hr-file` | `-r` | `../seed-hr/dataset/recruiters_sample.json` | Đường dẫn file danh sách tài khoản HR |
| `--company-file` | `-c` | `../../raw-data/company.json` | Đường dẫn file dữ liệu 100 công ty |
| `--companies-per-hr` | `-n` | `5` | Số lượng công ty mỗi HR phụ trách tạo |
| `--default-password` | `-p` | `Password123@` | Mật khẩu đăng nhập HR |
| `--delay` | `-d` | `0.2` | Độ trễ nghỉ (giây) giữa mỗi request tạo |
| `--output` | `-o` | `company_creation_report.json` | File JSON lưu kết quả báo cáo chi tiết |

