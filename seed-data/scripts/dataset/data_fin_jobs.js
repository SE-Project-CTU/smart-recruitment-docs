// 10 Job Postings cho ngành Tài chính, Kế toán & Kiểm toán
module.exports = function(provinces) {
  const { HN, HCM, DN } = provinces;

  return [
    // 71. Kế toán trưởng
    {
      title: "Kế toán Trưởng Doanh nghiệp (Chief Accountant - Bán lẻ & Thương mại)",
      provinceId: HCM,
      detailedLocation: "Tòa nhà Saigon Centre, 65 Lê Lợi, Quận 1, TP. Hồ Chí Minh",
      experienceYears: 6,
      jobLevel: "DepartmentHead",
      educationLevel: "Bachelor",
      vacancies: 1,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Tổ chức, điều hành toàn bộ công tác tài chính kế toán và đại diện doanh nghiệp làm việc với cơ quan thuế, kiểm toán độc lập.\n\nTrách nhiệm:\n- Quản lý và điều hành toàn bộ hoạt động của phòng Kế toán gồm 8-10 nhân sự.\n- Kiểm tra, soát xét tính hợp lý, hợp pháp của toàn bộ chứng từ kế toán và sổ sách doanh nghiệp.\n- Chịu trách nhiệm lập và trình bày Báo cáo tài chính năm theo chuẩn mực kế toán Việt Nam (VAS) và IFRS.\n- Đại diện công ty giải trình số liệu trực tiếp với cơ quan Thuế trong các kỳ quyết toán thuế doanh nghiệp.\n- Tham mưu cho Ban Giám đốc trong công tác hoạch định tài chính và tối ưu hóa chi phí hoạt động hợp pháp.`,
      requirements: `- Tốt nghiệp Đại học chính quy chuyên ngành Kế toán, Kiểm toán hoặc Tài chính doanh nghiệp.\n- Bắt buộc có Chứng chỉ Kế toán trưởng hợp lệ (ưu tiên ứng viên có chứng chỉ CPA hoặc ACCA/CMA).\n- Có tối thiểu 5 năm kinh nghiệm làm việc ở vị trí Kế toán trưởng trong các công ty thương mại/bán lẻ quy mô lớn.\n- Nắm vững Luật Quản lý Thuế, Luật Doanh nghiệp, Luật Kế toán và các chính sách thuế hiện hành.\n- Khả năng quản lý, phân công công việc khoa học và chịu được áp lực cao.`,
      benefits: `- Mức thu nhập: 35.000.000 - 50.000.000 VNĐ thỏa thuận theo năng lực.\n- Thưởng hiệu quả tài chính và tháng lương 13, 14.\n- Gói bảo hiểm sức khỏe VIP Bảo Minh cho bản thân và người thân.\n- Xe ô tô đưa đón công tác khi đi làm việc với các cơ quan ban ngành.\n- Môi trường làm việc tôn trọng, văn hóa minh bạch.`,
      salaryMin: 35000000,
      salaryMax: 50000000,
      salaryNegotiable: false,
      deadlineDays: 45,
      industries: ["Kế toán trưởng", "Kiểm soát và báo cáo tài chính"],
      skills: ["Lập báo cáo tài chính theo VAS", "Chuyển đổi báo cáo tài chính IFRS", "Kế toán thuế", "Sử dụng hệ thống SAP FI/CO", "Đánh giá hệ thống kiểm soát nội bộ"]
    },

    // 72. Kế toán Tổng hợp
    {
      title: "Chuyên viên Kế toán Tổng hợp (General Accountant - Sản xuất & Phân phối)",
      provinceId: HN,
      detailedLocation: "Tòa nhà Keangnam Landmark 72, Phạm Hùng, Cầu Giấy, Hà Nội",
      experienceYears: 3,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 2,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Thực hiện đối soát số liệu, hạch toán các nghiệp vụ kinh tế phát sinh và lập các báo cáo tài chính nội bộ định kỳ.\n\nNhiệm vụ:\n- Kiểm tra tính hợp lệ của các chứng từ thanh toán, hóa đơn đầu vào, đầu ra trước khi hạch toán vào phần mềm.\n- Thực hiện phân bổ chi phí, tính khấu hao tài sản cố định và kết chuyển doanh thu, chi phí cuối tháng.\n- Đối chiếu số dư tài khoản ngân hàng, công nợ phải thu, phải trả và kiểm kê hàng tồn kho.\n- Hỗ trợ Kế toán trưởng chuẩn bị hồ sơ kiểm toán độc lập và lập báo cáo tài chính cuối năm.`,
      requirements: `- Tốt nghiệp Đại học chuyên ngành Kế toán - Kiểm toán hoặc Tài chính doanh nghiệp.\n- Có tối thiểu 3 năm kinh nghiệm làm Kế toán tổng hợp.\n- Sử dụng thành thạo phần mềm kế toán MISA, FAST hoặc SAP.\n- Nắm vững nghiệp vụ định khoản kế toán và các chuẩn mực kế toán Việt Nam.\n- Cẩn thận, tỉ mỉ, trung thực và có trách nhiệm cao với các con số.`,
      benefits: `- Thu nhập: 15.000.000 - 22.000.000 VNĐ.\n- Thưởng tháng lương thứ 13, thưởng các ngày lễ tết và chuyên cần.\n- Phụ cấp ăn trưa 40.000đ/ngày, gửi xe miễn phí.\n- Đầy đủ chế độ bảo hiểm xã hội theo luật lao động.\n- Môi trường làm việc ổn định, gắn bó lâu dài.`,
      salaryMin: 15000000,
      salaryMax: 22000000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Kế toán tổng hợp", "Kế toán"],
      skills: ["Kế toán tổng hợp", "Lập báo cáo tài chính theo VAS", "Kế toán thuế", "Sử dụng hệ thống SAP FI/CO", "Tư duy hệ thống"]
    },

    // 73. Kế toán Thuế
    {
      title: "Chuyên viên Kế toán Thuế Doanh nghiệp (Tax Accountant)",
      provinceId: HCM,
      detailedLocation: "Tòa nhà Vietcombank Tower, Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      experienceYears: 3,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 2,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Chịu trách nhiệm toàn bộ các thủ tục kê khai thuế, lập báo cáo thuế và tối ưu hóa nghĩa vụ thuế hợp pháp của công ty.\n\nNhiệm vụ:\n- Lập tờ khai thuế GTGT, TNCN, TNDN định kỳ hàng tháng/quý theo đúng thời hạn quy định.\n- Quản lý hóa đơn điện tử đầu vào và đầu ra, rà soát tính hợp pháp của hóa đơn tránh rủi ro hóa đơn bất hợp pháp.\n- Lập báo cáo quyết toán thuế TNCN, TNDN cuối năm tài chính.\n- Chuẩn bị hồ sơ, chứng từ phục vụ các đoàn thanh tra, kiểm tra thuế của cơ quan thuế nhà nước.`,
      requirements: `- Tốt nghiệp Đại học chuyên ngành Kế toán, Kiểm toán, Thuế hoặc Tài chính.\n- Có từ 2-3 năm kinh nghiệm chuyên sâu về kế toán thuế trong các doanh nghiệp sản xuất, xây dựng hoặc thương mại.\n- Cập nhật liên tục các thông tư, nghị định mới nhất về chính sách thuế.\n- Sử dụng thành thạo phần mềm hỗ trợ kê khai thuế (HTKK) và cổng thông tin Thuế điện tử (eTax).\n- Kỹ năng giải trình số liệu mạch lạc, cẩn trọng trong từng chứng từ.`,
      benefits: `- Lương: 16.000.000 - 24.000.000 VNĐ.\n- Thưởng mùa quyết toán thuế thành công.\n- Chế độ đãi ngộ: bảo hiểm sức khỏe Bảo Việt, du lịch hè hàng năm.\n- Thưởng tháng 13 và các quyền lợi bảo hiểm đầy đủ.`,
      salaryMin: 16000000,
      salaryMax: 24000000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Kế toán", "Kiểm soát và báo cáo tài chính"],
      skills: ["Kế toán thuế", "Lập báo cáo tài chính theo VAS", "Kế toán tổng hợp", "Đánh giá hệ thống kiểm soát nội bộ", "Tư duy hệ thống"]
    },

    // 74. Kiểm toán Nội bộ
    {
      title: "Chuyên viên Kiểm toán Nội bộ (Internal Auditor - CIA / Risk Assessment)",
      provinceId: HN,
      detailedLocation: "Tòa nhà Gelex Tower, 52 Lê Đại Hành, Hai Bà Trưng, Hà Nội",
      experienceYears: 3,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 2,
      workMode: "Hybrid",
      jobType: "FullTime",
      description: `Đánh giá tính tuân thủ quy trình, kiểm soát nội bộ và quản trị rủi ro trên toàn bộ các phòng ban của tập đoàn.\n\nTrách nhiệm:\n- Tham gia lập kế hoạch kiểm toán nội bộ hàng năm dựa trên đánh giá mức độ rủi ro hoạt động.\n- Thực hiện các cuộc kiểm toán chuyên đề: mua sắm tài sản, quản lý tài chính, kiểm kê kho và vận hành nhân sự.\n- Phát hiện các lỗ hổng kiểm soát, sai sót và đề xuất các biện pháp khắc phục thiết thực cho Ban Kiểm soát.\n- Theo dõi tiến độ thực hiện các khuyến nghị sau kiểm toán của các đơn vị được kiểm toán.`,
      requirements: `- Tốt nghiệp Đại học chuyên ngành Kiểm toán, Kế toán hoặc Tài chính doanh nghiệp.\n- Có tối thiểu 2-3 năm kinh nghiệm kiểm toán nội bộ hoặc từng làm kiểm toán độc lập tại các công ty kiểm toán uy tín.\n- Nắm vững kiến thức về khung kiểm soát nội bộ COSO và các chuẩn mực kiểm toán nội bộ quốc tế.\n- Có chứng chỉ CIA, ACCA hoặc CPA là lợi thế lớn.\n- Tư duy phản biện sắc bén, tính bảo mật cao và tính độc lập khách quan tuyệt đối.`,
      benefits: `- Thu nhập: 20.000.000 - 30.000.000 VNĐ.\n- Thưởng thành tích kiểm toán và thưởng tháng lương 13.\n- Gói bảo hiểm sức khỏe toàn diện PVI Care.\n- Môi trường làm việc chuẩn mực, tôn trọng tính minh bạch.\n- Cơ hội thăng tiến lên Trưởng nhóm Kiểm toán Nội bộ.`,
      salaryMin: 20000000,
      salaryMax: 30000000,
      salaryNegotiable: false,
      deadlineDays: 45,
      industries: ["Kiểm soát và báo cáo tài chính", "Tuân thủ và kiểm toán bảo mật"],
      skills: ["Đánh giá hệ thống kiểm soát nội bộ", "Lập báo cáo tài chính theo VAS", "Phân tích tài chính", "Tiếng Anh giao tiếp", "Tư duy hệ thống"]
    },

    // 75. Chuyên viên Phân tích Tài chính (FP&A)
    {
      title: "Chuyên viên Hoạch định & Phân tích Tài chính (FP&A Specialist)",
      provinceId: HCM,
      detailedLocation: "Tòa nhà Deutsches Haus, 33 Lê Duẩn, Quận 1, TP. Hồ Chí Minh",
      experienceYears: 3,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 1,
      workMode: "Hybrid",
      jobType: "FullTime",
      description: `Xây dựng mô hình tài chính, dự phóng doanh thu chi phí và phân tích hiệu quả kinh doanh hỗ trợ quyết định chiến lược của Ban Giám đốc.\n\nNhiệm vụ:\n- Thu thập số liệu, phân tích biến động chi phí thực tế so với ngân sách kế hoạch (Variance Analysis).\n- Xây dựng các mô hình dự báo tài chính (Financial Models) và dự phóng dòng tiền ngắn hạn/dài hạn.\n- Đánh giá hiệu quả tài chính của các dự án đầu tư mở rộng chi nhánh mới (NPV, IRR, Payback Period).\n- Soạn thảo báo cáo quản trị tài chính hàng tháng và thuyết trình số liệu cho Ban Điều hành.`,
      requirements: `- Tốt nghiệp Đại học chuyên ngành Tài chính doanh nghiệp, Kinh tế, CFA candidate hoặc tương đương.\n- Có ít nhất 3 năm kinh nghiệm trong lĩnh vực FP&A, Phân tích tài chính hoặc Đầu tư.\n- Thành thạo xây dựng mô hình tài chính trên Excel nâng cao (Financial Modeling).\n- Tư duy phân tích nhạy bén, khả năng nhìn ra các rủi ro và cơ hội đằng sau những con số.\n- Tiếng Anh lưu loát trong giao tiếp và trình bày báo cáo.`,
      benefits: `- Mức lương: 25.000.000 - 38.000.000 VNĐ.\n- Thưởng hiệu quả tài chính cuối năm (2-3 tháng lương).\n- Bảo hiểm sức khỏe quốc tế cao cấp cho cá nhân.\n- Cơ hội làm việc trực tiếp với CFO và Ban Tổng Giám đốc.\n- Lộ trình phát triển rõ ràng lên FP&A Manager.`,
      salaryMin: 25000000,
      salaryMax: 38000000,
      salaryNegotiable: false,
      deadlineDays: 45,
      industries: ["Phân tích tài chính", "Hoạch định tài chính"],
      skills: ["Phân tích tài chính", "Lập báo cáo tài chính theo VAS", "Thuyết trình bằng dữ liệu", "Tiếng Anh giao tiếp", "Tư duy hệ thống"]
    },

    // 76. Kế toán Kho & Giá thành
    {
      title: "Kế toán Kho & Giá thành Sản xuất (Cost Accountant)",
      provinceId: HN,
      detailedLocation: "Khu công nghiệp Thăng Long, Huyện Đông Anh, Hà Nội",
      experienceYears: 2,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 2,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Quản lý số liệu nhập xuất tồn kho nguyên vật liệu và tính toán chính xác giá thành phẩm sản xuất tại nhà máy.\n\nNhiệm vụ:\n- Kiểm soát các chứng từ nhập - xuất kho nguyên vật liệu, phụ tùng và thành phẩm hàng ngày.\n- Tập hợp chi phí nguyên vật liệu trực tiếp, chi phí nhân công và chi phí sản xuất chung để tính giá thành sản phẩm.\n- Định kỳ đối chiếu số liệu sổ sách với thực tế kiểm kê kho, làm rõ nguyên nhân chênh lệch hao hụt (nếu có).\n- Đề xuất các giải pháp kiểm soát chi phí sản xuất và giảm thiểu lãng phí định mức vật tư.`,
      requirements: `- Tốt nghiệp Cao đẳng/Đại học chuyên ngành Kế toán, Tài chính.\n- Có từ 2 năm kinh nghiệm làm kế toán giá thành hoặc kế toán kho tại các nhà máy sản xuất.\n- Hiểu rõ quy trình tính giá thành theo phương pháp phân bước, tỷ lệ hoặc đơn đặt hàng.\n- Thành thạo phần mềm kế toán (SAP, MISA) và Excel thành thạo.\n- Chịu khó, trung thực, cẩn thận và làm việc tốt với số liệu chi tiết.`,
      benefits: `- Thu nhập: 13.000.000 - 18.000.000 VNĐ.\n- Có xe đưa đón nhân viên từ nội thành Hà Nội sang Đông Anh.\n- Ăn trưa miễn phí tại nhà ăn công ty.\n- Thưởng tháng 13 và các chế độ bảo hiểm theo quy định.`,
      salaryMin: 13000000,
      salaryMax: 18000000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Kế toán", "Kế toán tổng hợp"],
      skills: ["Kiểm soát tồn kho", "Kế toán tổng hợp", "Vận hành hệ thống quản lý kho", "Sử dụng hệ thống SAP FI/CO", "Tư duy hệ thống"]
    },

    // 77. Chuyên viên Thẩm định Tín dụng
    {
      title: "Chuyên viên Thẩm định Tín dụng Doanh nghiệp (Credit Risk Underwriter)",
      provinceId: HCM,
      detailedLocation: "Tòa nhà Mê Linh Point, Số 2 Ngô Đức Kế, Quận 1, TP. Hồ Chí Minh",
      experienceYears: 3,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 2,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Thẩm định độc lập rủi ro tín dụng và đề xuất phê duyệt các khoản vay vốn của khách hàng doanh nghiệp tại ngân hàng.\n\nNhiệm vụ:\n- Tiếp nhận hồ sơ vay vốn từ bộ phận Quan hệ khách hàng, kiểm tra tính đầy đủ và hợp pháp của hồ sơ.\n- Phân tích tình hình tài chính doanh nghiệp, phương án kinh doanh, dòng tiền trả nợ và tài sản bảo đảm.\n- Viết báo cáo thẩm định tín dụng, đánh giá rủi ro và khuyến nghị điều kiện cấp tín dụng lên Hội đồng Tín dụng.\n- Giám sát các dấu hiệu cảnh báo sớm rủi ro tín dụng đối với các khoản vay đã giải ngân.`,
      requirements: `- Tốt nghiệp Đại học chuyên ngành Tài chính - Ngân hàng, Kế toán - Kiểm toán hoặc Kinh tế.\n- Có từ 3 năm kinh nghiệm làm thẩm định tín dụng doanh nghiệp hoặc quản trị rủi ro tín dụng tại ngân hàng.\n- Kỹ năng phân tích báo cáo tài chính và am hiểu sâu sắc về thị trường các ngành nghề kinh doanh.\n- Tinh thần khách quan, độc lập, đạo đức nghề nghiệp liêm chính.\n- Kỹ năng viết báo cáo thẩm định logic, rõ ràng, lập luận chặt chẽ.`,
      benefits: `- Mức lương: 20.000.000 - 30.000.000 VNĐ.\n- Thưởng hiệu quả công việc và các ngày lễ tết theo quy chế ngân hàng.\n- Gói bảo hiểm sức khỏe VIP toàn diện.\n- Môi trường làm việc chuyên nghiệp, cơ hội thăng tiến cao.`,
      salaryMin: 20000000,
      salaryMax: 30000000,
      salaryNegotiable: false,
      deadlineDays: 45,
      industries: ["Chuyên môn Tài chính", "Kiểm soát và báo cáo tài chính"],
      skills: ["Phân tích tài chính", "Lập báo cáo tài chính theo VAS", "Đánh giá hệ thống kiểm soát nội bộ", "Tiếng Anh giao tiếp", "Tư duy hệ thống"]
    },

    // 78. Kế toán Công nợ
    {
      title: "Chuyên viên Kế toán Công nợ & Thanh toán (Accounts Receivable / Payable)",
      provinceId: DN,
      detailedLocation: "Tòa nhà Indochina Riverside, 74 Bạch Đằng, Hải Châu, Đà Nẵng",
      experienceYears: 2,
      jobLevel: "Staff",
      educationLevel: "College",
      vacancies: 2,
      workMode: "Onsite",
      jobType: "FullTime",
      description: `Quản lý công nợ khách hàng và nhà cung cấp, theo dõi lịch thanh toán và thu hồi công nợ đúng hạn.\n\nNhiệm vụ:\n- Theo dõi các khoản phải thu từ khách hàng, định kỳ gửi đối chiếu công nợ và đôn đốc nhắc nợ đúng hạn.\n- Kiểm tra hồ sơ thanh toán nhà cung cấp, lập lệnh chuyển tiền ngân hàng và theo dõi công nợ phải trả.\n- Báo cáo tình hình tuổi nợ (Aging of Accounts Receivable) và cảnh báo các khoản nợ quá hạn có nguy cơ khó đòi.\n- Phối hợp với phòng Bán hàng để xử lý các khoản chiết khấu thương mại, giảm giá hàng bán.`,
      requirements: `- Tốt nghiệp Cao đẳng/Đại học chuyên ngành Kế toán hoặc Tài chính.\n- Có ít nhất 1-2 năm kinh nghiệm làm kế toán công nợ hoặc kế toán thanh toán.\n- Kỹ năng giao tiếp, thương lượng khéo léo qua điện thoại và email với khách hàng.\n- Cẩn thận, chi tiết, quản lý số liệu chặt chẽ trên phần mềm kế toán.`,
      benefits: `- Thu nhập: 11.000.000 - 16.000.000 VNĐ.\n- Thưởng tháng lương thứ 13 và thưởng chuyên cần.\n- Đầy đủ chế độ bảo hiểm xã hội, y tế.\n- Môi trường làm việc thân thiện, hòa đồng tại Đà Nẵng.`,
      salaryMin: 11000000,
      salaryMax: 16000000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Kế toán", "Kế toán tổng hợp"],
      skills: ["Kế toán công nợ", "Kế toán bán hàng", "Lập báo cáo tài chính theo VAS", "Kỹ năng đàm phán và thương lượng", "Tư duy hệ thống"]
    },

    // 79. Chuyên viên Quản trị Rủi ro Tài chính
    {
      title: "Chuyên viên Quản trị Rủi ro Thị trường & Thanh khoản (Risk Management Specialist)",
      provinceId: HN,
      detailedLocation: "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội",
      experienceYears: 4,
      jobLevel: "Staff",
      educationLevel: "Bachelor",
      vacancies: 1,
      workMode: "Hybrid",
      jobType: "FullTime",
      description: `Đo lường, giám sát và đề xuất các biện pháp phòng ngừa rủi ro tỷ giá, rủi ro lãi suất và thanh khoản cho tập đoàn tài chính.\n\nTrách nhiệm:\n- Xây dựng mô hình đo lường rủi ro thị trường: Value at Risk (VaR), Stress Testing cho danh mục đầu tư.\n- Giám sát các hạn mức giao dịch ngoại hối và các công cụ phái sinh tiền tệ hàng ngày.\n- Theo dõi tình hình thanh khoản, cân đối dòng tiền và cảnh báo sớm các tình huống thiếu hụt vốn ngắn hạn.\n- Lập báo cáo quản trị rủi ro định kỳ theo chuẩn Basel II / Basel III gửi Ủy ban Quản lý Rủi ro.`,
      requirements: `- Tốt nghiệp Đại học hoặc Thạc sĩ chuyên ngành Tài chính định lượng, Toán kinh tế hoặc Ngân hàng.\n- Có từ 3-4 năm kinh nghiệm làm việc ở bộ phận Quản trị rủi ro thị trường/thanh khoản tại ngân hàng hoặc quỹ đầu tư.\n- Thành thạo các kỹ thuật phân tích thống kê và phần mềm phân tích (R, Python, SQL, Excel VBA).\n- Có chứng chỉ FRM (Financial Risk Manager) hoặc CFA là ưu thế vượt trội.\n- Tiếng Anh xuất sắc trong việc đọc hiểu các tài liệu kỹ thuật quốc tế.`,
      benefits: `- Mức thu nhập: 28.000.000 - 45.000.000 VNĐ.\n- Thưởng theo kết quả kinh doanh và hiệu quả quản trị rủi ro năm.\n- Gói bảo hiểm sức khỏe VIP toàn diện.\n- Môi trường làm việc chuẩn mực tài chính quốc tế.`,
      salaryMin: 28000000,
      salaryMax: 45000000,
      salaryNegotiable: false,
      deadlineDays: 45,
      industries: ["Chuyên môn Tài chính", "Phân tích tài chính"],
      skills: ["Phân tích tài chính", "Lập báo cáo tài chính theo VAS", "Đánh giá hệ thống kiểm soát nội bộ", "Tiếng Anh giao tiếp", "Tư duy hệ thống"]
    },

    // 80. Thực tập sinh Kế toán
    {
      title: "Thực tập sinh Kế toán Doanh nghiệp (Accounting Intern)",
      provinceId: HN,
      detailedLocation: "Tòa nhà CMC Tower, Duy Tân, Cầu Giấy, Hà Nội",
      experienceYears: 0,
      jobLevel: "Intern",
      educationLevel: "College",
      vacancies: 3,
      workMode: "Onsite",
      jobType: "Internship",
      description: `Học tập và thực hành các nghiệp vụ kế toán cơ bản, nhập liệu chứng từ và hỗ trợ chuẩn bị sổ sách kế toán.\n\nNhiệm vụ:\n- Sắp xếp, lưu trữ hóa đơn chứng từ đầu vào, đầu ra một cách khoa học.\n- Hỗ trợ nhập liệu các phiếu thu, phiếu chi, hóa đơn mua hàng lên phần mềm kế toán.\n- Đi ngân hàng nộp tiền, rút tiền, lấy sổ phụ ngân hàng và giao nhận chứng từ thuế.\n- Hỗ trợ công tác kiểm kê tài sản và kiểm toán cuối năm.`,
      requirements: `- Sinh viên năm cuối chuyên ngành Kế toán, Kiểm toán hoặc Tài chính.\n- Nắm chắc các nguyên lý kế toán và các định khoản nghiệp vụ cơ bản.\n- Cẩn thận, trung thực, chịu khó và có trách nhiệm với số liệu.\n- Có thể thực tập tối thiểu 3 tháng.`,
      benefits: `- Phụ cấp thực tập: 3.500.000 - 5.500.000 VNĐ/tháng + Phụ cấp ăn trưa.\n- Được hướng dẫn tận tình bởi các anh chị Kế toán tổng hợp.\n- Cấp dấu mộc xác nhận báo cáo thực tập tốt nghiệp.\n- Có cơ hội được tuyển dụng chính thức sau khi tốt nghiệp.`,
      salaryMin: 3500000,
      salaryMax: 5500000,
      salaryNegotiable: false,
      deadlineDays: 30,
      industries: ["Kế toán", "Thực tập sinh kế toán"],
      skills: ["Kế toán tổng hợp", "Lập báo cáo tài chính theo VAS", "Kế toán bán hàng", "Tư duy hệ thống", "Tiếng Anh giao tiếp"]
    }
  ];
};
