## 2.3.16. Chức năng Phân tích mức độ phù hợp giữa CV và tin tuyển dụng

**Mục đích:** Hỗ trợ ứng viên và nhà tuyển dụng nhận biết mức độ tương thích giữa nội dung CV với yêu cầu công việc.

**Giao diện:** Kết quả phân tích hiển thị điểm phù hợp, nhóm tiêu chí/điểm thành phần, kỹ năng phù hợp, kỹ năng còn thiếu, kinh nghiệm và nhận xét giải thích.

**Dữ liệu được dùng:** `cv_versions`, `cv_embeddings`, `job_postings`, `job_embeddings`, `ai_match_results`, `applications`.

**Cách xử lý:** Hệ thống nhận phiên bản CV, CV hoặc văn bản CV cùng mã tin tuyển dụng hoặc nội dung mô tả công việc. Máy chủ truy vấn dữ liệu tương ứng, tạo khóa cache theo nội dung CV và tin, sau đó tìm kết quả đã lưu trong cache trước khi tính mới. Bộ máy so khớp nội bộ phân tích kỹ năng, kinh nghiệm, cấp bậc và tín hiệu tương thích; nếu có embedding của cả CV và tin, độ tương đồng ngữ nghĩa được sử dụng bổ sung. Dịch vụ Gemini tạo phần giải thích định tính; nếu dịch vụ này lỗi hoặc không khả dụng, hệ thống vẫn trả điểm, kỹ năng phù hợp/thiếu và nhận xét dự phòng do bộ máy nội bộ tạo. Kết quả được cache trong 24 giờ. Nếu thiếu nội dung CV hoặc thông tin công việc, hệ thống trả lỗi; kết quả chỉ có vai trò hỗ trợ tham khảo.

## 2.3.17. Chức năng Gợi ý việc làm phù hợp

**Mục đích:** Đề xuất các tin tuyển dụng phù hợp với hồ sơ nghề nghiệp của ứng viên.

**Giao diện:** Trang việc làm phù hợp hiển thị các tin được xếp hạng kèm điểm hoặc dấu hiệu tương thích; ứng viên có thể xem chi tiết tin và chuyển sang luồng ứng tuyển.

**Dữ liệu được dùng:** `cv_embeddings`, `job_embeddings`, `job_postings`, `job_recommendations`, `applications`, `job_bookmarks`.

**Cách xử lý:** Tác vụ cập nhật gợi ý lấy embedding CV mới nhất của ứng viên và dùng tìm kiếm vector để lấy tối đa 40 tin tiềm năng. Hệ thống nạp chi tiết các tin, chỉ giữ tin đang phát hành, sau đó áp dụng bộ máy so khớp để tính điểm và lưu/cập nhật danh sách gợi ý. Khi truy vấn, hệ thống chỉ trả gợi ý của ứng viên hiện tại, áp dụng ngưỡng điểm tối thiểu (mặc định 50) và phân trang. Ứng viên có thể ghim/bỏ ghim các gợi ý để lưu vị trí cần theo dõi. Nếu ứng viên chưa có embedding CV hoặc không có tin tương tự, tác vụ kết thúc mà không tạo gợi ý mới. Ứng viên cũng có thể yêu cầu làm mới gợi ý; công việc tính toán được đưa qua cơ chế tác vụ nền.

## 2.3.18. Chức năng AI hỗ trợ cải thiện nội dung CV

**Mục đích:** Đưa ra đề xuất về cách diễn đạt, từ khóa và nội dung CV theo vị trí mục tiêu; ứng viên chủ động xem xét và áp dụng nội dung phù hợp.

**Giao diện:** Trình biên soạn CV cung cấp trợ lý AI theo từng phần nội dung, cho phép nhập hoặc chọn nội dung cần hỗ trợ, chọn loại phần CV, ngôn ngữ và vị trí mục tiêu. Kết quả được hiển thị cạnh nội dung hiện tại để người dùng quyết định có áp dụng hay không.

**Dữ liệu được dùng:** `cvs`, `cv_versions`, `ai_conversations`, `ai_messages`, `job_postings` (khi chọn vị trí mục tiêu).

**Cách xử lý:** Hệ thống kiểm tra nội dung và ngữ cảnh yêu cầu, chuẩn hóa loại nội dung, sau đó gửi văn bản cùng ngữ cảnh tùy chọn đến dịch vụ Gemini. Luồng cải thiện trực tiếp trả nội dung gợi ý cho giao diện; luồng gửi tin nhắn hội thoại kiểm tra hội thoại thuộc ứng viên hiện tại, lưu câu hỏi và phản hồi AI, đồng thời có thể sinh tiêu đề phù hợp cho hội thoại mới. Kết quả gồm nội dung cải thiện, từ khóa và thông tin đề xuất; hệ thống không tự ghi đè nội dung CV. Ứng viên chủ động xem xét và áp dụng phần gợi ý vào trình biên soạn. Nếu hội thoại không thuộc ứng viên hiện tại hoặc nội dung đầu vào rỗng, hệ thống từ chối xử lý.

## 2.3.19. Chức năng Quản lý hội thoại AI

**Mục đích:** Cho phép ứng viên lưu, xem lại, ghim và xóa các cuộc trao đổi với trợ lý AI.

**Giao diện:** Danh sách hội thoại hiển thị tiêu đề và thời điểm cập nhật; người dùng có thể mở nội dung, ghim/bỏ ghim, tạo cuộc trò chuyện mới hoặc xóa cuộc trò chuyện.

**Dữ liệu được dùng:** `ai_conversations`, `ai_messages`, `cvs`.

**Cách xử lý:** Máy chủ tạo hội thoại gắn với ứng viên hiện tại, lưu tin nhắn theo thứ tự và cập nhật thời điểm hoạt động. Với hội thoại mới, tiêu đề có thể được sinh tự động từ ngữ cảnh và nội dung trao đổi. Khi ghim, bỏ ghim hoặc xóa, hệ thống xác nhận quyền sở hữu trước khi cập nhật; yêu cầu trên hội thoại của người khác bị từ chối. Danh sách và chi tiết hội thoại chỉ trả dữ liệu thuộc tài khoản hiện tại.

## 2.3.20. Chức năng Quản lý tài khoản người dùng

**Mục đích:** Cho phép Admin tra cứu tài khoản và thay đổi trạng thái hoạt động nhằm quản lý quyền truy cập hệ thống.

**Giao diện:** Bảng quản trị hiển thị danh sách người dùng, thông tin định danh, vai trò và trạng thái; Admin chọn trạng thái mới cho tài khoản.

**Dữ liệu được dùng:** `users`, `user_roles`, `roles`, `refresh_tokens`.

**Cách xử lý:** Hệ thống truy vấn danh sách tài khoản theo từ khóa, vai trò hoặc trạng thái rồi phân trang. Khi đổi trạng thái, hệ thống xác thực giá trị mới, kiểm tra tài khoản tồn tại và không cho phép lặp lại trạng thái hiện tại. Tài khoản bị khóa sẽ bị thu hồi các Refresh Token chưa thu hồi trong cùng giao dịch để ngăn tiếp tục sử dụng phiên cũ. Hệ thống không cho khóa hoặc vô hiệu hóa Admin cuối cùng còn hoạt động. Nếu vi phạm các điều kiện này, thao tác bị từ chối và trạng thái tài khoản không thay đổi.

## 2.3.21. Chức năng Quản lý danh mục dùng chung

**Mục đích:** Cho phép Admin duy trì các dữ liệu nền được dùng khi tạo hồ sơ CV, tin tuyển dụng và bộ lọc tìm kiếm.

**Giao diện:** Khu vực danh mục cho phép xem, tìm kiếm, phân trang, tạo mới hoặc cập nhật nhóm ngành, ngành nghề, kỹ năng, tỉnh/thành phố và phường/xã. Các biểu mẫu cho phép bật/tắt trạng thái hoạt động khi phù hợp.

**Dữ liệu được dùng:** `industry_groups`, `industries`, `skills`, `provinces`, `wards`, cùng các bảng nghiệp vụ tham chiếu danh mục.

**Cách xử lý:** Admin truy vấn danh mục theo từ khóa, nhóm cha, trạng thái và phân trang. Khi tạo hoặc cập nhật, hệ thống kiểm tra dữ liệu bắt buộc, tính duy nhất của tên/mã và quan hệ phân cấp; với tỉnh/thành phố và phường/xã, hệ thống kiểm tra quan hệ địa giới. Danh mục trạng thái không hoạt động được ẩn khỏi các truy vấn công khai dành cho việc tạo tin và lọc, trong khi thông tin lịch sử vẫn được giữ để bảo toàn liên kết dữ liệu.

## 2.3.22. Chức năng Thống kê tổng quan quản trị

**Mục đích:** Cung cấp cho Admin số liệu tổng quan về doanh nghiệp, tài khoản, tin tuyển dụng và hồ sơ ứng tuyển trong khoảng thời gian được chọn.

**Giao diện:** Bảng điều khiển quản trị hiển thị tổng số tài khoản (kèm số mới, hoạt động và bị khóa), doanh nghiệp (chờ xác minh, đã xác minh, bị từ chối), tin tuyển dụng (chờ duyệt, đang mở, hết hạn, đã đóng) và hồ sơ (mới, phỏng vấn, bị từ chối) trong khoảng thời gian được chọn.

**Dữ liệu được dùng:** `companies`, `users`, `job_postings`, `applications`.

**Cách xử lý:** Giao diện gửi tùy chọn thời điểm bắt đầu và kết thúc. Nếu không truyền, máy chủ mặc định thời điểm kết thúc là hiện tại và thời điểm bắt đầu lùi 30 ngày. Hệ thống từ chối khoảng thời gian có ngày bắt đầu sau ngày kết thúc, sau đó truy vấn và tổng hợp số liệu tài khoản, doanh nghiệp, tin tuyển dụng và hồ sơ ứng tuyển. Kết quả bao gồm cả thời gian áp dụng để giao diện hiển thị phạm vi thống kê.

## 2.3.23. Chức năng Thông báo

**Mục đích:** Thông báo cho người dùng về các sự kiện liên quan đến ứng tuyển, tin tuyển dụng, doanh nghiệp và hoạt động hệ thống; hỗ trợ theo dõi thông báo đã đọc/chưa đọc.

**Giao diện:** Trung tâm thông báo hiển thị danh sách, số thông báo chưa đọc và thao tác đánh dấu một hoặc tất cả thông báo đã đọc, cũng như xóa thông báo.

**Dữ liệu được dùng:** `notifications`, `users`, `companies`, `job_postings`, `applications`.

**Cách xử lý:** Nghiệp vụ phát sinh tạo thông báo gắn với người nhận và tài nguyên liên quan; thông báo có thể được gửi theo người dùng, vai trò hoặc nhóm doanh nghiệp. SignalR chuyển sự kiện đến các kết nối thuộc nhóm được phép. Khi mở trung tâm, máy chủ truy vấn thông báo của tài khoản hiện tại và số lượng chưa đọc. Thao tác đánh dấu đã đọc hoặc xóa chỉ áp dụng lên thông báo mà người dùng có quyền truy cập. Khi mất kết nối thời gian thực, thông báo đã lưu vẫn có thể được truy vấn lại từ danh sách.

## 2.3.24. Chức năng Danh mục ngành nghề công khai

**Mục đích:** Cung cấp nhóm ngành và ngành nghề đang hoạt động để ứng viên và nhà tuyển dụng sử dụng trong tìm kiếm, hồ sơ và tin tuyển dụng.

**Giao diện:** Các bộ chọn ngành nghề có thể hiển thị danh sách nhóm ngành kèm ngành trực thuộc, hoặc danh sách ngành theo từ khóa.

**Dữ liệu được dùng:** `industry_groups`, `industries`.

**Cách xử lý:** Giao diện yêu cầu danh mục công khai; máy chủ chỉ trả các nhóm/ngành hoạt động, có thể lọc theo nhóm cha và từ khóa, sau đó phân trang khi truy vấn danh sách lớn. Các mã ngành không tồn tại hoặc không còn hoạt động không được chấp nhận trong nghiệp vụ tạo/cập nhật tin tuyển dụng.
