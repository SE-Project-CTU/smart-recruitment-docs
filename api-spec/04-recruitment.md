# Recruitment & Application API

## Group Summary

Nhóm API quản lý tin tuyển dụng và quy trình ứng tuyển. Dữ liệu chính liên quan đến `JOB_POSTING`, `JOB_INDUSTRY`, `JOB_SKILL`, `INDUSTRY_GROUP`, `INDUSTRY`, `PROVINCE`, `WARD`, `SKILL`, `APPLICATION` và `APPLICATION_STATUS_HISTORY`.

`JOB_EMBEDDING` là dữ liệu do AI pipeline tạo bất đồng bộ; client không được CRUD vector embedding qua Recruitment API.

## API List

| # | API | Method & Path | Roles |
|---|---|---|---|
| 1 | Liệt kê nhóm ngành | `GET /api/v1/industry-groups` | Public |
| 2 | Liệt kê ngành nghề | `GET /api/v1/industries` | Public |
| 3 | Liệt kê Tỉnh/Thành phố & Phường/Xã | `GET /api/v1/provinces`, `GET /api/v1/wards` | Public |
| 4 | Tạo tin tuyển dụng | `POST /api/v1/job-postings` | Recruiter member |
| 5 | Tìm kiếm tin tuyển dụng | `GET /api/v1/job-postings` | Public |
| 6 | Xem chi tiết tin tuyển dụng | `GET /api/v1/job-postings/{id}` | Public |
| 7 | Cập nhật tin tuyển dụng | `PATCH /api/v1/job-postings/{id}` | Recruiter creator/member |
| 8 | Cập nhật trạng thái tin | `PATCH /api/v1/job-postings/{id}/status` | Recruiter creator/member |
| 9 | Tạo hồ sơ ứng tuyển | `POST /api/v1/job-postings/{id}/applications` | Candidate |
| 10 | Danh sách application của tôi | `GET /api/v1/me/applications` | Candidate |
| 11 | Danh sách ứng viên theo tin | `GET /api/v1/job-postings/{id}/applications` | Recruiter member |
| 12 | Xem chi tiết application | `GET /api/v1/applications/{id}` | Candidate owner, Recruiter authorized |
| 13 | Cập nhật trạng thái application | `PATCH /api/v1/applications/{id}/status` | Recruiter authorized |
| 14 | Lịch sử trạng thái application | `GET /api/v1/applications/{id}/status-history` | Candidate owner, Recruiter authorized |

## Shared Rules

- Base URL: `/api/v1`.
- Endpoint protected yêu cầu `Authorization: Bearer <access-token>` và `X-Correlation-ID` là UUID.
- `id`, `companyId`, `createdBy`, `candidateId`, `cvVersionId`, `provinceId`, `wardId`, `industryId`, `skillId` là UUID.
- Recruiter chỉ được tạo hoặc quản lý tin khi có `COMPANY_MEMBERSHIP.status = Active` trong company tương ứng.
- Tin chỉ được công khai khi company đã verified và tin đã được Admin duyệt theo policy.
- `deadline` phải là ISO 8601 UTC; sau deadline hệ thống tự chuyển tin sang trạng thái hết hạn và khóa ứng tuyển.
- Ứng tuyển phải gửi đúng một trong `cvVersionId` hoặc `uploadedCvUrl`.
- Application duy nhất theo cặp `(candidateId, jobId)`; request trùng phải trả `409`.
- Tất cả response JSON dùng envelope `data`, `meta`, `correlationId`; lỗi dùng `error`, `correlationId` theo [README.md](README.md).

## ERD Response Mapping

API dùng camelCase và ánh xạ trực tiếp với các cột ERD:

| API field | ERD column | Resource |
|---|---|---|
| `id` | `id` | `JOB_POSTING`, `APPLICATION`, `APPLICATION_STATUS_HISTORY`, `PROVINCE`, `WARD`, `SKILL` |
| `companyId` | `company_id` | `JOB_POSTING` |
| `createdBy` | `created_by` | `JOB_POSTING` |
| `provinceId` / `wardId` | `province_id` / `ward_id` | `JOB_POSTING`, `WARD` |
| `detailedLocation` | `detailed_location` | `JOB_POSTING` |
| `experienceYears` | `experience_years` | `JOB_POSTING` |
| `jobLevel` | `job_level` | `JOB_POSTING` |
| `educationLevel` | `education_level` | `JOB_POSTING` |
| `vacancies` | `vacancies` | `JOB_POSTING` |
| `workMode` | `work_mode` | `JOB_POSTING` |
| `jobType` | `job_type` | `JOB_POSTING` |
| `salaryMin` / `salaryMax` | `salary_min` / `salary_max` | `JOB_POSTING` |
| `salaryNegotiable` | `salary_negotiable` | `JOB_POSTING` |
| `deadline` | `deadline` | `JOB_POSTING` |
| `status` | `status` | `JOB_POSTING`, `APPLICATION`, `APPLICATION_STATUS_HISTORY`, `PROVINCE`, `WARD` |
| `jobId` | `job_id` | `APPLICATION`, `JOB_INDUSTRY`, `JOB_SKILL` |
| `candidateId` | `candidate_id` | `APPLICATION` |
| `cvVersionId` | `cv_version_id` | `APPLICATION` |
| `uploadedCvUrl` | `uploaded_cv_url` | `APPLICATION` |
| `coverLetter` | `cover_letter` | `APPLICATION` |
| `appliedAt` / `updatedAt` | `applied_at` / `updated_at` | `APPLICATION` |
| `applicationId` | `application_id` | `APPLICATION_STATUS_HISTORY` |
| `changedBy` | `changed_by` | `APPLICATION_STATUS_HISTORY` |
| `note` | `note` | `APPLICATION_STATUS_HISTORY` |
| `createdAt` | `created_at` | All persisted resources |

<details>
<summary><strong>API 1: List Industry Groups</strong></summary>

### Title & Summary

**Liệt kê nhóm ngành nghề**

Trả về các nhóm ngành đang hoạt động để Candidate lọc việc và Recruiter chọn ngành cho tin tuyển dụng.

### Method & Path

```http
GET /api/v1/industry-groups
```

### Authentication & Authorization

- Public endpoint.
- Chỉ trả về `INDUSTRY_GROUP.is_active = true`.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Accept` | Yes | String | Hỗ trợ `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Parameter | Required | DataType | Validation Rules |
|---|---:|---|---|
| `page` | No | Integer | Mặc định 1; từ 1 đến 100000. |
| `pageSize` | No | Integer | Mặc định 20; từ 1 đến 100. |
| `search` | No | String | Tối đa 100 ký tự. |

Không có request body.

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Trả về danh sách nhóm ngành. |
| `400` | Bad Request | Query không hợp lệ. |
| `500` | Internal Server Error | Lỗi truy vấn danh mục. |

### Example Success Response

```json
{
  "data": [
    {
      "id": "b9d5cc8c-3378-4c4a-8ee7-b8c8c6d0d4d1",
      "name": "Information Technology",
      "isActive": true
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
<summary><strong>API 2: List Industries</strong></summary>

### Title & Summary

**Liệt kê ngành nghề**

Trả về các `INDUSTRY` đang hoạt động, có thể lọc theo nhóm ngành.

### Method & Path

```http
GET /api/v1/industries
```

### Authentication & Authorization

- Public endpoint.
- Chỉ trả về ngành có `is_active = true`.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Accept` | Yes | String | Hỗ trợ `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Parameter | Required | DataType | Validation Rules |
|---|---:|---|---|
| `groupId` | No | UUID | Nếu có phải tồn tại. |
| `search` | No | String | Tối đa 100 ký tự. |
| `page` | No | Integer | Mặc định 1. |
| `pageSize` | No | Integer | Mặc định 20; tối đa 100. |

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Trả về danh sách ngành. |
| `400` | Bad Request | UUID/query sai format. |
| `404` | Not Found | Group được chỉ định không tồn tại. |
| `500` | Internal Server Error | Lỗi truy vấn danh mục. |

### Example Success Response

```json
{
  "data": [
    {
      "id": "1f2d6c5a-bb50-4e8f-b1a2-27c5d1f42a87",
      "groupId": "b9d5cc8c-3378-4c4a-8ee7-b8c8c6d0d4d1",
      "name": "Backend Development",
      "status": "Active",
      "isActive": true
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
<summary><strong>API 3: List Provinces and Wards</strong></summary>

### Title & Summary

**Liệt kê tỉnh/thành phố và phường/xã**

Trả về danh mục `PROVINCE` và `WARD` đang hoạt động để phục vụ chọn địa điểm làm việc, bộ lọc và cấu hình tin tuyển dụng.

### Method & Path

```http
GET /api/v1/provinces
GET /api/v1/wards
```

### Authentication & Authorization

- Public endpoint.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Accept` | Yes | String | Hỗ trợ `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

**`GET /api/v1/provinces`**
| Parameter | Required | DataType | Validation Rules |
|---|---:|---|---|
| `search` | No | String | Tối đa 100 ký tự. |
| `page` | No | Integer | Mặc định 1. |
| `pageSize` | No | Integer | Mặc định 50; tối đa 100. |

**`GET /api/v1/wards`**
| Parameter | Required | DataType | Validation Rules |
|---|---:|---|---|
| `provinceId` | No | UUID | Lọc các phường/xã thuộc tỉnh/thành chỉ định. |
| `search` | No | String | Tối đa 100 ký tự. |
| `page` | No | Integer | Mặc định 1. |
| `pageSize` | No | Integer | Mặc định 50; tối đa 100. |

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Trả về danh sách tỉnh/thành hoặc phường/xã. |
| `400` | Bad Request | Query hoặc `provinceId` không hợp lệ. |
| `500` | Internal Server Error | Lỗi truy vấn danh mục địa chính. |

### Example Success Response (`GET /api/v1/provinces`)

```json
{
  "data": [
    {
      "id": "f24c42be-cd89-4548-b5e8-1cb3b9b8ea6e",
      "name": "Thành phố Hồ Chí Minh",
      "code": "HCM",
      "status": "Active"
    },
    {
      "id": "e15b31ad-bc78-4327-a4d7-0ba2a8a7d95d",
      "name": "Thành phố Hà Nội",
      "code": "HN",
      "status": "Active"
    }
  ],
  "meta": {
    "page": 1,
    "pageSize": 50,
    "totalItems": 63,
    "totalPages": 2,
    "hasNextPage": true,
    "hasPreviousPage": false
  },
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 4: Create Job Posting</strong></summary>

### Title & Summary

**Tạo tin tuyển dụng**

Tạo `JOB_POSTING` gắn với một company mà Recruiter đang là thành viên hợp lệ, liên kết địa điểm (`PROVINCE`, `WARD`), danh mục ngành nghề (`INDUSTRY`) và kỹ năng yêu cầu (`JOB_SKILL`). Tin mới ở trạng thái chờ duyệt hoặc trạng thái mặc định theo policy.

### Method & Path

```http
POST /api/v1/job-postings
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Role: `Recruiter`.
- Caller phải là membership `Active` của `companyId`; Owner hoặc member được phép đăng tin theo quy tắc phân quyền trong ứng dụng.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Content-Type` | Yes | String | `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Field | Required | DataType | Validation Rules |
|---|---:|---|---|
| `companyId` | Yes | UUID | Company tồn tại, verified và caller là member Active. |
| `title` | Yes | String | Từ 2 đến 200 ký tự sau trim. |
| `provinceId` | Yes | UUID | Province active và tồn tại trong hệ thống. |
| `wardId` | No | UUID / null | Ward active thuộc `provinceId` tương ứng. |
| `detailedLocation` | No | String / null | Tối đa 500 ký tự (số nhà, tên đường, tòa nhà). |
| `experienceYears` | Yes | Integer | Từ 0 đến 60. |
| `jobLevel` | Yes | Enum | `INTERN`, `JUNIOR`, `MIDDLE`, `SENIOR`, `LEAD`, `MANAGER`. |
| `educationLevel` | No | String / null | Tối đa 150 ký tự. |
| `vacancies` | Yes | Integer | Lớn hơn 0. |
| `workMode` | Yes | Enum | `FULL_TIME`, `PART_TIME`, `CONTRACT`, `INTERNSHIP`, `FREELANCE`. |
| `jobType` | Yes | Enum | `REMOTE`, `ON_SITE`, `HYBRID`. |
| `description` | Yes | String | Tối thiểu 20 ký tự. |
| `requirements` | Yes | String | Tối thiểu 20 ký tự. |
| `benefits` | No | String / null | Tối đa 10000 ký tự. |
| `salaryMin` | No | Decimal / null | Không âm; nhỏ hơn hoặc bằng `salaryMax`. |
| `salaryMax` | No | Decimal / null | Không âm; lớn hơn hoặc bằng `salaryMin`. |
| `salaryNegotiable` | Yes | Boolean | Nếu true có thể bỏ salary range. |
| `deadline` | Yes | DateTime | ISO 8601 UTC và lớn hơn thời điểm hiện tại. |
| `industryIds` | Yes | Array<UUID> | Ít nhất một industry active; không trùng phần tử. |
| `skillIds` | No | Array<UUID> | Danh sách UUID của kỹ năng (`SKILL`) yêu cầu cho vị trí. |

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `201` | Created | Tạo tin tuyển dụng thành công. |
| `400` | Bad Request | JSON sai cú pháp. |
| `401` | Unauthorized | Access Token thiếu hoặc không hợp lệ. |
| `403` | Forbidden | Không có quyền đăng tin hoặc company chưa verified. |
| `404` | Not Found | Company, province, ward, skill hoặc industry không tồn tại. |
| `422` | Unprocessable Entity | Field không đạt validation (ví dụ ward không thuộc province). |
| `500` | Internal Server Error | Lỗi transaction tạo tin. |

### Example Request

```json
{
  "companyId": "a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55",
  "title": "Senior Backend Developer",
  "provinceId": "f24c42be-cd89-4548-b5e8-1cb3b9b8ea6e",
  "wardId": "d7b1a2c3-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
  "detailedLocation": "Tầng 12, Tòa nhà Bitexco, Bến Nghé, Quận 1",
  "experienceYears": 3,
  "jobLevel": "SENIOR",
  "educationLevel": "Bachelor in Computer Science",
  "vacancies": 2,
  "workMode": "FULL_TIME",
  "jobType": "HYBRID",
  "description": "Build and maintain scalable recruitment services.",
  "requirements": "Three years of backend development experience in Java/Spring Boot or Node.js.",
  "benefits": "Health insurance, macbook pro and flexible working hours.",
  "salaryMin": 2500,
  "salaryMax": 4000,
  "salaryNegotiable": true,
  "deadline": "2026-10-31T23:59:59Z",
  "industryIds": ["1f2d6c5a-bb50-4e8f-b1a2-27c5d1f42a87"],
  "skillIds": [
    "3a4b5c6d-7e8f-9a0b-1c2d-3e4f5a6b7c8d",
    "4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e"
  ]
}
```

### Example Success Response

```json
{
  "data": {
    "id": "c8b2f7a1-3c2e-4a7c-a8e1-3d3dc0be8d91",
    "companyId": "a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55",
    "createdBy": "e2c5a5c7-3658-442d-87c1-cf8ff34d2d8b",
    "title": "Senior Backend Developer",
    "provinceId": "f24c42be-cd89-4548-b5e8-1cb3b9b8ea6e",
    "wardId": "d7b1a2c3-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
    "detailedLocation": "Tầng 12, Tòa nhà Bitexco, Bến Nghé, Quận 1",
    "experienceYears": 3,
    "jobLevel": "SENIOR",
    "educationLevel": "Bachelor in Computer Science",
    "vacancies": 2,
    "workMode": "FULL_TIME",
    "jobType": "HYBRID",
    "description": "Build and maintain scalable recruitment services.",
    "requirements": "Three years of backend development experience in Java/Spring Boot or Node.js.",
    "benefits": "Health insurance, macbook pro and flexible working hours.",
    "salaryMin": 2500,
    "salaryMax": 4000,
    "salaryNegotiable": true,
    "deadline": "2026-10-31T23:59:59Z",
    "status": "PENDING_REVIEW",
    "industryIds": ["1f2d6c5a-bb50-4e8f-b1a2-27c5d1f42a87"],
    "skillIds": [
      "3a4b5c6d-7e8f-9a0b-1c2d-3e4f5a6b7c8d",
      "4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e"
    ],
    "createdAt": "2026-09-29T10:00:00Z",
    "updatedAt": "2026-09-29T10:00:00Z"
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 5: Search Job Postings</strong></summary>

### Title & Summary

**Tìm kiếm và lọc tin tuyển dụng**

Tìm các tin đã được công khai, chưa hết hạn và phù hợp với các tiêu chí lọc địa lý (`provinceId`, `wardId`), kỹ năng (`skillId`), ngành nghề và mức lương.

### Method & Path

```http
GET /api/v1/job-postings
```

### Authentication & Authorization

- Public endpoint.
- Chỉ hiển thị tin thuộc company verified và có status công khai/đang nhận hồ sơ.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Accept` | Yes | String | Hỗ trợ `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Parameter | Required | DataType | Validation Rules |
|---|---:|---|---|
| `keyword` | No | String | Tối đa 200 ký tự; tìm trong title/description/requirements. |
| `industryId` | No | UUID | Industry tồn tại. |
| `provinceId` | No | UUID | Province tồn tại. |
| `wardId` | No | UUID | Ward tồn tại và thuộc `provinceId`. |
| `skillId` | No | UUID | Kỹ năng liên kết trong `JOB_SKILL`. |
| `jobLevel` | No | Enum | Giá trị enum của job posting. |
| `workMode` | No | Enum | Giá trị enum của job type. |
| `jobType` | No | Enum | Giá trị enum của work mode. |
| `salaryMin` | No | Decimal | Không âm. |
| `salaryMax` | No | Decimal | Không âm và >= salaryMin. |
| `page` | No | Integer | Mặc định 1. |
| `pageSize` | No | Integer | Mặc định 20; tối đa 100. |
| `sort` | No | Enum | `createdAt`, `deadline`, `salaryMax`; mặc định `createdAt`. |
| `direction` | No | Enum | `asc` hoặc `desc`; mặc định `desc`. |

Không có request body.

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Trả về danh sách tin phù hợp. |
| `400` | Bad Request | Query không hợp lệ. |
| `404` | Not Found | Industry/province/ward/skill filter không tồn tại. |
| `500` | Internal Server Error | Lỗi truy vấn hoặc search index. |

### Example Success Response

```json
{
  "data": [
    {
      "id": "c8b2f7a1-3c2e-4a7c-a8e1-3d3dc0be8d91",
      "companyId": "a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55",
      "title": "Senior Backend Developer",
      "provinceId": "f24c42be-cd89-4548-b5e8-1cb3b9b8ea6e",
      "wardId": "d7b1a2c3-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
      "jobLevel": "SENIOR",
      "vacancies": 2,
      "workMode": "FULL_TIME",
      "jobType": "HYBRID",
      "salaryMin": 2500,
      "salaryMax": 4000,
      "salaryNegotiable": true,
      "deadline": "2026-10-31T23:59:59Z",
      "status": "OPEN",
      "createdAt": "2026-09-29T10:00:00Z"
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
<summary><strong>API 6: Get Job Posting Detail</strong></summary>

### Title & Summary

**Xem chi tiết tin tuyển dụng**

Trả về toàn bộ field của `JOB_POSTING`, company summary, thông tin địa chính (`PROVINCE`, `WARD`), danh sách kỹ năng yêu cầu (`SKILL`) và danh sách industry liên kết.

### Method & Path

```http
GET /api/v1/job-postings/{id}
```

### Authentication & Authorization

- Public với tin đã công khai.
- Recruiter owner/member có thể xem tin ở trạng thái bản nháp hoặc chờ duyệt.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Conditional | String | Bắt buộc khi xem tin chưa công khai. |
| `Accept` | Yes | String | Hỗ trợ `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Parameter | Required | DataType | Validation Rules |
|---|---:|---|---|
| `id` | Yes | UUID | Tin phải tồn tại. |

Không có request body.

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Tin tồn tại và user có quyền xem. |
| `400` | Bad Request | `id` sai format. |
| `401` | Unauthorized | Tin private/draft nhưng thiếu token. |
| `403` | Forbidden | User không có quyền xem tin chưa công khai. |
| `404` | Not Found | Tin không tồn tại. |
| `500` | Internal Server Error | Lỗi truy vấn tin. |

### Example Success Response

```json
{
  "data": {
    "id": "c8b2f7a1-3c2e-4a7c-a8e1-3d3dc0be8d91",
    "companyId": "a6a0e6ce-c1dd-4bb8-bf2a-5f7d4c6d7b55",
    "createdBy": "e2c5a5c7-3658-442d-87c1-cf8ff34d2d8b",
    "title": "Senior Backend Developer",
    "province": {
      "id": "f24c42be-cd89-4548-b5e8-1cb3b9b8ea6e",
      "name": "Thành phố Hồ Chí Minh",
      "code": "HCM"
    },
    "ward": {
      "id": "d7b1a2c3-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
      "name": "Phường Bến Nghé",
      "code": "70001"
    },
    "detailedLocation": "Tầng 12, Tòa nhà Bitexco, Bến Nghé, Quận 1",
    "experienceYears": 3,
    "jobLevel": "SENIOR",
    "educationLevel": "Bachelor in Computer Science",
    "vacancies": 2,
    "workMode": "FULL_TIME",
    "jobType": "HYBRID",
    "description": "Build and maintain scalable recruitment services.",
    "requirements": "Three years of backend development experience in Java/Spring Boot or Node.js.",
    "benefits": "Health insurance, macbook pro and flexible working hours.",
    "salaryMin": 2500,
    "salaryMax": 4000,
    "salaryNegotiable": true,
    "deadline": "2026-10-31T23:59:59Z",
    "status": "OPEN",
    "industryIds": ["1f2d6c5a-bb50-4e8f-b1a2-27c5d1f42a87"],
    "skills": [
      {
        "id": "3a4b5c6d-7e8f-9a0b-1c2d-3e4f5a6b7c8d",
        "name": "Java",
        "category": "TECHNICAL"
      },
      {
        "id": "4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e",
        "name": "Spring Boot",
        "category": "TECHNICAL"
      }
    ],
    "createdAt": "2026-09-29T10:00:00Z",
    "updatedAt": "2026-09-29T10:00:00Z"
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 7: Update Job Posting</strong></summary>

### Title & Summary

**Cập nhật tin tuyển dụng**

Cho phép creator hoặc Recruiter được phép cập nhật nội dung tin theo quy tắc phân quyền trong ứng dụng (bao gồm địa chỉ, kỹ năng, ngành nghề). Các field audit và company relationship do server quản lý.

### Method & Path

```http
PATCH /api/v1/job-postings/{id}
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Recruiter phải là creator hoặc member được phép quản lý tin trong company theo quy tắc phân quyền trong ứng dụng.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Content-Type` | Yes | String | `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Field | Required | DataType | Validation Rules |
|---|---:|---|---|
| `id` | Yes | UUID | Tin phải thuộc company user có quyền. |
| `title` | No | String | 2-200 ký tự. |
| `provinceId` | No | UUID | Province active. |
| `wardId` | No | UUID / null | Ward active thuộc `provinceId`. |
| `detailedLocation` | No | String / null | Tối đa 500 ký tự. |
| `experienceYears` | No | Integer | Từ 0 đến 60. |
| `jobLevel` | No | Enum | Giá trị job level hợp lệ. |
| `educationLevel` | No | String / null | Tối đa 150 ký tự. |
| `vacancies` | No | Integer | Lớn hơn 0. |
| `workMode` | No | Enum | Giá trị job type hợp lệ. |
| `jobType` | No | Enum | Giá trị work mode hợp lệ. |
| `description` | No | String | Tối thiểu 20 ký tự. |
| `requirements` | No | String | Tối thiểu 20 ký tự. |
| `benefits` | No | String / null | Tối đa 10000 ký tự. |
| `salaryMin` / `salaryMax` | No | Decimal / null | Không âm và không mâu thuẫn nhau. |
| `salaryNegotiable` | No | Boolean | Boolean hợp lệ. |
| `deadline` | No | DateTime | ISO 8601 UTC và lớn hơn hiện tại khi tin còn mở. |
| `industryIds` | No | Array<UUID> | Industry active, unique items. |
| `skillIds` | No | Array<UUID> | Danh sách UUID của kỹ năng liên kết. |

Không cho phép cập nhật `companyId`, `createdBy`, `status`, `createdAt`, `updatedAt` qua endpoint này. Phải có ít nhất một field.

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Cập nhật thành công. |
| `400` | Bad Request | JSON hoặc UUID sai format. |
| `401` | Unauthorized | Access Token không hợp lệ. |
| `403` | Forbidden | Không có quyền quản lý tin. |
| `404` | Not Found | Tin/province/ward/skill/industry không tồn tại. |
| `409` | Conflict | Tin đang ở trạng thái không cho phép sửa. |
| `422` | Unprocessable Entity | Dữ liệu không đạt validation. |
| `500` | Internal Server Error | Lỗi cập nhật transaction. |

### Example Request

```json
{
  "title": "Senior Backend Developer - Updated",
  "vacancies": 3,
  "provinceId": "f24c42be-cd89-4548-b5e8-1cb3b9b8ea6e",
  "wardId": "d7b1a2c3-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
  "skillIds": [
    "3a4b5c6d-7e8f-9a0b-1c2d-3e4f5a6b7c8d",
    "4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e"
  ],
  "deadline": "2026-11-15T23:59:59Z"
}
```

### Example Success Response

```json
{
  "data": {
    "id": "c8b2f7a1-3c2e-4a7c-a8e1-3d3dc0be8d91",
    "title": "Senior Backend Developer - Updated",
    "vacancies": 3,
    "provinceId": "f24c42be-cd89-4548-b5e8-1cb3b9b8ea6e",
    "wardId": "d7b1a2c3-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
    "skillIds": [
      "3a4b5c6d-7e8f-9a0b-1c2d-3e4f5a6b7c8d",
      "4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e"
    ],
    "deadline": "2026-11-15T23:59:59Z",
    "status": "PENDING_REVIEW",
    "updatedAt": "2026-09-29T11:00:00Z"
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 8: Update Job Posting Status</strong></summary>

### Title & Summary

**Dừng nhận hồ sơ hoặc đóng tin tuyển dụng**

Cập nhật vòng đời tin tuyển dụng mà không cho phép client tùy ý chuyển sang trạng thái đã duyệt. Admin approval là flow riêng.

### Method & Path

```http
PATCH /api/v1/job-postings/{id}/status
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Recruiter là creator hoặc member được phép quản lý tin theo quy tắc phân quyền trong ứng dụng.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Content-Type` | Yes | String | `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Field | Required | DataType | Validation Rules |
|---|---:|---|---|
| `id` | Yes | UUID | Tin phải tồn tại. |
| `status` | Yes | Enum | `OPEN`, `PAUSED`, `CLOSED`; `EXPIRED` do server tự động; trạng thái duyệt do Admin API. |

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Cập nhật status thành công. |
| `400` | Bad Request | JSON/UUID sai format. |
| `401` | Unauthorized | Access Token không hợp lệ. |
| `403` | Forbidden | Không có quyền thực hiện thao tác này. |
| `404` | Not Found | Tin không tồn tại. |
| `409` | Conflict | Chuyển trạng thái không hợp lệ theo state machine. |
| `422` | Unprocessable Entity | Status không được phép. |
| `500` | Internal Server Error | Lỗi cập nhật status. |

### Example Request

```json
{
  "status": "PAUSED"
}
```

### Example Success Response

```json
{
  "data": {
    "id": "c8b2f7a1-3c2e-4a7c-a8e1-3d3dc0be8d91",
    "status": "PAUSED",
    "updatedAt": "2026-09-29T11:30:00Z"
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 9: Apply to Job Posting</strong></summary>

### Title & Summary

**Ứng tuyển vào tin tuyển dụng**

Tạo `APPLICATION` cho Candidate bằng một `CV_VERSION` hoặc URL file PDF. Hệ thống ghi nhận lịch sử trạng thái ban đầu và chặn application trùng.

### Method & Path

```http
POST /api/v1/job-postings/{id}/applications
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Chỉ role `Candidate` được gọi.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Content-Type` | Yes | String | `application/json` hoặc `multipart/form-data` nếu upload trực tiếp. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |
### Request Parameters / Body

| Field | Required | DataType | Validation Rules |
|---|---:|---|---|
| `id` | Yes | UUID | Job posting phải tồn tại và đang nhận hồ sơ. |
| `cvVersionId` | Conditional | UUID | Bắt buộc nếu không gửi `uploadedCvUrl`; version phải thuộc Candidate hiện tại. |
| `uploadedCvUrl` | Conditional | String | Bắt buộc nếu không gửi `cvVersionId`; phải là PDF hợp lệ, tối đa 5 MB, URL do storage cấp. |
| `coverLetter` | No | String / null | Tối đa 10000 ký tự. |

Phải gửi đúng một trong `cvVersionId` hoặc `uploadedCvUrl`. Không nhận `candidateId`, `status`, `appliedAt` từ client.

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `201` | Created | Application và status history ban đầu được tạo. |
| `400` | Bad Request | Body/multipart sai format. |
| `401` | Unauthorized | Access Token không hợp lệ. |
| `403` | Forbidden | User không có role Candidate. |
| `404` | Not Found | Job hoặc CV version không tồn tại. |
| `409` | Conflict | Candidate đã ứng tuyển job này hoặc job không còn nhận hồ sơ. |
| `413` | Payload Too Large | PDF vượt quá 5 MB. |
| `415` | Unsupported Media Type | File không phải PDF. |
| `422` | Unprocessable Entity | Gửi cả hai hoặc không gửi nguồn CV. |
| `500` | Internal Server Error | Lỗi tạo application. |

### Example Request

```json
{
  "cvVersionId": "0d55e7ee-44f4-4d30-a65c-d9c5af5cf6c8",
  "coverLetter": "I am excited to apply for this backend developer position."
}
```

### Example Success Response

```json
{
  "data": {
    "id": "5fc43d70-1c27-4c94-9306-d1a1d4dc9c60",
    "jobId": "c8b2f7a1-3c2e-4a7c-a8e1-3d3dc0be8d91",
    "candidateId": "7d9e6f7a-08d8-4e2a-8f68-5d0cb4f47e4a",
    "cvVersionId": "0d55e7ee-44f4-4d30-a65c-d9c5af5cf6c8",
    "uploadedCvUrl": null,
    "coverLetter": "I am excited to apply for this backend developer position.",
    "status": "SUBMITTED",
    "appliedAt": "2026-09-29T12:00:00Z",
    "updatedAt": "2026-09-29T12:00:00Z"
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 10: List My Applications</strong></summary>

### Title & Summary

**Theo dõi lịch sử ứng tuyển**

Candidate xem các application của chính mình, trạng thái hiện tại và thông tin job cơ bản.

### Method & Path

```http
GET /api/v1/me/applications
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Chỉ role `Candidate` xem application của chính mình.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Accept` | Yes | String | Hỗ trợ `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Parameter | Required | DataType | Validation Rules |
|---|---:|---|---|
| `status` | No | Enum | Status application hợp lệ. |
| `page` | No | Integer | Mặc định 1. |
| `pageSize` | No | Integer | Mặc định 20; tối đa 100. |
| `sort` | No | Enum | `appliedAt` hoặc `updatedAt`. |
| `direction` | No | Enum | `asc` hoặc `desc`; mặc định `desc`. |

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Trả về danh sách application. |
| `400` | Bad Request | Query không hợp lệ. |
| `401` | Unauthorized | Access Token không hợp lệ. |
| `403` | Forbidden | User không phải Candidate. |
| `500` | Internal Server Error | Lỗi truy vấn application. |

### Example Success Response

```json
{
  "data": [
    {
      "id": "5fc43d70-1c27-4c94-9306-d1a1d4dc9c60",
      "jobId": "c8b2f7a1-3c2e-4a7c-a8e1-3d3dc0be8d91",
      "candidateId": "7d9e6f7a-08d8-4e2a-8f68-5d0cb4f47e4a",
      "cvVersionId": "0d55e7ee-44f4-4d30-a65c-d9c5af5cf6c8",
      "uploadedCvUrl": null,
      "coverLetter": "I am excited to apply for this backend developer position.",
      "status": "INTERVIEW",
      "appliedAt": "2026-09-29T12:00:00Z",
      "updatedAt": "2026-10-01T09:00:00Z"
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
<summary><strong>API 11: List Applications for Job</strong></summary>

### Title & Summary

**Quản lý hồ sơ ứng tuyển theo tin tuyển dụng**

Recruiter xem các application của một job thuộc company mình quản lý.

### Method & Path

```http
GET /api/v1/job-postings/{id}/applications
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Recruiter phải là creator hoặc member được phép quản lý job/company theo quy tắc phân quyền trong ứng dụng.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Accept` | Yes | String | Hỗ trợ `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Parameter | Required | DataType | Validation Rules |
|---|---:|---|---|
| `id` | Yes | UUID | Job phải thuộc company user có quyền. |
| `status` | No | Enum | Status application hợp lệ. |
| `page` | No | Integer | Mặc định 1. |
| `pageSize` | No | Integer | Mặc định 20; tối đa 100. |

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Trả về danh sách application. |
| `400` | Bad Request | Query/UUID sai format. |
| `401` | Unauthorized | Access Token không hợp lệ. |
| `403` | Forbidden | Không có quyền quản lý job. |
| `404` | Not Found | Job không tồn tại. |
| `500` | Internal Server Error | Lỗi truy vấn application. |

### Example Success Response

```json
{
  "data": [
    {
      "id": "5fc43d70-1c27-4c94-9306-d1a1d4dc9c60",
      "jobId": "c8b2f7a1-3c2e-4a7c-a8e1-3d3dc0be8d91",
      "candidateId": "7d9e6f7a-08d8-4e2a-8f68-5d0cb4f47e4a",
      "cvVersionId": "0d55e7ee-44f4-4d30-a65c-d9c5af5cf6c8",
      "uploadedCvUrl": null,
      "coverLetter": "I am excited to apply for this backend developer position.",
      "status": "SUBMITTED",
      "appliedAt": "2026-09-29T12:00:00Z",
      "updatedAt": "2026-09-29T12:00:00Z"
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
<summary><strong>API 12: Get Application Detail</strong></summary>

### Title & Summary

**Xem chi tiết hồ sơ ứng tuyển**

Trả về toàn bộ field của `APPLICATION`, kèm thông tin CV/job theo policy authorization.

### Method & Path

```http
GET /api/v1/applications/{id}
```

### Authentication & Authorization

- Candidate chỉ được xem application của mình.
- Recruiter chỉ được xem application thuộc job/company mình quản lý.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Accept` | Yes | String | Hỗ trợ `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Parameter | Required | DataType | Validation Rules |
|---|---:|---|---|
| `id` | Yes | UUID | Application phải tồn tại. |

Không có request body.

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | User có quyền xem application. |
| `400` | Bad Request | `id` sai format. |
| `401` | Unauthorized | Access Token không hợp lệ. |
| `403` | Forbidden | Không có quyền xem application. |
| `404` | Not Found | Application không tồn tại. |
| `500` | Internal Server Error | Lỗi truy vấn application. |

### Example Success Response

```json
{
  "data": {
    "id": "5fc43d70-1c27-4c94-9306-d1a1d4dc9c60",
    "jobId": "c8b2f7a1-3c2e-4a7c-a8e1-3d3dc0be8d91",
    "candidateId": "7d9e6f7a-08d8-4e2a-8f68-5d0cb4f47e4a",
    "cvVersionId": "0d55e7ee-44f4-4d30-a65c-d9c5af5cf6c8",
    "uploadedCvUrl": null,
    "coverLetter": "I am excited to apply for this backend developer position.",
    "status": "INTERVIEW",
    "appliedAt": "2026-09-29T12:00:00Z",
    "updatedAt": "2026-10-01T09:00:00Z"
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 13: Update Application Status</strong></summary>

### Title & Summary

**Cập nhật quy trình xử lý hồ sơ**

Recruiter chuyển application qua các trạng thái nghiệp vụ và tạo một bản ghi `APPLICATION_STATUS_HISTORY` cho mỗi lần thay đổi.

### Method & Path

```http
PATCH /api/v1/applications/{id}/status
```

### Authentication & Authorization

- Yêu cầu Access Token hợp lệ.
- Chỉ Recruiter có quyền quản lý job chứa application được gọi.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Content-Type` | Yes | String | `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Field | Required | DataType | Validation Rules |
|---|---:|---|---|
| `id` | Yes | UUID | Application phải tồn tại và thuộc job recruiter quản lý. |
| `status` | Yes | Enum | `RECEIVED`, `APPROVED`, `INTERVIEW`, `REJECTED`. |
| `note` | No | String / null | Tối đa 2000 ký tự; lưu vào history. |

Server không cho phép chuyển từ trạng thái kết thúc sang trạng thái khác nếu policy không cho phép.

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Cập nhật status và tạo history thành công. |
| `400` | Bad Request | JSON/UUID sai format. |
| `401` | Unauthorized | Access Token không hợp lệ. |
| `403` | Forbidden | Không có quyền quản lý application. |
| `404` | Not Found | Application không tồn tại. |
| `409` | Conflict | State transition không hợp lệ. |
| `422` | Unprocessable Entity | Status/note không đạt validation. |
| `500` | Internal Server Error | Transaction thất bại. |

### Example Request

```json
{
  "status": "INTERVIEW",
  "note": "Invite candidate to technical interview."
}
```

### Example Success Response

```json
{
  "data": {
    "id": "5fc43d70-1c27-4c94-9306-d1a1d4dc9c60",
    "jobId": "c8b2f7a1-3c2e-4a7c-a8e1-3d3dc0be8d91",
    "candidateId": "7d9e6f7a-08d8-4e2a-8f68-5d0cb4f47e4a",
    "cvVersionId": "0d55e7ee-44f4-4d30-a65c-d9c5af5cf6c8",
    "uploadedCvUrl": null,
    "coverLetter": "I am excited to apply for this backend developer position.",
    "status": "INTERVIEW",
    "appliedAt": "2026-09-29T12:00:00Z",
    "updatedAt": "2026-10-01T09:00:00Z",
    "latestHistory": {
      "id": "ee3f0ca0-a6f7-4e27-8508-9032fc4b6fd5",
      "applicationId": "5fc43d70-1c27-4c94-9306-d1a1d4dc9c60",
      "status": "INTERVIEW",
      "changedBy": "e2c5a5c7-3658-442d-87c1-cf8ff34d2d8b",
      "note": "Invite candidate to technical interview.",
      "createdAt": "2026-10-01T09:00:00Z"
    }
  },
  "meta": {},
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>

<details>
<summary><strong>API 14: List Application Status History</strong></summary>

### Title & Summary

**Xem lịch sử trạng thái hồ sơ**

Trả về các bản ghi `APPLICATION_STATUS_HISTORY` theo thứ tự thời gian tăng dần.

### Method & Path

```http
GET /api/v1/applications/{id}/status-history
```

### Authentication & Authorization

- Candidate owner hoặc Recruiter authorized được xem.

### Headers

| Header | Required | DataType | Validation Rules |
|---|---:|---|---|
| `Authorization` | Yes | String | `Bearer <access-token>`. |
| `Accept` | Yes | String | Hỗ trợ `application/json`. |
| `X-Correlation-ID` | Yes | UUID | UUID hợp lệ. |

### Request Parameters / Body

| Parameter | Required | DataType | Validation Rules |
|---|---:|---|---|
| `id` | Yes | UUID | Application phải tồn tại. |
| `page` | No | Integer | Mặc định 1. |
| `pageSize` | No | Integer | Mặc định 20; tối đa 100. |

### Response Status Codes

| Status | Meaning | Condition |
|---:|---|---|
| `200` | OK | Trả về lịch sử status. |
| `400` | Bad Request | UUID/query sai format. |
| `401` | Unauthorized | Access Token không hợp lệ. |
| `403` | Forbidden | Không có quyền xem application. |
| `404` | Not Found | Application không tồn tại. |
| `500` | Internal Server Error | Lỗi truy vấn history. |

### Example Success Response

```json
{
  "data": [
    {
      "id": "c6d97e94-8128-4ce5-bb44-70fbfd8bfbb0",
      "applicationId": "5fc43d70-1c27-4c94-9306-d1a1d4dc9c60",
      "status": "SUBMITTED",
      "changedBy": "7d9e6f7a-08d8-4e2a-8f68-5d0cb4f47e4a",
      "note": null,
      "createdAt": "2026-09-29T12:00:00Z"
    },
    {
      "id": "ee3f0ca0-a6f7-4e27-8508-9032fc4b6fd5",
      "applicationId": "5fc43d70-1c27-4c94-9306-d1a1d4dc9c60",
      "status": "INTERVIEW",
      "changedBy": "e2c5a5c7-3658-442d-87c1-cf8ff34d2d8b",
      "note": "Invite candidate to technical interview.",
      "createdAt": "2026-10-01T09:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 2,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  },
  "correlationId": "5f1c0d68-9a3f-4c85-bf50-4a7c17c1e2af"
}
```

</details>
