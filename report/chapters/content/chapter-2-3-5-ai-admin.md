**Phân hệ: Thiết kế chức năng dành cho Ứng viên: hỗ trợ trí tuệ nhân tạo**

### Chức năng phân tích mức độ phù hợp giữa CV và tin tuyển dụng


**Mục đích:** Cung cấp thông tin hỗ trợ ứng viên đánh giá mức độ đáp ứng của CV so với yêu cầu vị trí.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Giao diện: phân tích mức độ phù hợp CV--việc làm** — [Vị trí chèn ảnh mockup/Figma].

*Các thành phần trong giao diện Phân tích mức độ phù hợp*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | CV selector | CV/phiên bản hiện tại | Chọn phiên bản CV hoặc cung cấp nội dung CV. |
| 2 | Job selector/Textarea | Vị trí hiện tại | Chọn tin hoặc nhập nội dung công việc. |
| 3 | Button | N/A | Yêu cầu phân tích. |
| 4 | Score/Progress | Rỗng | Hiển thị điểm phù hợp và phân rã tiêu chí. |
| 5 | List | Rỗng | Hiển thị kỹ năng phù hợp, còn thiếu và khuyến nghị. |

**Dữ liệu được dùng:**
*Từ điển dữ liệu chức năng Phân tích mức độ phù hợp*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | cv_versions / cvs |  |  |  | X |
| 2 | job_postings |  |  |  | X |
| 3 | cv_embeddings / job_embeddings |  |  |  | X |
| 4 | ai_match_results | X |  |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Sơ đồ hoạt động: Phân tích mức độ phù hợp** — [Vị trí chèn sơ đồ hoạt động].

Yêu cầu phải có CV hợp lệ và mã tin hoặc văn bản công việc. Hệ thống chuẩn hóa nội dung, tạo khóa cache theo nội dung CV và tin, rồi dùng cache nếu còn kết quả. Bộ máy so khớp nội bộ đánh giá kỹ năng, kinh nghiệm và cấp bậc; độ tương đồng vector được bổ sung khi hai embedding đã có. Gemini tạo phần giải thích, nhưng nếu dịch vụ lỗi/quá hạn mức, hệ thống trả điểm và nội dung dự phòng của bộ máy nội bộ. Kết quả được cache 24 giờ. Khi yêu cầu gắn với hồ sơ ứng tuyển, kết quả phân tích được lưu cùng phiên bản CV và hồ sơ. Không có Domain Event riêng cho phân tích; lời gọi Gemini là xử lý đồng bộ và có fallback. Lỗi đầu vào 422, không tìm thấy dữ liệu 404, quota AI 429, dịch vụ AI không sẵn sàng 503.

Lỗi được trả trong envelope JSON gồm `error` và `correlationId`, kèm header `X-Correlation-ID`; HTTP status được ánh xạ theo loại lỗi. Cấu trúc này không phải RFC 7807 Problem Details.

### Chức năng gợi ý việc làm phù hợp


**Mục đích:** Đề xuất các tin đang tuyển có nội dung gần với năng lực thể hiện trong CV ứng viên.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Giao diện: gợi ý việc làm phù hợp** — [Vị trí chèn ảnh mockup/Figma].

*Các thành phần trong giao diện Gợi ý việc làm*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | Card/List | Trang đầu | Hiển thị tin, điểm và dấu hiệu tương thích. |
| 2 | Button (icon) | Chưa ghim/đã ghim | Ghim hoặc bỏ ghim gợi ý. |
| 3 | Button | N/A | Yêu cầu làm mới gợi ý. |
| 4 | Pagination/Filter | Ngưỡng điểm 50 | Lọc theo điểm tối thiểu và chuyển trang. |

**Dữ liệu được dùng:**
*Từ điển dữ liệu chức năng Gợi ý việc làm*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | cv_embeddings / job_embeddings |  |  |  | X |
| 2 | job_postings |  |  |  | X |
| 3 | job_recommendations | X | X |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Sơ đồ hoạt động: Gợi ý việc làm** — [Vị trí chèn sơ đồ hoạt động].

Khi làm mới, API lên lịch Hangfire; worker lấy embedding CV mới nhất, tìm tối đa 40 việc tương tự bằng pgvector, chỉ giữ việc Published, chấm lại bằng bộ máy match và upsert gợi ý. Nếu chưa có embedding hoặc không có ứng viên việc làm, worker kết thúc có ghi log và không tạo kết quả mới. Truy vấn gợi ý chỉ trả dữ liệu của ứng viên hiện tại, mặc định lọc điểm từ 50 trở lên và giới hạn trang tối đa 100 mục. Ghim/bỏ ghim cập nhật trạng thái gợi ý theo quyền sở hữu. Không có Domain Event tổng quát; xử lý làm mới là tác vụ nền tách khỏi request đọc.

Lỗi được trả trong envelope JSON gồm `error` và `correlationId`, kèm header `X-Correlation-ID`; HTTP status được ánh xạ theo loại lỗi. Cấu trúc này không phải RFC 7807 Problem Details.

### Chức năng AI hỗ trợ cải thiện nội dung CV


**Mục đích:** Đưa ra đề xuất về cách diễn đạt, từ khóa hoặc nội dung của từng phần CV theo vị trí mục tiêu.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Giao diện: AI hỗ trợ cải thiện nội dung CV** — [Vị trí chèn ảnh mockup/Figma].

*Các thành phần trong giao diện AI hỗ trợ CV*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | Textarea/Editor | Nội dung phần CV | Nhập nội dung cần đề xuất cải thiện. |
| 2 | Dropdown | EXPERIENCE | Chọn loại phần CV để tạo ngữ cảnh. |
| 3 | Job selector | Không chọn | Chọn vị trí mục tiêu nếu cần. |
| 4 | Dropdown | Tiếng Việt | Chọn ngôn ngữ đầu ra. |
| 5 | Button | N/A | Gửi yêu cầu cải thiện. |
| 6 | Diff/Preview panel | Rỗng | So sánh và tự quyết định áp dụng đề xuất. |

**Dữ liệu được dùng:**
*Từ điển dữ liệu chức năng AI hỗ trợ CV*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | cv_versions / job_postings |  |  |  | X |
| 2 | ai_conversations | X | X |  | X |
| 3 | ai_messages | X |  |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Sơ đồ hoạt động: AI hỗ trợ cải thiện CV** — [Vị trí chèn sơ đồ hoạt động].

Hệ thống chuẩn hóa loại phần CV, văn bản, ngôn ngữ và vị trí mục tiêu rồi gọi Gemini. Kết quả gồm nội dung cải thiện, từ khóa và giải thích; ứng dụng hiển thị để ứng viên chủ động áp dụng, hệ thống không tự ghi đè nội dung CV. Ở luồng chat, câu hỏi và trả lời được lưu thành hai bản ghi tin nhắn; tiêu đề hội thoại mới có thể được tạo từ ngữ cảnh phản hồi. Luồng streaming trả dữ liệu dần qua SSE. Dịch vụ có xử lý hạn mức và fallback theo loại yêu cầu; lỗi được chuyển thành 429 hoặc 503 khi phù hợp. Không phát Domain Event nghiệp vụ riêng.

Lỗi được trả trong envelope JSON gồm `error` và `correlationId`, kèm header `X-Correlation-ID`; HTTP status được ánh xạ theo loại lỗi. Cấu trúc này không phải RFC 7807 Problem Details.

### Chức năng quản lý hội thoại AI


**Mục đích:** Cho phép ứng viên lưu, tra cứu, ghim và xóa các hội thoại hỗ trợ CV.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Giao diện: quản lý hội thoại AI** — [Vị trí chèn ảnh mockup/Figma].

*Các thành phần trong giao diện Hội thoại AI*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | Conversation list | Hội thoại gần nhất | Chọn hội thoại thuộc tài khoản hiện tại. |
| 2 | Message panel | Tin nhắn mới nhất | Hiển thị lịch sử trao đổi. |
| 3 | Textarea | Rỗng | Nhập câu hỏi/nội dung yêu cầu. |
| 4 | Button | N/A | Gửi tin nhắn tới trợ lý. |
| 5 | Button (icon) | Chưa ghim | Ghim/bỏ ghim hoặc xóa hội thoại. |

**Dữ liệu được dùng:**
*Từ điển dữ liệu chức năng Quản lý hội thoại AI*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | ai_conversations | X | X | X | X |
| 2 | ai_messages | X |  | X | X |
| 3 | cvs |  |  |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Sơ đồ hoạt động: Quản lý hội thoại AI** — [Vị trí chèn sơ đồ hoạt động].

Hệ thống gắn hội thoại với ứng viên hiện tại và kiểm tra quyền sở hữu trong các thao tác đọc, gửi, ghim hoặc xóa. Nội dung tin nhắn không được để trống. Khi gửi, tin người dùng được lưu, Gemini được gọi đồng bộ, rồi phản hồi và metadata được lưu; hội thoại được cập nhật thời điểm hoạt động. Nếu dịch vụ AI lỗi, thao tác gửi có thể trả lỗi đã ánh xạ; dữ liệu được bảo vệ bởi quyền sở hữu và middleware lỗi chung. Không có Domain Event chuyên biệt.

Lỗi được trả trong envelope JSON gồm `error` và `correlationId`, kèm header `X-Correlation-ID`; HTTP status được ánh xạ theo loại lỗi. Cấu trúc này không phải RFC 7807 Problem Details.

**Phân hệ: Thiết kế chức năng dành cho Quản trị viên**

### Chức năng quản lý trạng thái tài khoản người dùng


**Mục đích:** Cho phép Admin tra cứu người dùng và khóa, mở khóa hoặc vô hiệu hóa tài khoản theo trạng thái hỗ trợ.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Giao diện: quản lý tài khoản người dùng** — [Vị trí chèn ảnh mockup/Figma].

*Các thành phần trong giao diện Quản lý tài khoản*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | Textbox | Rỗng | Tìm theo tiêu chí được API hỗ trợ. |
| 2 | Dropdown | Tất cả | Lọc theo vai trò hoặc trạng thái. |
| 3 | Table/Pagination | Trang đầu | Hiển thị danh sách tài khoản. |
| 4 | Status dropdown | Trạng thái hiện tại | Chọn Active, Locked hoặc Inactive. |
| 5 | Button | N/A | Lưu trạng thái tài khoản. |

**Dữ liệu được dùng:**
*Từ điển dữ liệu chức năng Quản lý tài khoản*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | users |  | X |  | X |
| 2 | user_roles / roles |  |  |  | X |
| 3 | refresh_tokens |  | X |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Sơ đồ hoạt động: Quản lý tài khoản** — [Vị trí chèn sơ đồ hoạt động].

API truy vấn hỗ trợ tìm kiếm, lọc vai trò/trạng thái và phân trang. Khi cập nhật trạng thái, hệ thống từ chối trạng thái không đổi và bảo vệ Admin hoạt động cuối cùng khỏi bị khóa/vô hiệu hóa. Khi khóa tài khoản, toàn bộ Refresh Token chưa thu hồi bị thu hồi trong giao dịch. Lỗi dữ liệu trả 422, tài khoản không tồn tại 404, trạng thái không hợp lệ hoặc xung đột trả 409. Thay đổi được lưu đồng bộ; không dùng Domain Event riêng.

Lỗi được trả trong envelope JSON gồm `error` và `correlationId`, kèm header `X-Correlation-ID`; HTTP status được ánh xạ theo loại lỗi. Cấu trúc này không phải RFC 7807 Problem Details.

### Chức năng quản lý danh mục ngành nghề, kỹ năng và địa điểm


**Mục đích:** Cho phép Admin duy trì dữ liệu nền được dùng trong CV, tin tuyển dụng và bộ lọc tìm kiếm.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Giao diện: quản lý danh mục dùng chung** — [Vị trí chèn ảnh mockup/Figma].

*Các thành phần trong giao diện Quản lý danh mục*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | Tabs | Nhóm ngành | Chọn nhóm ngành, ngành, kỹ năng hoặc địa điểm. |
| 2 | Textbox | Rỗng | Tìm hoặc nhập tên/mã danh mục. |
| 3 | Dropdown | Nhóm/trạng thái hiện tại | Chọn nhóm cha hoặc trạng thái. |
| 4 | Table/Pagination | Trang đầu | Hiển thị dữ liệu danh mục. |
| 5 | Dialog/Form | Giá trị hiện tại | Tạo hoặc cập nhật bản ghi. |
| 6 | Toggle | Đang hoạt động | Bật/tắt danh mục theo mô hình từng loại. |

**Dữ liệu được dùng:**
*Từ điển dữ liệu chức năng Quản lý danh mục*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | industry_groups | X | X |  | X |
| 2 | industries | X | X |  | X |
| 3 | skills | X | X |  | X |
| 4 | provinces | X | X |  | X |
| 5 | wards | X | X |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Sơ đồ hoạt động: Quản lý danh mục** — [Vị trí chèn sơ đồ hoạt động].

Admin truy vấn theo nhóm cha, từ khóa, trạng thái và phân trang. Khi tạo/cập nhật, validator kiểm tra tên/mã, tính duy nhất và quan hệ phân cấp; cập nhật phường phải gắn với tỉnh hợp lệ. Trạng thái inactive/hidden loại danh mục khỏi truy vấn công khai nhưng không xóa bản ghi đang được nghiệp vụ khác tham chiếu. Các loại danh mục không hỗ trợ xóa vật lý không được mô tả thao tác xóa. Lỗi validation là 422, bản ghi không tồn tại 404, trùng tên/mã 409.

Lỗi được trả trong envelope JSON gồm `error` và `correlationId`, kèm header `X-Correlation-ID`; HTTP status được ánh xạ theo loại lỗi. Cấu trúc này không phải RFC 7807 Problem Details.

### Chức năng thống kê tổng quan quản trị


**Mục đích:** Cung cấp cho Admin số liệu tổng hợp về người dùng, doanh nghiệp, tin tuyển dụng và hồ sơ ứng tuyển theo khoảng thời gian.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Giao diện: thống kê tổng quan quản trị** — [Vị trí chèn ảnh mockup/Figma].

*Các thành phần trong giao diện Thống kê quản trị*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | Date picker | 30 ngày gần nhất | Chọn thời điểm bắt đầu/kết thúc. |
| 2 | Summary cards | Khoảng ngày mặc định | Tổng người dùng, công ty, tin và hồ sơ theo nhóm trạng thái. |
| 3 | Chart/Table | Theo dữ liệu trả về | Trình bày thống kê tổng hợp. |

**Dữ liệu được dùng:**
*Từ điển dữ liệu chức năng Thống kê quản trị*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | users |  |  |  | X |
| 2 | companies |  |  |  | X |
| 3 | job_postings |  |  |  | X |
| 4 | applications |  |  |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Sơ đồ hoạt động: Thống kê quản trị** — [Vị trí chèn sơ đồ hoạt động].

Endpoint chỉ dành cho Admin. Nếu không truyền mốc thời gian, `to` mặc định hiện tại và `from` mặc định lùi 30 ngày. Máy chủ từ chối `from > to`, rồi repository tổng hợp số lượng theo các nhóm trạng thái. Kết quả bao gồm khoảng ngày đã áp dụng. Truy vấn đồng bộ và chỉ đọc; validation trả HTTP 422, quyền sai trả 403.
Lỗi được trả trong envelope JSON gồm `error` và `correlationId`, kèm header `X-Correlation-ID`; HTTP status được ánh xạ theo loại lỗi. Cấu trúc này không phải RFC 7807 Problem Details.

**Phân hệ: Chức năng dành cho người dùng hệ thống**

### Chức năng thông báo


**Mục đích:** Giúp người dùng nhận và quản lý thông báo phát sinh từ các nghiệp vụ tuyển dụng, doanh nghiệp và tài khoản.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Giao diện: trung tâm thông báo** — [Vị trí chèn ảnh mockup/Figma].

*Các thành phần trong giao diện Thông báo*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | Bell/Badge | Số chưa đọc | Hiển thị số thông báo chưa đọc. |
| 2 | Notification list | Mới nhất trước | Hiển thị nội dung và liên kết tài nguyên. |
| 3 | Button | Chưa đọc | Đánh dấu một thông báo đã đọc. |
| 4 | Button | N/A | Đánh dấu tất cả thông báo đã đọc. |
| 5 | Button (icon) | N/A | Xóa thông báo thuộc người dùng. |
| 6 | SignalR connection | Kết nối tự động | Nhận sự kiện realtime khi đang trực tuyến. |

**Dữ liệu được dùng:**
*Từ điển dữ liệu chức năng Thông báo*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | notifications | X | X | X | X |
| 2 | users / companies / job_postings / applications |  |  |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Sơ đồ hoạt động: Thông báo** — [Vị trí chèn sơ đồ hoạt động].

Nghiệp vụ tạo notification ghi người nhận, loại, nội dung và tài nguyên liên quan vào CSDL; Hangfire có thể phát lô notification qua SignalR, đồng thời một số luồng gửi realtime trực tiếp sau commit. SignalR Hub đưa kết nối vào nhóm theo vai trò và membership công ty đã xác thực. Trung tâm thông báo truy vấn danh sách và số chưa đọc của người dùng hiện tại. Đánh dấu một thông báo yêu cầu đúng người nhận; đánh dấu tất cả giới hạn theo user; xóa cũng kiểm tra quyền sở hữu. Khi realtime lỗi, bản ghi đã lưu vẫn có thể truy vấn lại. Middleware trả lỗi 401/403/404 theo trường hợp và kèm correlationId.
Lỗi được trả trong envelope JSON gồm `error` và `correlationId`, kèm header `X-Correlation-ID`; HTTP status được ánh xạ theo loại lỗi. Cấu trúc này không phải RFC 7807 Problem Details.

**Phân hệ: Chức năng công khai dùng trong biểu mẫu và bộ lọc**

### Chức năng cung cấp danh mục ngành nghề công khai


**Mục đích:** Cung cấp nhóm ngành và ngành nghề đang hoạt động cho các biểu mẫu và bộ lọc tìm kiếm.

**Giao diện:** Chèn ảnh mockup/Figma theo caption hình bên dưới. Bảng thành phần giao diện của chức năng được trình bày ngay sau caption.

> **Giao diện: chọn nhóm ngành và ngành nghề** — [Vị trí chèn ảnh mockup/Figma].

*Các thành phần trong giao diện Danh mục ngành nghề*

| **STT** | **Loại điều khiển** | **Giá trị mặc định** | **Lưu ý** |
| --- | --- | --- | --- |
| 1 | Dropdown/Tree select | Chưa chọn | Chọn nhóm ngành hoặc ngành trực thuộc. |
| 2 | Textbox | Rỗng | Tìm ngành theo từ khóa. |
| 3 | Pagination | Trang 1 | Điều hướng danh sách khi có phân trang. |

**Dữ liệu được dùng:**
*Từ điển dữ liệu chức năng Danh mục ngành nghề*

| **STT** | **Tên bảng** | **Thêm** | **Sửa** | **Xóa** | **Truy vấn** |
| --- | --- | --- | --- | --- | --- |
| 1 | industry_groups |  |  |  | X |
| 2 | industries |  |  |  | X |

**Cách xử lý và sơ đồ hoạt động:**
> **Sơ đồ hoạt động: Danh mục ngành nghề** — [Vị trí chèn sơ đồ hoạt động].

API công khai truy vấn nhóm/ngành đang hoạt động, có thể lọc theo nhóm cha và từ khóa; kết quả được phân trang ở các truy vấn danh sách. Mã ngành không hoạt động hoặc không tồn tại không được chấp nhận trong thao tác tạo/cập nhật tin. Đây là chức năng chỉ đọc, đồng bộ; lỗi tham số được trả theo envelope API chung.

Lỗi được trả trong envelope JSON gồm `error` và `correlationId`, kèm header `X-Correlation-ID`; HTTP status được ánh xạ theo loại lỗi. Cấu trúc này không phải RFC 7807 Problem Details.
