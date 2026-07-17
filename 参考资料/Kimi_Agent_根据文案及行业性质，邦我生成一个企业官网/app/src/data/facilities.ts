export interface ProductionBase {
  id: string;
  name: string;
  location: string;
  established: string;
  description: string;
  stats: { label: string; value: string }[];
  certifications?: string[];
  cta?: string;
}

export interface RnDLab {
  id: string;
  name: string;
  subtitle: string;
  location: string;
  description: string;
  type: 'flagship' | 'standard';
}

export interface DistributionLocation {
  name: string;
  subtitle: string;
  hq: boolean;
  sales: boolean;
  procurement: boolean;
  production: boolean;
  warehouse: boolean;
  it: boolean;
  sampling: boolean;
  qc: boolean;
}

export const productionBases: ProductionBase[] = [
  {
    id: 'chongqing',
    name: 'Chongqing Production Base',
    location: 'Longqiao Industrial Park, Fuling District, Chongqing',
    established: 'Est. 2018',
    description: 'Located in Longqiao Industrial Park, Fuling District, Chongqing city, our flagship facility specializes in R&D and production of gamma-lactone and other F&F ingredients.',
    stats: [
      { label: 'Site', value: '120k sqm' },
      { label: 'Capacity', value: '5,000 Tons/Year' },
      { label: 'Varieties', value: '100+' },
      { label: 'Employees', value: '150+' },
    ],
    certifications: ['ISO Cert.', 'REACH Reg.', 'FSSC Cert.', 'KOSHER Cert.', 'Halal Cert.'],
  },
  {
    id: 'malaysia',
    name: 'Malaysia Production Base',
    location: 'PT 16143, Jalan Telok Mengkuang, 42500 Telok Panglima Garang, Selangor',
    established: 'Est. 2019',
    description: 'Professional F&F supplier serving worldwide customers with complete production lines and global distribution network.',
    stats: [
      { label: 'Varieties', value: '30+' },
      { label: 'Capacity', value: '2,000 Tons/Year' },
      { label: 'Partners', value: '50+' },
    ],
    cta: 'Own-Products List',
  },
];

export const rndLabs: RnDLab[] = [
  {
    id: 'synthesis',
    name: 'Chemical Synthesis Lab',
    subtitle: 'Flagship Lab',
    location: 'Chongqing',
    description: 'Advanced organic synthesis and molecular engineering for creating unique fragrance molecules.',
    type: 'flagship',
  },
  {
    id: 'bio',
    name: 'Biosynthesis Lab',
    subtitle: 'Bio-Technology',
    location: 'Shanghai',
    description: 'Cutting-edge biotechnological approaches for sustainable and natural aroma production.',
    type: 'standard',
  },
  {
    id: 'odor',
    name: 'Odor Optimization Lab',
    subtitle: 'Art & Technology',
    location: 'Shanghai',
    description: 'Expert formulation and sensory evaluation for superior olfactory performance.',
    type: 'standard',
  },
  {
    id: 'extraction',
    name: 'Plant Extraction Lab',
    subtitle: 'Natural Excellence',
    location: 'Chongqing',
    description: 'State-of-the-art extraction technologies for natural botanical extracts.',
    type: 'standard',
  },
];

export const distributionLocations: DistributionLocation[] = [
  { name: 'BEIJING', subtitle: 'Headquarters', hq: true, sales: true, procurement: false, production: false, warehouse: false, it: false, sampling: false, qc: false },
  { name: 'SHANGHAI', subtitle: 'Regional Hub', hq: false, sales: true, procurement: true, production: false, warehouse: true, it: true, sampling: true, qc: true },
  { name: 'GUANGZHOU', subtitle: 'South Hub', hq: false, sales: true, procurement: false, production: false, warehouse: true, it: false, sampling: false, qc: false },
  { name: 'CHONGQING', subtitle: 'Production Hub', hq: false, sales: true, procurement: true, production: true, warehouse: true, it: true, sampling: false, qc: true },
  { name: 'SELANGOR', subtitle: 'Malaysia Hub', hq: false, sales: true, procurement: false, production: true, warehouse: true, it: false, sampling: false, qc: false },
];
