## 2.3.5. Chức năng Duyệt mẫu CV và tạo CV

**Mục đích:** Cho phép ứng viên xem các mẫu CV đang hoạt động, tìm mẫu và khởi tạo CV dựa trên mẫu đã chọn.

**Giao diện:** Trang mẫu CV hiển thị danh sách mẫu, ô tìm kiếm, thao tác xem trước và nút sử dụng mẫu. Trình xây dựng CV hiển thị nội dung và thiết kế để ứng viên nhập, sắp xếp và định dạng thông tin nghề nghiệp.

**Dữ liệu được dùng:** `cv_templates`, `cvs`, `cv_versions`, `media_files`.

**Cách xử lý:** Hệ thống chỉ truy vấn các mẫu đang hoạt động, áp dụng từ khóa tìm kiếm nếu có và trả danh sách phân trang. Khi ứng viên chọn mẫu, máy chủ xác nhận tài khoản có vai trò Candidate, kiểm tra mẫu tồn tại và còn hoạt động, sau đó tạo CV thuộc sở hữu ứng viên cùng phiên bản ban đầu trong một giao dịch. Nội dung và bố cục mặc định được sao chép từ mẫu; mã băm nội dung và bố cục được tính để nhận biết thay đổi tài liệu. Nếu mẫu không còn khả dụng hoặc dữ liệu đầu vào không hợp lệ, hệ thống trả lỗi. Ứng viên có thể mở bản xem trước mẫu trước khi xác nhận tạo CV.

## 2.3.6. Chức năng Biên soạn và quản lý CV

**Mục đích:** Cho phép ứng viên tạo, xem, chỉnh sửa và xóa CV; lưu lại các phiên bản nội dung để dùng trong các nghiệp vụ ứng tuyển và phân tích mức độ phù hợp.

**Giao diện:** Trình biên soạn CV chia nội dung thành các phần thông tin, kinh nghiệm, học vấn, kỹ năng và các mục nghề nghiệp khác. Người dùng có thể chỉnh sửa nội dung/bố cục, lưu thay đổi, xem bản xem trước và mở danh sách CV hoặc phiên bản.

**Dữ liệu được dùng:** `cvs`, `cv_versions`, `cv_templates`, `media_files`, `cv_embeddings`.

**Cách xử lý:** Khi đọc hoặc cập nhật CV, máy chủ kiểm tra CV thuộc về ứng viên đang đăng nhập. Ứng viên có thể xem danh sách CV của mình, lọc theo trạng thái công khai hoặc ngôn ngữ, mở chi tiết và truy vấn các phiên bản. Khi cập nhật, hệ thống kiểm tra cấu trúc nội dung và bố cục; các trường được gửi sẽ được áp dụng lên CV, đồng thời phiên bản mới được tạo khi nội dung tài liệu thay đổi theo quy tắc phiên bản hóa. Phiên bản được dùng để tham chiếu khi nộp hồ sơ hoặc phân tích AI. Việc gắn tệp xem trước kiểm tra tệp tồn tại, thuộc quyền sở hữu của ứng viên và chưa bị ràng buộc trái phép với CV/phiên bản khác. Khi xóa CV, hệ thống kiểm tra quyền sở hữu và các liên kết nghiệp vụ trước khi xóa; tệp không còn tham chiếu được xử lý bằng tác vụ nền. CV công khai có thể được xem qua chức năng chi tiết công khai, còn yêu cầu truy cập phiên bản riêng vẫn phải tuân theo phân quyền.

## 2.3.7. Chức năng Quản lý thư viện mẫu CV

**Mục đích:** Cho phép Admin quản lý các mẫu CV mà ứng viên có thể sử dụng.

**Giao diện:** Khu vực quản trị mẫu CV cung cấp danh sách, xem chi tiết, tạo mới và cập nhật thông tin mẫu, bao gồm mã, tên, mô tả, ảnh thu nhỏ, nội dung mặc định, bố cục, ngôn ngữ và trạng thái hoạt động.

**Dữ liệu được dùng:** `cv_templates`, `media_files`.

**Cách xử lý:** Admin gửi dữ liệu mẫu mới hoặc nội dung cập nhật. Hệ thống kiểm tra các trường bắt buộc, tính duy nhất của mã mẫu và tệp ảnh thu nhỏ, sau đó lưu nội dung mẫu cùng cấu hình bố cục. Mẫu bị tắt hoạt động không xuất hiện trong danh sách mẫu dành cho ứng viên. Các mẫu đã được dùng để tạo CV vẫn được tham chiếu bởi các phiên bản tương ứng.
