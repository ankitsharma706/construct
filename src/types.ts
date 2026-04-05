export interface ProjectSection {
  title: string;
  subtitle?: string;
  description?: string;
  images?: string[];
  type: 'narrative' | 'gallery' | 'drawings' | 'metrics' | 'model' | 'timeline' | 'before-after' | 'specs' | 'text-image';
}

export interface Project {
  id: string;
  title: string;
  location: string;
  cost: string;
  area?: string;
  year: string;
  category: string;
  description: string;
  images: string[];
  modelUrl?: string;
  technicalSpecs?: string[];
  materials?: string[];
  engineeringApproach?: string[];
  timeline?: { phase: string; desc: string }[];
  sustainabilityFeatures?: string[];
  sustainabilityResult?: string;
  qualityMeasures?: string[];
  businessImpact?: string[];
  team?: string[];
  challenges?: { challenge: string; solution: string }[];
  outcome?: string;
  problem?: string;
  solution?: string;
  designStrategy?: string;
  engineeringLogic?: string;
  drawings?: string[];
  structuralModeling?: string[];
  beforeAfter?: { before: string[]; after: string[] };
  performanceMetrics?: { label: string; value: string }[];
  userExperience?: string;
  impact?: string;
  conclusion?: string;
  client?: string;
  process?: { phase: string; title: string; description: string }[];
  spacePlanning?: string;
  testimonial?: { quote: string; author: string; role: string };
  sections?: ProjectSection[];
  projectEmail?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface ArticleSection {
  title: string;
  content: string;
  image?: string;
}

export interface JournalPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  readTime: string;
  sections: ArticleSection[];
  insights?: string[];
  conclusion?: string;
  gallery?: string[];
  technicalBrief?: {
    label: string;
    value: string;
  }[];
  authorEmail?: string;
  createdAt?: any;
}

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  budget: string;
  serviceType: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: any;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  price: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}
