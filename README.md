# Xây dựng nền tảng kết nối tuyển dụng và hỗ trợ tạo CV thông minh tích hợp AI (SmartHire)

> **AI-Powered Recruitment and Smart Resume Builder System**

**Nhóm thực hiện:** `Nhóm 1`<br>
**Môn học:** Niên luận ngành Kỹ thuật phần mềm

Thành viên nhóm:
- `Phan Quốc Bình - B2303798` 
- `Trần Trọng Phúc - B2303844` 
- `Nguyễn Phước Lộc - B2303828`

Repository này lưu trữ mã nguồn LaTeX, hình ảnh/sơ đồ và các tài liệu liên quan đến báo cáo niên luận. Repository phục vụ việc soạn thảo, biên dịch, review và theo dõi tiến độ tài liệu của nhóm.

## 📁 Cấu trúc thư mục

```text
smart-recruitment-docs/
├── design-spec/
│   ├── main.tex
│   └── chapters/
│       ├── 01_introduction.tex
│       ├── 02_overview.tex
│       ├── 03_architecture.tex
│       ├── 04_design_date.tex
│       ├── 05_design-func.tex
│       ├── 06_req_trace.tex
│       ├── 07_appendix.tex
│       └── cover.tex
├── requirement-spec/
│   ├── main.tex
│   └── chapters/
│       ├── 01_introduction.tex
│       ├── 02_overview.tex
│       ├── 03_external_req.tex
│       ├── 04_system_features.tex
│       ├── 05_non-func_req.tex
│       ├── 06_other_reqs.tex
│       ├── appendix.tex
│       ├── cover.tex
│       ├── test.tex
│       └── version.tex
├── project-plan/
├── report/
├── test-case/
├── shared/
│   ├── assets/
│   └── configs/
│       ├── layout.tex
│       ├── packages.tex
│       ├── titles.tex
│       └── toc.tex
├── .gitignore
└── README.md
```

| Thành phần | Vai trò |
|---|---|
| `design-spec/` | Tài liệu thiết kế hệ thống; hiện đã có `main.tex` và các chương trong `chapters/`. |
| `requirement-spec/` | Tài liệu đặc tả yêu cầu; gồm yêu cầu bên ngoài, chức năng hệ thống, yêu cầu phi chức năng và phụ lục. |
| `test-case/` | Lưu các trường hợp kiểm thử và minh chứng kiểm thử. Hiện là thư mục trống. |
| `project-plan/` | Lưu kế hoạch phát triển, tiến độ và phân công công việc. Hiện là thư mục trống. |
| `report/` | Lưu mẫu báo cáo niên luận Kỹ thuật phần mềm. Hiện là thư mục trống. |
| `shared/assets/` | Lưu hình ảnh, sơ đồ, biểu đồ dùng chung cho các tài liệu. Hiện là thư mục trống. |
| `shared/configs/` | Cấu hình LaTeX dùng chung: bố cục, package, tiêu đề và mục lục. |
| `.gitignore` | Loại trừ file biên dịch trung gian và các file sinh tự động khỏi Git. |

Các file như `.aux`, `.log`, `.out`, `.toc`, `.synctex.gz` và file PDF sinh ra khi biên dịch là file tạo tự động; không chỉnh sửa hoặc commit chúng nếu không có yêu cầu đặc biệt.

## 🛠️ Cài đặt và biên dịch

### 1. Cài môi trường LaTeX

- **Windows:** cài [MiKTeX](https://miktex.org/download) hoặc [TeX Live](https://www.tug.org/texlive/).
- Khi dùng MiKTeX, bật chế độ tự động cài package còn thiếu trong **MiKTeX Console**.
- Cài extension **LaTeX Workshop** của James Yu trong VS Code.
- Khởi động lại VS Code sau khi cài đặt và kiểm tra lệnh `pdflatex` hoặc `latexmk` trong Terminal.

### 2. Biên dịch bằng LaTeX Workshop

1. Mở repository này trong VS Code.
2. Mở file `design-spec/main.tex` hoặc `requirement-spec/main.tex`.
3. Nhấn `Ctrl+Alt+B` để biên dịch theo recipe mặc định.
4. Mở file PDF bằng nút **View LaTeX PDF** hoặc nhấn `Ctrl+Alt+V`.

Có thể biên dịch thủ công từ Terminal tại thư mục tương ứng:

```powershell
cd design-spec
latexmk -pdf main.tex
```

```powershell
cd requirement-spec
latexmk -pdf main.tex
```

Nếu `latexmk` chưa có trong PATH, dùng recipe của LaTeX Workshop hoặc chạy `pdflatex main.tex` nhiều lần để cập nhật mục lục và tham chiếu.

## 🤝 Quy định đóng góp và Git Workflow

### Quy tắc chỉnh sửa LaTeX

- Mỗi thành viên chỉ chỉnh sửa chương/file `.tex` đã được phân công; không sửa trực tiếp file của người khác nếu chưa trao đổi.
- Không viết toàn bộ nội dung vào `main.tex`; file này chỉ nên đảm nhiệm khai báo cấu hình và `\input`/`\include` các chương.
- Đặt tên file chương theo thứ tự và mục đích rõ ràng, ví dụ `03_architecture.tex`.
- Giữ nguyên cấu trúc LaTeX, định dạng tiêu đề và các macro dùng chung trong `shared/configs/`.
- Trước khi tạo macro hoặc package mới, kiểm tra xem cấu hình tương ứng đã có trong `shared/configs/` chưa.

### Quy tắc hình ảnh và sơ đồ

- Lưu hình ảnh/sơ đồ dùng chung trong `shared/assets/`.
- Dùng tên file không dấu, chữ thường, phân tách bằng dấu gạch dưới, ví dụ `system_architecture.png`.
- Ưu tiên định dạng vector (`.pdf`, `.svg` nếu công cụ hỗ trợ); dùng `.png` hoặc `.jpg` cho ảnh chụp.
- Tối ưu kích thước file và kiểm tra bản quyền/nguồn trích dẫn trước khi thêm vào repository.
- Trong LaTeX, tham chiếu hình bằng đường dẫn tương đối và đặt `\label`/`\caption` đầy đủ.

### Git Workflow

Trước khi bắt đầu làm việc, luôn cập nhật nhánh hiện tại:

```bash
git pull origin main
```

Quy trình đề nghị:

```bash
git checkout -b docs/mo-ta-ngan-gon
# chỉnh sửa và biên dịch kiểm tra
git add <duong-dan-file>
git commit -m "docs: cập nhật mô tả kiến trúc"
git push origin docs/mo-ta-ngan-gon
```

Quy tắc commit message bằng tiếng Việt:

```text
<loai>: <mo-ta-ngan-gon>
```

Các loại thường dùng: `docs` (tài liệu), `test` (kiểm thử), `refactor` (tổ chức lại), `chore` (cấu hình). Nội dung commit viết ở thì chủ động, ngắn gọn và nêu đúng phạm vi thay đổi.

Trước khi tạo Pull Request, cần biên dịch thành công tài liệu bị ảnh hưởng, kiểm tra lỗi tham chiếu và mô tả rõ nội dung đã thay đổi.

## 📊 Phân công và tiến độ

| Hạng mục/Chương | Người phụ trách | Trạng thái |
|---|---|---|
| Tài liệu đặc tả (`requirement-spec/`) | `[Điền tên]` | ⏳ Đang thực hiện |
| Tài liệu thiết kế (`design-spec/`) | `[Điền tên]` | ⏳ Đang thực hiện |
| Kiến trúc hệ thống và sơ đồ | `[Điền tên]` | ⬜ Chưa bắt đầu |
| Kế hoạch phát triển (`project-plan/`) | `[Điền tên]` | ⬜ Chưa bắt đầu |
| Các trường hợp kiểm thử (`test-case/`) | `[Điền tên]` | ⬜ Chưa bắt đầu |
| Mẫu báo cáo niên luận (`report/`) | `[Điền tên]` | ⬜ Chưa bắt đầu |
| Rà soát, biên dịch và đóng gói tài liệu | `[Điền tên]` | ⬜ Chưa bắt đầu |

> Cập nhật cột **Trạng thái** bằng một trong các giá trị: `⬜ Chưa bắt đầu`, `⏳ Đang thực hiện`, `✅ Hoàn thành`, `⚠️ Cần rà soát`.