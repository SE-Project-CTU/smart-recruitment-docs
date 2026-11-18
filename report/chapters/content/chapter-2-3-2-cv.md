**Phân hệ: Chức năng dành cho Ứng viên**

### Chức năng duyệt mẫu CV và tạo CV


**Mục đích:** Cho phép ứng viên xem các mẫu CV đang hoạt động, xem trước và khởi tạo CV từ mẫu phù hợp.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Giao diện: duyệt mẫu CV** — [Vị trí chèn ảnh mockup/Figma].

*Các thành phần trong giao diện Duyệt mẫu CV*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | Textbox | Rỗng | Tìm mẫu CV theo từ khóa. |
| 2 | Card/Grid | Trang đầu | Hiển thị các mẫu đang hoạt động. |
| 3 | Button | N/A | Mở cửa sổ xem trước mẫu. |
| 4 | Button | N/A | Tạo CV từ mẫu đã chọn. |
| 5 | Pagination | Trang 1 | Điều hướng danh sách mẫu. |

**Dữ liệu được dùng:**
*Từ điển dữ liệu chức năng Duyệt mẫu CV*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | cv_templates |  |  |  | X |
| 2 | cvs | X |  |  |  |
| 3 | cv_versions | X |  |  |  |

**Cách xử lý và sơ đồ hoạt động:**
> **Sơ đồ hoạt động: Duyệt mẫu CV và tạo CV** — [Vị trí chèn sơ đồ hoạt động].

Hệ thống truy vấn các mẫu đang hoạt động theo từ khóa và phân trang. Khi ứng viên tạo CV, máy chủ xác nhận vai trò Candidate, kiểm tra mẫu tồn tại và còn hoạt động, sau đó sao chép nội dung/bố cục mặc định để tạo CV và phiên bản ban đầu trong một giao dịch. Hệ thống tính mã băm nội dung và bố cục để phát hiện thay đổi về sau. Nếu mẫu không còn hoạt động hoặc dữ liệu sai, hệ thống trả lỗi validation hoặc not found; giao dịch bảo đảm không tạo CV thiếu phiên bản ban đầu.

Lỗi được trả trong envelope JSON gồm `error` và `correlationId`, kèm header `X-Correlation-ID`; HTTP status được ánh xạ theo loại lỗi. Cấu trúc này không phải RFC 7807 Problem Details.

### Chức năng biên soạn và quản lý CV


**Mục đích:** Cho phép ứng viên xem danh sách CV, biên soạn nội dung, quản lý phiên bản và xóa CV của mình.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Giao diện: biên soạn và quản lý CV** — [Vị trí chèn ảnh mockup/Figma].

*Các thành phần trong giao diện Biên soạn CV*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | Textbox/Editor | Nội dung CV hiện tại | Chỉnh sửa các mục nghề nghiệp trong CV. |
| 2 | Panel/Tab | Phần thông tin đầu tiên | Chuyển giữa các phần nội dung CV. |
| 3 | Design controls | Thiết kế hiện tại | Điều chỉnh bố cục và trình bày. |
| 4 | Button | N/A | Lưu thay đổi CV. |
| 5 | Preview | Bản hiện tại | Xem trước bản CV được kết xuất. |
| 6 | Version list | Phiên bản mới nhất | Mở các phiên bản đã lưu. |
| 7 | Toggle | Trạng thái hiện tại | Điều khiển công khai/riêng tư nếu giao diện cung cấp. |

**Dữ liệu được dùng:**
*Từ điển dữ liệu chức năng Biên soạn và quản lý CV*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | cvs | X | X | X | X |
| 2 | cv_versions | X |  | X | X |
| 3 | cv_templates |  |  |  | X |
| 4 | media_files |  | X | X | X |
| 5 | cv_embeddings | X | X |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Sơ đồ hoạt động: Biên soạn và quản lý CV** — [Vị trí chèn sơ đồ hoạt động].

Mọi thao tác ghi kiểm tra CV thuộc ứng viên hiện tại. Khi cập nhật, validator kiểm tra các trường được gửi, cấu trúc nội dung và bố cục; máy chủ so sánh mã băm tài liệu để xác định thay đổi cần lưu thành phiên bản mới. Nếu gắn ảnh xem trước, tệp phải tồn tại, thuộc ứng viên và không vi phạm ràng buộc sử dụng. Danh sách CV hỗ trợ truy vấn theo trạng thái công khai/ngôn ngữ và phân trang; endpoint chi tiết công khai chỉ trả dữ liệu công khai, trong khi xem phiên bản áp dụng phân quyền. Khi xóa, hệ thống kiểm tra các quan hệ đang tham chiếu và xử lý tệp mồ côi bằng Hangfire. Sai chủ sở hữu trả 403; dữ liệu sai trả 422; lỗi xung đột phiên bản được chuyển thành 409.

Lỗi được trả trong envelope JSON gồm `error` và `correlationId`, kèm header `X-Correlation-ID`; HTTP status được ánh xạ theo loại lỗi. Cấu trúc này không phải RFC 7807 Problem Details.

**Phân hệ: Chức năng dành cho Quản trị viên**

### Chức năng quản lý thư viện mẫu CV


**Mục đích:** Cho phép Admin duy trì mẫu CV dùng làm dữ liệu khởi tạo cho ứng viên.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Giao diện: quản lý thư viện mẫu CV** — [Vị trí chèn ảnh mockup/Figma].

*Các thành phần trong giao diện Quản lý mẫu CV*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | Table | Trang đầu | Danh sách mẫu và trạng thái hoạt động. |
| 2 | Textbox | Rỗng | Nhập mã, tên và mô tả mẫu. |
| 3 | File picker | Ảnh hiện tại | Chọn ảnh thu nhỏ đã tải lên. |
| 4 | JSON/Form editor | Cấu hình hiện tại | Nhập nội dung mặc định và cấu hình bố cục. |
| 5 | Toggle | Hoạt động | Bật hoặc tắt mẫu khỏi thư viện công khai. |
| 6 | Button | N/A | Tạo mới hoặc lưu cập nhật. |

**Dữ liệu được dùng:**
*Từ điển dữ liệu chức năng Quản lý mẫu CV*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | cv_templates | X | X |  | X |
| 2 | media_files |  |  |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Sơ đồ hoạt động: Quản lý mẫu CV** — [Vị trí chèn sơ đồ hoạt động].

Chỉ Admin được phép tạo hoặc cập nhật thư viện. Hệ thống kiểm tra trường bắt buộc, mã mẫu duy nhất, ảnh thu nhỏ và cấu trúc nội dung/bố cục trước khi lưu. Mẫu tắt hoạt động vẫn được giữ trong CSDL để bảo toàn tham chiếu từ các CV đã tạo nhưng không xuất hiện trong danh sách mẫu ứng viên. Lỗi quyền trả 403, dữ liệu không hợp lệ trả 422 và mã trùng trả 409 theo cấu trúc lỗi API thống nhất.

Lỗi được trả trong envelope JSON gồm `error` và `correlationId`, kèm header `X-Correlation-ID`; HTTP status được ánh xạ theo loại lỗi. Cấu trúc này không phải RFC 7807 Problem Details.
