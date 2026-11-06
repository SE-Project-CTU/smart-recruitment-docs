const fs = require('fs');
const path = require('path');

const LOOKUP_PATH = path.join(__dirname, 'catalogs_lookup.json');
const OUTPUT_PATH = path.join(__dirname, 'job_postings_dataset.json');

const lookup = JSON.parse(fs.readFileSync(LOOKUP_PATH, 'utf8'));
const { skills: skillsMap, industries: industriesMap, provinces: provincesMap } = lookup;

function findSkill(name) {
  if (skillsMap[name]) return skillsMap[name];
  const exact = Object.keys(skillsMap).find(k => k.toLowerCase() === name.toLowerCase());
  if (exact) return skillsMap[exact];
  const partial = Object.keys(skillsMap).find(k => k.toLowerCase().includes(name.toLowerCase()));
  if (partial) return skillsMap[partial];
  throw new Error(`Skill not found: "${name}"`);
}

function findIndustry(name) {
  if (industriesMap[name]) return industriesMap[name];
  const exact = Object.keys(industriesMap).find(k => k.toLowerCase() === name.toLowerCase());
  if (exact) return industriesMap[exact];
  const partial = Object.keys(industriesMap).find(k => k.toLowerCase().includes(name.toLowerCase()));
  if (partial) return industriesMap[partial];
  throw new Error(`Industry not found: "${name}"`);
}

function findProvince(name) {
  if (provincesMap[name]) return provincesMap[name];
  const found = Object.keys(provincesMap).find(k => k.toLowerCase().includes(name.toLowerCase()));
  if (found) return provincesMap[found];
  throw new Error(`Province not found: "${name}"`);
}

const provinces = {
  HN: findProvince("Hà Nội"),
  HCM: findProvince("Hồ Chí Minh"),
  DN: findProvince("Đà Nẵng"),
  CT: findProvince("Cần Thơ"),
  HP: findProvince("Hải Phòng"),
  BN: findProvince("Bắc Ninh"),
  TN: findProvince("Thái Nguyên")
};

const rawJobs = [
  ...require('./data_it_jobs')(provinces),
  ...require('./data_biz_jobs')(provinces),
  ...require('./data_mkt_jobs')(provinces),
  ...require('./data_fin_jobs')(provinces),
  ...require('./data_hr_jobs')(provinces),
  ...require('./data_ops_jobs')(provinces)
];

console.log(`Loaded ${rawJobs.length} raw jobs definitions.`);

const processedJobs = [];

rawJobs.forEach((item, index) => {
  const jobIdx = index + 1;
  try {
    // 1. Validate Title
    if (!item.title || item.title.trim().length < 5 || item.title.trim().length > 200) {
      throw new Error(`Tiêu đề không hợp lệ (${item.title?.length || 0} ký tự)`);
    }

    // 2. Validate Description & Requirements
    if (!item.description || item.description.trim().length < 20) {
      throw new Error(`Mô tả quá ngắn (< 20 ký tự)`);
    }
    if (!item.requirements || item.requirements.trim().length < 20) {
      throw new Error(`Yêu cầu quá ngắn (< 20 ký tự)`);
    }

    // 3. Validate Skills (>= 5 skills)
    const skillIds = item.skills.map(findSkill);
    const uniqueSkillIds = [...new Set(skillIds)];
    if (uniqueSkillIds.length < 5) {
      throw new Error(`Cần ít nhất 5 skills (hiện có ${uniqueSkillIds.length})`);
    }

    // 4. Validate Industries (2-3 industries)
    const industryIds = item.industries.map(findIndustry);
    const uniqueIndustryIds = [...new Set(industryIds)];
    if (uniqueIndustryIds.length < 2 || uniqueIndustryIds.length > 3) {
      throw new Error(`Cần 2-3 industries (hiện có ${uniqueIndustryIds.length})`);
    }

    // 5. Validate Salaries
    if (!item.salaryNegotiable) {
      if (!item.salaryMin || item.salaryMin < 1000000) {
        throw new Error(`salaryMin phải >= 1.000.000 VNĐ (${item.salaryMin})`);
      }
      if (item.salaryMax && item.salaryMax < item.salaryMin) {
        throw new Error(`salaryMax phải >= salaryMin (${item.salaryMax} < ${item.salaryMin})`);
      }
    }

    // 6. Validate Province
    if (!item.provinceId) {
      throw new Error(`provinceId bị rỗng`);
    }

    processedJobs.push({
      id: jobIdx,
      title: item.title.trim(),
      provinceId: item.provinceId,
      detailedLocation: item.detailedLocation ? item.detailedLocation.trim() : null,
      experienceYears: item.experienceYears ?? 0,
      jobLevel: item.jobLevel || "Staff",
      educationLevel: item.educationLevel || "Bachelor",
      vacancies: item.vacancies || 1,
      workMode: item.workMode || "Onsite",
      jobType: item.jobType || "FullTime",
      description: item.description.trim(),
      requirements: item.requirements.trim(),
      benefits: item.benefits ? item.benefits.trim() : null,
      salaryMin: item.salaryNegotiable ? null : item.salaryMin,
      salaryMax: item.salaryNegotiable ? null : (item.salaryMax || null),
      salaryNegotiable: Boolean(item.salaryNegotiable),
      deadlineDays: item.deadlineDays || 45,
      industryIds: uniqueIndustryIds,
      skillIds: uniqueSkillIds
    });
  } catch (err) {
    console.error(`❌ Lỗi tại Job #${jobIdx} [${item.title}]: ${err.message}`);
    process.exit(1);
  }
});

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(processedJobs, null, 2), 'utf8');
console.log(`\n✅ THÀNH CÔNG: Đã tạo và kiểm tra toàn vẹn ${processedJobs.length} Job Postings!`);
console.log(`📁 File lưu tại: ${OUTPUT_PATH}`);
