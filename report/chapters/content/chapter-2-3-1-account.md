## Nhóm chức năng dùng chung cho Ứng viên và Nhà tuyển dụng/Doanh nghiệp

### 2.3.1. Chức năng đăng ký tài khoản


**Mục đích:** Cho phép người dùng tạo tài khoản với vai trò Ứng viên hoặc Nhà tuyển dụng để sử dụng các chức năng tương ứng của hệ thống.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Hình 2.3.1. Giao diện đăng ký tài khoản** — [Vị trí chèn ảnh mockup/Figma].

*Bảng 2.3.1. Các thành phần trong giao diện Đăng ký tài khoản*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Ô nhập văn bản | Rỗng | Nhập họ tên người đăng ký. |
| 2 | Ô nhập văn bản | Rỗng | Nhập email hợp lệ và chưa được sử dụng. |
| 3 | Ô nhập văn bản | Rỗng | Nhập số điện thoại theo quy tắc kiểm tra của hệ thống. |
| 4 | Ô nhập mật khẩu | Rỗng | Nhập mật khẩu đạt yêu cầu xác thực. |
| 5 | Nút chọn vai trò/nút gửi | Chưa chọn | Chọn luồng đăng ký Ứng viên hoặc Nhà tuyển dụng và gửi biểu mẫu. |

**Dữ liệu được dùng:** Bảng từ điển dữ liệu sau đây liệt kê các bảng được chức năng truy vấn hoặc thay đổi.

*Bảng 2.3.1a. Từ điển dữ liệu chức năng Đăng ký tài khoản*

| STT | Tên bảng | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | users | X |  |  | X |
| 2 | roles |  |  |  | X |
| 3 | user_roles | X |  |  |  |
| 4 | refresh_tokens | X |  |  |  |

**Cách xử lý và sơ đồ hoạt động:** Chèn sơ đồ tại caption *Hình 2.3.1a. Sơ đồ hoạt động chức năng Đăng ký tài khoản*.

> **Hình 2.3.1a. Sơ đồ hoạt động chức năng Đăng ký tài khoản** — [Vị trí chèn ảnh mockup/Figma hoặc sơ đồ hoạt động].

Hệ thống nhận email, số điện thoại, mật khẩu, họ tên và vai trò đăng ký. Bộ kiểm tra đầu vào xác thực các trường và chuẩn hóa dữ liệu; nếu dữ liệu sai hoặc email đã tồn tại, hệ thống dừng luồng và trả lỗi tương ứng. Nếu hợp lệ, quy trình dùng chung tạo tài khoản, băm mật khẩu và gán vai trò Candidate hoặc Recruiter trong giao dịch. Khi thao tác thành công, hệ thống trả kết quả đăng ký; nếu phát sinh xung đột dữ liệu trong lúc ghi, giao dịch không tạo tài khoản một phần. Đăng ký không gọi dịch vụ bất đồng bộ hay phát Domain Event chuyên biệt.

Lỗi nghiệp vụ được đóng gói thành JSON gồm `error` (mã, thông điệp, chi tiết và dữ liệu tùy chọn) cùng `correlationId`; phản hồi có header `X-Correlation-ID`. Lỗi kiểm tra dữ liệu dùng HTTP 422, email trùng dùng HTTP 409; lỗi chưa phân loại được ghi log và trả HTTP 500. Đây là cấu trúc lỗi riêng của ứng dụng, không phải RFC 7807 Problem Details. Luồng này không phát Domain Event và không có bước xử lý nền.

### 2.3.2. Chức năng đăng nhập, làm mới phiên và đăng xuất


**Mục đích:** Xác thực tài khoản, cấp thông tin phiên truy cập và cho phép người dùng duy trì hoặc kết thúc phiên.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Hình 2.3.2. Giao diện đăng nhập, làm mới phiên và đăng xuất** — [Vị trí chèn ảnh mockup/Figma].

*Bảng 2.3.2. Các thành phần trong giao diện Đăng nhập và quản lý phiên*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Ô nhập văn bản | Rỗng | Nhập email tài khoản. |
| 2 | Ô nhập mật khẩu | Rỗng | Nhập mật khẩu. |
| 3 | Nút | — | Gửi thông tin đăng nhập bằng email và mật khẩu. |
| 4 | Nút | — | Khởi tạo đăng nhập Google thông qua Firebase. |
| 5 | Nút/liên kết | — | Kích hoạt làm mới phiên hoặc đăng xuất. |

**Dữ liệu được dùng:** Bảng 2.3.4 mô tả các bảng dữ liệu.

*Bảng 2.3.2a. Từ điển dữ liệu chức năng Đăng nhập và quản lý phiên*

| STT | Tên bảng | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | users |  |  |  | X |
| 2 | user_roles |  |  |  | X |
| 3 | refresh_tokens | X | X |  | X |

**Cách xử lý và sơ đồ hoạt động:** Chèn sơ đồ tại caption *Hình 2.3.2a. Sơ đồ hoạt động chức năng Đăng nhập và quản lý phiên*.

> **Hình 2.3.2a. Sơ đồ hoạt động chức năng Đăng nhập và quản lý phiên** — [Vị trí chèn ảnh mockup/Figma hoặc sơ đồ hoạt động].

Với đăng nhập mật khẩu, hệ thống truy vấn tài khoản theo email, so khớp mật khẩu đã băm và kiểm tra trạng thái tài khoản. Với đăng nhập Google, máy chủ xác minh Firebase ID token và xử lý tài khoản hiện hữu hoặc tạo tài khoản mới theo vai trò được yêu cầu. Khi xác thực thành công, hệ thống sinh Access Token và Refresh Token; Refresh Token được băm trước khi lưu. Làm mới phiên xác thực token hiện tại, thu hồi token cũ và cấp token mới trong giao dịch. Đăng xuất thu hồi token được chỉ định hoặc toàn bộ token chưa thu hồi theo yêu cầu. Sai thông tin xác thực hoặc token hết hiệu lực làm luồng kết thúc với lỗi xác thực; lỗi từ dịch vụ Firebase được chuyển thành lỗi nghiệp vụ thích hợp.

Lỗi API được trả dưới dạng JSON gồm `error` (mã, thông điệp, chi tiết và dữ liệu tùy chọn) cùng `correlationId`, kèm header `X-Correlation-ID`. Middleware ánh xạ lỗi theo HTTP 400, 401, 403, 404, 409, 410, 413, 415, 422, 429 hoặc 503 tùy loại; lỗi chưa phân loại trả 500. Cấu trúc hiện tại không phải RFC 7807 Problem Details. Chỉ các tác vụ nền hoặc thông báo thời gian thực được nêu rõ trong luồng mới chạy bất đồng bộ; mã nguồn không phát Domain Event chuyên biệt cho chức năng này.

### 2.3.3. Chức năng quản lý thông tin tài khoản và đổi mật khẩu


**Mục đích:** Cho phép người dùng đã đăng nhập xem và cập nhật một số thông tin cá nhân, thay đổi mật khẩu và tùy chọn thu hồi các phiên khác.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Hình 2.3.3. Giao diện quản lý thông tin tài khoản và đổi mật khẩu** — [Vị trí chèn ảnh mockup/Figma].

*Bảng 2.3.3. Các thành phần trong giao diện Quản lý thông tin tài khoản*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Ô nhập văn bản | Thông tin hiện tại | Cập nhật họ tên. |
| 2 | Ô nhập văn bản | Thông tin hiện tại | Cập nhật số điện thoại. |
| 3 | Bộ chọn ảnh | Ảnh hiện tại | Chọn ảnh đại diện đã tải lên. |
| 4 | Nút | — | Lưu các trường hồ sơ được phép cập nhật. |
| 5 | Ô nhập mật khẩu | Rỗng | Nhập mật khẩu hiện tại và mật khẩu mới khi đổi mật khẩu. |
| 6 | Hộp kiểm | Không chọn | Yêu cầu thu hồi các phiên khác sau khi đổi mật khẩu. |

**Dữ liệu được dùng:** Bảng 2.3.6 mô tả các bảng dữ liệu.

*Bảng 2.3.3a. Từ điển dữ liệu chức năng Quản lý thông tin tài khoản*

| STT | Tên bảng | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | users |  | X |  | X |
| 2 | media_files |  |  |  | X |
| 3 | refresh_tokens |  | X |  | X |

**Cách xử lý và sơ đồ hoạt động:** Chèn sơ đồ tại caption *Hình 2.3.3a. Sơ đồ hoạt động chức năng Quản lý thông tin tài khoản*.

> **Hình 2.3.3a. Sơ đồ hoạt động chức năng Quản lý thông tin tài khoản** — [Vị trí chèn ảnh mockup/Figma hoặc sơ đồ hoạt động].

Máy chủ xác định tài khoản từ phiên đăng nhập rồi trả các trường hồ sơ hiện tại. Khi cập nhật, chỉ họ tên, số điện thoại và định danh tệp ảnh đại diện được chấp nhận; trường ngoài danh sách được trả lỗi validation. Hệ thống xác minh tệp ảnh tồn tại và thuộc người dùng trước khi liên kết. Sau khi lưu ảnh mới, tệp ảnh cũ không còn tham chiếu được đưa vào Hangfire để xóa nền. Khi đổi mật khẩu, hệ thống đối chiếu mật khẩu hiện tại, kiểm tra mật khẩu mới rồi băm và lưu; nếu chọn thu hồi phiên, các Refresh Token tương ứng được đánh dấu thu hồi. Việc xóa tệp nền không chặn phản hồi cập nhật hồ sơ.

Lỗi API được trả dưới dạng JSON gồm `error` (mã, thông điệp, chi tiết và dữ liệu tùy chọn) cùng `correlationId`, kèm header `X-Correlation-ID`. Middleware ánh xạ lỗi theo HTTP 400, 401, 403, 404, 409, 410, 413, 415, 422, 429 hoặc 503 tùy loại; lỗi chưa phân loại trả 500. Cấu trúc hiện tại không phải RFC 7807 Problem Details. Chỉ các tác vụ nền hoặc thông báo thời gian thực được nêu rõ trong luồng mới chạy bất đồng bộ; mã nguồn không phát Domain Event chuyên biệt cho chức năng này.

### 2.3.4. Chức năng tải lên và quản lý tệp đa phương tiện


**Mục đích:** Cung cấp khả năng tải và quản lý ảnh hoặc tệp PDF được dùng trong hồ sơ, CV và doanh nghiệp.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Hình 2.3.4. Giao diện tải lên và quản lý tệp đa phương tiện** — [Vị trí chèn ảnh mockup/Figma].

*Bảng 2.3.4. Các thành phần trong giao diện Tải lên tệp*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Trường chọn tệp | Chưa chọn | Chọn tệp theo loại được chức năng hỗ trợ. |
| 2 | Nút | — | Bắt đầu tải tệp lên dịch vụ lưu trữ. |
| 3 | Vùng xem trước ảnh/liên kết | Trống | Hiển thị URL hoặc ảnh sau khi tải thành công. |
| 4 | Nút biểu tượng | — | Yêu cầu xóa tệp nếu tệp không còn được sử dụng. |

**Dữ liệu được dùng:** Bảng 2.3.8 mô tả các bảng dữ liệu.

*Bảng 2.3.4a. Từ điển dữ liệu chức năng Tải lên tệp*

| STT | Tên bảng | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | media_files | X | X | X | X |
| 2 | users / cvs / companies |  | X |  | X |

**Cách xử lý và sơ đồ hoạt động:** Chèn sơ đồ tại caption *Hình 2.3.4a. Sơ đồ hoạt động chức năng Tải lên và quản lý tệp*.

> **Hình 2.3.4a. Sơ đồ hoạt động chức năng Tải lên và quản lý tệp** — [Vị trí chèn ảnh mockup/Figma hoặc sơ đồ hoạt động].

Máy chủ kiểm tra loại, tên và kích thước tệp theo quy tắc của endpoint. Tệp hợp lệ được gửi đến dịch vụ lưu trữ; sau khi nhận URL và public ID, hệ thống ghi bản ghi `media_files` gắn với chủ sở hữu. Nếu ghi CSDL thất bại sau khi tải lên, hệ thống xóa tệp vừa tải để tránh dữ liệu mồ côi. Khi xóa, hệ thống kiểm tra quyền sở hữu và quan hệ tham chiếu; tệp đang được dùng bị từ chối xóa. Tệp hợp lệ được đánh dấu xóa trong CSDL rồi Hangfire thực hiện xóa vật lý. Lỗi dịch vụ lưu trữ được chuyển thành lỗi API; các lỗi đều có correlation ID.

Lỗi API được trả dưới dạng JSON gồm `error` (mã, thông điệp, chi tiết và dữ liệu tùy chọn) cùng `correlationId`, kèm header `X-Correlation-ID`. Middleware ánh xạ lỗi theo HTTP 400, 401, 403, 404, 409, 410, 413, 415, 422, 429 hoặc 503 tùy loại; lỗi chưa phân loại trả 500. Cấu trúc hiện tại không phải RFC 7807 Problem Details. Chỉ các tác vụ nền hoặc thông báo thời gian thực được nêu rõ trong luồng mới chạy bất đồng bộ; mã nguồn không phát Domain Event chuyên biệt cho chức năng này.
