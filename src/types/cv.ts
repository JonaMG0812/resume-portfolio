export interface UILabels {
  workExperience: string;
  educationAndLanguages: string;
  certifications: string;
  present: string;
  month: string;
  months: string;
  year: string;
  years: string;
  in: string;
  downloadCV: string;
  letsTalk: string;
  availableToWork: string;
}

export interface CV {
  basics: Basics;
  work: Work[];
  education: Education[];
  certificates: Certificate[];
  languages?: Language[];
  ui: UILabels;
}

export interface Basics {
  name: string;
  label: string;
  image: string;
  email: string;
  summary: string;
  location: Location;
  profiles: Profile[];
}

export interface Location {
  city: string;
  countryCode: string;
  region: string;
}

export interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface Work {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string | null;
  summary: string;
  highlights: string[];
  keywords: string[];
}

export interface Education {
  institution: string;
  url?: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score?: string;
}

export interface Certificate {
  name: string;
  date: string;
  issuer: string;
  url: string;
}

export interface Language {
  language: string;
  fluency: string;
  description?: string;
}
