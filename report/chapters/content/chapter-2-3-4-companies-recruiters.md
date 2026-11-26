**Chức năng dành cho Nhà tuyển dụng/Doanh nghiệp**

### Chức năng quản lý doanh nghiệp và thành viên

**Mục đích**

Cho phép nhà tuyển dụng tạo và quản lý hồ sơ doanh nghiệp, mời thành viên và kiểm soát tư cách thành viên phục vụ hoạt động tuyển dụng.

**Giao diện**

> **Hình. Quản lý doanh nghiệp và thành viên** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Quản lý doanh nghiệp*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Ô nhập và bộ chọn ảnh | Rỗng hoặc thông tin hiện tại | Nhập tên, mã số thuế, liên hệ, mô tả và chọn logo. |
| 2 | Danh sách thành viên | Thành viên hiện tại | Xem vai trò và trạng thái của từng thành viên. |
| 3 | Hộp thoại mời | Hạn bảy ngày | Nhập email nhà tuyển dụng và chọn thời hạn mời. |
| 4 | Danh sách lời mời |   | Chấp nhận hoặc từ chối lời mời nhận được. |
| 5 | Nút chuyển quyền hoặc loại thành viên |   | Chủ sở hữu thao tác với thành viên đủ điều kiện. |
| 6 | Nút rời công ty |   | Thành viên xác nhận rời doanh nghiệp. |
| 7 | Danh sách yêu cầu gia nhập | Đang chờ | Chủ sở hữu duyệt hoặc từ chối yêu cầu. |

**Dữ liệu được dùng**

*Từ điển dữ liệu chức năng Quản lý doanh nghiệp*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `companies` | X | X |   | X |
| 2 | `company_memberships` | X | X |   | X |
| 3 | `company_invitations` | X | X |   | X |
| 4 | `company_join_requests` |   | X |   | X |
| 5 | `media_files` | X | X |   | X |
| 6 | `users` / `user_roles` / `roles` |   |   |   | X |
| 7 | `notifications` | X |   |   | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Quản lý doanh nghiệp và thành viên** [Vị trí chèn sơ đồ hoạt động].

Khi tạo doanh nghiệp, máy chủ kiểm tra mã số thuế duy nhất, giới hạn sở hữu tối đa năm doanh nghiệp và quyền sở hữu logo nếu có. Hệ thống tạo doanh nghiệp và gán người tạo làm chủ sở hữu trong cùng một giao dịch. Chủ sở hữu đang hoạt động có thể cập nhật hồ sơ doanh nghiệp.

Chủ sở hữu gửi lời mời tới tài khoản nhà tuyển dụng. Lời mời đang chờ không được trùng và thời hạn phải còn hiệu lực khi phản hồi. Người nhận có thể chấp nhận để gia nhập hoặc từ chối. Chủ sở hữu cũng có thể duyệt yêu cầu gia nhập được gửi từ trang chi tiết công ty. Khi chấp thuận, hệ thống tạo hoặc kích hoạt lại tư cách thành viên.

Chủ sở hữu có thể chuyển quyền cho thành viên đủ điều kiện hoặc loại thành viên. Thành viên có thể chủ động rời doanh nghiệp. Hệ thống cập nhật tư cách thành viên sang `Left` khi một người bị loại hoặc rời công ty. Những nghiệp vụ phát sinh thông báo lưu thông báo trước khi gửi qua SignalR.

**Chức năng dành cho khách truy cập, ứng viên và nhà tuyển dụng**

### Chức năng khám phá, theo dõi doanh nghiệp và danh sách tuyển dụng

**Mục đích**

Giúp người dùng tìm hiểu thông tin công khai của doanh nghiệp, xem vị trí đang tuyển và theo dõi công ty quan tâm.

**Giao diện**

Giao diện gồm trang chi tiết doanh nghiệp và danh sách doanh nghiệp đã theo dõi của ứng viên.

> **Hình. Chi tiết doanh nghiệp và việc đang tuyển** [Vị trí chèn ảnh giao diện].

> **Hình. Danh sách doanh nghiệp đã theo dõi** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Khám phá doanh nghiệp*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Tab | Tổng quan | Chuyển giữa giới thiệu doanh nghiệp và danh sách việc đang tuyển. |
| 2 | Nút theo dõi | Trạng thái hiện tại | Ứng viên theo dõi hoặc bỏ theo dõi doanh nghiệp. |
| 3 | Nút và hộp thoại gia nhập |   | Nhà tuyển dụng đủ điều kiện gửi yêu cầu gia nhập. |
| 4 | Danh sách và ô tìm kiếm | Rỗng | Ứng viên xem hoặc tìm trong các doanh nghiệp đã theo dõi. |
| 5 | Phân trang | Trang 1 | Chuyển trang danh sách việc đang tuyển. |

**Dữ liệu được dùng**

*Từ điển dữ liệu chức năng Khám phá doanh nghiệp*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `companies` |   |   |   | X |
| 2 | `company_follows` | X |   | X | X |
| 3 | `job_postings` |   |   |   | X |
| 4 | `company_memberships` |   |   |   | X |
| 5 | `company_join_requests` | X |   |   | X |
| 6 | `users` |   |   |   | X |
| 7 | `notifications` | X |   |   |   |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Khám phá doanh nghiệp** [Vị trí chèn sơ đồ hoạt động].

Khách truy cập có thể xem trang chi tiết doanh nghiệp và danh sách việc đang tuyển. API cũng cung cấp truy vấn danh sách doanh nghiệp công khai. Khi ứng viên theo dõi hoặc bỏ theo dõi, máy chủ chỉ thêm hoặc xóa liên kết của tài khoản hiện tại. Người chưa đăng nhập được nhắc đăng nhập trước khi tiếp tục.

Nhà tuyển dụng đủ điều kiện có thể gửi yêu cầu gia nhập từ trang doanh nghiệp. Máy chủ kiểm tra tư cách thành viên và yêu cầu đang chờ trước khi ghi yêu cầu mới. Nếu có chủ sở hữu đang hoạt động, hệ thống tạo thông báo về yêu cầu gia nhập. Việc thêm hoặc kích hoạt tư cách thành viên thuộc luồng xét duyệt ở mục 2.3.12.

**Chức năng dành cho Nhà tuyển dụng/Doanh nghiệp**

### Chức năng quản lý ứng viên theo tin tuyển dụng

**Mục đích**

Cho phép Recruiter thuộc doanh nghiệp xem hồ sơ đã nhận, đọc CV/thư giới thiệu và cập nhật tiến trình tuyển dụng.

**Giao diện**

> **Hình. Quản lý ứng viên theo tin tuyển dụng** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Quản lý ứng viên*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Bảng hồ sơ và phân trang | Trang 1 | Xem hồ sơ của doanh nghiệp hoặc theo từng tin. |
| 2 | Ô tìm kiếm và bộ lọc | Tất cả | Tìm và lọc hồ sơ theo trạng thái. |
| 3 | Nút xem tài liệu |   | Mở CV hoặc thư giới thiệu. |
| 4 | Bộ chọn trạng thái | Trạng thái hiện tại | Hiển thị các bước chuyển được phép. |
| 5 | Hộp thoại xác nhận và ô ghi chú | Rỗng | Xác nhận cập nhật và nhập ghi chú tối đa 2.000 ký tự. |

**Dữ liệu được dùng**

*Từ điển dữ liệu chức năng Quản lý ứng viên*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `applications` |   | X |   | X |
| 2 | `application_status_histories` | X |   |   |   |
| 3 | `job_postings` |   | X |   | X |
| 4 | `company_memberships` / `companies` |   |   |   | X |
| 5 | `users` |   |   |   | X |
| 6 | `cv_versions` / `media_files` |   |   |   | X |
| 7 | `notifications` | X | X |   | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Quản lý ứng viên** [Vị trí chèn sơ đồ hoạt động].

Máy chủ kiểm tra vai trò nhà tuyển dụng và tư cách thành viên đang hoạt động trước khi trả danh sách hồ sơ theo doanh nghiệp hoặc theo tin. Khi nhận yêu cầu cập nhật, hệ thống kiểm tra bước chuyển được phép và độ dài ghi chú. Trạng thái hồ sơ, lịch sử và thông báo cho ứng viên được ghi trong cùng một giao dịch.

Khi hồ sơ chuyển sang `Offered` hoặc `Hired`, hệ thống tính số vị trí đã được giữ và có thể đóng tin nếu đã đủ chỉ tiêu. Nếu hồ sơ rời trạng thái giữ chỗ và chỉ tiêu còn trống, hệ thống có thể mở lại tin đã đóng. Sau khi lưu thay đổi, tác vụ nền gửi thông báo cho ứng viên.

**Chức năng dành cho Quản trị viên**

### Chức năng xác minh doanh nghiệp và kiểm duyệt tin tuyển dụng

**Mục đích**

Cho phép quản trị viên xác minh doanh nghiệp, xét duyệt tin đang chờ và đóng tin đã phát hành.

**Giao diện**

> **Hình. Danh sách và chi tiết xác minh doanh nghiệp** [Vị trí chèn ảnh giao diện].

> **Hình. Danh sách kiểm duyệt và hộp thoại đóng tin tuyển dụng** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Kiểm duyệt*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Trang danh sách và bộ lọc | Chờ xử lý | Tìm và lọc các hồ sơ doanh nghiệp hoặc tin tuyển dụng theo trạng thái. |
| 2 | Vùng xem chi tiết | Bản ghi được chọn | Xem thông tin doanh nghiệp hoặc nội dung tuyển dụng trước khi quyết định. |
| 3 | Nút duyệt và từ chối |   | Xác nhận kết quả kiểm duyệt. |
| 4 | Nút đóng tin |   | Mở hộp thoại đóng tin đang phát hành. |
| 5 | Ô nhập lý do | Rỗng | Nhập lý do từ chối hoặc lý do đóng tin theo biểu mẫu tương ứng. |

**Dữ liệu được dùng**

*Từ điển dữ liệu chức năng Kiểm duyệt*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `companies` |   | X |   | X |
| 2 | `job_postings` |   | X |   | X |
| 3 | `company_memberships` |   |   |   | X |
| 4 | `notifications` | X |   |   | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Kiểm duyệt** [Vị trí chèn sơ đồ hoạt động].

Khi xác minh doanh nghiệp, quản trị viên chọn chấp thuận hoặc từ chối. Từ chối yêu cầu lý do từ 5 đến 1.000 ký tự. Máy chủ cập nhật trạng thái, thời điểm xác minh và tạo thông báo cho chủ sở hữu nếu có người nhận phù hợp.

Khi kiểm duyệt tin đang `PendingReview`, quản trị viên có thể phát hành hoặc từ chối. Trước khi phát hành, máy chủ kiểm tra doanh nghiệp đã được xác minh. Quản trị viên cũng có thể đóng tin đang `Published`. Thao tác không phù hợp với trạng thái hiện tại bị từ chối. Khi có thông báo, hệ thống lưu quyết định và thông báo trước khi chuyển thông báo qua SignalR.
