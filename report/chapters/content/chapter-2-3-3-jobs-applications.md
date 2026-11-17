## Thiết kế chức năng dành cho Ứng viên

### 2.3.8. Chức năng tìm kiếm và xem chi tiết việc làm


**Mục đích:** Cho phép khách truy cập và ứng viên khám phá các vị trí tuyển dụng đang công khai, lọc theo nhu cầu và đọc thông tin chi tiết.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Hình 2.3.8. Giao diện tìm kiếm và xem chi tiết việc làm** — [Vị trí chèn ảnh mockup/Figma hoặc sơ đồ hoạt động].

*Bảng 2.3.8. Các thành phần trong giao diện Tìm kiếm việc làm*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | Textbox | Rỗng | Tìm theo từ khóa hoặc tên doanh nghiệp. |
| 2 | Dropdown | Tất cả | Chọn doanh nghiệp, địa điểm, cấp bậc, loại việc, hình thức làm việc. |
| 3 | Range input | Rỗng | Lọc theo khoảng lương; không kết hợp với chỉ xem lương thương lượng. |
| 4 | Dropdown/Checkbox | Rỗng | Lọc theo ngành nghề hoặc số năm/nhóm kinh nghiệm. |
| 5 | Dropdown | Ngày đăng mới nhất | Sắp xếp theo ngày đăng hoặc mức lương tối đa. |
| 6 | Card/List | Trang đầu | Hiển thị việc làm công khai và thông tin tóm tắt. |
| 7 | Pagination | Trang 1 | Chuyển trang kết quả. |

**Dữ liệu được dùng:**
*Bảng 2.3.8a. Từ điển dữ liệu chức năng Tìm kiếm việc làm*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | job_postings |  |  |  | X |
| 2 | companies |  |  |  | X |
| 3 | job_skills / skills |  |  |  | X |
| 4 | job_industries / industries |  |  |  | X |
| 5 | provinces / wards |  |  |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Hình 2.3.8a. Sơ đồ hoạt động chức năng Tìm kiếm việc làm** — [Vị trí chèn ảnh mockup/Figma hoặc sơ đồ hoạt động].

Máy chủ chuẩn hóa từ khóa, kiểm tra khoảng lương, số năm kinh nghiệm, nhóm kinh nghiệm, kiểu công việc, hình thức làm việc và tiêu chí sắp xếp. Khoảng kinh nghiệm không được gửi đồng thời với số năm cụ thể; bộ lọc lương thương lượng không được kết hợp với khoảng lương. Mã ngành, tỉnh và phường được kiểm tra là danh mục đang hoạt động; phường phải thuộc tỉnh đã chọn. Sau kiểm tra, hệ thống truy vấn các tin công khai, sắp xếp theo ngày đăng hoặc lương tối đa và trả trang kết quả. Tin không công khai không được đưa vào danh sách. Dữ liệu lọc không hợp lệ trả HTTP 422; mã danh mục không tồn tại trả 404.

Lỗi API được trả dưới dạng JSON gồm `error` (mã, thông điệp, chi tiết và dữ liệu tùy chọn) cùng `correlationId`, kèm header `X-Correlation-ID`. Middleware ánh xạ lỗi theo HTTP 400, 401, 403, 404, 409, 410, 413, 415, 422, 429 hoặc 503 tùy loại; lỗi chưa phân loại trả 500. Cấu trúc hiện tại không phải RFC 7807 Problem Details. Chỉ các tác vụ nền hoặc thông báo thời gian thực được nêu rõ trong luồng mới chạy bất đồng bộ; mã nguồn không phát Domain Event chuyên biệt cho chức năng này.

### 2.3.9. Chức năng lưu và bỏ lưu tin tuyển dụng


**Mục đích:** Cho phép ứng viên lưu tin quan tâm để xem lại và quản lý danh sách việc làm đã đánh dấu.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Hình 2.3.9. Giao diện lưu và quản lý tin tuyển dụng đã lưu** — [Vị trí chèn ảnh mockup/Figma hoặc sơ đồ hoạt động].

*Bảng 2.3.9. Các thành phần trong giao diện Lưu việc làm*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | Button (icon) | Chưa lưu/đã lưu | Bật hoặc bỏ đánh dấu tin. |
| 2 | List/Card | Trang đầu | Liệt kê việc đã lưu của người dùng hiện tại. |
| 3 | Pagination | Trang 1 | Chuyển trang danh sách việc đã lưu. |

**Dữ liệu được dùng:**
*Bảng 2.3.9a. Từ điển dữ liệu chức năng Lưu việc làm*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | job_bookmarks | X |  | X | X |
| 2 | job_postings |  |  |  | X |
| 3 | companies |  |  |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Hình 2.3.9a. Sơ đồ hoạt động chức năng Lưu việc làm** — [Vị trí chèn ảnh mockup/Figma hoặc sơ đồ hoạt động].

Người dùng cần đăng nhập để lưu tin. Hệ thống kiểm tra tin tồn tại và ở trạng thái được phép lưu, sau đó tạo liên kết theo cặp người dùng--tin. Nếu liên kết đã tồn tại, hệ thống trả lỗi xung đột; bỏ lưu chỉ xóa liên kết thuộc tài khoản hiện tại. Danh sách được truy vấn theo người dùng đang đăng nhập và phân trang. Trường hợp sai quyền trả 403, tin không tồn tại trả 404.

## Thiết kế chức năng dành cho Nhà tuyển dụng/Doanh nghiệp

Lỗi API được trả dưới dạng JSON gồm `error` (mã, thông điệp, chi tiết và dữ liệu tùy chọn) cùng `correlationId`, kèm header `X-Correlation-ID`. Middleware ánh xạ lỗi theo HTTP 400, 401, 403, 404, 409, 410, 413, 415, 422, 429 hoặc 503 tùy loại; lỗi chưa phân loại trả 500. Cấu trúc hiện tại không phải RFC 7807 Problem Details. Chỉ các tác vụ nền hoặc thông báo thời gian thực được nêu rõ trong luồng mới chạy bất đồng bộ; mã nguồn không phát Domain Event chuyên biệt cho chức năng này.

### 2.3.10. Chức năng đăng và quản lý tin tuyển dụng


**Mục đích:** Cho phép Recruiter thuộc doanh nghiệp đã xác minh tạo, cập nhật và đóng các tin tuyển dụng của doanh nghiệp.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Hình 2.3.10. Giao diện đăng và quản lý tin tuyển dụng** — [Vị trí chèn ảnh mockup/Figma hoặc sơ đồ hoạt động].

*Bảng 2.3.10. Các thành phần trong giao diện Quản lý tin tuyển dụng*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | Textbox | Rỗng | Nhập tiêu đề và địa điểm chi tiết. |
| 2 | Rich text editor | Rỗng | Nhập mô tả, yêu cầu và quyền lợi. |
| 3 | Dropdown | Chưa chọn | Chọn tỉnh/phường, loại việc, hình thức, cấp bậc và học vấn. |
| 4 | Number input | Rỗng | Nhập kinh nghiệm, số lượng tuyển và khoảng lương. |
| 5 | Multi-select | Rỗng | Chọn kỹ năng và ngành nghề đang hoạt động. |
| 6 | Date picker | Rỗng | Chọn hạn nộp hồ sơ. |
| 7 | Button/Table | N/A | Tạo, sửa hoặc đóng tin và xem trạng thái kiểm duyệt. |

**Dữ liệu được dùng:**
*Bảng 2.3.10a. Từ điển dữ liệu chức năng Quản lý tin tuyển dụng*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | job_postings | X | X |  | X |
| 2 | job_skills | X | X | X | X |
| 3 | job_industries | X | X | X | X |
| 4 | companies / company_memberships |  |  |  | X |
| 5 | provinces / wards / skills / industries |  |  |  | X |
| 6 | notifications | X | X |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Hình 2.3.10a. Sơ đồ hoạt động chức năng Quản lý tin tuyển dụng** — [Vị trí chèn ảnh mockup/Figma hoặc sơ đồ hoạt động].

Khi tạo tin, validator kiểm tra trường bắt buộc, hạn đăng, mức lương, số lượng tuyển, địa điểm, ngành nghề và kỹ năng. Doanh nghiệp phải ở trạng thái Verified, người thao tác phải có vai trò Recruiter và membership đang hoạt động. Tin được tạo ở trạng thái PendingReview. Admin mới có thể phát hành hoặc từ chối tin đang chờ; khi tin được phát hành, thông báo cho người theo dõi công ty được ghi vào CSDL và việc phát SignalR được xếp qua Hangfire theo lô. Lỗi enqueue được ghi log và không làm hủy tin đã commit. Recruiter có thể cập nhật tin chưa đóng/hết hạn hoặc đóng tin; tác vụ nền chuyển tin đã phát hành quá hạn sang Expired. Các lỗi validation trả 422, sai quyền 403, trạng thái xung đột 409.

Lỗi API được trả dưới dạng JSON gồm `error` (mã, thông điệp, chi tiết và dữ liệu tùy chọn) cùng `correlationId`, kèm header `X-Correlation-ID`. Middleware ánh xạ lỗi theo HTTP 400, 401, 403, 404, 409, 410, 413, 415, 422, 429 hoặc 503 tùy loại; lỗi chưa phân loại trả 500. Cấu trúc hiện tại không phải RFC 7807 Problem Details. Chỉ các tác vụ nền hoặc thông báo thời gian thực được nêu rõ trong luồng mới chạy bất đồng bộ; mã nguồn không phát Domain Event chuyên biệt cho chức năng này.

### 2.3.11. Chức năng Ứng tuyển và theo dõi hồ sơ


**Mục đích:** Cho phép ứng viên nộp hồ sơ cho tin còn hiệu lực và theo dõi kết quả; cho phép nhà tuyển dụng tiếp nhận hồ sơ ứng tuyển.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Hình 2.3.11. Giao diện Ứng tuyển và theo dõi hồ sơ** — [Vị trí chèn ảnh mockup/Figma hoặc sơ đồ hoạt động].

*Bảng 2.3.11. Các thành phần trong giao diện Ứng tuyển*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | Radio/Card selector | Chưa chọn | Chọn một phiên bản CV trực tuyến. |
| 2 | File selector | Chưa chọn | Chọn tệp PDF đã tải lên thay cho CV trực tuyến. |
| 3 | Textarea | Rỗng | Nhập thư giới thiệu. |
| 4 | Button | N/A | Gửi hồ sơ ứng tuyển. |
| 5 | Table/Timeline | Trang đầu | Theo dõi trạng thái và lịch sử hồ sơ. |
| 6 | Status dropdown | Trạng thái hiện tại | Recruiter thay đổi trạng thái hồ sơ trong luồng hợp lệ. |

**Dữ liệu được dùng:**
*Bảng 2.3.11a. Từ điển dữ liệu chức năng Ứng tuyển*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | applications | X | X |  | X |
| 2 | application_status_histories | X |  |  | X |
| 3 | cv_versions / media_files |  |  |  | X |
| 4 | job_postings / companies / company_memberships |  |  |  | X |
| 5 | ai_match_results | X |  |  | X |
| 6 | notifications | X | X |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Hình 2.3.11a. Sơ đồ hoạt động chức năng Ứng tuyển và theo dõi hồ sơ** — [Vị trí chèn ảnh mockup/Figma hoặc sơ đồ hoạt động].

Máy chủ chỉ nhận hồ sơ khi tin đang Published, doanh nghiệp đã Verified và hạn nộp chưa qua. Mỗi ứng viên chỉ được nộp một hồ sơ cho một tin. Yêu cầu phải có đúng một nguồn CV: phiên bản CV thuộc ứng viên hoặc PDF thuộc ứng viên, chưa dùng cho hồ sơ khác và không quá 5 MB. Hệ thống ghi hồ sơ cùng trạng thái Submitted và lịch sử ban đầu trong giao dịch. Nếu dùng CV trực tuyến, bộ máy so khớp có thể tính điểm và lưu ai_match_results; thiếu embedding không ngăn phân tích theo phương thức dự phòng của bộ máy.

Thông báo cho thành viên công ty được ghi sau khi hồ sơ thành công. SignalR phát trực tiếp; trong đợt nhiều hồ sơ liên tiếp, hệ thống gộp nội dung và giới hạn toast bằng cache 10 giây, chỉ phát sự kiện tăng bộ đếm. Lỗi phát thông báo không làm đảo ngược hồ sơ đã nộp. Khi đổi trạng thái, chỉ Recruiter có membership đang hoạt động được thao tác; miền kiểm tra chuyển trạng thái hợp lệ, lưu lịch sử và thông báo cho ứng viên. HTTP lỗi được ánh xạ tương ứng: sai đầu vào 422, không xác thực 401, không đủ quyền 403, hồ sơ/tin không tồn tại 404, ứng tuyển trùng hoặc xung đột đồng thời 409.

Lỗi API được trả dưới dạng JSON gồm `error` (mã, thông điệp, chi tiết và dữ liệu tùy chọn) cùng `correlationId`, kèm header `X-Correlation-ID`. Middleware ánh xạ lỗi theo HTTP 400, 401, 403, 404, 409, 410, 413, 415, 422, 429 hoặc 503 tùy loại; lỗi chưa phân loại trả 500. Cấu trúc hiện tại không phải RFC 7807 Problem Details. Chỉ các tác vụ nền hoặc thông báo thời gian thực được nêu rõ trong luồng mới chạy bất đồng bộ; mã nguồn không phát Domain Event chuyên biệt cho chức năng này.
