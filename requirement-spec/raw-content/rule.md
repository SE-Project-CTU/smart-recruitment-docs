# HƯỚNG DẪN CHUYỂN ĐỔI, KẾ HOẠCH BÀI LÀM & KHUNG TÀI LIỆU ĐẶC TẢ SRS (SMARTHIRE)

---

## I. QUY TẮC ĐỊNH DẠNG MARKDOWN CỦA DỰ ÁN (MD-TO-LATEX CONVERSION RULES)

Khi biên soạn nội dung `.md`, tuân thủ 6 quy tắc vàng sau để việc chuyển đổi tự động/dùng AI sang LaTeX diễn ra chính xác 100%:

### Rule 1: Ánh xạ Cấu trúc Tiêu đề (Heading Mapping)
- `## Tên Mục` tương ứng với `\section{Tên Mục}`
- `### Tên Mục Con` tương ứng với `\subsection{Tên Mục Con}`
- `#### Tên Mục Nhỏ` tương ứng với `\subsubsection{Tên Mục Nhỏ}`
- KHÔNG dùng tiêu đề `#` trong thân tài liệu ngoại trừ Tên Đồ án / Bìa.

### Rule 2: Quy chuẩn Đặt mã Yêu cầu Chức năng (Requirements Naming)
- Tất cả các yêu cầu chức năng bắt buộc có định dạng:
  `- **REQ-[MODULE]-[NUMBER] (Tên yêu cầu):** Nội dung đặc tả.`
- Khi parse sang LaTeX, định dạng này sẽ chuyển thành:
  `\item \textbf{REQ-[MODULE]-[NUMBER] (Tên yêu cầu):} Nội dung đặc tả.`

### Rule 3: Bảng Dữ liệu (Tables)
- Sử dụng cú pháp bảng chuẩn Markdown (`| Column 1 | Column 2 |`).
- Không gộp ô (colspan/rowspan) trong file `.md` để tránh lỗi khi chuyển sang môi trường `\begin{tabular}` hoặc `\begin{longtable}` trong LaTeX.

### Rule 4: Xử lý Ký tự Đặc biệt của LaTeX
- Hạn chế dùng trực tiếp các ký tự reserved của LaTeX trong văn bản xuôi: `%`, `_`, `&`, `#`, `$`, `{`, `}`.
- Nếu dùng trong mã REQ hoặc thuật ngữ kỹ thuật (ví dụ: `C#`, `ASP.NET`, `match_score`), AI Parser sẽ tự động thêm dấu escape `\` khi sang LaTeX (ví dụ: `C\#`, `match\_score`).

### Rule 5: Danh sách (Lists & Bullet points)
- Dùng `- ` cho danh sách không thứ tự (`\begin{itemize}`).
- Dùng `1. `, `2. ` cho danh sách có thứ tự/quy trình (`\begin{enumerate}`).

### Rule 6: Chú thích & Placeholder (Ghi chú cần làm)
- Nội dung chưa điền sẽ để dưới dạng HTML Comment: `<!-- [TODO: Nội dung cần bổ sung] -->` để AI nhận biết và chèn nội dung vào đúng vị trí trong các bước tiếp theo.

---

## II. KẾ HOẠCH TRIỂN KHAI HOÀN THÀNH TÀI LIỆU (EXECUTION PLAN)

Toàn bộ tài liệu Đặc tả Yêu cầu Phần mềm (SRS) cho hệ thống **SmartHire**[cite: 1] sẽ được triển khai theo 5 bước tiếp theo:

- **Bước 1 (Hiện tại):** Chốt Khung tài liệu SRS chuẩn `MauDacta.pdf`[cite: 2] & Bộ Quy tắc biên soạn Markdown.
- **Bước 2:** Triển khai **Mục 1 (Giới thiệu)** & **Mục 2 (Mô tả tổng quan)**[cite: 2].
- **Bước 3:** Triển khai **Mục 3 (Các yêu cầu giao tiếp bên ngoài)**[cite: 2].
- **Bước 4:** Tích hợp **Mục 4 (Các tính năng hệ thống)** (Đã hoàn thiện 5 tính năng ở các lượt chat trước)[cite: 1].
- **Bước 5:** Triển khai **Mục 5 (Yêu cầu phi chức năng)**, **Mục 6 (Yêu cầu khác)** & các **Phụ lục A, B**[cite: 2].

---

## III. KHUNG TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS SKELETON)

```md
# ĐẶC TẢ YÊU CẦU PHẦN MỀM
## Dự án: Nền tảng Kết nối Tuyển dụng và Hỗ trợ Viết CV Thông minh Tích hợp AI (SmartHire)

**Phiên bản:** 1.0  
**Được chuẩn bị bởi:** Nhóm 1 - Ngành Kỹ thuật Phần mềm  
**Đơn vị:** Bộ môn CNPM, Khoa CNTT & TT, Đại học Cần Thơ  
**Ngày:** 19/09/2026  

---

### Theo dõi phiên bản tài liệu

| Tên tác giả | Ngày | Lý do thay đổi | Phiên bản |
| :--- | :--- | :--- | :--- |
| Nhóm 1 | 19/09/2026 | Khởi tạo khung tài liệu SRS chuẩn theo mẫu Bộ môn | 1.0 |

---

## 1. Giới thiệu

### 1.1 Mục tiêu
<!-- [TODO: Triển khai ở Bước 2 - Trình bày mục tiêu tài liệu và đối tượng đọc] -->

### 1.2 Phạm vi sản phẩm
<!-- [TODO: Triển khai ở Bước 2 - Tóm tắt về sản phẩm SmartHire, giá trị mang lại] -->

### 1.3 Bảng chú giải thuật ngữ
<!-- [TODO: Triển khai ở Bước 2 - Giải thích JWT, RBAC, ATS, RAG, Match Score, Skill Gap,...] -->

### 1.4 Tài liệu tham khảo
<!-- [TODO: Triển khai ở Bước 2 - Liệt kê tài liệu, tiêu chuẩn, link tài nguyên] -->

### 1.5 Bố cục tài liệu
<!-- [TODO: Triển khai ở Bước 2 - Tóm tắt cấu trúc các phần trong tài liệu] -->

---

## 2. Mô tả tổng quan

### 2.1 Bối cảnh của sản phẩm
<!-- [TODO: Triển khai ở Bước 2 - Ngữ cảnh ra đời SmartHire, sơ đồ khối tổng quan] -->

### 2.2 Các chức năng của sản phẩm
<!-- [TODO: Triển khai ở Bước 2 - Tóm tắt mức cao các phân hệ chức năng chính] -->

### 2.3 Đặc điểm người sử dụng
<!-- [TODO: Triển khai ở Bước 2 - Phân tích Candidate, Employer, Admin] -->

### 2.4 Môi trường vận hành
<!-- [TODO: Triển khai ở Bước 2 - Phần cứng, hệ điều hành, trình duyệt, Docker, PostgreSQL, React, C#] -->

### 2.5 Các ràng buộc về thực thi và thiết kế
<!-- [TODO: Triển khai ở Bước 2 - Giới hạn phần cứng, thời gian phản hồi AI, quy định bảo mật] -->

### 2.6 Các giả định và phụ thuộc
<!-- [TODO: Triển khai ở Bước 2 - Phụ thuộc LLM API bên thứ 3, kết nối Internet] -->

---

## 3. Các yêu cầu giao tiếp bên ngoài

### 3.1 Giao diện người sử dụng
<!-- [TODO: Triển khai ở Bước 3 - Chuẩn GUI, responsive, giao diện Live Preview CV] -->

### 3.2 Giao tiếp phần cứng
<!-- [TODO: Triển khai ở Bước 3 - Yêu cầu thiết bị đầu cuối, RAM, kết nối mạng] -->

### 3.3 Giao tiếp phần mềm
<!-- [TODO: Triển khai ở Bước 3 - Giao tiếp giữa ReactJS, C# ASP.NET Core, PostgreSQL, AI Service] -->

### 3.4 Giao tiếp truyền thông tin
<!-- [TODO: Triển khai ở Bước 3 - Giao thức HTTPS, RESTful API, WebSocket/SSE, JWT Header] -->

---

## 4. Các tính năng của hệ thống

<!-- [ĐÃ HOÀN THÀNH - SẼ TÍCH HỢP ĐẦY ĐỦ 5 TÍNH NĂNG Ở BƯỚC 4] -->
<!-- 4.1. Quản lý Tài khoản & Phân quyền (Authentication & Authorization) -->
<!-- 4.2. Công cụ Tạo CV theo Mẫu (CV Builder Module) -->
<!-- 4.3. Phân hệ Nghiệp vụ Tuyển dụng & Ứng tuyển (Core Recruitment Module) -->
<!-- 4.4. Phân hệ Quản trị Hệ thống (Admin Management Module) -->
<!-- 4.5. Phân hệ Tích hợp Trợ lý AI Thông minh (AI Integration Services Module) -->

---

## 5. Các yêu cầu phi chức năng

### 5.1 Yêu cầu thực thi
<!-- [TODO: Triển khai ở Bước 5 - Thời gian xử lý API < 200ms, AI response < 3s, chịu tải concurrent users] -->

### 5.2 Yêu cầu an toàn
<!-- [TODO: Triển khai ở Bước 5 - Bỏ qua dữ liệu lỗi, sao lưu CSDL tự động, tránh mất mát dữ liệu CV] -->

### 5.3 Yêu cầu bảo mật
<!-- [TODO: Triển khai ở Bước 5 - Mã hóa mật khẩu BCrypt, HTTPS, bảo vệ JWT, chống SQL Injection/XSS] -->

### 5.4 Các đặc điểm chất lượng phần mềm
<!-- [TODO: Triển khai ở Bước 5 - Tính dễ sử dụng (Usability), Tính sẵn sàng (Availability 99.9%), Tính dễ bảo trì] -->

### 5.5 Các quy tắc nghiệp vụ
<!-- [TODO: Triển khai ở Bước 5 - Quy định duyệt JD, quy tắc tính Match Score, thời hạn hết hạn tin tuyển dụng] -->

---

## 6. Các yêu cầu khác

<!-- [TODO: Triển khai ở Bước 5 - Yêu cầu về lưu trữ CSDL PostgreSQL, quy chuẩn phông chữ tiếng Việt cho PDF] -->

---

## Phụ lục A: Các mô hình phân tích

<!-- [TODO: Triển khai ở Bước 5 - Danh sách Sơ đồ Use Case tổng quan, Diagram luồng xử lý AI] -->

---

## Phụ lục B: TBD – Danh sách sẽ được xác định

<!-- [TODO: Triển khai ở Bước 5 - Danh sách các hạng mục chờ làm rõ trong các phiên bản sau] -->