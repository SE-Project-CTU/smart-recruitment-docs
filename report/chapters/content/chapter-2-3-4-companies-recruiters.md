## 2.3.12. Chức năng Quản lý doanh nghiệp và thành viên

**Mục đích:** Cho phép nhà tuyển dụng tạo hồ sơ doanh nghiệp, quản lý thông tin, thành viên và phân quyền nội bộ phục vụ hoạt động tuyển dụng.

**Giao diện:** Khu vực doanh nghiệp hiển thị danh sách doanh nghiệp người dùng tham gia, trang tổng quan và các thẻ quản lý thông tin, thành viên, lời mời và yêu cầu gia nhập. Biểu mẫu doanh nghiệp nhận thông tin liên hệ, địa chỉ, website, mô tả và logo.

**Dữ liệu được dùng:** `companies`, `company_memberships`, `company_invitations`, `company_join_requests`, `company_follows`, `media_files`.

**Cách xử lý:** Khi tạo doanh nghiệp, hệ thống kiểm tra dữ liệu và tạo doanh nghiệp cùng tư cách thành viên Owner cho người tạo. Khi sửa, hệ thống xác thực doanh nghiệp tồn tại và người thao tác là Owner đang hoạt động. Owner có thể mời thành viên, thay đổi vai trò theo quyền được phép, loại bỏ thành viên hoặc chuyển quyền sở hữu; các thao tác được kiểm tra để duy trì quyền quản trị doanh nghiệp. Người dùng có thể gửi yêu cầu gia nhập doanh nghiệp. Owner xem yêu cầu và chấp nhận hoặc từ chối; hệ thống kiểm tra yêu cầu còn chờ xử lý và ghi nhận người xét duyệt, thời điểm cùng trạng thái mới. Người được mời có thể xem và phản hồi lời mời của mình. Nếu người thao tác không có membership phù hợp hoặc đối tượng không tồn tại, yêu cầu bị từ chối.

## 2.3.13. Chức năng Khám phá, theo dõi doanh nghiệp và danh sách tuyển dụng

**Mục đích:** Giúp người dùng tìm hiểu doanh nghiệp, xem tin tuyển dụng công khai và theo dõi doanh nghiệp quan tâm.

**Giao diện:** Trang danh sách doanh nghiệp hỗ trợ tìm kiếm và phân trang; trang chi tiết doanh nghiệp hiển thị giới thiệu, thông tin liên hệ, các tin đang tuyển và thao tác theo dõi hoặc gửi yêu cầu gia nhập khi phù hợp.

**Dữ liệu được dùng:** `companies`, `company_follows`, `job_postings`, `company_memberships`, `company_join_requests`.

**Cách xử lý:** Hệ thống truy vấn danh sách doanh nghiệp theo tiêu chí và phân trang. Trang chi tiết trả thông tin công khai và danh sách tin đang được phát hành. Khi người dùng theo dõi, máy chủ tạo liên kết theo dõi gắn với tài khoản hiện tại; khi bỏ theo dõi, chỉ liên kết của chính người dùng được xóa. Nếu người dùng chưa xác thực, giao diện yêu cầu đăng nhập trước khi thực hiện thao tác cần tài khoản. Yêu cầu gia nhập được chuyển sang luồng xét duyệt của Owner tại mục 2.3.12.

## 2.3.14. Chức năng Quản lý ứng viên theo tin tuyển dụng

**Mục đích:** Cho phép thành viên doanh nghiệp xem và xử lý hồ sơ đã nộp vào các tin thuộc doanh nghiệp.

**Giao diện:** Trang quản lý tin cung cấp danh sách ứng viên theo từng tin, bộ lọc và phân trang, xem thư giới thiệu/CV, cùng thao tác đổi trạng thái hồ sơ.

**Dữ liệu được dùng:** `applications`, `job_postings`, `companies`, `company_memberships`, `cv_versions`, `media_files`, `application_status_histories`.

**Cách xử lý:** Máy chủ yêu cầu tài khoản có vai trò Recruiter và xác nhận membership đang hoạt động tại doanh nghiệp sở hữu tin. Sau đó hệ thống truy vấn hồ sơ theo tin, áp dụng tiêu chí lọc, sắp xếp và phân trang; thông tin CV chỉ được trả trong ngữ cảnh người có quyền xem hồ sơ. Khi nhà tuyển dụng đổi trạng thái, hệ thống chỉ chấp nhận các trạng thái đích được hỗ trợ (đang xem xét, vào danh sách rút gọn, phỏng vấn, đề nghị, tuyển dụng, từ chối hoặc ứng viên rút hồ sơ) và ghi chú không quá 2.000 ký tự. Quy tắc miền kiểm tra trạng thái mới có được chuyển từ trạng thái hiện tại hay không. Nếu hợp lệ, hệ thống cập nhật hồ sơ trong giao dịch, thêm bản ghi lịch sử kèm người thực hiện và tạo thông báo cho ứng viên. Các yêu cầu truy cập hồ sơ của tin thuộc công ty khác hoặc chuyển trạng thái không hợp lệ bị từ chối.

## 2.3.15. Chức năng Xác minh doanh nghiệp và kiểm duyệt tin tuyển dụng

**Mục đích:** Cho phép Admin xem xét trạng thái xác minh doanh nghiệp và kiểm duyệt các tin tuyển dụng đang chờ.

**Giao diện:** Khu vực quản trị cung cấp danh sách doanh nghiệp và tin tuyển dụng cần xem xét, trang chi tiết, cùng thao tác chấp thuận hoặc từ chối.

**Dữ liệu được dùng:** `companies`, `company_memberships`, `job_postings`, `notifications`.

**Cách xử lý:** Admin chọn doanh nghiệp hoặc tin cần xem xét và gửi kết quả kiểm duyệt. Với tin tuyển dụng, hệ thống chỉ xử lý tin đang ở trạng thái chờ kiểm duyệt; tin đã được kiểm duyệt sẽ không được xử lý lặp lại. Với doanh nghiệp, hệ thống chỉ chấp nhận kết quả đã xác minh hoặc từ chối xác minh. Khi từ chối, Admin phải nhập lý do dài từ 5 đến 1.000 ký tự. Hệ thống cập nhật trạng thái, thời điểm xác minh nếu được chấp thuận và tạo thông báo cho Owner của doanh nghiệp. Tài khoản không có vai trò Admin, đối tượng không tồn tại hoặc trạng thái không phù hợp sẽ không được phép cập nhật.
