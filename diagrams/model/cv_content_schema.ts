export type HttpUrl = `http${"" | "s"}://${string}`;

export enum CvLanguage {
  Vietnamese = "vi",
}

export enum CvSectionKey {
  Experience = "experience",
  Education = "education",
  Skills = "skills",
  Projects = "projects",
  Certifications = "certifications",
  Awards = "awards",
  Interests = "interests",
  AdditionalInfo = "additionalInfo",
}

export interface CvContentMetadata {
  version: `${number}.${number}`;
  templateId: string;
  language: CvLanguage;
  updatedAt: `${number}-${number}-${number}T${string}Z`;
}

export interface CvProfile {
  fullName: string;
  title: string;
  avatarUrl: HttpUrl;
  email: string;
  phone: string;
  dob: string;
  address: string;
  website: HttpUrl;
  socialLink: HttpUrl;
}

export interface ExperienceItem {
  id: `exp_${string}`;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface EducationItem {
  id: `edu_${string}`;
  school: string;
  title: string;
  start: string;
  end: string;
  details: string;
}

export interface SkillItem {
  id: `sk_${string}`;
  name: string;
  description: string;
}

export interface ProjectItem {
  id: `prj_${string}`;
  project_name: string;
  role: string;
  start: string;
  end: string;
  description: string;
}

export interface CertificationItem {
  id: `cert_${string}`;
  name: string;
  issueDate: string;
}

export interface AwardItem {
  id: `award_${string}`;
  award_name: string;
  date: string;
}

export interface CvSection<TItem> {
  title: string;
  visible: boolean;
  items: TItem[];
}

export interface ContentSection {
  title: string;
  visible: boolean;
  content: string;
}

export interface CvSections {
  experience: CvSection<ExperienceItem>;
  education: CvSection<EducationItem>;
  skills: CvSection<SkillItem>;
  projects: CvSection<ProjectItem>;
  certifications: CvSection<CertificationItem>;
  awards: CvSection<AwardItem>;
  interests: ContentSection;
  additionalInfo: ContentSection;
}

export interface CvContentSchema {
  metadata: CvContentMetadata;
  profile: CvProfile;
  objective: string;
  sections: CvSections;
}
