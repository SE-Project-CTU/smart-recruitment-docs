# Company & Membership API

## Group Summary

Nhóm API quản lý doanh nghiệp và quan hệ giữa user với doanh nghiệp. Dữ liệu chính liên quan đến `COMPANY`, `COMPANY_MEMBERSHIP`, `COMPANY_INVITATION`, `COMPANY_JOIN_REQUEST` và `COMPANY_FOLLOW`.

Doanh nghiệp được tạo ở trạng thái chờ xác minh. Việc phê duyệt hoặc từ chối doanh nghiệp thuộc Administration API; Company API chỉ cho phép đọc trạng thái xác minh.

## API List

| # | API | Method & Path | Roles |
|---|---|---|---|
| 1 | Tạo doanh nghiệp | `POST /api/v1/companies` | Recruiter |
| 2 | Xem chi tiết doanh nghiệp | `GET /api/v1/companies/{id}` | Public |
| 3 | Cập nhật doanh nghiệp | `PATCH /api/v1/companies/{id}` | Company Owner |
| 4 | Xem danh sách thành viên | `GET /api/v1/companies/{id}/members` | Owner, Recruiter member |
| 5 | Mời Recruiter tham gia | `POST /api/v1/companies/{id}/invitations` | Company Owner |
| 6 | Xem lời mời của tôi | `GET /api/v1/me/company-invitations` | Recruiter |
| 7 | Chấp nhận lời mời | `POST /api/v1/company-invitations/{invitationId}/accept` | Invitee |
| 8 | Từ chối lời mời | `POST /api/v1/company-invitations/{invitationId}/reject` | Invitee |
| 9 | Gửi yêu cầu tham gia | `POST /api/v1/companies/{id}/join-requests` | Recruiter |
| 10 | Xem yêu cầu tham gia | `GET /api/v1/companies/{id}/join-requests` | Company Owner |
| 11 | Duyệt/Từ chối yêu cầu tham gia | `PATCH /api/v1/companies/{id}/join-requests/{requestId}` | Company Owner |
| 12 | Chuyển quyền chủ doanh nghiệp | `PUT /api/v1/companies/{id}/ownership` | Company Owner |
| 13a | Theo dõi doanh nghiệp | `POST /api/v1/companies/{id}/followers` | Candidate |
| 13b | Bỏ theo dõi doanh nghiệp | `DELETE /api/v1/companies/{id}/followers` | Candidate |
| 13c | Xem followers doanh nghiệp | `GET /api/v1/companies/{id}/followers` | Public |

## Shared Rules

- Base URL: `/api/v1`.
- Tất cả endpoint protected yêu cầu `Authorization: Bearer <access-token>` và `X-Correlation-ID` là UUID.
- `id`, `invitationId`, `requestId` là UUID. Trong request body và response, field định danh vẫn dùng tên rõ nghĩa như `companyId`.
- Company Owner là membership có `role = Owner` và `status = Active`.
- Recruiter chỉ được thao tác trên doanh nghiệp khi có membership `status = Active`.
- Doanh nghiệp chưa được Admin xác minh không được dùng để đăng tin tuyển dụng.
- Tất cả response JSON dùng envelope chung `data`, `meta`, `correlationId`; lỗi dùng `error`, `correlationId` theo [README.md](README.md).
- Các collection dùng pagination với `page`, `pageSize`, `totalItems`, `totalPages`, `hasNextPage`, `hasPreviousPage`.

<details>
<summary><strong>API 1: Create Company</strong></summary>


### Title & Summary

**Tạo doanh nghiệp**

Tạo doanh nghiệp mới và tạo membership đầu tiên cho người tạo với role `Owner` ở trạng thái chờ xác minh. Company chưa được sử dụng cho nghiệp vụ tuyển dụng cho đến khi Admin phê duyệt.

### Method & Path

```http
POST /api/v1/companies
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Role: `Recruiter`.
- User không được tạo doanh nghiệp nếu tài khoản đang bị khóa.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Content-Type` | Yes | String | `application/json`. |
| `Accept` | Yes | String | Hỗ trợ `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Field | Required | DataType | Validation Rules |
|---|---:|---|---|
| `name` | Yes | String | Từ 2 đến 200 ký tự sau khi trim. |
| `taxCode` | Yes | String | Mã số thuế hợp lệ theo chính sách hệ thống; unique trong `COMPANY.tax_code`. |
| `email` | Yes | String | Email hợp lệ, tối đa 254 ký tự. |
| `phone` | Yes | String | Số điện thoại hợp lệ. |
| `address` | Yes | String | Từ 5 đến 500 ký tự. |
| `website` | No | String / null | URL hợp lệ nếu cung cấp. |
| `description` | No | String / null | Tối đa 5000 ký tự. |
| `logoUrl` | No | String / null | URL hợp lệ; file logo phải được upload trước qua Media API. |

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `201` | Created | Tạo company và membership Owner thành công. |
| `400` | Bad Request | JSON sai cú pháp hoặc thiếu body. |
| `401` | Unauthorized | Access Token thiếu, sai hoặc hết hạn. |
| `403` | Forbidden | User không có role Recruiter hoặc bị khóa. |
| `409` | Conflict | Tax code đã tồn tại. |
| `422` | Unprocessable Entity | Field không đạt validation. |
| `500` | Internal Server Error | Lỗi tạo company hoặc membership. |

### Example Request

```json
{
	"name": "SmartHire Technology",
	"taxCode": "0123456789",
	"email": "contact@smarthire.example",
	"phone": "+842812345678",
	"address": "123 Nguyen Hue, Ho Chi Minh City",
	"website": "https://smarthire.example",
	"description": "Recruitment technology company",
	"logoUrl": null
}
```

### Example Success Response

```json
{
	"data": {
		"id": "a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55",
		"name": "SmartHire Technology",
		"taxCode": "0123456789",
		"email": "contact@smarthire.example",
		"phone": "+842812345678",
		"address": "123 Nguyen Hue, Ho Chi Minh City",
		"website": "https://smarthire.example",
		"description": "Recruitment technology company",
		"logoUrl": null,
		"verificationStatus": "Pending",
		"createdAt": "2026-09-28T10:30:00Z",
		"membership": {
			"role": "Owner",
			"status": "Active"
		}
	},
	"meta": {},
	"correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 2: Get Company Detail</strong></summary>


### Title & Summary

**Xem chi tiết doanh nghiệp**

Trả về thông tin công khai của company và trạng thái xác minh. Thông tin thành viên, nếu cần, phải lấy qua endpoint members có authorization.

### Method & Path

```http
GET /api/v1/companies/{id}
```

### Authentication & Authorization

- Không bắt buộc Access Token đối với thông tin công khai.
- Nếu có Access Token, server có thể trả thêm membership của user hiện tại.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Accept` | Yes | String | Hỗ trợ `application/json`. |
| `Authorization` | No | String | `Bearer <access-token>` nếu muốn nhận membership context. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Parameter | Required | DataType | Validation Rules |
|---|---:|---|---|
| `companyId` | Yes | UUID | UUID hợp lệ; phải tồn tại. |

Không có request body.

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Company tồn tại. |
| `400` | Bad Request | `companyId` sai format. |
| `404` | Not Found | Company không tồn tại. |
| `500` | Internal Server Error | Lỗi truy vấn dữ liệu. |

### Example Success Response

```json
{
	"data": {
		"id": "a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55",
		"name": "SmartHire Technology",
		"taxCode": "0123456789",
		"email": "contact@smarthire.example",
		"phone": "+842812345678",
		"address": "123 Nguyen Hue, Ho Chi Minh City",
		"website": "https://smarthire.example",
		"description": "Recruitment technology company",
		"logoUrl": null,
		"verificationStatus": "Verified",
		"verifiedAt": "2026-09-29T08:00:00Z",
		"createdAt": "2026-09-28T10:30:00Z",
		"updatedAt": "2026-09-29T08:00:00Z"
	},
	"meta": {},
	"correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 3: Update Company</strong></summary>


### Title & Summary

**Cập nhật thông tin doanh nghiệp**

Cho phép Company Owner cập nhật thông tin doanh nghiệp. Thay đổi quan trọng có thể khiến trạng thái xác minh cần được Admin kiểm tra lại theo chính sách nghiệp vụ.

### Method & Path

```http
PATCH /api/v1/companies/{id}
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Chỉ membership `Owner` và `Active` được gọi.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Content-Type` | Yes | String | `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Field | Required | DataType | Validation Rules |
|---|---:|---|---|
| `companyId` | Yes | UUID | UUID hợp lệ; phải tồn tại. |
| `name` | No | String | 2-200 ký tự sau trim. |
| `email` | No | String | Email hợp lệ. |
| `phone` | No | String | Số điện thoại hợp lệ. |
| `address` | No | String | 5-500 ký tự. |
| `website` | No | String / null | URL hợp lệ nếu cung cấp. |
| `description` | No | String / null | Tối đa 5000 ký tự. |
| `logoUrl` | No | String / null | URL hợp lệ hoặc null. |

Không cho phép cập nhật `id`, `taxCode`, `verificationStatus`, `verifiedAt` hoặc membership qua endpoint này. Phải có ít nhất một field cập nhật.

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Cập nhật thành công. |
| `400` | Bad Request | UUID hoặc JSON sai format. |
| `401` | Unauthorized | Access Token không hợp lệ. |
| `403` | Forbidden | Không phải Owner Active. |
| `404` | Not Found | Company không tồn tại. |
| `422` | Unprocessable Entity | Field không hợp lệ hoặc body rỗng. |
| `500` | Internal Server Error | Lỗi cập nhật dữ liệu. |

### Example Request

```json
{
	"address": "456 Le Loi, Ho Chi Minh City",
	"website": "https://www.smarthire.example",
	"description": "Updated company description"
}
```

### Example Success Response

```json
{
	"data": {
		"id": "a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55",
		"name": "SmartHire Technology",
		"address": "456 Le Loi, Ho Chi Minh City",
		"website": "https://www.smarthire.example",
		"description": "Updated company description",
		"verificationStatus": "Verified",
		"updatedAt": "2026-09-29T09:00:00Z"
	},
	"meta": {},
	"correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 4: List Company Members</strong></summary>


### Title & Summary

**Xem danh sách thành viên doanh nghiệp**

Trả về danh sách membership đang hoạt động hoặc theo status được phép xem của một company.

### Method & Path

```http
GET /api/v1/companies/{id}/members
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Role: Company Owner hoặc Recruiter member `Active` của company.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Accept` | Yes | String | Hỗ trợ `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Parameter | Required | DataType | Validation Rules |
|---|---:|---|---|
| `companyId` | Yes | UUID | UUID hợp lệ. |
| `page` | No | Integer | Mặc định 1; lớn hơn hoặc bằng 1. |
| `pageSize` | No | Integer | Mặc định 20; từ 1 đến 100. |
| `status` | No | Enum | `Active`, `Inactive`; mặc định `Active`. |

Không có request body.

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Trả về danh sách membership. |
| `400` | Bad Request | Query hoặc UUID sai format. |
| `401` | Unauthorized | Access Token không hợp lệ. |
| `403` | Forbidden | User không phải member của company. |
| `404` | Not Found | Company không tồn tại. |
| `500` | Internal Server Error | Lỗi truy vấn dữ liệu. |

### Example Success Response

```json
{
	"data": [
		{
			"membershipId": "d75ec0e8-bbc2-4d2c-aac2-2e0f83cfae1d",
			"user": {
				"id": "7d9e6f7a-08d8-4e2a-8f68-5d0cb4f47e4a",
				"fullName": "Nguyen Van A",
				"email": "candidate@example.com",
				"avatarUrl": null
			},
			"role": "Owner",
			"status": "Active",
			"joinedAt": "2026-09-28T10:30:00Z"
		}
	],
	"meta": {
		"page": 1,
		"pageSize": 20,
		"totalItems": 1,
		"totalPages": 1,
		"hasNextPage": false,
		"hasPreviousPage": false
	},
	"correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 5: Invite Recruiter</strong></summary>


### Title & Summary

**Mời Nhà tuyển dụng tham gia doanh nghiệp**

Tạo `COMPANY_INVITATION` cho một tài khoản Recruiter. Lời mời chưa tạo membership cho đến khi invitee chấp nhận.

### Method & Path

```http
POST /api/v1/companies/{id}/invitations
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Chỉ Company Owner Active được mời thành viên.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Content-Type` | Yes | String | `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Field | Required | DataType | Validation Rules |
|---|---:|---|---|
| `companyId` | Yes | UUID | Company tồn tại và caller là Owner Active. |
| `inviteeId` | Yes | UUID | User tồn tại, có role Recruiter, không phải member Active hiện tại. |
| `expiresAt` | No | DateTime | ISO 8601 UTC; phải lớn hơn hiện tại; mặc định theo chính sách hệ thống. |

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `201` | Created | Tạo invitation thành công. |
| `400` | Bad Request | UUID/body sai format. |
| `401` | Unauthorized | Access Token không hợp lệ. |
| `403` | Forbidden | Caller không phải Owner Active. |
| `404` | Not Found | Company hoặc invitee không tồn tại. |
| `409` | Conflict | Đã có invitation pending hoặc user đã là member. |
| `422` | Unprocessable Entity | Invitee không có role Recruiter hoặc expiresAt không hợp lệ. |
| `500` | Internal Server Error | Lỗi tạo invitation. |

### Example Request

```json
{
	"inviteeId": "e2c5a5c7-3658-442d-87c1-cf8ff34d2d8b",
	"expiresAt": "2026-10-05T10:30:00Z"
}
```

### Example Success Response

```json
{
	"data": {
		"id": "c4c70d37-7db1-44cc-94b1-3699188ce94d",
		"companyId": "a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55",
		"inviterId": "7d9e6f7a-08d8-4e2a-8f68-5d0cb4f47e4a",
		"inviteeId": "e2c5a5c7-3658-442d-87c1-cf8ff34d2d8b",
		"status": "Pending",
		"expiresAt": "2026-10-05T10:30:00Z",
		"createdAt": "2026-09-28T10:30:00Z"
	},
	"meta": {},
	"correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 6: List My Company Invitations</strong></summary>


### Title & Summary

**Xem lời mời tham gia doanh nghiệp của tôi**

Trả về các invitation mà user hiện tại là invitee, phục vụ việc xem và quyết định chấp nhận hoặc từ chối.

### Method & Path

```http
GET /api/v1/me/company-invitations
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Role: `Recruiter`.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Accept` | Yes | String | Hỗ trợ `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Parameter | Required | DataType | Validation Rules |
|---|---:|---|---|
| `status` | No | Enum | `Pending`, `Accepted`, `Rejected`, `Expired`; mặc định `Pending`. |
| `page` | No | Integer | Mặc định 1; từ 1 trở lên. |
| `pageSize` | No | Integer | Mặc định 20; từ 1 đến 100. |

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Trả về danh sách invitation. |
| `400` | Bad Request | Query sai format. |
| `401` | Unauthorized | Access Token không hợp lệ. |
| `403` | Forbidden | User không có role Recruiter. |
| `500` | Internal Server Error | Lỗi truy vấn dữ liệu. |

### Example Success Response

```json
{
	"data": [
		{
			"id": "c4c70d37-7db1-44cc-94b1-3699188ce94d",
			"company": {
				"id": "a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55",
				"name": "SmartHire Technology",
				"verificationStatus": "Verified"
			},
			"inviterId": "7d9e6f7a-08d8-4e2a-8f68-5d0cb4f47e4a",
			"status": "Pending",
			"expiresAt": "2026-10-05T10:30:00Z",
			"createdAt": "2026-09-28T10:30:00Z"
		}
	],
	"meta": {
		"page": 1,
		"pageSize": 20,
		"totalItems": 1,
		"totalPages": 1,
		"hasNextPage": false,
		"hasPreviousPage": false
	},
	"correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 7: Accept Company Invitation</strong></summary>


### Title & Summary

**Chấp nhận lời mời tham gia doanh nghiệp**

Chuyển invitation sang `Accepted` và tạo `COMPANY_MEMBERSHIP` với role `Member`. Hai thao tác phải thực hiện trong cùng transaction.

### Method & Path

```http
POST /api/v1/company-invitations/{invitationId}/accept
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Chỉ invitee đúng với user hiện tại được gọi.
- User phải có role `Recruiter`.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Accept` | Yes | String | Hỗ trợ `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Parameter | Required | DataType | Validation Rules |
|---|---:|---|---|
| `invitationId` | Yes | UUID | Invitation phải tồn tại, thuộc user hiện tại và có status `Pending`. |

Không có request body.

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Chấp nhận và tạo membership thành công. |
| `400` | Bad Request | UUID sai format. |
| `401` | Unauthorized | Access Token không hợp lệ. |
| `403` | Forbidden | User không phải invitee. |
| `404` | Not Found | Invitation không tồn tại. |
| `409` | Conflict | Invitation đã xử lý hoặc user đã là member. |
| `410` | Gone | Invitation đã hết hạn. |
| `500` | Internal Server Error | Transaction thất bại. |

### Example Success Response

```json
{
	"data": {
		"invitationId": "c4c70d37-7db1-44cc-94b1-3699188ce94d",
		"invitationStatus": "Accepted",
		"membership": {
			"id": "9a07c888-64d4-482e-99a2-7e8fbbd4d28c",
			"companyId": "a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55",
			"userId": "e2c5a5c7-3658-442d-87c1-cf8ff34d2d8b",
			"role": "Member",
			"status": "Active",
			"joinedAt": "2026-09-28T11:00:00Z"
		}
	},
	"meta": {},
	"correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 8: Reject Company Invitation</strong></summary>


### Title & Summary

**Từ chối lời mời tham gia doanh nghiệp**

Chuyển invitation của user hiện tại từ `Pending` sang `Rejected`; không tạo membership.

### Method & Path

```http
POST /api/v1/company-invitations/{invitationId}/reject
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Chỉ invitee đúng với user hiện tại được gọi.
- User phải có role `Recruiter`.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Content-Type` | Yes | String | `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Parameter | Required | DataType | Validation Rules |
|---|---:|---|---|
| `invitationId` | Yes | UUID | Invitation thuộc user hiện tại và đang `Pending`. |

Không yêu cầu body; có thể gửi `{}`.

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `204` | No Content | Từ chối thành công. |
| `400` | Bad Request | UUID sai format. |
| `401` | Unauthorized | Access Token không hợp lệ. |
| `403` | Forbidden | User không phải invitee. |
| `404` | Not Found | Invitation không tồn tại. |
| `409` | Conflict | Invitation đã xử lý. |
| `410` | Gone | Invitation đã hết hạn. |
| `500` | Internal Server Error | Lỗi cập nhật invitation. |

### Example Success Response

```http
HTTP/1.1 204 No Content
X-Correlation-ID: 5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af
```

</details>

<details>
<summary><strong>API 9: Submit Join Request</strong></summary>


### Title & Summary

**Gửi yêu cầu tham gia doanh nghiệp**

Tạo `COMPANY_JOIN_REQUEST` từ Recruiter đến company. Yêu cầu chỉ tạo membership sau khi Owner phê duyệt.

### Method & Path

```http
POST /api/v1/companies/{id}/join-requests
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Role: `Recruiter`.
- User chưa được là member Active của company.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Content-Type` | Yes | String | `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Field | Required | DataType | Validation Rules |
|---|---:|---|---|
| `companyId` | Yes | UUID | Company phải tồn tại. |
| `message` | No | String / null | Tối đa 1000 ký tự; lưu ở lớp API nếu ERD được bổ sung field tương ứng. Với ERD hiện tại, không persist field này. |

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `201` | Created | Tạo join request thành công. |
| `400` | Bad Request | UUID/body sai format. |
| `401` | Unauthorized | Access Token không hợp lệ. |
| `403` | Forbidden | User không có role Recruiter. |
| `404` | Not Found | Company không tồn tại. |
| `409` | Conflict | Đã có request pending hoặc đã là member. |
| `422` | Unprocessable Entity | Company không ở trạng thái cho phép tham gia. |
| `500` | Internal Server Error | Lỗi tạo request. |

### Example Request

```json
{
	"message": "I would like to join the recruiting team."
}
```

### Example Success Response

```json
{
	"data": {
		"id": "3f6cd741-36e9-4ed2-b7df-1a64bb8ce2b3",
		"companyId": "a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55",
		"userId": "e2c5a5c7-3658-442d-87c1-cf8ff34d2d8b",
		"status": "Pending",
		"createdAt": "2026-09-28T12:00:00Z"
	},
	"meta": {},
	"correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 10: List Join Requests</strong></summary>


### Title & Summary

**Xem yêu cầu tham gia doanh nghiệp**

Cho phép Owner xem các join request của company để xử lý.

### Method & Path

```http
GET /api/v1/companies/{id}/join-requests
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Chỉ Company Owner Active được gọi.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Accept` | Yes | String | Hỗ trợ `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Parameter | Required | DataType | Validation Rules |
|---|---:|---|---|
| `companyId` | Yes | UUID | UUID hợp lệ. |
| `status` | No | Enum | `Pending`, `Approved`, `Rejected`; mặc định `Pending`. |
| `page` | No | Integer | Mặc định 1; từ 1 trở lên. |
| `pageSize` | No | Integer | Mặc định 20; từ 1 đến 100. |

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Trả về danh sách request. |
| `400` | Bad Request | Query hoặc UUID sai format. |
| `401` | Unauthorized | Access Token không hợp lệ. |
| `403` | Forbidden | Caller không phải Owner. |
| `404` | Not Found | Company không tồn tại. |
| `500` | Internal Server Error | Lỗi truy vấn dữ liệu. |

### Example Success Response

```json
{
	"data": [
		{
			"id": "3f6cd741-36e9-4ed2-b7df-1a64bb8ce2b3",
			"user": {
				"id": "e2c5a5c7-3658-442d-87c1-cf8ff34d2d8b",
				"email": "recruiter@example.com",
				"fullName": "Le Van C"
			},
			"status": "Pending",
			"createdAt": "2026-09-28T12:00:00Z"
		}
	],
	"meta": {
		"page": 1,
		"pageSize": 20,
		"totalItems": 1,
		"totalPages": 1,
		"hasNextPage": false,
		"hasPreviousPage": false
	},
	"correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 11: Review Join Request</strong></summary>


### Title & Summary

**Duyệt hoặc từ chối yêu cầu tham gia doanh nghiệp**

Gộp thao tác approve và reject vào một resource transition. Với `status = APPROVED`, hệ thống ghi `reviewed_by`, `reviewed_at` và tạo membership `Member Active`; với `status = REJECTED`, hệ thống chỉ cập nhật trạng thái request. Hai trường hợp đều phải xử lý trong transaction.

### Method & Path

```http
PATCH /api/v1/companies/{id}/join-requests/{requestId}
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Chỉ Owner Active của company trong request được gọi.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Content-Type` | Yes | String | `application/json`. |
| `Accept` | Yes | String | Hỗ trợ `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Parameter / Field | Required | DataType | Validation Rules |
|---|---:|---|---|
| `id` | Yes | UUID | Company tồn tại và là company của request. |
| `requestId` | Yes | UUID | Request tồn tại, thuộc company và đang `Pending`. |
| `status` | Yes | Enum | Chỉ nhận `APPROVED` hoặc `REJECTED`. |

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Cập nhật request thành công; `APPROVED` tạo membership. |
| `400` | Bad Request | UUID hoặc JSON sai format. |
| `401` | Unauthorized | Access Token không hợp lệ. |
| `403` | Forbidden | Caller không phải Owner của company. |
| `404` | Not Found | Request không tồn tại. |
| `409` | Conflict | Request đã xử lý hoặc user đã là member. |
| `422` | Unprocessable Entity | Status không phải `APPROVED` hoặc `REJECTED`. |
| `500` | Internal Server Error | Transaction thất bại. |

### Example Request

```json
{
	"status": "APPROVED"
}
```

### Example Success Response: Approved

```json
{
	"data": {
		"requestId": "3f6cd741-36e9-4ed2-b7df-1a64bb8ce2b3",
		"companyId": "a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55",
		"status": "APPROVED",
		"reviewedBy": "7d9e6f7a-08d8-4e2a-8f68-5d0cb4f47e4a",
		"reviewedAt": "2026-09-28T12:30:00Z",
		"membership": {
			"role": "Member",
			"status": "Active"
		}
	},
	"meta": {},
	"correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

### Example Success Response: Rejected

```json
{
	"data": {
		"requestId": "3f6cd741-36e9-4ed2-b7df-1a64bb8ce2b3",
		"companyId": "a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55",
		"status": "REJECTED",
		"reviewedBy": "7d9e6f7a-08d8-4e2a-8f68-5d0cb4f47e4a",
		"reviewedAt": "2026-09-28T12:30:00Z",
		"membership": null
	},
	"meta": {},
	"correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 12: Transfer Company Ownership</strong></summary>


### Title & Summary

**Chuyển quyền Chủ doanh nghiệp**

Chuyển role membership của Owner hiện tại sang một thành viên khác. Sau transaction, người nhận trở thành `Owner` và người chuyển giao trở thành `Member`.

### Method & Path

```http
PUT /api/v1/companies/{id}/ownership
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Chỉ Owner Active hiện tại được gọi.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Content-Type` | Yes | String | `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Field | Required | DataType | Validation Rules |
|---|---:|---|---|
| `newOwnerId` | Yes | UUID | User phải là thành viên `Active`, khác Owner hiện tại và có role Recruiter. |

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Chuyển quyền thành công. |
| `400` | Bad Request | UUID/body sai format. |
| `401` | Unauthorized | Access Token không hợp lệ. |
| `403` | Forbidden | Caller không phải Owner. |
| `404` | Not Found | Company hoặc new owner không tồn tại. |
| `409` | Conflict | New owner không phải member Active hoặc company đang ở trạng thái không cho phép. |
| `422` | Unprocessable Entity | newOwnerId trùng caller hoặc không có role Recruiter. |
| `500` | Internal Server Error | Transaction thất bại. |

### Example Request

```json
{
	"newOwnerId": "e2c5a5c7-3658-442d-87c1-cf8ff34d2d8b"
}
```

### Example Success Response

```json
{
	"data": {
		"companyId": "a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55",
		"previousOwnerId": "7d9e6f7a-08d8-4e2a-8f68-5d0cb4f47e4a",
		"newOwnerId": "e2c5a5c7-3658-442d-87c1-cf8ff34d2d8b",
		"transferredAt": "2026-09-28T13:00:00Z"
	},
	"meta": {},
	"correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 13: Follow, Unfollow and List Company Followers</strong></summary>


### Title & Summary

**Theo dõi doanh nghiệp**

Candidate có thể theo dõi hoặc bỏ theo dõi doanh nghiệp. Người dùng có thể xem danh sách followers và tổng số followers của một company. Mỗi follow tương ứng một row trong `COMPANY_FOLLOW` với khóa ghép `(user_id, company_id)`.

### Methods & Paths

```http
POST   /api/v1/companies/{id}/followers
DELETE /api/v1/companies/{id}/followers
GET    /api/v1/companies/{id}/followers
```

### Authentication & Authorization

- `POST` và `DELETE` yêu cầu Access Token hợp lệ và role `Candidate`.
- `GET` yêu cầu Access Token hợp lệ và role `Recruiter`.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Conditional | String | Bắt buộc với POST/DELETE; dùng `Bearer <access-token>`. |
| `Accept` | Yes | String | Hỗ trợ `application/json` cho GET và POST. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Parameter | Required | DataType | Validation Rules |
|---|---:|---|---|
| `id` | Yes | UUID | Company phải tồn tại. |
| `page` | No | Integer | Chỉ dùng GET; mặc định 1. |
| `pageSize` | No | Integer | Chỉ dùng GET; mặc định 20; tối đa 100. |

Không có request body.

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | GET trả danh sách/count followers. |
| `201` | Created | POST tạo follow thành công. |
| `204` | No Content | DELETE thành công. |
| `400` | Bad Request | UUID/query sai format. |
| `401` | Unauthorized | Access Token thiếu hoặc không hợp lệ với POST/DELETE. |
| `403` | Forbidden | User không có role Candidate với POST/DELETE. |
| `404` | Not Found | Company không tồn tại. |
| `409` | Conflict | POST khi đã follow. |
| `500` | Internal Server Error | Lỗi thao tác follow. |

### Example POST Request

```http
POST /api/v1/companies/a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55/followers HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example
X-Correlation-ID: 5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af
```

### Example POST Response

```json
{
	"data": {
		"companyId": "a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55",
		"followed": true,
		"createdAt": "2026-09-28T14:00:00Z"
	},
	"meta": {},
	"correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

### Example GET Response

```json
{
	"data": {
		"companyId": "a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55",
		"followerCount": 128,
		"followers": [
			{
				"userId": "7d9e6f7a-08d8-4e2a-8f68-5d0cb4f47e4a",
				"fullName": "Nguyen Van A",
				"avatarUrl": null,
				"followedAt": "2026-09-28T14:00:00Z"
			}
		]
	},
	"meta": {
		"page": 1,
		"pageSize": 20,
		"totalItems": 1,
		"totalPages": 1,
		"hasNextPage": false,
		"hasPreviousPage": false
	},
	"correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>
