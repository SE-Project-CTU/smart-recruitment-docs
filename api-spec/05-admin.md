# Administration API

## Group Summary

Nhóm API quản trị `USER`, `ROLE`, `PERMISSION`, `ROLE_PERMISSION`, `COMPANY`, `JOB_POSTING`, `INDUSTRY_GROUP`, `INDUSTRY`, `PROVINCE`, `WARD`, `CV_TEMPLATE` và `SKILL`.

Tất cả endpoint yêu cầu role `Admin`. `JOB_EMBEDDING`, `CV_EMBEDDING`, `APPLICATION` và dữ liệu AI không được CRUD trực tiếp qua nhóm này.

## API List

| #   | API                        | Method & Path                                      | Resource                |
| --- | -------------------------- | -------------------------------------------------- | ----------------------- |
| 1   | Tìm kiếm người dùng        | `GET /api/v1/admin/users`                          | `USER`                  |
| 2   | Khóa/mở tài khoản          | `PATCH /api/v1/admin/users/{id}/status`            | `USER`, `REFRESH_TOKEN` |
| 3   | Doanh nghiệp cần duyệt     | `GET /api/v1/admin/companies`                      | `COMPANY`               |
| 4   | Xem chi tiết doanh nghiệp  | `GET /api/v1/admin/companies/{id}`                 | `COMPANY`               |
| 5   | Duyệt/từ chối doanh nghiệp | `PATCH /api/v1/admin/companies/{id}/verification`  | `COMPANY`               |
| 6   | Tin tuyển dụng cần duyệt   | `GET /api/v1/admin/job-postings`                   | `JOB_POSTING`           |
| 7   | Duyệt/từ chối tin          | `PATCH /api/v1/admin/job-postings/{id}/moderation` | `JOB_POSTING`           |
| 8   | Gán permission cho role    | `PUT /api/v1/admin/roles/{id}/permissions`         | `ROLE_PERMISSION`       |
| 9   | Quản lý permission         | `GET/POST /api/v1/admin/permissions`, `PATCH .../{id}` | `PERMISSION`       |
| 10  | Quản lý nhóm ngành         | `GET/POST /api/v1/admin/industry-groups`, `PATCH .../{id}` | `INDUSTRY_GROUP` |
| 11  | Quản lý ngành nghề         | `GET/POST /api/v1/admin/industries`, `PATCH .../{id}` | `INDUSTRY`           |
| 12  | Quản lý Tỉnh/Thành phố     | `GET/POST /api/v1/admin/provinces`, `PATCH .../{id}` | `PROVINCE`            |
| 13  | Quản lý Phường/Xã          | `GET/POST /api/v1/admin/wards`, `PATCH .../{id}` | `WARD`                |
| 14  | Quản lý template CV        | `GET/POST /api/v1/admin/cv-templates`, `PATCH .../{id}` | `CV_TEMPLATE`         |
| 15  | Quản lý kỹ năng            | `GET/POST /api/v1/admin/skills`, `PATCH .../{id}` | `SKILL`                 |
| 16  | Dashboard vận hành         | `GET /api/v1/admin/dashboard/overview`             | Aggregated read model   |

## Shared Rules

- Base URL: `/api/v1`.
- Bắt buộc `Authorization: Bearer <access-token>` và `X-Correlation-ID` là UUID.
- Khi khóa user, toàn bộ Refresh Token của user phải bị revoke.
- Các thao tác reject yêu cầu `reason`; ERD hiện chưa có cột reason nên reason chỉ dùng cho notification nếu schema chưa mở rộng.
- Không hard delete danh mục đang được tham chiếu; dùng `isActive = false` hoặc `status = INACTIVE`.
- Response dùng `data`, `meta`, `correlationId`; lỗi dùng `error`, `correlationId` theo [README.md](README.md).

## ERD Response Mapping

| API field                                | ERD column                                 | Resource                                    |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------------- |
| `fullName` / `avatarUrl`                 | `full_name` / `avatar_url`                 | `USER`                                      |
| `roleId` / `permissionId`                | `role_id` / `permission_id`                | RBAC resources                              |
| `verificationStatus` / `verifiedAt`      | `verification_status` / `verified_at`      | `COMPANY`                                   |
| `provinceId` / `wardId`                  | `province_id` / `ward_id`                  | `PROVINCE`, `WARD`, `JOB_POSTING`           |
| `category` / `isActive`                  | `category` / `is_active`                   | `SKILL`, `INDUSTRY_GROUP`, `INDUSTRY`, `CV_TEMPLATE` |
| `code` / `version`                        | `code` / `version`                         | `CV_TEMPLATE`                               |
| `defaultLayout` / `defaultContent` / `defaultPresentation` | `default_layout` / `default_content` / `default_presentation` | `CV_TEMPLATE` |
| `createdAt` / `updatedAt`                | `created_at` / `updated_at`                | Persisted resources                         |

<details>
<summary><strong>API 1: Search Users</strong></summary>

### Title & Summary

**Tìm kiếm và theo dõi người dùng**

Cho phép Admin xem Candidate/Recruiter và lọc theo trạng thái hoặc role.

### Method & Path

```http
GET /api/v1/admin/users
```

### Authentication & Authorization

Chỉ role `Admin` với Access Token hợp lệ.

### Headers

`Authorization` (required), `Accept: application/json` (required), `X-Correlation-ID` UUID (required).

### Request Parameters / Body

| Field               | Required | DataType | Validation Rules                                   |
| ------------------- | -------: | -------- | -------------------------------------------------- |
| `search`            |       No | String   | Tìm email, phone hoặc full name; tối đa 200 ký tự. |
| `role`              |       No | Enum     | `Candidate`, `Recruiter`, `Admin`.                 |
| `status`            |       No | Enum     | Status hợp lệ của `USER`.                          |
| `page` / `pageSize` |       No | Integer  | Mặc định 1/20; pageSize tối đa 100.                |

### Response Status Codes

`200` thành công; `400` query sai; `401` token sai; `403` không phải Admin; `500` lỗi truy vấn.

### Example Success Response

```json
{
  "data": [
    {
      "id": "7d9e6f7a-08d8-4e2a-8f68-5d0cb4f47e4a",
      "email": "candidate@example.com",
      "fullName": "Nguyen Van A",
      "avatarUrl": null,
      "status": "ACTIVE",
      "roles": ["Candidate"],
      "createdAt": "2026-09-28T10:30:00Z",
      "updatedAt": "2026-09-28T10:30:00Z"
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
<summary><strong>API 2: Update User Status</strong></summary>

### Title & Summary

**Khóa hoặc khôi phục tài khoản**

Cập nhật status user và revoke toàn bộ Refresh Token khi khóa.

### Method & Path

```http
PATCH /api/v1/admin/users/{id}/status
```

### Authentication & Authorization

Chỉ Admin; không được khóa Admin cuối cùng đang hoạt động.

### Headers

`Authorization`, `Content-Type: application/json` và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

| Field    | Required | DataType | Validation Rules        |
| -------- | -------: | -------- | ----------------------- |
| `id`     |      Yes | UUID     | User phải tồn tại.      |
| `status` |      Yes | Enum     | `ACTIVE` hoặc `LOCKED`. |
| `reason` |      Yes | String   | 5-1000 ký tự.           |

### Response Status Codes

`200` thành công; `400` sai body; `401` token sai; `403` không có quyền; `404` user không tồn tại; `409` state conflict; `422` validation; `500` lỗi transaction.

### Example Request

```json
{ "status": "LOCKED", "reason": "Repeated policy violations" }
```

### Example Success Response

```json
{
  "data": {
    "id": "7d9e6f7a-08d8-4e2a-8f68-5d0cb4f47e4a",
    "status": "LOCKED",
    "refreshTokensRevoked": true,
    "updatedAt": "2026-09-29T09:00:00Z"
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 3: List Companies for Review</strong></summary>

### Title & Summary

**Liệt kê doanh nghiệp cần kiểm duyệt**

Mặc định trả về company có `verificationStatus = PENDING`.

### Method & Path

```http
GET /api/v1/admin/companies
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Accept` và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

| Field                | Required | DataType | Validation Rules                    |
| -------------------- | -------: | -------- | ----------------------------------- |
| `verificationStatus` |       No | Enum     | `PENDING`, `VERIFIED`, `REJECTED`.  |
| `search`             |       No | String   | Tìm name, tax code hoặc email.      |
| `page` / `pageSize`  |       No | Integer  | Mặc định 1/20; pageSize tối đa 100. |

### Response Status Codes

`200` thành công; `400` query sai; `401` token sai; `403` không phải Admin; `500` lỗi truy vấn.

### Example Success Response

```json
{
  "data": [
    {
      "id": "a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55",
      "name": "SmartHire Technology",
      "taxCode": "0123456789",
      "email": "contact@smarthire.example",
      "verificationStatus": "PENDING",
      "verifiedAt": null,
      "createdAt": "2026-09-28T10:30:00Z",
      "updatedAt": "2026-09-28T10:30:00Z"
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
<summary><strong>API 4: Get Company Details for Admin</strong></summary>

### Title & Summary

**Xem thông tin chi tiết doanh nghiệp**

Cho phép Admin xem đầy đủ thông tin chi tiết của một doanh nghiệp (bao gồm MST, email, địa chỉ, website, mô tả, logo, trạng thái xác minh) trước khi phê duyệt hoặc từ chối.

### Method & Path

```http
GET /api/v1/admin/companies/{id}
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Accept` và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

| Field | Required | DataType | Validation Rules |
| ----- | -------: | -------- | ---------------- |
| `id`  |      Yes | UUID     | Company phải tồn tại. |

### Response Status Codes

`200` thành công; `401` token sai; `403` không phải Admin; `404` không tìm thấy doanh nghiệp; `500` lỗi CSDL.

### Example Success Response

```json
{
  "data": {
    "id": "a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55",
    "name": "SmartHire Technology",
    "taxCode": "0123456789",
    "email": "contact@smarthire.example",
    "phone": "0901234567",
    "address": "123 Le Loi, District 1, HCMC",
    "website": "https://smarthire.example",
    "description": "Leading HR tech company.",
    "logoUrl": "https://cdn.smarthire.example/logos/smarthire.png",
    "verificationStatus": "PENDING",
    "verifiedAt": null,
    "createdAt": "2026-09-28T10:30:00Z",
    "updatedAt": "2026-09-28T10:30:00Z"
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 5: Review Company Verification</strong></summary>

### Title & Summary

**Duyệt hoặc từ chối doanh nghiệp**

Cập nhật trạng thái xác minh company và gửi kết quả cho người liên quan.

### Method & Path

```http
PATCH /api/v1/admin/companies/{id}/verification
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Content-Type: application/json` và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

| Field                |    Required | DataType | Validation Rules                   |
| -------------------- | ----------: | -------- | ---------------------------------- |
| `id`                 |         Yes | UUID     | Company phải tồn tại.              |
| `verificationStatus` |         Yes | Enum     | `VERIFIED` hoặc `REJECTED`.        |
| `reason`             | Conditional | String   | Bắt buộc khi reject; 5-1000 ký tự. |

### Response Status Codes

`200` thành công; `400` sai body; `401` token sai; `403` không phải Admin; `404` không tồn tại; `409` state conflict; `422` thiếu reason; `500` transaction lỗi.

### Example Request

```json
{ "verificationStatus": "VERIFIED" }
```

### Example Success Response

```json
{
  "data": {
    "id": "a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55",
    "verificationStatus": "VERIFIED",
    "verifiedAt": "2026-09-29T10:00:00Z",
    "updatedAt": "2026-09-29T10:00:00Z"
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 6: List Job Postings for Review</strong></summary>

### Title & Summary

**Liệt kê tin tuyển dụng cần kiểm duyệt**

Trả về tin theo status moderation để Admin xử lý chống spam/lừa đảo.

### Method & Path

```http
GET /api/v1/admin/job-postings
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Accept` và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

| Field               | Required | DataType | Validation Rules                                            |
| ------------------- | -------: | -------- | ----------------------------------------------------------- |
| `status`            |       No | Enum     | `PENDING_REVIEW`, `APPROVED`, `REJECTED`, `OPEN`, `CLOSED`. |
| `companyId`         |       No | UUID     | Company filter phải tồn tại.                                |
| `page` / `pageSize` |       No | Integer  | Mặc định 1/20; pageSize tối đa 100.                         |

### Response Status Codes

`200` thành công; `400` query sai; `401` token sai; `403` không phải Admin; `404` company không tồn tại; `500` lỗi truy vấn.

### Example Success Response

```json
{
  "data": [
    {
      "id": "c8b2f7a1-3c2e-4a7c-a8e1-3d3dc0be8d91",
      "companyId": "a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55",
      "createdBy": "e2c5a5c7-3658-442d-87c1-cf8ff34d2d8b",
      "title": "Senior Backend Developer",
      "status": "PENDING_REVIEW",
      "createdAt": "2026-09-29T10:00:00Z",
      "updatedAt": "2026-09-29T10:00:00Z"
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
<summary><strong>API 7: Review Job Posting Moderation</strong></summary>

### Title & Summary

**Duyệt hoặc từ chối tin tuyển dụng**

Chuyển tin sang `APPROVED` hoặc `REJECTED`; tin chỉ được công khai khi company đã verified.

### Method & Path

```http
PATCH /api/v1/admin/job-postings/{id}/moderation
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Content-Type: application/json` và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

| Field    |    Required | DataType | Validation Rules                   |
| -------- | ----------: | -------- | ---------------------------------- |
| `id`     |         Yes | UUID     | Job phải tồn tại.                  |
| `status` |         Yes | Enum     | `APPROVED` hoặc `REJECTED`.        |
| `reason` | Conditional | String   | Bắt buộc khi reject; 5-1000 ký tự. |

### Response Status Codes

`200` thành công; `400` sai body; `401` token sai; `403` không phải Admin; `404` job không tồn tại; `409` đã xử lý/company chưa verified; `422` thiếu reason; `500` transaction lỗi.

### Example Request

```json
{ "status": "REJECTED", "reason": "The job description contains prohibited content." }
```

### Example Success Response

```json
{
  "data": {
    "id": "c8b2f7a1-3c2e-4a7c-a8e1-3d3dc0be8d91",
    "status": "REJECTED",
    "updatedAt": "2026-09-29T10:30:00Z"
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 8 (Pending): Replace Role Permissions</strong></summary>

### Title & Summary

**Gán permission cho role**

Thay thế toàn bộ mapping `ROLE_PERMISSION` của role trong transaction.

### Method & Path

```http
PUT /api/v1/admin/roles/{id}/permissions
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Content-Type: application/json` và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

| Field           | Required | DataType    | Validation Rules                      |
| --------------- | -------: | ----------- | ------------------------------------- |
| `id`            |      Yes | UUID        | Role phải tồn tại.                    |
| `permissionIds` |      Yes | Array<UUID> | Không trùng; permission phải tồn tại. |

### Response Status Codes

`200` thành công; `400` sai body; `401` token sai; `403` không phải Admin; `404` role/permission không tồn tại; `409` role hệ thống không đổi được; `422` validation; `500` transaction lỗi.

### Example Request

```json
{ "permissionIds": ["c0f9b1d8-1d4e-4b1e-bf9d-6b8c3c5e9e50"] }
```

### Example Success Response

```json
{
  "data": {
    "roleId": "b7a9d725-761d-4a6b-a46c-9be7d9b0b1c4",
    "permissionIds": ["c0f9b1d8-1d4e-4b1e-bf9d-6b8c3c5e9e50"]
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 9 (Pending): Manage Permissions</strong></summary>

### Title & Summary

**Quản lý permission**

Liệt kê, tạo và cập nhật permission dùng trong RBAC.

### Method & Path

```http
GET  /api/v1/admin/permissions
POST /api/v1/admin/permissions
PATCH /api/v1/admin/permissions/{id}
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Content-Type` với POST/PATCH và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

**Query Parameters (dành cho GET):**

| Parameter | Required | DataType | Validation Rules |
| --------- | -------: | -------- | ---------------- |
| `search`  |       No | String   | Tìm theo tên permission hoặc mô tả. |
| `page` / `pageSize` | No | Integer | Mặc định 1/20; pageSize tối đa 100. |

**Body (dành cho POST / PATCH):**

| Field         |     Required | DataType      | Validation Rules     |
| ------------- | -----------: | ------------- | -------------------- |
| `id`          |  Conditional | UUID          | Bắt buộc với PATCH.  |
| `name`        | Yes for POST | String        | Unique, 2-100 ký tự. |
| `description` |           No | String / null | Tối đa 500 ký tự.    |

### Response Status Codes

`200` GET/PATCH; `201` POST; `400` sai request; `401` token sai; `403` không phải Admin; `404` permission không tồn tại; `409` name trùng/đang dùng; `422` validation; `500` lỗi CSDL.

### Example Request

```json
{ "name": "job.review", "description": "Review and manage job postings." }
```

### Example Success Response

```json
{
  "data": {
    "id": "c0f9b1d8-1d4e-4b1e-bf9d-6b8c3c5e9e50",
    "name": "job.review",
    "description": "Review and manage job postings.",
    "createdAt": "2026-09-29T11:00:00Z"
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 10 (Pending): Manage Industry Groups</strong></summary>

### Title & Summary

**Quản lý nhóm ngành**

Tạo, cập nhật và bật/tắt nhóm ngành; không hard delete nhóm có ngành liên kết.

### Method & Path

```http
GET  /api/v1/admin/industry-groups
POST /api/v1/admin/industry-groups
PATCH /api/v1/admin/industry-groups/{id}
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Content-Type` với POST/PATCH và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

**Query Parameters (dành cho GET):**

| Parameter | Required | DataType | Validation Rules |
| --------- | -------: | -------- | ---------------- |
| `search`  |       No | String   | Tìm theo tên nhóm ngành. |
| `isActive` |      No | Boolean  | Lọc theo trạng thái bật/tắt. |
| `page` / `pageSize` | No | Integer | Mặc định 1/20; pageSize tối đa 100. |

**Body (dành cho POST / PATCH):**

| Field      |     Required | DataType | Validation Rules     |
| ---------- | -----------: | -------- | -------------------- |
| `id`       |  Conditional | UUID     | Bắt buộc với PATCH.  |
| `name`     | Yes for POST | String   | Unique, 2-150 ký tự. |
| `isActive` |           No | Boolean  | Dùng để ẩn/tắt.      |

### Response Status Codes

`200` GET/PATCH; `201` POST; `400` sai request; `401` token sai; `403` không phải Admin; `404` group không tồn tại; `409` name trùng; `422` validation; `500` lỗi CSDL.

### Example Success Response

```json
{
  "data": {
    "id": "b9d5cc8c-3378-4c4a-8ee7-b8c8c6d0d4d1",
    "name": "Information Technology",
    "isActive": true
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 11 (Pending): Manage Industries</strong></summary>

### Title & Summary

**Quản lý ngành nghề**

Tạo, cập nhật và bật/tắt ngành nghề thuộc nhóm ngành; ngành đã liên kết với job không hard delete.

### Method & Path

```http
GET  /api/v1/admin/industries
POST /api/v1/admin/industries
PATCH /api/v1/admin/industries/{id}
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Content-Type` với POST/PATCH và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

**Query Parameters (dành cho GET):**

| Parameter | Required | DataType | Validation Rules |
| --------- | -------: | -------- | ---------------- |
| `groupId` |       No | UUID     | Lọc theo nhóm ngành. |
| `search`  |       No | String   | Tìm theo tên ngành nghề. |
| `status`  |       No | Enum     | `ACTIVE`, `INACTIVE`. |
| `isActive` |      No | Boolean  | Lọc theo trạng thái bật/tắt. |
| `page` / `pageSize` | No | Integer | Mặc định 1/20; pageSize tối đa 100. |

**Body (dành cho POST / PATCH):**

| Field      |     Required | DataType | Validation Rules      |
| ---------- | -----------: | -------- | --------------------- |
| `id`       |  Conditional | UUID     | Bắt buộc với PATCH.   |
| `groupId`  | Yes for POST | UUID     | Group phải tồn tại.   |
| `name`     | Yes for POST | String   | Unique, 2-150 ký tự.  |
| `status`   |           No | Enum     | `ACTIVE`, `INACTIVE`. |
| `isActive` |           No | Boolean  | Dùng để ẩn/tắt.       |

### Response Status Codes

`200` GET/PATCH; `201` POST; `400` sai request; `401` token sai; `403` không phải Admin; `404` group/industry không tồn tại; `409` name/link conflict; `422` validation; `500` lỗi CSDL.

### Example Success Response

```json
{
  "data": {
    "id": "1f2d6c5a-bb50-4e8f-b1a2-27c5d1f42a87",
    "groupId": "b9d5cc8c-3378-4c4a-8ee7-b8c8c6d0d4d1",
    "name": "Backend Development",
    "status": "ACTIVE",
    "isActive": true
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 12 (Pending): Manage Provinces</strong></summary>

### Title & Summary

**Quản lý Tỉnh/Thành phố**

Tạo, cập nhật và bật/tắt Tỉnh/Thành phố dùng cho địa điểm công việc.

### Method & Path

```http
GET  /api/v1/admin/provinces
POST /api/v1/admin/provinces
PATCH /api/v1/admin/provinces/{id}
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Content-Type` với POST/PATCH và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

**Query Parameters (dành cho GET):**

| Parameter | Required | DataType | Validation Rules |
| --------- | -------: | -------- | ---------------- |
| `search`  |       No | String   | Tìm theo tên Tỉnh/Thành phố. |
| `status`  |       No | Enum     | `ACTIVE`, `INACTIVE`. |
| `page` / `pageSize` | No | Integer | Mặc định 1/20; pageSize tối đa 100. |

**Body (dành cho POST / PATCH):**

| Field    |     Required | DataType | Validation Rules      |
| -------- | -----------: | -------- | --------------------- |
| `id`     |  Conditional | UUID     | Bắt buộc với PATCH.   |
| `name`   | Yes for POST | String   | Unique, 2-150 ký tự.  |
| `status` |           No | Enum     | `ACTIVE`, `INACTIVE`. |

### Response Status Codes

`200` GET/PATCH; `201` POST; `400` sai request; `401` token sai; `403` không phải Admin; `404` province không tồn tại; `409` name đang được dùng; `422` validation; `500` lỗi CSDL.

### Example Success Response

```json
{
  "data": {
    "id": "f24c42be-cd89-4548-b5e8-1cb3b9b8ea6e",
    "name": "Thành phố Hồ Chí Minh",
    "status": "ACTIVE"
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 13 (Pending): Manage Wards</strong></summary>

### Title & Summary

**Quản lý Phường/Xã**

Tạo, cập nhật và bật/tắt Phường/Xã thuộc Tỉnh/Thành phố.

### Method & Path

```http
GET  /api/v1/admin/wards
POST /api/v1/admin/wards
PATCH /api/v1/admin/wards/{id}
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Content-Type` với POST/PATCH và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

**Query Parameters (dành cho GET):**

| Parameter | Required | DataType | Validation Rules |
| --------- | -------: | -------- | ---------------- |
| `provinceId` |    No | UUID     | Lọc theo Tỉnh/Thành phố. |
| `search`     |    No | String   | Tìm theo tên Phường/Xã. |
| `status`     |    No | Enum     | `ACTIVE`, `INACTIVE`. |
| `page` / `pageSize` | No | Integer | Mặc định 1/20; pageSize tối đa 100. |

**Body (dành cho POST / PATCH):**

| Field        |     Required | DataType | Validation Rules      |
| ------------ | -----------: | -------- | --------------------- |
| `id`         |  Conditional | UUID     | Bắt buộc với PATCH.   |
| `provinceId` | Yes for POST | UUID     | Province phải tồn tại.|
| `name`       | Yes for POST | String   | 2-150 ký tự.          |
| `status`     |           No | Enum     | `ACTIVE`, `INACTIVE`. |

### Response Status Codes

`200` GET/PATCH; `201` POST; `400` sai request; `401` token sai; `403` không phải Admin; `404` ward/province không tồn tại; `422` validation; `500` lỗi CSDL.

### Example Success Response

```json
{
  "data": {
    "id": "c1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c",
    "provinceId": "f24c42be-cd89-4548-b5e8-1cb3b9b8ea6e",
    "name": "Phường Ben Nghe",
    "status": "ACTIVE"
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 14: Manage CV Templates</strong></summary>

### Title & Summary

**Quản lý template CV**

Tạo, xem, cập nhật và bật/tắt template CV (`CV_TEMPLATE`). Template lưu `code` (để FE component mapping), `defaultLayout`, `defaultContent`, `defaultPresentation` (ba giá trị gợi ý ban đầu khi Candidate tạo CV), `version` và `thumbnailUrl`.

### Method & Path

```http
GET  /api/v1/admin/cv-templates
POST /api/v1/admin/cv-templates
PATCH /api/v1/admin/cv-templates/{id}
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Content-Type` với POST/PATCH và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

**Query Parameters (dành cho GET):**

| Parameter | Required | DataType | Validation Rules |
| --------- | -------: | -------- | ---------------- |
| `search`  |       No | String   | Tìm theo tên hoặc code template. |
| `isActive` |      No | Boolean  | Lọc theo trạng thái bật/tắt. |
| `page` / `pageSize` | No | Integer | Mặc định 1/20; pageSize tối đa 100. |

**Body (dành cho POST / PATCH):**

| Field                 |     Required | DataType    | Validation Rules                            |
| --------------------- | -----------: | ----------- | ------------------------------------------- |
| `id`                  |  Conditional | UUID        | Bắt buộc với PATCH.                         |
| `code`                | Yes for POST | String      | Định danh kỹ thuật duy nhất (e.g. `modern-blue`, `minimalist-v1`), lowercase kebab-case. |
| `name`                | Yes for POST | String      | 2-150 ký tự.                                |
| `description`         |           No | String      | Mô tả định dạng template.                   |
| `thumbnailUrl`        | Yes for POST | String      | URL ảnh xem trước hợp lệ.                   |
| `defaultLayout`       | Yes for POST | JSON Object | Tuân thủ `cv_layout_schema.json`; có `version`, `type`, `areas[].id` và `areas[].sections`. |
| `defaultContent`      | Yes for POST | JSON Object | Tuân thủ `cv_content_schema.json`; có `metadata`, `profile` và `sections.order`/`sections.objective` đúng cấu trúc. |
| `defaultPresentation` | Yes for POST | JSON Object | Tuân thủ `cv_presentation_schema.json`; có `metadata` và `styles.global`/`styles.fields`. |
| `version`             |           No | Integer     | Mặc định 1; tăng khi nâng cấp template.     |
| `isActive`            |           No | Boolean     | Tắt bằng false nếu template ngưng hỗ trợ.   |

### Response Status Codes

`200` GET/PATCH; `201` POST; `400` sai request; `401` token sai; `403` không phải Admin; `404` template không tồn tại; `409` code template đã tồn tại; `422` schema defaultLayout/defaultContent/defaultPresentation không hợp lệ; `500` lỗi CSDL/storage.

### Example Success Response

```json
{
  "data": {
    "id": "6a6c7345-ec6f-4b09-bf05-2a4a4a2e5a80",
    "code": "modern-blue",
    "name": "Modern Blue",
    "description": "Template hiện đại với bố cục dạng lưới linh hoạt",
    "thumbnailUrl": "https://cdn.smarthire.example/templates/modern-blue.png",
    "defaultLayout": {
      "version": "1.0",
      "type": "two-column",
      "areas": [
        { "id": "sidebar", "sections": ["skills", "education", "certifications"] },
        { "id": "main", "sections": ["objective", "experience", "projects"] }
      ]
    },
    "defaultContent": {
      "metadata": { "version": "1.0", "templateId": "tpl_modern_tech_01", "language": "vi", "updatedAt": "2026-09-24T10:00:00Z" },
      "profile": {
        "fullName": "", "title": "", "avatarUrl": "https://cdn.smarthire.example/avatar-placeholder.png",
        "email": "", "phone": "", "dob": "", "address": "",
        "website": "https://smarthire.example", "socialLink": "https://linkedin.com"
      },
      "sections": {
        "order": ["objective", "experience", "education", "skills", "projects", "certifications", "awards", "interests", "additionalInfo"],
        "objective": { "title": "Mục tiêu nghề nghiệp", "visible": true, "content": "" },
        "experience": { "title": "Kinh nghiệm làm việc", "visible": true, "items": [] },
        "education": { "title": "Học vấn", "visible": true, "items": [] },
        "skills": { "title": "Kỹ năng chuyên môn", "visible": true, "items": [] },
        "projects": { "title": "Dự án nổi bật", "visible": true, "items": [] },
        "certifications": { "title": "Chứng chỉ", "visible": true, "items": [] },
        "awards": { "title": "Giải thưởng", "visible": true, "items": [] },
        "interests": { "title": "Sở thích", "visible": true, "content": "" },
        "additionalInfo": { "title": "Thông tin bổ sung", "visible": true, "content": "" }
      }
    },
    "defaultPresentation": {
      "metadata": { "version": "1.0", "templateId": "tpl_modern_tech_01", "updatedAt": "2026-09-24T10:51:00Z" },
      "styles": {
        "global": { "fontFamily": "Inter", "baseFontSize": 14, "primaryColor": "#2563EB", "lineHeight": 1.5 },
        "fields": {}
      }
    },    "version": 1,
    "isActive": true,
    "createdAt": "2026-09-01T08:00:00Z",
    "updatedAt": "2026-09-01T08:00:00Z"
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 15: Manage Skills</strong></summary>

### Title & Summary

**Quản lý kỹ năng chuẩn hóa**

Tạo, xem, cập nhật và bật/tắt danh mục Kỹ năng (Skill set) dùng chung toàn hệ thống và AI.

### Method & Path

```http
GET  /api/v1/admin/skills
POST /api/v1/admin/skills
PATCH /api/v1/admin/skills/{id}
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Content-Type` với POST/PATCH và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

**Query Parameters (dành cho GET):**

| Parameter | Required | DataType | Validation Rules |
| --------- | -------: | -------- | ---------------- |
| `search`  |       No | String   | Tìm theo tên kỹ năng hoặc category. |
| `isActive` |      No | Boolean  | Lọc theo trạng thái bật/tắt. |
| `page` / `pageSize` | No | Integer | Mặc định 1/20; pageSize tối đa 100. |

**Body (dành cho POST / PATCH):**

| Field      |     Required | DataType | Validation Rules     |
| ---------- | -----------: | -------- | -------------------- |
| `id`       |  Conditional | UUID     | Bắt buộc với PATCH.  |
| `name`     | Yes for POST | String   | Unique, 2-100 ký tự. |
| `isActive` |           No | Boolean  | Mặc định `true`.     |

### Response Status Codes

`200` GET/PATCH; `201` POST; `400` sai request; `401` token sai; `403` không phải Admin; `404` skill không tồn tại; `409` name trùng; `422` validation; `500` lỗi CSDL.

### Example Success Response

```json
{
  "data": {
    "id": "e8d4a1b2-9c3f-4e5a-8b1d-2f3a4b5c6d7e",
    "name": "PostgreSQL",
    "isActive": true,
    "createdAt": "2026-09-29T12:00:00Z"
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 16: Get Operations Dashboard</strong></summary>

### Title & Summary

**Xem dashboard thống kê vận hành**

Tổng hợp số liệu từ user, company, job posting và application.

### Method & Path

```http
GET /api/v1/admin/dashboard/overview
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Accept` và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

| Parameter | Required | DataType | Validation Rules       |
| --------- | -------: | -------- | ---------------------- |
| `from`    |       No | DateTime | ISO 8601 UTC.          |
| `to`      |       No | DateTime | ISO 8601 UTC; >= from. |

### Response Status Codes

`200` thành công; `400` thời gian sai; `401` token sai; `403` không phải Admin; `500` lỗi aggregate query.

### Example Success Response

```json
{
  "data": {
    "period": { "from": "2026-09-01T00:00:00Z", "to": "2026-09-29T23:59:59Z" },
    "users": { "total": 1200, "new": 85, "active": 1100, "locked": 100 },
    "companies": { "total": 130, "pendingVerification": 8, "verified": 115, "rejected": 7 },
    "jobPostings": { "total": 420, "pendingReview": 15, "open": 260, "expired": 90, "closed": 55 },
    "applications": { "total": 3200, "new": 420, "interviews": 180, "rejected": 900 }
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

