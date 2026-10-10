# Authentication & Account API

## Group Summary

Nhóm API quản lý vòng đời tài khoản, xác thực JWT, refresh token, thông tin cá nhân, mật khẩu và phân quyền. Dữ liệu chính liên quan đến `USER`, `ROLE`, `USER_ROLE` và `REFRESH_TOKEN`.

## API List

| # | API | Method & Path | Roles |
|---|---|---|---|
| 1 | Đăng ký tài khoản Candidate | `POST /api/v1/auth/register` | Public |
| 2 | Đăng ký tài khoản Recruiter | `POST /api/v1/auth/register/recruiter` | Public |
| 3 | Đăng nhập | `POST /api/v1/auth/login` | Public |
| 4 | Cấp lại Access Token | `POST /api/v1/auth/refresh` | Public với Refresh Token |
| 5 | Đăng xuất | `POST /api/v1/auth/logout` | Candidate, Recruiter, Admin |
| 6 | Xem thông tin cá nhân | `GET /api/v1/account/me` | Candidate, Recruiter, Admin |
| 7 | Cập nhật thông tin cá nhân | `PATCH /api/v1/account/me` | Candidate, Recruiter, Admin |
| 8 | Đổi mật khẩu | `POST /api/v1/account/change-password` | Candidate, Recruiter, Admin |

## Shared Rules

- Các endpoint yêu cầu đăng nhập phải gửi `Authorization: Bearer <access-token>`.
- `X-Correlation-ID` là UUID bắt buộc theo response contract chung.
- Access Token là JWT; Refresh Token là giá trị opaque, chỉ lưu hash ở server trong `REFRESH_TOKEN`.
- Không trả về `password_hash`, raw Refresh Token hoặc thông tin bí mật trong response.
- Email được chuẩn hóa lowercase; các field dạng text được trim trước khi validate.
- Lỗi đăng nhập dùng thông báo chung `Tài khoản hoặc mật khẩu không chính xác`, không tiết lộ email có tồn tại hay không.

<details>
<summary><strong>API 1: Register Candidate Account</strong></summary>


### Title & Summary

**Đăng ký tài khoản Ứng viên**

Cho phép người dùng khách tạo tài khoản Candidate bằng email, số điện thoại, mật khẩu và họ tên. Hệ thống kiểm tra trùng lặp, băm mật khẩu và gán role `Candidate` ở phía server.

### Method & Path

```http
POST /api/v1/auth/register
```

### Authentication & Authorization

- Không yêu cầu Access Token.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Content-Type` | Yes | String | Phải là `application/json`. |
| `Accept` | Yes | String | Phải hỗ trợ `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ, dùng để truy vết request. |

### Request Parameters / Body

Endpoint không có path parameter hoặc query parameter. Request body:

| Field | Required | DataType | Validation Rules |
|---|---:|---|---|
| `email` | Yes | String | Trim khoảng trắng; định dạng email hợp lệ; tối đa 254 ký tự; không được tồn tại trong `USER.email`. |
| `phone` | Yes | String | Số điện thoại hợp lệ theo định dạng hệ thống; chuẩn hóa trước khi lưu; không được tồn tại trong `USER.phone`. |
| `password` | Yes | String | Tối thiểu 8 ký tự, nên gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt; không lưu plaintext. |
| `fullName` | Yes | String | Trim khoảng trắng; từ 2 đến 100 ký tự; không chỉ gồm khoảng trắng. |

### Processing Rules

1. Chuẩn hóa `email` về lowercase và chuẩn hóa `phone` theo định dạng thống nhất.
2. Kiểm tra email hoặc số điện thoại đã được sử dụng.
3. Băm `password` bằng BCrypt hoặc Argon2.
4. Tạo bản ghi `USER` với trạng thái hoạt động mặc định của hệ thống.
5. Gán role `Candidate` qua `USER_ROLE`.
6. Không trả về `password_hash` trong response.

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `201` | Created | Tạo tài khoản Candidate thành công. |
| `400` | Bad Request | JSON sai cú pháp, thiếu body hoặc header bắt buộc. |
| `401` | Unauthorized | Không áp dụng cho endpoint public; dùng nếu gateway yêu cầu credential không hợp lệ. |
| `404` | Not Found | Không tìm thấy role `Candidate` trong cấu hình hệ thống. |
| `409` | Conflict | Email hoặc số điện thoại đã tồn tại. |
| `422` | Unprocessable Entity | Dữ liệu đúng JSON nhưng không đạt validation. |
| `500` | Internal Server Error | Lỗi không mong muốn khi tạo tài khoản hoặc ghi CSDL. |

### Example Request

```http
POST /api/v1/auth/register HTTP/1.1
Host: api.smarthire.example
Content-Type: application/json
Accept: application/json
X-Correlation-ID: 5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af

{
  "email": "candidate@example.com",
  "phone": "+84901234567",
  "password": "Str0ng!Pass123",
  "fullName": "Nguyen Van A"
}
```

### Example Success Response

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "data": {
    "id": "7d9e6f7a-08d8-4e2a-8f68-5d0cb4f47e4a",
    "email": "candidate@example.com",
    "phone": "+84901234567",
    "fullName": "Nguyen Van A",
    "roles": ["Candidate"],
    "status": "Active",
    "createdAt": "2026-09-28T10:30:00Z"
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

### Example Validation Error Response

```http
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json

{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request contains invalid fields.",
    "details": [
      {
        "field": "password",
        "reason": "MIN_LENGTH",
        "message": "Password must contain at least 8 characters."
      }
    ]
  },
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

### Example Conflict Response

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "error": {
    "code": "EMAIL_ALREADY_EXISTS",
    "message": "Email này đã được sử dụng",
    "details": []
  },
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 2: Register Recruiter Account</strong></summary>


### Title & Summary

**Đăng ký tài khoản Nhà tuyển dụng**

Cho phép người dùng khách tạo tài khoản Recruiter. Tài khoản được gán role `Recruiter`; việc tạo hoặc tham gia doanh nghiệp được thực hiện qua Company API.

### Method & Path

```http
POST /api/v1/auth/register/recruiter
```

### Authentication & Authorization

- Không yêu cầu Access Token.
- Người gọi: người dùng khách.
- Role được gán server-side: `Recruiter`.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Content-Type` | Yes | String | `application/json`. |
| `Accept` | Yes | String | Hỗ trợ `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Field | Required | DataType | Validation Rules |
|---|---:|---|---|
| `email` | Yes | String | Email hợp lệ, tối đa 254 ký tự, unique trong `USER.email`. |
| `password` | Yes | String | Tối thiểu 8 ký tự; phải đạt password policy; băm trước khi lưu. |
| `fullName` | Yes | String | Từ 2 đến 100 ký tự sau khi trim. |
| `phone` | No | String | Nếu cung cấp phải hợp lệ và unique trong `USER.phone`. |

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `201` | Created | Tạo tài khoản Recruiter thành công. |
| `400` | Bad Request | JSON sai cú pháp hoặc thiếu body/header. |
| `401` | Unauthorized | Không áp dụng trong flow bình thường của public endpoint. |
| `404` | Not Found | Role `Recruiter` chưa được cấu hình. |
| `409` | Conflict | Email hoặc phone đã tồn tại. |
| `422` | Unprocessable Entity | Field không đạt validation. |
| `500` | Internal Server Error | Lỗi hệ thống hoặc CSDL. |

### Example Request

```json
{
  "email": "hr@example.com",
  "password": "Str0ng!Pass123",
  "fullName": "Tran Thi B",
  "phone": "+84909876543"
}
```

### Example Success Response

```json
{
  "data": {
    "id": "0b5f0dd6-6b7f-4b57-81e0-b8ab7226c7d5",
    "email": "hr@example.com",
    "phone": "+84909876543",
    "fullName": "Tran Thi B",
    "roles": ["Recruiter"],
    "status": "Active",
    "createdAt": "2026-09-28T10:30:00Z"
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 3: Login</strong></summary>


### Title & Summary

**Đăng nhập và cấp token**

Xác thực email/mật khẩu, kiểm tra trạng thái tài khoản và cấp Access Token JWT cùng Refresh Token. JWT chứa định danh người dùng và role claims.

### Method & Path

```http
POST /api/v1/auth/login
```

### Authentication & Authorization

- Không yêu cầu Access Token.
- Người gọi: người dùng đã đăng ký.
- Tài khoản phải có trạng thái cho phép đăng nhập, không phải `Locked`.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Content-Type` | Yes | String | `application/json`. |
| `Accept` | Yes | String | Hỗ trợ `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Field | Required | DataType | Validation Rules |
|---|---:|---|---|
| `email` | Yes | String | Email hợp lệ; chuẩn hóa lowercase. |
| `password` | Yes | String | Không rỗng; so sánh với password hash, không ghi log giá trị. |

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Xác thực thành công. |
| `400` | Bad Request | JSON sai cú pháp hoặc thiếu field. |
| `401` | Unauthorized | Email/mật khẩu sai hoặc token credential không hợp lệ. |
| `403` | Forbidden | Tài khoản bị khóa hoặc không được phép đăng nhập. |
| `422` | Unprocessable Entity | Email/password không đạt format cơ bản. |
| `500` | Internal Server Error | Lỗi hệ thống hoặc CSDL. |

### Example Request

```json
{
  "email": "candidate@example.com",
  "password": "Str0ng!Pass123"
}
```

### Example Success Response

```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example",
    "tokenType": "Bearer",
    "expiresIn": 900,
    "refreshToken": "rt_7a3c5d9f2e1b4c8a",
    "refreshTokenExpiresAt": "2026-12-27T10:30:00Z",
    "user": {
      "id": "7d9e6f7a-08d8-4e2a-8f68-5d0cb4f47e4a",
      "email": "candidate@example.com",
      "fullName": "Nguyen Van A",
      "roles": ["Candidate"],
      "status": "Active"
    }
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

### Example Unauthorized Response

```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Tài khoản hoặc mật khẩu không chính xác",
    "details": []
  },
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 4: Refresh Access Token</strong></summary>


### Title & Summary

**Cấp lại Access Token**

Kiểm tra Refresh Token chưa hết hạn hoặc bị thu hồi, sau đó xoay vòng Refresh Token và cấp cặp token mới. Token cũ phải bị revoke để ngăn replay.

### Method & Path

```http
POST /api/v1/auth/refresh
```

### Authentication & Authorization

- Không yêu cầu Access Token.
- Yêu cầu Refresh Token hợp lệ trong body.
- Người dùng sở hữu token phải có tài khoản đang hoạt động.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Content-Type` | Yes | String | `application/json`. |
| `Accept` | Yes | String | Hỗ trợ `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Field | Required | DataType | Validation Rules |
|---|---:|---|---|
| `refreshToken` | Yes | String | Không rỗng; server hash token để đối chiếu `REFRESH_TOKEN.token_hash`; chưa hết hạn và `revoked_at` là null. |

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Cấp token mới thành công. |
| `400` | Bad Request | Thiếu refresh token hoặc JSON sai. |
| `401` | Unauthorized | Token sai, hết hạn, đã revoke hoặc không khớp. |
| `403` | Forbidden | Tài khoản sở hữu token bị khóa. |
| `422` | Unprocessable Entity | Token sai format. |
| `500` | Internal Server Error | Lỗi hệ thống hoặc CSDL. |

### Example Request

```json
{
  "refreshToken": "rt_7a3c5d9f2e1b4c8a"
}
```

### Example Success Response

```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.new-example",
    "tokenType": "Bearer",
    "expiresIn": 900,
    "refreshToken": "rt_new_98f2d1c4a6b7",
    "refreshTokenExpiresAt": "2026-12-27T10:45:00Z"
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 5: Logout</strong></summary>


### Title & Summary

**Đăng xuất và thu hồi Refresh Token**

Thu hồi một Refresh Token hoặc toàn bộ Refresh Token của phiên hiện tại. Client phải xóa Access Token và Refresh Token sau khi nhận response thành công.

### Method & Path

```http
POST /api/v1/auth/logout
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Role: `Candidate`, `Recruiter`, `Admin`.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`; JWT hợp lệ. |
| `Content-Type` | Yes | String | `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Field | Required | DataType | Validation Rules |
|---|---:|---|---|
| `refreshToken` | No | String | Nếu có, chỉ revoke đúng token này và phải thuộc user hiện tại. |
| `allSessions` | No | Boolean | Mặc định `false`; nếu `true`, revoke toàn bộ token chưa revoke của user. |

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `204` | No Content | Revoke thành công; không trả body. |
| `400` | Bad Request | Body sai format. |
| `401` | Unauthorized | Access Token thiếu, sai hoặc hết hạn. |
| `403` | Forbidden | Token hợp lệ nhưng không được phép thao tác phiên chỉ định. |
| `404` | Not Found | Refresh Token được chỉ định không tồn tại. |
| `500` | Internal Server Error | Lỗi hệ thống hoặc CSDL. |

### Example Request

```json
{
  "refreshToken": "rt_7a3c5d9f2e1b4c8a",
  "allSessions": false
}
```

### Example Success Response

```http
HTTP/1.1 204 No Content
X-Correlation-ID: 5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af
```

</details>

<details>
<summary><strong>API 6: Get Current Account</strong></summary>


### Title & Summary

**Xem thông tin tài khoản hiện tại**

Trả về thông tin công khai của user được xác định từ subject trong Access Token.

### Method & Path

```http
GET /api/v1/account/me
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Role: `Candidate`, `Recruiter`, `Admin`.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Accept` | Yes | String | Hỗ trợ `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

Không có path parameter, query parameter hoặc request body.

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Lấy thông tin thành công. |
| `401` | Unauthorized | Access Token thiếu, sai hoặc hết hạn. |
| `404` | Not Found | User trong token không còn tồn tại. |
| `500` | Internal Server Error | Lỗi hệ thống hoặc CSDL. |

### Example Success Response

```json
{
  "data": {
    "id": "7d9e6f7a-08d8-4e2a-8f68-5d0cb4f47e4a",
    "email": "candidate@example.com",
    "phone": "+84901234567",
    "fullName": "Nguyen Van A",
    "avatar": null,
    "roles": ["Candidate"],
    "status": "Active",
    "createdAt": "2026-09-28T10:30:00Z",
    "updatedAt": "2026-09-28T10:30:00Z"
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 7: Update Current Account</strong></summary>


### Title & Summary

**Cập nhật thông tin cá nhân**

Cho phép user cập nhật các thông tin hồ sơ thuộc chính tài khoản của mình. Không cho phép cập nhật email, role hoặc status qua endpoint này.

### Method & Path

```http
PATCH /api/v1/account/me
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Role: `Candidate`, `Recruiter`, `Admin`.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Content-Type` | Yes | String | `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Field | Required | DataType | Validation Rules |
|---|---:|---|---|
| `fullName` | No | String | Nếu có, từ 2 đến 100 ký tự sau khi trim. |
| `phone` | No | String / null | Nếu có phải hợp lệ và unique; `null` dùng để xóa phone nếu chính sách cho phép. |
| `avatarUrl` | No | String / null | URL hợp lệ hoặc null; file avatar phải được upload qua Media API trước. |

Phải có ít nhất một field được gửi. Các field `email`, `passwordHash`, `roles`, `status` bị từ chối với `422`.

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Cập nhật thành công. |
| `400` | Bad Request | JSON sai cú pháp hoặc body rỗng. |
| `401` | Unauthorized | Access Token thiếu, sai hoặc hết hạn. |
| `403` | Forbidden | Có field không thuộc quyền cập nhật. |
| `404` | Not Found | User không tồn tại. |
| `409` | Conflict | Phone đã được user khác sử dụng. |
| `422` | Unprocessable Entity | Field không đạt validation hoặc chứa field bị cấm. |
| `500` | Internal Server Error | Lỗi hệ thống hoặc CSDL. |

### Example Request

```json
{
  "fullName": "Nguyen Van A Updated",
  "phone": "+84901112233",
  "avatarUrl": "https://cdn.smarthire.example/avatars/user-7d9e6f7a.png"
}
```

### Example Success Response

```json
{
  "data": {
    "id": "7d9e6f7a-08d8-4e2a-8f68-5d0cb4f47e4a",
    "email": "candidate@example.com",
    "phone": "+84901112233",
    "fullName": "Nguyen Van A Updated",
    "avatarUrl": "https://cdn.smarthire.example/avatars/user-7d9e6f7a.png",
    "roles": ["Candidate"],
    "status": "Active",
    "updatedAt": "2026-09-28T11:00:00Z"
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 8: Change Password</strong></summary>


### Title & Summary

**Đổi mật khẩu tài khoản**

Kiểm tra mật khẩu hiện tại, băm mật khẩu mới và cập nhật `USER.password_hash`. Sau khi đổi thành công, toàn bộ Refresh Token hiện tại phải bị revoke để buộc đăng nhập lại trên các thiết bị khác.

### Method & Path

```http
POST /api/v1/account/change-password
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Role: `Candidate`, `Recruiter`, `Admin`.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Content-Type` | Yes | String | `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Field | Required | DataType | Validation Rules |
|---|---:|---|---|
| `currentPassword` | Yes | String | Không rỗng; phải khớp password hash hiện tại. |
| `newPassword` | Yes | String | Tối thiểu 8 ký tự; đạt password policy; không được giống current password. |
| `revokeAllSessions` | No | Boolean | Mặc định `true`; khi true revoke toàn bộ `REFRESH_TOKEN` của user. |

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `204` | No Content | Đổi mật khẩu thành công; không trả body. |
| `400` | Bad Request | JSON sai cú pháp hoặc thiếu body. |
| `401` | Unauthorized | Access Token thiếu, sai, hết hạn hoặc mật khẩu hiện tại sai. |
| `403` | Forbidden | Tài khoản bị khóa hoặc không được phép đổi mật khẩu. |
| `422` | Unprocessable Entity | Mật khẩu mới không đạt policy hoặc trùng mật khẩu cũ. |
| `500` | Internal Server Error | Lỗi hệ thống hoặc CSDL. |

### Example Request

```json
{
  "currentPassword": "Old!Pass123",
  "newPassword": "New!Pass456",
  "revokeAllSessions": true
}
```

### Example Success Response

```http
HTTP/1.1 204 No Content
X-Correlation-ID: 5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af
```

### Example Incorrect Password Response

```json
{
  "error": {
    "code": "CURRENT_PASSWORD_INVALID",
    "message": "Mật khẩu hiện tại không chính xác",
    "details": []
  },
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>
