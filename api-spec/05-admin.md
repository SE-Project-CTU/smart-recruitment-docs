# Administration API

## Group Summary

> **Trạng thái triển khai:** Toàn bộ 14 nhóm API quản trị (`/api/v1/admin/*`) đã được triển khai hoàn tất tại Backend thông qua 7 Admin Controller, tuân thủ Clean Architecture, xác thực Role `Admin` và tối ưu chống N+1 query.

Nhóm API quản trị `USER`, `ROLE`, `USER_ROLE`, `COMPANY`, `JOB_POSTING`, `INDUSTRY_GROUP`, `INDUSTRY`, `PROVINCE`, `WARD`, `CV_TEMPLATE` và `SKILL`.

Tất cả endpoint yêu cầu role `Admin`. `JOB_EMBEDDING`, `CV_EMBEDDING`, `APPLICATION` và dữ liệu AI không được CRUD trực tiếp qua nhóm này.

## API List

| #   | API                        | Method & Path                                              | Resource                |
| --- | -------------------------- | ---------------------------------------------------------- | ----------------------- |
| 1   | Tìm kiếm người dùng        | `GET /api/v1/admin/users`                                  | `USER`                  |
| 2   | Khóa/mở tài khoản          | `PATCH /api/v1/admin/users/{id}/status`                    | `USER`, `REFRESH_TOKEN` |
| 3   | Doanh nghiệp cần duyệt     | `GET /api/v1/admin/companies`                              | `COMPANY`               |
| 4   | Xem chi tiết doanh nghiệp  | `GET /api/v1/admin/companies/{id}`                         | `COMPANY`               |
| 5   | Duyệt/từ chối doanh nghiệp | `PATCH /api/v1/admin/companies/{id}/verification`          | `COMPANY`               |
| 6   | Tin tuyển dụng cần duyệt   | `GET /api/v1/admin/job-postings`                           | `JOB_POSTING`           |
| 7   | Duyệt/từ chối tin          | `PATCH /api/v1/admin/job-postings/{id}/moderation`         | `JOB_POSTING`           |
| 8   | Quản lý nhóm ngành         | `GET/POST /api/v1/admin/industry-groups`, `PATCH .../{id}` | `INDUSTRY_GROUP`        |
| 9   | Quản lý ngành nghề         | `GET/POST /api/v1/admin/industries`, `PATCH .../{id}`      | `INDUSTRY`              |
| 10  | Quản lý Tỉnh/Thành phố     | `GET/POST /api/v1/admin/provinces`, `PATCH .../{id}`       | `PROVINCE`              |
| 11  | Quản lý Phường/Xã          | `GET/POST /api/v1/admin/wards`, `PATCH .../{id}`           | `WARD`                  |
| 12  | Quản lý template CV        | `GET/POST /api/v1/admin/cv-templates`, `PATCH .../{id}`    | `CV_TEMPLATE`           |
| 13  | Quản lý kỹ năng            | `GET/POST /api/v1/admin/skills`, `PATCH .../{id}`          | `SKILL`                 |
| 14  | Dashboard vận hành         | `GET /api/v1/admin/dashboard/overview`                     | Aggregated read model   |

## Shared Rules

- Base URL: `/api/v1`.
- Bắt buộc `Authorization: Bearer <access-token>` và `X-Correlation-ID` là UUID.
- Khi khóa user, toàn bộ Refresh Token của user phải bị revoke.
- Các thao tác reject (`Company`, `JobPosting`) yêu cầu lý do từ chối để gửi thông báo (Notification) qua chuông thông báo hệ thống đến người liên quan.
- Không hard delete danh mục đang được tham chiếu; áp dụng cơ chế Soft Hide bằng `isActive = false` hoặc `status = Inactive`.
- Response dùng `data`, `meta`, `correlationId`; lỗi dùng `error`, `correlationId` theo [README.md](README.md).

## ERD Response Mapping

| API field                              | ERD column                               | Resource                                             |
| -------------------------------------- | ---------------------------------------- | ---------------------------------------------------- |
| `fullName` / `avatarUrl` / `phone`     | `full_name` / `avatar_url` / `phone`     | `USER`                                               |
| `roleId`                               | `role_id`                                | `ROLE`, `USER_ROLE`                                  |
| `verificationStatus` / `verifiedAt`    | `verification_status` / `verified_at`    | `COMPANY`                                            |
| `provinceId` / `wardId`                | `province_id` / `ward_id`                | `PROVINCE`, `WARD`, `JOB_POSTING`                    |
| `isCentrallyGoverned`                  | `is_centrally_governed`                  | `PROVINCE`                                           |
| `isCommune`                            | `is_commune`                             | `WARD`                                               |
| `category` / `isActive`                | `category` / `is_active`                 | `SKILL`, `INDUSTRY_GROUP`, `INDUSTRY`, `CV_TEMPLATE` |
| `code` / `version` / `thumbnailFileId` | `code` / `version` / `thumbnail_file_id` | `CV_TEMPLATE`                                        |
| `defaultLayout` / `defaultContent`     | `default_layout` / `default_content`     | `CV_TEMPLATE`                                        |
| `createdAt` / `updatedAt`              | `created_at` / `updated_at`              | Persisted resources                                  |

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

| Field               | Required | DataType | Validation Rules                                           |
| ------------------- | -------: | -------- | ---------------------------------------------------------- |
| `search`            |       No | String   | Tìm email, phone hoặc full name; tối đa 200 ký tự.         |
| `role`              |       No | Enum     | `Candidate`, `Recruiter`, `Admin`.                         |
| `status`            |       No | Enum     | Status hợp lệ của `USER` (`Active`, `Locked`, `Inactive`). |
| `page` / `pageSize` |       No | Integer  | Mặc định 1/20; pageSize tối đa 100.                        |

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
      "phone": "0901234567",
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

**Khóa, khôi phục hoặc vô hiệu hóa tài khoản**

Cập nhật status user (`Active`, `Locked`, `Inactive`) và thu hồi (revoke) toàn bộ Refresh Token khi khóa (`Locked`) hoặc vô hiệu hóa (`Inactive`).

### Method & Path

```http
PATCH /api/v1/admin/users/{id}/status
```

### Authentication & Authorization

Chỉ Admin; không được khóa hoặc vô hiệu hóa Admin cuối cùng đang hoạt động.

### Headers

`Authorization`, `Content-Type: application/json` và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

| Field    |    Required | DataType | Validation Rules                                              |
| -------- | ----------: | -------- | ------------------------------------------------------------- |
| `id`     |         Yes | UUID     | User phải tồn tại trong hệ thống.                             |
| `status` |         Yes | Enum     | `Active`, `Locked`, hoặc `Inactive`.                          |
| `reason` | Conditional | String   | Bắt buộc khi khóa (`Locked`), 5-1000 ký tự giải trình lý do. |

### Response Status Codes

`200` thành công; `400` sai body; `401` token sai; `403` không có quyền; `404` user không tồn tại; `409` trạng thái không đổi (xung đột); `422` validation; `500` lỗi transaction.

### Example Request

```json
{ "status": "Locked", "reason": "Repeated policy violations" }
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
      "phone": "0901234567",
      "address": "123 Le Loi, District 1, HCMC",
      "website": "https://smarthire.example",
      "logoUrl": "https://cdn.smarthire.example/logos/smarthire.png",
      "verificationStatus": "PENDING",
      "verifiedAt": null,
      "createdAt": "2026-09-28T10:30:00Z",
      "updatedAt": "2026-09-28T10:30:00Z",
      "owner": {
        "id": "e2c5a5c7-3658-442d-87c1-cf8ff34d2d8b",
        "fullName": "Nguyen Van B",
        "email": "owner@smarthire.example",
        "phone": "0901234567"
      }
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

Cho phép Admin xem đầy đủ thông tin chi tiết của một doanh nghiệp (MST, email, địa chỉ, website, mô tả, logo, người đại diện, số thành viên, số lượng tin tuyển dụng) trước khi phê duyệt hoặc từ chối.

### Method & Path

```http
GET /api/v1/admin/companies/{id}
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Accept` và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

| Field | Required | DataType | Validation Rules      |
| ----- | -------: | -------- | --------------------- |
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
    "updatedAt": "2026-09-28T10:30:00Z",
    "owner": {
      "id": "e2c5a5c7-3658-442d-87c1-cf8ff34d2d8b",
      "fullName": "Nguyen Van B",
      "email": "owner@smarthire.example",
      "phone": "0901234567"
    },
    "memberCount": 5,
    "jobPostingCount": 12
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

Cập nhật trạng thái xác minh company và gửi thông báo hệ thống kèm lý do nếu từ chối.

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

Trả về tin theo status kiểm duyệt để Admin xử lý phê duyệt, ngăn chặn spam/lừa đảo.

### Method & Path

```http
GET /api/v1/admin/job-postings
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Accept` và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

| Field               | Required | DataType | Validation Rules                                               |
| ------------------- | -------: | -------- | -------------------------------------------------------------- |
| `search`            |       No | String   | Tìm theo tiêu đề tin tuyển dụng.                               |
| `status`            |       No | Enum     | `PendingReview`, `Published`, `Closed`, `Expired`, `Rejected`. |
| `companyId`         |       No | UUID     | Company filter phải tồn tại.                                   |
| `page` / `pageSize` |       No | Integer  | Mặc định 1/20; pageSize tối đa 100.                            |

### Response Status Codes

`200` thành công; `400` query sai; `401` token sai; `403` không phải Admin; `404` company không tồn tại; `500` lỗi truy vấn.

### Example Success Response

```json
{
  "data": [
    {
      "id": "c8b2f7a1-3c2e-4a7c-a8e1-3d3dc0be8d91",
      "companyId": "a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55",
      "companyName": "SmartHire Technology",
      "companyLogoUrl": "https://cdn.smarthire.example/logos/smarthire.png",
      "createdBy": "e2c5a5c7-3658-442d-87c1-cf8ff34d2d8b",
      "title": "Senior Backend Developer",
      "status": "PENDINGREVIEW",
      "provinceName": "Thành phố Hồ Chí Minh",
      "wardName": "Phường Bến Nghé",
      "vacancies": 3,
      "salaryMin": 25000000,
      "salaryMax": 40000000,
      "salaryNegotiable": false,
      "deadline": "2026-12-31T23:59:59Z",
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

Chuyển tin sang `Published` (được duyệt) hoặc `Rejected` (kèm lý do). Tin chỉ được duyệt công khai khi Doanh nghiệp liên kết đã được xác minh (`Verified`).

### Method & Path

```http
PATCH /api/v1/admin/job-postings/{id}/moderation
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Content-Type: application/json` và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

| Field             |    Required | DataType | Validation Rules                               |
| ----------------- | ----------: | -------- | ---------------------------------------------- |
| `id`              |         Yes | UUID     | Job phải tồn tại.                              |
| `status`          |         Yes | Enum     | `Published` hoặc `Rejected`.                   |
| `rejectionReason` | Conditional | String   | Bắt buộc khi reject; lý do từ chối kiểm duyệt. |

### Response Status Codes

`200` thành công; `400` sai body; `401` token sai; `403` không phải Admin; `404` job không tồn tại; `409` đã kiểm duyệt/doanh nghiệp chưa xác minh; `422` thiếu lý do từ chối; `500` transaction lỗi.

### Example Request

```json
{
  "status": "Rejected",
  "rejectionReason": "The job description contains prohibited content."
}
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
<summary><strong>API 8: Manage Industry Groups</strong></summary>

### Title & Summary

**Quản lý nhóm ngành**

Tạo, xem danh sách, cập nhật tên và bật/tắt (Soft Hide) nhóm ngành nghề dùng để phân loại thị trường việc làm.

### Method & Path

```http
GET   /api/v1/admin/industry-groups
POST  /api/v1/admin/industry-groups
PATCH /api/v1/admin/industry-groups/{id}
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Content-Type` với POST/PATCH và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

**Query Parameters (dành cho GET):**

| Parameter           | Required | DataType | Validation Rules                    |
| ------------------- | -------: | -------- | ----------------------------------- |
| `search`            |       No | String   | Tìm theo tên nhóm ngành.            |
| `isActive`          |       No | Boolean  | Lọc theo trạng thái bật/tắt.        |
| `page` / `pageSize` |       No | Integer  | Mặc định 1/20; pageSize tối đa 100. |

**Body (dành cho POST / PATCH):**

| Field      |     Required | DataType | Validation Rules                                 |
| ---------- | -----------: | -------- | ------------------------------------------------ |
| `id`       |  Conditional | UUID     | Bắt buộc trong URL với PATCH.                    |
| `name`     | Yes for POST | String   | Tên nhóm ngành duy nhất, 2-150 ký tự.            |
| `isActive` |           No | Boolean  | Bật/tắt trạng thái hoạt động (Soft Hide, PATCH). |

### Response Status Codes

`200` GET/PATCH; `201` POST; `400` sai request; `401` token sai; `403` không phải Admin; `404` không tìm thấy nhóm ngành; `409` trùng tên nhóm ngành; `422` validation; `500` lỗi CSDL.

### Example Success Response

```json
{
  "data": {
    "id": "b9d5cc8c-3378-4c4a-8ee7-b8c8c6d0d4d1",
    "name": "Công nghệ thông tin & Phần mềm",
    "isActive": true,
    "industriesCount": 12
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 9: Manage Industries</strong></summary>

### Title & Summary

**Quản lý ngành nghề**

Tạo, cập nhật và bật/tắt ngành nghề thuộc nhóm ngành; ngành đã liên kết với tin tuyển dụng không được hard delete (áp dụng Soft Hide).

### Method & Path

```http
GET   /api/v1/admin/industries
POST  /api/v1/admin/industries
PATCH /api/v1/admin/industries/{id}
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Content-Type` với POST/PATCH và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

**Query Parameters (dành cho GET):**

| Parameter           | Required | DataType | Validation Rules                    |
| ------------------- | -------: | -------- | ----------------------------------- |
| `groupId`           |       No | UUID     | Lọc theo nhóm ngành.                |
| `search`            |       No | String   | Tìm theo tên ngành nghề.            |
| `isActive`          |       No | Boolean  | Lọc theo trạng thái bật/tắt.        |
| `page` / `pageSize` |       No | Integer  | Mặc định 1/20; pageSize tối đa 100. |

**Body (dành cho POST / PATCH):**

| Field      |     Required | DataType | Validation Rules                                 |
| ---------- | -----------: | -------- | ------------------------------------------------ |
| `id`       |  Conditional | UUID     | Bắt buộc trong URL với PATCH.                    |
| `groupId`  | Yes for POST | UUID     | GroupId phải tồn tại trong CSDL.                 |
| `name`     | Yes for POST | String   | Tên ngành nghề duy nhất, 2-150 ký tự.            |
| `isActive` |           No | Boolean  | Bật/tắt trạng thái hoạt động (Soft Hide, PATCH). |

### Response Status Codes

`200` GET/PATCH; `201` POST; `400` sai request; `401` token sai; `403` không phải Admin; `404` group/industry không tồn tại; `409` trùng tên ngành nghề; `422` validation; `500` lỗi CSDL.

### Example Success Response

```json
{
  "data": {
    "id": "1f2d6c5a-bb50-4e8f-b1a2-27c5d1f42a87",
    "groupId": "b9d5cc8c-3378-4c4a-8ee7-b8c8c6d0d4d1",
    "groupName": "Công nghệ thông tin & Phần mềm",
    "name": "Backend Development",
    "isActive": true
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 10: Manage Provinces</strong></summary>

### Title & Summary

**Quản lý Tỉnh/Thành phố**

Tạo, cập nhật và bật/tắt Tỉnh/Thành phố dùng cho địa điểm công việc.

### Method & Path

```http
GET   /api/v1/admin/provinces
POST  /api/v1/admin/provinces
PATCH /api/v1/admin/provinces/{id}
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Content-Type` với POST/PATCH và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

**Query Parameters (dành cho GET):**

| Parameter           | Required | DataType | Validation Rules                    |
| ------------------- | -------: | -------- | ----------------------------------- |
| `search`            |       No | String   | Tìm theo tên Tỉnh/Thành phố.        |
| `status`            |       No | Enum     | `Active`, `Inactive`.               |
| `page` / `pageSize` |       No | Integer  | Mặc định 1/20; pageSize tối đa 100. |

**Body (dành cho POST / PATCH):**

| Field                 |     Required | DataType | Validation Rules                                       |
| --------------------- | -----------: | -------- | ------------------------------------------------------ |
| `id`                  |  Conditional | UUID     | Bắt buộc trong URL với PATCH.                          |
| `name`                | Yes for POST | String   | Tên tỉnh/thành phố duy nhất, 2-150 ký tự.              |
| `isCentrallyGoverned` |           No | Boolean  | Thành phố trực thuộc Trung ương (Hà Nội, TP.HCM, ...). |
| `status`              |           No | Enum     | `Active`, `Inactive` (PATCH).                          |

### Response Status Codes

`200` GET/PATCH; `201` POST; `400` sai request; `401` token sai; `403` không phải Admin; `404` province không tồn tại; `409` name đã tồn tại; `422` validation; `500` lỗi CSDL.

### Example Success Response

```json
{
  "data": {
    "id": "f24c42be-cd89-4548-b5e8-1cb3b9b8ea6e",
    "name": "Thành phố Hồ Chí Minh",
    "status": "Active",
    "isCentrallyGoverned": true,
    "wardsCount": 312
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 11: Manage Wards</strong></summary>

### Title & Summary

**Quản lý Phường/Xã**

Tạo, cập nhật và bật/tắt Phường/Xã thuộc Tỉnh/Thành phố.

### Method & Path

```http
GET   /api/v1/admin/wards
POST  /api/v1/admin/wards
PATCH /api/v1/admin/wards/{id}
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Content-Type` với POST/PATCH và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

**Query Parameters (dành cho GET):**

| Parameter           | Required | DataType | Validation Rules                    |
| ------------------- | -------: | -------- | ----------------------------------- |
| `provinceId`        |       No | UUID     | Lọc theo Tỉnh/Thành phố.            |
| `search`            |       No | String   | Tìm theo tên Phường/Xã.             |
| `status`            |       No | Enum     | `Active`, `Inactive`.               |
| `page` / `pageSize` |       No | Integer  | Mặc định 1/20; pageSize tối đa 100. |

**Body (dành cho POST / PATCH):**

| Field        |     Required | DataType | Validation Rules                    |
| ------------ | -----------: | -------- | ----------------------------------- |
| `id`         |  Conditional | UUID     | Bắt buộc trong URL với PATCH.       |
| `provinceId` | Yes for POST | UUID     | Tỉnh/thành phố phải tồn tại.        |
| `name`       | Yes for POST | String   | Tên phường/xã, 2-150 ký tự.         |
| `isCommune`  |           No | Boolean  | Xác định là Xã hay Phường/Thị trấn. |
| `status`     |           No | Enum     | `Active`, `Inactive` (PATCH).       |

### Response Status Codes

`200` GET/PATCH; `201` POST; `400` sai request; `401` token sai; `403` không phải Admin; `404` ward/province không tồn tại; `422` validation; `500` lỗi CSDL.

### Example Success Response

```json
{
  "data": {
    "id": "c1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c",
    "provinceId": "f24c42be-cd89-4548-b5e8-1cb3b9b8ea6e",
    "provinceName": "Thành phố Hồ Chí Minh",
    "name": "Phường Bến Nghé",
    "status": "Active",
    "isCommune": false
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 12: Manage CV Templates</strong></summary>

### Title & Summary

**Quản lý template CV**

Tạo, xem chi tiết, danh sách, cập nhật và bật/tắt template CV (`CV_TEMPLATE`). Template lưu `code` (cho FE component mapping), `thumbnailFileId` (liên kết với media file lưu trữ), `defaultLayout`, `defaultContent`, `version`, `language` và trạng thái `isActive`.

### Method & Path

```http
GET   /api/v1/admin/cv-templates
GET   /api/v1/admin/cv-templates/{id}
POST  /api/v1/admin/cv-templates
PATCH /api/v1/admin/cv-templates/{id}
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Content-Type` với POST/PATCH và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

**Query Parameters (dành cho GET):**

| Parameter           | Required | DataType | Validation Rules                    |
| ------------------- | -------: | -------- | ----------------------------------- |
| `search`            |       No | String   | Tìm theo tên hoặc code template.    |
| `isActive`          |       No | Boolean  | Lọc theo trạng thái bật/tắt.        |
| `page` / `pageSize` |       No | Integer  | Mặc định 1/20; pageSize tối đa 100. |

**Body (dành cho POST / PATCH):**

| Field             |     Required | DataType    | Validation Rules                                                                   |
| ----------------- | -----------: | ----------- | ---------------------------------------------------------------------------------- |
| `id`              |  Conditional | UUID        | Bắt buộc trong URL với PATCH.                                                      |
| `code`            | Yes for POST | String      | Mã định danh duy nhất (e.g. `modern-blue`, `minimalist-v1`), lowercase kebab-case. |
| `name`            | Yes for POST | String      | Tên mẫu CV, 2-150 ký tự.                                                           |
| `description`     |           No | String      | Mô tả phong cách template.                                                         |
| `thumbnailFileId` | Yes for POST | UUID        | ID file ảnh xem trước hợp lệ từ MediaFile.                                         |
| `version`         |           No | String      | Mặc định "1.0".                                                                    |
| `language`        |           No | String      | Ngôn ngữ mặc định ("Vietnamese", "English").                                       |
| `defaultLayout`   | Yes for POST | JSON Object | Cấu trúc layout JSON (`version`, `type`, `areas`).                                 |
| `defaultContent`  | Yes for POST | JSON Object | Cấu trúc nội dung khởi tạo JSON (`profile`, `sections`).                           |
| `isActive`        |           No | Boolean     | Tắt bằng false nếu template ngưng hỗ trợ (Soft Hide).                              |

### Response Status Codes

`200` GET/PATCH; `201` POST; `400` sai request; `401` token sai; `403` không phải Admin; `404` template không tồn tại; `409` code template đã tồn tại; `422` cấu trúc JSON không hợp lệ; `500` lỗi CSDL/storage.

### Example Success Response

```json
{
  "data": {
    "id": "6a6c7345-ec6f-4b09-bf05-2a4a4a2e5a80",
    "code": "modern-blue",
    "name": "Modern Blue",
    "description": "Template hiện đại với bố cục 2 cột linh hoạt",
    "thumbnailFileId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "thumbnailUrl": "https://cdn.smarthire.example/templates/modern-blue.png",
    "version": "1.0",
    "language": "Vietnamese",
    "defaultLayout": {
      "version": "1.0",
      "type": "two-column",
      "areas": [
        {
          "id": "sidebar",
          "sections": ["skills", "education", "certifications"]
        },
        { "id": "main", "sections": ["objective", "experience", "projects"] }
      ]
    },
    "defaultContent": {
      "profile": {
        "fullName": "",
        "title": "",
        "email": "",
        "phone": ""
      },
      "sections": {
        "order": ["objective", "experience", "education", "skills"]
      }
    },
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
<summary><strong>API 13: Manage Skills</strong></summary>

### Title & Summary

**Quản lý kỹ năng chuẩn hóa**

Tạo, xem danh sách, cập nhật tên và bật/tắt danh mục Kỹ năng (Skill set) dùng chung toàn hệ thống và AI.

### Method & Path

```http
GET   /api/v1/admin/skills
POST  /api/v1/admin/skills
PATCH /api/v1/admin/skills/{id}
```

### Authentication & Authorization

Chỉ Admin.

### Headers

`Authorization`, `Content-Type` với POST/PATCH và `X-Correlation-ID` UUID là bắt buộc.

### Request Parameters / Body

**Query Parameters (dành cho GET):**

| Parameter           | Required | DataType | Validation Rules                    |
| ------------------- | -------: | -------- | ----------------------------------- |
| `search`            |       No | String   | Tìm theo tên kỹ năng.               |
| `isActive`          |       No | Boolean  | Lọc theo trạng thái bật/tắt.        |
| `page` / `pageSize` |       No | Integer  | Mặc định 1/20; pageSize tối đa 100. |

**Body (dành cho POST / PATCH):**

| Field      |     Required | DataType | Validation Rules                                 |
| ---------- | -----------: | -------- | ------------------------------------------------ |
| `id`       |  Conditional | UUID     | Bắt buộc trong URL với PATCH.                    |
| `name`     | Yes for POST | String   | Tên kỹ năng chuẩn hóa duy nhất, 2-100 ký tự.     |
| `isActive` |           No | Boolean  | Bật/tắt trạng thái hoạt động (Soft Hide, PATCH). |

### Response Status Codes

`200` GET/PATCH; `201` POST; `400` sai request; `401` token sai; `403` không phải Admin; `404` skill không tồn tại; `409` name trùng; `422` validation; `500` lỗi CSDL.

### Example Success Response

```json
{
  "data": {
    "id": "6045904c-4d15-47fa-9164-7b5989ba02dc",
    "name": "Docker",
    "isActive": true,
    "createdAt": "2026-10-11T10:00:00Z"
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 14: Get Operations Dashboard</strong></summary>

### Title & Summary

**Xem dashboard thống kê vận hành**

Tổng hợp số liệu thời gian thực từ người dùng, doanh nghiệp, tin tuyển dụng và lượt ứng tuyển.

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
    "companies": {
      "total": 130,
      "pendingVerification": 8,
      "verified": 115,
      "rejected": 7
    },
    "jobPostings": {
      "total": 420,
      "pendingReview": 15,
      "open": 260,
      "expired": 90,
      "closed": 55
    },
    "applications": {
      "total": 3200,
      "new": 420,
      "interviews": 180,
      "rejected": 900
    }
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>
