export type CraftCategory = {
  id: string
  name: string
  region: string
  image: string
  blurb: string
}

export type Artisan = {
  id: string
  name: string
  craft: string
  state: string
  village: string
  avatar: string
  cover: string
  verified: boolean
  experience: number
  rating: number
  story: string
  quote: string
}

export type Product = {
  id: string
  name: string
  craft: string
  state: string
  price: number
  rating: number
  reviews: number
  image: string
  artisanId: string
  materials: string
  handmade: boolean
  tags: string[]
}

export type MarketMatch = {
  id: string
  partner: string
  type: 'Boutique' | 'Exhibition' | 'Export House' | 'Online Store'
  location: string
  match: number
  craftFocus: string
  reach: string
  image: string
}

export type VerificationRequest = {
  id: string
  name: string
  craft: string
  state: string
  submitted: string
  documents: number
  status: 'pending' | 'approved' | 'rejected'
  avatar: string
  proofType?: string
  proofId?: string
  artisanId?: string
}


/* Authentic Indian craft imagery from Unsplash */
export const categories: CraftCategory[] = [
  {
    id: 'madhubani',
    name: 'Madhubani',
    region: 'Bihar',
    image:
      'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?q=80&w=1200&auto=format&fit=crop',
    blurb: 'Ancient folk painting of Mithila, alive with gods, nature and geometry.',
  },
  {
    id: 'blue-pottery',
    name: 'Blue Pottery',
    region: 'Rajasthan',
    image:
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1200&auto=format&fit=crop',
    blurb: 'Jaipurâ€™s cobalt-glazed ceramics, hand-thrown and fired without clay.',
  },
  {
    id: 'kalamkari',
    name: 'Kalamkari',
    region: 'Andhra Pradesh',
    image:
      'https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=1200&auto=format&fit=crop',
    blurb: 'Pen-drawn and block-printed textiles dyed with roots and flowers.',
  },
  {
    id: 'mysore-silk',
    name: 'Mysore Silk',
    region: 'Karnataka',
    image:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop',
    blurb: 'Lustrous pure-silk weaves edged with real gold zari.',
  },
  {
    id: 'warli',
    name: 'Warli',
    region: 'Maharashtra',
    image:
      'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?q=80&w=1200&auto=format&fit=crop',
    blurb: 'Tribal white-on-earth murals telling stories of everyday harmony.',
  },
  {
    id: 'pattachitra',
    name: 'Pattachitra',
    region: 'Odisha',
    image:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop',
    blurb: 'Cloth-based scroll painting rich in mythology and fine detail.',
  },
]

export const artisans: Artisan[] = [
  {
    id: 'a1',
    name: 'Sunita Devi',
    craft: 'Madhubani',
    state: 'Bihar',
    village: 'Jitwarpur',
    avatar:
      'https://images.unsplash.com/photo-1616002411355-49593fd89721?q=80&w=400&auto=format&fit=crop',
    cover:
      'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?q=80&w=1400&auto=format&fit=crop',
    verified: true,
    experience: 28,
    rating: 4.9,
    story:
      'Sunita learned Madhubani at her grandmotherâ€™s knee, grinding pigments from marigold and soot. For nearly three decades she has painted the walls and paper of Jitwarpur, a village where every home is a canvas. Today she leads a collective of 40 women, turning a dying wall-art tradition into a livelihood that sends their daughters to school.',
    quote: 'Each line I draw carries the prayers of my mothers before me.',
  },
  {
    id: 'a2',
    name: 'Ramesh Prajapati',
    craft: 'Blue Pottery',
    state: 'Rajasthan',
    village: 'Sanganer',
    avatar:
      'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=400&auto=format&fit=crop',
    cover:
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1400&auto=format&fit=crop',
    verified: true,
    experience: 22,
    rating: 4.8,
    story:
      'A fourth-generation potter from Sanganer, Ramesh shapes the famous cobalt ceramics of Jaipur using a centuries-old recipe of quartz, glass and gum â€” never ordinary clay. His workshop trains young men who would otherwise migrate to cities for factory work.',
    quote: 'Fire decides the final colour. I only guide the earth toward it.',
  },
  {
    id: 'a3',
    name: 'Lakshmi Reddy',
    craft: 'Kalamkari',
    state: 'Andhra Pradesh',
    village: 'Srikalahasti',
    avatar:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop',
    cover:
      'https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=1400&auto=format&fit=crop',
    verified: true,
    experience: 19,
    rating: 4.9,
    story:
      'Lakshmi hand-draws epics onto cotton with a bamboo pen dipped in fermented jaggery and iron. A single wall hanging can take her forty days. She revived natural indigo dyeing in her town after chemical dyes nearly erased the craft.',
    quote: 'Nature gives every colour. My job is only to listen to it.',
  },
  {
    id: 'a4',
    name: 'Kariyanna Gowda',
    craft: 'Mysore Silk',
    state: 'Karnataka',
    village: 'Ramanagara',
    avatar:
      'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?q=80&w=400&auto=format&fit=crop',
    cover:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1400&auto=format&fit=crop',
    verified: false,
    experience: 34,
    rating: 4.7,
    story:
      'Kariyanna has sat at the handloom since he was twelve, weaving pure silk saris finished with real gold zari. His family has served weddings across Karnataka for generations, and he now digitises his designs so they are never lost.',
    quote: 'A sari is a lifetime folded into six yards.',
  },
  {
    id: 'a5',
    name: 'Jivya Mhase',
    craft: 'Warli',
    state: 'Maharashtra',
    village: 'Ganjad',
    avatar:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop',
    cover:
      'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?q=80&w=1400&auto=format&fit=crop',
    verified: true,
    experience: 25,
    rating: 4.8,
    story:
      'Born into the Warli tribe of the Sahyadri hills, Jivya paints the rice-paste figures that celebrate the circle of village life â€” sowing, dancing, marriage and harvest. His work has traveled to galleries abroad while he still lives simply among the fields he paints.',
    quote: 'We do not draw for decoration. We draw to remember who we are.',
  },
  {
    id: 'a6',
    name: 'Basanti Mahapatra',
    craft: 'Pattachitra',
    state: 'Odisha',
    village: 'Raghurajpur',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    cover:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1400&auto=format&fit=crop',
    verified: true,
    experience: 21,
    rating: 4.9,
    story:
      'From Raghurajpur, a heritage crafts village where every family paints, Basanti prepares her own cloth canvas with tamarind paste and chalk before rendering intricate scenes of Jagannath in mineral colours. She mentors girls in her courtyard each evening.',
    quote: 'Patience is the first colour on my palette.',
  },
]

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Tree of Life Madhubani Painting',
    craft: 'Madhubani',
    state: 'Bihar',
    price: 3200,
    rating: 4.9,
    reviews: 128,
    image:
      'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?q=80&w=1000&auto=format&fit=crop',
    artisanId: 'a1',
    materials: 'Handmade paper, natural pigments',
    handmade: true,
    tags: ['Wall Art', 'Folk', 'Eco-friendly'],
  },
  {
    id: 'p2',
    name: 'Cobalt Blue Pottery Vase',
    craft: 'Blue Pottery',
    state: 'Rajasthan',
    price: 1850,
    rating: 4.8,
    reviews: 96,
    image:
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1000&auto=format&fit=crop',
    artisanId: 'a2',
    materials: 'Quartz, glass powder, cobalt glaze',
    handmade: true,
    tags: ['Home Decor', 'Ceramic'],
  },
  {
    id: 'p3',
    name: 'Kalamkari Cotton Wall Hanging',
    craft: 'Kalamkari',
    state: 'Andhra Pradesh',
    price: 4600,
    rating: 4.9,
    reviews: 74,
    image:
      'https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=1000&auto=format&fit=crop',
    artisanId: 'a3',
    materials: 'Cotton, natural vegetable dyes',
    handmade: true,
    tags: ['Textile', 'Natural Dye', 'Heritage'],
  },
  {
    id: 'p4',
    name: 'Pure Mysore Silk Sari',
    craft: 'Mysore Silk',
    state: 'Karnataka',
    price: 12500,
    rating: 4.7,
    reviews: 210,
    image:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
    artisanId: 'a4',
    materials: 'Pure silk, gold zari',
    handmade: true,
    tags: ['Sari', 'Bridal', 'Luxury'],
  },
  {
    id: 'p5',
    name: 'Warli Village Life Canvas',
    craft: 'Warli',
    state: 'Maharashtra',
    price: 2400,
    rating: 4.8,
    reviews: 63,
    image:
      'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?q=80&w=1000&auto=format&fit=crop',
    artisanId: 'a5',
    materials: 'Canvas, rice paste, earth base',
    handmade: true,
    tags: ['Tribal', 'Wall Art', 'Minimal'],
  },
  {
    id: 'p6',
    name: 'Pattachitra Jagannath Scroll',
    craft: 'Pattachitra',
    state: 'Odisha',
    price: 5400,
    rating: 4.9,
    reviews: 51,
    image:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1000&auto=format&fit=crop',
    artisanId: 'a6',
    materials: 'Treated cloth, mineral colours',
    handmade: true,
    tags: ['Mythology', 'Scroll', 'Collector'],
  },
  {
    id: 'p7',
    name: 'Madhubani Peacock Coasters (Set of 6)',
    craft: 'Madhubani',
    state: 'Bihar',
    price: 950,
    rating: 4.6,
    reviews: 89,
    image:
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1000&auto=format&fit=crop',
    artisanId: 'a1',
    materials: 'Mango wood, natural pigments',
    handmade: true,
    tags: ['Tableware', 'Gift', 'Eco-friendly'],
  },
  {
    id: 'p8',
    name: 'Blue Pottery Tea Set',
    craft: 'Blue Pottery',
    state: 'Rajasthan',
    price: 3600,
    rating: 4.7,
    reviews: 42,
    image:
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1000&auto=format&fit=crop',
    artisanId: 'a2',
    materials: 'Quartz, food-safe glaze',
    handmade: true,
    tags: ['Kitchen', 'Ceramic', 'Gift'],
  },
]

export const marketMatches: MarketMatch[] = [
  {
    id: 'm1',
    partner: 'Fabindia Signature',
    type: 'Boutique',
    location: 'Delhi NCR',
    match: 96,
    craftFocus: 'Handloom textiles & Kalamkari',
    reach: '2.4M annual footfall',
    image:
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'm2',
    partner: 'Surajkund Craft Mela',
    type: 'Exhibition',
    location: 'Faridabad, Haryana',
    match: 92,
    craftFocus: 'Folk & tribal art',
    reach: '1.2M visitors in 15 days',
    image:
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'm3',
    partner: 'Anthropologie Home',
    type: 'Export House',
    location: 'United States',
    match: 88,
    craftFocus: 'Artisanal ceramics & decor',
    reach: 'Retail across 200+ stores',
    image:
      'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'm4',
    partner: 'Jaypore Online',
    type: 'Online Store',
    location: 'Pan-India',
    match: 85,
    craftFocus: 'Curated heritage crafts',
    reach: '900K monthly shoppers',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop',
  },
]

export const verificationQueue: VerificationRequest[] = [
  {
    id: 'v1',
    name: 'Kariyanna Gowda',
    craft: 'Mysore Silk',
    state: 'Karnataka',
    submitted: '2 days ago',
    documents: 3,
    status: 'pending',
    avatar:
      'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?q=80&w=200&auto=format&fit=crop',
    proofType: 'Ministry of Textiles Pehchan Card',
    proofId: 'PEHCHAN-KA-2023-9941',
    artisanId: 'a4',
  },
  {
    id: 'v2',
    name: 'Meera Chitrakar',
    craft: 'Pattachitra',
    state: 'West Bengal',
    submitted: '4 days ago',
    documents: 2,
    status: 'pending',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    proofType: 'State Craft Council Artisan Card',
    proofId: 'WB-CRAFT-2022-4102',
  },
  {
    id: 'v3',
    name: 'Abdul Karim',
    craft: 'Pashmina Weaving',
    state: 'Jammu & Kashmir',
    submitted: '5 days ago',
    documents: 4,
    status: 'pending',
    avatar:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop',
    proofType: 'Pashmina GI Registry & Weaver ID',
    proofId: 'JK-HANDICRAFT-8821',
  },
]


export const indianStates = [
  {
    id: 'bihar',
    name: 'Bihar',
    crafts: ['Madhubani', 'Sujni Embroidery', 'Sikki Grass'],
    image:
      'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    crafts: ['Blue Pottery', 'Block Printing', 'Bandhani'],
    image:
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'andhra',
    name: 'Andhra Pradesh',
    crafts: ['Kalamkari', 'Kondapalli Toys', 'Bidri'],
    image:
      'https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    crafts: ['Mysore Silk', 'Channapatna Toys', 'Sandalwood'],
    image:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    crafts: ['Warli', 'Paithani', 'Kolhapuri Chappal'],
    image:
      'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'odisha',
    name: 'Odisha',
    crafts: ['Pattachitra', 'Silver Filigree', 'Ikat'],
    image:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'kashmir',
    name: 'Jammu & Kashmir',
    crafts: ['Pashmina', 'Papier-mÃ¢chÃ©', 'Walnut Carving'],
    image:
      'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    crafts: ['Patola', 'Rogan Art', 'Kutch Embroidery'],
    image:
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=800&auto=format&fit=crop',
  },
]

export const craftTypes = [
  'Madhubani',
  'Blue Pottery',
  'Kalamkari',
  'Mysore Silk',
  'Warli',
  'Pattachitra',
]

export const stateNames = [
  'Bihar',
  'Rajasthan',
  'Andhra Pradesh',
  'Karnataka',
  'Maharashtra',
  'Odisha',
]

export function formatINR(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function getArtisan(id: string) {
  return artisans.find((a) => a.id === id)
}

export function getArtisanProducts(id: string) {
  return products.filter((p) => p.artisanId === id)
}
