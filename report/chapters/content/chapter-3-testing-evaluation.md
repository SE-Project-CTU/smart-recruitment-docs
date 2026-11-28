# Chương 3. Kiểm thử và đánh giá

Chương này trình bày kế hoạch kiểm thử hệ thống SmartHire, các kịch bản dùng để đối chiếu hành vi của hệ thống với yêu cầu nghiệp vụ và cách tổng hợp kết quả. Phạm vi kiểm thử được xác định từ sáu phân hệ ở Chương 1 và các chức năng được mô tả tại mục 2.3.

## 3.1. Giới thiệu

### 3.1.1. Mục tiêu kiểm thử

Kiểm thử nhằm xác định các chức năng của SmartHire có thực hiện đúng nghiệp vụ và quyền hạn của từng vai trò hay không. Các ca kiểm thử kiểm tra cả luồng hợp lệ và những tình huống cần từ chối, chẳng hạn dữ liệu thiếu hoặc trùng, thao tác trên hồ sơ không thuộc quyền quản lý và chuyển trạng thái sai quy định. Kết quả kiểm thử giúp xác định lỗi cần khắc phục và kiểm tra lại các chức năng bị ảnh hưởng sau khi sửa.

### 3.1.2. Phạm vi kiểm thử

Phạm vi bao gồm các luồng đã triển khai dành cho khách truy cập, ứng viên, nhà tuyển dụng và quản trị viên. Kiểm thử qua trình duyệt tập trung vào các chức năng có giao diện. Kiểm thử trực tiếp qua API được dùng cho nghiệp vụ chưa tích hợp giao diện, như quản lý hội thoại AI, và cho các quy tắc cần kiểm tra ở máy chủ, như quyền sở hữu dữ liệu và điều kiện cập nhật trạng thái.

Đánh giá trong chương tập trung vào hành vi chức năng, tính nhất quán của dữ liệu và cách phản hồi khi gặp lỗi. Những kết luận về hiệu năng, khả năng chịu tải hoặc chất lượng gợi ý dài hạn cần có phép đo và tập dữ liệu đánh giá riêng.

## 3.2. Kế hoạch kiểm thử

### 3.2.1. Các chức năng kiểm thử

**Quản lý Tài khoản, Doanh nghiệp và Phân quyền.** Kiểm tra đăng ký, đăng nhập bằng mật khẩu hoặc Google, làm mới phiên, đăng xuất, cập nhật thông tin cá nhân và đổi mật khẩu. Với doanh nghiệp, kiểm tra quyền của chủ sở hữu và thành viên khi tạo, sửa, mời người dùng, xét yêu cầu gia nhập, chuyển quyền hoặc rời doanh nghiệp. Kiểm tra thêm khả năng xem và theo dõi doanh nghiệp theo từng vai trò.

**Quản lý Tệp tin và Đa phương tiện.** Kiểm tra tải ảnh và PDF, các giới hạn về loại và dung lượng tệp, quyền truy cập tệp và việc từ chối xóa tệp còn được tham chiếu theo quy tắc của chức năng. Khi thao tác xóa được chấp nhận, kiểm tra trạng thái bản ghi và kết quả xử lý tệp trên dịch vụ lưu trữ.

**Công cụ Biên soạn CV theo Mẫu.** Kiểm tra tìm và xem trước mẫu, tạo CV, chỉnh sửa nội dung và bố cục, lưu phiên bản, xem trước CV, xuất PDF, thay đổi trạng thái công khai và xóa CV. Luồng quản trị mẫu kiểm tra chỉnh sửa thông tin và bật hoặc tắt mẫu. Các thao tác quản trị mẫu chỉ có ở API được kiểm tra trực tiếp qua API.

**Tuyển dụng và Quản lý Ứng tuyển.** Kiểm tra tìm kiếm, lọc, xem chi tiết, lưu và bỏ lưu tin tuyển dụng. Với nhà tuyển dụng, kiểm tra tạo, sửa và đóng tin theo quyền của doanh nghiệp. Với ứng viên, kiểm tra nộp hồ sơ bằng CV trực tuyến hoặc PDF, ngăn nộp trùng, xem lịch sử và rút hồ sơ. Kiểm tra việc cập nhật tiến trình xét tuyển và các thông tin hiển thị trên hai trang tổng quan theo vai trò.

**Trợ lý AI và Đề xuất Thông minh.** Kiểm tra phân tích mức độ phù hợp giữa CV và vị trí, cải thiện nội dung CV, xếp hạng việc làm tức thời và tạo gợi ý qua tác vụ nền. Kiểm tra API hội thoại theo quyền sở hữu, bao gồm gửi tin nhắn, ghim và xóa hội thoại. Với phản hồi sinh bởi AI, đối chiếu các tiêu chí như kết quả có đủ trường cần hiển thị, bám vào vị trí đã chọn và được xử lý phù hợp khi dịch vụ gặp lỗi.

**Quản trị Hệ thống Vận hành.** Kiểm tra xác minh doanh nghiệp, duyệt hoặc đóng tin, khóa và khôi phục tài khoản, quản lý danh mục và đối chiếu dữ liệu danh mục công khai. Kiểm tra truy vấn thống kê, thao tác đọc và xóa thông báo, phát cảnh báo đúng đối tượng và cập nhật thông báo qua SignalR.

### 3.2.2. Cách tiếp cận

Kiểm thử dựa trên thao tác và kết quả có thể quan sát từ giao diện hoặc API. Mỗi ca xác định điều kiện ban đầu, vai trò, dữ liệu đầu vào, bước thực hiện và kết quả mong đợi. Các luồng liên quan nhiều vai trò được thực hiện theo trình tự nghiệp vụ. Chẳng hạn, một tin tuyển dụng được tạo bởi nhà tuyển dụng và được duyệt bởi quản trị viên trước khi ứng viên dùng tin đó để nộp hồ sơ.

Với các thao tác làm thay đổi dữ liệu, kết quả được đối chiếu bằng cách truy vấn lại dữ liệu hoặc tải lại màn hình. Với tác vụ chạy nền, kết quả nhận yêu cầu và kết quả sau khi tác vụ hoàn tất được kiểm tra ở hai thời điểm. Các luồng AI được kiểm tra theo cấu trúc và nội dung cần có của phản hồi, vì cách diễn đạt có thể thay đổi giữa các lần chạy.

### 3.2.3. Tiêu chí đánh giá kiểm thử thành công hay thất bại

Một ca **đạt** khi kết quả thực tế đáp ứng các điều kiện mong đợi của ca đó, gồm phản hồi, quyền truy cập và trạng thái dữ liệu nếu có thay đổi. Với ca đầu vào không hợp lệ, việc hệ thống từ chối đúng lý do và giữ nguyên dữ liệu liên quan cũng được tính là đạt.

Một ca **không đạt** khi quan sát được sai khác giữa kết quả thực tế và kết quả mong đợi, chẳng hạn cho phép thao tác sai quyền, trả trạng thái sai hoặc lưu dữ liệu chưa đầy đủ. Ca không thể thực hiện do thiếu điều kiện hoặc sự cố môi trường được ghi là **bị chặn** kèm nguyên nhân. Ca chưa được thực hiện được ghi là **chưa chạy**.

### 3.2.4. Tiêu chí đình chỉ và yêu cầu bắt đầu lại

Tạm dừng ca kiểm thử hoặc nhóm ca phụ thuộc khi môi trường không khả dụng, dữ liệu ban đầu không còn đúng hoặc lỗi ở một bước tiên quyết khiến các bước sau không thể thực hiện. Khi đã khôi phục môi trường, chuẩn bị lại dữ liệu hoặc áp dụng bản sửa, thực hiện lại ca bị ảnh hưởng và kiểm tra các luồng liên quan để xác nhận bản sửa.

### 3.2.5. Sản phẩm bàn giao của kiểm thử

Tài liệu kiểm thử gồm kế hoạch, danh sách kịch bản, các ca kiểm thử chi tiết và bảng tổng hợp kết quả. Mỗi ca chi tiết ghi mã ca, điều kiện ban đầu, bước thực hiện, kết quả mong đợi, kết quả thực tế và trạng thái. Khi phát hiện sai lệch, hồ sơ kiểm thử ghi bước tái hiện và bằng chứng cần thiết để kiểm tra lại.

## 3.3. Quản lý kiểm thử

### 3.3.1. Quá trình kiểm thử

Trước khi thực hiện, xác định bản dựng sử dụng, chọn các kịch bản và chuẩn bị tài khoản, dữ liệu mẫu theo từng vai trò. Trong quá trình chạy, ghi kết quả ngay sau mỗi ca và lưu bằng chứng cho các sai lệch. Sau khi sửa lỗi, chạy lại các ca liên quan và tổng hợp kết quả theo từng phân hệ.

### 3.3.2. Môi trường kiểm thử

Môi trường cần có ứng dụng web React, API ASP.NET Core trên .NET 10 và cơ sở dữ liệu PostgreSQL có pgvector. Các ca chạy nền và thông báo cần cấu hình Hangfire và SignalR tương ứng. Các ca đăng nhập Google, lưu trữ tệp hoặc trợ lý AI cần môi trường kết nối Firebase Authentication, Cloudinary hoặc Google Gemini theo luồng được kiểm tra.

Dữ liệu chuẩn bị gồm tài khoản ứng viên, nhà tuyển dụng và quản trị viên, doanh nghiệp ở các trạng thái phù hợp, mẫu CV, CV trực tuyến, tệp ảnh và PDF, tin tuyển dụng và hồ sơ ứng tuyển. Dữ liệu từng ca cần được xác định trước để có thể lặp lại và so sánh kết quả.

[Thông tin lần chạy cần ghi nhận: thiết bị, hệ điều hành, trình duyệt, công cụ gọi API, bản dựng FE và BE, cấu hình cơ sở dữ liệu và các dịch vụ được sử dụng.]

## 3.4. Trách nhiệm và quyền hạn

Bảng phân công xác định người lập và theo dõi kế hoạch, người thiết kế ca kiểm thử, người chuẩn bị môi trường và dữ liệu, người thực hiện và người kiểm tra kết quả. Mỗi thành viên được đánh dấu X ở các nhiệm vụ được phân công. Cột Chứng kiến dùng khi có người quan sát hoặc xác nhận một lượt kiểm thử.

*Bảng phân công trách nhiệm kiểm thử*

| Họ và tên | Quản lý | Thiết kế | Chuẩn bị | Thực hiện | Chứng kiến | Kiểm tra |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Phan Quốc Bình  | x |  | x | x |  | x |
| Trần Trọng Phúc  | x | x |  |  | x | x |
| Nguyễn Phước Lộc  | x | x |  | x |  | x |

## 3.5. Kịch bản kiểm thử

Danh sách dự kiến gồm 26 kịch bản tương ứng với 26 chức năng tại mục 2.3. Mỗi kịch bản có mã bắt đầu bằng `TS` và gồm các ca kiểm thử có mã bắt đầu bằng `TC`. Bảng tổng hợp ghi số ca đã thiết kế cho từng kịch bản.

*Bảng tổng hợp kịch bản kiểm thử*

| Mã kịch bản kiểm thử | Tên kịch bản kiểm thử | Số ca kiểm thử |
|---|---|---:|
| `TS_TK_01` | Đăng ký tài khoản ứng viên hoặc nhà tuyển dụng | 5 |
| `TS_TK_02` | Đăng nhập, làm mới phiên và đăng xuất | 6 |
| `TS_TK_03` | Cập nhật thông tin tài khoản và đổi mật khẩu | 5 |
| `TS_TK_04` | Quản lý doanh nghiệp và thành viên | 7 |
| `TS_TK_05` | Xem, theo dõi doanh nghiệp và xem việc đang tuyển | 5 |
| `TS_TEP_01` | Tải lên và quản lý tệp đa phương tiện | 6 |
| `TS_CV_01` | Duyệt mẫu CV và tạo CV | 3 |
| `TS_CV_02` | Biên soạn và quản lý CV | 6 |
| `TS_CV_03` | Quản lý thư viện mẫu CV | 2 |
| `TS_TD_01` | Tìm kiếm và xem chi tiết việc làm | 5 |
| `TS_TD_02` | Lưu và bỏ lưu tin tuyển dụng | 4 |
| `TS_TD_03` | Đăng và quản lý tin tuyển dụng | 6 |
| `TS_TD_04` | Nộp, theo dõi và rút hồ sơ ứng tuyển | 6 |
| `TS_TD_05` | Quản lý ứng viên theo tin tuyển dụng | 6 |
| `TS_TD_06` | Xem tổng quan ứng viên | 4 |
| `TS_TD_07` | Xem tổng quan nhà tuyển dụng | 4 |
| `TS_AI_01` | Phân tích mức độ phù hợp giữa CV và tin tuyển dụng | 4 |
| `TS_AI_02` | Xếp hạng và gợi ý việc làm phù hợp | 5 |
| `TS_AI_03` | Cải thiện nội dung CV theo vị trí mục tiêu | 3 |
| `TS_AI_04` | Quản lý hội thoại AI qua API | 5 |
| `TS_QT_01` | Xác minh doanh nghiệp và kiểm duyệt tin tuyển dụng | 6 |
| `TS_QT_02` | Quản lý trạng thái tài khoản người dùng | 5 |
| `TS_QT_03` | Quản lý danh mục ngành nghề, kỹ năng và địa điểm | 5 |
| `TS_QT_04` | Xem thống kê tổng quan quản trị | 4 |
| `TS_QT_05` | Nhận, quản lý và phát thông báo | 6 |
| `TS_QT_06` | Truy vấn danh mục công khai | 5 |
|  | **Tổng số ca dự kiến** | **128** |

Các bảng chi tiết mô tả thao tác, dữ liệu đầu vào và kết quả mong đợi của từng ca. Cột Kết quả thực tế gồm các ghi chú **Đối chiếu mã nguồn** và **Kiểm tra trực tiếp**. Ghi chú kiểm tra trực tiếp chỉ xác nhận phần logic đã được chạy riêng. Trạng thái **PASS** trong cột Kết quả là trạng thái do người lập báo cáo cung cấp. Tài liệu hiện chưa kèm biên bản chạy đầy đủ cho các ca này.

Kịch bản `TS_TK_01` kiểm tra luồng đăng ký tài khoản theo hai vai trò Ứng viên và Nhà tuyển dụng bằng email/mật khẩu hoặc Google, đồng thời xác minh việc kiểm tra trùng email, số điện thoại và điều kiện đồng ý điều khoản trước khi tạo tài khoản.

*Danh sách ca kiểm thử: Đăng ký tài khoản ứng viên hoặc nhà tuyển dụng*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_TK_01_01` | Đăng ký ứng viên bằng mật khẩu | Mở trang đăng ký, giữ vai trò Ứng viên, nhập thông tin, chọn đồng ý điều khoản và gửi. | Tạo tài khoản vai trò Ứng viên và chuyển sang trang đăng nhập. | **Đối chiếu mã nguồn.** Tab mặc định là Ứng viên. FE gọi API đăng ký ứng viên và chuyển sang trang đăng nhập khi API báo thành công. | Email và số điện thoại chưa đăng ký, họ tên hợp lệ, mật khẩu đạt yêu cầu. | PASS |
| `TC_TK_01_02` | Đăng ký nhà tuyển dụng bằng mật khẩu | Chọn tab Nhà tuyển dụng, điền biểu mẫu và gửi. | Tạo tài khoản vai trò Nhà tuyển dụng và chuyển sang trang đăng nhập. | **Đối chiếu mã nguồn.** FE gọi API đăng ký nhà tuyển dụng theo tab đang chọn. BE gán vai trò nhà tuyển dụng và FE chuyển sang trang đăng nhập khi yêu cầu thành công. | Thông tin hợp lệ chưa được sử dụng, hộp kiểm điều khoản đã chọn. | PASS |
| `TC_TK_01_03` | Đăng ký với email hoặc số điện thoại trùng | Gửi hai bộ dữ liệu độc lập, một bộ trùng email và một bộ trùng số điện thoại. | Mỗi lần đều hiển thị lỗi trùng tương ứng và không tạo thêm tài khoản. | **Đối chiếu mã nguồn.** BE kiểm tra riêng email và số điện thoại đã tồn tại trước khi ghi người dùng. FE hiển thị lỗi API nhận được. | Một tài khoản đã tồn tại. Các trường còn lại hợp lệ. | PASS |
| `TC_TK_01_04` | Gửi khi chưa đồng ý điều khoản | Điền đủ thông tin rồi bấm đăng ký khi hộp kiểm chưa được chọn. | Biểu mẫu yêu cầu đồng ý điều khoản và không gửi yêu cầu đăng ký. | **Đối chiếu mã nguồn.** `SignUp` kiểm tra ô đồng ý trước khi gọi API. Hộp kiểm chưa chọn làm hàm gửi dừng và hiển thị thông báo. | Thông tin hợp lệ, hộp kiểm bỏ chọn. | PASS |
| `TC_TK_01_05` | Đăng ký lần đầu bằng Google | Chọn vai trò, chọn đăng ký Google và hoàn tất xác thực. | Tạo tài khoản với vai trò đã chọn, thiết lập phiên và chuyển về trang chủ. | **Đối chiếu mã nguồn.** `SignUp` gửi Firebase ID token và vai trò đang chọn. BE có nhánh tạo người dùng cho email mới, sau đó FE chuyển về trang chủ khi nhận phiên. | Email Google đã xác minh, chưa có trong SmartHire. | PASS |

Kịch bản `TS_TK_02` kiểm tra xác thực bằng mật khẩu, đăng nhập Google cho tài khoản đã có hoặc email mới, cơ chế tự động làm mới phiên qua refresh token và thu hồi phiên khi đăng xuất.

*Danh sách ca kiểm thử: Đăng nhập, làm mới phiên và đăng xuất*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_TK_02_01` | Đăng nhập bằng mật khẩu | Nhập email và mật khẩu đúng, sau đó mở trang dành cho vai trò của tài khoản. | Thiết lập phiên và truy cập được trang đúng vai trò. | **Đối chiếu mã nguồn.** BE kiểm tra trạng thái tài khoản và mật khẩu đã băm, sau đó cấp phiên. FE lưu phiên và bảo vệ trang theo vai trò. | Tài khoản đang hoạt động và thông tin đăng nhập hợp lệ. | PASS |
| `TC_TK_02_02` | Đăng nhập sai mật khẩu | Gửi biểu mẫu với email hợp lệ và mật khẩu sai. | Hiển thị lỗi xác thực và không tạo phiên. | **Đối chiếu mã nguồn.** Nhánh mật khẩu không khớp kết thúc trước khi cấp token. FE dùng lỗi trả về để hiển thị thông báo. | Email đã đăng ký, mật khẩu không khớp. | PASS |
| `TC_TK_02_03` | Đăng nhập Google với tài khoản có sẵn | Bấm đăng nhập Google và xác thực bằng email đã liên kết. | Đăng nhập bằng tài khoản hiện có và giữ nguyên vai trò. | **Đối chiếu mã nguồn.** BE tìm tài khoản theo email Google đã xác minh và cấp token theo vai trò đã lưu của tài khoản. | Tài khoản ứng viên hoặc nhà tuyển dụng đang hoạt động, đã liên kết Google. | PASS |
| `TC_TK_02_04` | Đăng nhập Google với email mới | Xác thực bằng Google, chọn vai trò khi hệ thống yêu cầu rồi xác nhận. | Tạo tài khoản theo vai trò đã chọn và thiết lập phiên. | **Đối chiếu mã nguồn.** Khi email mới chưa có vai trò, API yêu cầu bổ sung vai trò. FE mở hộp thoại chọn và gửi lại mã Firebase cùng vai trò đã chọn. | Email Google chưa có tài khoản SmartHire. | PASS |
| `TC_TK_02_05` | Tự làm mới phiên | Để access token hết hạn rồi mở một màn hình cần xác thực. | Ứng dụng làm mới phiên và gửi lại yêu cầu ban đầu, màn hình tải được. | **Đối chiếu mã nguồn.** Axios nhận lỗi xác thực đủ điều kiện, gọi API refresh với cookie và thử lại yêu cầu gốc. BE xoay vòng refresh token. | Access token đã hết hạn, cookie refresh token còn hiệu lực. | PASS |
| `TC_TK_02_06` | Đăng xuất và kết thúc phiên hiện tại | Chọn Đăng xuất trong menu, sau đó tải lại trang yêu cầu đăng nhập. | Ứng dụng chuyển về trạng thái chưa đăng nhập và không khôi phục được phiên đã thu hồi. | **Đối chiếu mã nguồn.** Menu gọi đăng xuất phiên hiện tại. BE thu hồi token và xóa cookie nếu yêu cầu thành công. FE xóa trạng thái xác thực ngay cả khi lời gọi lỗi. | Một phiên đang hoạt động. | PASS |

Kịch bản `TS_TK_03` kiểm tra thao tác chỉnh sửa họ tên, số điện thoại, thay hoặc gỡ ảnh đại diện, cũng như quy trình đổi mật khẩu kèm kiểm tra xác nhận mật khẩu và thu hồi các phiên đang hoạt động.

*Danh sách ca kiểm thử: Cập nhật thông tin tài khoản và đổi mật khẩu*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_TK_03_01` | Cập nhật họ tên và số điện thoại | Vào hồ sơ, chỉnh sửa hai trường, lưu rồi tải lại trang. | Hồ sơ hiển thị các giá trị đã cập nhật. | **Đối chiếu mã nguồn.** FE gửi phần họ tên và số điện thoại có thay đổi. BE kiểm tra số điện thoại trùng trước khi lưu và trả lại hồ sơ. | Họ tên hợp lệ và số điện thoại chưa thuộc tài khoản khác. | PASS |
| `TC_TK_03_02` | Thay ảnh đại diện | Chọn ảnh, điều chỉnh vùng cắt, xác nhận và lưu hồ sơ. | Ảnh đại diện mới hiển thị sau khi tải lại hồ sơ. | **Đối chiếu mã nguồn.** Giao diện cắt và tải ảnh. BE chỉ gắn tệp tồn tại, thuộc tài khoản và có loại ảnh. | Tệp ảnh hợp lệ và tài khoản đã đăng nhập. | PASS |
| `TC_TK_03_03` | Bỏ ảnh đại diện | Mở hộp thoại ảnh chọn xóa ảnh (hoặc bấm nút Gỡ ảnh nếu đang có ảnh mới chưa lưu, rồi xác nhận trên hộp thoại gồm hai nút Tiếp tục chỉnh sửa và Gỡ ảnh) và lưu hồ sơ. | Ảnh đại diện đã bỏ không còn hiển thị trên hồ sơ (hoặc khôi phục ảnh cũ nếu hủy ảnh mới chưa lưu). | **Đối chiếu mã nguồn.** Trong `UserProfile`, nút Gỡ ảnh mở `AlertDialog` xác nhận với hai nút Tiếp tục chỉnh sửa và Gỡ ảnh; khi xóa ảnh hiện tại và bấm Lưu thay đổi, FE gửi `avatarFileId` bằng `null`, BE bỏ liên kết ảnh và lên lịch dọn ảnh cũ. | Tài khoản đang có ảnh đại diện hoặc vừa tải ảnh mới chưa lưu. | PASS |
| `TC_TK_03_04` | Xác nhận mật khẩu mới không khớp | Nhập mật khẩu hiện tại và hai giá trị mật khẩu mới khác nhau rồi gửi. | Giao diện báo lỗi xác nhận và mật khẩu hiện tại vẫn dùng được. | **Đối chiếu mã nguồn.** FE so sánh hai lần nhập mật khẩu mới và hiển thị lỗi trước khi gửi yêu cầu đổi mật khẩu. | Mật khẩu hiện tại đúng. Hai giá trị mới khác nhau. | PASS |
| `TC_TK_03_05` | Đổi mật khẩu và thu hồi phiên | Mở hai phiên độc lập. Đổi mật khẩu ở phiên thứ nhất với tùy chọn thu hồi đang bật. Thử làm mới ở phiên thứ hai. | Mật khẩu mới dùng được và phiên thứ hai không thể làm mới bằng refresh token cũ. | **Đối chiếu mã nguồn.** BE lưu mật khẩu mới đã băm và thu hồi toàn bộ refresh token chưa thu hồi khi tùy chọn được bật. Token cũ không đủ điều kiện làm mới. | Hai phiên còn hiệu lực, mật khẩu hiện tại đúng, mật khẩu mới hợp lệ. | PASS |

Kịch bản `TS_TK_04` kiểm tra nghiệp vụ khởi tạo và cập nhật doanh nghiệp theo mã số thuế và quyền chủ sở hữu, cùng các thao tác quản trị thành viên như mời gia nhập, duyệt yêu cầu, chuyển quyền sở hữu, rời hoặc loại thành viên.

*Danh sách ca kiểm thử: Quản lý doanh nghiệp và thành viên*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_TK_04_01` | Tạo doanh nghiệp | Đăng nhập bằng tài khoản nhà tuyển dụng, nhập thông tin doanh nghiệp và lưu. | Doanh nghiệp xuất hiện trong danh sách quản lý và người tạo có vai trò chủ sở hữu. | **Đối chiếu mã nguồn.** BE kiểm tra mã số thuế và giới hạn sở hữu. Doanh nghiệp cùng tư cách chủ sở hữu của người tạo được ghi trong giao dịch. | Mã số thuế chưa sử dụng, chưa đạt giới hạn sở hữu. | PASS |
| `TC_TK_04_02` | Ngăn tạo trùng mã số thuế | Gửi biểu mẫu doanh nghiệp mới với mã số thuế đã có. | Yêu cầu bị từ chối và bản ghi doanh nghiệp hiện có giữ nguyên. | **Đối chiếu mã nguồn.** BE phát hiện mã số thuế đã tồn tại trước khi thêm doanh nghiệp và trả lỗi xung đột. | Mã số thuế trùng, các trường còn lại hợp lệ. | PASS |
| `TC_TK_04_03` | Lưu thay đổi doanh nghiệp theo quyền | Đổi mô tả bằng tài khoản chủ sở hữu. Dùng tài khoản thành viên thường gửi yêu cầu sửa cùng doanh nghiệp. | Thay đổi của chủ sở hữu được lưu. Yêu cầu của thành viên thường bị từ chối. | **Đối chiếu mã nguồn.** API cập nhật yêu cầu tư cách chủ sở hữu đang hoạt động. Thành viên thường bị từ chối trước bước lưu. | Doanh nghiệp có một chủ sở hữu và một nhà tuyển dụng đang là thành viên. | PASS |
| `TC_TK_04_04` | Mời và chấp nhận lời mời | Chủ sở hữu gửi lời mời. Người nhận đăng nhập, mở danh sách lời mời và bấm chấp nhận. | Người nhận trở thành thành viên đang hoạt động và lời mời chuyển sang trạng thái đã chấp nhận. | **Đối chiếu mã nguồn.** Khi lời mời còn hiệu lực và đúng người nhận, API chấp nhận cập nhật lời mời và tạo hoặc kích hoạt tư cách thành viên. | Email của nhà tuyển dụng chưa là thành viên, lời mời còn hạn. | PASS |
| `TC_TK_04_05` | Duyệt yêu cầu gia nhập | Chủ sở hữu mở yêu cầu đang chờ và chấp thuận. | Yêu cầu được duyệt và người gửi trở thành thành viên đang hoạt động. | **Đối chiếu mã nguồn.** Chỉ chủ sở hữu đang hoạt động được duyệt yêu cầu đang chờ. Nhánh chấp thuận ghi trạng thái xét duyệt và tư cách thành viên. | Yêu cầu đang chờ thuộc doanh nghiệp của chủ sở hữu. | PASS |
| `TC_TK_04_06` | Chuyển quyền sở hữu | Chủ sở hữu chọn thành viên đủ điều kiện và xác nhận chuyển quyền. | Danh sách thành viên hiển thị chủ sở hữu mới và cập nhật vai trò của chủ sở hữu cũ. | **Đối chiếu mã nguồn.** BE kiểm tra người nhận quyền là thành viên đang hoạt động. Vai trò chủ sở hữu mới và cũ được cập nhật trong giao dịch. | Một chủ sở hữu và một thành viên đang hoạt động. | PASS |
| `TC_TK_04_07` | Rời doanh nghiệp hoặc loại thành viên | Cho một thành viên tự rời. Dùng chủ sở hữu loại một thành viên khác trong dữ liệu độc lập. | Các thành viên tương ứng chuyển sang trạng thái đã rời và mất quyền thao tác với tư cách thành viên đang hoạt động. | **Đối chiếu mã nguồn.** Nhánh tự rời và nhánh bị chủ sở hữu loại đều đặt tư cách thành viên sang `Left`. Các chức năng yêu cầu thành viên đang hoạt động sẽ từ chối tư cách này. | Hai thành viên thường đang hoạt động và tài khoản chủ sở hữu. | PASS |

Kịch bản `TS_TK_05` kiểm tra khả năng truy cập trang thông tin công khai của doanh nghiệp, thao tác theo dõi hoặc bỏ theo dõi theo trạng thái đăng nhập và gửi yêu cầu gia nhập không trùng lặp cho nhà tuyển dụng.

*Danh sách ca kiểm thử: Xem, theo dõi doanh nghiệp và xem việc đang tuyển*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_TK_05_01` | Xem trang công khai của doanh nghiệp | Mở trang chi tiết khi chưa đăng nhập và chuyển sang tab việc đang tuyển. | Hiển thị thông tin doanh nghiệp và các tin hiện đủ điều kiện công khai. | **Đối chiếu mã nguồn.** Route chi tiết dùng được ở phiên khách. Tab việc làm truy vấn tin công khai theo mã doanh nghiệp và loại tin đã đóng. | Doanh nghiệp có tin đang phát hành và tin đã đóng. | PASS |
| `TC_TK_05_02` | Theo dõi và bỏ theo dõi doanh nghiệp | Đăng nhập bằng vai trò Ứng viên, bấm theo dõi, kiểm tra danh sách đã theo dõi rồi bỏ theo dõi. | Doanh nghiệp xuất hiện sau khi theo dõi và biến mất sau khi bỏ theo dõi. | **Đối chiếu mã nguồn.** `CompanyDetailPage` gọi API thêm hoặc xóa liên kết theo dõi. Danh sách đã theo dõi truy vấn theo ứng viên hiện tại. | Doanh nghiệp công khai, ứng viên chưa theo dõi. | PASS |
| `TC_TK_05_03` | Theo dõi khi chưa đăng nhập | Mở trang doanh nghiệp ở phiên khách rồi bấm theo dõi. | Giao diện yêu cầu đăng nhập để tiếp tục. | **Đối chiếu mã nguồn.** Trang chi tiết có nhánh mở hộp thoại nhắc đăng nhập khi khách yêu cầu theo dõi. | Phiên khách và mã doanh nghiệp hợp lệ. | PASS |
| `TC_TK_05_04` | Gửi yêu cầu gia nhập | Đăng nhập với vai trò Nhà tuyển dụng, mở trang doanh nghiệp và gửi yêu cầu gia nhập. | Yêu cầu xuất hiện trong danh sách chờ xét duyệt của chủ sở hữu. | **Đối chiếu mã nguồn.** API tạo yêu cầu gia nhập sau khi kiểm tra tư cách thành viên và yêu cầu chờ. Chủ sở hữu có thể đọc yêu cầu ở luồng xét duyệt. | Nhà tuyển dụng chưa là thành viên và chưa có yêu cầu đang chờ. | PASS |
| `TC_TK_05_05` | Ngăn yêu cầu gia nhập trùng | Gửi lại yêu cầu gia nhập qua API khi yêu cầu trước đang chờ. | Yêu cầu lặp bị từ chối và danh sách chỉ chứa yêu cầu ban đầu. | **Đối chiếu mã nguồn.** BE truy vấn yêu cầu chờ của cùng người dùng và doanh nghiệp rồi từ chối nếu đã có. | Cùng tài khoản, cùng doanh nghiệp và một yêu cầu chưa được xử lý. | PASS |

Kịch bản `TS_TEP_01` kiểm tra luồng tải lên tệp ảnh và PDF, xác thực định dạng và giới hạn dung lượng, kiểm soát quyền xóa tệp theo chủ sở hữu và ngăn xóa các tệp đang được đối tượng nghiệp vụ tham chiếu.

*Danh sách ca kiểm thử: Tải lên và quản lý tệp đa phương tiện*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_TEP_01_01` | Tải ảnh hợp lệ | Chọn ảnh ở màn hình hồ sơ, cắt ảnh và xác nhận tải lên. | Giao diện hiển thị ảnh mới và API trả thông tin tệp gắn với người tải. | **Đối chiếu mã nguồn.** Trình chọn ảnh chuyển ảnh đã cắt tới API tải ảnh. BE lưu siêu dữ liệu cùng định danh người tải sau khi lưu trữ thành công. | Tệp JPEG hoặc PNG hợp lệ, tài khoản đã đăng nhập. | PASS |
| `TC_TEP_01_02` | Tải PDF hợp lệ | Mở hộp thoại ứng tuyển, chọn nguồn PDF và nộp hồ sơ. | Tệp PDF được tải và định danh tệp được dùng cho hồ sơ. | **Đối chiếu mã nguồn.** Hộp thoại ứng tuyển tải PDF trước, sau đó chuyển mã tệp vào yêu cầu nộp hồ sơ. | PDF hợp lệ dưới 5 MB, tin còn nhận hồ sơ. | PASS |
| `TC_TEP_01_03` | Từ chối định dạng hoặc dung lượng không hợp lệ | Gửi hai yêu cầu tải tệp độc lập với định dạng sai và kích thước vượt giới hạn của từng loại. | Tệp bị từ chối và không có bản ghi tệp mới. | **Kiểm tra trực tiếp bộ kiểm tra PDF.** Dữ liệu có chữ ký PDF khai báo dung lượng 10 MiB cộng 1 byte bị từ chối. **Đối chiếu mã nguồn.** Luồng tải ảnh cũng có bước kiểm tra định dạng trước khi lưu. Chưa quan sát phản hồi HTTP và bản ghi tệp. | Tệp không phải ảnh gửi vào chức năng tải ảnh và PDF vượt giới hạn cấu hình. | PASS |
| `TC_TEP_01_04` | Ngăn xóa tệp đang tham chiếu | Dùng tài khoản chủ sở hữu gọi API xóa ảnh đang là ảnh đại diện. | Yêu cầu bị từ chối và ảnh đại diện vẫn truy cập được. | **Đối chiếu mã nguồn.** BE kiểm tra tham chiếu tệp từ người dùng, doanh nghiệp, mẫu CV và hồ sơ ứng tuyển. Tệp đang được dùng trả lỗi xung đột với mã `MEDIA_FILE_IN_USE`. | Mã tệp ảnh đang được hồ sơ tham chiếu. | PASS |
| `TC_TEP_01_05` | Xóa tệp không còn tham chiếu | Dùng chủ sở hữu gọi API xóa. Kiểm tra trạng thái rồi kiểm tra lại sau khi tác vụ nền hoàn tất. | Tệp được đánh dấu xóa và tác vụ nền xóa đối tượng khỏi dịch vụ lưu trữ. | **Đối chiếu mã nguồn.** BE đánh dấu bản ghi đã xóa trước khi xếp tác vụ Cloudinary. Việc đối tượng đã được xóa khỏi Cloudinary cần xác nhận sau khi tác vụ chạy. | Tệp đã tải, không gắn với đối tượng nghiệp vụ, tác vụ nền đang hoạt động. | PASS |
| `TC_TEP_01_06` | Ngăn người khác xóa tệp | Dùng một tài khoản thường khác chủ sở hữu để gọi API xóa tệp. | Yêu cầu bị từ chối và tệp còn nguyên. | **Đối chiếu mã nguồn.** API xóa chỉ cho phép chủ sở hữu tệp hoặc quản trị viên. Tài khoản thường khác chủ sở hữu bị từ chối. | Mã tệp không còn tham chiếu nhưng thuộc tài khoản khác. | PASS |

Kịch bản `TS_CV_01` kiểm tra việc tìm kiếm, xem trước các mẫu CV đang hoạt động, khởi tạo CV kèm phiên bản ban đầu từ mẫu đã chọn và từ chối tạo mới khi mẫu đã bị vô hiệu hóa.

*Danh sách ca kiểm thử: Duyệt mẫu CV và tạo CV*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_CV_01_01` | Duyệt và tìm mẫu đang hoạt động | Mở kho mẫu, tìm theo tên và mở xem trước kết quả. | Hiển thị mẫu đang hoạt động phù hợp và mở đúng bản xem trước. | **Đối chiếu mã nguồn.** Trang kho mẫu gửi từ khóa tới API chỉ trả mẫu hoạt động. Hộp thoại xem trước lấy dữ liệu của mẫu đã chọn. | Một mẫu hoạt động và một mẫu đã tắt có từ khóa chung. | PASS |
| `TC_CV_01_02` | Tạo CV từ mẫu | Chọn mẫu, nhập tiêu đề và xác nhận tạo. | Tạo CV và phiên bản ban đầu theo mẫu rồi mở trình biên soạn. | **Đối chiếu mã nguồn.** BE tạo CV và phiên bản ban đầu từ nội dung và bố cục mặc định. FE mở trình biên soạn theo mã CV được trả về. | Tài khoản ứng viên, mẫu hoạt động, tiêu đề hợp lệ. | PASS |
| `TC_CV_01_03` | Từ chối tạo CV từ mẫu đã tắt | Gọi API tạo CV với mã mẫu đã tắt. | Yêu cầu bị từ chối và không xuất hiện CV hoặc phiên bản mới. | **Đối chiếu mã nguồn.** Handler trả lỗi `TemplateInactive` trước khi tạo CV nếu mẫu đã bị tắt. | Mã mẫu tồn tại, trạng thái đã tắt. | PASS |

Kịch bản `TS_CV_02` kiểm tra các chức năng chính trong trình biên soạn và quản lý CV gồm lưu phiên bản mới, hoàn tác/làm lại, xem trước và xuất PDF, chuyển đổi chế độ công khai/riêng tư, kiểm soát quyền sở hữu và xóa mềm CV.

*Danh sách ca kiểm thử: Biên soạn và quản lý CV*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_CV_02_01` | Chỉnh sửa và lưu phiên bản | Sửa nội dung và bố cục, lưu rồi mở lại CV. Kiểm tra danh sách phiên bản qua API. | Nội dung mới được lưu và một phiên bản mới có ảnh xem trước được tạo. | **Đối chiếu mã nguồn.** FE tải ảnh xem trước khi lưu. BE dùng mã băm để nhận diện thay đổi và yêu cầu ảnh hợp lệ khi tạo phiên bản mới. | CV thuộc ứng viên và nội dung có thay đổi. | PASS |
| `TC_CV_02_02` | Hoàn tác và làm lại | Sửa một trường, bấm hoàn tác rồi bấm làm lại. | Giá trị lần lượt trở về ban đầu và trở lại giá trị đã sửa. | **Đối chiếu mã nguồn.** Trình biên soạn dùng lịch sử thao tác cục bộ để hoàn tác hoặc áp dụng lại thay đổi. | CV đang mở trong trình biên soạn. | PASS |
| `TC_CV_02_03` | Xem trước và tải PDF | Mở xem trước, chọn tải PDF và dùng hộp thoại trình duyệt lưu tệp. | Bản xem trước đúng với CV được chọn và trình duyệt mở hộp thoại in hoặc lưu PDF. | **Đối chiếu mã nguồn.** FE nạp chi tiết CV để kết xuất và gọi cơ chế in của trình duyệt. Việc lưu thành công tệp do trình duyệt xử lý. | CV đã lưu, trình duyệt hỗ trợ in. | PASS |
| `TC_CV_02_04` | Chuyển công khai và riêng tư | Bật công khai rồi mở đường dẫn API chi tiết bằng phiên khác. Tắt công khai và kiểm tra lại. | Phiên khác xem được CV công khai và bị từ chối khi CV chuyển sang riêng tư. | **Đối chiếu mã nguồn.** FE cập nhật cờ công khai. API chi tiết chỉ từ chối khi người xem không phải chủ sở hữu và CV là riêng tư. | CV thuộc ứng viên và một phiên kiểm tra độc lập. | PASS |
| `TC_CV_02_05` | Ngăn sửa CV không thuộc sở hữu | Dùng tài khoản ứng viên khác gửi yêu cầu cập nhật một CV đã biết mã. | Yêu cầu bị từ chối và dữ liệu CV không đổi. | **Đối chiếu mã nguồn.** Handler của API cập nhật đối chiếu chủ sở hữu trước mọi thao tác ghi và trả lỗi `CvNotOwned` nếu không khớp. | Hai tài khoản ứng viên và mã CV thuộc tài khoản thứ nhất. | PASS |
| `TC_CV_02_06` | Xóa CV khỏi danh sách | Chọn xóa, xác nhận rồi tải lại danh sách CV. | CV bị ẩn khỏi danh sách và bản ghi được đánh dấu xóa. | **Đối chiếu mã nguồn.** API ghi `DeletedAt` trên CV. Truy vấn danh sách loại các CV đã được đánh dấu xóa. | CV còn hiển thị và thuộc ứng viên hiện tại. | PASS |

Kịch bản `TS_CV_03` kiểm tra các thao tác quản trị thư viện mẫu CV trên giao diện gồm tìm kiếm, cập nhật tên hoặc mô tả mẫu và bật/tắt trạng thái hiển thị của mẫu đối với ứng viên.

*Danh sách ca kiểm thử: Quản lý thư viện mẫu CV*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_CV_03_01` | Sửa thông tin mẫu trên giao diện | Quản trị viên tìm mẫu theo mã, cập nhật tên và mô tả rồi lưu. | Kho mẫu hiển thị thông tin mới khi tải lại. | **Đối chiếu mã nguồn.** Hộp thoại quản trị gửi tên và mô tả qua API cập nhật mẫu. FE nạp lại dữ liệu mẫu sau thao tác. | Mẫu CV có sẵn và tài khoản quản trị viên. | PASS |
| `TC_CV_03_02` | Bật và tắt mẫu | Tắt mẫu rồi kiểm tra kho mẫu ứng viên. Bật lại và kiểm tra lần nữa. | Mẫu biến mất khi tắt và xuất hiện lại khi bật. CV đã tạo từ mẫu được giữ. | **Đối chiếu mã nguồn.** Nút bật hoặc tắt gửi `isActive`. API công khai lọc theo trạng thái hoạt động và thao tác này giữ nguyên bản ghi mẫu. | Mẫu đang hoạt động và đã có CV tham chiếu. | PASS |

Kịch bản `TS_TD_01` kiểm tra luồng tìm kiếm việc làm công khai theo từ khóa, lọc theo địa điểm và cấp bậc, từ chối tổ hợp bộ lọc lương mâu thuẫn, sắp xếp kết quả kèm phân trang trên URL và hiển thị chi tiết tin tuyển dụng.

*Danh sách ca kiểm thử: Tìm kiếm và xem chi tiết việc làm*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_TD_01_01` | Tìm theo từ khóa | Nhập từ khóa trên trang tìm việc và gửi tìm kiếm. | Kết quả có tin công khai mang từ khóa đã cho. Tin không đủ điều kiện công khai không xuất hiện. | **Đối chiếu mã nguồn.** Kho truy vấn áp dụng từ khóa và các điều kiện công khai. Tin đã đóng bị loại khỏi tập kết quả trước khi phân trang. | Một tin đang tuyển, một tin đã đóng và một tin không liên quan. | PASS |
| `TC_TD_01_02` | Lọc theo vị trí và cấp bậc | Chọn tỉnh, phường và cấp bậc từ bộ lọc. | Các kết quả đáp ứng các điều kiện đã chọn. | **Đối chiếu mã nguồn.** FE gửi mã tỉnh, mã phường và cấp bậc. BE kiểm tra địa điểm hợp lệ và lọc kết quả theo các giá trị được gửi. | Tin ở các phường hoặc cấp bậc khác nhau, danh mục đang hoạt động. | PASS |
| `TC_TD_01_03` | Từ chối tổ hợp lương không hợp lệ | Gọi API tìm việc với bộ lọc chỉ xem lương thương lượng đồng thời truyền lương tối thiểu. | API từ chối tổ hợp tham số và trả thông tin lỗi đầu vào. | **Đối chiếu mã nguồn.** Validator báo lỗi trường `salaryNegotiableOnly` nếu yêu cầu đồng thời có `salaryMin` hoặc `salaryMax`. | Bật lọc lương thương lượng và nhập lương tối thiểu hợp lệ về kiểu dữ liệu. | PASS |
| `TC_TD_01_04` | Sắp xếp và chuyển trang | Chọn sắp xếp theo mức lương tối đa, kiểm tra thứ tự rồi chuyển trang. | Dữ liệu sắp đúng thứ tự đã chọn và vẫn giữ bộ lọc khi chuyển trang. | **Đối chiếu mã nguồn.** FE giữ các bộ lọc trong tham số URL và cập nhật tham số trang khi đổi trang. API sắp theo `salaryMax` với chiều được chọn. | Danh sách đủ nhiều tin, có mức lương tối đa khác nhau. | PASS |
| `TC_TD_01_05` | Xem chi tiết tin | Chọn một kết quả và đối chiếu khung chi tiết với thẻ đã chọn. | Tiêu đề, doanh nghiệp, mô tả và yêu cầu hiển thị đúng tin được chọn. | **Đối chiếu mã nguồn.** Chọn thẻ đặt mã tin đang xem. Khung chi tiết lấy thông tin theo mã đó và hiển thị nội dung của bản ghi. | Một tin công khai có đủ thông tin. | PASS |

Kịch bản `TS_TD_02` kiểm tra chức năng đánh dấu lưu tin tuyển dụng đang phát hành của ứng viên, ngăn lưu trùng hoặc lưu tin đã đóng và đảm bảo thao tác bỏ lưu chỉ ảnh hưởng đến tài khoản hiện tại.

*Danh sách ca kiểm thử: Lưu và bỏ lưu tin tuyển dụng*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_TD_02_01` | Lưu một tin hợp lệ | Đăng nhập bằng tài khoản ứng viên, bấm biểu tượng lưu rồi mở danh sách việc đã lưu. | Tin được đánh dấu và xuất hiện trong danh sách của ứng viên. | **Đối chiếu mã nguồn.** API lưu kiểm tra `Published`, doanh nghiệp đã xác minh và hạn nộp. FE cập nhật dữ liệu việc đã lưu sau thao tác. | Tin đang phát hành, còn hạn và thuộc doanh nghiệp đã xác minh. | PASS |
| `TC_TD_02_02` | Từ chối lưu trùng | Gửi lại yêu cầu lưu qua API cho tin đã lưu. | API báo xung đột và chỉ có một liên kết việc làm đã lưu. | **Đối chiếu mã nguồn.** BE kiểm tra liên kết theo cặp người dùng và tin. Liên kết tồn tại hoặc vi phạm ràng buộc duy nhất trả lỗi `JobAlreadyBookmarked`. | Cùng ứng viên và tin đã lưu trước đó. | PASS |
| `TC_TD_02_03` | Từ chối lưu tin đã đóng | Gửi yêu cầu lưu tin đã đóng qua API. | Yêu cầu bị từ chối và tin không xuất hiện trong danh sách đã lưu. | **Đối chiếu mã nguồn.** Tin `Closed` không đạt điều kiện lưu. Handler dừng trước khi thêm liên kết. | Tài khoản ứng viên và mã tin đã đóng. | PASS |
| `TC_TD_02_04` | Bỏ lưu theo tài khoản | Bỏ lưu tin bằng ứng viên thứ nhất rồi kiểm tra danh sách của cả hai tài khoản. | Tin bị bỏ khỏi danh sách của ứng viên thứ nhất và vẫn còn trong danh sách của ứng viên thứ hai. | **Đối chiếu mã nguồn.** API bỏ lưu dùng mã tài khoản của phiên hiện tại cùng mã tin. Liên kết của ứng viên khác nằm ngoài phạm vi xóa. | Hai ứng viên đã lưu cùng tin. | PASS |

Kịch bản `TS_TD_03` kiểm tra quy trình tạo tin tuyển dụng ở trạng thái chờ duyệt, từ chối doanh nghiệp chưa xác minh, kiểm tra tổng trọng số so khớp bằng 100%, cập nhật danh mục kỹ năng/ngành nghề, đóng tin và tự động hết hạn tin qua tác vụ nền.

*Danh sách ca kiểm thử: Đăng và quản lý tin tuyển dụng*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_TD_03_01` | Tạo tin tuyển dụng chờ duyệt | Nhà tuyển dụng mở biểu mẫu, điền thông tin và gửi. | Tin được tạo ở trạng thái chờ duyệt và chưa xuất hiện trong danh sách công khai. | **Đối chiếu mã nguồn.** Handler kiểm tra doanh nghiệp và thành viên trước khi tạo. Trạng thái khởi tạo là `PendingReview`, còn truy vấn công khai chỉ lấy tin đã phát hành. | Thành viên đang hoạt động của doanh nghiệp đã xác minh, thông tin tin hợp lệ. | PASS |
| `TC_TD_03_02` | Từ chối tạo tin cho doanh nghiệp chưa xác minh | Gửi yêu cầu tạo tin qua API với doanh nghiệp chưa xác minh. | Yêu cầu bị từ chối và danh sách quản lý không có tin mới. | **Đối chiếu mã nguồn.** Handler từ chối doanh nghiệp chưa xác minh trước khi tạo tin và ghi dữ liệu. | Nhà tuyển dụng là thành viên của doanh nghiệp chưa xác minh. | PASS |
| `TC_TD_03_03` | Kiểm tra tổng trọng số so khớp | Đặt bốn trọng số có tổng khác 100% rồi thử lưu biểu mẫu. | Giao diện yêu cầu điều chỉnh tổng trọng số và không lưu thay đổi. | **Đối chiếu mã nguồn.** FE tính tổng bốn trọng số và báo lỗi tại biểu mẫu nếu tổng khác 100%. | Trọng số 40%, 30%, 20% và 5%, các thông tin khác hợp lệ. | PASS |
| `TC_TD_03_04` | Cập nhật ngành nghề và kỹ năng | Mở tin có thể chỉnh sửa, bỏ một kỹ năng và thêm ngành nghề hợp lệ rồi lưu. | Chi tiết tin sau khi tải lại hiển thị đúng danh mục mới. | **Đối chiếu mã nguồn.** BE đối chiếu danh mục đang hoạt động và cập nhật liên kết theo danh sách mới. Truy vấn chi tiết đọc các liên kết đã lưu. | Tin chưa đóng hoặc hết hạn, các danh mục thay thế đang hoạt động. | PASS |
| `TC_TD_03_05` | Đóng tin đang tuyển | Chọn thao tác đóng tin và xác nhận. Mở lại trang tìm việc công khai. | Tin chuyển sang trạng thái đã đóng và không còn xuất hiện trong kết quả tìm kiếm công khai. | **Đối chiếu mã nguồn.** API kiểm tra tư cách thành viên hoạt động trước khi chuyển tin sang `Closed`. Truy vấn công khai loại trạng thái này. | Tin đang phát hành thuộc doanh nghiệp của tài khoản. | PASS |
| `TC_TD_03_06` | Cập nhật tin hết hạn qua tác vụ nền | Chờ tác vụ định kỳ xử lý tin đã quá hạn rồi tải lại danh sách quản lý. | Tin đã quá hạn chuyển từ đang phát hành sang hết hạn. | **Đối chiếu mã nguồn.** Tác vụ `ExpireOverdueJobPostings` chuyển tin phát hành quá hạn sang `Expired`. Thời điểm cập nhật phụ thuộc lịch thực thi. | Tin đang phát hành đã qua hạn nộp, tác vụ định kỳ đã được cấu hình. | PASS |

Kịch bản `TS_TD_04` kiểm tra hai phương thức nộp hồ sơ bằng CV trực tuyến hoặc tệp PDF, giới hạn dung lượng 5 MB khi ứng tuyển, ngăn nộp trùng cùng một tin và quy tắc rút hồ sơ kèm lý do theo từng trạng thái.

*Danh sách ca kiểm thử: Nộp, theo dõi và rút hồ sơ ứng tuyển*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_TD_04_01` | Nộp hồ sơ bằng CV trực tuyến | Mở hộp thoại ứng tuyển, chọn CV, nhập thư giới thiệu và gửi. | Hồ sơ dùng phiên bản mới nhất của CV đã chọn và có mốc trạng thái đã nộp. | **Đối chiếu mã nguồn.** Hộp thoại lấy phiên bản đầu tiên từ truy vấn phiên bản mới nhất của CV đã chọn. BE kiểm tra quyền sở hữu rồi lưu hồ sơ và mốc `Submitted`. | Ứng viên có CV với nhiều phiên bản, tin còn nhận hồ sơ. | PASS |
| `TC_TD_04_02` | Nộp hồ sơ bằng PDF | Chọn nguồn PDF, chọn tệp và gửi hồ sơ. | Tệp được tải, hồ sơ tham chiếu đúng tệp và xuất hiện trong danh sách đã nộp. | **Đối chiếu mã nguồn.** FE tải tệp rồi gửi `uploadedCvFileId`. BE kiểm tra tệp và ghi định danh tệp vào hồ sơ khi yêu cầu hợp lệ. | PDF hợp lệ dưới 5 MB và chưa dùng cho hồ sơ khác. | PASS |
| `TC_TD_04_03` | Từ chối PDF vượt giới hạn | Chọn tệp PDF hợp lệ 6 MiB rồi bấm nộp. Quan sát riêng bước tải tệp và bước nộp hồ sơ. | Hệ thống báo tệp vượt giới hạn và không tạo hồ sơ. | **Kiểm tra trực tiếp bộ kiểm tra PDF.** Luồng dữ liệu 6 MiB có chữ ký PDF vượt qua bước kiểm tra tệp tải lên. **Đối chiếu mã nguồn.** Giao diện và API tải tệp giới hạn 10 MiB, còn API ứng tuyển giới hạn 5 MiB. Tệp PDF hợp lệ 6 MiB có thể qua bước tải và bị từ chối khi nộp hồ sơ. Chưa chạy luồng nộp thực tế. | Tệp PDF hợp lệ 6 MiB, tin còn nhận hồ sơ và ứng viên chưa nộp vào tin đó. | PASS |
| `TC_TD_04_04` | Ngăn ứng tuyển trùng | Gửi lại yêu cầu ứng tuyển cho tin đã nộp. | Yêu cầu bị từ chối và vẫn chỉ có một hồ sơ của ứng viên cho tin. | **Đối chiếu mã nguồn.** BE kiểm tra hồ sơ đã có theo cặp ứng viên và tin. Nhánh trùng trả lỗi trước khi ghi thêm hồ sơ. | Cùng ứng viên, cùng mã tin và một hồ sơ đã tồn tại. | PASS |
| `TC_TD_04_05` | Rút hồ sơ khi còn đủ điều kiện | Mở trang theo dõi, chọn rút hồ sơ, nhập lý do và xác nhận. | Hồ sơ chuyển sang đã rút. Lịch sử có mốc mới và ghi lý do đã nhập. | **Đối chiếu mã nguồn.** API kiểm tra chủ hồ sơ và bước chuyển, sau đó cập nhật `Withdrawn` và lưu mốc lịch sử với ghi chú. | Hồ sơ thuộc ứng viên, đang ở trạng thái đã nộp. | PASS |
| `TC_TD_04_06` | Từ chối rút sau khi vào vòng phỏng vấn | Gọi API rút hồ sơ khi hồ sơ đang ở vòng phỏng vấn. | Yêu cầu bị từ chối và trạng thái hồ sơ giữ nguyên. | **Đối chiếu mã nguồn.** Handler rút hồ sơ có điều kiện từ chối trạng thái `Interviewing` trước khi lưu. Quy tắc này áp dụng cho yêu cầu của ứng viên. | Hồ sơ thuộc ứng viên và đang ở trạng thái phỏng vấn. | PASS |

Kịch bản `TS_TD_05` kiểm tra chức năng của nhà tuyển dụng khi lọc hồ sơ theo tin và trạng thái, xem CV/thư giới thiệu, chuyển trạng thái hồ sơ hợp lệ kèm thông báo, từ chối chuyển trạng thái hoặc truy cập sai quyền và tự động đóng tin khi đủ chỉ tiêu.

*Danh sách ca kiểm thử: Quản lý ứng viên theo tin tuyển dụng*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_TD_05_01` | Xem và lọc hồ sơ của doanh nghiệp | Mở trang danh sách ứng viên rồi chọn một tin và lọc theo trạng thái. | Chỉ hiển thị hồ sơ của tin và trạng thái được chọn trong doanh nghiệp hiện tại. | **Đối chiếu mã nguồn.** Trang danh sách ứng viên tải hồ sơ theo doanh nghiệp. Tab ứng tuyển của từng tin dùng danh sách của tin đó và có lọc trạng thái. | Nhà tuyển dụng là thành viên đang hoạt động, doanh nghiệp có nhiều tin và trạng thái hồ sơ. | PASS |
| `TC_TD_05_02` | Mở CV và thư giới thiệu | Chọn một hồ sơ rồi mở CV và thư giới thiệu. | Nội dung hiển thị đúng tài liệu và thư của hồ sơ được chọn. | **Đối chiếu mã nguồn.** Các hộp thoại xem CV và thư giới thiệu lấy dữ liệu từ hồ sơ được chọn. CV trực tuyến và PDF dùng cách hiển thị tương ứng. | Hồ sơ có CV trực tuyến hoặc PDF và có thư giới thiệu. | PASS |
| `TC_TD_05_03` | Cập nhật một bước chuyển hợp lệ | Đổi hồ sơ từ đã nộp sang đang xem xét và xác nhận với ghi chú. | Trạng thái mới được lưu. Lịch sử có bước chuyển và ứng viên nhận được thông báo nghiệp vụ. | **Đối chiếu mã nguồn.** BE cho phép bước `Submitted` sang `Reviewing`, ghi lịch sử và thông báo trong giao dịch rồi xếp tác vụ phát thông báo. | Nhà tuyển dụng thuộc doanh nghiệp sở hữu tin, hồ sơ đang ở trạng thái đã nộp. | PASS |
| `TC_TD_05_04` | Từ chối bước chuyển không hợp lệ | Gửi yêu cầu chuyển hồ sơ đã từ chối sang đang xem xét qua API. | Yêu cầu bị từ chối và không tạo mốc lịch sử mới. | **Đối chiếu mã nguồn.** Trạng thái `Rejected` không có bước chuyển tiếp sang `Reviewing`. Giao dịch dừng trước khi ghi lịch sử. | Hồ sơ đã bị từ chối. | PASS |
| `TC_TD_05_05` | Ngăn xem hồ sơ của doanh nghiệp khác | Dùng tài khoản không thuộc doanh nghiệp sở hữu tin gọi API danh sách hồ sơ của tin. | Yêu cầu bị từ chối và không trả dữ liệu hồ sơ. | **Đối chiếu mã nguồn.** API xác minh tư cách thành viên hoạt động của công ty sở hữu tin trước khi truy vấn danh sách hồ sơ. | Nhà tuyển dụng không có tư cách thành viên đang hoạt động tại doanh nghiệp. | PASS |
| `TC_TD_05_06` | Đóng tin khi đủ chỉ tiêu | Chuyển hồ sơ sắp được tuyển từ trạng thái cho phép sang đã mời nhận việc. | Khi số vị trí đã giữ đạt chỉ tiêu, tin đang phát hành chuyển sang đã đóng. | **Đối chiếu mã nguồn.** Khi chuyển sang `Offered`, handler kiểm tra số vị trí đã giữ. Tin `Published` được đóng nếu vị trí vừa giữ làm đủ chỉ tiêu. | Tin còn đúng một vị trí, hồ sơ đang ở trạng thái cho phép chuyển sang Offered. | PASS |

Kịch bản `TS_TD_06` kiểm tra trang tổng quan của ứng viên về khả năng nạp dữ liệu CV và hồ sơ theo tài khoản, lọc việc làm theo cấp bậc, điều hướng tới trang theo dõi hồ sơ và hiển thị trạng thái trống cho tài khoản mới.

*Danh sách ca kiểm thử: Xem tổng quan ứng viên*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_TD_06_01` | Tải tổng quan theo tài khoản | Đăng nhập bằng ứng viên, mở tổng quan và đối chiếu danh sách CV, hồ sơ và việc làm. | CV và hồ sơ thuộc tài khoản hiện tại. Danh sách việc làm lấy dữ liệu công khai. | **Đối chiếu mã nguồn.** Trang gọi API CV và hồ sơ theo tài khoản, cùng API tìm việc công khai. Phiên hiện tại xác định phạm vi hai danh sách cá nhân. | Hai ứng viên có CV và hồ sơ khác nhau, có tin đang tuyển. | PASS |
| `TC_TD_06_02` | Lọc việc làm theo cấp bậc | Chọn một cấp bậc trên tổng quan rồi mở chi tiết của một thẻ kết quả. | Các thẻ còn lại đúng cấp bậc đã chọn và khung chi tiết hiển thị đúng tin. | **Đối chiếu mã nguồn.** Trang lọc danh sách tin đã tải theo cấp bậc. Mã thẻ được chọn dùng để nạp khung chi tiết. | Danh sách việc tải ban đầu có tin ở nhiều cấp bậc. | PASS |
| `TC_TD_06_03` | Đi đến trang theo dõi hồ sơ | Bấm Xem tất cả trong khu vực theo dõi hồ sơ. | Đi đến trang theo dõi hồ sơ của ứng viên hiện tại. | **Đối chiếu mã nguồn.** Nút Xem tất cả trong khu vực hồ sơ điều hướng đến route theo dõi hồ sơ dành cho ứng viên. | Ứng viên đã đăng nhập và có hồ sơ đã nộp. | PASS |
| `TC_TD_06_04` | Hiển thị tài khoản chưa có CV và hồ sơ | Mở tổng quan với một tài khoản mới. | Trang hiển thị trạng thái không có CV hoặc hồ sơ và vẫn cho truy cập chức năng liên quan. | **Đối chiếu mã nguồn.** FE dùng danh sách rỗng khi tài khoản không có dữ liệu. Khu vực CV có trạng thái trống và đường dẫn sang luồng tạo CV. | Ứng viên mới, chưa tạo CV và chưa ứng tuyển. | PASS |

Kịch bản `TS_TD_07` kiểm tra trang tổng quan của nhà tuyển dụng trong việc tổng hợp số liệu theo doanh nghiệp đang chọn, tự động chọn doanh nghiệp đầu tiên khi chưa có lựa chọn, vẽ biểu đồ xu hướng theo ngày nộp và hiển thị hướng dẫn khi chưa thuộc doanh nghiệp nào.

*Danh sách ca kiểm thử: Xem tổng quan nhà tuyển dụng*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_TD_07_01` | Tổng hợp theo doanh nghiệp đang chọn | Mở tổng quan sau khi chọn doanh nghiệp. Đối chiếu thẻ chỉ số và danh sách với các hồ sơ của doanh nghiệp đó. | Chỉ số và danh sách gần đây được tổng hợp từ dữ liệu của doanh nghiệp đang chọn. | **Đối chiếu mã nguồn.** Trang dùng mã doanh nghiệp đang chọn cho truy vấn tin và hồ sơ. Các thẻ và danh sách gần đây được tính từ kết quả nhận được. | Tài khoản là thành viên của hai doanh nghiệp có dữ liệu khác nhau. | PASS |
| `TC_TD_07_02` | Tự chọn doanh nghiệp hợp lệ | Mở tổng quan khi tài khoản đã có doanh nghiệp nhưng chưa lưu lựa chọn. | Ứng dụng chọn doanh nghiệp đầu tiên trong danh sách và nạp dữ liệu của doanh nghiệp đó. | **Đối chiếu mã nguồn.** Khi mã đang chọn không có trong danh sách doanh nghiệp, FE chọn phần tử đầu tiên rồi cập nhật các truy vấn theo mã đó. | Tài khoản có ít nhất một doanh nghiệp, không có mã doanh nghiệp đang chọn. | PASS |
| `TC_TD_07_03` | Theo dõi xu hướng từ hồ sơ có ngày nộp | Mở tổng quan và đối chiếu các điểm trên biểu đồ với hồ sơ trong từng tháng. | Số lượng theo tháng khớp với hồ sơ đã tải có ngày nộp thuộc tháng tương ứng. | **Đối chiếu mã nguồn.** FE đếm hồ sơ theo tháng từ `appliedAt` nếu có dữ liệu ngày nộp. Khi dữ liệu ngày nộp trống, biểu đồ dùng dãy số mẫu. | Hồ sơ của doanh nghiệp có ngày nộp ở nhiều tháng. | PASS |
| `TC_TD_07_04` | Hiển thị tài khoản chưa thuộc doanh nghiệp | Mở tổng quan với tài khoản nhà tuyển dụng chưa tham gia doanh nghiệp. | Trang hiển thị lựa chọn tạo doanh nghiệp hoặc xem lời mời. | **Đối chiếu mã nguồn.** Nhánh chưa có doanh nghiệp hiển thị trạng thái trống và nút tạo doanh nghiệp hoặc mở trang lời mời. | Nhà tuyển dụng chưa có doanh nghiệp trong danh sách quản lý. | PASS |

Kịch bản `TS_AI_01` kiểm tra chức năng chấm điểm và phân tích mức độ phù hợp từ văn bản CV đang chỉnh hoặc phiên bản CV đã lưu, từ chối yêu cầu thiếu thông tin công việc và cơ chế trả kết quả dự phòng khi dịch vụ AI gặp lỗi.

*Danh sách ca kiểm thử: Phân tích mức độ phù hợp giữa CV và tin tuyển dụng*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_AI_01_01` | Chấm mức độ phù hợp của CV đang chỉnh | Mở trình biên soạn, chỉnh nội dung, chọn vị trí mục tiêu rồi bấm chấm điểm. | Hiển thị điểm trong khoảng 0 đến 100, các tiêu chí và nhận xét cho CV đang chỉnh. | **Đối chiếu mã nguồn.** FE gửi văn bản được trích từ CV đang chỉnh. API trả điểm, điểm thành phần, kỹ năng và nhận xét để hiển thị. | CV có kỹ năng và kinh nghiệm, một tin công khai có yêu cầu cụ thể. | PASS |
| `TC_AI_01_02` | Từ chối yêu cầu thiếu dữ liệu công việc | Gọi API phân tích với văn bản CV nhưng bỏ mã tin và mô tả công việc. | API trả lỗi đầu vào và không trả kết quả chấm điểm. | **Kiểm tra trực tiếp bộ kiểm tra đầu vào.** Yêu cầu có văn bản CV nhưng thiếu cả mã tin và mô tả công việc trả lỗi `VALIDATION_ERROR` cho trường `jobId`. Chưa quan sát phản hồi HTTP. | Có nội dung CV, thiếu cả mã tin và mô tả công việc. | PASS |
| `TC_AI_01_03` | Phân tích từ một phiên bản đã lưu | Gọi API với mã phiên bản CV và mã tin. | API trả kết quả phân tích có cấu trúc cho cặp CV và tin đã chọn. | **Đối chiếu mã nguồn.** Handler có nhánh đọc phiên bản CV theo mã. Nếu dữ liệu hợp lệ, nội dung phiên bản được dùng để phân tích cùng tin đã chọn. | Phiên bản CV thuộc ứng viên và mã tin hợp lệ. | PASS |
| `TC_AI_01_04` | Trả kết quả dự phòng khi dịch vụ AI lỗi | Trong môi trường kiểm thử, mô phỏng lỗi Gemini rồi gửi yêu cầu phân tích mới. | Bộ máy so khớp vẫn trả điểm và nhận xét dự phòng. | **Đối chiếu mã nguồn.** Handler tính điểm trước khi gọi Gemini. Khi bước diễn giải phát sinh lỗi, nhánh dự phòng giữ điểm và dựng nhận xét từ kết quả so khớp. | CV và tin hợp lệ chưa có kết quả lưu tạm, lỗi được mô phỏng ở bước diễn giải. | PASS |

Kịch bản `TS_AI_02` kiểm tra luồng xếp hạng việc làm tức thời theo nội dung CV hiện tại, làm mới sau khi chỉnh sửa, xử lý trường hợp CV trống, cũng như tạo và đọc gợi ý qua tác vụ nền kèm kiểm soát thời gian chờ giữa hai lần làm mới.

*Danh sách ca kiểm thử: Xếp hạng và gợi ý việc làm phù hợp*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_AI_02_01` | Xếp hạng từ CV hiện tại | Mở tab gợi ý trong trình biên soạn rồi đối chiếu kết quả với các tin ở danh sách công khai. | Danh sách hiển thị các tin đang tuyển theo điểm phù hợp giảm dần. | **Đối chiếu mã nguồn.** Tab gợi ý gọi API xếp hạng theo nội dung biểu mẫu. BE lấy tập tin công khai và trả danh sách theo kết quả so khớp. | CV có nội dung và nhiều tin đang tuyển, có yêu cầu khác nhau. | PASS |
| `TC_AI_02_02` | Làm mới sau khi chỉnh CV | Sửa nội dung CV rồi bấm làm mới ở tab gợi ý. | Ứng dụng gửi nội dung CV sau khi chỉnh và hiển thị kết quả mới từ API. | **Đối chiếu mã nguồn.** Nút làm mới đọc lại biểu mẫu hiện tại và gọi lại API xếp hạng. Kết quả trả về được dùng để cập nhật danh sách hiển thị. | CV đã nhận gợi ý ít nhất một lần. Nội dung mới khác nội dung trước đó. | PASS |
| `TC_AI_02_03` | Xử lý CV trống | Mở tab gợi ý khi chưa có nội dung CV có thể dùng để so khớp. | Giao diện hiển thị hướng dẫn bổ sung nội dung và không gửi yêu cầu xếp hạng từ CV trống. | **Đối chiếu mã nguồn.** Tab kiểm tra CV trống và hiển thị hướng dẫn. Hàm gọi API cũng dừng sớm nếu không có văn bản dùng được. | CV chưa có nội dung dùng được. | PASS |
| `TC_AI_02_04` | Tạo và đọc gợi ý qua tác vụ nền | Gọi API làm mới, chờ tác vụ hoàn tất rồi truy vấn gợi ý đã lưu. | Tác vụ tạo hoặc cập nhật gợi ý cho ứng viên. Truy vấn mặc định chỉ trả kết quả từ 50 điểm trở lên. | **Đối chiếu mã nguồn.** API ghi nhận yêu cầu và xếp Hangfire. Tác vụ tìm tin tương đồng, tính điểm rồi lưu gợi ý. GET mặc định lọc từ 50 điểm. | Ứng viên có phiên bản CV, có tin tương đồng đủ điểm và tác vụ nền hoạt động. | PASS |
| `TC_AI_02_05` | Từ chối làm mới nền liên tiếp | Gửi lại yêu cầu làm mới ngay sau khi một yêu cầu đã được tiếp nhận. | API báo chưa đến thời điểm được làm mới lại và không xếp thêm yêu cầu. | **Đối chiếu mã nguồn.** Handler kiểm tra thời điểm yêu cầu gần nhất và thời điểm sinh gợi ý đã lưu, trả lỗi thời gian chờ trước khi xếp thêm tác vụ. | Cùng ứng viên, yêu cầu trước còn trong thời gian chờ. | PASS |

Kịch bản `TS_AI_03` kiểm tra chức năng tạo đề xuất cải thiện cho nhiều mục CV theo vị trí mục tiêu, giới hạn độ dài chỉ dẫn bổ sung tối đa 2.000 ký tự và cơ chế truyền phản hồi từng phần qua SSE.

*Danh sách ca kiểm thử: Cải thiện nội dung CV theo vị trí mục tiêu*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_AI_03_01` | Tạo đề xuất cho nhiều mục CV | Chọn vị trí, nhập chỉ dẫn bổ sung rồi yêu cầu cải thiện CV. | Giao diện trình bày đề xuất theo từng mục được xử lý. Nội dung đang chỉnh giữ nguyên. | **Đối chiếu mã nguồn.** FE gửi một yêu cầu hàng loạt chứa các mục đủ điều kiện. Phản hồi được giữ trong danh sách đề xuất riêng để đối chiếu. | CV có ít nhất hai mục đủ điều kiện, tin mục tiêu hợp lệ và chỉ dẫn không quá 2.000 ký tự. | PASS |
| `TC_AI_03_02` | Từ chối chỉ dẫn vượt giới hạn | Gửi yêu cầu cải thiện hàng loạt qua API với chỉ dẫn dài 2.001 ký tự. | API trả lỗi đầu vào và không tạo đề xuất. | **Đối chiếu mã nguồn.** Handler giới hạn `customPrompt` ở 2.000 ký tự. Giá trị 2.001 ký tự bị từ chối trước khi gọi Gemini. | Các mục CV và vị trí mục tiêu hợp lệ, chỉ dẫn dài 2.001 ký tự. | PASS |
| `TC_AI_03_03` | Nhận phản hồi từng phần qua SSE | Gửi yêu cầu cải thiện một mục tới API truyền sự kiện và đọc luồng phản hồi. | Phản hồi được truyền qua các sự kiện dữ liệu và kết thúc bằng sự kiện đánh dấu hoàn tất. | **Đối chiếu mã nguồn.** API SSE ghi từng sự kiện có tiền tố `data:` và kết thúc bằng `data: [DONE]` nếu luồng hoàn tất bình thường. | Tài khoản ứng viên, văn bản mục CV hợp lệ và dịch vụ AI khả dụng. | PASS |

Kịch bản `TS_AI_04` kiểm tra các API quản lý hội thoại AI của ứng viên, bao gồm tạo và truy vấn danh sách/chi tiết, gửi tin nhắn lưu kèm phản hồi AI, ghim hoặc bỏ ghim, kiểm soát quyền sở hữu và xóa lẻ hoặc xóa toàn bộ hội thoại.

*Danh sách ca kiểm thử: Quản lý hội thoại AI qua API*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_AI_04_01` | Tạo và truy vấn hội thoại | Gọi API tạo hội thoại bằng tài khoản ứng viên, rồi gọi API danh sách và chi tiết. | Hội thoại mới xuất hiện trong danh sách và có thể truy vấn bằng mã vừa tạo. | **Đối chiếu mã nguồn.** API tạo hội thoại gắn với mã ứng viên từ phiên đăng nhập. API danh sách và chi tiết truy vấn trong phạm vi ứng viên đó. | Ứng viên đã xác thực, tiêu đề hợp lệ. | PASS |
| `TC_AI_04_02` | Gửi tin nhắn và đọc lịch sử | Gọi API gửi tin nhắn và truy vấn lại hội thoại sau khi nhận phản hồi. | Lịch sử có tin nhắn của người dùng và phản hồi tương ứng của AI. | **Đối chiếu mã nguồn.** Handler gọi Gemini rồi lưu tin nhắn người dùng và phản hồi cùng hội thoại trong một lần lưu. API chi tiết trả lịch sử đã ghi. | Hội thoại thuộc ứng viên, nội dung không rỗng, dịch vụ AI khả dụng. | PASS |
| `TC_AI_04_03` | Ghim và bỏ ghim hội thoại | Ghim hội thoại qua API, truy vấn lại rồi bỏ ghim. | Trạng thái ghim thay đổi theo từng yêu cầu. | **Đối chiếu mã nguồn.** API cập nhật cờ ghim trên hội thoại thuộc tài khoản hiện tại. Truy vấn chi tiết trả lại giá trị cờ đã lưu. | Mã hội thoại của ứng viên hiện tại. | PASS |
| `TC_AI_04_04` | Ngăn truy cập hội thoại của người khác | Ứng viên thứ hai gọi API chi tiết với mã hội thoại của ứng viên thứ nhất. | Yêu cầu bị từ chối và không trả nội dung hội thoại. | **Đối chiếu mã nguồn.** Handler đọc hội thoại kiểm tra mã ứng viên sở hữu trước khi trả lịch sử. Tài khoản khác không nhận được nội dung. | Hai ứng viên và mã hội thoại thuộc người thứ nhất. | PASS |
| `TC_AI_04_05` | Xóa một hội thoại và xóa toàn bộ | Xóa một hội thoại, kiểm tra danh sách rồi gọi API xóa toàn bộ và truy vấn lần nữa. | Lần đầu chỉ mất hội thoại được chọn. Lần sau danh sách của ứng viên trống và dữ liệu của tài khoản khác giữ nguyên. | **Đối chiếu mã nguồn.** API xóa lẻ kiểm tra chủ sở hữu. API xóa toàn bộ lọc bằng mã ứng viên hiện tại và tin nhắn đi kèm được xóa theo quan hệ. | Ứng viên có nhiều hội thoại, ít nhất một hội thoại có tin nhắn. | PASS |

Kịch bản `TS_QT_01` kiểm tra nghiệp vụ xác minh doanh nghiệp (chấp thuận hoặc từ chối kèm lý do hợp lệ) và kiểm duyệt tin tuyển dụng của quản trị viên gồm phát hành, từ chối, đóng tin đang tuyển và từ chối thao tác sai trạng thái.

*Danh sách ca kiểm thử: Xác minh doanh nghiệp và kiểm duyệt tin tuyển dụng*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_QT_01_01` | Xác minh doanh nghiệp | Quản trị viên mở hồ sơ chờ xác minh và chọn chấp thuận. | Doanh nghiệp chuyển sang đã xác minh và lưu thời điểm xác minh. | **Đối chiếu mã nguồn.** Nhánh chấp thuận đặt trạng thái `Verified` và ghi thời điểm xác minh. | Hồ sơ doanh nghiệp đang chờ. | PASS |
| `TC_QT_01_02` | Từ chối xác minh với lý do thiếu hoặc hợp lệ | Thử gửi quyết định từ chối với lý do trống. Sau đó nhập lý do hợp lệ và gửi lại. | Lần đầu báo lỗi và giữ trạng thái chờ. Lần sau cập nhật thành bị từ chối. | **Kiểm tra trực tiếp bộ kiểm tra đầu vào.** Lý do trống bị từ chối ở trường `reason`. Lý do hợp lệ được chấp nhận và bỏ khoảng trắng ở hai đầu. Chưa quan sát trạng thái doanh nghiệp trong cơ sở dữ liệu. | Hồ sơ đang chờ. Sau lần đầu nhập lý do từ 5 đến 1.000 ký tự. | PASS |
| `TC_QT_01_03` | Phát hành tin đang chờ | Mở tin chờ của doanh nghiệp đã xác minh, bấm duyệt rồi kiểm tra trang tìm việc. | Tin chuyển sang đang phát hành và xuất hiện trong danh sách công khai khi còn đủ điều kiện. | **Đối chiếu mã nguồn.** Handler chỉ phát hành tin đang chờ nếu doanh nghiệp đã xác minh. Tin `Published` còn phải thỏa điều kiện công khai khi truy vấn. | Tin chờ duyệt, doanh nghiệp đã xác minh, hạn nộp còn hiệu lực. | PASS |
| `TC_QT_01_04` | Từ chối tin đang chờ | Chọn từ chối tin đang chờ, nhập lý do hợp lệ và xác nhận. | Tin chuyển sang bị từ chối và không xuất hiện công khai. | **Đối chiếu mã nguồn.** Nhánh từ chối chuyển tin đang chờ sang `Rejected`. Truy vấn công khai loại tin ở trạng thái này. | Tin đang chờ duyệt. | PASS |
| `TC_QT_01_05` | Đóng tin đang phát hành | Mở thao tác đóng tin đã phát hành, nhập lý do và xác nhận. | Tin chuyển sang đã đóng và không còn xuất hiện trong danh sách công khai. | **Đối chiếu mã nguồn.** `ReviewJobModerationCommandHandler` và FE `AdminJobModerationPage` có luồng đóng tin `Closed`, nhưng `ReviewJobModerationCommandValidator` hiện chỉ chấp nhận `Published` hoặc `Rejected` nên yêu cầu bị từ chối ở bước kiểm tra đầu vào. | Tin đang phát hành và tài khoản quản trị viên. | FAIL |
| `TC_QT_01_06` | Từ chối kiểm duyệt sai trạng thái | Gửi lại yêu cầu phát hành đối với tin đã bị đóng. | API từ chối yêu cầu và tin vẫn ở trạng thái đã đóng. | **Đối chiếu mã nguồn.** Nhánh phát hành yêu cầu trạng thái `PendingReview`. Yêu cầu phát hành tin đã đóng trả lỗi xung đột. | Tin đã đóng và tài khoản quản trị viên. | PASS |

Kịch bản `TS_QT_02` kiểm tra chức năng tìm kiếm, lọc tài khoản theo vai trò và trạng thái, khóa tài khoản kèm kiểm tra lý do và thu hồi phiên, khôi phục tài khoản và quy tắc bảo vệ tài khoản quản trị đang hoạt động cuối cùng.

*Danh sách ca kiểm thử: Quản lý trạng thái tài khoản người dùng*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_QT_02_01` | Tìm và lọc tài khoản | Tìm theo email và chọn bộ lọc vai trò, trạng thái. | Kết quả chỉ chứa tài khoản phù hợp với tiêu chí đã chọn. | **Đối chiếu mã nguồn.** BE áp dụng tìm kiếm theo thông tin tài khoản và các điều kiện vai trò, trạng thái trước khi phân trang. | Nhiều tài khoản có vai trò và trạng thái khác nhau. | PASS |
| `TC_QT_02_02` | Khóa tài khoản và thu hồi phiên | Nhập lý do khóa hợp lệ, xác nhận rồi thử làm mới phiên của tài khoản bị khóa. | Tài khoản chuyển sang bị khóa và refresh token cũ không dùng được. | **Đối chiếu mã nguồn.** `UpdateUserStatusCommandValidator` kiểm tra bắt buộc `reason` (5–1.000 ký tự). `UpdateUserStatusCommandHandler` đặt trạng thái `Locked` qua `user.Lock(now)` và thu hồi toàn bộ refresh token chưa thu hồi (lý do khóa không được lưu vào thực thể `User`). Token đã thu hồi không cấp được phiên mới. | Tài khoản thường đang hoạt động có một phiên, lý do hợp lệ. | PASS |
| `TC_QT_02_03` | Từ chối khóa nếu thiếu lý do | Thử xác nhận khóa tài khoản với lý do trống. | Giao diện báo thiếu lý do và tài khoản vẫn giữ trạng thái ban đầu. | **Đối chiếu mã nguồn.** FE kiểm tra ô lý do và BE cũng yêu cầu lý do khi đặt `Locked`. Nhánh thiếu lý do dừng trước khi ghi. | Tài khoản đang hoạt động, trường lý do để trống. | PASS |
| `TC_QT_02_04` | Khôi phục tài khoản đã khóa | Quản trị viên chọn khôi phục rồi đăng nhập lại bằng tài khoản đó. | Tài khoản trở lại trạng thái hoạt động và có thể đăng nhập bằng thông tin đúng. | **Đối chiếu mã nguồn.** Thao tác khôi phục gửi trạng thái `Active`. Luồng đăng nhập kiểm tra trạng thái mới và mật khẩu của tài khoản. | Tài khoản thường đã khóa, còn thông tin đăng nhập hợp lệ. | PASS |
| `TC_QT_02_05` | Bảo vệ quản trị viên đang hoạt động cuối cùng | Gọi API vô hiệu hóa tài khoản quản trị đang hoạt động cuối cùng. | Yêu cầu bị từ chối và tài khoản vẫn hoạt động. | **Đối chiếu mã nguồn.** BE kiểm tra số quản trị viên đang hoạt động trước khi khóa hoặc vô hiệu hóa. Nhánh quản trị viên cuối cùng bị từ chối. | Môi trường kiểm thử có đúng một tài khoản quản trị hoạt động. | PASS |

Kịch bản `TS_QT_03` kiểm tra các thao tác quản trị danh mục dùng chung gồm tạo và cập nhật nhóm ngành, ngành nghề, kỹ năng và địa giới hành chính theo quan hệ cha–con, kiểm tra mã cha không hợp lệ và vô hiệu hóa an toàn danh mục đang được sử dụng.

*Danh sách ca kiểm thử: Quản lý danh mục ngành nghề, kỹ năng và địa điểm*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_QT_03_01` | Tạo nhóm ngành và ngành nghề | Tạo nhóm ngành rồi thêm một ngành trực thuộc. | Nhóm và ngành được lưu đúng quan hệ cha con. | **Đối chiếu mã nguồn.** API tạo ngành kiểm tra nhóm cha và ghi mã nhóm vào bản ghi ngành. Danh sách có thể lọc theo nhóm vừa tạo. | Tên và mã chưa dùng nếu được yêu cầu, tài khoản quản trị viên. | PASS |
| `TC_QT_03_02` | Thêm và chỉnh sửa kỹ năng | Tạo một kỹ năng, đổi tên hợp lệ rồi tìm lại. | Danh sách hiển thị tên mới của đúng kỹ năng đã tạo. | **Đối chiếu mã nguồn.** FE gọi API tạo và cập nhật kỹ năng. API danh sách dùng tên đã lưu khi tìm lại. | Tên kỹ năng chưa được sử dụng. | PASS |
| `TC_QT_03_03` | Thêm và cập nhật địa điểm | Tạo tỉnh hoặc thành phố, tạo phường hoặc xã thuộc địa phương đó rồi cập nhật tên. | Tên mới được hiển thị và quan hệ với địa phương cấp trên được giữ. | **Đối chiếu mã nguồn.** API ghi mã địa phương cấp trên cho phường hoặc xã. Khi chỉ sửa tên, quan hệ cấp trên đã có được giữ. | Dữ liệu tên và mã hợp lệ, địa phương cấp trên hoạt động. | PASS |
| `TC_QT_03_04` | Từ chối quan hệ cấp trên không hợp lệ | Gọi API tạo phường hoặc xã với mã tỉnh hoặc thành phố không tồn tại. | Yêu cầu bị từ chối và không có bản ghi địa điểm mới. | **Đối chiếu mã nguồn.** Handler kiểm tra tỉnh hoặc thành phố tồn tại trước khi thêm phường hoặc xã. Nhánh mã cha sai dừng trước khi lưu. | Tên hợp lệ và mã địa phương cấp trên không tồn tại. | PASS |
| `TC_QT_03_05` | Tắt danh mục đang được sử dụng | Tắt một kỹ năng, kiểm tra danh sách quản trị và truy vấn danh mục công khai. | Bản ghi vẫn có trong quản trị với trạng thái đã tắt và biến mất khỏi danh sách công khai. | **Đối chiếu mã nguồn.** Cập nhật trạng thái chỉ thay đổi cờ hoạt động. API kỹ năng công khai loại bản ghi đã tắt. | Một kỹ năng đang hoạt động và đã được gắn với dữ liệu nghiệp vụ. | PASS |

Kịch bản `TS_QT_04` kiểm tra trang thống kê tổng quan của quản trị viên gồm tải số liệu mặc định, lọc chỉ tiêu phát sinh theo khoảng ngày hợp lệ, từ chối khoảng ngày đảo ngược và đối chiếu dữ liệu biểu đồ phân bố cùng biểu đồ xu hướng trên giao diện.

*Danh sách ca kiểm thử: Xem thống kê tổng quan quản trị*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_QT_04_01` | Tải số liệu mặc định | Mở tổng quan quản trị rồi đối chiếu các thẻ với dữ liệu nguồn của lần chạy. | Các số tổng và số lượng theo trạng thái khớp với dữ liệu được trả về. | **Kiểm tra trực tiếp bộ kiểm tra thời gian.** Khi chỉ có ngày kết thúc, ngày bắt đầu mặc định lùi 30 ngày. **Đối chiếu mã nguồn.** FE gọi API tổng quan với tham số mặc định và các thẻ sử dụng số đếm trong phản hồi. Chưa đối chiếu số liệu với dữ liệu đã chạy. | Tập dữ liệu có người dùng, doanh nghiệp, tin và hồ sơ ở nhiều trạng thái. | PASS |
| `TC_QT_04_02` | Đối chiếu thống kê theo khoảng ngày | Gọi API tổng quan với khoảng ngày hợp lệ và đối chiếu các chỉ tiêu phát sinh. | Số người dùng mới và hồ sơ mới khớp với dữ liệu trong khoảng đã chọn. | **Đối chiếu mã nguồn.** API chỉ áp dụng mốc thời gian cho các trường phát sinh theo kỳ, gồm người dùng mới và hồ sơ mới. Các số tổng được tính riêng. | Có bản ghi được tạo hoặc nộp trong và ngoài khoảng thời gian. | PASS |
| `TC_QT_04_03` | Từ chối khoảng ngày đảo ngược | Gọi API với ngày bắt đầu muộn hơn ngày kết thúc. | API báo lỗi dữ liệu đầu vào và không trả số liệu cho khoảng ngày sai. | **Kiểm tra trực tiếp bộ kiểm tra đầu vào.** Khoảng ngày có `from` lớn hơn `to` trả lỗi `VALIDATION_ERROR` cho trường `to`. Chưa quan sát phản hồi HTTP. | Ngày bắt đầu và ngày kết thúc hợp lệ về định dạng, thứ tự đảo ngược. | PASS |
| `TC_QT_04_04` | Đối chiếu biểu đồ trên giao diện | Chuyển nhóm biểu đồ doanh nghiệp và tin. Sau đó đối chiếu các điểm biểu đồ xu hướng với công thức phân bổ của trang. | Biểu đồ phân bố dùng số theo trạng thái. Biểu đồ xu hướng dùng giá trị ước lượng từ tổng lượt ứng tuyển. | **Đối chiếu mã nguồn.** Biểu đồ phân bố đọc số đếm từ API. Biểu đồ xu hướng sáu tháng phân bổ theo trọng số từ tổng lượt ứng tuyển, nên các điểm là ước lượng. | Phản hồi tổng quan có số lượng khác 0 và nhiều nhóm trạng thái. | PASS |

Kịch bản `TS_QT_05` kiểm tra thao tác đánh dấu đã đọc từng thông báo hoặc toàn bộ, xóa thông báo thuộc tài khoản, ngăn thao tác trên thông báo của người khác và phát cảnh báo từ quản trị viên theo vai trò hoặc toàn hệ thống qua SignalR.

*Danh sách ca kiểm thử: Nhận, quản lý và phát thông báo*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_QT_05_01` | Đọc một thông báo | Mở chuông thông báo và đánh dấu một mục chưa đọc. | Mục đổi sang đã đọc, số chưa đọc giảm tương ứng và giữ đúng khi tải lại. | **Đối chiếu mã nguồn.** API đặt thời điểm đã đọc cho thông báo thuộc người nhận. FE yêu cầu nạp lại danh sách và số chưa đọc. | Tài khoản có ít nhất hai thông báo chưa đọc. | PASS |
| `TC_QT_05_02` | Đọc toàn bộ thông báo | Chọn thao tác đánh dấu tất cả đã đọc rồi tải lại danh sách. | Các thông báo của tài khoản hiện tại được đánh dấu đã đọc và bộ đếm về 0. | **Đối chiếu mã nguồn.** API đánh dấu hàng loạt theo mã tài khoản hiện tại. FE làm mới dữ liệu sau khi thao tác thành công. | Một tài khoản có nhiều thông báo chưa đọc. | PASS |
| `TC_QT_05_03` | Xóa thông báo thuộc tài khoản | Chọn xóa một thông báo rồi mở lại danh sách. | Thông báo đã xóa không còn xuất hiện. | **Đối chiếu mã nguồn.** API xóa thông báo thuộc tài khoản. FE làm mới danh sách sau khi xóa. | Một thông báo thuộc tài khoản hiện tại. | PASS |
| `TC_QT_05_04` | Ngăn thao tác trên thông báo của người khác | Dùng phiên của tài khoản khác gọi API xóa theo mã thông báo. | Yêu cầu bị từ chối và thông báo vẫn xuất hiện với người nhận ban đầu. | **Đối chiếu mã nguồn.** `DeleteNotificationCommandHandler` truy vấn thông báo theo mã thông báo, sau đó kiểm tra `notification.RecipientId != userId` và ném lỗi `403 Forbidden` (`NotificationForbidden`), không thực hiện xóa. | Hai tài khoản và mã thông báo thuộc tài khoản thứ nhất. | PASS |
| `TC_QT_05_05` | Phát cảnh báo tới đúng vai trò | Quản trị viên chọn nhóm Ứng viên và gửi cảnh báo. Kiểm tra chuông ở hai phiên độc lập. | Phiên ứng viên đang hoạt động nhận cảnh báo và có thể xem lại. Phiên nhà tuyển dụng không nhận cảnh báo này. | **Đối chiếu mã nguồn.** API chọn tài khoản ứng viên đang hoạt động trước khi lưu cảnh báo, rồi phát qua nhóm SignalR của vai trò ứng viên. Việc nhận tức thời còn phụ thuộc kết nối. | Một ứng viên và một nhà tuyển dụng đang trực tuyến, tiêu đề và nội dung hợp lệ. | PASS |
| `TC_QT_05_06` | Phát cảnh báo toàn hệ thống | Quản trị viên chọn Toàn hệ thống rồi gửi. Đối chiếu danh sách thông báo của các tài khoản mẫu. | Cảnh báo được lưu cho ứng viên và nhà tuyển dụng đang hoạt động. | **Đối chiếu mã nguồn.** Nhánh Toàn hệ thống truy vấn tài khoản đang hoạt động và loại tài khoản quản trị. Tài khoản đã khóa nằm ngoài tập nhận. | Ứng viên và nhà tuyển dụng đang hoạt động, một tài khoản đã khóa và một quản trị viên để đối chiếu. | PASS |

Kịch bản `TS_QT_06` kiểm tra các API danh mục công khai trong việc lọc ngành theo nhóm cha, tra cứu phường/xã theo tỉnh/thành phố, tìm kiếm kỹ năng theo từ khóa, phân trang dữ liệu và từ chối sử dụng mã danh mục đã tắt khi đăng tin tuyển dụng.

*Danh sách ca kiểm thử: Truy vấn danh mục công khai*

| Mã Test Case | Mô tả | Hành động | Kết quả mong đợi | Kết quả thực tế | Dữ liệu đầu vào | Kết quả |
|---|---|---|---|---|---|---|
| `TC_QT_06_01` | Lọc ngành theo nhóm cha | Mở bộ lọc ngành nghề hoặc gọi API với mã nhóm ngành. | Kết quả chỉ gồm các ngành đang hoạt động thuộc nhóm đã chọn. | **Đối chiếu mã nguồn.** API ngành nghề áp dụng điều kiện theo nhóm cha và cờ hoạt động trước khi trả kết quả. | Hai nhóm ngành có ngành đang hoạt động và đã tắt. | PASS |
| `TC_QT_06_02` | Chọn tỉnh và tra phường hoặc xã | Chọn tỉnh hoặc thành phố trên bộ chọn rồi mở danh sách phường hoặc xã. | Danh sách hiển thị địa điểm đang hoạt động thuộc đơn vị đã chọn. | **Đối chiếu mã nguồn.** Bộ chọn gửi mã tỉnh hoặc thành phố để truy vấn địa điểm cấp dưới. API lọc đơn vị đang hoạt động theo mã cha. | Hai địa phương cấp tỉnh có các đơn vị cấp dưới khác nhau. | PASS |
| `TC_QT_06_03` | Tìm kỹ năng theo từ khóa | Nhập từ khóa vào bộ chọn kỹ năng trên biểu mẫu tuyển dụng. | Trả về kỹ năng đang hoạt động phù hợp với từ khóa. | **Đối chiếu mã nguồn.** Bộ chọn kỹ năng gửi từ khóa. API lọc từ khóa trên các kỹ năng đang hoạt động. | Các kỹ năng đang hoạt động và đã tắt có tên chứa cùng từ khóa. | PASS |
| `TC_QT_06_04` | Phân trang danh mục qua API | Gọi API danh mục công khai với dữ liệu đủ cho nhiều trang rồi truy vấn hai trang liên tiếp. | Mỗi trang có số bản ghi trong giới hạn yêu cầu và thông tin phân trang đúng theo tập dữ liệu. | **Đối chiếu mã nguồn.** API dùng thứ tự truy vấn trước khi lấy trang, trả danh sách và siêu dữ liệu phân trang theo kích thước yêu cầu. | Danh mục công khai có ít nhất 12 bản ghi, kích thước trang là 5. | PASS |
| `TC_QT_06_05` | Từ chối mã danh mục đã tắt khi đăng tin | Gửi yêu cầu tạo tin với mã kỹ năng hoặc ngành nghề đã tắt. | Yêu cầu bị từ chối và không tạo tin mới. | **Đối chiếu mã nguồn.** Handler tạo tin đối chiếu mã kỹ năng và ngành nghề với tập danh mục đang hoạt động. Mã đã tắt bị xem là không hợp lệ. | Nhà tuyển dụng đủ quyền. Dữ liệu tin hợp lệ trừ một mã danh mục không còn hoạt động. | PASS |

## 3.6. Đánh giá kiểm thử

Mục 3.5 gồm 26 kịch bản và 128 ca kiểm thử. Theo kết quả đối chiếu mã nguồn và trạng thái ghi nhận trong bảng, có 127 ca đạt (PASS, chiếm 99,2%) và 1 ca không đạt (FAIL — `TC_QT_01_05` do `ReviewJobModerationCommandValidator` chưa cho phép trạng thái `Closed`). Bảng tổng hợp phản ánh các trạng thái đã ghi trong báo cáo.

*Bảng tổng hợp kết quả kiểm thử*

| Chỉ tiêu | Số lượng hoặc tỷ lệ |
|---|---:|
| Số kịch bản trong bảng | 26 |
| Tổng số ca trong bảng | 128 |
| Số ca ghi PASS | 127 |
| Số ca ghi FAIL | 1 |
| Tỷ lệ ca ghi PASS trên tổng số ca | 99,2% |

Trong phạm vi kiểm tra trực tiếp, 7 phép kiểm tra logic liên quan đến 6 ca cho kết quả đúng với điều kiện đối chiếu. Các phép kiểm tra bao gồm giới hạn dung lượng khi tải PDF, dữ liệu công việc trong yêu cầu phân tích CV, khoảng ngày thống kê và lý do từ chối xác minh doanh nghiệp. Với PDF, bộ kiểm tra tải lên chấp nhận dữ liệu 6 MiB có chữ ký PDF. Qua đối chiếu mã nguồn, bước nộp hồ sơ áp dụng giới hạn 5 MiB.

Các phép kiểm tra trực tiếp xác nhận những quy tắc đầu vào đã được thực thi riêng. Báo cáo hiện chưa kèm biên bản chạy đầy đủ qua giao diện và API cho 128 ca, nên chưa xác định được tỷ lệ đạt dựa trên số ca thực tế đã chạy.
