# Mục lục nội dung mục 2.3

1. [2.3.1–2.3.4. Tài khoản và tệp đa phương tiện](chapter-2-3-1-account.md)
2. [2.3.5–2.3.7. Mẫu CV và quản lý CV](chapter-2-3-2-cv.md)
3. [2.3.8–2.3.11. Việc làm và hồ sơ ứng tuyển](chapter-2-3-3-jobs-applications.md)
4. [2.3.12–2.3.15. Doanh nghiệp, thành viên và kiểm duyệt](chapter-2-3-4-companies-recruiters.md)
5. [2.3.16–2.3.24. AI, quản trị và thông báo](chapter-2-3-5-ai-admin.md)
6. [2.3.25–2.3.26. Tổng quan ứng viên và nhà tuyển dụng](chapter-2-3-6-dashboards.md)

## Quy ước trình bày

Mỗi chức năng mô tả mục đích, giao diện, dữ liệu sử dụng và cách xử lý. Bảng điều khiển trình bày các thành phần của giao diện hiện có. Với nghiệp vụ được cung cấp qua API, phần xử lý mô tả các bước và dữ liệu tương ứng. Trong bảng dữ liệu, dấu X cho biết thao tác được thực hiện ở ít nhất một nhánh của chức năng.

Khi API trả lỗi nghiệp vụ hoặc lỗi xác thực, phản hồi JSON gồm thông tin lỗi trong trường `error` và mã theo dõi trong trường `correlationId`. Mã theo dõi cũng được gửi qua tiêu đề HTTP `X-Correlation-ID` để đối chiếu yêu cầu. Mã trạng thái HTTP phản ánh loại lỗi, chẳng hạn 401 khi cần xác thực, 403 khi thiếu quyền, 404 khi không tìm thấy dữ liệu, 409 khi xung đột và 422 khi đầu vào không hợp lệ.
