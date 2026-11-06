-- Script cập nhật toàn bộ công ty sang trạng thái Verified và cập nhật verified_at chuẩn múi giờ +0700
-- Chạy script này trên DBeaver hoặc PgAdmin để cho phép các HR tài khoản tạo Job Postings

UPDATE public.companies
SET 
    verification_status = 'Verified',
    verified_at = '2026-11-06 15:35:03.655 +0700'::timestamptz,
    updated_at = NOW()
WHERE verification_status = 'Pending';

-- Kiểm tra lại kết quả
SELECT id, name, verification_status, verified_at 
FROM public.companies 
ORDER BY verified_at DESC;

