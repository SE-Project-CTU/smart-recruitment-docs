export type HexColor = `#${string}`;
export type IsoDateTime = `${number}-${number}-${number}T${string}Z`;

export enum FontFamily {
	Inter = "Inter",
}

export enum FontWeight {
	Normal = "normal",
	Medium = "medium",
	Bold = "bold",
}

export enum FontStyle {
	Normal = "normal",
	Italic = "italic",
}

export enum TextDecoration {
	None = "none",
	Underline = "underline",
}

export enum TextAlign {
	Left = "left",
	Justify = "justify",
}

export enum ListStyle {
	None = "none",
	Disc = "disc",
}

export interface CvPresentationMetadata {
	version: `${number}.${number}`;
	templateId: string;
	updatedAt: IsoDateTime;
}

export interface GlobalStyle {
	fontFamily: FontFamily;
	baseFontSize: number;
	primaryColor: HexColor;
	lineHeight: number;
}

export interface TextStyle {
	color: HexColor;
	fontSize: number;
	fontFamily: FontFamily;
	fontWeight: FontWeight;
	fontStyle: FontStyle;
	textDecoration: TextDecoration;
	textAlign?: TextAlign;
	listStyle?: ListStyle;
}

// The prefix is the item's id from cv_content_schema, for example `exp_01`.
export type ExperienceStyleKey = `exp_${string}.${"company" | "position" | "description"}`;

// The prefix is the item's id from cv_content_schema, for example `edu_01`.
export type EducationStyleKey = `edu_${string}.${"school" | "title" | "start" | "end" | "details"}`;

// The prefix is the item's id from cv_content_schema, for example `sk_01`.
export type SkillStyleKey = `sk_${string}.${"name" | "description"}`;

// The prefix is the item's id from cv_content_schema, for example `prj_01`.
export type ProjectStyleKey = `prj_${string}.${"project_name" | "role" | "start" | "end" | "description"}`;

// The prefix is the item's id from cv_content_schema, for example `cert_01`.
export type CertificationStyleKey = `cert_${string}.${"name" | "issueDate"}`;

// The prefix is the item's id from cv_content_schema, for example `award_01`.
export type AwardStyleKey = `award_${string}.${"award_name" | "date"}`;

export type PresentationFieldKey =
	| `profile.${"fullName" | "title" | "email" | "phone" | "address" | "website"}`
	| "objective"
	| `sections.${"experience" | "education" | "skills" | "projects" | "certifications" | "awards"}.title`
	| `sections.${"interests" | "additionalInfo"}.${"title" | "content"}`
	| ExperienceStyleKey
	| EducationStyleKey
	| SkillStyleKey
	| ProjectStyleKey
	| CertificationStyleKey
	| AwardStyleKey;

export type PresentationFieldStyles = Partial<Record<PresentationFieldKey, TextStyle>>;

export interface CvPresentationStyles {
	global: GlobalStyle;
	fields: PresentationFieldStyles;
}

export interface CvPresentationSchema {
	metadata: CvPresentationMetadata;
	styles: CvPresentationStyles;
}
