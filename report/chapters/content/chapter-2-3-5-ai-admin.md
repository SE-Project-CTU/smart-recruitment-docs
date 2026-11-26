**Chức năng dành cho ứng viên có hỗ trợ trí tuệ nhân tạo**

### Chức năng phân tích mức độ phù hợp giữa CV và tin tuyển dụng

**Mục đích**

Cung cấp thông tin hỗ trợ ứng viên đánh giá mức độ đáp ứng của CV so với yêu cầu vị trí.

**Giao diện**

> **Hình. Phân tích mức độ phù hợp CV--việc làm** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Phân tích mức độ phù hợp*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Bộ chọn vị trí mục tiêu | Chưa chọn | Chọn tin tuyển dụng dùng để đối chiếu. |
| 2 | Nút chấm điểm |   | Phân tích từ nội dung CV đang biên soạn. |
| 3 | Vùng điểm và phân rã tiêu chí |   | Hiển thị điểm tổng hợp cùng các nhóm tiêu chí. |
| 4 | Danh sách nhận xét |   | Hiển thị kỹ năng phù hợp, kỹ năng còn thiếu và gợi ý cải thiện. |

**Dữ liệu được dùng**

`cv_versions` và các embedding đã lưu được truy vấn theo nguồn dữ liệu và tham số của API. Với luồng trên giao diện, văn bản CV được lấy từ trình biên soạn.

*Từ điển dữ liệu chức năng Phân tích mức độ phù hợp*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `job_postings` |   |   |   | X |
| 2 | `job_skills` / `skills` |   |   |   | X |
| 3 | `cv_versions` |   |   |   | X |
| 4 | `cv_embeddings` / `job_embeddings` |   |   |   | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Phân tích mức độ phù hợp** [Vị trí chèn sơ đồ hoạt động].

Ứng viên chọn vị trí mục tiêu và yêu cầu chấm điểm. Ứng dụng gửi văn bản từ CV đang chỉnh sửa, kể cả phần chưa lưu. Máy chủ đối chiếu nội dung với tin đã chọn hoặc văn bản mô tả công việc. API cũng hỗ trợ nhận định danh phiên bản CV. Hệ thống dùng lại kết quả đã lưu tạm khi dữ liệu đầu vào trùng khớp.

Bộ máy so khớp tính điểm theo dữ liệu CV và yêu cầu công việc. Khi có đủ embedding tương ứng, hệ thống dùng thêm độ tương đồng ngữ nghĩa. Gemini hỗ trợ diễn giải kết quả. Nếu dịch vụ gặp lỗi, hệ thống vẫn có thể trả điểm và nhận xét dự phòng. Việc ghi `ai_match_results` thuộc luồng nộp hồ sơ bằng CV trực tuyến tại mục 2.3.11.

### Chức năng gợi ý việc làm phù hợp

**Mục đích**

Đề xuất các tin đang tuyển có nội dung gần với năng lực thể hiện trong CV ứng viên.

**Giao diện**

Tab gợi ý trong trình biên soạn CV hiển thị kết quả từ API xếp hạng tức thời. Trang Việc làm phù hợp độc lập hiện dùng dữ liệu mẫu.

> **Hình. Tab gợi ý việc làm trong trình biên soạn CV** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Gợi ý việc làm*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Danh sách thẻ |   | Hiển thị tin và điểm phù hợp theo thứ tự kết quả. |
| 2 | Nút làm mới |   | Tính lại gợi ý theo nội dung CV hiện tại. |
| 3 | Nút và khung xem chi tiết |   | Xem thông tin việc làm từ thẻ gợi ý. |

**Dữ liệu được dùng**

Luồng xếp hạng nhận văn bản từ giao diện và có thể nhận định danh phiên bản CV khi gọi API. Luồng nền lưu kết quả để truy vấn lại.

*Dữ liệu dùng để xếp hạng tức thời*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `job_postings` |   |   |   | X |
| 2 | `companies` |   |   |   | X |
| 3 | `job_skills` / `skills` |   |   |   | X |
| 4 | `cv_versions` |   |   |   | X |

*Dữ liệu dùng để tạo và truy vấn gợi ý nền*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `cvs` / `cv_versions` |   |   |   | X |
| 2 | `cv_embeddings` | X | X |   | X |
| 3 | `job_embeddings` |   |   |   | X |
| 4 | `job_postings` / `companies` |   |   |   | X |
| 5 | `job_skills` / `skills` |   |   |   | X |
| 6 | `job_recommendations` | X | X |   | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Gợi ý việc làm** [Vị trí chèn sơ đồ hoạt động].

Khi mở tab hoặc bấm làm mới, ứng dụng gửi văn bản của CV hiện tại đến API xếp hạng. Máy chủ lấy các tin đang tuyển, chấm điểm và trả danh sách theo mức độ phù hợp. Ứng viên có thể chọn từng kết quả để xem chi tiết.

API làm mới gợi ý nền xử lý riêng. Máy chủ kiểm tra thời gian chờ giữa các lần làm mới và tạo embedding từ phiên bản CV nếu cần. Sau đó, tác vụ Hangfire tìm tin tương tự, chấm lại và thêm hoặc cập nhật gợi ý. API truy vấn các gợi ý đã lưu của ứng viên hỗ trợ phân trang và mặc định lấy kết quả từ 50 điểm trở lên.

### Chức năng AI hỗ trợ cải thiện nội dung CV

**Mục đích**

Đưa ra đề xuất về cách diễn đạt, từ khóa hoặc nội dung của từng phần CV theo vị trí mục tiêu.

**Giao diện**

> **Hình. AI hỗ trợ cải thiện nội dung CV** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện AI hỗ trợ CV*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Bộ chọn vị trí mục tiêu | Chưa chọn | Chọn vị trí để cung cấp ngữ cảnh cho đề xuất. |
| 2 | Ô nhập chỉ dẫn bổ sung | Rỗng | Nhập yêu cầu tùy chọn, tối đa 2.000 ký tự. |
| 3 | Nút tạo đề xuất |   | Gửi các mục đủ điều kiện trong nội dung CV đang chỉnh. |
| 4 | Khung so sánh |   | Đối chiếu nội dung hiện tại với đề xuất theo từng mục. |
| 5 | Nút áp dụng và bỏ qua |   | Chấp nhận hoặc bỏ qua từng đề xuất. |

**Dữ liệu được dùng**

Nội dung các mục CV được lấy từ trạng thái đang biên soạn. Khi có mã tin mục tiêu, máy chủ có thể truy vấn tin để bổ sung ngữ cảnh.

*Từ điển dữ liệu chức năng AI hỗ trợ CV*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `job_postings` |   |   |   | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. AI hỗ trợ cải thiện CV** [Vị trí chèn sơ đồ hoạt động].

Ứng viên chọn vị trí mục tiêu, có thể nhập chỉ dẫn bổ sung và yêu cầu tạo đề xuất. Ứng dụng gửi các mục phù hợp trong một yêu cầu hàng loạt. Máy chủ kiểm tra dữ liệu, chuẩn bị ngữ cảnh công việc dùng chung và nhận diện ngôn ngữ theo nội dung từng mục trước khi gọi Gemini. Các đề xuất có thể được lấy lại từ bộ nhớ đệm với yêu cầu trùng dữ liệu.

Ứng dụng trình bày nội dung đề xuất để ứng viên so sánh, áp dụng hoặc bỏ qua. Kết quả áp dụng được đưa vào trình biên soạn và được lưu khi ứng viên thực hiện thao tác lưu CV. Backend còn cung cấp API xử lý từng yêu cầu và truyền phản hồi qua Server-Sent Events.

### Chức năng quản lý hội thoại AI

**Mục đích**

Cho phép ứng viên lưu, tra cứu, ghim và xóa các hội thoại hỗ trợ CV.

**Giao diện**

Phạm vi chức năng hiện tại là API dành cho ứng viên. Giao diện hội thoại chưa được tích hợp.

**Dữ liệu được dùng**

*Từ điển dữ liệu chức năng Quản lý hội thoại AI*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `ai_conversations` | X | X | X | X |
| 2 | `ai_messages` | X |   | X | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Quản lý hội thoại AI** [Vị trí chèn sơ đồ hoạt động].

Ứng viên có thể tạo, liệt kê, mở, ghim hoặc bỏ ghim, xóa một hoặc xóa toàn bộ hội thoại qua API. Hệ thống giới hạn truy cập theo tài khoản. Khi ứng viên đã có ít nhất 20 hội thoại, hệ thống xóa hội thoại không ghim cũ nhất nếu có trước khi thêm hội thoại mới.

Khi nhận tin nhắn hợp lệ, máy chủ chuẩn bị tin nhắn người dùng và gọi Gemini. Sau khi nhận phản hồi, hệ thống ghi cả hai tin nhắn, dữ liệu bổ sung của phản hồi và thời điểm hoạt động trong lần lưu chung. Xóa hội thoại cũng xóa các tin nhắn đi kèm.

**Chức năng dành cho Quản trị viên**

### Chức năng quản lý trạng thái tài khoản người dùng

**Mục đích**

Cho phép quản trị viên tìm kiếm tài khoản, khóa tài khoản vi phạm và khôi phục quyền truy cập.

**Giao diện**

> **Hình. Quản lý tài khoản người dùng** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Quản lý tài khoản*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Ô tìm kiếm | Rỗng | Tìm tài khoản theo thông tin định danh. |
| 2 | Bộ lọc vai trò và trạng thái | Tất cả | Lọc tài khoản theo vai trò hoặc trạng thái. |
| 3 | Bảng và phân trang | Trang 1 | Hiển thị danh sách tài khoản. |
| 4 | Nút khóa và khôi phục |   | Thao tác theo trạng thái của tài khoản. |
| 5 | Hộp thoại lý do khóa | Rỗng | Nhập lý do từ 5 đến 1.000 ký tự trước khi xác nhận. |

**Dữ liệu được dùng**

*Từ điển dữ liệu chức năng Quản lý tài khoản*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `users` |   | X |   | X |
| 2 | `user_roles` / `roles` |   |   |   | X |
| 3 | `refresh_tokens` |   | X |   | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Quản lý tài khoản** [Vị trí chèn sơ đồ hoạt động].

Quản trị viên truy vấn tài khoản theo từ khóa, vai trò hoặc trạng thái. Khi khóa tài khoản, máy chủ kiểm tra lý do và cập nhật sang `Locked`. Khi khôi phục, trạng thái được đặt về `Active`. API cũng hỗ trợ đặt trạng thái `Inactive`.

Máy chủ từ chối yêu cầu chuyển sang trạng thái hiện tại và bảo vệ tài khoản quản trị đang hoạt động cuối cùng khỏi bị khóa hoặc vô hiệu hóa. Khi chuyển sang `Locked` hoặc `Inactive`, máy chủ thu hồi toàn bộ refresh token chưa thu hồi của người dùng.

### Chức năng quản lý danh mục ngành nghề, kỹ năng và địa điểm

**Mục đích**

Cho phép Admin duy trì dữ liệu nền được dùng trong CV, tin tuyển dụng và bộ lọc tìm kiếm.

**Giao diện**

> **Hình. Quản lý nhóm ngành và ngành nghề** [Vị trí chèn ảnh giao diện].

> **Hình. Quản lý kỹ năng** [Vị trí chèn ảnh giao diện].

> **Hình. Quản lý tỉnh, thành phố và phường, xã** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Quản lý danh mục*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Tab danh mục | Ngành nghề | Chuyển giữa ngành nghề, kỹ năng và địa điểm. |
| 2 | Ô tìm kiếm và bộ lọc | Rỗng hoặc tất cả | Tìm theo tên hoặc mã nếu có, lọc theo nhóm cha hoặc trạng thái theo từng loại. |
| 3 | Danh sách và phân trang | Trang 1 | Xem bản ghi danh mục. |
| 4 | Hộp thoại tạo hoặc sửa | Rỗng hoặc thông tin hiện tại | Nhập thông tin và chọn quan hệ cha nếu loại danh mục yêu cầu. |
| 5 | Công tắc hoạt động | Trạng thái hiện tại | Bật hoặc tắt dữ liệu theo từng loại danh mục. |

**Dữ liệu được dùng**

*Từ điển dữ liệu chức năng Quản lý danh mục*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `industry_groups` | X | X |   | X |
| 2 | `industries` | X | X |   | X |
| 3 | `skills` | X | X |   | X |
| 4 | `provinces` | X | X |   | X |
| 5 | `wards` | X | X |   | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Quản lý danh mục** [Vị trí chèn sơ đồ hoạt động].

Quản trị viên tìm kiếm, lọc và phân trang theo các tiêu chí của từng danh mục. Khi thêm hoặc cập nhật, hệ thống kiểm tra tên, mã nếu loại danh mục có mã, các ràng buộc duy nhất và quan hệ với nhóm cha. Phường hoặc xã phải gắn với tỉnh hoặc thành phố hợp lệ. Khi tắt một mục, hệ thống lưu trạng thái mới để loại mục đó khỏi truy vấn công khai và giữ lại bản ghi cho các quan hệ đã có.

### Chức năng thống kê tổng quan quản trị

**Mục đích**

Cung cấp cho quản trị viên số liệu tổng hợp về người dùng, doanh nghiệp, tin tuyển dụng và hồ sơ ứng tuyển.

**Giao diện**

> **Hình. Thống kê tổng quan quản trị** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Thống kê quản trị*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Thẻ thống kê | Tổng quan mặc định | Hiển thị số tổng và một số chỉ số theo trạng thái. |
| 2 | Biểu đồ tròn và bộ chọn nhóm | Doanh nghiệp | Chuyển giữa phân bố trạng thái doanh nghiệp và tin tuyển dụng. |
| 3 | Biểu đồ xu hướng | Sáu tháng gần nhất | Hiển thị phân bổ ước lượng từ tổng lượt ứng tuyển. |

**Dữ liệu được dùng**

*Từ điển dữ liệu chức năng Thống kê quản trị*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `users` |   |   |   | X |
| 2 | `companies` |   |   |   | X |
| 3 | `job_postings` |   |   |   | X |
| 4 | `applications` |   |   |   | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Thống kê quản trị** [Vị trí chèn sơ đồ hoạt động].

Trang tổng quan gọi API thống kê với tham số mặc định. Máy chủ trả số tổng hoặc số lượng theo trạng thái của bốn nhóm dữ liệu. Khoảng thời gian mặc định là 30 ngày gần nhất và được dùng để đếm người dùng mới và hồ sơ mới. API hỗ trợ nhận khoảng ngày khác và từ chối ngày bắt đầu lớn hơn ngày kết thúc.

Giao diện dùng các số lượng theo trạng thái để vẽ biểu đồ phân bố. Biểu đồ xu hướng sáu tháng lấy tổng lượt ứng tuyển và phân bổ theo trọng số định sẵn. Các điểm trên biểu đồ là giá trị ước lượng.

**Chức năng dành cho người dùng hệ thống**

### Chức năng thông báo

**Mục đích**

Giúp người dùng nhận và quản lý thông báo nghiệp vụ. Quản trị viên có thể phát cảnh báo đến nhóm người dùng phù hợp.

**Giao diện**

> **Hình. Trung tâm thông báo** [Vị trí chèn ảnh giao diện].

> **Hình. Hộp thoại phát cảnh báo của quản trị viên** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Thông báo*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Biểu tượng chuông và huy hiệu | Số chưa đọc | Mở trung tâm thông báo và xem số thông báo chưa đọc. |
| 2 | Danh sách thông báo | Mới nhất trước | Xem nội dung và mở tài nguyên liên quan nếu có. |
| 3 | Nút đánh dấu đã đọc |   | Đánh dấu một thông báo hoặc toàn bộ thông báo. |
| 4 | Nút xóa |   | Xóa thông báo của tài khoản hiện tại. |
| 5 | Hộp thoại phát cảnh báo | Toàn hệ thống, mức Chung | Chọn đối tượng, mức cảnh báo, tiêu đề và nội dung. |

**Dữ liệu được dùng**

Các nghiệp vụ nguồn ghi thông báo khi có sự kiện liên quan. Các bảng dưới đây mô tả riêng thao tác trong trung tâm thông báo và thao tác phát cảnh báo.

*Dữ liệu dùng ở trung tâm thông báo*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `notifications` |   | X | X | X |

*Dữ liệu dùng khi quản trị viên phát cảnh báo*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `users` / `user_roles` / `roles` |   |   |   | X |
| 2 | `notifications` | X |   |   |   |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Thông báo** [Vị trí chèn sơ đồ hoạt động].

Trung tâm thông báo truy vấn danh sách và số chưa đọc của người dùng hiện tại. Máy chủ kiểm tra người nhận khi đánh dấu một thông báo hoặc xóa. Khi đánh dấu toàn bộ, máy chủ giới hạn cập nhật theo tài khoản hiện tại. SignalR đưa thông báo mới về ứng dụng, trực tiếp hoặc qua tác vụ nền tùy luồng.

Khi phát cảnh báo, giao diện yêu cầu tiêu đề từ 3 đến 200 ký tự và nội dung từ 5 đến 2.000 ký tự. Máy chủ kiểm tra quyền quản trị, đối tượng nhận, nội dung bắt buộc và độ dài tối đa. Lựa chọn Toàn hệ thống gửi đến các tài khoản ứng viên và nhà tuyển dụng đang hoạt động. Quản trị viên cũng có thể chọn từng vai trò.

Máy chủ lưu thông báo cho người nhận trước khi phát sự kiện qua SignalR. Các bản ghi đã lưu có thể được truy vấn lại từ trung tâm thông báo.

**Chức năng công khai dùng trong biểu mẫu và bộ lọc**

### Chức năng cung cấp danh mục ngành nghề, kỹ năng và địa điểm công khai

**Mục đích**

Cung cấp nhóm ngành, ngành nghề, kỹ năng chuẩn hóa và địa điểm hành chính đang hoạt động cho các biểu mẫu và bộ lọc tìm kiếm.

**Giao diện**

> **Hình. Chọn danh mục ngành nghề, kỹ năng và địa điểm** [Vị trí chèn ảnh giao diện].

*Các thành phần trong giao diện Danh mục công khai*

| STT | Loại điều khiển | Giá trị mặc định | Lưu ý |
|---:|---|---|---|
| 1 | Bộ chọn phân cấp | Chưa chọn | Chọn nhóm ngành, ngành nghề, tỉnh hoặc thành phố và phường hoặc xã theo biểu mẫu. |
| 2 | Bộ chọn kỹ năng | Chưa chọn | Tìm và chọn kỹ năng chuẩn hóa. |
| 3 | Ô tìm kiếm | Rỗng | Thu hẹp các lựa chọn theo từ khóa tại bộ chọn có hỗ trợ. |

**Dữ liệu được dùng**

*Từ điển dữ liệu chức năng Danh mục công khai*

| STT | Tên bảng hoặc cấu trúc dữ liệu | Thêm | Sửa | Xóa | Truy vấn |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | `industry_groups` |   |   |   | X |
| 2 | `industries` |   |   |   | X |
| 3 | `skills` |   |   |   | X |
| 4 | `provinces` |   |   |   | X |
| 5 | `wards` |   |   |   | X |

**Cách xử lý và sơ đồ hoạt động**

> **Sơ đồ hoạt động. Danh mục công khai** [Vị trí chèn sơ đồ hoạt động].

Ứng dụng nạp danh mục khi người dùng mở biểu mẫu hoặc sử dụng bộ lọc. Khi chọn mục cha, bộ chọn dùng mã của mục đó để lấy dữ liệu liên quan nếu cần. API công khai hỗ trợ tìm kiếm, phân trang, lọc ngành theo nhóm, lọc phường hoặc xã theo tỉnh và trả dữ liệu theo cấu trúc lồng nhau. Khi nhận yêu cầu tạo hoặc sửa tin, máy chủ kiểm tra các mã danh mục còn hiệu lực và quan hệ hành chính tương ứng.
