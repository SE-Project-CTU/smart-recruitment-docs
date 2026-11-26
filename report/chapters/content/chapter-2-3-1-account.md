**Nhóm chức năng dùng chung cho Ứng viên và Nhà tuyển dụng/Doanh nghiệp**

### Chức năng đăng ký tài khoản

**Mục đích**

Cho phép người dùng tạo tài khoản với vai trò Ứng viên hoặc Nhà tuyển dụng để sử dụng các chức năng tương ứng của hệ thống.

**Giao diện**

> **Hình. Đăng ký tài khoản** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Đăng ký tài khoản*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Tab | Ứng viên | Chọn vai trò Ứng viên hoặc Nhà tuyển dụng. |
| 2 | Ô nhập họ tên | Rỗng | Nhập họ tên người đăng ký. |
| 3 | Ô nhập email | Rỗng | Nhập email dùng để đăng ký. |
| 4 | Ô nhập số điện thoại | Rỗng | Nhập số điện thoại của người đăng ký. |
| 5 | Ô nhập mật khẩu | Rỗng | Nhập mật khẩu và có thể bật chế độ hiện mật khẩu. |
| 6 | Hộp kiểm | Bỏ chọn | Đồng ý với điều khoản và chính sách trước khi gửi biểu mẫu. |
| 7 | Nút đăng ký |   | Gửi thông tin đăng ký bằng email và mật khẩu. |
| 8 | Nút Google |   | Đăng ký hoặc đăng nhập bằng tài khoản Google theo vai trò đã chọn. |

**Dữ liệu được dùng**

*Từ điển dữ liệu chức năng Đăng ký tài khoản*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `users` | X |   |   | X |
| 2 | `roles` |   |   |   | X |
| 3 | `user_roles` | X |   |   | X |
| 4 | `refresh_tokens` | X |   |   |   |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Đăng ký tài khoản** [Vị trí chèn sơ đồ hoạt động].

Với đăng ký bằng mật khẩu, ứng dụng kiểm tra điều khoản và thông tin bắt buộc rồi gọi API đăng ký tương ứng với vai trò đã chọn. Máy chủ chuẩn hóa dữ liệu, kiểm tra email và số điện thoại đã được sử dụng hay chưa, sau đó băm mật khẩu, tạo tài khoản và gán vai trò trong một giao dịch. Ứng dụng chuyển đến trang đăng nhập sau khi đăng ký thành công. Nếu email hoặc số điện thoại đã được sử dụng, người dùng nhận thông báo và có thể sửa biểu mẫu.

Với Google, ứng dụng mở cửa sổ xác thực Firebase và gửi mã định danh Firebase cùng vai trò đã chọn. Máy chủ xác minh mã, tìm tài khoản theo email và tạo tài khoản nếu chưa có. Khi xác thực thành công, máy chủ cấp phiên truy cập và ứng dụng chuyển về trang chủ.

### Chức năng đăng nhập, làm mới phiên và đăng xuất

**Mục đích**

Xác thực tài khoản, cấp thông tin phiên truy cập và cho phép người dùng duy trì hoặc kết thúc phiên.

**Giao diện**

> **Hình. Đăng nhập, làm mới phiên và đăng xuất** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Đăng nhập và quản lý phiên*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Ô nhập email | Rỗng | Nhập email tài khoản. |
| 2 | Ô nhập mật khẩu | Rỗng | Nhập mật khẩu và có thể bật chế độ hiện mật khẩu. |
| 3 | Nút đăng nhập |   | Gửi thông tin xác thực bằng email và mật khẩu. |
| 4 | Nút Google |   | Mở cửa sổ xác thực Google thông qua Firebase. |
| 5 | Hộp thoại chọn vai trò | Chưa chọn | Chọn vai trò khi lần đầu đăng nhập Google và cần tạo tài khoản. |
| 6 | Mục đăng xuất |   | Kết thúc phiên hiện tại từ menu tài khoản. |

**Dữ liệu được dùng**

*Từ điển dữ liệu chức năng Đăng nhập và quản lý phiên*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `users` | X |   |   | X |
| 2 | `roles` |   |   |   | X |
| 3 | `user_roles` | X |   |   | X |
| 4 | `refresh_tokens` | X | X |   | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Đăng nhập và quản lý phiên** [Vị trí chèn sơ đồ hoạt động].

Khi đăng nhập bằng mật khẩu, máy chủ tìm tài khoản theo email, kiểm tra trạng thái và đối chiếu mật khẩu với giá trị đã băm. Với Google, máy chủ xác minh mã định danh Firebase. Nếu email chưa có tài khoản, ứng dụng yêu cầu chọn vai trò rồi gửi lại yêu cầu để tạo tài khoản và gán vai trò.

Khi xác thực thành công, máy chủ cấp access token và đặt refresh token trong cookie HttpOnly. Cơ sở dữ liệu lưu giá trị băm của refresh token. Ứng dụng tự yêu cầu làm mới phiên khi nhận lỗi xác thực phù hợp. Máy chủ kiểm tra token hiện tại, thu hồi token cũ và cấp token mới. Khi người dùng đăng xuất, ứng dụng yêu cầu thu hồi phiên hiện tại và máy chủ xóa cookie. API cũng hỗ trợ thu hồi toàn bộ phiên khi có yêu cầu.

### Chức năng quản lý thông tin tài khoản và đổi mật khẩu

**Mục đích**

Cho phép người dùng đã đăng nhập xem và cập nhật thông tin cá nhân, đổi mật khẩu và chọn thu hồi các phiên truy cập.

**Giao diện**

> **Hình. Quản lý thông tin tài khoản và đổi mật khẩu** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Quản lý thông tin tài khoản*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Ô nhập văn bản | Thông tin hiện tại | Cập nhật họ tên và số điện thoại. |
| 2 | Bộ chọn và hộp thoại cắt ảnh | Ảnh hiện tại | Chọn, cắt và tải ảnh đại diện mới. |
| 3 | Nút bỏ ảnh |   | Bỏ ảnh đại diện sau khi xác nhận. |
| 4 | Nút lưu |   | Lưu thay đổi hồ sơ. |
| 5 | Ô nhập mật khẩu | Rỗng | Nhập mật khẩu hiện tại, mật khẩu mới và xác nhận mật khẩu mới. |
| 6 | Hộp kiểm | Được chọn | Chọn thu hồi tất cả phiên khi đổi mật khẩu. |
| 7 | Nút đổi mật khẩu |   | Gửi yêu cầu sau khi xác nhận mật khẩu mới khớp. |

**Dữ liệu được dùng**

*Từ điển dữ liệu chức năng Quản lý thông tin tài khoản*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `users` |   | X |   | X |
| 2 | `user_roles` / `roles` |   |   |   | X |
| 3 | `media_files` | X | X |   | X |
| 4 | `refresh_tokens` |   | X |   | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Quản lý thông tin tài khoản** [Vị trí chèn sơ đồ hoạt động].

Máy chủ xác định tài khoản từ phiên đăng nhập và trả dữ liệu hồ sơ. Khi cập nhật, máy chủ nhận họ tên, số điện thoại và định danh ảnh đại diện. Nếu có ảnh mới, máy chủ kiểm tra tệp tồn tại, là ảnh và thuộc người dùng. Sau khi thay hoặc bỏ ảnh, hệ thống lên lịch dọn ảnh cũ bằng tác vụ nền.

Khi đổi mật khẩu, giao diện kiểm tra hai lần nhập mật khẩu mới có trùng nhau hay không. Máy chủ xác minh mật khẩu hiện tại, kiểm tra mật khẩu mới và lưu giá trị đã băm. Khi tùy chọn thu hồi được bật, hệ thống thu hồi toàn bộ refresh token chưa thu hồi của tài khoản.

### Chức năng tải lên và quản lý tệp đa phương tiện

**Mục đích**

Cung cấp khả năng tải và quản lý ảnh hoặc tệp PDF được dùng trong hồ sơ, CV và doanh nghiệp.

**Giao diện**

Các điều khiển tải tệp nằm trong trang hồ sơ, biểu mẫu doanh nghiệp, trình biên soạn CV và hộp thoại ứng tuyển.

> **Hình. Chọn và cắt ảnh đại diện** [Vị trí chèn ảnh giao diện].

> **Hình. Tải logo doanh nghiệp** [Vị trí chèn ảnh giao diện].

> **Hình. Chọn tệp PDF khi ứng tuyển** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Tải lên tệp*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Bộ chọn tệp | Chưa chọn | Chọn ảnh đại diện, logo hoặc tệp PDF khi ứng tuyển. |
| 2 | Hộp thoại cắt ảnh |   | Điều chỉnh vùng ảnh trước khi tải ở các biểu mẫu hình ảnh. |
| 3 | Vùng xem trước hoặc thông tin tệp |   | Hiển thị ảnh đã chọn hoặc tên tệp PDF. |
| 4 | Nút bỏ tệp |   | Bỏ tệp đang chọn hoặc dọn ảnh đã tải nhưng chưa lưu vào hồ sơ. |

**Dữ liệu được dùng**

*Từ điển dữ liệu chức năng Tải lên tệp*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `media_files` | X | X |   | X |
| 2 | `users` |   |   |   | X |
| 3 | `companies` |   |   |   | X |
| 4 | `cv_templates` |   |   |   | X |
| 5 | `applications` |   |   |   | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Tải lên và quản lý tệp** [Vị trí chèn sơ đồ hoạt động].

Máy chủ kiểm tra tên, loại và kích thước tệp. Tệp hợp lệ được chuyển đến dịch vụ lưu trữ. Máy chủ lưu thông tin tệp và chủ sở hữu trong `media_files`. Nếu ghi dữ liệu thất bại sau khi tải lên, hệ thống thực hiện dọn tệp vừa tải.

Khi nhận yêu cầu xóa, máy chủ kiểm tra quyền thao tác và những tham chiếu từ hồ sơ người dùng, doanh nghiệp, mẫu CV và hồ sơ ứng tuyển. Nếu tệp còn được tham chiếu, yêu cầu bị từ chối. Nếu đủ điều kiện, hệ thống đánh dấu bản ghi đã xóa và lên lịch xóa tệp vật lý trên dịch vụ lưu trữ.
