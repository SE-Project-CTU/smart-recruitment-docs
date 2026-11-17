## Chức năng dành cho Nhà tuyển dụng/Doanh nghiệp

### 2.3.12. Chức năng quản lý doanh nghiệp và thành viên


**Mục đích:** Cho phép nhà tuyển dụng tạo và quản lý hồ sơ doanh nghiệp, mời thành viên và kiểm soát tư cách thành viên phục vụ hoạt động tuyển dụng.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Hình 2.3.12. Giao diện quản lý doanh nghiệp và thành viên** — [Vị trí chèn ảnh mockup/Figma hoặc sơ đồ hoạt động].

*Bảng 2.3.12. Các thành phần trong giao diện Quản lý doanh nghiệp*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | Textbox | Rỗng/thông tin hiện có | Tên, mã số thuế và thông tin liên hệ doanh nghiệp. |
| 2 | Textarea | Rỗng/thông tin hiện có | Mô tả doanh nghiệp. |
| 3 | Image picker | Logo hiện tại | Chọn logo ảnh thuộc sở hữu người thao tác. |
| 4 | Table | Thành viên hiện tại | Hiển thị vai trò và trạng thái membership. |
| 5 | Dialog/Form | Rỗng | Gửi lời mời theo email đến Recruiter. |
| 6 | Button | N/A | Chuyển vai trò, loại thành viên hoặc chuyển quyền sở hữu theo quyền Owner. |
| 7 | Table/Button group | Yêu cầu chờ xử lý | Xét duyệt hoặc từ chối yêu cầu gia nhập. |

**Dữ liệu được dùng:**
*Bảng 2.3.12a. Từ điển dữ liệu chức năng Quản lý doanh nghiệp*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | companies | X | X |  | X |
| 2 | company_memberships | X | X | X | X |
| 3 | company_invitations | X | X |  | X |
| 4 | company_join_requests | X | X |  | X |
| 5 | media_files |  |  |  | X |
| 6 | notifications | X |  |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Hình 2.3.12a. Sơ đồ hoạt động chức năng Quản lý doanh nghiệp và thành viên** — [Vị trí chèn ảnh mockup/Figma hoặc sơ đồ hoạt động].

Khi tạo doanh nghiệp, hệ thống kiểm tra mã số thuế chưa tồn tại, giới hạn tối đa năm công ty do một Recruiter sở hữu và xác minh logo ảnh thuộc người dùng; trong giao dịch tạo công ty, người tạo được gán Owner đang hoạt động. Khi cập nhật, chỉ Owner đang hoạt động được phép sửa. Owner gửi lời mời tới email có tài khoản Recruiter, lời mời chờ khác không được trùng và thời hạn phải ở tương lai (mặc định bảy ngày). Người nhận chấp nhận hoặc từ chối lời mời; chấp nhận tạo membership và thông báo cho người mời. Người dùng cũng có thể gửi yêu cầu gia nhập; không cho tạo yêu cầu chờ trùng hoặc gửi khi đã là thành viên hoạt động. Owner duyệt yêu cầu đang Pending; nếu chấp nhận, hệ thống tạo/cập nhật membership Recruiter, nếu từ chối chỉ cập nhật trạng thái yêu cầu. Thông báo được lưu trong giao dịch và gửi thời gian thực sau commit; lỗi dispatch không đảo ngược kết quả nghiệp vụ.

## Chức năng dành cho Khách truy cập/Ứng viên

Lỗi API được trả dưới dạng JSON gồm `error` (mã, thông điệp, chi tiết và dữ liệu tùy chọn) cùng `correlationId`, kèm header `X-Correlation-ID`. Middleware ánh xạ lỗi theo HTTP 400, 401, 403, 404, 409, 410, 413, 415, 422, 429 hoặc 503 tùy loại; lỗi chưa phân loại trả 500. Cấu trúc hiện tại không phải RFC 7807 Problem Details. Chỉ các tác vụ nền hoặc thông báo thời gian thực được nêu rõ trong luồng mới chạy bất đồng bộ; mã nguồn không phát Domain Event chuyên biệt cho chức năng này.

### 2.3.13. Chức năng khám phá, theo dõi doanh nghiệp và danh sách tuyển dụng


**Mục đích:** Giúp người dùng tìm hiểu thông tin công khai của doanh nghiệp, xem vị trí đang tuyển và theo dõi công ty quan tâm.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Hình 2.3.13. Giao diện khám phá và theo dõi doanh nghiệp** — [Vị trí chèn ảnh mockup/Figma hoặc sơ đồ hoạt động].

*Bảng 2.3.13. Các thành phần trong giao diện Khám phá doanh nghiệp*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | Textbox | Rỗng | Tìm doanh nghiệp. |
| 2 | Card/List | Trang đầu | Hiển thị doanh nghiệp và thông tin tóm tắt. |
| 3 | Tab | Tổng quan | Chuyển giữa giới thiệu và danh sách việc làm. |
| 4 | Button (icon) | Theo dõi hiện tại | Theo dõi hoặc bỏ theo dõi công ty. |
| 5 | Button | N/A | Gửi yêu cầu gia nhập nếu người dùng đủ điều kiện. |
| 6 | Pagination | Trang 1 | Chuyển trang danh sách doanh nghiệp/tin. |

**Dữ liệu được dùng:**
*Bảng 2.3.13a. Từ điển dữ liệu chức năng Khám phá doanh nghiệp*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | companies |  |  |  | X |
| 2 | company_follows | X |  | X | X |
| 3 | job_postings |  |  |  | X |
| 4 | company_memberships / company_join_requests | X |  |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Hình 2.3.13a. Sơ đồ hoạt động chức năng Khám phá doanh nghiệp** — [Vị trí chèn ảnh mockup/Figma hoặc sơ đồ hoạt động].

Hệ thống truy vấn danh sách và chi tiết công khai, chỉ trả tin tuyển dụng đang được phát hành. Khi theo dõi/bỏ theo dõi, máy chủ yêu cầu tài khoản đã xác thực và chỉ tác động lên liên kết của người dùng hiện tại. Nếu chưa đăng nhập, giao diện yêu cầu đăng nhập trước thao tác ghi. Yêu cầu gia nhập chuyển sang luồng xét duyệt ở chức năng Quản lý doanh nghiệp. Lỗi không tìm thấy công ty trả 404; thao tác không có quyền trả 403.

## Chức năng dành cho Nhà tuyển dụng/Doanh nghiệp

Lỗi API được trả dưới dạng JSON gồm `error` (mã, thông điệp, chi tiết và dữ liệu tùy chọn) cùng `correlationId`, kèm header `X-Correlation-ID`. Middleware ánh xạ lỗi theo HTTP 400, 401, 403, 404, 409, 410, 413, 415, 422, 429 hoặc 503 tùy loại; lỗi chưa phân loại trả 500. Cấu trúc hiện tại không phải RFC 7807 Problem Details. Chỉ các tác vụ nền hoặc thông báo thời gian thực được nêu rõ trong luồng mới chạy bất đồng bộ; mã nguồn không phát Domain Event chuyên biệt cho chức năng này.

### 2.3.14. Chức năng quản lý ứng viên theo tin tuyển dụng


**Mục đích:** Cho phép Recruiter thuộc doanh nghiệp xem hồ sơ đã nhận, đọc CV/thư giới thiệu và cập nhật tiến trình tuyển dụng.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Hình 2.3.14. Giao diện quản lý ứng viên theo tin tuyển dụng** — [Vị trí chèn ảnh mockup/Figma hoặc sơ đồ hoạt động].

*Bảng 2.3.14. Các thành phần trong giao diện Quản lý ứng viên*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | Table | Trang đầu | Danh sách ứng viên đã nộp vào tin. |
| 2 | Filter/Dropdown | Tất cả | Lọc hồ sơ theo trạng thái và điều kiện truy vấn. |
| 3 | Button | N/A | Mở CV, thư giới thiệu hoặc chi tiết ứng viên. |
| 4 | Status dropdown | Trạng thái hiện tại | Chuyển trạng thái theo luồng hợp lệ. |
| 5 | Textarea | Rỗng | Ghi chú thay đổi trạng thái, tối đa 2.000 ký tự. |
| 6 | Pagination | Trang 1 | Chuyển trang hồ sơ. |

**Dữ liệu được dùng:**
*Bảng 2.3.14a. Từ điển dữ liệu chức năng Quản lý ứng viên*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | applications |  | X |  | X |
| 2 | application_status_histories | X |  |  | X |
| 3 | job_postings / companies / company_memberships |  |  |  | X |
| 4 | cv_versions / media_files |  |  |  | X |
| 5 | notifications | X |  |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Hình 2.3.14a. Sơ đồ hoạt động chức năng Quản lý ứng viên** — [Vị trí chèn ảnh mockup/Figma hoặc sơ đồ hoạt động].

Máy chủ xác nhận tài khoản có vai trò Recruiter và membership đang hoạt động tại công ty sở hữu tin trước khi trả hồ sơ. Khi đổi trạng thái, validator chỉ nhận Reviewing, Shortlisted, Interviewing, Offered, Hired, Rejected hoặc Withdrawn; ghi chú tối đa 2.000 ký tự. Thực thể hồ sơ kiểm tra chuyển trạng thái theo state machine; cập nhật hồ sơ, lịch sử và tạo thông báo được thực hiện trong giao dịch. Sau commit, Hangfire xếp phát thông báo thời gian thực; lỗi xếp tác vụ được ghi log, không làm mất thay đổi trạng thái. Xung đột đồng thời trả 409; lỗi quyền 403, không tìm thấy hồ sơ 404, validation 422.

## Chức năng dành cho Quản trị viên

Lỗi API được trả dưới dạng JSON gồm `error` (mã, thông điệp, chi tiết và dữ liệu tùy chọn) cùng `correlationId`, kèm header `X-Correlation-ID`. Middleware ánh xạ lỗi theo HTTP 400, 401, 403, 404, 409, 410, 413, 415, 422, 429 hoặc 503 tùy loại; lỗi chưa phân loại trả 500. Cấu trúc hiện tại không phải RFC 7807 Problem Details. Chỉ các tác vụ nền hoặc thông báo thời gian thực được nêu rõ trong luồng mới chạy bất đồng bộ; mã nguồn không phát Domain Event chuyên biệt cho chức năng này.

### 2.3.15. Chức năng xác minh doanh nghiệp và kiểm duyệt tin tuyển dụng


**Mục đích:** Cho phép Admin xác minh yêu cầu của doanh nghiệp và duyệt các tin tuyển dụng đang chờ trước khi hiển thị công khai.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Hình 2.3.15. Giao diện xác minh doanh nghiệp và kiểm duyệt tin** — [Vị trí chèn ảnh mockup/Figma hoặc sơ đồ hoạt động].

*Bảng 2.3.15. Các thành phần trong giao diện Kiểm duyệt*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | Tabs/Table | Chờ xử lý | Chuyển giữa doanh nghiệp và tin tuyển dụng chờ duyệt. |
| 2 | Search/Filter | Rỗng/Tất cả | Tìm và lọc bản ghi cần xem xét. |
| 3 | Detail panel | Bản ghi được chọn | Xem thông tin công ty hoặc tin tuyển dụng. |
| 4 | Button | N/A | Chấp thuận hoặc từ chối. |
| 5 | Textarea | Rỗng | Nhập lý do từ chối xác minh doanh nghiệp, 5--1.000 ký tự. |

**Dữ liệu được dùng:**
*Bảng 2.3.15a. Từ điển dữ liệu chức năng Kiểm duyệt*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | companies |  | X |  | X |
| 2 | job_postings |  | X |  | X |
| 3 | company_memberships |  |  |  | X |
| 4 | notifications | X |  |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Hình 2.3.15a. Sơ đồ hoạt động chức năng Kiểm duyệt** — [Vị trí chèn ảnh mockup/Figma hoặc sơ đồ hoạt động].

Admin chỉ có thể duyệt tin đang PendingReview; thao tác làm đổi trạng thái sang Published hoặc Rejected và lặp lại trên tin đã duyệt bị trả 409. Với doanh nghiệp, kết quả chỉ có thể là Verified hoặc Rejected; từ chối bắt buộc có lý do 5--1.000 ký tự. Hệ thống cập nhật trạng thái và thời điểm xác minh, tạo thông báo cho Owner trong giao dịch, sau đó thử phát SignalR. Lỗi phát realtime không làm đảo ngược quyết định đã lưu. Yêu cầu không đủ quyền trả 403, đối tượng không tồn tại trả 404, dữ liệu sai trả 422.

Lỗi API được trả dưới dạng JSON gồm `error` (mã, thông điệp, chi tiết và dữ liệu tùy chọn) cùng `correlationId`, kèm header `X-Correlation-ID`. Middleware ánh xạ lỗi theo HTTP 400, 401, 403, 404, 409, 410, 413, 415, 422, 429 hoặc 503 tùy loại; lỗi chưa phân loại trả 500. Cấu trúc hiện tại không phải RFC 7807 Problem Details. Chỉ các tác vụ nền hoặc thông báo thời gian thực được nêu rõ trong luồng mới chạy bất đồng bộ; mã nguồn không phát Domain Event chuyên biệt cho chức năng này.
