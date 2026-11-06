# Hướng Dẫn Seed 100 Tin Tuyển Dụng (Job Postings)

Script `seed_job_postings.py` hỗ trợ tự động hóa việc đăng 100 tin tuyển dụng chất lượng cao, đa ngành nghề vào hệ thống SmartHire qua Backend API.

---

## 1. Yêu Cầu Tiên Quyết (Quan Trọng)

### Bước 1: Duyệt trạng thái các Công ty sang `Verified`
Backend yêu cầu công ty phải ở trạng thái `Verified` mới được phép đăng tin tuyển dụng.
Mở **DBeaver** hoặc **PgAdmin**, kết nối vào CSDL SmartHire và chạy script:
📁 `smart-recruitment-docs/seed-data/verify_all_companies.sql`

```sql
UPDATE public.companies
SET 
    verification_status = 'Verified',
    verified_at = '2026-11-06 15:35:03.655 +0700'::timestamptz,
    updated_at = NOW()
WHERE verification_status = 'Pending';
```

### Bước 2: Khởi động Backend API
Đảm bảo Backend API đang chạy ở cổng mặc định `http://localhost:5000` (hoặc cổng cấu hình tương ứng).

---

## 2. Dữ Liệu Đã Được Chuẩn Bị Sẵn

- **100 Tin Tuyển Dụng Thực Tế:** Đã biên soạn đầy đủ tại `dataset/job_postings_dataset.json` trải đều trên 6 lĩnh vực:
  1. Công nghệ thông tin & Phần mềm (40 JD)
  2. Kinh doanh & Bán hàng (15 JD)
  3. Marketing & Truyền thông (15 JD)
  4. Tài chính, Kế toán & Kiểm toán (10 JD)
  5. Nhân sự & Hành chính (10 JD)
  6. Logistics & Chuỗi cung ứng (10 JD)
- **Chuẩn Hóa Dữ Liệu:**
  - Mỗi JD có ít nhất 5 skills UUID hợp lệ lấy từ `skills_v2.sql`.
  - Mỗi JD có 2 - 3 industries UUID hợp lệ lấy từ `industries_v2.sql`.
  - Mức lương VNĐ tối thiểu $\ge$ 1,000,000 VNĐ.
  - Deadline chuẩn UTC ISO-8601 kết thúc bằng `Z`.
  - Phân bổ ngẫu nhiên vào 100 công ty (có công ty nhận 1, 2, 3 JD hoặc không có JD nào).

---

## 3. Cách Thực Thi Script Python

Mở terminal tại thư mục gốc của dự án hoặc tại thư mục `scripts`:

```bash
# 1. Di chuyển vào thư mục scripts
cd "smart-recruitment-docs/seed-data/scripts"

# 2. Chạy seed toàn bộ 100 tin tuyển dụng
python seed_job_postings.py
```

### Chạy thử nghiệm với 5 tin đầu tiên:
```bash
python seed_job_postings.py --limit 5
```

### Tùy chỉnh các tham số nâng cao:
```bash
python seed_job_postings.py \
  --api-url http://localhost:5000 \
  --delay 0.2 \
  --random-seed 99 \
  --output result/result_job_postings.json
```

---

## 4. Báo Cáo Kết Quả

Sau khi hoàn tất, kết quả chi tiết từng tin tuyển dụng cùng ID sinh ra sẽ được lưu tại:
📁 `smart-recruitment-docs/seed-data/scripts/result/result_job_postings.json`

