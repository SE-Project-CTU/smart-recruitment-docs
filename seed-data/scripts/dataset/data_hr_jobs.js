// 10 Job Postings cho ngành Nhân sự, Hành chính & Pháp chế
module.exports = function(provinces) {
  const { HN, HCM, DN, BN } = provinces;

  return [
    // 81. Trưởng phòng Nhân sự
    {
      title: "Trưởng phòng Nhân sự Tổng hợp (HR Manager - Công ty Công nghệ & Dịch vụ)",
      provinceId: HCM,
      detailedLocation: "Tòa nhà Bitexco Financial Tower, Quận 1, TP. Hồ Chí Minh",
      experienceYears: 6,
      jobLevel: "DepartmentHead",
      educationLevel: "Bachelor",
      vacancies: 1,
      workMode: "Hybrid",
      jobType: "FullTime",
      description: `Hoạch định chiến lược nguồn nhân lực, xây dựng chính sách đãi ngộ và phát triển văn hóa doanh nghiệp gắn kết cho quy mô 300 nhân sự.\n\nTrách nhiệm:\n- Quản lý và điều hành toàn bộ hoạt động của phòng Nhân sự: Tuyển dụng, C&B, Đào tạo & Phát triển, Văn hóa doanh nghiệp.\n- Xây dựng, hoàn thiện hệ thống chính sách nhân sự: thang bảng lương, quy chế khen thưởng, đánh giá hiệu quả KPI/OKR.\n- Tham mưu cho Ban Tổng Giám đốc về cơ cấu tổ chức, quy hoạch đội ngũ kế thừa và quản trị nhân tài.\n- Giải quyết các vấn đề quan hệ lao động, kỷ luật lao động và đại diện công ty làm việc với các cơ quan quản lý lao động.`,
      requirements: `- Tốt nghiệp Đại học chuyên ngành Quản trị nhân lực, Luật, Kinh tế hoặc liên quan.\n- Tối thiểu 5 năm kinh nghiệm làm Quản lý nhân sự (HR Manager) trong các doanh nghiệp quy mô từ 200 người trở lên.\n- Nắm vững Bộ luật Lao động, Luật Bảo hiểm xã hội, Luật Thuế TNCN và các quy định pháp luật liên quan.\n- Kỹ năng lãnh đạo, thấu hiểu con người, tư vấn nội bộ và giải quyết xung đột xuất sắc.\n- Tiếng Anh giao tiếp lưu loát trong môi trường quốc tế.`,
      benefits: `- Thu nhập: 35.000.000 - 50.000.000 VNĐ.\n- Thưởng KPI quản lý năm và tháng lương thứ 13.\n- Gói bảo hiểm sức khỏe VIP toàn diện cho cá nhân và gia đình.\n- Du lịch nghỉ dưỡng 5 sao cùng ban điều hành công ty.\n- Môi trường làm việc mở, tôn trọng con người và hỗ trợ phát triển cá nhân.`,
      salaryMin: 35000000,
      salaryMax: 50000000,
      salaryNegotiable: false,
      deadlineDays: 45,
      industries: ["Trưởng phòng nhân sự", "Nhân sự tổng hợp"],
      skills: ["Sử dụng hệ thống quản trị nhân sự", "Tuyển dụng nhân sự", "Kỹ năng đàm phán và thương lượng", "Tiếng Anh giao tiếp", "Giao tiếp đa văn hóa"]
    },

    // 82. HRBP
    {
      title: "Chuyên viên Nhân sự Đối tác Kinh doanh (HR Business Partner - HRBP Tech)",
      provinceId: HN,
      detailedLocation: "Tòa nhà FPT Tower, Cầu Giấy, Hà Nội",
      experienceYears: 4,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 2,
      workMode: "Hybrid",
      jobType: "FullTime",
      description: `Đóng vai trò cầu nối chiến lược giữa Khối Công nghệ Phần mềm và phòng Nhân sự, đảm bảo nguồn nhân lực đáp ứng kịp thời mục tiêu kinh doanh.\n\nNhiệm vụ:\n- Làm việc chặt chẽ với các Giám đốc Khối Công nghệ (Tech Directors) để dự báo nhu cầu nhân sự và lập kế hoạch tuyển dụng trọng điểm.\n- Tư vấn giải pháp giữ chân nhân tài, cải thiện động lực làm việc và giải quyết các bài toán về hiệu suất làm việc của nhóm kỹ sư.\n- Triển khai các chương trình đào tạo nội bộ, đánh giá năng lực (Competency Assessment) và phát triển lộ trình thăng tiến cho nhân sự IT.\n- Thúc đẩy việc thực thi các giá trị văn hóa doanh nghiệp và đo lường mức độ gắn kết nhân viên (eNPS).`,
      requirements: `- Tốt nghiệp Đại học chuyên ngành Quản trị nhân sự, Quản trị kinh doanh, Tâm lý học hoặc liên quan.\n- Có từ 3 năm kinh nghiệm làm HRBP hoặc Senior HR Generalist trong các công ty công nghệ/phần mềm.\n- Am hiểu đặc thù tâm lý, động lực làm việc và thị trường lao động ngành CNTT.\n- Tư duy kinh doanh (Business Acumen) tốt, hiểu được các mục tiêu tài chính và vận hành dự án.\n- Kỹ năng giao tiếp, lắng nghe và tạo dựng mối quan hệ tin cậy với các cấp quản lý kỹ thuật.`,
      benefits: `- Mức lương: 22.000.000 - 32.000.000 VNĐ.\n- Thưởng tháng lương thứ 13 và thưởng hiệu suất theo quý.\n- Bảo hiểm sức khỏe quốc tế PVI Care.\n- Hỗ trợ học tập và thi các chứng chỉ nhân sự quốc tế (SHRM-CP, HRCI-PHRi).\n- Môi trường làm việc năng động, nhiều thử thách thú vị.`,
      salaryMin: 22000000,
      salaryMax: 32000000,
      salaryNegotiable: false,
      deadlineDays: 45,
      industries: ["Đối tác nhân sự (HRBP)", "Nhân sự tổng hợp"],
      skills: ["Sử dụng hệ thống quản trị nhân sự", "Tuyển dụng nhân sự", "Kỹ năng đàm phán và thương lượng", "Tiếng Anh giao tiếp", "Tư duy hệ thống"]
    },

    // 83. C&B Specialist
    {
      title: "Chuyên viên Tiền lương & Phúc lợi (Compensation & Benefits Specialist - C&B)",
      provinceId: HCM,
      detailedLocation: "Tòa nhà Deutsches Haus, 33 Lê Duẩn, Quận 1, TP. Hồ Chí Minh",
      experienceYears: 3,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 2,
      workMode: "Hybrid",
      jobType: "FullTime",
      description: `Chịu trách nhiệm tính toán bảng lương, quản lý bảo hiểm xã hội, thuế thu nhập cá nhân và các chế độ phúc lợi cho 500 nhân sự.\n\nNhiệm vụ:\n- Thu thập bảng chấm công, dữ liệu tăng ca và tính toán bảng lương hàng tháng chính xác, bảo mật tuyệt đối.\n- Thực hiện các thủ tục báo tăng, giảm BHXH, BHYT, BHTN và giải quyết chế độ ốm đau, thai sản cho người lao động.\n- Tính thuế TNCN hàng tháng, lập tờ khai thuế và hỗ trợ người lao động quyết toán thuế TNCN cuối năm.\n- Tham gia khảo sát lương thị trường (Mercer, Talentnet) và đề xuất điều chỉnh cơ cấu lương thưởng cạnh tranh.`,
      requirements: `- Tốt nghiệp Đại học chuyên ngành Quản trị nhân lực, Luật, Kinh tế lao động, Kế toán.\n- Có ít nhất 3 năm kinh nghiệm chuyên sâu về mảng C&B trong các doanh nghiệp có quy mô từ 300 nhân sự trở lên.\n- Nắm vững Luật Lao động, Luật BHXH, Luật Thuế TNCN và các chính sách lao động hiện hành.\n- Sử dụng Excel thành thạo nâng cao (Index-Match, Sumifs, Pivot Table, xử lý dữ liệu lớn).\n- Tinh thần trách nhiệm cao, cẩn thận, bảo mật thông tin tuyệt đối.`,
      benefits: `- Thu nhập: 16.000.000 - 25.000.000 VNĐ.\n- Thưởng tháng lương thứ 13 và các dịp lễ tết trong năm.\n- Gói bảo hiểm sức khỏe Bảo Việt toàn diện.\n- Xét duyệt tăng lương định kỳ hàng năm.\n- Môi trường làm việc chuẩn quốc tế, trang thiết bị tiện nghi.`,
      salaryMin: 16000000,
      salaryMax: 25000000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Kế toán tiền lương", "Nhân sự tổng hợp"],
      skills: ["Sử dụng hệ thống quản trị nhân sự", "Lập báo cáo tài chính theo VAS", "Đánh giá hệ thống kiểm soát nội bộ", "Kỹ năng đàm phán và thương lượng", "Tư duy hệ thống"]
    },

    // 84. Chuyên viên Đào tạo L&D
    {
      title: "Chuyên viên Đào tạo & Phát triển Năng lực (Learning & Development Specialist - L&D)",
      provinceId: HN,
      detailedLocation: "Tòa nhà Keangnam Landmark 72, Nam Từ Liêm, Hà Nội",
      experienceYears: 3,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 1,
      workMode: "Hybrid",
      jobType: "FullTime",
      description: `Khảo sát nhu cầu đào tạo (TNA), thiết kế chương trình và tổ chức các khóa huấn luyện nâng cao kỹ năng cho cán bộ nhân viên.\n\nNhiệm vụ:\n- Khảo sát và phân tích khoảng cách năng lực (Skill Gap) của từng phòng ban để xây dựng kế hoạch đào tạo năm.\n- Trực tiếp đứng lớp giảng dạy các khóa đào tạo hội nhập nhân viên mới (Onboarding) và đào tạo kỹ năng mềm cơ bản.\n- Tìm kiếm, lựa chọn và phối hợp với các chuyên gia, học viện đào tạo uy tín bên ngoài để tổ chức các khóa học chuyên sâu.\n- Đánh giá hiệu quả sau đào tạo theo mô hình Kirkpatrick (Phản ứng, Học hỏi, Hành vi, Kết quả kinh doanh).`,
      requirements: `- Tốt nghiệp Đại học chuyên ngành Sư phạm, Quản trị nhân sự, Tâm lý học hoặc Ngoại ngữ.\n- Tối thiểu 2-3 năm kinh nghiệm trong lĩnh vực đào tạo nội bộ (L&D) trong các doanh nghiệp quy mô vừa và lớn.\n- Kỹ năng thuyết trình, đứng lớp truyền cảm hứng và thiết kế bài giảng (E-learning, Slide bài giảng) hấp dẫn.\n- Tác phong tự tin, hòa đồng, năng lượng tích cực và yêu thích công việc phát triển con người.\n- Tiếng Anh giao tiếp tốt.`,
      benefits: `- Lương: 15.000.000 - 22.000.000 VNĐ.\n- Thưởng hoàn thành chỉ số đào tạo năm và tháng lương thứ 13.\n- Hỗ trợ 100% kinh phí tham gia các khóa học Train the Trainer quốc tế.\n- Bảo hiểm sức khỏe PVI Care cho bản thân.\n- Môi trường học tập không ngừng, văn hóa cởi mở.`,
      salaryMin: 15000000,
      salaryMax: 22000000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Đào tạo", "Chuyên môn Giáo dục/Đào tạo khác"],
      skills: ["Thuyết trình bằng dữ liệu", "Sử dụng hệ thống quản trị nhân sự", "Xây dựng thương hiệu nhà tuyển dụng", "Tiếng Anh giao tiếp", "Giao tiếp đa văn hóa"]
    },

    // 85. Mass Talent Acquisition (Khu công nghiệp)
    {
      title: "Chuyên viên Tuyển dụng Khối Vận hành & Sản xuất (Mass Talent Acquisition)",
      provinceId: BN,
      detailedLocation: "Khu công nghiệp VSIP Bắc Ninh, Xã Phù Chẩn, Thị xã Từ Sơn, Tỉnh Bắc Ninh",
      experienceYears: 2,
      jobLevel: "Staff",
      educationLevel: "College",
      vacancies: 3,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Tổ chức tuyển dụng số lượng lớn công nhân sản xuất, nhân viên kỹ thuật và điều phối kho cho nhà máy tại Bắc Ninh.\n\nNhiệm vụ:\n- Tiếp nhận nhu cầu tuyển dụng công nhân từ các xưởng sản xuất, lên kế hoạch tuyển dụng đáp ứng kịp tiến độ đơn hàng.\n- Mở rộng các kênh tìm nguồn: phát tờ rơi, đăng bài mạng xã hội, phối hợp với Trung tâm dịch vụ việc làm tỉnh và các trường nghề.\n- Tổ chức các buổi phỏng vấn tuyển dụng tập trung tại nhà máy, kiểm tra hồ sơ và hướng dẫn thủ tục nhận việc.\n- Chăm sóc người lao động trong những ngày đầu đi làm, giảm thiểu tỷ lệ công nhân nghỉ việc sớm.`,
      requirements: `- Tốt nghiệp Cao đẳng/Đại học các ngành Kinh tế, Xã hội, Quản trị nhân lực hoặc liên quan.\n- Có ít nhất 1-2 năm kinh nghiệm tuyển dụng số lượng lớn (Mass Recruitment) trong các nhà máy hoặc khu công nghiệp.\n- Nhanh nhẹn, chịu khó, có khả năng đi thị trường tìm nguồn lao động tại các huyện, xã lân cận.\n- Kỹ năng giao tiếp mộc mạc, gần gũi, thấu hiểu tâm lý người lao động phổ thông.\n- Chịu được áp lực tuyển dụng cao theo mùa vụ sản xuất.`,
      benefits: `- Thu nhập: 12.000.000 - 18.000.000 VNĐ + Thưởng hoa hồng theo số lượng lao động tuyển dụng thành công.\n- Xe đưa đón từ Hà Nội về nhà máy Bắc Ninh hàng ngày.\n- Cơm trưa miễn phí tại nhà ăn công ty.\n- Thưởng tháng 13 và chế độ bảo hiểm theo quy định.`,
      salaryMin: 12000000,
      salaryMax: 18000000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Tuyển dụng", "Tư vấn nhân sự"],
      skills: ["Tuyển dụng nhân sự", "Xây dựng thương hiệu nhà tuyển dụng", "Vận hành hệ thống quản lý tuyển dụng", "Kỹ năng đàm phán và thương lượng", "Giao tiếp đa văn hóa"]
    },

    // 86. Trưởng phòng Hành chính
    {
      title: "Trưởng phòng Hành chính Quản trị (Admin Manager - Quản lý Cơ sở Vật chất)",
      provinceId: HCM,
      detailedLocation: "Tòa nhà Saigon Riverside, Số 2A-4A Tôn Đức Thắng, Quận 1, TP. Hồ Chí Minh",
      experienceYears: 5,
      jobLevel: "DepartmentHead",
      educationLevel: "Bachelor",
      vacancies: 1,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Quản lý toàn diện công tác hành chính, quản trị cơ sở vật chất văn phòng và tối ưu hóa chi phí vận hành doanh nghiệp.\n\nTrách nhiệm:\n- Quản lý và vận hành hệ thống văn phòng làm việc của công ty: quản lý tài sản, trang thiết bị, phòng họp, an ninh trật tự, vệ sinh.\n- Đàm phán và ký kết hợp đồng thuê văn phòng, hợp đồng dịch vụ vệ sinh, bảo vệ, văn phòng phẩm, xe đưa đón.\n- Lập ngân sách chi phí hành chính hàng năm và kiểm soát chi tiêu chặt chẽ trong định mức được phê duyệt.\n- Xây dựng và ban hành các quy định, nội quy văn phòng làm việc, đảm bảo môi trường làm việc xanh, sạch, an toàn (PCCC, 5S).`,
      requirements: `- Tốt nghiệp Đại học chuyên ngành Quản trị kinh doanh, Luật, Hành chính hoặc liên quan.\n- Tối thiểu 4-5 năm kinh nghiệm làm Quản lý hành chính trong các công ty quy mô từ 300 nhân viên trở lên.\n- Kỹ năng đàm phán giá cả nhà cung cấp và quản trị hợp đồng dịch vụ tốt.\n- Tác phong chỉn chu, quyết đoán, xử lý sự cố cơ sở vật chất nhanh gọn.\n- Kỹ năng quản lý đội ngũ nhân viên lễ tân, tạp vụ, lái xe hiệu quả.`,
      benefits: `- Thu nhập: 25.000.000 - 35.000.000 VNĐ.\n- Thưởng cuối năm theo hiệu quả quản lý chi phí.\n- Gói bảo hiểm sức khỏe VIP toàn diện.\n- Thưởng tháng lương thứ 13 và các chế độ đãi ngộ nội bộ hấp dẫn.`,
      salaryMin: 25000000,
      salaryMax: 35000000,
      salaryNegotiable: false,
      deadlineDays: 45,
      industries: ["Trưởng phòng hành chính", "Hành chính tổng hợp"],
      skills: ["Kỹ năng đàm phán và thương lượng", "Sử dụng hệ thống quản trị nhân sự", "Đánh giá hệ thống kiểm soát nội bộ", "Bảo trì hệ thống PCCC", "Tư duy hệ thống"]
    },

    // 87. Chuyên viên Pháp chế Doanh nghiệp
    {
      title: "Chuyên viên Pháp chế Doanh nghiệp (Corporate Legal Counsel - Hợp đồng & Doanh nghiệp)",
      provinceId: HN,
      detailedLocation: "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội",
      experienceYears: 4,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 1,
      workMode: "Hybrid",
      jobType: "FullTime",
      description: `Soát xét các hợp đồng kinh tế, tư vấn pháp lý cho các hoạt động kinh doanh và bảo vệ quyền lợi hợp pháp của công ty.\n\nNhiệm vụ:\n- Soạn thảo, thẩm định và đàm phán các hợp đồng thương mại, hợp đồng hợp tác đầu tư, thỏa thuận cổ đông.\n- Tư vấn pháp lý cho Ban Giám đốc về các vấn đề liên quan đến Luật Doanh nghiệp, Luật Đầu tư, Luật Cạnh tranh và Sở hữu trí tuệ.\n- Thực hiện các thủ tục pháp lý doanh nghiệp: thay đổi đăng ký kinh doanh, lập chi nhánh/văn phòng đại diện, xin giấy phép con.\n- Tham gia giải quyết các tranh chấp thương mại, khiếu nại của khách hàng hoặc đối tác theo đúng trình tự pháp luật.`,
      requirements: `- Tốt nghiệp Đại học chuyên ngành Luật (Đại học Luật Hà Nội, Khoa Luật ĐHQG hoặc tương đương).\n- Có từ 3-4 năm kinh nghiệm làm pháp chế nội bộ trong các doanh nghiệp lớn hoặc các công ty luật uy tín.\n- Ưu tiên ứng viên đã có Chứng chỉ hành nghề Luật sư hoặc thẻ Luật sư.\n- Tư duy pháp lý sắc sảo, kỹ năng soạn thảo văn bản chặt chẽ, câu từ chuẩn xác.\n- Tiếng Anh pháp lý thành thạo trong việc soạn thảo và rà soát hợp đồng song ngữ.`,
      benefits: `- Mức thu nhập: 22.000.000 - 35.000.000 VNĐ thỏa thuận theo năng lực.\n- Thưởng tháng 13 và thưởng hiệu quả dự án pháp lý.\n- Bảo hiểm sức khỏe PTI Care cao cấp.\n- Cơ hội thăng tiến lên Trưởng phòng Pháp chế hoặc Giám đốc Pháp chế (Head of Legal).`,
      salaryMin: 22000000,
      salaryMax: 35000000,
      salaryNegotiable: false,
      deadlineDays: 45,
      industries: ["Pháp chế", "Chuyên môn Pháp chế khác"],
      skills: ["Kỹ năng đàm phán và thương lượng", "Đánh giá hệ thống kiểm soát nội bộ", "Tiếng Anh giao tiếp", "Tư duy hệ thống", "Giao tiếp đa văn hóa"]
    },

    // 88. Chuyên viên Hành chính Lễ tân
    {
      title: "Chuyên viên Lễ tân Văn phòng & Hành chính Tổng hợp (Front Desk Officer)",
      provinceId: HCM,
      detailedLocation: "Tòa nhà Sunwah Tower, 115 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
      experienceYears: 1,
      jobLevel: "Staff",
      educationLevel: "College",
      vacancies: 2,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Đón tiếp khách hàng, quản lý tổng đài điện thoại và phụ trách các công việc hành chính lễ tân hàng ngày tại trụ sở công ty.\n\nNhiệm vụ:\n- Đón tiếp chu đáo khách hàng, đối tác đến thăm và làm việc tại văn phòng; hướng dẫn khách vào phòng họp.\n- Trực tổng đài điện thoại công ty, tiếp nhận và chuyển tiếp cuộc gọi đến các phòng ban liên quan.\n- Quản lý công văn, thư từ, bưu phẩm chuyển phát nhanh đến và đi của công ty.\n- Chuẩn bị trà nước, hoa tươi, sắp xếp phòng họp và chuẩn bị thiết bị trình chiếu trước các buổi họp quan trọng.`,
      requirements: `- Nữ, tốt nghiệp Cao đẳng/Đại học các ngành Du lịch, Khách sạn, Ngôn ngữ, Hành chính hoặc liên quan.\n- Ngoại hình ưa nhìn, giọng nói chuẩn truyền cảm, nụ cười thân thiện và phong thái lịch thiệp.\n- Có tối thiểu 1 năm kinh nghiệm làm việc ở vị trí Lễ tân văn phòng, Lễ tân khách sạn 4-5 sao hoặc Tiếp viên hàng không.\n- Giao tiếp tiếng Anh cơ bản tự tin khi đón tiếp khách nước ngoài.\n- Nhanh nhẹn, cẩn thận, biết sắp xếp công việc khoa học.`,
      benefits: `- Thu nhập: 9.000.000 - 13.000.000 VNĐ.\n- Thưởng tháng 13, thưởng các ngày lễ tết và sinh nhật.\n- Đồng phục công ty thiết kế cao cấp miễn phí.\n- Chế độ bảo hiểm đầy đủ, khám sức khỏe định kỳ.\n- Môi trường làm việc sang trọng tại trung tâm Quận 1.`,
      salaryMin: 9000000,
      salaryMax: 13000000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Hành chính tổng hợp", "Hành chính nhân sự"],
      skills: ["Tiếng Anh giao tiếp", "Giao tiếp đa văn hóa", "Kỹ năng đàm phán và thương lượng", "Sử dụng Figma", "Tư duy hệ thống"]
    },

    // 89. Internal Communication
    {
      title: "Chuyên viên Truyền thông Nội bộ & Văn hóa Doanh nghiệp (Internal Communication Specialist)",
      provinceId: HN,
      detailedLocation: "Tòa nhà CMC Tower, Duy Tân, Cầu Giấy, Hà Nội",
      experienceYears: 2,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 2,
      workMode: "Hybrid",
      jobType: "FullTime",
      description: `Tạo dựng môi trường làm việc gắn kết, truyền tải thông điệp của ban lãnh đạo và tổ chức các hoạt động văn hóa tập thể sôi nổi.\n\nNhiệm vụ:\n- Lên ý tưởng và sản xuất nội dung bản tin nội bộ (Newsletter), video recap và các bài viết vinh danh nhân viên trên kênh truyền thông nội bộ.\n- Tổ chức các sự kiện nội bộ: Sinh nhật công ty, Ngày hội gia đình (Family Day), Teambuilding, Giải bóng đá, Year End Party.\n- Triển khai các hoạt động gắn kết văn hóa, lắng nghe tâm tư nguyện vọng của nhân viên nhằm gia tăng chỉ số hạnh phúc tại nơi làm việc.\n- Phối hợp với đội ngũ Tuyển dụng xây dựng hình ảnh thương hiệu nhà tuyển dụng (Employer Branding) hấp dẫn.`,
      requirements: `- Tốt nghiệp Đại học chuyên ngành Báo chí, Truyền thông, Quan hệ công chúng hoặc Quản trị nhân sự.\n- Có ít nhất 2 năm kinh nghiệm làm Truyền thông nội bộ trong các doanh nghiệp quy mô từ 200 người trở lên.\n- Năng động, hoạt ngôn, có khả năng làm MC dẫn chương trình các sự kiện nội bộ là lợi thế lớn.\n- Kỹ năng viết lách tốt, có khả năng quay chụp và chỉnh sửa ảnh/video cơ bản.\n- Tinh thần nhiệt huyết, hòa đồng và luôn tràn đầy năng lượng tích cực.`,
      benefits: `- Lương: 14.000.000 - 20.000.000 VNĐ.\n- Thưởng các sự kiện tổ chức thành công và tháng lương thứ 13.\n- Gói bảo hiểm sức khỏe Bảo Việt toàn diện.\n- Thỏa sức sáng tạo các hoạt động văn hóa theo phong cách riêng.\n- Môi trường làm việc trẻ trung, nhiều cơ hội tỏa sáng.`,
      salaryMin: 14000000,
      salaryMax: 20000000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Xây dựng và bảo vệ thương hiệu", "Nhân sự tổng hợp"],
      skills: ["Xây dựng thương hiệu nhà tuyển dụng", "Viết bài chuẩn SEO", "Sử dụng Figma", "Tiếng Anh giao tiếp", "Giao tiếp đa văn hóa"]
    },

    // 90. Thực tập sinh Nhân sự
    {
      title: "Thực tập sinh Phòng Nhân sự (HR General Intern - Sourcing & Admin)",
      provinceId: DN,
      detailedLocation: "Tòa nhà Software Park, 02 Quang Trung, Hải Châu, Đà Nẵng",
      experienceYears: 0,
      jobLevel: "Intern",
      educationLevel: "College",
      vacancies: 3,
      workMode: "Onsite",
      jobType: "Internship",
      description: `Cơ hội trải nghiệm thực tế các nghiệp vụ nhân sự: đăng tin tuyển dụng, sàng lọc CV, sắp xếp lịch phỏng vấn và quản lý hồ sơ nhân viên.\n\nNhiệm vụ:\n- Hỗ trợ đăng tin tuyển dụng trên các hội nhóm việc làm, mạng xã hội và các website tuyển dụng miễn phí.\n- Sàng lọc CV ứng viên theo tiêu chí ban đầu và liên hệ đặt lịch hẹn phỏng vấn.\n- Đón tiếp ứng viên đến tham gia phỏng vấn, chuẩn bị phòng phỏng vấn chu đáo.\n- Hỗ trợ nhập liệu thông tin nhân viên mới lên hệ thống phần mềm nhân sự nội bộ.`,
      requirements: `- Sinh viên năm 3, năm 4 hoặc mới tốt nghiệp các ngành Quản trị nhân lực, Luật, Kinh tế, Ngoại ngữ.\n- Yêu thích lĩnh vực nhân sự, giao tiếp khéo léo và có thái độ làm việc nhiệt tình.\n- Cẩn thận, nhanh nhẹn, biết sử dụng tin học văn phòng cơ bản.\n- Có thể thực tập tối thiểu 3 tháng.`,
      benefits: `- Phụ cấp thực tập: 3.500.000 - 5.500.000 VNĐ/tháng + Phụ cấp ăn trưa.\n- Được đào tạo bài bản các kỹ năng tìm kiếm ứng viên và phỏng vấn nhân sự.\n- Cấp dấu xác nhận báo cáo thực tập tốt nghiệp.\n- Có cơ hội được tuyển dụng chính thức làm Junior HR Recruiter sau khi tốt nghiệp.`,
      salaryMin: 3500000,
      salaryMax: 5500000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Tuyển dụng", "Nhân sự tổng hợp"],
      skills: ["Tuyển dụng nhân sự", "Sử dụng hệ thống quản trị nhân sự", "Xây dựng thương hiệu nhà tuyển dụng", "Giao tiếp đa văn hóa", "Tiếng Anh giao tiếp"]
    }
  ];
};
