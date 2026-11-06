// 10 Job Postings cho ngành Logistics, Chuỗi cung ứng, Mua hàng & Sản xuất
module.exports = function(provinces) {
  const { HN, HCM, HP, BN, TN, CT } = provinces;

  return [
    // 91. Supply Chain Manager
    {
      title: "Trưởng phòng Chuỗi Cung ứng (Supply Chain Manager - FMCG / Bán lẻ)",
      provinceId: HCM,
      detailedLocation: "Tòa nhà Saigon Centre, 65 Lê Lợi, Quận 1, TP. Hồ Chí Minh",
      experienceYears: 6,
      jobLevel: "DepartmentHead",
      educationLevel: "Bachelor",
      vacancies: 1,
      workMode: "Hybrid",
      jobType: "FullTime",
      description: `Hoạch định, quản lý toàn diện chuỗi cung ứng từ khâu dự báo nhu cầu (Demand Planning), mua hàng, tồn kho đến phân phối vận chuyển.\n\nTrách nhiệm:\n- Thiết lập chiến lược chuỗi cung ứng đồng bộ với kế hoạch kinh doanh của tập đoàn, tối ưu hóa tổng chi phí vận hành (Total Cost to Serve).\n- Quản trị dự báo nhu cầu thị trường (S&OP), cân đối kế hoạch sản xuất và lượng tồn kho an toàn (Safety Stock).\n- Đàm phán các hợp đồng khung với các nhà cung cấp chiến lược và các đối tác vận tải 3PL/4PL.\n- Ứng dụng công nghệ quản trị chuỗi cung ứng hiện đại (SAP SCM, WMS, TMS) nâng cao tỷ lệ giao hàng đúng hạn (OTIF) đạt trên 98%.`,
      requirements: `- Tốt nghiệp Đại học trở lên chuyên ngành Chuỗi cung ứng, Logistics, Ngoại thương hoặc Quản trị kinh doanh.\n- Tối thiểu 5 năm kinh nghiệm quản lý Chuỗi cung ứng trong các tập đoàn FMCG hoặc bán lẻ quy mô lớn.\n- Sở hữu chứng chỉ quốc tế về chuỗi cung ứng: CSCP, CPIM (APICS) hoặc tương đương là lợi thế lớn.\n- Kỹ năng phân tích số liệu vĩ mô, tư duy logic giải quyết vấn đề và năng lực đàm phán thương mại đỉnh cao.\n- Tiếng Anh lưu loát trong giao tiếp và làm việc với các đối tác nước ngoài.`,
      benefits: `- Thu nhập: 40.000.000 - 60.000.000 VNĐ.\n- Thưởng hiệu quả chuỗi cung ứng và tháng lương 13, 14.\n- Gói bảo hiểm sức khỏe VIP toàn diện cho cá nhân và người thân.\n- Xe ô tô đưa đón công tác khi đi khảo sát các trung tâm phân phối (DC) tại các tỉnh.\n- Môi trường làm việc chuẩn quốc tế, chế độ đãi ngộ vượt trội.`,
      salaryMin: 40000000,
      salaryMax: 60000000,
      salaryNegotiable: false,
      deadlineDays: 45,
      industries: ["Quản lý hệ thống vận tải (TMS)", "Sales Logistics"],
      skills: ["Vận hành hệ thống WMS", "Vận hành hệ thống TMS", "Đàm phán hợp đồng mua hàng", "Thuyết trình bằng dữ liệu", "Tiếng Anh giao tiếp"]
    },

    // 92. Chuyên viên Mua hàng MRO
    {
      title: "Chuyên viên Mua hàng Dự án & Kỹ thuật (Procurement / Sourcing Specialist)",
      provinceId: HN,
      detailedLocation: "Tòa nhà Keangnam Landmark 72, Nam Từ Liêm, Hà Nội",
      experienceYears: 3,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 2,
      workMode: "Hybrid",
      jobType: "FullTime",
      description: `Tìm kiếm nhà cung cấp, đàm phán giá cả và mua sắm thiết bị máy móc, vật tư kỹ thuật cho các dự án xây dựng và công nghiệp.\n\nNhiệm vụ:\n- Tiếp nhận yêu cầu mua sắm vật tư, thiết bị từ các phòng ban kỹ thuật và công trường dự án.\n- Khảo sát thị trường, tìm kiếm và đánh giá năng lực các nhà cung cấp trong và ngoài nước.\n- Phát hành hồ sơ mời thầu (RFP/RFQ), phân tích so sánh báo giá và đàm phán hợp đồng thương mại tối ưu chi phí.\n- Theo dõi tiến độ giao hàng, kiểm tra chất lượng hàng hóa nhập kho và phối hợp với kế toán làm thủ tục thanh toán.`,
      requirements: `- Tốt nghiệp Đại học chuyên ngành Kinh tế, Ngoại thương, Kỹ thuật hoặc liên quan.\n- Có ít nhất 3 năm kinh nghiệm làm mua hàng (Procurement/Purchasing) mảng thiết bị kỹ thuật, vật liệu xây dựng hoặc CNTT.\n- Kỹ năng đàm phán, thương lượng giá cả và điều khoản hợp đồng xuất sắc.\n- Trung thực, khách quan, liêm chính tuyệt đối trong các quan hệ với nhà cung cấp.\n- Tiếng Anh giao tiếp và đàm phán thương mại tốt.`,
      benefits: `- Thu nhập: 16.000.000 - 25.000.000 VNĐ.\n- Thưởng tiết kiệm chi phí mua sắm dự án theo quý.\n- Bảo hiểm sức khỏe PTI Care toàn diện.\n- Thưởng tháng 13 và các quyền lợi bảo hiểm đầy đủ.\n- Môi trường làm việc năng động, tôn trọng năng lực.`,
      salaryMin: 16000000,
      salaryMax: 25000000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Chuyên viên đấu thầu", "Sales Admin/Sales Support/Sales Associate"],
      skills: ["Đàm phán hợp đồng mua hàng", "Kỹ năng đàm phán và thương lượng", "Kế toán bán hàng", "Tiếng Anh giao tiếp", "Tư duy hệ thống"]
    },

    // 93. Quản lý Kho bãi Vận hành
    {
      title: "Quản lý Kho Vận & Trung tâm Phân phối (Warehouse Manager - WMS / 3PL)",
      provinceId: BN,
      detailedLocation: "Khu công nghiệp Tiên Sơn, Phường Đồng Nguyên, Thị xã Từ Sơn, Tỉnh Bắc Ninh",
      experienceYears: 4,
      jobLevel: "DepartmentHead",
      educationLevel: "Bachelor",
      vacancies: 1,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Quản lý điều hành toàn bộ hoạt động của Tổng kho diện tích 15.000m2: tiếp nhận hàng, lưu trữ, soạn hàng và xuất hàng đi toàn quốc.\n\nTrách nhiệm:\n- Quản lý đội ngũ 30-40 nhân sự kho gồm: thủ kho, nhân viên vận hành xe nâng, nhân viên bốc xếp và kiểm đếm.\n- Tổ chức sắp xếp layout kho hàng khoa học, tối ưu hóa dung tích chứa hàng và luồng di chuyển của xe nâng.\n- Vận hành và giám sát việc nhập xuất hàng trên phần mềm quản lý kho (WMS/SAP), đảm bảo độ chính xác tồn kho trên 99.8%.\n- Kiểm soát an toàn lao động, phòng cháy chữa cháy (PCCC) và quy trình vệ sinh 5S trong toàn bộ khu vực kho.`,
      requirements: `- Có từ 3-4 năm kinh nghiệm làm Quản lý kho (Warehouse Manager/Supervisor) tại các trung tâm phân phối hoặc công ty logistics 3PL.\n- Thành thạo việc sử dụng các phần mềm quản lý kho WMS, SAP hoặc Infor.\n- Kỹ năng quản lý nhân sự lao động phổ thông, phân công ca kíp làm việc khoa học.\n- Sức khỏe tốt, chịu được áp lực công việc và có thể làm việc ngoài giờ trong các đợt cao điểm xuất hàng.\n- Có bằng lái xe nâng hoặc chứng chỉ an toàn kho bãi là lợi thế.`,
      benefits: `- Lương: 22.000.000 - 32.000.000 VNĐ.\n- Xe đưa đón nhân viên từ Hà Nội về kho Bắc Ninh hàng ngày.\n- Cơm trưa và phụ cấp ca đêm miễn phí.\n- Thưởng tháng lương thứ 13 + thưởng an toàn vận hành kho hàng năm.\n- Đầy đủ chế độ bảo hiểm theo quy định.`,
      salaryMin: 22000000,
      salaryMax: 32000000,
      salaryNegotiable: false,
      deadlineDays: 45,
      industries: ["Quản lý hệ thống vận tải (TMS)", "Sales Logistics"],
      skills: ["Vận hành hệ thống WMS", "Vận hành hệ thống quản lý kho", "Quản lý kho bãi", "Bảo trì hệ thống PCCC", "Tư duy hệ thống"]
    },

    // 94. Chuyên viên Xuất Nhập khẩu & Hải quan
    {
      title: "Chuyên viên Thủ tục Hải quan & Xuất Nhập khẩu (Customs Clearance & Import/Export Officer)",
      provinceId: HP,
      detailedLocation: "Tòa nhà TD Plaza, Lô 20A Lê Hồng Phong, Đông Khê, Ngô Quyền, Hải Phòng",
      experienceYears: 3,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 2,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Thực hiện mở tờ khai hải quan điện tử (VNACCS/VCIS), làm thủ tục thông quan hàng hóa xuất nhập khẩu tại các chi cục Hải quan Hải Phòng.\n\nNhiệm vụ:\n- Tiếp nhận bộ chứng từ xuất nhập khẩu (Invoice, Packing List, B/L, C/O), kiểm tra mã HS code và biểu thuế xuất nhập khẩu.\n- Khai báo tờ khai hải quan điện tử trên phần mềm ECUS5-VNACCS cho các loại hình nhập kinh doanh, gia công, sản xuất xuất khẩu.\n- Trực tiếp làm thủ tục hiện trường tại các cảng Hải Phòng: tiếp nhận kiểm hóa, đăng ký kiểm tra chuyên ngành và lấy mẫu kiểm định.\n- Phối hợp với các hãng tàu, đại lý cước để đổi lệnh giao hàng (D/O) và điều động xe kéo container giao hàng về kho an toàn.`,
      requirements: `- Tốt nghiệp Cao đẳng/Đại học chuyên ngành Xuất nhập khẩu, Hải quan, Kinh tế đối ngoại hoặc Hàng hải.\n- Có ít nhất 2-3 năm kinh nghiệm làm hiện trường hải quan hoặc khai báo hải quan tại cảng Hải Phòng.\n- Sử dụng thành thạo phần mềm khai báo hải quan ECUS5-VNACCS.\n- Am hiểu sâu sắc về phân loại mã HS, quy tắc xuất xứ hàng hóa (C/O các form) và chính sách quản lý chuyên ngành.\n- Nhanh nhẹn, có sức khỏe tốt, có xe máy di chuyển và kỹ năng giao tiếp khéo léo với cán bộ hải quan, cảng.`,
      benefits: `- Thu nhập: 14.000.000 - 20.000.000 VNĐ + Phụ cấp xăng xe, điện thoại, chi phí hiện trường đầy đủ.\n- Thưởng tháng 13 và thưởng hoàn thành chỉ số thông quan nhanh.\n- Tham gia BHXH, BHYT, khám sức khỏe định kỳ.\n- Môi trường làm việc năng động, gắn bó lâu dài.`,
      salaryMin: 14000000,
      salaryMax: 20000000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Sales Logistics", "Sales Xuất nhập khẩu/Logistics khác"],
      skills: ["Vận hành hệ thống quản lý vận tải", "Kỹ năng đàm phán và thương lượng", "Kế toán bán hàng", "Tiếng Anh giao tiếp", "Giao tiếp đa văn hóa"]
    },

    // 95. Kỹ sư Tự động hóa PLC/SCADA
    {
      title: "Kỹ sư Tự động hóa & Lập trình PLC/SCADA (Automation Engineer)",
      provinceId: TN,
      detailedLocation: "Khu công nghiệp Điềm Thụy, Huyện Phú Bình, Tỉnh Thái Nguyên",
      experienceYears: 3,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 2,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Lập trình điều khiển, tích hợp hệ thống tự động hóa và khắc phục sự cố các dây chuyền robot sản xuất linh kiện điện tử.\n\nNhiệm vụ:\n- Lập trình phần mềm điều khiển PLC (Siemens S7-1200/1500, Mitsubishi, Omron) cho các máy sản xuất tự động.\n- Thiết kế giao diện giám sát và điều khiển SCADA / HMI (WinCC, TIA Portal, GT Designer).\n- Lắp đặt, hiệu chuẩn các cảm biến công nghiệp, động cơ servo, biến tần và cánh tay robot công nghiệp.\n- Xử lý các sự cố dừng chuyền (Downtime), tối ưu hóa thời gian chu kỳ (Cycle time) của dây chuyền sản xuất.`,
      requirements: `- Tốt nghiệp Đại học chuyên ngành Tự động hóa, Điều khiển tự động, Cơ điện tử hoặc Điện tử công nghiệp.\n- Có từ 2-3 năm kinh nghiệm lập trình PLC và thiết kế hệ thống SCADA trong các nhà máy sản xuất.\n- Sử dụng thành thạo phần mềm TIA Portal, Step 7, GX Works.\n- Khả năng đọc hiểu bản vẽ điện công nghiệp (Eplan) và sơ đồ mạch điều khiển.\n- Tinh thần trách nhiệm cao, chịu khó tìm tòi và sẵn sàng đi ca sản xuất khi có yêu cầu.`,
      benefits: `- Thu nhập: 18.000.000 - 28.000.000 VNĐ.\n- Thưởng tháng lương thứ 13 + thưởng năng suất dây chuyền.\n- Xe đưa đón hàng ngày từ Hà Nội lên nhà máy tại Thái Nguyên.\n- Cơm ca miễn phí tại nhà ăn công ty.\n- Được đào tạo kỹ thuật định kỳ tại Nhật Bản hoặc Hàn Quốc.`,
      salaryMin: 18000000,
      salaryMax: 28000000,
      salaryNegotiable: false,
      deadlineDays: 45,
      industries: ["Kỹ sư lập trình PLC/SCADA", "Quản lý dự án hệ thống tự động hóa"],
      skills: ["Phát triển hệ thống nhúng", "Tích hợp hệ thống", "Tư duy hệ thống", "Viết Test Case", "Tiếng Anh giao tiếp"]
    },

    // 96. Kỹ sư Quản lý Chất lượng Sản xuất (QA/QC Manufacturing)
    {
      title: "Kỹ sư Quản lý Chất lượng Sản xuất (QA/QC Engineer - Tiêu chuẩn ISO 9001 / IATF 16949)",
      provinceId: BN,
      detailedLocation: "Khu công nghiệp Yên Phong, Xã Yên Trung, Huyện Yên Phong, Tỉnh Bắc Ninh",
      experienceYears: 3,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 3,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Kiểm soát chất lượng nguyên vật liệu đầu vào (IQC), công đoạn sản xuất (IPQC) và kiểm tra thành phẩm xuất xưởng (OQC).\n\nNhiệm vụ:\n- Xây dựng tiêu chuẩn kiểm tra chất lượng (Inspection Standard), kế hoạch kiểm soát chất lượng (Control Plan) cho sản phẩm mới.\n- Giám sát việc tuân thủ quy trình chất lượng trên dây chuyền, xử lý các sự cố phát sinh hàng phế phẩm (Defects).\n- Phân tích nguyên nhân gốc rễ lỗi chất lượng bằng các công cụ 7 QC Tools, 5 Why, 8D Report và đề xuất hành động khắc phục phòng ngừa (CAPA).\n- Chuẩn bị hồ sơ và tiếp đón các đoàn đánh giá chất lượng từ khách hàng quốc tế.`,
      requirements: `- Tốt nghiệp Đại học các ngành Kỹ thuật cơ khí, Điện - Điện tử, Quản lý công nghiệp hoặc Hóa học.\n- Có tối thiểu 2-3 năm kinh nghiệm làm QA/QC trong các nhà máy sản xuất linh kiện điện tử, cơ khí chính xác hoặc phụ tùng ô tô.\n- Am hiểu sâu sắc về hệ thống quản lý chất lượng ISO 9001, IATF 16949 và các công cụ Core Tools (APQP, FMEA, MSA, SPC, PPAP).\n- Kỹ năng sử dụng các thiết bị đo kiểm cơ khí chính xác (Thước kẹp, Panme, CMM, máy đo quang học 2D/3D).\n- Tinh thần kỷ luật cao, quyết liệt với các sai phạm chất lượng.`,
      benefits: `- Mức lương: 16.000.000 - 24.000.000 VNĐ.\n- Thưởng tháng 13, thưởng chất lượng và các ngày lễ tết.\n- Xe đưa đón từ Hà Nội về nhà máy Bắc Ninh.\n- Ăn trưa miễn phí tại công ty.\n- Cơ hội thăng tiến lên Trưởng phòng Quản lý Chất lượng (QA Manager).`,
      salaryMin: 16000000,
      salaryMax: 24000000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Process Quality Assurance (PQA)", "QA Engineer"],
      skills: ["Viết Test Case", "Đánh giá hệ thống kiểm soát nội bộ", "Tư duy hệ thống", "Tiếng Anh giao tiếp", "Giao tiếp đa văn hóa"]
    },

    // 97. Kỹ sư Bảo trì Cơ điện (M&E Maintenance Engineer)
    {
      title: "Kỹ sư Bảo trì Cơ điện Nhà máy (Maintenance & Utility Engineer - M&E)",
      provinceId: HP,
      detailedLocation: "Khu công nghiệp Đình Vũ, Phường Đông Hải 2, Quận Hải An, Thành phố Hải Phòng",
      experienceYears: 3,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 2,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Bảo dưỡng phòng ngừa và sửa chữa hệ thống cơ điện, máy nén khí, lò hơi, hệ thống cấp thoát nước và trạm biến áp của nhà máy.\n\nNhiệm vụ:\n- Lập và thực hiện kế hoạch bảo trì bảo dưỡng định kỳ (Preventive Maintenance) cho toàn bộ máy móc sản xuất.\n- Khắc phục nhanh chóng các sự cố hỏng hóc cơ khí, điện máy trong ca sản xuất, giảm thiểu thời gian dừng máy.\n- Vận hành an toàn hệ thống phụ trợ (Utility): hệ thống làm lạnh Chiller, trạm biến áp 22kV, máy phát điện dự phòng, máy nén khí trục vít.\n- Quản lý danh mục vật tư phụ tùng thay thế (Spare parts), lập dự trù đặt mua phụ tùng thay thế kịp thời.`,
      requirements: `- Tốt nghiệp Đại học chuyên ngành Cơ điện tử, Kỹ thuật điện, Kỹ thuật cơ khí hoặc Nhiệt lạnh.\n- Có ít nhất 2-3 năm kinh nghiệm bảo trì cơ điện trong các nhà máy sản xuất công nghiệp.\n- Có chứng chỉ an toàn điện và an toàn vận hành thiết bị áp lực.\n- Kỹ năng đọc bản vẽ mạch điện công nghiệp và sơ đồ cơ khí thuần thục.\n- Nhanh nhẹn, có sức khỏe tốt và sẵn sàng làm việc theo ca sản xuất.`,
      benefits: `- Thu nhập: 15.000.000 - 22.000.000 VNĐ + Phụ cấp ca đêm và phụ cấp độc hại.\n- Thưởng tháng 13 và thưởng chuyên cần hàng tháng.\n- Đầy đủ chế độ bảo hiểm xã hội, bảo hiểm tai nạn 24/24.\n- Cơm ca miễn phí tại nhà ăn công ty.`,
      salaryMin: 15000000,
      salaryMax: 22000000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Kỹ sư hệ thống điện nhẹ", "Tích hợp hệ thống"],
      skills: ["Thiết kế hệ thống Cơ điện", "Bảo trì hệ thống PCCC", "Thi công hệ thống điện nhẹ", "Tư duy hệ thống", "Tiếng Anh giao tiếp"]
    },

    // 98. Quản đốc Phân xưởng Sản xuất
    {
      title: "Quản đốc Phân xưởng Sản xuất (Production Superintendent - Ngành May mặc / Giày da / Điện tử)",
      provinceId: CT,
      detailedLocation: "Khu công nghiệp Trà Nóc 1, Phường Trà Nóc, Quận Bình Thủy, Cần Thơ",
      experienceYears: 5,
      jobLevel: "DepartmentHead",
      educationLevel: "Bachelor",
      vacancies: 1,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Tổ chức và điều hành toàn bộ hoạt động sản xuất của phân xưởng gồm 200 công nhân, đảm bảo tiến độ giao hàng và năng suất lao động.\n\nTrách nhiệm:\n- Triển khai kế hoạch sản xuất hàng ngày/tuần theo đơn đặt hàng, phân bổ công việc hợp lý cho các tổ sản xuất.\n- Giám sát định mức tiêu hao nguyên vật liệu, kiểm soát tỷ lệ lỗi và thúc đẩy áp dụng phương pháp sản xuất tinh gọn (Lean Manufacturing, Kaizen).\n- Quản lý, đào tạo và đánh giá hiệu quả làm việc của các Tổ trưởng và công nhân sản xuất.\n- Đảm bảo an toàn vệ sinh lao động và duy trì môi trường làm việc 5S trong toàn phân xưởng.`,
      requirements: `- Tốt nghiệp Cao đẳng/Đại học chuyên ngành Quản lý công nghiệp, Kỹ thuật may, Cơ khí hoặc Kinh tế.\n- Có tối thiểu 4-5 năm kinh nghiệm làm Quản đốc hoặc Phó Quản đốc phân xưởng sản xuất quy mô từ 150 công nhân trở lên.\n- Am hiểu về quy trình sản xuất công nghiệp, cân bằng chuyền (Line Balancing) và phương pháp Lean/Kaizen.\n- Kỹ năng quản lý nhân sự sản xuất, tạo động lực và giải quyết xung đột khéo léo.\n- Khả năng chịu áp lực tiến độ giao hàng cao.`,
      benefits: `- Lương: 25.000.000 - 38.000.000 VNĐ.\n- Thưởng sản lượng phân xưởng vượt định mức hàng tháng/quý.\n- Thưởng tháng 13 và thưởng cuối năm hấp dẫn.\n- Gói bảo hiểm sức khỏe Bảo Minh toàn diện.\n- Ăn trưa miễn phí tại công ty.`,
      salaryMin: 25000000,
      salaryMax: 38000000,
      salaryNegotiable: false,
      deadlineDays: 45,
      industries: ["Quản lý dự án hệ thống tự động hóa", "Process Quality Assurance (PQA)"],
      skills: ["Vận hành hệ thống quản lý kho", "Đánh giá hệ thống kiểm soát nội bộ", "Kỹ năng đàm phán và thương lượng", "Giao tiếp đa văn hóa", "Tư duy hệ thống"]
    },

    // 99. Điều phối viên Giao vận Đội xe
    {
      title: "Điều phối viên Giao vận & Đội xe Vận tải (Fleet Logistics Coordinator)",
      provinceId: HCM,
      detailedLocation: "Khu chế xuất Tân Thuận, Phường Tân Thuận Đông, Quận 7, TP. Hồ Chí Minh",
      experienceYears: 2,
      jobLevel: "Staff",
      educationLevel: "College",
      vacancies: 2,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Lên kế hoạch lộ trình, điều động đội xe tải và xe container giao hàng cho các siêu thị và đại lý phân phối toàn miền Nam.\n\nNhiệm vụ:\n- Tiếp nhận đơn hàng xuất kho hàng ngày, lên kế hoạch gom đơn, xếp tải và sắp xếp lộ trình giao hàng tối ưu (Route Optimization).\n- Điều động lái xe và phụ xe thực hiện giao hàng theo đúng khung giờ cam kết với khách hàng.\n- Giám sát hành trình xe tải qua hệ thống định vị GPS, kịp thời xử lý các sự cố trên đường (ùn tắc giao thông, hỏng xe).\n- Quản lý định mức tiêu hao nhiên liệu, chi phí cầu đường (BOT) và lịch bảo dưỡng định kỳ của đội xe.`,
      requirements: `- Tốt nghiệp Cao đẳng/Đại học chuyên ngành Quản trị vận tải, Logistics, Kinh tế hoặc liên quan.\n- Có ít nhất 1-2 năm kinh nghiệm làm điều phối xe tải hoặc điều phối giao hàng chặng cuối (Last-mile Delivery).\n- Nắm vững mạng lưới giao thông đường bộ và các tuyến đường cấm tải tại khu vực TP.HCM và các tỉnh lân cận.\n- Nhanh nhẹn, hoạt bát, kỹ năng xử lý tình huống giao tiếp với đội ngũ lái xe tốt.\n- Có thể làm việc theo ca linh hoạt (có ca đêm giao hàng sớm).`,
      benefits: `- Thu nhập: 12.000.000 - 18.000.000 VNĐ + Phụ cấp điện thoại, ca đêm.\n- Thưởng tháng lương thứ 13 và thưởng chuyên cần.\n- Đầy đủ chế độ bảo hiểm xã hội theo quy định.\n- Môi trường làm việc năng động, đồng nghiệp nhiệt tình.`,
      salaryMin: 12000000,
      salaryMax: 18000000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Quản lý hệ thống vận tải (TMS)", "Sales Logistics"],
      skills: ["Vận hành hệ thống TMS", "Vận hành hệ thống quản lý vận tải", "Kỹ năng đàm phán và thương lượng", "Kế toán bán hàng", "Tư duy hệ thống"]
    },

    // 100. Thực tập sinh Xuất Nhập khẩu & Logistics
    {
      title: "Thực tập sinh Chứng từ Xuất Nhập khẩu (Import/Export Documentation Intern)",
      provinceId: HCM,
      detailedLocation: "Tòa nhà Flemington, 182 Lê Đại Hành, Quận 11, TP. Hồ Chí Minh",
      experienceYears: 0,
      jobLevel: "Intern",
      educationLevel: "College",
      vacancies: 3,
      workMode: "Onsite",
      jobType: "Internship",
      description: `Học tập và thực hành quy trình lập chứng từ xuất nhập khẩu hàng hóa quốc tế và theo dõi đơn hàng vận chuyển.\n\nNhiệm vụ:\n- Hỗ trợ chuẩn bị bộ chứng từ hàng hóa xuất nhập khẩu: Hóa đơn thương mại (Commercial Invoice), Phiếu đóng gói (Packing List), Vận đơn (Bill of Lading).\n- Nhập liệu thông tin lô hàng lên hệ thống phần mềm quản lý logistics của công ty.\n- Đi đổi lệnh giao hàng (D/O) tại các hãng tàu và nộp hồ sơ xin cấp Chứng nhận xuất xứ (C/O) tại VCCI/Phòng Quản lý XNK.\n- Theo dõi lịch tàu chạy và cập nhật thông báo hàng đến (Arrival Notice) cho khách hàng.`,
      requirements: `- Sinh viên năm cuối chuyên ngành Kinh tế đối ngoại, Logistics, Thương mại quốc tế, Hàng hải.\n- Nắm vững kiến thức về Incoterms 2020 và các phương thức thanh toán quốc tế (L/C, T/T).\n- Tiếng Anh đọc hiểu văn bản thương mại khá.\n- Cẩn thận, nhanh nhẹn, ham học hỏi và có phương tiện đi lại.\n- Có thể thực tập tối thiểu 3-4 ngày/tuần trong vòng 3 tháng.`,
      benefits: `- Phụ cấp thực tập: 3.500.000 - 5.500.000 VNĐ/tháng + Phụ cấp xăng xe đi lại làm thủ tục.\n- Được trực tiếp cầm tay chỉ việc bởi các chuyên viên chứng từ giàu kinh nghiệm.\n- Hỗ trợ đóng dấu mộc xác nhận báo cáo thực tập tốt nghiệp đại học.\n- Ưu tiên xét tuyển thành nhân viên chính thức sau khi tốt nghiệp.`,
      salaryMin: 3500000,
      salaryMax: 5500000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Sales Logistics", "Sales Xuất nhập khẩu/Logistics khác"],
      skills: ["Vận hành hệ thống quản lý vận tải", "Kỹ năng đàm phán và thương lượng", "Tiếng Anh giao tiếp", "Giao tiếp đa văn hóa", "Tư duy hệ thống"]
    }
  ];
};
