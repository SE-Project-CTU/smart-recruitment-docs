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

### Bảng `roles`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh vai trò |
| name | VARCHAR(50) |  |  | X |  | Tên vai trò hệ thống |

### Bảng `user_roles`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| user_id | UUID | X | X | X | users | Người dùng được gán vai trò |
| role_id | UUID | X | X | X | roles | Vai trò được gán |

### Bảng `refresh_tokens`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh token |
| user_id | UUID |  | X | X | users | Chủ sở hữu token |
| token_hash | text |  |  | X |  | Giá trị token đã băm |
| expires_at | DATETIME |  |  | X |  | Thời điểm hết hạn |
| created_at | DATETIME |  |  | X |  | Thời điểm tạo |
| revoked_at | DATETIME |  |  |  |  | Thời điểm thu hồi nếu có |

### Bảng `companies`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh doanh nghiệp |
| name | VARCHAR(200) |  |  | X |  | Tên doanh nghiệp |
| tax_code | VARCHAR(50) |  |  | X |  | Mã số thuế |
| email | VARCHAR(320) |  |  | X |  | Email liên hệ |
| phone | VARCHAR(32) |  |  | X |  | Điện thoại liên hệ |
| address | text |  |  |  |  | Địa chỉ |
| website | VARCHAR(500) |  |  |  |  | Trang web |
| description | text |  |  |  |  | Giới thiệu doanh nghiệp |
| logo_file_id | UUID |  | X |  | media_files | Tệp logo |
| verification_status | VARCHAR(30) |  |  | X |  | Trạng thái xác minh |
| verified_at | DATETIME |  |  |  |  | Thời điểm xác minh |
| created_at | DATETIME |  |  | X |  | Thời điểm tạo |
| updated_at | DATETIME |  |  | X |  | Thời điểm cập nhật |

### Bảng `company_memberships`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| company_id | UUID | X | X | X | companies | Doanh nghiệp thành viên |
| user_id | UUID | X | X | X | users | Người dùng thành viên |
| role | VARCHAR(30) |  |  | X |  | Vai trò trong doanh nghiệp |
| status | VARCHAR(30) |  |  | X |  | Trạng thái thành viên |
| joined_at | DATETIME |  |  | X |  | Thời điểm tham gia |

### Bảng `company_invitations`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh lời mời |
| company_id | UUID |  | X | X | companies | Doanh nghiệp gửi lời mời |
| inviter_id | UUID |  | X | X | users | Người gửi lời mời |
| invitee_id | UUID |  | X |  | users | Người nhận lời mời nếu đã có tài khoản |
| email | VARCHAR(320) |  |  | X |  | Email người được mời |
| role | VARCHAR(30) |  |  | X |  | Vai trò được mời |
| status | VARCHAR(30) |  |  | X |  | Trạng thái lời mời |
| expires_at | DATETIME |  |  | X |  | Thời hạn lời mời |
| created_at | DATETIME |  |  | X |  | Thời điểm gửi |

### Bảng `company_join_requests`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh yêu cầu |
| company_id | UUID |  | X | X | companies | Doanh nghiệp được yêu cầu gia nhập |
| user_id | UUID |  | X | X | users | Người gửi yêu cầu |
| status | VARCHAR(30) |  |  | X |  | Trạng thái xử lý |
| reviewed_by | UUID |  | X |  | users | Người xét duyệt |
| reviewed_at | DATETIME |  |  |  |  | Thời điểm xét duyệt |
| created_at | DATETIME |  |  | X |  | Thời điểm gửi yêu cầu |

### Bảng `company_follows`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| company_id | UUID | X | X | X | companies | Doanh nghiệp được theo dõi |
| user_id | UUID | X | X | X | users | Người theo dõi |
| created_at | DATETIME |  |  | X |  | Thời điểm bắt đầu theo dõi |

## 2.2.3. Phân hệ Quản lý Tệp tin và Đa phương tiện

### Bảng `media_files`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh tệp |
| owner_id | UUID |  | X | X | users | Người sở hữu tệp |
| file_name | VARCHAR(255) |  |  | X |  | Tên tệp |
| file_url | text |  |  | X |  | Đường dẫn truy cập tệp |
| file_type | VARCHAR(100) |  |  | X |  | Loại hoặc định dạng tệp |
| file_size | bigint |  |  | X |  | Kích thước tệp theo byte |
| public_id | VARCHAR(255) |  |  | X |  | Định danh tệp tại dịch vụ lưu trữ |
| created_at | DATETIME |  |  | X |  | Thời điểm tải lên |
| deleted_at | DATETIME |  |  |  |  | Thời điểm xóa mềm |

## 2.2.4. Phân hệ Công cụ Biên soạn CV theo Mẫu

### Bảng `cv_templates`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh mẫu CV |
| name | VARCHAR(150) |  |  | X |  | Tên mẫu |
| description | text |  |  |  |  | Mô tả mẫu |
| thumbnail_file_id | UUID |  | X |  | media_files | Ảnh xem trước mẫu |
| content_schema | JSON |  |  | X |  | Cấu trúc dữ liệu nội dung |
| layout_schema | JSON |  |  | X |  | Cấu trúc bố cục |
| presentation_schema | JSON |  |  | X |  | Cấu hình trình bày |
| is_active | boolean |  |  | X |  | Trạng thái sử dụng |
| created_at | DATETIME |  |  | X |  | Thời điểm tạo |
| updated_at | DATETIME |  |  | X |  | Thời điểm cập nhật |

### Bảng `cvs`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh CV |
| candidate_id | UUID |  | X | X | users | Chủ sở hữu CV |
| title | VARCHAR(255) |  |  | X |  | Tiêu đề CV |
| is_public | boolean |  |  | X |  | Trạng thái công khai |
| created_at | DATETIME |  |  | X |  | Thời điểm tạo |
| updated_at | DATETIME |  |  | X |  | Thời điểm cập nhật |
| preview_file_id | UUID |  | X |  | media_files | Tệp xem trước |

### Bảng `cv_versions`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh phiên bản |
| cv_id | UUID |  | X | X | cvs | CV chứa phiên bản |
| template_id | UUID |  | X | X | cv_templates | Mẫu CV áp dụng |
| version_number | integer |  |  | X |  | Số thứ tự phiên bản |
| content | JSON |  |  | X |  | Nội dung CV |
| layout | JSON |  |  | X |  | Bố cục phiên bản |
| presentation | JSON |  |  | X |  | Kiểu trình bày |
| preview_file_id | UUID |  | X |  | media_files | Tệp xem trước phiên bản |
| created_at | DATETIME |  |  | X |  | Thời điểm tạo phiên bản |

### Bảng `cv_embeddings`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh vector CV |
| cv_version_id | UUID |  | X | X | cv_versions | Phiên bản CV được biểu diễn |
| embedding | Vector (768 chiều) |  |  | X |  | Vector ngữ nghĩa của CV |
| model | VARCHAR(100) |  |  | X |  | Tên mô hình tạo vector |
| created_at | DATETIME |  |  | X |  | Thời điểm tạo vector |

## 2.2.5. Phân hệ Tuyển dụng và Quản lý Ứng tuyển

### Bảng `job_postings`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh tin tuyển dụng |
| company_id | UUID |  | X | X | companies | Doanh nghiệp đăng tin |
| created_by | UUID |  | X | X | users | Người tạo tin |
| title | VARCHAR(255) |  |  | X |  | Tiêu đề công việc |
| description | text |  |  | X |  | Nội dung mô tả |
| requirements | text |  |  | X |  | Yêu cầu ứng viên |
| province_id | UUID |  | X | X | provinces | Tỉnh/thành phố |
| ward_id | UUID |  | X |  | wards | Phường/xã |
| address | text |  |  |  |  | Địa chỉ chi tiết |
| job_type | VARCHAR(30) |  |  | X |  | Hình thức công việc |
| work_mode | VARCHAR(30) |  |  | X |  | Hình thức làm việc |
| level | VARCHAR(30) |  |  | X |  | Cấp bậc |
| experience_years | integer |  |  |  |  | Số năm kinh nghiệm |
| salary_min | DECIMAL |  |  |  |  | Mức lương tối thiểu |
| salary_max | DECIMAL |  |  |  |  | Mức lương tối đa |
| status | VARCHAR(30) |  |  | X |  | Trạng thái tin |
| created_at | DATETIME |  |  | X |  | Thời điểm tạo |
| updated_at | DATETIME |  |  | X |  | Thời điểm cập nhật |
| expires_at | DATETIME |  |  |  |  | Thời điểm hết hạn |

### Bảng `job_skills`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| job_id | UUID | X | X | X | job_postings | Tin tuyển dụng |
| skill_id | UUID | X | X | X | skills | Kỹ năng yêu cầu |
| is_required | boolean |  |  | X |  | Kỹ năng bắt buộc hay ưu tiên |

### Bảng `job_industries`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| job_id | UUID | X | X | X | job_postings | Tin tuyển dụng |
| industry_id | UUID | X | X | X | industries | Ngành nghề liên quan |

### Bảng `job_bookmarks`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| user_id | UUID | X | X | X | users | Người lưu tin |
| job_posting_id | UUID | X | X | X | job_postings | Tin được lưu |
| created_at | DATETIME |  |  | X |  | Thời điểm lưu tin |

### Bảng `applications`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh hồ sơ ứng tuyển |
| job_id | UUID |  | X | X | job_postings | Tin được ứng tuyển |
| candidate_id | UUID |  | X | X | users | Ứng viên |
| cv_version_id | UUID |  | X |  | cv_versions | Phiên bản CV trực tuyến |
| uploaded_cv_file_id | UUID |  | X |  | media_files | Tệp CV tải lên |
| cover_letter | text |  |  | X |  | Thư giới thiệu |
| status | VARCHAR(30) |  |  | X |  | Trạng thái ứng tuyển |
| applied_at | DATETIME |  |  | X |  | Thời điểm nộp hồ sơ |
| updated_at | DATETIME |  |  | X |  | Thời điểm cập nhật |

### Bảng `application_status_histories`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh bản ghi lịch sử |
| application_id | UUID |  | X | X | applications | Hồ sơ ứng tuyển |
| changed_by | UUID |  | X | X | users | Người thay đổi trạng thái |
| old_status | VARCHAR(30) |  |  |  |  | Trạng thái trước |
| new_status | VARCHAR(30) |  |  | X |  | Trạng thái sau |
| note | text |  |  |  |  | Ghi chú thay đổi |
| created_at | DATETIME |  |  | X |  | Thời điểm thay đổi |

## 2.2.6. Phân hệ Trợ lý AI và Đề xuất Thông minh

### Bảng `ai_conversations`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh hội thoại |
| candidate_id | UUID |  | X | X | users | Chủ hội thoại |
| cv_id | UUID |  | X |  | cvs | CV liên quan nếu có |
| title | VARCHAR(255) |  |  | X |  | Tiêu đề hội thoại |
| is_pinned | boolean |  |  | X |  | Trạng thái ghim |
| created_at | DATETIME |  |  | X |  | Thời điểm tạo |
| updated_at | DATETIME |  |  | X |  | Thời điểm cập nhật |
| last_message_at | DATETIME |  |  | X |  | Thời điểm có tin nhắn gần nhất |

### Bảng `ai_messages`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh tin nhắn |
| conversation_id | UUID |  | X | X | ai_conversations | Hội thoại chứa tin nhắn |
| role | VARCHAR(20) |  |  | X |  | Vai trò người gửi |
| content | text |  |  | X |  | Nội dung tin nhắn |
| created_at | DATETIME |  |  | X |  | Thời điểm gửi |

### Bảng `ai_match_results`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh kết quả phân tích |
| application_id | UUID |  | X | X | applications | Hồ sơ ứng tuyển được phân tích |
| cv_version_id | UUID |  | X | X | cv_versions | Phiên bản CV được đánh giá |
| score | DECIMAL |  |  | X |  | Điểm tương thích |
| analysis | text |  |  | X |  | Nội dung phân tích |
| created_at | DATETIME |  |  | X |  | Thời điểm phân tích |

### Bảng `job_embeddings`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh vector tin tuyển dụng |
| job_id | UUID |  | X | X | job_postings | Tin được biểu diễn |
| embedding | Vector (768 chiều) |  |  | X |  | Vector ngữ nghĩa của tin |
| model | VARCHAR(100) |  |  | X |  | Mô hình tạo vector |
| created_at | DATETIME |  |  | X |  | Thời điểm tạo vector |

### Bảng `job_recommendations`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh gợi ý |
| candidate_id | UUID |  | X | X | users | Ứng viên nhận gợi ý |
| job_id | UUID |  | X | X | job_postings | Tin được đề xuất |
| score | DECIMAL |  |  | X |  | Điểm phù hợp |
| created_at | DATETIME |  |  | X |  | Thời điểm tạo gợi ý |

## 2.2.7. Phân hệ Quản trị Hệ thống Vận hành

Phân hệ quản trị sử dụng các bảng danh mục và dữ liệu nền để quản lý thông tin dùng chung trên nền tảng. Một số bảng này đồng thời được các phân hệ tuyển dụng và CV tham chiếu.

### Bảng `provinces`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh tỉnh/thành phố |
| code | VARCHAR(20) |  |  | X |  | Mã địa phương |
| name | VARCHAR(150) |  |  | X |  | Tên tỉnh/thành phố |
| status | VARCHAR(20) |  |  | X |  | Trạng thái danh mục |

### Bảng `wards`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh phường/xã |
| province_id | UUID |  | X | X | provinces | Tỉnh/thành phố trực thuộc |
| code | VARCHAR(20) |  |  | X |  | Mã phường/xã |
| name | VARCHAR(150) |  |  | X |  | Tên phường/xã |
| status | VARCHAR(20) |  |  | X |  | Trạng thái danh mục |

### Bảng `industry_groups`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh nhóm ngành |
| name | VARCHAR(150) |  |  | X |  | Tên nhóm ngành |
| description | text |  |  |  |  | Mô tả nhóm ngành |
| is_active | boolean |  |  | X |  | Trạng thái hoạt động |

### Bảng `industries`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh ngành nghề |
| group_id | UUID |  | X | X | industry_groups | Nhóm ngành chứa ngành nghề |
| name | VARCHAR(150) |  |  | X |  | Tên ngành nghề |
| description | text |  |  |  |  | Mô tả ngành nghề |
| is_active | boolean |  |  | X |  | Trạng thái hoạt động |

### Bảng `skills`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh kỹ năng |
| name | VARCHAR(150) |  |  | X |  | Tên kỹ năng |
| is_active | boolean |  |  | X |  | Trạng thái hoạt động |

### Bảng `notifications`

| Tên thuộc tính | Kiểu dữ liệu | Khóa chính | Khóa ngoại | Không rỗng | Bảng tham chiếu | Diễn giải |
|---|---|:---:|:---:|:---:|---|---|
| id | UUID | X |  | X |  | Định danh thông báo |
| recipient_id | UUID |  | X | X | users | Người nhận thông báo |
| type | VARCHAR(30) |  |  | X |  | Loại thông báo |
| title | VARCHAR(200) |  |  | X |  | Tiêu đề thông báo |
| content | text |  |  | X |  | Nội dung thông báo |
| is_read | boolean |  |  | X |  | Trạng thái đã đọc |
| created_at | DATETIME |  |  | X |  | Thời điểm tạo |
| read_at | DATETIME |  |  |  |  | Thời điểm đọc |






