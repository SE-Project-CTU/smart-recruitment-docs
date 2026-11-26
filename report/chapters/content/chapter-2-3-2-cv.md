**Chức năng dành cho Ứng viên**

### Chức năng duyệt mẫu CV và tạo CV

**Mục đích**

Cho phép ứng viên xem các mẫu CV đang hoạt động, xem trước và khởi tạo CV từ mẫu phù hợp.

**Giao diện**

> **Hình. Duyệt mẫu CV** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Duyệt mẫu CV*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Ô tìm kiếm | Rỗng | Tìm mẫu CV theo từ khóa. |
| 2 | Lưới thẻ mẫu |   | Hiển thị các mẫu đang hoạt động. |
| 3 | Nút xem trước |   | Mở bản xem trước của mẫu. |
| 4 | Ô tiêu đề CV | `CV <tên mẫu>` | Đặt tên cho CV trong hộp thoại tạo từ mẫu. |
| 5 | Nút tạo CV |   | Tạo CV từ mẫu đã chọn. |

**Dữ liệu được dùng**

*Từ điển dữ liệu chức năng Duyệt mẫu CV*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `cv_templates` |   |   |   | X |
| 2 | `cvs` | X |   |   |   |
| 3 | `cv_versions` | X |   |   |   |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Duyệt mẫu CV và tạo CV** [Vị trí chèn sơ đồ hoạt động].

API trả các mẫu đang hoạt động theo từ khóa và tham số phân trang. Khi ứng viên chọn mẫu, giao diện mở hộp thoại đặt tiêu đề. Máy chủ kiểm tra vai trò và trạng thái của mẫu, sao chép nội dung và bố cục mặc định, sau đó tạo CV và phiên bản ban đầu trong cùng một giao dịch. Sau khi tạo thành công, ứng dụng chuyển sang trình biên soạn của CV mới.

### Chức năng biên soạn và quản lý CV

**Mục đích**

Cho phép ứng viên xem danh sách CV, chỉnh sửa nội dung và thiết kế, xem trước, tải PDF, thay đổi trạng thái hiển thị và xóa CV.

**Giao diện**

> **Hình. Biên soạn và quản lý CV** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Biên soạn CV*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Trình soạn thảo | Nội dung CV hiện tại | Chỉnh sửa thông tin và các mục trong CV. |
| 2 | Tab và bộ điều khiển thiết kế | Thiết kế hiện tại | Chuyển giữa các mục và điều chỉnh bố cục, cách trình bày. |
| 3 | Nút hoàn tác và làm lại |   | Điều hướng lịch sử thao tác của phiên biên soạn. |
| 4 | Nút lưu |   | Lưu thay đổi CV. |
| 5 | Nút xem trước |   | Xem bản CV được kết xuất. |
| 6 | Công tắc công khai | Trạng thái hiện tại | Chuyển giữa công khai và riêng tư trong danh sách CV. |
| 7 | Nút tải PDF |   | Mở hộp thoại in hoặc lưu PDF của trình duyệt. |
| 8 | Nút và hộp thoại xác nhận xóa |   | Xác nhận xóa CV khỏi danh sách. |

**Dữ liệu được dùng**

Thao tác xóa CV chỉ cập nhật thời điểm xóa. Bảng thứ hai mô tả các thao tác của tác vụ dọn dữ liệu chạy riêng.

*Dữ liệu dùng khi biên soạn và quản lý CV*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `cvs` |   | X |   | X |
| 2 | `cv_versions` | X |   |   | X |
| 3 | `cv_templates` |   |   |   | X |
| 4 | `media_files` | X |   |   | X |

*Dữ liệu dùng khi dọn phiên bản của CV đã xóa*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `cvs` |   |   |   | X |
| 2 | `applications` |   |   |   | X |
| 3 | `cv_versions` |   |   | X | X |
| 4 | `cv_embeddings` |   |   | X |   |
| 5 | `media_files` |   | X |   | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Biên soạn và quản lý CV** [Vị trí chèn sơ đồ hoạt động].

Máy chủ kiểm tra quyền sở hữu với các thao tác ghi. Trình biên soạn kết xuất và tải ảnh xem trước trước khi gửi yêu cầu lưu. Máy chủ kiểm tra dữ liệu và so sánh mã băm nội dung, bố cục để xác định khi nào cần tạo phiên bản mới. Nếu tạo phiên bản mới, ảnh xem trước phải tồn tại, thuộc ứng viên và đáp ứng ràng buộc sử dụng. Khi tải PDF, ứng dụng kết xuất bố cục và mở hộp thoại in hoặc lưu của trình duyệt.

API danh sách CV hỗ trợ lọc theo trạng thái hiển thị, ngôn ngữ và phân trang. Người dùng có thể xem chi tiết CV công khai. Với CV riêng tư, yêu cầu xem chi tiết phải đến từ chủ sở hữu. API truy vấn danh sách và chi tiết phiên bản cũng kiểm tra quyền truy cập. Lịch sử hoàn tác trên trình biên soạn lưu các thao tác của phiên chỉnh sửa. Khi ứng viên xác nhận xóa, máy chủ ghi thời điểm xóa vào CV để ẩn khỏi danh sách. Việc dọn phiên bản của CV đã xóa và không còn tham chiếu do tác vụ nền thực hiện.

**Chức năng dành cho Quản trị viên**

### Chức năng quản lý thư viện mẫu CV

**Mục đích**

Cho phép Admin duy trì mẫu CV dùng làm dữ liệu khởi tạo cho ứng viên.

**Giao diện**

> **Hình. Quản lý thư viện mẫu CV** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Quản lý mẫu CV*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Lưới thẻ và phân trang | Trang 1 | Hiển thị kho mẫu và trạng thái hoạt động. |
| 2 | Ô tìm kiếm | Rỗng | Tìm theo tên hoặc mã mẫu. |
| 3 | Bộ lọc trạng thái | Tất cả | Lọc mẫu đang hoạt động hoặc đã tắt. |
| 4 | Nút xem trước |   | Xem mẫu CV. |
| 5 | Hộp thoại chỉnh sửa | Tên và mô tả hiện tại | Cập nhật tên và mô tả mẫu. |
| 6 | Công tắc hoạt động | Trạng thái hiện tại | Bật hoặc tắt mẫu trong thư viện công khai. |

**Dữ liệu được dùng**

*Từ điển dữ liệu chức năng Quản lý mẫu CV*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `cv_templates` | X | X |   | X |
| 2 | `media_files` |   |   |   | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Quản lý mẫu CV** [Vị trí chèn sơ đồ hoạt động].

Quản trị viên tìm kiếm, xem trước và chỉnh sửa thông tin mẫu trong tab Kho mẫu CV. Khi tắt mẫu, máy chủ cập nhật trạng thái để mẫu biến mất khỏi danh sách công khai. Bản ghi vẫn được giữ để bảo toàn tham chiếu của CV đã tạo.

API quản trị còn hỗ trợ tạo mẫu và cập nhật mã, ảnh thu nhỏ, nội dung cùng bố cục mặc định. Với các thao tác này, máy chủ kiểm tra mã duy nhất, dữ liệu cấu hình và ảnh thu nhỏ trước khi lưu.
