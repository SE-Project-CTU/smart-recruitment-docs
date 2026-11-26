**Chức năng dành cho ứng viên**

### Chức năng tổng quan ứng viên

**Mục đích**

Cho phép ứng viên xem nhanh việc làm đang tuyển, hồ sơ đã nộp và CV của mình từ một màn hình.

**Giao diện**

> **Hình. Trang tổng quan ứng viên** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện tổng quan ứng viên*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Bộ lọc cấp bậc | Tất cả | Lọc các tin đã tải theo cấp bậc. |
| 2 | Thẻ việc làm và khung chi tiết |   | Chọn tin để xem thông tin tuyển dụng. |
| 3 | Nút xem tất cả |   | Mở trang tìm việc hoặc trang theo dõi hồ sơ. |
| 4 | Bảng theo dõi | Tối đa 5 hồ sơ | Hiển thị thông tin và trạng thái hồ sơ đã nộp. |
| 5 | Khu vực CV |   | Hiển thị CV của tài khoản và dẫn đến thao tác biên soạn hoặc quản lý. |

**Dữ liệu được dùng**

*Từ điển dữ liệu chức năng tổng quan ứng viên*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `job_postings` / `companies` |   |   |   | X |
| 2 | `job_skills` / `skills` |   |   |   | X |
| 3 | `applications` |   |   |   | X |
| 4 | `cvs` / `cv_templates` |   |   |   | X |
| 5 | `media_files` |   |   |   | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Tổng quan ứng viên** [Vị trí chèn sơ đồ hoạt động].

Khi ứng viên mở trang tổng quan, ứng dụng tải danh sách CV của tài khoản, tối đa 20 tin từ API tìm việc công khai và trang đầu gồm tối đa năm hồ sơ đã nộp. Giao diện lọc danh sách tin đã tải theo cấp bậc khi người dùng chọn bộ lọc. Danh sách trên trang này lấy từ truy vấn việc làm công khai. Luồng xếp hạng theo nội dung CV được mô tả ở mục 2.3.17.

Khi ứng viên chọn một thẻ việc làm, ứng dụng truy vấn thông tin chi tiết và mở khung xem. Từ các khu vực hồ sơ và CV, người dùng có thể đi đến các trang chức năng tương ứng.

**Chức năng dành cho nhà tuyển dụng**

### Chức năng tổng quan nhà tuyển dụng

**Mục đích**

Cho phép nhà tuyển dụng theo dõi tình hình tin tuyển dụng và hồ sơ ứng tuyển của doanh nghiệp đang chọn.

**Giao diện**

> **Hình. Trang tổng quan nhà tuyển dụng** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện tổng quan nhà tuyển dụng*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Thông tin doanh nghiệp | Doanh nghiệp đang chọn | Hiển thị doanh nghiệp và trạng thái xác minh. |
| 2 | Thẻ chỉ số |   | Hiển thị tin đang mở, hồ sơ mới, hồ sơ phỏng vấn và hồ sơ đã tuyển. |
| 3 | Biểu đồ |   | Hiển thị xu hướng nộp hồ sơ và phân bố trạng thái. |
| 4 | Danh sách gần đây |   | Xem nhanh tin và ứng viên gần đây của doanh nghiệp. |
| 5 | Nút xem thêm và làm mới |   | Mở trang quản lý chi tiết hoặc tải lại danh sách. |

**Dữ liệu được dùng**

Bảng mô tả dữ liệu dùng để tải trang tổng quan. Thao tác đổi trạng thái hồ sơ từ danh sách gần đây dùng luồng và bảng dữ liệu ở mục 2.3.14.

*Từ điển dữ liệu chức năng tổng quan nhà tuyển dụng*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `companies` / `company_memberships` |   |   |   | X |
| 2 | `job_postings` |   |   |   | X |
| 3 | `applications` |   |   |   | X |
| 4 | `users` |   |   |   | X |
| 5 | `media_files` |   |   |   | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Tổng quan nhà tuyển dụng** [Vị trí chèn sơ đồ hoạt động].

Ứng dụng truy vấn các doanh nghiệp của nhà tuyển dụng và dùng doanh nghiệp đang chọn. Nếu lựa chọn không còn hợp lệ, giao diện chọn doanh nghiệp đầu tiên trong danh sách. Nếu tài khoản chưa có doanh nghiệp, trang hiển thị lựa chọn tạo doanh nghiệp hoặc xem lời mời.

Với doanh nghiệp hợp lệ, ứng dụng tải tin và hồ sơ của doanh nghiệp rồi tổng hợp các chỉ số từ dữ liệu nhận được. Biểu đồ xu hướng đếm hồ sơ theo tháng dựa trên ngày nộp nếu có dữ liệu ngày nộp. Khi không có dữ liệu ngày nộp, giao diện hiện dãy giá trị mẫu. Người dùng có thể mở danh sách chi tiết hoặc thao tác với hồ sơ gần đây theo quyền của mình.
