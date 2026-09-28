# SmartHire API Specification

## Purpose

Tài liệu này mô tả REST API của nền tảng SmartHire dựa trên System Features trong SRS và ERD hiện tại.

## API Groups

API được chia thành **6 nhóm**, mỗi nhóm tương ứng một file tài liệu:

| # | Nhóm API | File | Phạm vi chính |
|---|---|---|---|
| 1 | Authentication & Account | [01-auth-account.md](01-auth-account.md) | Đăng ký, đăng nhập, JWT, refresh token, hồ sơ cá nhân, mật khẩu và RBAC |
| 2 | Company & Membership | [02-company.md](02-company.md) | Doanh nghiệp, thành viên, lời mời, yêu cầu tham gia và theo dõi doanh nghiệp |
| 3 | CV & Template | [03-cv.md](03-cv.md) | Template, CV, phiên bản CV, xuất PDF và trạng thái Public/Private |
| 4 | Recruitment & Application | [04-recruitment.md](04-recruitment.md) | Tin tuyển dụng, tìm kiếm, ứng tuyển và lịch sử trạng thái hồ sơ |
| 5 | Administration | [05-admin.md](05-admin.md) | Kiểm duyệt, người dùng, RBAC, danh mục, template và báo cáo |
| 6 | AI Assistant | [06-ai.md](06-ai.md) | Gợi ý viết CV, phân tích độ phù hợp và đề xuất việc làm |

## Conventions

- Base URL: `/api/v1`
- Content type: `application/json`, trừ endpoint upload file được ghi rõ là `multipart/form-data`.
- Authentication dùng `Authorization: Bearer <access-token>`.
- `X-Correlation-ID` là UUID dùng để truy vết request.
- ID dùng kiểu UUID; thời gian dùng ISO 8601 UTC.
- Tất cả response JSON thành công dùng envelope thống nhất:

```json
{
  "data": {},
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

### Success Response Contract

| Field | Required | DataType | Rules |
|---|---:|---|---|
| `data` | Yes | Object / Array / null | Payload nghiệp vụ. Dùng object cho resource đơn, array cho collection. Không trả về secret hoặc `password_hash`. |
| `meta` | Yes | Object | Metadata của response. Dùng `{}` nếu endpoint không có metadata đặc biệt. |
| `correlationId` | Yes | UUID | Phải trùng `X-Correlation-ID` của request hoặc là ID do server sinh nếu request không cung cấp. |

Với API phân trang, `meta` phải có cấu trúc:

```json
{
  "page": 1,
  "pageSize": 20,
  "totalItems": 125,
  "totalPages": 7,
  "hasNextPage": true,
  "hasPreviousPage": false
}
```

Quy ước response thành công:

- `200 OK`: Đọc hoặc cập nhật thành công và có response body.
- `201 Created`: Tạo resource thành công; nên trả resource mới trong `data`.
- `202 Accepted`: Tác vụ bất đồng bộ đã được tiếp nhận; `data` nên chứa `jobId` hoặc trạng thái tác vụ.
- `204 No Content`: Thao tác thành công nhưng không có body; không trả envelope JSON.

### Error Response Contract

Response lỗi dùng cấu trúc thống nhất:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request contains invalid fields.",
    "details": [
      {
        "field": "email",
        "reason": "INVALID_FORMAT",
        "message": "Invalid email format."
      }
    ]
  },
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

| Field | Required | DataType | Rules |
|---|---:|---|---|
| `error.code` | Yes | String | Mã lỗi ổn định để client xử lý bằng code, viết `UPPER_SNAKE_CASE`. |
| `error.message` | Yes | String | Mô tả tổng quát, không chứa stack trace hoặc thông tin nhạy cảm. |
| `error.details` | Yes | Array | Danh sách lỗi chi tiết; dùng `[]` nếu không có chi tiết. |
| `error.details[].field` | Conditional | String | Tên field/path gây lỗi, ví dụ `email` hoặc `items[0].name`. |
| `error.details[].reason` | Conditional | String | Mã nguyên nhân ổn định, ví dụ `REQUIRED`, `INVALID_FORMAT`, `NOT_FOUND`. |
| `error.details[].message` | Conditional | String | Mô tả lỗi cho người dùng hoặc developer. Không chứa dữ liệu bí mật. |
| `correlationId` | Yes | UUID | Dùng để tra cứu log và hỗ trợ troubleshooting. |

Không trả về đồng thời `data` và `error`. Error response phải dùng HTTP status phù hợp, tối thiểu gồm `400`, `401`, `403`, `404`, `409`, `422` và `500` khi endpoint có thể phát sinh các trường hợp tương ứng.
