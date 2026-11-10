# 2.2. Thiết kế cơ sở dữ liệu

Cơ sở dữ liệu SmartHire được thiết kế theo mô hình quan hệ nhằm lưu trữ và tổ chức dữ liệu phục vụ các nghiệp vụ chính của nền tảng. Các bảng được phân chia theo sáu phân hệ gồm quản lý tài khoản, doanh nghiệp và phân quyền, quản lý tệp tin và đa phương tiện, biên soạn CV theo mẫu, tuyển dụng và quản lý ứng tuyển, trợ lý AI và đề xuất thông minh, quản trị hệ thống vận hành. Cách phân chia này làm rõ vai trò của từng nhóm dữ liệu và thể hiện mối liên hệ giữa các đối tượng thông qua khóa chính, khóa ngoại.

Trong các bảng mô tả dưới đây, mỗi dòng biểu diễn một thuộc tính của bảng, bao gồm kiểu dữ liệu, vai trò trong khóa, yêu cầu bắt buộc, bảng được tham chiếu và ý nghĩa của thuộc tính. Các bảng trung gian biểu diễn quan hệ giữa nhiều đối tượng cũng được trình bày trong phân hệ nghiệp vụ tương ứng.
## 2.2.1. Quy ước mô tả

Các bảng dưới đây được tổng hợp từ mô hình dữ liệu và cấu hình Entity Framework Core của backend. Tên bảng và tên thuộc tính được trình bày theo quy ước của mô hình dữ liệu. Kiểu dữ liệu sử dụng các tên gọi phổ biến, độc lập với hệ quản trị cơ sở dữ liệu như UUID, VARCHAR(n), TEXT, BOOLEAN, INTEGER, BIGINT, DECIMAL, DATETIME, JSON và Vector (768 chiều). Cột được đánh dấu X tại “Không rỗng” khi bắt buộc lưu giá trị. Khóa ngoại chỉ rõ bảng được tham chiếu. Khóa chính ghép được đánh dấu X trên từng cột cấu thành khóa.

Các giá trị thuộc kiểu liệt kê được trình bày theo ý nghĩa dữ liệu để dễ hiểu và không phụ thuộc cách lưu trữ cụ thể của hệ quản trị cơ sở dữ liệu.

## 2.2.2. Phân hệ Quản lý Tài khoản, Doanh nghiệp và Phân quyền

### Bảng `users`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh người dùng |
| email | VARCHAR(320) |  |  | X |  | Địa chỉ email đăng nhập |
| phone | VARCHAR(32) |  |  |  |  | Số điện thoại |
| password_hash | text |  |  | X |  | Mật khẩu đã băm |
| full_name | VARCHAR(200) |  |  | X |  | Họ tên người dùng |
| avatar_file_id | UUID |  | X |  | media_files | Tệp ảnh đại diện |
| status | VARCHAR(20) |  |  | X |  | Trạng thái tài khoản |
| created_at | DATETIME |  |  | X |  | Thời điểm tạo |
| updated_at | DATETIME |  |  | X |  | Thời điểm cập nhật |

