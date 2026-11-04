-- Seed d? li?u nh?m ng?nh t? raw-data/category_*.js.
-- UUID ???c c? ??nh theo t?n ?? script c? th? ch?y l?i an to?n.
-- C?c nh?m tr?ng t?n ch? ???c import m?t l?n.

INSERT INTO public.industry_groups (id, name, is_active)
VALUES
    ('e825b0ce-91d8-552d-a51f-67df05dfffc9', 'Kinh doanh/Bán hàng', TRUE),
    ('e60a3d72-0e5e-5ec3-a159-bb9f538bf1e9', 'Marketing/Quảng cáo/PR', TRUE),
    ('1ee3ba88-4595-59fc-8272-f71959f819ad', 'Chăm sóc khách hàng/Vận hành', TRUE),
    ('05d95937-76c9-54ec-836a-28a04912e210', 'Nhân sự/Hành chính/Pháp chế', TRUE),
    ('5138399a-3b22-5c3b-88da-9a87aeb4a087', 'Công nghệ thông tin', TRUE),
    ('e2764997-27e6-57c0-b7c2-4ca29d55c6fd', 'Lao động phổ thông', TRUE),
    ('00a9f325-b357-5cb2-974c-f63470fc1ac2', 'Tài chính/Ngân hàng/Bảo hiểm', TRUE),
    ('42e2e6ed-042e-5ba5-9fa9-77ca91405ad7', 'Bất động sản', TRUE),
    ('47a4eb52-dd89-541f-89ee-39e2385d9f86', 'Xây dựng', TRUE),
    ('11edc61d-2c5a-5cfa-8a65-efd11525b26c', 'Kế toán/Kiểm toán/Thuế', TRUE),
    ('fdc4e85f-fc82-562f-b9e9-0ae8751896c3', 'Sản xuất', TRUE),
    ('315edbc7-6d66-578d-8a2e-56a7d80c8b61', 'Giáo dục/Đào tạo', TRUE),
    ('e52c04b1-d852-5b9d-8c40-e87ba35f8806', 'Bán lẻ/Dịch vụ đời sống', TRUE),
    ('27d08c8e-d614-561e-8de6-fef374677c5a', 'Phim truyền hình/Báo chí/Xuất bản', TRUE),
    ('f7e6d100-1a93-5b8c-b107-febc946d3ebc', 'Điện/Điện tử/Viễn thông', TRUE),
    ('7ec2dfc3-4cd5-58cd-9533-a4ba3afd2a2e', 'Logistics/Thu mua/Kho/Vận tải', TRUE),
    ('b5e1c7a6-1e31-5ce5-9994-04df71c99bfe', 'Tư vấn chuyên môn', TRUE),
    ('be88cf72-dc4c-5ae3-8a9a-9faf02b85331', 'Dược/Y tế/Sức khỏe/Công nghệ sinh học', TRUE),
    ('c4379baf-5428-5bfb-8483-7a182eda9dd8', 'Thiết kế', TRUE),
    ('89c7f8ed-c745-54a0-b058-904b011f42d5', 'Nhà hàng/Khách sạn/Du lịch', TRUE),
    ('f8f58619-105e-55a9-ba61-15bf32bb8ff8', 'Năng lượng/Môi trường/Nông nghiệp', TRUE),
    ('31c80c70-0900-550b-8178-efc29ebfc39a', 'Tài xế', TRUE),
    ('3ca8eac8-59e5-5913-b571-663688aad135', 'Biên phiên dịch', TRUE),
    ('4d6a5384-19f0-50a2-8085-a5f415769b28', 'Luật', TRUE)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    is_active = EXCLUDED.is_active;

-- Đã import 24 nhóm ngành từ 25 file raw-data.
