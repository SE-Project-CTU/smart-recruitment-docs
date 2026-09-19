# ĐẶC TẢ YÊU CẦU PHẦN MỀM

## Dự án: Nền tảng Kết nối Tuyển dụng và Hỗ trợ Viết CV Thông minh Tích hợp AI (SmartHire)

**Phiên bản:** 1.0  
**Được chuẩn bị bởi:** Nhóm 1 - Ngành Kỹ thuật Phần mềm  
**Đơn vị:** Bộ môn CNPM, Khoa CNTT & TT, Đại học Cần Thơ  
**Ngày:** 19/09/2026

---

### Theo dõi phiên bản tài liệu

| Tên tác giả | Ngày       | Lý do thay đổi                                    | Phiên bản |
| :---------- | :--------- | :------------------------------------------------ | :-------- |
| Nhóm 1      | 19/09/2026 | Khởi tạo khung tài liệu SRS chuẩn theo mẫu Bộ môn | 1.0       |

---

## 1. Giới thiệu

### 1.1 Mục tiêu

Tài liệu Đặc tả Yêu cầu Phần mềm (Software Requirements Specification - SRS) này mô tả chi tiết các yêu cầu chức năng, yêu cầu phi chức năng, các giao tiếp hệ thống và ràng buộc thiết kế cho dự án **"Nền tảng kết nối tuyển dụng và hỗ trợ tạo CV thông minh tích hợp AI (SmartHire)"**.

Tài liệu này được biên soạn nhằm phục vụ các nhóm đối tượng sử dụng sau:

- **Thành viên nhóm phát triển:** Nắm vững các chi tiết kỹ thuật, luồng xử lý và yêu cầu chức năng để tiến hành thiết kế kiến trúc, xây dựng cơ sở dữ liệu và lập trình hệ thống.
- **Kiểm thử viên:** Làm căn cứ thiết lập các kịch bản kiểm thử (Test Cases), kiểm tra tính đúng đắn và xác minh chất lượng sản phẩm so với yêu cầu ban đầu.
- **Quản lý dự án / Giảng viên hướng dẫn:** Dùng để đánh giá tiến độ hoàn thành, phạm vi công việc và chất lượng sản phẩm của đồ án Niên luận ngành Kỹ thuật Phần mềm.

### 1.2 Phạm vi sản phẩm

Sản phẩm phần mềm được đặc tả là nền tảng tuyển dụng trực tuyến **SmartHire**. Đây là một hệ thống web độc lập đóng vai trò cầu nối tương tác giữa Ứng viên, Nhà tuyển dụng và Quản trị viên.

- **Mục đích chính:** Cung cấp giải pháp tuyển dụng toàn diện từ việc tạo CV chuyên nghiệp, đăng tin tuyển dụng, tìm kiếm việc làm, ứng tuyển trực tuyến đến quản lý hồ sơ ứng viên. Điểm đổi mới cốt lõi của sản phẩm là việc tích hợp các dịch vụ AI thông minh nhằm nâng cao chất lượng CV và tối ưu hóa độ chính xác khi kết nối ứng viên với công việc phù hợp.
- **Các lợi ích và mục tiêu mang lại:**
  - _Đối với Ứng viên:_ Giúp dễ dàng xây dựng CV chuẩn hóa với công cụ biên soạn thời gian thực; Nhận gợi ý tối ưu câu chữ từ AI; Tự động phân tích điểm tương thích để nhận biết khoảng trống kỹ năng so với yêu cầu công việc; Nhận đề xuất công việc phù hợp tự động.
  - _Đối với Nhà tuyển dụng:_ Cung cấp công cụ quản lý tin tuyển dụng tập trung; Theo dõi danh sách ứng tuyển theo quy trình rõ ràng; Nâng cao chất lượng hồ sơ tiếp nhận nhờ tính năng phân tích điểm phù hợp của AI.
  - _Đối với Quản trị viên:_ Cung cấp công cụ kiểm duyệt doanh nghiệp và tin tuyển dụng nhằm hạn chế tình trạng lừa đảo/spam; quản lý danh mục hệ thống và theo dõi báo cáo vận hành tổng quan.

### 1.3 Bảng chú giải thuật ngữ

| STT | Thuật ngữ / Từ viết tắt | Định nghĩa / Giải thích                                                                                                       |
| :-- | :---------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| 1   | **SRS**                 | _Software Requirements Specification_ - Tài liệu đặc tả yêu cầu phần mềm.                                                     |
| 2   | **SmartHire**           | Tên thương mại của Nền tảng kết nối tuyển dụng và hỗ trợ viết CV thông minh tích hợp AI.                                      |
| 3   | **JWT**                 | _JSON Web Token_ - Chuẩn mở dùng để truyền tải thông tin xác thực an toàn giữa các bên dưới dạng đối tượng JSON.              |
| 4   | **RBAC**                | _Role-based Access Control_ - Cơ chế quản lý và phân quyền truy cập dựa trên vai trò của người dùng trong hệ thống.           |
| 5   | **ATS**                 | _Applicant Tracking System_ - Hệ thống theo dõi và quản lý tiến trình ứng tuyển của các hồ sơ ứng viên.                       |
| 6   | **JD**                  | _Job Description_ - Bản mô tả chi tiết thông tin, vị trí, yêu cầu và quyền lợi công việc tuyển dụng.                          |
| 7   | **Match Score**         | Điểm số đánh giá độ tương thích (tính theo tỷ lệ %) giữa CV của ứng viên và Mô tả công việc (JD) do AI tính toán.             |
| 8   | **Skill Gap Analysis**  | Phân tích khoảng trống kỹ năng - Tính năng AI so sánh kỹ năng ứng viên hiện có và kỹ năng JD yêu cầu để chỉ ra các thiếu sót. |
| 9   | **Live Preview**        | Tính năng cho phép xem trước giao diện kết quả hiển thị của CV theo thời gian thực ngay khi nhập dữ liệu.                     |
| 10  | **SSE**                 | _Server-Sent Events_ - Công nghệ cho phép máy chủ đẩy dữ liệu/thông báo thời gian thực về trình duyệt phía Client.            |
| 11  | **CRUD**                | _Create, Read, Update, Delete_ - Tương ứng với 4 thao tác cơ bản trên dữ liệu: Tạo mới, Đọc, Cập nhật và Xóa.                 |
| 12  | **TBD**                 | _To Be Determined_ - Các hạng mục chưa xác định rõ và sẽ bổ sung trong các phiên bản sau.                                     |

### 1.4 Tài liệu tham khảo

1. Bộ môn Công nghệ Phần mềm, Khoa CNTT & TT, Đại học Cần Thơ, _Mẫu Tài liệu Đặc tả Yêu cầu Phần mềm (SRS)_.
2. Nhóm 1, _Đề tài Niên luận ngành KTPM: Xây dựng nền tảng kết nối tuyển dụng và hỗ trợ viết CV thông minh tích hợp AI (SmartHire)_, 2026.
3. Microsoft Docs, _ASP.NET Core 10 Web API Documentation & JWT Authentication Guidelines_, 2026.
4. PostgreSQL Global Development Group, _PostgreSQL 16 Data Types and JSONB Specification_, 2026.
5. React Documentation, _ReactJS Framework & TanStack Query State Management Standard_, 2026.

### 1.5 Bố cục tài liệu

Tài liệu đặc tả SRS này được tổ chức thành các phần chính như sau:

- **Phần 1: Giới thiệu:** Trình bày mục tiêu, phạm vi sản phẩm, bảng thuật ngữ, tài liệu tham khảo và bố cục của tài liệu đặc tả.
- **Phần 2: Mô tả tổng quan:** Cung cấp góc nhìn tổng thể về bối cảnh sản phẩm, tóm tắt chức năng, đặc điểm người dùng, môi trường vận hành, các ràng buộc và giả định của hệ thống.
- **Phần 3: Các yêu cầu giao tiếp bên ngoài:** Chi tiết về giao diện người dùng, giao tiếp phần cứng, giao tiếp phần mềm và các giao thức truyền thông.
- **Phần 4: Các tính năng của hệ thống:** Đặc tả chi tiết 5 nhóm tính năng cốt lõi bao gồm: Xác thực & Phân quyền, Công cụ tạo CV, Tuyển dụng & Ứng tuyển, Quản trị Admin, và Trợ lý AI.
- **Phần 5: Các yêu cầu phi chức năng:** Định nghĩa các tiêu chuẩn về hiệu năng, an toàn, bảo mật, đặc tính chất lượng phần mềm và các quy tắc nghiệp vụ.
- **Phần 6 & Phụ lục:** Các yêu cầu khác, các mô hình phân tích (sơ đồ Use Case, kiến trúc) và danh sách các item TBD.

_Gợi ý mục đọc theo vai trò:_

- **Developer / Lập trình viên:** Nên tập trung đọc kỹ **Phần 3**, **Phần 4** và **Phần 5**.
- **Tester / Kiểm thử viên:** Nên tập trung vào **Phần 4** và **Phần 5** để xây dựng Kịch bản kiểm thử.
- **Quản lý dự án / Đánh giá viên:** Nên đọc **Phần 1**, **Phần 2** và tổng quan **Phần 4**.

---

## 2. Mô tả tổng quan

### 2.1 Bối cảnh của sản phẩm

Sản phẩm **SmartHire** là một nền tảng tuyển dụng trực tuyến độc lập, được nghiên cứu và phát triển trong khuôn khổ đề tài Niên luận ngành Kỹ thuật Phần mềm. Trong bối cảnh thị trường tuyển dụng hiện đại đòi hỏi tốc độ xử lý nhanh, tính chính xác cao và tối ưu hóa trải nghiệm hồ sơ, SmartHire ra đời nhằm giải quyết tình trạng thiếu chuẩn hóa trong tạo lập CV của ứng viên cũng như khối lượng công việc bóc tách, đánh giá hồ sơ thủ công từ phía nhà tuyển dụng.

Hệ thống hoạt động theo mô hình Web Application hiện đại, đóng vai trò là điểm kết nối trung tâm giữa ba đối tượng chính: Ứng viên, Nhà tuyển dụng và Quản trị viên. Ngoài các chức năng tuyển dụng truyền thống, SmartHire đóng vai trò là một giải pháp tích hợp các dịch vụ AI thông minh để hỗ trợ viết CV, chấm điểm độ phù hợp và phân tích khoảng trống kỹ năng.

> **[Ghi chú sơ đồ - System Context Diagram]:** _Khi chuyển sang tài liệu báo cáo chính thức hoặc Slide thuyết trình, chèn Sơ đồ Ngữ cảnh Hệ thống (System Context Diagram) biểu diễn hệ thống SmartHire ở trung tâm, kết nối với 3 Tác nhân chính (Ứng viên, Nhà tuyển dụng, Quản trị viên) và 2 Dịch vụ bên ngoài (Dịch vụ Cloudinary lưu trữ media/file PDF và Dịch vụ AI Agent Service xử lý ngôn ngữ tự nhiên)._

### 2.2 Các chức năng của sản phẩm

Tóm tắt các nhóm chức năng chính mà hệ thống SmartHire cung cấp cho người dùng bao gồm:

- **Phân hệ Quản lý Tài khoản & Phân quyền (Authentication & Authorization):** Cung cấp các chức năng đăng ký, đăng nhập xác thực qua JWT Token, quản lý phiên làm việc và phân quyền truy cập theo cơ chế RBAC cho 3 nhóm vai trò (Ứng viên, Nhà tuyển dụng, Quản trị viên).
- **Phân hệ Công cụ Tạo CV theo Mẫu (CV Builder Module):** Cung cấp công cụ cho phép ứng viên chọn mẫu CV, biên soạn chi tiết các phần thông tin CV, tùy chỉnh bố cục/màu sắc, xem trước theo thời gian thực và kết xuất file PDF chuẩn.
- **Phân hệ Nghiệp vụ Tuyển dụng & Ứng tuyển (Core Recruitment Module):** Cung cấp công cụ cho Nhà tuyển dụng đăng tin, quản lý tin tuyển dụng và theo dõi quy trình ứng tuyển; cho phép Ứng viên tìm kiếm/lọc công việc đa tiêu chí, thực hiện ứng tuyển trực tuyến và theo dõi tiến trình xử lý hồ sơ.
- **Phân hệ Quản trị Hệ thống (Admin Management Module):** Cho phép Quản trị viên kiểm duyệt tin tuyển dụng chống lừa đảo/spam, duyệt doanh nghiệp mới, khóa/mở tài khoản vi phạm, quản lý hệ thống danh mục (kỹ năng, địa điểm, ngành nghề) và xem báo cáo thống kê vận hành.
- **Phân hệ Tích hợp Trợ lý AI Thông minh (AI Integration Services Module):** Cung cấp Trợ lý AI hỗ trợ viết/tối ưu câu chữ trong CV, tự động trích xuất dữ liệu để chấm điểm độ tương thích CV và mô tả công việc, chỉ ra các kỹ năng còn thiếu và tự động đề xuất công việc phù hợp tới ứng viên.

> **[Ghi chú sơ đồ - Functional Decomposition Diagram]:** _Chèn Sơ đồ Use Case Tổng quan thể hiện mối liên hệ giữa các phân hệ chức năng trên._

### 2.3 Đặc điểm người sử dụng

Hệ thống SmartHire phục vụ ba nhóm người dùng chính với các đặc điểm, tần suất sử dụng và trình độ kỹ thuật khác nhau:

| Nhóm người dùng                         | Mức độ ưu tiên | Tần suất sử dụng                                | Trình độ kỹ thuật / Đặc điểm                                                                                                 | Quyền hạn trên hệ thống                                                                                            |
| :-------------------------------------- | :------------- | :---------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| **Ứng viên (Candidate)**                | Cao            | Thường xuyên (khi có nhu cầu tìm việc / tạo CV) | Trình độ tin học phổ thông đến nâng cao. Cần giao diện trực quan, dễ thao tác, hỗ trợ tạo CV nhanh và nhận gợi ý thông minh. | Quản lý CV cá nhân, tìm kiếm việc làm, ứng tuyển trực tuyến, sử dụng trợ lý AI và nhận đề xuất công việc.          |
| **Nhà tuyển dụng (Employer/Recruiter)** | Cao            | Hàng ngày / Hàng tuần                           | Trình độ tin học văn phòng. Cần công cụ quản lý tin đăng rõ ràng, bộ lọc ứng viên hiệu quả và quy trình duyệt ATS tiện lợi.  | Quản lý thông tin công ty, khởi tạo/chỉnh sửa JD, quản lý danh sách và thay đổi trạng thái hồ sơ ứng viên.         |
| **Quản trị viên (Admin)**               | Trung bình     | Định kỳ / Hàng ngày                             | Trình độ CNTT chuyên sâu. Cần các công cụ quản trị mạnh mẽ, chính xác để kiểm duyệt nội dung và giám sát toàn hệ thống.      | Toàn quyền kiểm duyệt doanh nghiệp/tin đăng, quản lý danh mục hệ thống, khóa/mở tài khoản và xem báo cáo thống kê. |

### 2.4 Môi trường vận hành

Hệ thống SmartHire được thiết kế để vận hành trên môi trường mạng Internet với các thông số môi trường phần cứng và phần mềm như sau:

- **Môi trường Phía Trình duyệt (Client-side):**
  - Trình duyệt web hiện đại hỗ trợ HTML5, CSS3, JavaScript ES6+ (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
  - Tương thích đa thiết bị (Máy tính để bàn, Laptop, Máy tính bảng, Điện thoại thông minh) nhờ thiết kế giao diện đáp ứng.
- **Môi trường Máy chủ Ứng dụng (Backend Server):**
  - Nền tảng thực thi: .NET 10 Runtime / C# ASP.NET Core Web API.
  - Môi trường đóng gói: Docker Containerization trên hệ điều hành Linux (Ubuntu Server) hoặc Windows Server.
- **Môi trường Cơ sở dữ liệu & Lưu trữ (Database & Storage):**
  - Hệ quản trị CSDL chính: PostgreSQL phiên bản 16 trở lên.
  - Dịch vụ lưu trữ tệp tin: Cloudinary API cho việc lưu trữ ảnh logo, avatar và các file PDF CV xuất bản.
- **Môi trường Dịch vụ AI (AI Services Engine):**
  - Dịch vụ AI Agents bên ngoài (OpenAI, Google Gemini,...) được tích hợp thông qua RESTful API để thực hiện các tác vụ xử lý ngôn ngữ tự nhiên, phân tích CV và tính toán Match Score.

### 2.5 Các ràng buộc về thực thi và thiết kế

Quá trình thiết kế và phát triển hệ thống SmartHire phải tuân thủ các ràng buộc kỹ thuật và nghiệp vụ sau:

- **Ràng buộc Công nghệ Bắt buộc:**
  - Frontend phải được xây dựng bằng ReactJS, TypeScript, TailwindCSS và các thư viện hỗ trợ.
  - Backend phải xây dựng bằng C# ASP.NET Core 10 Web API.
  - Cơ sở dữ liệu phải sử dụng PostgreSQL.
- **Ràng buộc về Thời gian phản hồi (Performance Constraint):**
  - Các thao tác truy vấn thông thường (xem danh sách việc làm, lọc dữ liệu) phải phản hồi dưới 500ms.
  - Thao tác xem trước CV (Live Preview) phải cập nhật ngay lập tức (< 100ms) ở phía Client.
  - Thao tác gọi AI Service (Phân tích CV, tính Match Score, đề xuất Skill Gap) phải hoàn tất và trả kết quả trong tối đa 3-5 giây.
- **Ràng buộc Bảo mật & An toàn:**
  - Mật khẩu người dùng bắt buộc phải mã hóa bằng thuật toán băm an toàn (BCrypt/Argon2) trước khi lưu vào cơ sở dữ liệu.
  - Mọi giao tiếp giữa Client và Server phải thực hiện qua giao thức mã hóa HTTPS.
  - File PDF CV ứng viên tải lên hệ thống để ứng tuyển bị giới hạn dung lượng tối đa là 5MB và chỉ chấp nhận định dạng `.pdf`.
- **Ràng buộc Giao diện:** Giao diện CV xuất ra file PDF phải giữ nguyên cấu trúc thiết kế, chuẩn phông chữ tiếng Việt không bị lỗi hiển thị khi mở trên các trình đọc PDF khác nhau.

### 2.6 Các giả định và phụ thuộc

Các yêu cầu đặc tả trong tài liệu này dựa trên các giả định và sự phụ thuộc vào các yếu tố bên ngoài sau đây:

- **Sự phụ thuộc vào Dịch vụ AI bên thứ ba:** Hệ thống phụ thuộc vào tính sẵn sàng, độ ổn định và hạn ngạch (quota) API từ các nhà cung cấp mô hình ngôn ngữ lớn (OpenAI, Google Gemini,...). Nếu dịch vụ AI bên ngoài gặp sự cố, tính năng chấm điểm AI và gợi ý viết CV sẽ tạm thời ngưng hoạt động mà không làm ảnh hưởng đến các chức năng tuyển dụng cơ bản khác.
- **Kết nối Mạng Internet:** Hệ thống giả định người dùng (Ứng viên, Nhà tuyển dụng, Admin) luôn có kết nối Internet ổn định để thực hiện các thao tác thời gian thực, tải dữ liệu CV và nhận thông báo qua SSE/WebSocket.
- **Tính chính xác của Dữ liệu đầu vào:** Giả định rằng thông tin do Nhà tuyển dụng cung cấp trong tin đăng (JD) và thông tin Ứng viên nhập trong CV là trung thực, giúp thuật toán phân tích Match Score của AI đạt hiệu quả chính xác nhất.
- **Sự phụ thuộc vào Dịch vụ Cloudinary:** Hệ thống phụ thuộc vào API của Cloudinary để tải lên và truy xuất file media/PDF.

---

## 3. Các yêu cầu giao tiếp bên ngoài

### 3.1 Giao diện người sử dụng

Giao diện người dùng của hệ thống **SmartHire** được thiết kế theo phong cách hiện đại, tối giản và thân thiện với trải nghiệm người dùng, đảm bảo tính tương thích đa thiết bị trên các màn hình Máy tính để bàn, Máy tính bảng và Điện thoại di động.

- **Quy chuẩn thiết kế chung và chủ đề:**
  - Sử dụng thư viện TailwindCSS để đồng bộ thiết kế về font chữ, bảng màu, khoảng cách và thành phần giao diện.
  - Tất cả các thao tác dữ liệu (thêm, sửa, xóa, gửi đơn) đều phải kèm theo phản hồi trực quan ngay lập tức cho người dùng qua hệ thống thông báo trạng thái ngay trên màn hình.
  - Mọi trường dữ liệu bắt buộc đều phải có đánh dấu rõ ràng bằng dấu sao đỏ (`*`) và kiểm tra tính hợp lệ ngay tại trình duyệt trước khi gửi lên máy chủ.

- **Giao diện dành cho Ứng viên:**
  - **Trình biên soạn CV:** Thiết kế theo mô hình chỉnh sửa trực tiếp trên giao diện tờ CV (WYSIWYG / Direct In-Place Editing). Ứng viên thao tác nhấp và nhập liệu văn bản trực tiếp ngay trên bản thiết kế CV trực quan thay vì nhập qua các biểu mẫu rời rạc. Thanh công cụ định dạng và nút kích hoạt Trợ lý AI (gợi ý viết lại, tối ưu câu chữ, chuẩn hóa từ khóa ngành) sẽ hiển thị linh hoạt dưới dạng ngữ cảnh (Contextual Floating Toolbar / Popover) ngay tại vị trí đoạn văn bản đang được chọn, hoặc nằm ở thanh bên.
  - **Tìm kiếm & Lọc việc làm:** Giao diện thanh tìm kiếm trung tâm kết hợp với bộ lọc nâng cao bên trái (ngành nghề, mức lương, kinh nghiệm, địa điểm). Kết quả tìm kiếm hiển thị dưới dạng danh sách các thẻ công việc kèm thông tin tổng quan.
  - **Gợi ý việc làm phù hợp:** Hệ thống sẽ cung cấp các gợi ý việc làm phù hợp với hồ sơ Ứng viên dựa trên các tiêu chí như kỹ năng, kinh nghiệm, và sở thích.
  - **Theo dõi Hồ sơ:** Giao diện bảng hoặc danh sách hiển thị toàn bộ lịch sử công việc đã ứng tuyển kèm các nhãn trạng thái có mã màu phân biệt (`Đã tiếp nhận`, `Mời phỏng vấn`, `Từ chối`).

- **Giao diện dành cho Nhà tuyển dụng:**
  - **Bảng điều khiển & Quản lý Tin đăng:** Cho phép xem danh sách các tin tuyển dụng đang mở, đã đóng hoặc chờ duyệt. Biểu mẫu tạo JD hỗ trợ trình soạn thảo văn bản giàu tính năng (Rich Text Editor) để mô tả công việc chuyên nghiệp.
  - **Quản lý Hồ sơ Ứng viên:** Giao diện phân loại danh sách hồ sơ ứng tuyển theo dạng cột tiến trình hoặc dạng danh sách tổng hợp. Cho phép nhà tuyển dụng xem chi tiết CV trực tiếp trên trình duyệt mà không cần tải file về máy.
  - **Tính năng Phân tích Match Score & Skill Gap:** Giao diện hiển thị điểm số tương thích CV với JD, thể hiện các kỹ năng còn thiếu so với yêu cầu công việc. Cho phép nhà tuyển dụng lọc hồ sơ theo mức độ phù hợp.

- **Giao diện dành cho Quản trị viên:**
  - Giao diện dạng Dashboard tối ưu cho việc duyệt dữ liệu tốc độ cao.
  - Các bảng quản lý tài khoản, doanh nghiệp và tin tuyển dụng được tích hợp bộ lọc nâng cao, phân trang và tính năng tác vụ hàng loạt.
  - Hỗ trợ giao diện cửa sổ bật lên bắt buộc nhập lý do khi thực hiện từ chối duyệt doanh nghiệp hoặc tin tuyển dụng.

### 3.2 Giao tiếp phần cứng

Hệ thống SmartHire là ứng dụng Web chạy trên nền tảng điện toán đám mây (Cloud-based Web Application), do đó không yêu cầu thiết bị phần cứng đặc thù từ phía người dùng cuối. Các yêu cầu giao tiếp phần cứng bao gồm:

- **Thiết bị Đầu cuối Người dùng:**
  - **Thiết bị:** Máy tính cá nhân (PC/Laptop), Máy tính bảng, hoặc Điện thoại thông minh có khả năng truy cập Internet.
  - **Độ phân giải màn hình hỗ trợ:** Tối thiểu 360px x 640px đối với Mobile; Tối ưu nhất ở độ phân giải Full HD (1920px x 1080px) đối với Desktop.
  - **Bộ nhớ RAM:** Tối thiểu 2GB RAM cho thiết bị di động và 4GB RAM cho máy tính để đảm bảo render giao diện Live Preview mượt mà.
  - **Bộ xử lý (CPU):** Tối thiểu 2 nhân CPU cho thiết bị di động và 4 nhân CPU cho máy tính để đảm bảo hiệu suất xử lý tốt.

- **Máy chủ Vận hành Hệ thống (Server Hardware):**
  - **Bộ xử lý (CPU):** Kiến trúc x86_64, tối thiểu 2 nhân CPU (Khuyến nghị 4 nhân CPU cho môi trường Production).
  - **Bộ nhớ RAM:** Tối thiểu 4GB RAM cho máy chủ Backend & Database (Khuyến nghị 8GB - 16GB RAM để xử lý tải khi có nhiều lượt đồng thời).
  - **Lưu trữ (Storage):** Ổ cứng SSD tối thiểu 30GB dung lượng trống cho việc cài đặt hệ điều hành, môi trường Docker, chứa CSDL PostgreSQL và lưu trữ tệp nhật ký hệ thống.

### 3.3 Giao tiếp phần mềm

Hệ thống SmartHire kết nối và giao tiếp với các thành phần phần mềm, thư viện và dịch vụ API bên ngoài theo cấu trúc sau:

- **Giao tiếp giữa Client (Frontend) và Server (Backend):**
  - **Thành phần:** Ứng dụng ReactJS giao tiếp với RESTful Web API xây dựng trên C# ASP.NET Core 10.
  - **Cơ chế:** Gửi/nhận dữ liệu thông qua các yêu cầu HTTP/HTTPS asynchronous sử dụng thư viện TanStack Query và Axios.

- **Giao tiếp giữa Backend và Cơ sở dữ liệu:**
  - **Thành phần:** ASP.NET Core Web API kết nối với Cơ sở dữ liệu PostgreSQL 16.
  - **Phương thức:** Sử dụng Entity Framework Core 10 thông qua kết nối chuỗi `NpgsqlConnection` bảo mật để thực thi các truy vấn CSDL và thao tác dữ liệu kiểu JSONB.

- **Giao tiếp giữa Backend và Dịch vụ AI:**
  - **Thành phần:** ASP.NET Core Backend kết nối với AI Service thông qua REST API.
  - **Phương thức:** Giao tiếp qua giao thức HTTP REST API nội bộ. Backend đóng gói nội dung CV/JD thành cấu trúc JSON gửi tới AI Service, AI Service xử lý ngữ nghĩa, tính toán Match Score và phản hồi kết quả định dạng JSON về Backend.

- **Giao tiếp với Các Dịch vụ Đám mây Bên ngoài:**
  - **Dịch vụ Lưu trữ Cloudinary:** Backend giao tiếp với Cloudinary API thông qua SDK chính thức để quản lý việc tải lên, lưu trữ và lấy URL công khai của logo công ty, ảnh đại diện và các tệp file PDF CV xuất bản.

### 3.4 Giao tiếp truyền thông

Các chuẩn giao thức và quy định truyền thông tin trên mạng giữa các thành phần của nền tảng SmartHire bao gồm:

- **Giao thức Mạng (Network Protocol):**
  - Tất cả các kết nối giữa trình duyệt web của người dùng và hệ thống bắt buộc sử dụng giao thức **HTTPS** mã hóa qua TLS 1.3 nhằm bảo mật tuyệt đối dữ liệu người dùng và thông tin cá nhân trong CV trên đường truyền.

- **Chuẩn Cấu trúc Dữ liệu API (REST API Standard):**
  - Dữ liệu trao đổi giữa Frontend và Backend sử dụng định dạng **JSON** với bảng mã UTF-8 chuẩn tiếng Việt.
  - Sử dụng đúng các mã trạng thái chuẩn của giao thức HTTP để phản hồi từ Server:
    - `200 OK`: Truy vấn hoặc cập nhật dữ liệu thành công.
    - `201 Created`: Khởi tạo tài khoản, tin tuyển dụng hoặc CV thành công.
    - `400 Bad Request`: Dữ liệu đầu vào không hợp lệ hoặc thiếu trường bắt buộc.
    - `401 Unauthorized`: Người dùng chưa xác thực hoặc Access Token (JWT) hết hạn.
    - `403 Forbidden`: Người dùng không có quyền (Role) truy cập vào tài nguyên.
    - `500 Internal Server Error`: Lỗi phát sinh hệ thống phía Server.

- **Xác thực và Truyền Authorization Header:**
  - Khi người dùng đăng nhập thành công, chuỗi Access Token (JWT) phải được đính kèm vào tất cả các yêu cầu HTTP bảo mật thông qua Header chuẩn:
    `Authorization: Bearer <JWT_ACCESS_TOKEN>`

- **Giao tiếp Thời gian thực:**
  - Sử dụng giao thức **SSE (Server-Sent Events)** hoặc **WebSocket** để đẩy các thông báo tức thì từ máy chủ về giao diện trình duyệt của người dùng (ví dụ: Thông báo trạng thái hồ sơ thay đổi, thông báo tin đăng được duyệt, hoặc phản hồi dạng dòng văn bản streaming từ AI Assistant).

---

## 4. Các tính năng của hệ thống

### 4.1 Phân hệ Quản lý Tài khoản & Phân quyền (Authentication & Authorization)

#### 4.1.1 Mô tả và mức độ ưu tiên

- **Mô tả:** Phân hệ cung cấp cơ chế đăng ký, đăng nhập và xác thực người dùng dựa trên chuẩn JWT kết hợp băm mật khẩu an toàn. Hệ thống thực hiện phân quyền theo vai trò đối với 3 nhóm người dùng: Ứng viên, Nhà tuyển dụng và Quản trị viên.
- **Mức độ ưu tiên:** Cao
- **Đánh giá tiêu chí:** Lợi ích: 9/9 | Chi phí: 3/9 | Rủi ro: 7/9

#### 4.1.2 Tác nhân và Chuỗi đáp ứng

- **Tác nhân:** Ứng viên, Nhà tuyển dụng, Quản trị viên.
- **Chuỗi đáp ứng:**
  - _Kích thích:_ Người dùng chọn đăng ký tài khoản và gửi thông tin đăng ký (Email, Số điện thoại, Mật khẩu, Họ tên, Vai trò).
    _Đáp ứng:_ Hệ thống kiểm tra trùng lặp email, số điện thoại, mã hóa mật khẩu, khởi tạo tài khoản mới với vai trò tương ứng và trả về thông báo thành công.
  - _Kích thích:_ Người dùng nhập Email và Mật khẩu để đăng nhập.
    _Đáp ứng:_ Hệ thống kiểm tra thông tin, cấp cặp token bao gồm Access Token và Refresh Token, sau đó điều hướng người dùng đến giao diện tương ứng với vai trò.
  - _Kích thích:_ Người dùng gửi yêu cầu truy cập tới tài nguyên/API bảo mật.
    _Đáp ứng:_ Hệ thống kiểm tra tính hợp lệ và thời hạn của JWT Token kèm theo vai trò truy cập, nếu hợp lệ thì cho phép thực thi, ngược lại thì từ chối truy cập.
  - _Kích thích:_ Người dùng chọn Đăng xuất.
    _Đáp ứng:_ Hệ thống hủy phiên làm việc, thu hồi Refresh Token và xóa Token được lưu ở phía Client.

#### 4.1.3 Các yêu cầu chức năng

- **REQ-AUTH-01 (Đăng ký tài khoản Ứng viên):** Hệ thống phải cho phép người dùng khách đăng ký tài khoản Ứng viên bằng Email, số điện thoại, Mật khẩu và Họ tên.
- **REQ-AUTH-02 (Đăng ký tài khoản Nhà tuyển dụng):** Hệ thống phải cho phép người dùng khách đăng ký tài khoản Nhà tuyển dụng bằng Email, Mật khẩu, Họ tên và thông tin Tên công ty ban đầu.
- **REQ-AUTH-03 (Xác thực đăng nhập JWT):** Hệ thống phải xác thực người dùng dựa trên Email/Mật khẩu và phát hành JWT Token chứa thông tin định danh và vai trò (Role Claims) sau khi xác thực thành công.
- **REQ-AUTH-04 (Mã hóa mật khẩu):** Hệ thống phải mã hóa tất cả mật khẩu người dùng bằng giải thuật băm an toàn (BCrypt hoặc Argon2) trước khi lưu trữ vào CSDL.
- **REQ-AUTH-05 (Phân quyền người dùng - RBAC):** Hệ thống phải kiểm tra và giới hạn quyền truy cập API/chức năng dựa trên 3 nhóm vai trò: Ứng viên, Nhà tuyển dụng, Quản trị viên.
- **REQ-AUTH-06 (Cấp lại Token / Refresh Token):** Hệ thống phải cung cấp cơ chế Refresh Token cho phép duy trì phiên đăng nhập của người dùng một cách an toàn mà không bắt người dùng đăng nhập lại liên tục khi Access Token hết hạn.
- **REQ-AUTH-07 (Đăng xuất & Quản lý phiên):** Hệ thống phải cho phép người dùng đăng xuất và vô hiệu hóa Token ở phía Server/Client.
- **REQ-AUTH-08 (Xử lý lỗi xác thực và phân quyền):**
  - Nếu Email đã tồn tại khi đăng ký, hệ thống phải trả về thông báo lỗi "Email này đã được sử dụng".
  - Nếu thông tin đăng nhập sai, hệ thống phải trả về phản hồi chung "Tài khoản hoặc mật khẩu không chính xác" để đảm bảo tính bảo mật.
  - Nếu Token hết hạn hoặc không hợp lệ, hệ thống phải trả về mã lỗi `401 Unauthorized`.
  - Nếu người dùng truy cập vào chức năng không thuộc thẩm quyền của vai trò, hệ thống phải trả về mã lỗi `403 Forbidden`.

---

### 4.2 Phân hệ Công cụ Tạo CV theo Mẫu (CV Builder Module)

#### 4.2.1 Mô tả và mức độ ưu tiên

- **Mô tả:** Phân hệ cung cấp công cụ tương tác theo mô hình chỉnh sửa trực tiếp trên tờ CV. Cho phép ứng viên lựa chọn các mẫu CV chuyên nghiệp, biên soạn nội dung hồ sơ (thông tin cá nhân, mục tiêu, kinh nghiệm, học vấn, kỹ năng, dự án), xem trước sự thay đổi theo thời gian thực và kết xuất CV dưới dạng file PDF chuẩn.
- **Mức độ ưu tiên:** Cao
- **Đánh giá tiêu chí:** Lợi ích: 8/9 | Chi phí: 4/9 | Rủi ro: 4/9

#### 4.2.2 Tác nhân và Chuỗi đáp ứng

- **Tác nhân:** Ứng viên.
- **Chuỗi đáp ứng:**
  - _Kích thích:_ Ứng viên truy cập danh mục mẫu CV và chọn một Template mong muốn.
    _Đáp ứng:_ Hệ thống tải cấu trúc mẫu thiết kế và hiển thị giao diện tương ứng.
  - _Kích thích:_ Ứng viên nhấp trực tiếp vào các vùng văn bản trên CV để nhập, chỉnh sửa, thêm hoặc xóa nội dung (Thông tin cá nhân, Kinh nghiệm, Học vấn, Kỹ năng, Dự án,...).
    _Đáp ứng:_ Hệ thống cập nhật và phản hồi trực quan trên màn hình ngay lập tức theo thời gian thực.
  - _Kích thích:_ Ứng viên chọn lưu hồ sơ.
    _Đáp ứng:_ Hệ thống kiểm tra dữ liệu đầu vào và lưu trữ thông tin CV dưới dạng cấu trúc dữ liệu JSON vào CSDL.
  - _Kích thích:_ Ứng viên chọn "Xuất bản / Tải PDF".
    _Đáp ứng:_ Hệ thống chuyển đổi nội dung CV hiện tại thành định dạng file PDF, lưu lên lưu trữ đám mây và yêu cầu trình duyệt tải xuống file PDF.

#### 4.2.3 Các yêu cầu chức năng

- **REQ-CV-01 (Quản lý & Chọn Template CV):** Hệ thống phải hiển thị danh sách các mẫu CV có sẵn kèm theo hình ảnh xem trước (thumbnail) để ứng viên lựa chọn.
- **REQ-CV-02 (Biên soạn Thông tin cá nhân & Mục tiêu):** Hệ thống phải cho phép ứng viên nhập và cập nhật trực tiếp: Họ tên, Chức danh công việc, Email, Số điện thoại, Địa chỉ, Liên kết cá nhân (LinkedIn, GitHub, Portfolio) và Mục tiêu nghề nghiệp.
- **REQ-CV-03 (Biên soạn Kinh nghiệm làm việc & Học vấn):** Hệ thống phải cho phép ứng viên thêm, sửa, xóa, sắp xếp thứ tự danh sách Kinh nghiệm làm việc (Tên công ty, Vị trí, Thời gian, Mô tả chi tiết) và Trình độ học vấn (Tên trường, Chuyên ngành, Thời gian, Bằng cấp, GPA).
- **REQ-CV-04 (Biên soạn Kỹ năng & Dự án):** Hệ thống phải cho phép ứng viên thêm, sửa, xóa danh sách Kỹ năng (phân loại kỹ năng chuyên môn, kỹ năng mềm, mức độ thông thạo) và các Dự án cá nhân/thực tế đã tham gia (Tên dự án, Vị trí, Mô tả, Công nghệ sử dụng, Link demo).
- **REQ-CV-05 (Xem trước theo thời gian thực - Real-time Live Preview):** Hệ thống phải cập nhật nội dung xem trước trên giao diện mẫu CV ngay khi người dùng thao tác nhập liệu trực tiếp mà không cần tải lại trang.
- **REQ-CV-06 (Lưu & Quản lý danh sách CV):** Hệ thống phải cho phép ứng viên lưu bản nháp, tạo nhiều phiên bản CV khác nhau và quản lý danh sách CV đã tạo trong tài khoản cá nhân.
- **REQ-CV-07 (Xuất CV dạng PDF):** Hệ thống phải cho phép biên dịch dữ liệu CV thành file PDF có định dạng chuẩn, giữ nguyên kiểu dáng, phông chữ và định dạng giao diện đã chọn để người dùng tải xuống hoặc nộp trực tiếp.
- **REQ-CV-08 (Xử lý lỗi và dữ liệu nhập không hợp lệ):**
  - Nếu ứng viên bỏ trống các trường bắt buộc (ví dụ: Họ tên, Email liên hệ), hệ thống phải hiển thị cảnh báo ngay tại trường dữ liệu tương ứng.
  - Nếu quá trình xuất file PDF gặp lỗi, hệ thống phải trả về thông báo "Không thể tạo file PDF, vui lòng thử lại" và giữ nguyên dữ liệu đang soạn thảo.
- **REQ-CV-09 (Tùy chỉnh bố cục):** Hệ thống phải cho phép ứng viên thay đổi thứ tự hiển thị các mục thông tin trong CV (ví dụ: Kinh nghiệm, Học vấn, Kỹ năng) bằng cách thao tác di chuyển trực tiếp và cập nhật trực quan trên canvas.
- **REQ-CV-10 (Tùy chỉnh Thiết kế và Font):** Hệ thống phải cho phép ứng viên tùy chỉnh màu sắc, font chữ và bố cục của mẫu CV đã chọn để phù hợp với phong cách cá nhân mà vẫn đảm bảo tính chuyên nghiệp.
- **REQ-CV-11 (Cấu hình Trạng thái Hiển thị CV - Public/Private):** Hệ thống phải cho phép ứng viên chủ động bật/tắt trạng thái hiển thị cho từng bản CV đã tạo giữa hai chế độ: Public (Công khai tìm việc) và Private (Riêng tư - mặc định).

---

### 4.3 Phân hệ Nghiệp vụ Tuyển dụng & Ứng tuyển (Core Recruitment Module)

#### 4.3.1 Mô tả và mức độ ưu tiên

- **Mô tả:** Phân hệ nghiệp vụ cốt lõi quản lý toàn bộ quy trình tuyển dụng và ứng tuyển giữa Nhà tuyển dụng và Ứng viên. Cho phép Nhà tuyển dụng khởi tạo, quản lý tin tuyển dụng và theo dõi tiến trình xử lý hồ sơ ứng viên. Cho phép Ứng viên tìm kiếm, lọc việc làm đa tiêu chí, thực hiện ứng tuyển trực tuyến và theo dõi trạng thái hồ sơ của mình.
- **Mức độ ưu tiên:** Cao
- **Đánh giá tiêu chí:** Lợi ích: 9/9 | Chi phí: 5/9 | Rủi ro: 5/9

#### 4.3.2 Tác nhân và Chuỗi đáp ứng

- **Tác nhân:** Ứng viên, Nhà tuyển dụng.
- **Chuỗi đáp ứng:**
  - _Kích thích:_ Nhà tuyển dụng nhập thông tin và xuất bản tin tuyển dụng mới (với mức lương, địa điểm, kỹ năng yêu cầu, hạn nộp,...).
    _Đáp ứng:_ Hệ thống ghi nhận tin tuyển dụng, chuyển sang trạng thái chờ duyệt và lưu vào cơ sở dữ liệu.
  - _Kích thích:_ Ứng viên thiết lập các tiêu chí lọc (từ khóa, ngành nghề, vị trí, địa điểm, khoảng lương) và bấm tìm kiếm.
    _Đáp ứng:_ Hệ thống truy vấn CSDL và hiển thị danh sách các tin tuyển dụng thỏa mãn điều kiện lọc.
  - _Kích thích:_ Ứng viên chọn một công việc, lựa chọn CV đã tạo trên hệ thống (hoặc tải lên file PDF) và bấm "Ứng tuyển".
    _Đáp ứng:_ Hệ thống lưu hồ sơ ứng tuyển, gửi thông báo tới Nhà tuyển dụng và ghi nhận vào lịch sử ứng tuyển của Ứng viên.
  - _Kích thích:_ Nhà tuyển dụng xem danh sách hồ sơ ứng tuyển của một JD và thực hiện chuyển trạng thái (`Đã tiếp nhận` → `Mời phỏng vấn` / `Từ chối`).
    _Đáp ứng:_ Hệ thống cập nhật trạng thái ứng tuyển trong CSDL và phát thông báo thời gian thực tới Ứng viên.

#### 4.3.3 Các yêu cầu chức năng

- **REQ-REC-01 (Tạo & Quản lý Tin tuyển dụng):** Hệ thống phải cho phép Nhà tuyển dụng tạo mới, cập nhật thông tin, ẩn/hiện hoặc đóng các tin tuyển dụng (JD).
- **REQ-REC-02 (Cấu hình Chi tiết Tin tuyển dụng):** Hệ thống phải bắt buộc Nhà tuyển dụng thiết lập các tiêu chí chi tiết khi tạo JD bao gồm: Tên vị trí, ngành nghề, cấp bậc (Intern, Junior, Senior,...), địa điểm làm việc, hình thức làm việc, khoảng lương (hoặc Thỏa thuận), danh sách kỹ năng yêu cầu, mô tả công việc và hạn nộp hồ sơ.
- **REQ-REC-03 (Tìm kiếm & Lọc Việc làm đa tiêu chí):** Hệ thống phải cung cấp bộ lọc cho Ứng viên tìm kiếm việc làm theo từ khóa, ngành nghề, địa điểm, mức lương, cấp bậc và hình thức làm việc.
- **REQ-REC-04 (Ứng tuyển Trực tuyến với CV SmartHire hoặc File PDF):** Hệ thống phải cho phép Ứng viên lựa chọn ứng tuyển bằng CV đã khởi tạo trực tiếp trên hệ thống hoặc tải file CV dạng PDF từ thiết bị cá nhân.
- **REQ-REC-05 (Giới hạn Đăng ký / Ứng tuyển trùng lặp):** Hệ thống phải ngăn chặn và thông báo lỗi nếu Ứng viên thực hiện nộp hồ sơ nhiều lần cho cùng một tin tuyển dụng đang mở.
- **REQ-REC-06 (Theo dõi Trạng thái Hồ sơ - Phía Ứng viên):** Hệ thống phải cung cấp cho Ứng viên giao diện xem lịch sử các công việc đã ứng tuyển kèm theo trạng thái xử lý hiện tại từ phía Nhà tuyển dụng.
- **REQ-REC-07 (Quản lý Hồ sơ Ứng tuyển - Phía Nhà tuyển dụng):** Hệ thống phải cho phép Nhà tuyển dụng xem danh sách ứng viên đã nộp hồ sơ theo từng tin tuyển dụng, mở xem nội dung CV trực tuyến và tải về.
- **REQ-REC-08 (Cập nhật Quy trình Tuyển dụng):** Hệ thống phải cho phép Nhà tuyển dụng cập nhật tiến trình hồ sơ của ứng viên theo các bước: `Đã tiếp nhận` → `Đã duyệt / Mời phỏng vấn` → `Từ chối`.
- **REQ-REC-09 (Xử lý lỗi & Điều kiện biên):**
  - Nếu tin tuyển dụng đã quá hạn nộp hồ sơ hoặc bị đóng, hệ thống phải tự động khóa nút "Ứng tuyển" và thông báo cho Ứng viên.
  - Nếu file CV PDF ứng viên tải lên vượt quá dung lượng quy định (ví dụ: > 5MB) hoặc sai định dạng, hệ thống phải hiển thị thông báo lỗi và ngắt quá trình ứng tuyển.

---

### 4.4 Phân hệ Quản trị Hệ thống (Admin Management Module)

#### 4.4.1 Mô tả và mức độ ưu tiên

- **Mô tả:** Phân hệ cung cấp các công cụ quản trị tập trung dành cho Quản trị viên nhằm kiểm duyệt nội dung tin đăng, quản lý thông tin doanh nghiệp, khóa/mở tài khoản người dùng, quản lý hệ thống danh mục chung (kỹ năng, ngành nghề, mẫu CV) và theo dõi các chỉ số thống kê, báo cáo hiệu suất vận hành của nền tảng SmartHire.
- **Mức độ ưu tiên:** Cao
- **Đánh giá tiêu chí:** Lợi ích: 8/9 | Chi phí: 4/9 | Rủi ro: 6/9

#### 4.4.2 Tác nhân và Chuỗi đáp ứng

- **Tác nhân:** Quản trị viên.
- **Chuỗi đáp ứng:**
  - _Kích thích:_ Quản trị viên xem danh sách Doanh nghiệp mới đăng ký và thực hiện duyệt hoặc từ chối thông tin xác thực.
    _Đáp ứng:_ Hệ thống cập nhật trạng thái xác thực của doanh nghiệp và gửi email/thông báo kết quả tới Nhà tuyển dụng.
  - _Kích thích:_ Quản trị viên kiểm tra danh sách Tin tuyển dụng mới tạo và chọn "Duyệt" hoặc "Từ chối".
    _Đáp ứng:_ Hệ thống chuyển trạng thái tin tuyển dụng sang công khai hoặc bị từ chối (kèm lý do) và phản hồi cho Nhà tuyển dụng.
  - _Kích thích:_ Quản trị viên thực hiện thao tác Thêm / Sửa / Xóa trong các danh mục hệ thống (Ngành nghề, Địa điểm, Kỹ năng, Template CV).
    _Đáp ứng:_ Hệ thống lưu cập nhật vào CSDL và đồng bộ dữ liệu danh mục hiển thị trên toàn ứng dụng.
  - _Kích thích:_ Quản trị viên phát hiện người dùng vi phạm và chọn "Khóa tài khoản".
    _Đáp ứng:_ Hệ thống thu hồi toàn bộ Token truy cập hiện tại của người dùng đó, đổi trạng thái tài khoản thành bị khóa và từ chối mọi yêu cầu đăng nhập tiếp theo.
  - _Kích thích:_ Quản trị viên mở trang Dashboard Báo cáo & Thống kê.
    _Đáp ứng:_ Hệ thống tính toán, tổng hợp dữ liệu từ CSDL và hiển thị biểu đồ thông số tổng quan về người dùng, công việc và lượt ứng tuyển.

#### 4.4.3 Các yêu cầu chức năng

- **REQ-ADM-01 (Quản lý & Kiểm duyệt Doanh nghiệp):** Hệ thống phải cho phép Quản trị viên xem thông tin chi tiết, kiểm tra tính xác thực và phê duyệt/từ chối tài khoản Nhà tuyển dụng mới đăng ký.
- **REQ-ADM-02 (Quản lý & Khóa Tài khoản Vi phạm):** Hệ thống phải cho phép Quản trị viên tìm kiếm, theo dõi danh sách tất cả người dùng (Ứng viên, Nhà tuyển dụng) và thực hiện khóa hoặc khôi phục quyền hoạt động của tài khoản.
- **REQ-ADM-03 (Duyệt Tin tuyển dụng chống Spam/Lừa đảo):** Hệ thống phải cung cấp giao diện cho Quản trị viên kiểm duyệt nội dung các tin tuyển dụng trước khi hiển thị công khai trên nền tảng nhằm tránh thông tin sai sự thật hoặc gian lận.
- **REQ-ADM-04 (Quản lý Danh mục Ngành nghề & Địa điểm):** Hệ thống phải cho phép Quản trị viên khởi tạo, chỉnh sửa và quản lý cấu trúc danh mục Ngành nghề chuyên môn và Tỉnh/Thành phố/Địa điểm làm việc.
- **REQ-ADM-05 (Quản lý Danh mục Kỹ năng chuẩn hóa):** Hệ thống phải cho phép Quản trị viên bổ sung, chỉnh sửa danh sách Kỹ năng (Skill set) dùng chung cho toàn bộ hệ thống để phục vụ tìm kiếm và xử lý AI.
- **REQ-ADM-06 (Quản lý CV Templates):** Hệ thống phải cho phép Quản trị viên quản lý danh sách các mẫu thiết kế CV (CV Templates), bật/tắt hoặc tải lên cấu trúc Template CV mới.
- **REQ-ADM-07 (Thống kê & Báo cáo Vận hành):** Hệ thống phải cung cấp giao diện Dashboard báo cáo chi tiết về số lượng người dùng mới, tin tuyển dụng mở và lượt ứng tuyển thành công.
- **REQ-ADM-08 (Xử lý lỗi và Ràng buộc Dữ liệu Quản trị):**
  - Trường hợp Quản trị viên từ chối duyệt doanh nghiệp hoặc tin tuyển dụng, hệ thống bắt buộc phải nhập lý do từ chối để thông báo cho người dùng liên quan.
  - Không cho phép xóa cứng (Hard Delete) các mục danh mục (Kỹ năng, Ngành nghề) đã có liên kết dữ liệu với CV hoặc Tin tuyển dụng đang hoạt động; hệ thống phải chuyển sang cơ chế ẩn/tắt hoạt động (Soft Delete / Inactive).

---

### 4.5 Phân hệ Tích hợp Trợ lý AI Thông minh (AI Integration Services Module)

#### 4.5.1 Mô tả và mức độ ưu tiên

- **Mô tả:** Phân hệ tích hợp các dịch vụ trí tuệ nhân tạo tiên tiến nhằm hỗ trợ tối ưu hóa quy trình viết CV, phân tích mức độ phù hợp giữa ứng viên và công việc, đồng thời tự động đề xuất công việc phù hợp. Phân hệ bao gồm các tính năng chính: Trợ lý viết CV, Phân tích & Chấm điểm hồ sơ, và Gợi ý việc làm thông minh.
- **Mức độ ưu tiên:** Cao
- **Đánh giá tiêu chí:** Lợi ích: 9/9 | Chi phí: 9/9 | Rủi ro: 9/9

#### 4.5.2 Tác nhân và Chuỗi đáp ứng

- **Tác nhân:** Ứng viên, Nhà tuyển dụng.
- **Chuỗi đáp ứng:**
  - _Kích thích:_ Ứng viên đang soạn thảo CV trên trình chỉnh sửa và chọn tính năng "Gợi ý từ AI" tại thanh công cụ .
    _Đáp ứng:_ Hệ thống gửi đoạn văn bản hiện tại tới AI Service; dịch vụ AI xử lý ngữ nghĩa và trả về câu gợi ý đã được chuẩn hóa theo từ khóa chuyên ngành giúp mô tả công việc chuyên nghiệp hơn.
  - _Kích thích:_ Ứng viên (hoặc Nhà tuyển dụng) chọn "Phân tích độ phù hợp AI" giữa một CV và một tin tuyển dụng cụ thể.
    _Đáp ứng:_ AI Service tự động trích xuất ngữ nghĩa từ CV và JD, tính toán điểm % phù hợp, thực hiện phân tích khoảng trống kỹ năng và hiển thị danh sách kỹ năng thiếu kèm nhận xét chi tiết.
  - _Kích thích:_ Ứng viên truy cập Dashboard cá nhân hoặc hệ thống chạy tác vụ quét định kỳ.
    _Đáp ứng:_ Hệ thống phân tích toàn bộ hồ sơ CV của ứng viên, so sánh với danh sách các tin tuyển dụng đang mở và tự động hiển thị/gửi thông báo các việc làm có độ tương thích cao nhất.

#### 4.5.3 Các yêu cầu chức năng

- **REQ-AI-01 (Trợ lý Viết CV - Gợi ý từ AI):** Hệ thống phải cung cấp tính năng gợi ý từ AI để giúp ứng viên viết CV chuyên nghiệp hơn ngay trong quá trình biên soạn.
- **REQ-AI-02 (Trợ lý Viết CV - Tối ưu hóa văn bản & Từ khóa ngành):** Hệ thống phải cho phép ứng viên gửi đoạn văn mô tả kinh nghiệm/dự án để AI gợi ý viết lại chuyên nghiệp hơn và tự động bổ sung từ khóa chuẩn hóa theo ngành nghề.
- **REQ-AI-03 (Trích xuất Ngữ nghĩa Dữ liệu CV & JD):** Hệ thống phải tự động bóc tách và phân tích ngữ nghĩa (Semantic Parsing) từ nội dung CV của ứng viên và Mô tả công việc (JD) của nhà tuyển dụng.
- **REQ-AI-04 (Tính toán & Chấm điểm, phân tích Khoảng trống Kỹ năng):** Hệ thống phải tự động tính toán và trả về điểm số độ phù hợp dưới dạng tỷ lệ phần trăm (%) giữa CV ứng viên và JD yêu cầu; đồng thời phân tích và đưa ra danh sách các kỹ năng/yêu cầu mà ứng viên còn thiếu so với JD, kèm theo nhận xét chi tiết và lời khuyên cải thiện.
- **REQ-AI-05 (Gợi ý Việc làm Thông minh - AI Job Recommendation):** Hệ thống phải phân tích toàn bộ các bản CV của ứng viên (không phân biệt trạng thái Public hay Private) để tính toán độ tương thích và tự động gợi ý danh sách việc làm phù hợp nhất trên Dashboard cá nhân của ứng viên đó.
- **REQ-AI-06 (Xử lý Ngoại lệ & Lỗi dịch vụ AI):** Khi dịch vụ AI bị quá tải, phản hồi chậm hoặc lỗi kết nối API, hệ thống phải giữ nguyên nội dung dữ liệu hiện tại của người dùng và hiển thị thông báo "Dịch vụ AI đang bận, vui lòng thử lại sau".

---

## 5. Các yêu cầu phi chức năng

### 5.1 Yêu cầu thực thi

Các yêu cầu về hiệu năng và khả năng xử lý của hệ thống **SmartHire** bao gồm:

- **Thời gian phản hồi API (API Response Time):**
  - Các thao tác truy vấn dữ liệu chuẩn (đọc danh sách công việc, lọc ứng viên, lấy thông tin cá nhân) phải phản hồi dưới **200ms** trong điều kiện tải bình thường.
  - Thao tác cập nhật và xem trước dữ liệu CV trên giao diện trực quan phải phản hồi dưới **100ms** phía Client để đảm bảo trải nghiệm tức thì.
  - Thao tác xuất file PDF CV phải hoàn tất và sẵn sàng đường dẫn tải về trong tối đa **10 giây**.
- **Thời gian xử lý Dịch vụ AI (AI Performance):**
  - Thời gian phản hồi từ AI Agent Service cho các tác vụ gợi ý viết CV, phân tích điểm tương thích và phân tích khoảng trống kỹ năng không vượt quá **3 - 5 giây**.
- **Khả năng chịu tải (Concurrency & Throughput):**
  - Hệ thống phải đáp ứng tốt tối thiểu **100 người dùng hoạt động đồng thời (concurrent active users)** trên giao diện web mà không làm tăng thời gian phản hồi API quá 50%.
  - Cơ sở dữ liệu PostgreSQL phải tối ưu hóa đánh chỉ mục để xử lý tối thiểu 1.000 truy vấn tìm kiếm/lọc việc làm mỗi phút.

### 5.2 Yêu cầu an toàn

Đảm bảo an toàn dữ liệu và tính liên tục trong vận hành hệ thống:

- **Sao lưu và Phục hồi Dữ liệu:**
  - Cơ sở dữ liệu PostgreSQL phải được thiết lập cơ chế tự động sao lưu định kỳ.
  - Trong trường hợp xảy ra sự cố máy chủ, thời gian phục hồi hệ thống không vượt quá 2 giờ và lượng dữ liệu tối đa bị ảnh hưởng không quá 24 giờ.
- **Tính Toàn vẹn Dữ liệu:**
  - Sử dụng giao dịch cơ sở dữ liệu cho tất cả các thao tác ứng tuyển và cập nhật trạng thái hồ sơ nhằm đảm bảo nguyên tắc nguyên tố - Atomicity (không để xảy ra tình trạng hồ sơ lưu nửa chừng).
- **Cơ chế Giảm cấp Tối thiểu:**
  - Khi dịch vụ AI bên ngoài gặp sự cố hoặc quá tải, hệ thống phải giữ nguyên toàn bộ dữ liệu CV đang soạn thảo của ứng viên, hiển thị thông báo lỗi thân thiện và cho phép người dùng tiếp tục các thao tác tuyển dụng thông thường mà không gây đơ/treo ứng dụng.

### 5.3 Yêu cầu bảo mật

Hệ thống **SmartHire** tuân thủ các tiêu chuẩn bảo mật phần mềm hiện đại nhằm bảo vệ thông tin cá nhân và dữ liệu tuyển dụng:

- **Xác thực & Phân quyền:**
  - Mật khẩu người dùng bắt buộc phải mã hóa bằng thuật toán băm an toàn (BCrypt hoặc Argon2) kèm chuỗi Salt trước khi lưu trữ vào CSDL; tuyệt đối không lưu mật khẩu dạng văn bản thuần (Plaintext).
  - Xác thực qua chuỗi JWT Token có thời hạn sống ngắn (Access Token hết hạn sau 15-30 phút, Refresh Token lưu bảo mật) và bắt buộc kiểm tra quyền tại mọi Endpoints bảo mật phía Backend.
- **Bảo mật Truyền tải:**
  - Bắt buộc mã hóa toàn bộ lưu lượng mạng giữa Client, Backend Server và AI Services qua giao thức HTTPS (TLS 1.3).
- **Chống các Lỗ hổng Bảo mật Web Phổ biến:**
  - **SQL Injection:** Sử dụng Entity Framework Core 10 với tham số hóa truy vấn cho mọi thao tác CSDL PostgreSQL.
  - **XSS (Cross-Site Scripting):** Tự động lọc và làm sạch toàn bộ dữ liệu đầu vào chứa HTML/Script từ người dùng trước khi render lên giao diện ReactJS.
  - **CORS (Cross-Origin Resource Sharing):** Cấu hình chính xác chính sách CORS phía ASP.NET Core, chỉ cho phép các Domain được ủy quyền gửi yêu cầu API.
- **Quyền Tự do Cá nhân & Quyền Riêng tư:**
  - Dữ liệu CV của ứng viên chỉ hiển thị công khai cho Nhà tuyển dụng đối với đúng công việc mà ứng viên đó đã bấm chọn "Ứng tuyển". Nhà tuyển dụng không thể tự ý truy cập CV cá nhân của ứng viên khác chưa nộp hồ sơ.

### 5.4 Các đặc điểm chất lượng phần mềm

Các chỉ số chất lượng tiêu chuẩn đảm bảo độ tin cậy của ứng dụng SmartHire:

- **Tính dễ sử dụng:**
  - Giao diện người dùng thiết kế hiện đại, nhất quán theo chuẩn TailwindCSS; thời gian để người dùng mới làm quen và khởi tạo hoàn chỉnh một CV bằng trình biên soạn không quá 20 phút.
  - Tất cả các thao tác quan trọng (xóa CV, hủy tin đăng, khóa tài khoản) đều phải hiển thị hộp thoại xác nhận trước khi thực thi.
- **Tính sẵn sàng:**
  - Hệ thống đạt chỉ số sẵn sàng vận hành tối thiểu **99.5%** thời gian trong tháng (24/7), ngoại trừ các khoảng thời gian bảo trì hệ thống được thông báo trước.
- **Tính dễ bảo trì & Mở rộng:**
  - Mã nguồn Backend (C# ASP.NET Core 10) được cấu trúc theo mô hình Clean Architecture / Layered Architecture giúp dễ dàng nâng cấp và bảo trì.
  - Hệ thống đóng gói dạng Docker Containers cho phép mở rộng quy mô các instance Backend hoặc AI Agents một cách linh hoạt khi lưu lượng truy cập tăng cao.
- **Tính khả chuyển:**
  - Phân hệ Web Client ReactJS có khả năng chạy tương thích 100% trên tất cả các trình duyệt phổ biến hiện nay (Chrome, Edge, Firefox, Safari) mà không bị lỗi vỡ giao diện hay sai lệch bố cục CV.

### 5.5 Các quy tắc nghiệp vụ

Tập hợp các quy tắc cốt lõi điều hướng các luồng xử lý trên nền tảng SmartHire:

- **BR-01 (Quy tắc Xác minh Doanh nghiệp & Duyệt JD):** Nhà tuyển dụng mới đăng ký phải được Quản trị viên duyệt hồ sơ doanh nghiệp hoặc duyệt nội dung tin đăng trước khi tin tuyển dụng đó được hiển thị công khai trên nền tảng.
- **BR-02 (Quy tắc Ứng tuyển Đơn):** Mỗi tài khoản Ứng viên chỉ được phép nộp 01 hồ sơ ứng tuyển (dùng CV SmartHire hoặc File PDF tải lên) cho cùng 01 tin tuyển dụng đang mở trong một thời điểm.
- **BR-03 (Quy tắc Tự động Đóng Tin tuyển dụng):** Tin tuyển dụng sẽ tự động chuyển sang trạng thái "Đã hết hạn" và khóa nút nộp hồ sơ khi thời gian hiện tại vượt quá Hạn nộp hồ sơ do Nhà tuyển dụng cấu hình.
- **BR-04 (Quy tắc Chấm điểm Match Score AI):** Điểm tương thích (%) và nhận xét Skill Gap Analysis chỉ được tính toán khi cả CV ứng viên và JD tuyển dụng có đầy đủ thông tin kỹ năng và mô tả công việc.
- **BR-05 (Quy tắc Xóa mềm Danh mục - Soft Delete):** Không cho phép xóa vĩnh viễn các danh mục Kỹ năng hoặc Ngành nghề đã có liên kết với CV hoặc Tin tuyển dụng đang tồn tại trong hệ thống; bắt buộc chuyển về trạng thái ngưng hoạt động (`Inactive` / `Soft Delete`).
- **BR-06 (Quy tắc Quyền riêng tư CV):**
  - Phía Ứng viên: Mọi CV (dù Public hay Private) đều được hệ thống tạo Vector Embedding nội bộ nhằm mục đích duy nhất là cá nhân hóa và đề xuất công việc cho chính ứng viên đó.
  - Phía Nhà tuyển dụng: Chỉ có thể truy cập CV của ứng viên khi ứng viên đó đã bấm "Ứng tuyển" vào tin tuyển dụng của doanh nghiệp đó, hoặc những CV có trạng thái Public.

---

## 6. Các yêu cầu khác

### 6.1 Yêu cầu về Cơ sở dữ liệu (Database Requirements)

Hệ thống **SmartHire** đặt ra các yêu cầu kỹ thuật cụ thể đối với Hệ quản trị Cơ sở dữ liệu PostgreSQL 16 nhằm đảm bảo tính linh hoạt và hiệu năng xử lý:

- **Cấu trúc Lưu trữ Dữ liệu Động (JSONB Support):**
  - Do cấu trúc thông tin CV (kinh nghiệm, dự án, kỹ năng, học vấn) và bố cục Template CV có tính biến động cao, CSDL phải hỗ trợ kiểu dữ liệu `JSONB` của PostgreSQL để lưu trữ bán cấu trúc (Semi-structured Data).
  - Việc lưu dữ liệu CV dưới dạng `JSONB` giúp ứng viên có thể tùy biến các mục thông tin linh hoạt trên trình chỉnh sửa trực tiếp mà không cần phải thay đổi cấu trúc bảng liên tục.
- **Chuẩn hóa và Tối ưu hóa Truy vấn (Normalization & Indexing):**
  - Các bảng nghiệp vụ quan trọng (Tài khoản, Doanh nghiệp, Tin tuyển dụng JD, Đơn ứng tuyển) bắt buộc được chuẩn hóa tối thiểu ở **Dạng chuẩn 3 (3NF)** để tránh dư thừa dữ liệu và đảm bảo tính toàn vẹn.
  - Đánh chỉ mục nâng cao: Sử dụng **GIN Index (Generalized Inverted Index)** trên các trường dữ liệu `JSONB` và các trường từ khóa kỹ năng để phục vụ thuật toán tìm kiếm/lọc công việc và xử lý AI tốc độ cao.

### 6.2 Yêu cầu về Ngôn ngữ và Phông chữ

- **Hỗ trợ Ngôn ngữ:**
  - Ngôn ngữ giao diện mặc định của toàn bộ nền tảng SmartHire là **Tiếng Việt**.
  - Hệ thống phải mã hóa toàn bộ dữ liệu lưu trữ và truyền tải theo chuẩn **UTF-8** để hiển thị chính xác các ký tự tiếng Việt có dấu.
- **Quy chuẩn Phông chữ khi Xuất PDF CV:**
  - Các tệp file PDF CV xuất bản từ hệ thống bắt buộc sử dụng các phông chữ Unicode chuẩn quốc tế hỗ trợ tiếng Việt mượt mà (như _Inter, Roboto, Open Sans, Noto Sans_).
  - Hệ thống xuất file PDF phải thực hiện nhúng trực tiếp phông chữ vào file PDF để đảm bảo văn bản hiển thị đồng nhất, tránh bị lỗi phông khi người dùng mở file trên bất kỳ thiết bị hay hệ điều hành nào.

### 6.3 Yêu cầu Tuân thủ Pháp lý & Bảo vệ Dữ liệu Cá nhân

- **Tuân thủ Quy định Bảo vệ Dữ liệu:**
  - Hệ thống tuân thủ theo **Nghị định số 356/2025/NĐ-CP** về Bảo vệ Dữ liệu Cá nhân tại Việt Nam.
  - Thông tin cá nhân nhạy cảm của ứng viên (Số điện thoại, Email, Địa chỉ, Thông tin CMND/CCCD nếu có trong CV) phải được bảo mật và chỉ được chia sẻ cho Nhà tuyển dụng khi Ứng viên chủ động bấm "Ứng tuyển" vào tin tuyển dụng của doanh nghiệp đó.
- **Quyền Kiểm soát Dữ liệu của Ứng viên:**
  - Ứng viên có toàn quyền chỉnh sửa, ẩn/hiện, hoặc xóa bỏ các bản ghi CV cá nhân khỏi hệ thống bất kỳ lúc nào.

### 6.4 Yêu cầu về Sản phẩm Bàn giao (Project Deliverables)

Theo yêu cầu đồ án Niên luận ngành Kỹ thuật Phần mềm, sản phẩm bàn giao cuối kỳ của dự án SmartHire bao gồm đầy đủ các thành phần:

- **Mã nguồn Hệ thống:**
  - Mã nguồn Phân hệ Frontend (ReactJS, TypeScript, TailwindCSS).
  - Mã nguồn Phân hệ Backend (C# ASP.NET Core 10 Web API).
- **Cơ sở dữ liệu:**
  - Kịch bản khởi tạo CSDL PostgreSQL (Database DDL Scripts) kèm theo dữ liệu mẫu (Seed Data) cho danh mục ngành nghề, kỹ năng và tài khoản demo.
- **Tài liệu Kỹ thuật & Báo cáo:**
  - Tài liệu Báo cáo Niên luận hoàn chỉnh, bao gồm: Kiến trúc hệ thống, Thiết kế CSDL, Sơ đồ Use Case, Đặc tả API, Thiết kế Giao diện Wireframes và Kịch bản Kiểm thử (Test Plan & Test Cases).
- **Sản phẩm Truyền thông:**
  - Video Clip Demo giới thiệu kịch bản vận hành thực tế của ứng dụng SmartHire và Slide báo cáo thuyết trình.

---

## Phụ lục A: TBD – Danh sách các hạng mục sẽ được xác định

_(Các hạng mục dự kiến phát triển nâng cao trong các phiên bản nâng cấp tiếp theo):_

| STT | Mã hạng mục | Mô tả hạng mục chờ nâng cấp (TBD)       | Ghi chú / Hướng phát triển                                                               |
| :-- | :---------- | :-------------------------------------- | :--------------------------------------------------------------------------------------- |
| 1   | **TBD-01**  | Tích hợp Đăng nhập Mạng xã hội (OAuth2) | Cho phép đăng nhập nhanh qua Google / LinkedIn.                                          |
| 2   | **TBD-02**  | Phân hệ Phỏng vấn Video Trực tuyến      | Tích hợp WebRTC hỗ trợ Nhà tuyển dụng phỏng vấn trực tiếp Ứng viên trên nền tảng.        |
| 3   | **TBD-03**  | Thanh toán Gói Tin tuyển dụng           | Tích hợp VNPAY / Momo cho Nhà tuyển dụng mua các gói đẩy tin tuyển dụng nổi bật.         |
| 4   | **TBD-04**  | AI Agent Phỏng vấn Giả lập              | Trợ lý AI đóng vai Nhà tuyển dụng để phỏng vấn thử và đánh giá câu trả lời của Ứng viên. |
