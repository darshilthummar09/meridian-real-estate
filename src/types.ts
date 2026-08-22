export type PropertyCategory = 'all' | 'urban' | 'coastal' | 'mountain' | 'penthouse';

export interface ProjectSpecification {
  label: string;
  value: string;
}

export interface AmenityItem {
  iconName: string;
  title: string;
  description: string;
}

export interface Residence {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: string;
  city: string;
  state: string;
  country: string;
  category: PropertyCategory;
  configuration: string;
  areaSqFt: string;
  priceFrom: string;
  heroImage: string;
  secondaryImage: string;
  gallery: string[];
  architecturalVignette?: string;
  floorPlanImage?: string;
  shortDescription: string;
  editorialQuote: string;
  overview: string;
  architecturalPhilosophy: string;
  features: string[];
  specifications: ProjectSpecification[];
  amenities: AmenityItem[];
  connectivity: {
    destination: string;
    time: string;
    distance: string;
  }[];
  featured: boolean;
  completionYear: string;
  architect: string;
}

export interface DestinationStory {
  id: string;
  title: string;
  category: 'Coastal' | 'Lake' | 'Mountain';
  location: string;
  subtitle: string;
  description: string;
  image: string;
  elevationOrClimate: string;
  vibe: string;
  projectCount: number;
  coordinates: string;
}

export interface LifestyleSpace {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  dimensions: string;
  materiality: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  coverImage: string;
  paragraphs: string[];
  keyQuote?: string;
}

export interface ConstructionStage {
  id: number;
  stepNumber: string;
  phase: string;
  title: string;
  subtitle: string;
  timeline: string;
  progressPercent: number;
  description: string;
  architecturalNote: string;
  photorealisticImage: string;
  secondaryImage?: string;
  stats: {
    label: string;
    value: string;
  }[];
  materials: string[];
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  residenceOfInterest: string;
  timeline: string;
  message: string;
  agreeToPrivilegedUpdates: boolean;
}
