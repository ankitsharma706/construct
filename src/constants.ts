import { JournalPost, ProcessStep, Project, Service } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'apex-tower',
    title: 'Apex Corporate Tower',
    location: 'Mumbai, India',
    cost: '₹145 Cr',
    client: 'Apex Global Real Estate',
    area: '1,20,000 sq.ft',
    year: '2024',
    category: 'Commercial',
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    description: 'A benchmark for modern office infrastructure, featuring advanced aerodynamic shaping, unitized unit-system façades, and a responsive structural core.',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000'
    ],
    sections: [
      {
        type: 'narrative',
        title: 'The Vertical sculpture',
        subtitle: 'The Skyline of Tomorrow',
        description: 'The Apex Corporate Tower was conceived as a response to the increasing demand for high-performance infrastructure in dense urban environments. Rather than treating the building as a static entity, the design approach focused on creating a flexible, scalable system capable of adapting to future operational needs.'
      },
      {
        type: 'drawings',
        title: 'Technical Documentation',
        subtitle: 'Engineering Precision',
        description: 'The tower utilizes a tube-in-tube structural system with outrigger trusses. This design minimizes internal columns, allowing for 100% open-plan layouts.',
        images: [
          'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?auto=format&fit=crop&q=80&w=2000',
          'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?auto=format&fit=crop&q=80&w=2000'
        ]
      },
      {
        type: 'gallery',
        title: 'Interior Environments',
        description: 'Optimized acoustics and natural lighting create a high-performance workspace.',
        images: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000',
          'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=2000'
        ]
      }
    ],
    performanceMetrics: [
      { label: 'Space Efficiency', value: '35% Improvement' },
      { label: 'Energy Consumption', value: '28% Reduction' },
      { label: 'Operational Uptime', value: '99.9%' }
    ],
    projectEmail: 'ankitkumar999090@gmail.com'
  },
  {
    id: 'nexus-park',
    title: 'Nexus Tech Park HQ',
    location: 'Bangalore, India',
    cost: '₹85 Cr',
    client: 'Nexus Infrastructure Group',
    area: '2,50,000 sq.ft',
    year: '2023',
    category: 'Commercial',
    modelUrl: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
    description: 'A sustainable technology campus designed for high-density innovation and collaborative research.',
    images: ['https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000'],
    sections: [
      {
        type: 'narrative',
        title: 'Innovation Lab Architecture',
        description: 'Designed as a "Living Laboratory," the campus integrates modular research wings with central collaboration hubs.'
      }
    ],
    projectEmail: 'ankitkumar999090@gmail.com'
  },
  {
  id: 'zenith-hq',
  title: 'Zenith Corporate Headquarters',
  location: 'Mumbai, India',
  cost: '₹210 Cr',
  client: 'Zenith Global',
  area: '1,80,000 sq.ft',
  year: '2025',
  category: 'Commercial',
  modelUrl: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
  description: 'A flagship headquarters integrating intelligent façade systems, adaptive interiors, and high-performance structural design.',
  images: [
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000'
  ],
  sections: [
    {
      type: 'narrative',
      title: 'Corporate Landmark',
      subtitle: 'Identity in Architecture',
      description: 'The Zenith HQ was designed to represent corporate dominance through architectural clarity. The structure integrates flexible workspaces with a highly optimized structural grid.'
    },
    {
      type: 'drawings',
      title: 'Structural System',
      subtitle: 'Engineering Core',
      description: 'A composite steel-concrete system ensures both strength and flexibility, reducing internal columns.',
      images: [
        'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?auto=format&fit=crop&q=80&w=2000',
        'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?auto=format&fit=crop&q=80&w=2000'
      ]
    },
    {
      type: 'gallery',
      title: 'Interior Dynamics',
      description: 'Open-plan workspaces with natural lighting and optimized acoustics.',
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=2000'
      ]
    }
  ],
  performanceMetrics: [
    { label: 'Energy Efficiency', value: '30% Reduction' },
    { label: 'Workspace Density', value: '2,500+ Users' },
    { label: 'Operational Efficiency', value: '40% Improved' }
  ],
  projectEmail: 'ankitkumar999090@gmail.com'
},
{
  id: 'aurora-campus',
  title: 'Aurora IT Innovation Campus',
  location: 'Hyderabad, India',
  cost: '₹300 Cr',
  client: 'Aurora Tech',
  area: '3,20,000 sq.ft',
  year: '2024',
  category: 'Commercial',
  modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
  description: 'A futuristic IT campus designed for innovation, collaboration, and scalable growth.',
  images: [
    
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000'
    ,'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000'
  ],
  sections: [
    {
      type: 'narrative',
      title: 'Innovation Ecosystem',
      subtitle: 'Future Workplace',
      description: 'Designed as a collaborative ecosystem, the campus integrates research labs with flexible office zones.'
    },
    {
      type: 'drawings',
      title: 'Planning Strategy',
      subtitle: 'Spatial Logic',
      description: 'Zonal planning ensures efficient circulation and seamless connectivity.',
      images: [
        'https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&q=80&w=2000',
        'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?auto=format&fit=crop&q=80&w=2000'
      ]
    },
    {
      type: 'gallery',
      title: 'Workspace Interiors',
      description: 'Dynamic interiors designed for collaboration and productivity.',
      images: [
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=2000',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000'
      ]
    }
  ],
  performanceMetrics: [
    { label: 'Collaboration Efficiency', value: '50% Increase' },
    { label: 'Energy Savings', value: '25%' },
    { label: 'User Capacity', value: '5000+' }
  ],
  projectEmail: 'ankitkumar999090@gmail.com'
},
{
  id: 'delta-finance',
  title: 'Delta Finance Tower',
  location: 'Bangalore, India',
  cost: '₹175 Cr',
  client: 'Delta Capital',
  area: '1,10,000 sq.ft',
  year: '2024',
  category: 'Commercial',
  modelUrl: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
  description: 'A high-security financial hub designed for stability, performance, and operational efficiency.',
  images: [
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000'
  ],
  sections: [
    {
      type: 'narrative',
      title: 'Financial Core',
      subtitle: 'Security & Precision',
      description: 'The building integrates secure infrastructure with optimized operational layouts.'
    },
    {
      type: 'drawings',
      title: 'Structural Design',
      subtitle: 'Load Optimization',
      description: 'Advanced structural modeling ensures long-term durability.',
      images: [
        'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?auto=format&fit=crop&q=80&w=2000',
        'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?auto=format&fit=crop&q=80&w=2000'
      ]
    },
    {
      type: 'gallery',
      title: 'Secure Interiors',
      description: 'Controlled environments for financial operations.',
      images: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=2000'
      ]
    }
  ],
  performanceMetrics: [
    { label: 'Security Compliance', value: '100%' },
    { label: 'System Uptime', value: '99.99%' },
    { label: 'Efficiency', value: '35% Improved' }
  ],
  projectEmail: 'ankitkumar999090@gmail.com'
},
{
  id: 'atlas-industrial',
  title: 'Atlas Industrial Logistics Hub',
  location: 'Gujarat, India',
  cost: '₹450 Cr',
  client: 'Atlas Industries',
  area: '5,00,000 sq.ft',
  year: '2025',
  category: 'Industrial',
  modelUrl: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
  description: 'A large-scale logistics hub integrating automation and high-capacity infrastructure.',
  images: [
    'https://www.agcled.com/static/application/Warehouse-Logistic-Lighting.jpg',
    'https://mecaluxcom.cdnwm.com/documents/d/global/m40p12-carretillas-elevadoras?e=jpg'
    
  ],
  sections: [
    {
      type: 'narrative',
      title: 'Industrial Scale',
      subtitle: 'Efficiency at Volume',
      description: 'Designed for high-capacity logistics and automated operations.'
    },
    {
      type: 'drawings',
      title: 'Structural Layout',
      subtitle: 'Heavy Load Systems',
      description: 'Reinforced structures support heavy industrial loads.',
      images: [
        'https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&q=80&w=2000',
        'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?auto=format&fit=crop&q=80&w=2000'
      ]
    },
    {
      type: 'gallery',
      title: 'Operational Zones',
      description: 'Warehousing and logistics optimized for flow efficiency.',
      images: [
        'https://mecaluxcom.cdnwm.com/img/cantilever-racking/cantilever-racks.1.14.jpg',
        'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=2000'
      ]
    }
  ],
  performanceMetrics: [
    { label: 'Logistics Efficiency', value: '45% Increase' },
    { label: 'Processing Speed', value: '2x Faster' },
    { label: 'Capacity', value: '10,000 Units/Day' }
  ],
  projectEmail: 'ankitkumar999090@gmail.com'
},
  {
    id: 'vista-one',
    title: 'Vista One Finance Hub',
    location: 'Hyderabad, India',
    cost: '₹62 Cr',
    client: 'Vista Financial Services',
    area: '34,000 sq.ft',
    year: '2024',
    category: 'Commercial',
    description: 'A premium financial center with high-security infrastructure and modern amenities.',
    
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=2000'
    ],
    sections: [
      {
        type: 'gallery',
        title: 'High-Security Interiors',
        images: [
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=2000',
          'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=2000'
        ]
      }
    ]
  },
  {
    id: 'coastal-bridge',
    title: 'Coastal Infrastructure Bridge',
    location: 'Mumbai, India',
    cost: '₹2,200 Cr',
    client: 'MMRDA',
    year: '2025',
    category: 'Infrastructure',
    description: 'A landmark marine bridge project improving connectivity and travel efficiency.',
    images: ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/60/18/b4/bandra-worli-sea-link.jpg?h=-1&s=1&w=1200','https://etimg.etb2bimg.com/photo/120061775.cms'],
    sections: [
      {
        type: 'gallery',
        title: 'Subaqueous Foundations',
        images: [
          'https://images.unsplash.com/photo-1741192275833-e0bbb505b055?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
          'https://i2.pickpik.com/photos/92/911/803/bay-bridge-architecture-water-reflection-preview.jpg'
        ]
      }
    ]
  },
  {
    id: 'orion-business-complex',
    title: 'Orion Business Complex',
    location: 'Delhi NCR, India',
    cost: '₹150 Cr',
    client: 'Orion Group',
    area: '70,000 sq.ft',
    year: '2024',
    category: 'Commercial',
    description: 'A massive business hub serving multinational corporations in the Delhi NCR region.',
    images: ['https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000'],
    sections: [
      {
        type: 'narrative',
        title: 'Urban Anchor Strategy',
        description: 'Designed as a regional hub with seamless links to rapid transit systems.'
      }
    ]
  }
];

export const SERVICES: Service[] = [
  { id: '1', number: '01', title: 'Design Project', description: 'Comprehensive architectural planning and conceptual design.', price: 'Starts at ₹50L' },
  { id: '2', number: '02', title: 'Infrastructure', description: 'Building the backbone of modern cities.', price: 'Starts at ₹500Cr' },
  { id: '3', number: '03', title: 'Industrial Build', description: 'Specialized construction for manufacturing plants.', price: 'Starts at ₹120Cr' },
  { id: '4', number: '04', title: 'Project Management', description: 'End-to-end oversight ensuring precision.', price: 'Custom Quote' },
  { id: '5', number: '05', title: 'Geotechnical', description: 'Advanced soil analysis and foundation engineering.', price: 'Starts at ₹25L' },
  { id: '6', number: '06', title: 'Urban Planning', description: 'Strategic master planning for resilient environments.', price: 'Starts at ₹80L' },
];

export const PROCESS_STEPS: ProcessStep[] = [
  { number: '01', title: 'Brief', description: 'Understanding vision and constraints.' },
  { number: '02', title: 'Design', description: 'Translating concepts into technical blueprints.' },
  { number: '03', title: 'Build', description: 'Rigorous construction management.' },
  { number: '04', title: 'Handover', description: 'Final delivery and support.' },
];

export const JOURNAL_POSTS: JournalPost[] = [
  {
    id: 'future-concrete',
    category: 'Material Science',
    title: 'The Future of High-Performance Concrete',
    excerpt: 'Deep dive into the chemical evolution of cementitious materials.',
    date: 'Oct 12, 2023',
    author: 'Dr. Aris Thorne',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=2000',
    readTime: '12 min read',
    technicalBrief: [
      { label: 'Strength Class', value: 'C80/95' },
      { label: 'Binder Type', value: 'Geopolymer / LC3' },
      { label: 'Durability Index', value: 'High (Class 4)' }
    ],
    sections: [
      {
        title: 'The Graphene Revolution',
        content: 'Integrating graphene allows for self-sensing concrete structures.',
        image: 'https://images.adsttc.com/media/images/5d84/e93d/284d/d136/3200/0747/large_jpg/futurium-dacian-groza-20180124-06466_Kopie.jpg?1568991542=',
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1755182740856-618bafd66566?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80'
    ],
    authorEmail: 'ankitkumar999090@gmail.com'
  },
  {
    id: 'seismic-resilience',
    category: 'Structural Engineering',
    title: 'Resilient Design: Engineering for Seismic Extremes',
    excerpt: 'How we build structures that remain operational after intense tectonic events.',
    date: 'Oct 28, 2023',
    author: 'Sarah Chen',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&q=80&w=2000',
    readTime: '15 min read',
    technicalBrief: [
      { label: 'Isolation Type', value: 'Base Isolated LRB' },
      { label: 'PGA Resistance', value: '0.45g' },
      { label: 'Standard', value: 'ASCE 7-22' }
    ],
    sections: [
      {
        title: 'The Mechanics of Decoupling',
        content: 'By decoupling the superstructure from the ground via Lead Rubber Bearings (LRB), we can reduce peak acceleration by up to 60%. This "Journey" involves precision placement and calibration of each bearing assembly.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000'
    ]
  },
  {
    id: 'digital-twins',
    category: 'Digital Engineering',
    title: 'Digital Twins: Structural Health in Real-Time',
    excerpt: 'Beyond BIM—using real-time sensor data to predict lifecycle failures.',
    date: 'Nov 10, 2023',
    author: 'Dr. Leo Varghese',
    image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=2000',
    readTime: '18 min read',
    technicalBrief: [
      { label: 'Protocol', value: 'ISO 19650-3' },
      { label: 'Sensor Network', value: 'Low-Latency MQTT' },
      { label: 'Analysis', value: 'FEA Neural Net' }
    ],
    sections: [
      {
        title: 'Closing the Feedback Loop',
        content: 'A Digital Twin is more than a model—it is a live reflection. By embedding fiber-optic sensors into the primary steel, we can detect micro-strains before they manifest as cracks.',
        image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=2000'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80'
    ],
    authorEmail: 'ankitkumar999090@gmail.com'
    
  },
  {
    id: 'sustainable-façades',
    category: 'Architecture',
    title: 'The Intelligent Skin: Responsive Façade Engineering',
    excerpt: 'Triple-glazing and automated shading systems for net-zero energy buildings.',
    date: 'Nov 22, 2023',
    author: 'Anya Rossi',
    image: 'https://png.pngtree.com/thumb_back/fw800/background/20250323/pngtree-modern-business-district-in-rotterdam-showcasing-futuristic-facade-design-photo-photo-image_69755606.webp',
    readTime: '14 min read',
    technicalBrief: [
      { label: 'U-Value', value: '0.65 W/m²K' },
      { label: 'Automation', value: 'BIM-Linked Sensors' },
      { label: 'Type', value: 'Unitized DGU' }
    ],
    sections: [
      {
        title: 'Thermal Management',
        content: 'Responsive façades treat the building envelope as a lung. They breathe and adapt to the solar intensity, maintaining internal stability without heavy HVAC reliance.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1755182740856-618bafd66566?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80'
    ],authorEmail: 'ankitsharma18.net@gmail.com'
  },
  {
    id: 'marine-foundations',
    category: 'Marine Engineering',
    title: 'Subaqueous Foundations: The Deep Piling Journey',
    excerpt: 'Engineering piles that withstand tidal forces and corrosive salt-water environments.',
    date: 'Dec 05, 2023',
    author: 'Capt. Marcus Webb',
    image: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=2000',
    readTime: '20 min read',
    technicalBrief: [
      { label: 'Pile Diameter', value: '2500mm' },
      { label: 'Concrete', value: 'C100 Marine Mix' },
      { label: 'Depth', value: '45m Below Seabed' }
    ],
    sections: [
      {
        title: 'Piling Precision in Tidal Zones',
        content: 'Driving 2.5m diameter piles into a seabed requires a coordination of geotechnical analysis and maritime logistics. The Journey involves real-time sonar monitoring of the "Digital Bed" during cast.',
      image: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=2000',
        
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000'
    ],
    authorEmail: 'ankitsharma18.net@gmail.com'
  },
  {
    id: 'adaptive-reuse',
    category: 'Urban Planning',
    title: 'Adaptive Reuse: Breathing Life into Industrial Voids',
    excerpt: 'Transforming legacy textile mills into modern, LEED Platinum corporate hubs.',
    date: 'Dec 15, 2023',
    author: 'Elena Moretti',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=2000',
    readTime: '16 min read',
    technicalBrief: [
      { label: 'Method', value: 'Structural Remediation' },
      { label: 'Energy Saved', value: '45% (Embodied)' },
      { label: 'Certification', value: 'LEED Platinum' }
    ],
    sections: [
      {
        title: 'Preserving the Core',
        content: 'The journey of adaptive reuse is one of respect. We maintain the original high-strength concrete shells while retrofitting them with unitized façades and smart MEP systems.',
        image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=2000'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=2000'
    ]
  },
  {
    id: 'post-tensioned-slabs',
    category: 'Structural Engineering',
    title: 'High-Span Engineering: The PT Slab Revolution',
    excerpt: 'Achieving 20-meter column-free spans using high-tensile steel tendon arrays.',
    date: 'Jan 04, 2024',
    author: 'Samir Kapur',
    image: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&q=80&w=2000',
    readTime: '12 min read',
    technicalBrief: [
      { label: 'Tendon Type', value: 'Bonded Multistrand' },
      { label: 'Max Span', value: '22m' },
      { label: 'Concrete Gr', value: 'M60' }
    ],
    sections: [
      {
        title: 'Deflection Control',
        content: 'Post-tensioning allows us to "active" the slab. By stressing the internal tendons, we introduce an upward camber that perfectly counteracts the gravity loads.',
        image: 'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?auto=format&fit=crop&q=80&w=2000'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?auto=format&fit=crop&q=80&w=2000'
    ]
  },
  {
    id: 'geotechnical-precision',
    category: 'Geotechnical Science',
    title: 'Soil Stabilization: Engineering the Unstable Ground',
    excerpt: 'Precision foundation engineering in reclaimed coastal terrains and marshlands.',
    date: 'Jan 18, 2024',
    author: 'Dr. Rita Shah',
    image: 'https://metaguise.com/assets/Blogs/Building-Exterior/building-exterior-design-company-india-metal-facade-parametric.jpg',
    readTime: '17 min read',
    technicalBrief: [
      { label: 'Method', value: 'Vibro-Compaction' },
      { label: 'Pile Type', value: 'Cast-in-Situ RC' },
      { label: 'Soil Grade', value: 'Stratified Silt' }
    ],
    sections: [
      {
        title: 'The Bedrock Journey',
        content: 'When the ground is fluid, the engineering must be rigid. We utilize automated soil-grouting systems to create "artificial bedrock" before the primary piling phase begins.',
        image: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=2000'
      }
    ],
    gallery: [
      'https://metaguise.com/assets/Blogs/Building-Exterior/building-exterior-design-company-india-metal-facade-parametric.jpg',
      'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=2000'
    ]
  },
  {
    id: 'acoustic-sanctuary',
    category: 'Interior Science',
    title: 'The Silent Core: Acoustic Engineering in Finance Hubs',
    excerpt: 'Engineering the silence required for high-frequency trading and high-value negotiation.',
    date: 'Feb 02, 2024',
    author: 'Silvia Thorne',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000',
    readTime: '13 min read',
    technicalBrief: [
      { label: 'Target STC', value: '65 dB' },
      { label: 'Material', value: 'High-Density Composite' },
      { label: 'Isolation', value: 'Resilient Channels' }
    ],
    sections: [
      {
        title: 'Isolation Strategies',
        content: 'Architecture isn\'t just what you see—it\'s what you don\'t hear. Our "Journey" into acoustic engineering uses decoupled wall systems to ensure zero-seepage of urban noise into client meeting zones.',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=2000'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=2000'
    ]
  },
  {
    id: 'urban-masterplanning',
    category: 'Urban Planning',
    title: 'The Kinetic Masterplan: Cities that Learn',
    excerpt: 'Using AI and multi-modal transit analysis to design the next generation of smart city hubs.',
    date: 'Feb 15, 2024',
    author: 'Javier Luna',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000',
    readTime: '22 min read',
    technicalBrief: [
      { label: 'Metric', value: '15-Min City Access' },
      { label: 'Tech', value: 'Predictive Flow AI' },
      { label: 'Focus', value: 'Transit-Oriented Dev' }
    ],
    sections: [
      {
        title: 'Flow Dynamics',
        content: 'A masterplan is a living organism. By analyzing heatmaps of urban movement, we can position transit nodes for maximum efficiency and minimum friction.',
        image: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?auto=format&fit=crop&q=80&w=2000'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?auto=format&fit=crop&q=80&w=2000'
    ],
    authorEmail: 'ankitsharma18.net@gmail.com'
  }
];
