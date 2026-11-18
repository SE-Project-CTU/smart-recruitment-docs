**Phân hệ: Thiết kế chức năng dành cho Ứng viên**

### Chức năng tìm kiếm và xem chi tiết việc làm


**Mục đích:** Cho phép khách truy cập và ứng viên khám phá các vị trí tuyển dụng đang công khai, lọc theo nhu cầu và đọc thông tin chi tiết.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Giao diện: tìm kiếm và xem chi tiết việc làm** — [Vị trí chèn ảnh mockup/Figma].

*Các thành phần trong giao diện Tìm kiếm việc làm*

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
*Từ điển dữ liệu chức năng Tìm kiếm việc làm*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | job_postings |  |  |  | X |
| 2 | companies |  |  |  | X |
| 3 | job_skills / skills |  |  |  | X |
| 4 | job_industries / industries |  |  |  | X |
| 5 | provinces / wards |  |  |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Sơ đồ hoạt động: Tìm kiếm việc làm** — [Vị trí chèn sơ đồ hoạt động].

Máy chủ chuẩn hóa từ khóa, kiểm tra khoảng lương, số năm kinh nghiệm, nhóm kinh nghiệm, kiểu công việc, hình thức làm việc và tiêu chí sắp xếp. Khoảng kinh nghiệm không được gửi đồng thời với số năm cụ thể; bộ lọc lương thương lượng không được kết hợp với khoảng lương. Mã ngành, tỉnh và phường được kiểm tra là danh mục đang hoạt động; phường phải thuộc tỉnh đã chọn. Sau kiểm tra, hệ thống truy vấn các tin công khai, sắp xếp theo ngày đăng hoặc lương tối đa và trả trang kết quả. Tin không công khai không được đưa vào danh sách. Dữ liệu lọc không hợp lệ trả HTTP 422; mã danh mục không tồn tại trả 404.

Lỗi được trả trong envelope JSON gồm `error` và `correlationId`, kèm header `X-Correlation-ID`; HTTP status được ánh xạ theo loại lỗi. Cấu trúc này không phải RFC 7807 Problem Details.

### Chức năng lưu và bỏ lưu tin tuyển dụng


**Mục đích:** Cho phép ứng viên lưu tin quan tâm để xem lại và quản lý danh sách việc làm đã đánh dấu.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Giao diện: lưu và quản lý tin tuyển dụng đã lưu** — [Vị trí chèn ảnh mockup/Figma].

*Các thành phần trong giao diện Lưu việc làm*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | Button (icon) | Chưa lưu/đã lưu | Bật hoặc bỏ đánh dấu tin. |
| 2 | List/Card | Trang đầu | Liệt kê việc đã lưu của người dùng hiện tại. |
| 3 | Pagination | Trang 1 | Chuyển trang danh sách việc đã lưu. |

**Dữ liệu được dùng:**
*Từ điển dữ liệu chức năng Lưu việc làm*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | job_bookmarks | X |  | X | X |
| 2 | job_postings |  |  |  | X |
| 3 | companies |  |  |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Sơ đồ hoạt động: Lưu việc làm** — [Vị trí chèn sơ đồ hoạt động].

Người dùng cần đăng nhập để lưu tin. Hệ thống kiểm tra tin tồn tại và ở trạng thái được phép lưu, sau đó tạo liên kết theo cặp người dùng--tin. Nếu liên kết đã tồn tại, hệ thống trả lỗi xung đột; bỏ lưu chỉ xóa liên kết thuộc tài khoản hiện tại. Danh sách được truy vấn theo người dùng đang đăng nhập và phân trang. Trường hợp sai quyền trả 403, tin không tồn tại trả 404.

Lỗi được trả trong envelope JSON gồm `error` và `correlationId`, kèm header `X-Correlation-ID`; HTTP status được ánh xạ theo loại lỗi. Cấu trúc này không phải RFC 7807 Problem Details.

**Phân hệ: Thiết kế chức năng dành cho Nhà tuyển dụng/Doanh nghiệp**

### Chức năng đăng và quản lý tin tuyển dụng


**Mục đích:** Cho phép Recruiter thuộc doanh nghiệp đã xác minh tạo, cập nhật và đóng các tin tuyển dụng của doanh nghiệp.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Giao diện: đăng và quản lý tin tuyển dụng** — [Vị trí chèn ảnh mockup/Figma].

*Các thành phần trong giao diện Quản lý tin tuyển dụng*

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
*Từ điển dữ liệu chức năng Quản lý tin tuyển dụng*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | job_postings | X | X |  | X |
| 2 | job_skills | X | X | X | X |
| 3 | job_industries | X | X | X | X |
| 4 | companies / company_memberships |  |  |  | X |
| 5 | provinces / wards / skills / industries |  |  |  | X |
| 6 | notifications | X | X |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Sơ đồ hoạt động: Quản lý tin tuyển dụng** — [Vị trí chèn sơ đồ hoạt động].

Khi tạo tin, validator kiểm tra trường bắt buộc, hạn đăng, mức lương, số lượng tuyển, địa điểm, ngành nghề và kỹ năng. Doanh nghiệp phải ở trạng thái Verified, người thao tác phải có vai trò Recruiter và membership đang hoạt động. Tin được tạo ở trạng thái PendingReview. Admin mới có thể phát hành hoặc từ chối tin đang chờ; khi tin được phát hành, thông báo cho người theo dõi công ty được ghi vào CSDL và việc phát SignalR được xếp qua Hangfire theo lô. Lỗi enqueue được ghi log và không làm hủy tin đã commit. Recruiter có thể cập nhật tin chưa đóng/hết hạn hoặc đóng tin; tác vụ nền chuyển tin đã phát hành quá hạn sang Expired. Các lỗi validation trả 422, sai quyền 403, trạng thái xung đột 409.

Lỗi được trả trong envelope JSON gồm `error` và `correlationId`, kèm header `X-Correlation-ID`; HTTP status được ánh xạ theo loại lỗi. Cấu trúc này không phải RFC 7807 Problem Details.

### Chức năng Ứng tuyển và theo dõi hồ sơ


**Mục đích:** Cho phép ứng viên nộp hồ sơ cho tin còn hiệu lực và theo dõi kết quả; cho phép nhà tuyển dụng tiếp nhận hồ sơ ứng tuyển.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Giao diện: Ứng tuyển và theo dõi hồ sơ** — [Vị trí chèn ảnh mockup/Figma].

*Các thành phần trong giao diện Ứng tuyển*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | Radio/Card selector | Chưa chọn | Chọn một phiên bản CV trực tuyến. |
| 2 | File selector | Chưa chọn | Chọn tệp PDF đã tải lên thay cho CV trực tuyến. |
| 3 | Textarea | Rỗng | Nhập thư giới thiệu. |
| 4 | Button | N/A | Gửi hồ sơ ứng tuyển. |
| 5 | Table/Timeline | Trang đầu | Theo dõi trạng thái và lịch sử hồ sơ. |
| 6 | Status dropdown | Trạng thái hiện tại | Recruiter thay đổi trạng thái hồ sơ trong luồng hợp lệ. |

**Dữ liệu được dùng:**
*Từ điển dữ liệu chức năng Ứng tuyển*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | applications | X | X |  | X |
| 2 | application_status_histories | X |  |  | X |
| 3 | cv_versions / media_files |  |  |  | X |
| 4 | job_postings / companies / company_memberships |  |  |  | X |
| 5 | ai_match_results | X |  |  | X |
| 6 | notifications | X | X |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Sơ đồ hoạt động: Ứng tuyển và theo dõi hồ sơ** — [Vị trí chèn sơ đồ hoạt động].

Máy chủ chỉ nhận hồ sơ khi tin đang Published, doanh nghiệp đã Verified và hạn nộp chưa qua. Mỗi ứng viên chỉ được nộp một hồ sơ cho một tin. Yêu cầu phải có đúng một nguồn CV: phiên bản CV thuộc ứng viên hoặc PDF thuộc ứng viên, chưa dùng cho hồ sơ khác và không quá 5 MB. Hệ thống ghi hồ sơ cùng trạng thái Submitted và lịch sử ban đầu trong giao dịch. Nếu dùng CV trực tuyến, bộ máy so khớp có thể tính điểm và lưu ai_match_results; thiếu embedding không ngăn phân tích theo phương thức dự phòng của bộ máy.

Thông báo cho thành viên công ty được ghi sau khi hồ sơ thành công. SignalR phát trực tiếp; trong đợt nhiều hồ sơ liên tiếp, hệ thống gộp nội dung và giới hạn toast bằng cache 10 giây, chỉ phát sự kiện tăng bộ đếm. Lỗi phát thông báo không làm đảo ngược hồ sơ đã nộp. Khi đổi trạng thái, chỉ Recruiter có membership đang hoạt động được thao tác; miền kiểm tra chuyển trạng thái hợp lệ, lưu lịch sử và thông báo cho ứng viên. HTTP lỗi được ánh xạ tương ứng: sai đầu vào 422, không xác thực 401, không đủ quyền 403, hồ sơ/tin không tồn tại 404, ứng tuyển trùng hoặc xung đột đồng thời 409.

Lỗi được trả trong envelope JSON gồm `error` và `correlationId`, kèm header `X-Correlation-ID`; HTTP status được ánh xạ theo loại lỗi. Cấu trúc này không phải RFC 7807 Problem Details.
