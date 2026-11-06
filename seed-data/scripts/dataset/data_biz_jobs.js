// 15 Job Postings cho ngành Kinh doanh, Bán hàng & Dịch vụ Khách hàng
module.exports = function(provinces) {
  const { HN, HCM, DN, CT, HP, BN } = provinces;

  return [
    // 41. B2B Corporate Sales Manager
    {
      title: "Trưởng phòng Kinh doanh B2B (Doanh nghiệp & Giải pháp CNTT)",
      provinceId: HN,
      detailedLocation: "Tòa nhà Keangnam Landmark 72, Đường Phạm Hùng, Nam Từ Liêm, Hà Nội",
      experienceYears: 5,
      jobLevel: "DepartmentHead",
      educationLevel: "Bachelor",
      vacancies: 1,
      workMode: "Hybrid",
      jobType: "FullTime",
      description: `Lãnh đạo và quản lý đội ngũ kinh doanh B2B, phát triển thị trường giải pháp phần mềm quản trị doanh nghiệp và chuyển đổi số.\n\nTrách nhiệm:\n- Xây dựng chiến lược và kế hoạch kinh doanh hàng quý/năm cho mảng khách hàng doanh nghiệp vừa và lớn (Enterprise & SME).\n- Thiết lập, duy trì và phát triển mối quan hệ chiến lược với các Giám đốc CNTT (CIO), Giám đốc điều hành (CEO) của đối tác.\n- Dẫn dắt đội ngũ thực hiện các buổi thuyết trình giải pháp, tham gia đấu thầu và đàm phán các hợp đồng giá trị lớn.\n- Quản lý hạn mức doanh số (KPI), theo dõi đường ống bán hàng (Sales Pipeline) và tối ưu hóa quy trình chốt hợp đồng.`,
      requirements: `- Tốt nghiệp Đại học chuyên ngành Quản trị kinh doanh, Kinh tế, CNTT hoặc tương đương.\n- Tối thiểu 5 năm kinh nghiệm bán hàng B2B, trong đó có ít nhất 2 năm ở vị trí Trưởng phòng hoặc Trưởng nhóm kinh doanh.\n- Có mạng lưới quan hệ sâu rộng với các doanh nghiệp, tập đoàn đa ngành tại Việt Nam.\n- Kỹ năng đàm phán, thuyết trình dự án và thương lượng hợp đồng đỉnh cao.\n- Tinh thần máu lửa, quyết liệt với mục tiêu doanh số và có năng lực truyền lửa cho đội ngũ.`,
      benefits: `- Lương cơ bản: 30.000.000 - 45.000.000 VNĐ + Hoa hồng doanh số không giới hạn (Thu nhập thực tế 50M - 100M+ VNĐ).\n- Thưởng nóng khi ký kết các hợp đồng chiến lược giá trị lớn.\n- Cấp xe ô tô công tác hoặc phụ cấp chi phí đi lại, tiếp khách cao cấp.\n- Gói bảo hiểm chăm sóc sức khỏe V.I.P Bảo Minh cho cả gia đình.\n- Du lịch nghỉ dưỡng 5 sao thường niên cùng ban lãnh đạo tập đoàn.`,
      salaryMin: 30000000,
      salaryMax: 45000000,
      salaryNegotiable: false,
      deadlineDays: 45,
      industries: ["Kinh doanh phần mềm", "Sales IT Phần mềm khác"],
      skills: ["Kỹ năng đàm phán và thương lượng", "Thuyết trình bán hàng", "Bán hàng kỹ thuật", "Vận hành hệ thống Salesforce CRM", "Tiếng Anh giao tiếp"]
    },

    // 42. Bất động sản Team Leader
    {
      title: "Trưởng nhóm Kinh doanh Bất động sản (Cao cấp & Nghỉ dưỡng)",
      provinceId: HCM,
      detailedLocation: "Tòa nhà Landmark 81, Vinhomes Central Park, Bình Thạnh, TP. Hồ Chí Minh",
      experienceYears: 3,
      jobLevel: "TeamLead",
      educationLevel: "College",
      vacancies: 2,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Quản lý đội ngũ tư vấn bất động sản, phân phối các dự án căn hộ cao cấp và biệt thự nghỉ dưỡng ven biển.\n\nNhiệm vụ:\n- Quản lý, đào tạo và định hướng phát triển cho nhóm từ 8 - 12 chuyên viên tư vấn bất động sản.\n- Lập kế hoạch tìm kiếm khách hàng tiềm năng, tổ chức các buổi mở bán dự án và hội thảo đầu tư.\n- Hỗ trợ nhân viên trong nhóm tiếp khách VIP, giải đáp pháp lý và hỗ trợ chốt giao dịch lớn.\n- Báo cáo kết quả kinh doanh và chỉ số chuyển đổi định kỳ cho Giám đốc Khối.`,
      requirements: `- Có từ 3 năm kinh nghiệm trong ngành bất động sản, trong đó ít nhất 1 năm làm Trưởng nhóm.\n- Am hiểu sâu sắc về thị trường bất động sản phân khúc trung và cao cấp, luật đất đai và tài chính mua nhà.\n- Ngoại hình sáng, kỹ năng giao tiếp lịch thiệp, phong thái tự tin và chuyên nghiệp.\n- Khả năng xử lý từ chối và kỹ năng chốt sale nhạy bén.\n- Có kỹ năng đào tạo và truyền động lực cho nhân viên mới.`,
      benefits: `- Lương cứng: 18.000.000 - 25.000.000 VNĐ + Hoa hồng phân phối dự án (Hoa hồng 30 - 70 triệu/giao dịch).\n- Hỗ trợ data khách hàng nét chất lượng cao từ phòng Marketing.\n- Thưởng nóng vàng 9999 hoặc chuyến du lịch Châu Âu cho trưởng nhóm xuất sắc nhất quý.\n- Tham gia đầy đủ các khóa đào tạo chuyên sâu về tài chính bất động sản.\n- Cơ hội thăng tiến lên Giám đốc Sàn phân phối trong vòng 1-2 năm.`,
      salaryMin: 18000000,
      salaryMax: 25000000,
      salaryNegotiable: false,
      deadlineDays: 45,
      industries: ["Sales bất động sản/Môi giới bất động sản", "Sales Bất động sản khác"],
      skills: ["Kỹ năng đàm phán và thương lượng", "Thuyết trình bán hàng", "Phân tích đầu tư bất động sản", "Vận hành hệ thống HubSpot CRM", "Giao tiếp đa văn hóa"]
    },

    // 43. Key Account Manager (KAM FMCG)
    {
      title: "Key Account Manager (Kênh MT / Đại siêu thị FMCG)",
      provinceId: HCM,
      detailedLocation: "Tòa nhà Saigon Riverside Office Center, 2A-4A Tôn Đức Thắng, Quận 1, TP. Hồ Chí Minh",
      experienceYears: 4,
      jobLevel: "Supervisor",
      educationLevel: "Bachelor",
      vacancies: 1,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Chịu trách nhiệm quản lý và mở rộng doanh số bán hàng kênh siêu thị lớn (Co.opmart, WinCommerce, BigC/GO!, Lotte Mart) trên phạm vi toàn quốc.\n\nTrách nhiệm:\n- Đàm phán hợp đồng thương mại năm (Joint Business Plan - JBP), chính sách giá, chiết khấu và phí mở mã với các hệ thống siêu thị.\n- Lên kế hoạch chương trình khuyến mại, trưng bày hàng hóa và hoạt động kích hoạt tại điểm bán.\n- Quản lý công nợ, vòng quay hàng tồn kho và dự báo nhu cầu tiêu thụ (Demand Forecasting).\n- Phối hợp với đội ngũ Trade Marketing và Field Sales để đảm bảo tỷ lệ phủ hàng và hình ảnh quầy kệ đạt chuẩn.`,
      requirements: `- Tốt nghiệp Đại học chuyên ngành Kinh tế, Quản trị kinh doanh, Ngoại thương hoặc tương đương.\n- Có từ 4 năm kinh nghiệm làm việc trong ngành hàng tiêu dùng nhanh (FMCG), trong đó tối thiểu 2 năm làm KAM kênh MT.\n- Kỹ năng đàm phán hợp đồng thương mại và tư duy tài chính kinh doanh (P&L bán hàng) vững chắc.\n- Khả năng phân tích dữ liệu bán hàng (Nielsen, Kantar, POS data) thành thạo.\n- Chịu được áp lực doanh số cao và sẵn sàng đi công tác các tỉnh.`,
      benefits: `- Thu nhập: 25.000.000 - 38.000.000 VNĐ + Thưởng KPI năm hấp dẫn (2 - 4 tháng lương).\n- Phụ cấp xe đi lại, điện thoại và tiếp khách theo chính sách công ty.\n- Bảo hiểm sức khỏe quốc tế PVI Care cho bản thân và gia đình.\n- Được đào tạo kỹ năng lãnh đạo từ các chuyên gia tập đoàn đa quốc gia.\n- Môi trường làm việc năng động, chuyên nghiệp và nhiều cơ hội thăng tiến.`,
      salaryMin: 25000000,
      salaryMax: 38000000,
      salaryNegotiable: false,
      deadlineDays: 45,
      industries: ["Kinh doanh kênh MT", "Bán hàng siêu thị/cửa hàng tiện ích/tiện lợi"],
      skills: ["Bán hàng kênh MT", "Kỹ năng đàm phán và thương lượng", "Thuyết trình bằng dữ liệu", "Phân tích tài chính", "Tiếng Anh giao tiếp"]
    },

    // 44. Sales Logistics / Forwarding
    {
      title: "Chuyên viên Kinh doanh Cước Vận tải Quốc tế (Sales Logistics / Freight Forwarding)",
      provinceId: HP,
      detailedLocation: "Tòa nhà TD Plaza, Lô 20A Lê Hồng Phong, Đông Khê, Ngô Quyền, Hải Phòng",
      experienceYears: 2,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 3,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Tìm kiếm khách hàng xuất nhập khẩu và bán dịch vụ cước vận tải biển (FCL/LCL), cước hàng không (Air Freight) và dịch vụ logistics trọn gói.\n\nNhiệm vụ:\n- Khai thác khách hàng là các công ty sản xuất, thương mại có nhu cầu xuất nhập khẩu hàng hóa.\n- Báo giá cước vận chuyển, tư vấn lịch tàu bay, thủ tục hải quan và các giải pháp logistics tối ưu chi phí cho khách.\n- Đàm phán, ký kết hợp đồng vận chuyển và theo dõi quá trình giao nhận hàng an toàn.\n- Phối hợp với bộ phận chứng từ (Docs) và hiện trường (Ops) để xử lý các phát sinh trong quá trình vận chuyển.`,
      requirements: `- Tốt nghiệp Cao đẳng/Đại học chuyên ngành Kinh tế đối ngoại, Logistics, Xuất nhập khẩu hoặc Thương mại quốc tế.\n- Tối thiểu 1-2 năm kinh nghiệm làm Sales Logistics / Freight Forwarder.\n- Nắm vững kiến thức về Incoterms 2020, quy trình giao nhận hàng hóa và chứng từ vận tải biển/hàng không.\n- Nhanh nhẹn, kỹ năng giao tiếp tốt, kiên trì và chịu khó gọi điện, gặp gỡ khách hàng.\n- Tiếng Anh giao tiếp và đọc hiểu chứng từ tốt.`,
      benefits: `- Lương cứng: 10.000.000 - 16.000.000 VNĐ + % Hoa hồng lợi nhuận ròng cực kỳ hấp dẫn (Thu nhập trung bình 20 - 45 triệu/tháng).\n- Thưởng tháng lương thứ 13, thưởng lễ tết và thưởng top sales.\n- Môi trường làm việc năng động, đồng nghiệp trẻ trung hỗ trợ nhiệt tình.\n- Được đào tạo bài bản về kiến thức logistics chuyên sâu và kỹ năng bán hàng.`,
      salaryMin: 10000000,
      salaryMax: 16000000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Sales Logistics", "Sales Xuất nhập khẩu/Logistics khác"],
      skills: ["Kỹ năng đàm phán và thương lượng", "Thuyết trình bán hàng", "Tiếng Anh giao tiếp", "Vận hành hệ thống quản lý vận tải", "Giao tiếp đa văn hóa"]
    },

    // 45. B2B SaaS Account Executive
    {
      title: "Chuyên viên Kinh doanh Phần mềm Doanh nghiệp (SaaS Account Executive)",
      provinceId: HCM,
      detailedLocation: "Tầng 9, Tòa nhà Deutsches Haus, 33 Lê Duẩn, Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      experienceYears: 2,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 3,
      workMode: "Hybrid",
      jobType: "FullTime",
      description: `Tư vấn và cung cấp giải pháp phần mềm quản trị nhân sự thông minh SmartHire và giải pháp chấm công số hóa cho khối doanh nghiệp.\n\nNhiệm vụ:\n- Tiếp nhận nguồn khách hàng tiềm năng (Inbound Leads) từ bộ phận Marketing và chủ động tìm kiếm thêm khách hàng mới (Outbound).\n- Trực tiếp demo sản phẩm phần mềm trực quan, phân tích bài toán tối ưu chi phí tuyển dụng cho khách hàng.\n- Đàm phán gói giải pháp thuê bao (Subscription), hợp đồng dịch vụ và theo dõi tiến độ triển khai.\n- Duy trì mối quan hệ và chăm sóc khách hàng nhằm gia hạn hợp đồng và bán thêm các tính năng nâng cao (Up-sell).`,
      requirements: `- Có từ 1-2 năm kinh nghiệm bán hàng phần mềm SaaS, giải pháp công nghệ hoặc dịch vụ B2B.\n- Giọng nói chuẩn, tự tin thuyết trình và có khả năng giải thích các khái niệm công nghệ dễ hiểu.\n- Nắm vững quy trình bán hàng tư vấn (Consultative Selling) và kỹ năng chốt giao dịch nhanh gọn.\n- Thành thạo sử dụng các phần mềm CRM (HubSpot, Salesforce, Zoho).\n- Thái độ tích cực, tinh thần học hỏi nhanh và khát khao thu nhập cao.`,
      benefits: `- Lương cơ bản: 14.000.000 - 20.000.000 VNĐ + Hoa hồng hợp đồng doanh số tháng (Tổng thu nhập 25.000.000 - 40.000.000 VNĐ).\n- Thưởng định kỳ, thưởng đạt mốc doanh số quý/năm.\n- Máy tính xách tay Dell Latitude làm việc và điện thoại công vụ.\n- Chế độ bảo hiểm sức khỏe đầy đủ, khám bệnh định kỳ tại Vinmec.\n- Môi trường làm việc quốc tế, văn hóa tôn trọng sự khác biệt.`,
      salaryMin: 14000000,
      salaryMax: 20000000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Kinh doanh phần mềm", "Sales IT Phần mềm khác"],
      skills: ["Thuyết trình bán hàng", "Kỹ năng đàm phán và thương lượng", "Vận hành hệ thống HubSpot CRM", "Bán hàng kỹ thuật", "Tiếng Anh giao tiếp"]
    },

    // 46. Technical Sales Engineer
    {
      title: "Kỹ sư Bán hàng Kỹ thuật (Technical Sales Engineer - Thiết bị Tự động hóa)",
      provinceId: BN,
      detailedLocation: "Khu công nghiệp Tiên Sơn, Phường Đồng Nguyên, Thị xã Từ Sơn, Tỉnh Bắc Ninh",
      experienceYears: 2,
      jobLevel: "Staff",
      educationLevel: "College",
      vacancies: 2,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Tư vấn kỹ thuật và kinh doanh các thiết bị tự động hóa công nghiệp (biến tần, PLC, cảm biến, robot công nghiệp) cho các nhà máy tại các KCN miền Bắc.\n\nNhiệm vụ:\n- Khảo sát thực tế dây chuyền sản xuất của khách hàng, lắng nghe yêu cầu kỹ thuật và đề xuất giải pháp phù hợp.\n- Lựa chọn mã thiết bị (Part number), tính toán công suất và làm báo giá kỹ thuật gửi khách hàng.\n- Hỗ trợ khách hàng cài đặt thử nghiệm thiết bị (Demo), giải quyết các vướng mắc kỹ thuật trong quá trình vận hành.\n- Đàm phán thương mại, theo dõi đơn hàng và hỗ trợ thu hồi công nợ.`,
      requirements: `- Tốt nghiệp Cao đẳng/Đại học chuyên ngành Tự động hóa, Điện - Điện tử, Cơ điện tử hoặc liên quan.\n- Có từ 1-2 năm kinh nghiệm làm Sales kỹ thuật hoặc Kỹ sư hiện trường có đam mê kinh doanh.\n- Am hiểu về thiết bị công nghiệp (Siemens, Schneider, Mitsubishi, Omron...).\n- Năng động, có phương tiện đi lại (xe máy/ô tô), sẵn sàng di chuyển gặp khách hàng tại các nhà máy.\n- Kỹ năng giao tiếp và tạo dựng lòng tin với đội ngũ kỹ sư bảo trì của khách hàng.`,
      benefits: `- Thu nhập: 15.000.000 - 22.000.000 VNĐ + Thưởng hoa hồng dự án (Thu nhập thực tế 25M - 40M VNĐ).\n- Phụ cấp xăng xe, điện thoại, chi phí tiếp khách đầy đủ.\n- Được đào tạo kỹ thuật định kỳ tại các hãng sản xuất thiết bị lớn của Nhật/Đức.\n- Tham gia đầy đủ các chế độ BHXH, du lịch hàng năm.`,
      salaryMin: 15000000,
      salaryMax: 22000000,
      salaryNegotiable: false,
      deadlineDays: 45,
      industries: ["Kinh doanh thiết bị/vật liệu xây dựng", "Tích hợp hệ thống"],
      skills: ["Bán hàng kỹ thuật", "Kỹ năng đàm phán và thương lượng", "Thuyết trình bán hàng", "Tư duy hệ thống", "Tiếng Anh giao tiếp"]
    },

    // 47. Customer Success Manager
    {
      title: "Customer Success Specialist (Chăm sóc Khách hàng Doanh nghiệp VIP)",
      provinceId: HN,
      detailedLocation: "Tầng 10, Tòa nhà FPT Tower, Số 10 Phạm Văn Bạch, Cầu Giấy, Hà Nội",
      experienceYears: 2,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 2,
      workMode: "Hybrid",
      jobType: "FullTime",
      description: `Đồng hành cùng khách hàng doanh nghiệp trong suốt vòng đời sử dụng dịch vụ công nghệ, tối ưu hóa sự hài lòng và tỷ lệ gia hạn hợp đồng.\n\nTrách nhiệm:\n- Hướng dẫn đào tạo (Onboarding) khách hàng mới sử dụng thành thạo nền tảng phần mềm.\n- Định kỳ tổ chức các buổi đánh giá hiệu quả sử dụng (QBR - Quarterly Business Review) và giải quyết các phản hồi của khách.\n- Nhận diện các nguy cơ khách hàng rời bỏ (Churn Risk) và chủ động đưa ra phương án khắc phục kịp thời.\n- Phối hợp với đội ngũ Sales để khai thác các cơ hội bán thêm dịch vụ (Cross-sell/Up-sell).`,
      requirements: `- Tốt nghiệp Đại học các ngành Kinh tế, Ngoại thương, Marketing, Ngoại ngữ hoặc liên quan.\n- Tối thiểu 2 năm kinh nghiệm làm việc ở vị trí Customer Success, Account Management hoặc Chăm sóc khách hàng B2B.\n- Kỹ năng lắng nghe, thấu hiểu tâm lý khách hàng và giải quyết khiếu nại khéo léo.\n- Tư duy phục vụ khách hàng tận tâm, cởi mở và chủ động.\n- Tiếng Anh giao tiếp tự tin trong môi trường đa quốc gia.`,
      benefits: `- Mức lương: 16.000.000 - 24.000.000 VNĐ + Thưởng chỉ số hài lòng khách hàng (CSAT/NPS) và tỷ lệ tái tục hợp đồng.\n- Bảo hiểm sức khỏe quốc tế PVI Care toàn diện.\n- Thưởng tháng lương thứ 13, thưởng lễ tết và xét tăng lương hàng năm.\n- Môi trường làm việc văn minh, đồng nghiệp tài năng và đoàn kết.`,
      salaryMin: 16000000,
      salaryMax: 24000000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Customer Success", "Kinh doanh phần mềm"],
      skills: ["Kỹ năng đàm phán và thương lượng", "Vận hành hệ thống Salesforce CRM", "Thuyết trình bán hàng", "Tiếng Anh giao tiếp", "Giao tiếp đa văn hóa"]
    },

    // 48. Chuyên viên Quan hệ Khách hàng Doanh nghiệp Ngân hàng
    {
      title: "Chuyên viên Quan hệ Khách hàng Doanh nghiệp (Corporate Relationship Manager - SME)",
      provinceId: HCM,
      detailedLocation: "Tòa nhà Vietcombank Tower, Số 5 Công Trường Mê Linh, Quận 1, TP. Hồ Chí Minh",
      experienceYears: 3,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 3,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Phát triển và quản lý danh mục khách hàng doanh nghiệp vừa và nhỏ (SME), cung cấp các giải pháp tín dụng và tài trợ thương mại.\n\nNhiệm vụ:\n- Tìm kiếm và tiếp cận các khách hàng doanh nghiệp có nhu cầu vay vốn kinh doanh, bảo lãnh hoặc mở L/C.\n- Thu thập hồ sơ tài chính, thẩm định năng lực trả nợ và thực hiện lập tờ trình tín dụng gửi cấp phê duyệt.\n- Theo dõi tình hình hoạt động kinh doanh của khách hàng, đôn đốc thu hồi nợ gốc và lãi đúng hạn.\n- Bán chéo các sản phẩm dịch vụ ngân hàng: tiền gửi có kỳ hạn, dịch vụ trả lương qua tài khoản (Payroll), ngoại hối (FX).`,
      requirements: `- Tốt nghiệp Đại học chuyên ngành Tài chính - Ngân hàng, Kinh tế, Kế toán - Kiểm toán.\n- Có từ 2-3 năm kinh nghiệm làm Quan hệ khách hàng doanh nghiệp (Corporate RM) tại các ngân hàng thương mại.\n- Am hiểu sâu sắc về phân tích báo cáo tài chính doanh nghiệp và quy định cấp tín dụng của Ngân hàng Nhà nước.\n- Kỹ năng giao tiếp, thiết lập mối quan hệ với các chủ doanh nghiệp và kế toán trưởng.\n- Tác phong lịch thiệp, trung thực, chịu được chỉ tiêu doanh số cao.`,
      benefits: `- Lương cơ bản: 18.000.000 - 28.000.000 VNĐ + Thưởng kinh doanh theo hiệu quả tín dụng (Tổng thu nhập 30M - 60M VNĐ/tháng).\n- Thưởng các ngày lễ tết, tháng lương 13, 14, 15 theo kết quả kinh doanh của ngân hàng.\n- Gói bảo hiểm sức khỏe toàn diện cao cấp cho bản thân và người thân.\n- Lộ trình thăng tiến rõ ràng lên Trưởng nhóm/Trưởng phòng Khách hàng Doanh nghiệp.`,
      salaryMin: 18000000,
      salaryMax: 28000000,
      salaryNegotiable: false,
      deadlineDays: 45,
      industries: ["Quan hệ khách hàng cá nhân/doanh nghiệp", "Tư vấn tài chính"],
      skills: ["Phân tích tài chính", "Kỹ năng đàm phán và thương lượng", "Lập báo cáo tài chính theo VAS", "Thuyết trình bằng dữ liệu", "Tiếng Anh giao tiếp"]
    },

    // 49. Sales Dược phẩm Kênh ETC/OTC
    {
      title: "Trình Dược Viên Kênh Bệnh Viện (Sales Dược phẩm ETC)",
      provinceId: HN,
      detailedLocation: "Tòa nhà Charmvit Tower, 117 Trần Duy Hưng, Trung Hòa, Cầu Giấy, Hà Nội",
      experienceYears: 2,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 2,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Phụ trách giới thiệu sản phẩm dược phẩm kê đơn (thuốc tim mạch, kháng sinh) tại các bệnh viện lớn tuyến trung ương tại Hà Nội.\n\nNhiệm vụ:\n- Tiếp cận, giới thiệu thông tin khoa học về sản phẩm đến các Bác sĩ, Dược sĩ khoa Dược bệnh viện.\n- Phối hợp tổ chức các buổi hội thảo khoa học, sinh hoạt chuyên môn tại bệnh viện.\n- Theo dõi tiến độ thầu thuốc, đôn đốc việc cung ứng thuốc đầy đủ và không bị gián đoạn.\n- Xây dựng và duy trì mối quan hệ hợp tác lâu dài với nhân viên y tế tại địa bàn phụ trách.`,
      requirements: `- Tốt nghiệp Đại học hoặc Cao đẳng chuyên ngành Dược hoặc Y đa khoa.\n- Có từ 1-2 năm kinh nghiệm làm Trình dược viên kênh ETC (bệnh viện).\n- Nắm vững kiến thức dược lý và quy chế đấu thầu thuốc bệnh viện hiện hành.\n- Tác phong tự tin, khả năng thuyết trình lưu loát và kỹ năng xây dựng mối quan hệ tốt.\n- Chịu khó, kiên trì và có tinh thần trách nhiệm cao.`,
      benefits: `- Thu nhập: 16.000.000 - 25.000.000 VNĐ + Thưởng doanh số quý/năm vượt chỉ tiêu.\n- Phụ cấp xăng xe, điện thoại, công tác phí theo quy chế công ty đa quốc gia.\n- Đầy đủ chế độ bảo hiểm y tế cao cấp, khám sức khỏe định kỳ.\n- Cơ hội thăng tiến lên Product Specialist hoặc Area Sales Manager.`,
      salaryMin: 16000000,
      salaryMax: 25000000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Bán hàng mỹ phẩm", "Kinh doanh hoá chất"],
      skills: ["Thuyết trình bán hàng", "Kỹ năng đàm phán và thương lượng", "Tiếng Anh giao tiếp", "Tư duy hệ thống", "Giao tiếp đa văn hóa"]
    },

    // 50. Nhân viên Bán hàng Nội thất Dự án
    {
      title: "Chuyên viên Kinh doanh Nội thất Dự án (Project Sales Executive)",
      provinceId: HCM,
      detailedLocation: "Tòa nhà Sunwah Tower, 115 Nguyễn Huệ, Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      experienceYears: 2,
      jobLevel: "Staff",
      educationLevel: "College",
      vacancies: 2,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Khai thác và phân phối các gói nội thất văn phòng, khách sạn, căn hộ cao cấp cho các chủ đầu tư và nhà thầu xây dựng.\n\nNhiệm vụ:\n- Tìm kiếm thông tin các dự án xây dựng mới, tiếp cận chủ đầu tư, tổng thầu và đơn vị thiết kế kiến trúc.\n- Giới thiệu danh mục vật liệu nội thất, thiết bị vệ sinh và đồ gỗ cao cấp của công ty.\n- Phối hợp với bộ phận thiết kế lên dự toán báo giá (BOQ) và hồ sơ chào thầu.\n- Đàm phán ký kết hợp đồng, giám sát việc giao nhận lắp đặt và nghiệm thu công trình.`,
      requirements: `- Có từ 2 năm kinh nghiệm bán hàng dự án trong ngành nội thất, vật liệu xây dựng hoặc bất động sản.\n- Khả năng đọc hiểu bản vẽ kiến trúc cơ bản và bóc tách khối lượng.\n- Kỹ năng đàm phán, thuyết phục và xử lý tình huống linh hoạt.\n- Ngoại hình chỉn chu, giao tiếp tự tin, phong thái chuyên nghiệp.`,
      benefits: `- Lương cơ bản: 12.000.000 - 18.000.000 VNĐ + Hoa hồng theo giá trị hợp đồng dự án (Thu nhập trung bình 25M - 50M VNĐ).\n- Thưởng cuối năm theo kết quả kinh doanh của toàn bộ dự án.\n- Chế độ bảo hiểm và phúc lợi xã hội đầy đủ theo luật lao động.\n- Môi trường làm việc năng động, nhiều cơ hội mở rộng quan hệ với giới kiến trúc sư.`,
      salaryMin: 12000000,
      salaryMax: 18000000,
      salaryNegotiable: false,
      deadlineDays: 45,
      industries: ["Kinh doanh nội thất", "Tư vấn thiết kế xây dựng"],
      skills: ["Bán hàng kỹ thuật", "Kỹ năng đàm phán và thương lượng", "Thuyết trình bán hàng", "Sử dụng Figma", "Tư duy hệ thống"]
    },

    // 51. Telesales Team Leader
    {
      title: "Trưởng nhóm Bán hàng qua Điện thoại (Telesales Team Leader - Tài chính/Giáo dục)",
      provinceId: HN,
      detailedLocation: "Tòa nhà Gelex Tower, 52 Lê Đại Hành, Hai Bà Trưng, Hà Nội",
      experienceYears: 3,
      jobLevel: "TeamLead",
      educationLevel: "College",
      vacancies: 1,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Quản lý, điều phối hoạt động và chịu trách nhiệm về chỉ tiêu doanh số của đội ngũ 15 chuyên viên Telesales.\n\nNhiệm vụ:\n- Phân bổ data khách hàng hàng ngày cho nhân viên trong nhóm, kiểm soát tỷ lệ gọi và thời lượng cuộc gọi.\n- Trực tiếp nghe lại cuộc ghi âm (Call Listening), đánh giá chất lượng cuộc gọi và hướng dẫn nhân viên cải thiện kỹ năng.\n- Xây dựng kịch bản gọi điện (Script), xử lý phản hồi và kỹ thuật chốt đơn hàng hiệu quả.\n- Tạo động lực, duy trì tinh thần làm việc tích cực cho toàn đội ngũ mỗi ngày.`,
      requirements: `- Có từ 2-3 năm kinh nghiệm trong lĩnh vực Telesales/Call Center, trong đó ít nhất 1 năm làm Team Leader.\n- Kỹ năng giao tiếp và xử lý tình huống qua điện thoại xuất sắc, giọng nói chuẩn không ngọng.\n- Kỹ năng quản lý thời gian, thúc đẩy tiến độ và giải quyết xung đột nội bộ tốt.\n- Có khả năng tổng hợp số liệu báo cáo và làm việc tốt với Excel.`,
      benefits: `- Thu nhập: Lương cứng 15.000.000 - 22.000.000 VNĐ + Hoa hồng doanh số nhóm (Thu nhập 25.000.000 - 40.000.000 VNĐ).\n- Thưởng nóng hàng tuần cho nhóm đạt thành tích xuất sắc nhất.\n- Chế độ bảo hiểm đầy đủ, khám sức khỏe định kỳ.\n- Môi trường làm việc trẻ trung, nhiều cơ hội thăng tiến lên Trưởng phòng Call Center.`,
      salaryMin: 15000000,
      salaryMax: 22000000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Giám sát chất lượng cuộc gọi (QA call center)", "Tư vấn tuyển sinh/khoá học"],
      skills: ["Thuyết trình bán hàng", "Kỹ năng đàm phán và thương lượng", "Vận hành hệ thống HubSpot CRM", "Giao tiếp đa văn hóa", "Tư duy hệ thống"]
    },

    // 52. Sales Admin / Operations
    {
      title: "Chuyên viên Quản trị Bán hàng (Sales Admin / Sales Support)",
      provinceId: HCM,
      detailedLocation: "Tòa nhà Cantavil Premier, Số 1 Song Hành, An Phú, Quận 2, TP. Hồ Chí Minh",
      experienceYears: 1,
      jobLevel: "Staff",
      educationLevel: "College",
      vacancies: 2,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Hỗ trợ đội ngũ kinh doanh trong công tác quản lý hợp đồng, xuất hóa đơn và theo dõi tiến độ đơn hàng.\n\nNhiệm vụ:\n- Tiếp nhận đơn đặt hàng từ Sales, kiểm tra tồn kho và nhập liệu đơn hàng lên hệ thống ERP.\n- Soạn thảo hợp đồng mua bán, phụ lục hợp đồng, biên bản bàn giao và thanh lý hợp đồng.\n- Theo dõi tiến độ giao hàng, phối hợp với kế toán xuất hóa đơn và đôn đốc công nợ khách hàng.\n- Tổng hợp số liệu báo cáo doanh số bán hàng hàng tuần/hàng tháng cho Ban Giám đốc.`,
      requirements: `- Tốt nghiệp Cao đẳng/Đại học ngành Quản trị kinh doanh, Kế toán, Thương mại hoặc liên quan.\n- Có tối thiểu 1 năm kinh nghiệm làm Sales Admin, Sales Support hoặc Thư ký phòng kinh doanh.\n- Sử dụng thành thạo tin học văn phòng (Word, Excel, hàm xử lý dữ liệu Vlookup, Pivot Table).\n- Cẩn thận, chi tiết, nhanh nhẹn và có tinh thần trách nhiệm cao.\n- Kỹ năng giao tiếp và phối hợp nhịp nhàng giữa các bộ phận.`,
      benefits: `- Thu nhập: 10.000.000 - 15.000.000 VNĐ.\n- Thưởng tháng lương thứ 13 và thưởng hiệu quả kinh doanh của công ty.\n- Chế độ bảo hiểm xã hội đầy đủ theo quy định.\n- Phụ cấp ăn trưa, trà chiều và môi trường làm việc thân thiện.`,
      salaryMin: 10000000,
      salaryMax: 15000000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Sales Admin/Sales Support/Sales Associate", "Kinh doanh bao bì"],
      skills: ["Kế toán bán hàng", "Vận hành hệ thống Zoho CRM", "Kỹ năng đàm phán và thương lượng", "Tiếng Anh giao tiếp", "Tư duy hệ thống"]
    },

    // 53. Sales Logistics Hàng Không (Air Freight)
    {
      title: "Sales Logistics Hàng Không (Air Freight Specialist)",
      provinceId: HN,
      detailedLocation: "Tòa nhà Cảng Hàng không Quốc tế Nội Bài, Sóc Sơn, Hà Nội",
      experienceYears: 2,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 2,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Tư vấn và bán dịch vụ cước vận tải hàng không quốc tế cho các mặt hàng giá trị cao, hàng mẫu và linh kiện điện tử.\n\nNhiệm vụ:\n- Khai thác khách hàng doanh nghiệp có nhu cầu vận chuyển hàng hóa xuất nhập khẩu bằng đường hàng không.\n- Làm việc với các hãng bay (Airlines) và tổng đại lý (GSA) để lấy giá cước cạnh tranh và giữ chỗ (Booking space).\n- Tư vấn quy cách đóng gói, quy định vận chuyển hàng nguy hiểm (DG) và thủ tục hải quan sân bay.\n- Chăm sóc và duy trì quan hệ thân thiết với khách hàng để tạo doanh thu cước định kỳ.`,
      requirements: `- Tốt nghiệp Đại học chuyên ngành Logistics, Kinh tế đối ngoại, Hàng hải hoặc Thương mại.\n- Tối thiểu 2 năm kinh nghiệm làm Sales cước hàng không (Air Freight) trong các công ty Forwarder.\n- Nắm vững quy định của IATA về vận chuyển hàng không và thủ tục soi chiếu hàng hóa.\n- Nhanh nhẹn, có khả năng xử lý tình huống gấp gáp về giờ bay và chuyến bay.\n- Tiếng Anh giao tiếp và đàm phán thương mại tốt.`,
      benefits: `- Thu nhập: 15.000.000 - 25.000.000 VNĐ + Thưởng hoa hồng cước bay (Thu nhập 25M - 45M VNĐ).\n- Phụ cấp đi lại tuyến Hà Nội - Nội Bài.\n- Thưởng tháng lương thứ 13 và du lịch hàng năm.\n- Môi trường làm việc quốc tế năng động.`,
      salaryMin: 15000000,
      salaryMax: 25000000,
      salaryNegotiable: false,
      deadlineDays: 45,
      industries: ["Sales Logistics", "Sales Xuất nhập khẩu/Logistics khác"],
      skills: ["Kỹ năng đàm phán và thương lượng", "Thuyết trình bán hàng", "Tiếng Anh giao tiếp", "Vận hành hệ thống quản lý vận tải", "Giao tiếp đa văn hóa"]
    },

    // 54. Tư vấn Đầu tư Chứng khoán
    {
      title: "Chuyên viên Tư vấn Đầu tư Chứng khoán (Broker / Wealth Management)",
      provinceId: HCM,
      detailedLocation: "Tòa nhà Mê Linh Point Tower, Số 2 Ngô Đức Kế, Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      experienceYears: 2,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 3,
      workMode: "Hybrid",
      jobType: "FullTime",
      description: `Phát triển tệp khách hàng cá nhân mở tài khoản giao dịch chứng khoán và tư vấn chiến lược phân bổ danh mục đầu tư.\n\nNhiệm vụ:\n- Tìm kiếm và tiếp cận các nhà đầu tư cá nhân có nguồn vốn nhàn rỗi, mở tài khoản giao dịch chứng khoán.\n- Phân tích thị trường, cập nhật thông tin vĩ mô và khuyến nghị cổ phiếu tiềm năng dựa trên báo cáo phân tích của công ty.\n- Quản lý danh mục đầu tư, tư vấn quản trị rủi ro và giải đáp thắc mắc của khách hàng trong phiên giao dịch.\n- Tổ chức các buổi hội thảo trực tuyến/trực tiếp chia sẻ kiến thức đầu tư cho cộng đồng khách hàng.`,
      requirements: `- Tốt nghiệp Đại học chuyên ngành Tài chính - Ngân hàng, Chứng khoán, Kinh tế hoặc liên quan.\n- Bắt buộc có các chứng chỉ hành nghề chứng khoán của Ủy ban Chứng khoán Nhà nước (hoặc cam kết hoàn thiện trong 6 tháng).\n- Có đam mê với thị trường tài chính, nắm bắt tốt các phương pháp phân tích kỹ thuật (TA) và cơ bản (FA).\n- Kỹ năng giao tiếp, tạo dựng uy tín và giữ chân khách hàng tốt.\n- Tác phong lịch thiệp, tuân thủ đạo đức nghề nghiệp nghiêm ngặt.`,
      benefits: `- Lương cơ bản: 12.000.000 - 18.000.000 VNĐ + Chia sẻ hoa hồng phí giao dịch cực cao (30% - 60% doanh số).\n- Thưởng mở tài khoản mới và thưởng duy trì tài sản ròng (NAV).\n- Làm việc trong môi trường tài chính năng động bậc nhất.\n- Đầy đủ chế độ bảo hiểm sức khỏe VIP và khám bệnh định kỳ.`,
      salaryMin: 12000000,
      salaryMax: 18000000,
      salaryNegotiable: false,
      deadlineDays: 45,
      industries: ["Phân tích đầu tư chứng khoán", "Quản lý danh mục đầu tư"],
      skills: ["Phân tích đầu tư chứng khoán", "Phân tích tài chính", "Thuyết trình bằng dữ liệu", "Kỹ năng đàm phán và thương lượng", "Tiếng Anh giao tiếp"]
    },

    // 55. Thực tập sinh Kinh doanh
    {
      title: "Thực tập sinh Phát triển Kinh doanh (Business Development Intern)",
      provinceId: HN,
      detailedLocation: "Tòa nhà Detech Tower, Số 8 Tôn Thất Thuyết, Mỹ Đình, Nam Từ Liêm, Hà Nội",
      experienceYears: 0,
      jobLevel: "Intern",
      educationLevel: "College",
      vacancies: 4,
      workMode: "Onsite",
      jobType: "Internship",
      description: `Tham gia tìm kiếm khách hàng tiềm năng và hỗ trợ các dự án mở rộng thị trường giải pháp công nghệ tuyển dụng.\n\nNhiệm vụ:\n- Tìm kiếm thông tin doanh nghiệp, xây dựng danh sách dữ liệu khách hàng mục tiêu (Lead Generation).\n- Hỗ trợ gọi điện khảo sát nhu cầu tuyển dụng và đặt lịch hẹn cho các chuyên viên kinh doanh cấp cao.\n- Tham gia chuẩn bị tài liệu giới thiệu sản phẩm, hợp đồng và hỗ trợ tổ chức sự kiện kết nối doanh nghiệp.\n- Học hỏi các kỹ năng bán hàng B2B thực chiến qua các buổi đào tạo nội bộ.`,
      requirements: `- Sinh viên năm 3, năm 4 hoặc mới tốt nghiệp các ngành Kinh tế, Quản trị kinh doanh, Ngoại thương, Marketing.\n- Yêu thích lĩnh vực kinh doanh, giao tiếp tự tin và không ngại thử thách.\n- Kỹ năng làm việc với Google Sheets/Excel và tìm kiếm thông tin trên Internet tốt.\n- Có thể thực tập tối thiểu 3 tháng.`,
      benefits: `- Trợ cấp thực tập: 4.000.000 - 6.000.000 VNĐ/tháng + Thưởng hoa hồng theo kết quả đóng góp.\n- Được đào tạo bài bản từ A-Z về quy trình bán hàng doanh nghiệp chuẩn quốc tế.\n- Có cơ hội được ký hợp đồng chính thức sau khi tốt nghiệp.\n- Hỗ trợ đóng dấu báo cáo thực tập tốt nghiệp đại học.`,
      salaryMin: 4000000,
      salaryMax: 6000000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Kinh doanh phần mềm", "Sales Admin/Sales Support/Sales Associate"],
      skills: ["Thuyết trình bán hàng", "Kỹ năng đàm phán và thương lượng", "Vận hành hệ thống HubSpot CRM", "Giao tiếp đa văn hóa", "Tư duy hệ thống"]
    }
  ];
};
