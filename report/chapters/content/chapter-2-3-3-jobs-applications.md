**Chức năng dành cho Ứng viên**

### Chức năng tìm kiếm và xem chi tiết việc làm

**Mục đích**

Cho phép khách truy cập và ứng viên khám phá các vị trí tuyển dụng đang công khai, lọc theo nhu cầu và đọc thông tin chi tiết.

**Giao diện**

> **Hình. Tìm kiếm và xem chi tiết việc làm** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Tìm kiếm việc làm*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Ô tìm kiếm | Rỗng | Tìm việc làm theo từ khóa. |
| 2 | Bộ lọc | Tất cả | Chọn địa điểm, cấp bậc, loại việc, hình thức làm việc, ngành nghề và nhóm kinh nghiệm. |
| 3 | Ô nhập khoảng lương và hộp kiểm | Rỗng, bỏ chọn | Lọc theo khoảng lương hoặc chỉ xem tin có lương thương lượng. |
| 4 | Bộ chọn sắp xếp | Mới nhất | Sắp xếp theo thời điểm đăng hoặc mức lương tối đa. |
| 5 | Danh sách thẻ và vùng chi tiết |   | Chọn tin để xem thông tin tuyển dụng. |
| 6 | Phân trang | Trang 1 | Chuyển trang kết quả. |

**Dữ liệu được dùng**

*Từ điển dữ liệu chức năng Tìm kiếm việc làm*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `job_postings` |   |   |   | X |
| 2 | `companies` |   |   |   | X |
| 3 | `job_skills` / `skills` |   |   |   | X |
| 4 | `job_industries` / `industries` |   |   |   | X |
| 5 | `provinces` / `wards` |   |   |   | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Tìm kiếm việc làm** [Vị trí chèn sơ đồ hoạt động].

Ứng dụng gửi từ khóa, bộ lọc và lựa chọn sắp xếp. Máy chủ kiểm tra các mã danh mục đang hoạt động, đối chiếu phường với tỉnh và xác thực khoảng lương. Nếu chọn lương thương lượng, yêu cầu không được kèm khoảng lương. Tập kết quả công khai gồm các tin đang phát hành, còn hiệu lực và thuộc doanh nghiệp đã xác minh.

API còn nhận mã doanh nghiệp hoặc số năm kinh nghiệm chính xác. Số năm cụ thể và nhóm kinh nghiệm được dùng theo từng chế độ lọc. Khi người dùng chọn một tin, ứng dụng mở khung chi tiết và truy vấn dữ liệu tương ứng.

### Chức năng lưu và bỏ lưu tin tuyển dụng

**Mục đích**

Cho phép ứng viên lưu tin quan tâm để xem lại và quản lý danh sách việc làm đã đánh dấu.

**Giao diện**

> **Hình. Lưu và quản lý tin tuyển dụng đã lưu** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Lưu việc làm*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Button (icon) | Chưa lưu/đã lưu | Bật hoặc bỏ đánh dấu tin. |
| 2 | List/Card | Trang đầu | Liệt kê việc đã lưu của người dùng hiện tại. |
| 3 | Pagination | Trang 1 | Chuyển trang danh sách việc đã lưu. |

**Dữ liệu được dùng**

*Từ điển dữ liệu chức năng Lưu việc làm*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `job_bookmarks` | X |   | X | X |
| 2 | `job_postings` |   |   |   | X |
| 3 | `companies` |   |   |   | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Lưu việc làm** [Vị trí chèn sơ đồ hoạt động].

Ứng viên đã đăng nhập có thể lưu tin đang phát hành, thuộc doanh nghiệp đã xác minh và chưa hết hạn. Máy chủ tạo liên kết giữa ứng viên và tin. Nếu liên kết đã tồn tại, API trả lỗi xung đột. Khi bỏ lưu, hệ thống xóa liên kết của ứng viên hiện tại. Danh sách việc đã lưu được truy vấn theo tài khoản và phân trang.

**Chức năng dành cho Nhà tuyển dụng/Doanh nghiệp**

### Chức năng đăng và quản lý tin tuyển dụng

**Mục đích**

Cho phép Recruiter thuộc doanh nghiệp đã xác minh tạo, cập nhật và đóng các tin tuyển dụng của doanh nghiệp.

**Giao diện**

> **Hình. Đăng và quản lý tin tuyển dụng** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Quản lý tin tuyển dụng*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Ô nhập văn bản | Rỗng | Nhập tiêu đề và địa chỉ chi tiết. |
| 2 | Trình soạn thảo | Rỗng | Nhập mô tả, yêu cầu và quyền lợi. |
| 3 | Bộ chọn | Chưa chọn | Chọn địa điểm, loại việc, hình thức, cấp bậc và học vấn. |
| 4 | Ô nhập số | Rỗng | Nhập kinh nghiệm, số lượng tuyển và khoảng lương. |
| 5 | Bộ chọn nhiều giá trị | Chưa chọn | Chọn kỹ năng và ngành nghề đang hoạt động. |
| 6 | Bộ chọn ngày | Chưa chọn | Chọn hạn nộp hồ sơ. |
| 7 | Nhóm điều chỉnh trọng số | Cấu hình mặc định khi tạo | Điều chỉnh trọng số kỹ năng, kinh nghiệm, chức danh và tiêu chí khác sao cho tổng bằng 100%. |
| 8 | Nút và bảng quản lý |   | Tạo, sửa hoặc đóng tin và xem trạng thái kiểm duyệt. |

**Dữ liệu được dùng**

*Từ điển dữ liệu chức năng Quản lý tin tuyển dụng*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `job_postings` | X | X |   | X |
| 2 | `job_skills` | X |   | X | X |
| 3 | `job_industries` | X |   | X | X |
| 4 | `companies` / `company_memberships` |   |   |   | X |
| 5 | `provinces` / `wards` / `skills` / `industries` |   |   |   | X |
| 6 | `company_follows` |   |   |   | X |
| 7 | `notifications` | X | X |   | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Quản lý tin tuyển dụng** [Vị trí chèn sơ đồ hoạt động].

Khi tạo tin, máy chủ xác minh tư cách thành viên đang hoạt động của nhà tuyển dụng và trạng thái đã xác minh của doanh nghiệp. Hệ thống kiểm tra các trường bắt buộc, danh mục, hạn nộp, lương và số lượng tuyển, sau đó lưu tin ở trạng thái `PendingReview`. Thông báo cho người theo dõi công ty được tạo trong luồng lưu tin. Sau khi giao dịch hoàn tất, tác vụ nền chuyển thông báo qua SignalR theo lô. Quyết định phát hành hoặc từ chối do quản trị viên thực hiện trong luồng kiểm duyệt.

Khi nhà tuyển dụng sửa ngành nghề hoặc kỹ năng, các liên kết được thêm hoặc xóa theo danh sách mới. Nhà tuyển dụng có thể sửa tin chưa ở trạng thái `Closed` hoặc `Expired` và có thể đóng tin đủ điều kiện. Tác vụ định kỳ chuyển tin đã phát hành quá hạn sang `Expired`.

**Chức năng dành cho ứng viên**

### Chức năng ứng tuyển và theo dõi hồ sơ

**Mục đích**

Cho phép ứng viên nộp hồ sơ cho tin còn hiệu lực, theo dõi tiến trình và rút hồ sơ khi còn đủ điều kiện.

**Giao diện**

> **Hình. Ứng tuyển và theo dõi hồ sơ** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Ứng tuyển và theo dõi hồ sơ*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Bộ chọn nguồn CV | CV trực tuyến nếu có | Chọn CV trực tuyến hoặc tải PDF. |
| 2 | Danh sách CV | CV mặc định nếu có | Chọn một CV để hệ thống lấy phiên bản mới nhất. |
| 3 | Bộ chọn tệp PDF | Chưa chọn | Chọn tệp PDF có dung lượng tối đa 5 MB. |
| 4 | Ô nhập nhiều dòng | Rỗng | Nhập thư giới thiệu. |
| 5 | Nút nộp hồ sơ |   | Tải tệp nếu chọn PDF rồi gửi hồ sơ. |
| 6 | Danh sách và lịch sử trạng thái | Trang đầu | Xem hồ sơ đã nộp và các mốc xử lý. |
| 7 | Nút và hộp thoại rút hồ sơ | Lý do để trống | Xác nhận rút hồ sơ và có thể nhập lý do. |

**Dữ liệu được dùng**

*Từ điển dữ liệu chức năng Ứng tuyển và theo dõi hồ sơ*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `applications` | X | X |   | X |
| 2 | `application_status_histories` | X |   |   | X |
| 3 | `cvs` / `cv_versions` |   |   |   | X |
| 4 | `media_files` | X |   |   | X |
| 5 | `job_postings` |   | X |   | X |
| 6 | `companies` / `company_memberships` |   |   |   | X |
| 7 | `cv_embeddings` / `job_embeddings` |   |   |   | X |
| 8 | `ai_match_results` | X |   |   |   |
| 9 | `notifications` | X | X |   | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Ứng tuyển và theo dõi hồ sơ** [Vị trí chèn sơ đồ hoạt động].

Ứng viên chọn một nguồn CV. Với CV trực tuyến, ứng dụng truy vấn phiên bản mới nhất của CV đã chọn. Với PDF, ứng dụng tải tệp rồi gửi định danh tệp. Máy chủ kiểm tra tin đang phát hành, doanh nghiệp đã xác minh, hạn tuyển và quyền sở hữu tài liệu. PDF đã dùng cho hồ sơ khác hoặc vượt quá 5 MB bị từ chối. Mỗi ứng viên chỉ được nộp một hồ sơ cho mỗi tin.

Hệ thống lưu hồ sơ và lịch sử ban đầu với trạng thái `Submitted`. Với CV trực tuyến, hệ thống có thể tính và lưu kết quả so khớp. Sau khi lưu hồ sơ, hệ thống ghi thông báo cho thành viên công ty và có thể gộp các thông báo đến liên tiếp khi phát qua SignalR.

Ứng viên xem danh sách và lịch sử của hồ sơ thuộc tài khoản. Trước vòng phỏng vấn, nếu trạng thái còn cho phép và hồ sơ thuộc người yêu cầu, máy chủ chuyển hồ sơ sang `Withdrawn` và ghi lịch sử kèm lý do nếu có. Việc nhà tuyển dụng cập nhật tiến trình được mô tả ở mục 2.3.14.
