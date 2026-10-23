-- Industry groups; deterministic UUIDs, safe to rerun.
INSERT INTO industry_groups (id,name,is_active) VALUES
('d945a0bc-ba60-5059-a817-0b2d0276c5ba'::uuid,'Kinh doanh và bán lẻ',TRUE),
('9b1269f2-7c3e-5ad5-9d4d-c3f68afed393'::uuid,'Tài chính, kế toán và ngân hàng',TRUE),
('9ae3d00e-2c6b-5acc-9b91-5167e78777d1'::uuid,'Sản xuất, kỹ thuật và xây dựng',TRUE),
('e95216ce-1f0a-5ea8-a2f4-3bad6ef6cb9f'::uuid,'Công nghệ thông tin và viễn thông',TRUE),
('e21db135-9877-508f-825d-1ba795299100'::uuid,'Marketing, truyền thông và thiết kế',TRUE),
('50dccd5a-889b-5dd7-875f-c2df357e3234'::uuid,'Hành chính, nhân sự và pháp lý',TRUE),
('5370a34e-31fc-57d5-8751-7264f2da6969'::uuid,'Logistics, du lịch và dịch vụ',TRUE),
('b445be79-f526-50df-8259-03b619c46ca3'::uuid,'Giáo dục, y tế và chăm sóc cá nhân',TRUE) ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name,is_active=EXCLUDED.is_active;
