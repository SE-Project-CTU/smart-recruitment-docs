export type LayoutType =
  | "single-column"
  | "two-column"
  | "sidebar-left"
  | "sidebar-right"
  | "header-two-column"
  | "custom"
  | string;

export type SectionKey =
  | "objective"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "awards"
  | "interests"
  | "additionalInfo"
  | string;

export interface LayoutArea {
  id: string; // e.g. "sidebar", "main", "header", "footer"
  name?: string;
  width?: string; // e.g. "35%", "65%", "1fr", "2fr"
  sections: SectionKey[]; // List of section IDs ordered top-to-bottom within this area
}

export interface CvLayoutSchema {
  version: `${number}.${number}` | string;
  type: LayoutType;
  areas: LayoutArea[];
}
