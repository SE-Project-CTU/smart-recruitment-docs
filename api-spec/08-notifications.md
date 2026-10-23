# Notifications API

Tất cả endpoint yêu cầu đăng nhập và thao tác trên notification của user hiện tại.

| Method & path | Query | Thành công |
|---|---|---|
| `GET /api/v1/me/notifications` | `type`, `isUnread`, `page=1`, `pageSize=20` | 200, phân trang |
| `GET /api/v1/me/notifications/unread-count` | — | 200 + envelope |
| `PATCH /api/v1/me/notifications/{id}/read` | — | 200 + envelope |
| `PATCH /api/v1/me/notifications/read-all` | — | 200 + envelope |
| `DELETE /api/v1/me/notifications/{id}` | — | 204 |

Danh sách mặc định `page=1`, `pageSize=20`. `type` parse theo enum `NotificationType`; giá trị không parse được hiện bị bỏ qua. `isUnread` lọc trạng thái chưa đọc. Controller hiện gọi pagination factory zero-based, nên metadata `hasNextPage`/`hasPreviousPage` được tính theo index bắt đầu từ 0 dù query mặc định page=1; cần lưu ý sự không nhất quán này khi client phân trang. Mark-read/read-all trả data chứa message xác nhận; delete không có response body. Payload notification cụ thể phụ thuộc type và DTO do backend trả về.
