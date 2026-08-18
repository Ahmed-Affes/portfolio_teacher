export type NavItem = { id: string; label: string }

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'videos', label: 'Videos' },
  { id: 'shop', label: 'Shop' },
  { id: 'serve', label: 'Services' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
]

export const STATS = [
  { value: '6+', label: 'Years teaching English' },
  { value: '120+', label: 'DIY props designed' },
  { value: '40+', label: 'Workshops delivered' },
  { value: '900+', label: 'Learners reached' },
]

export type WorkCategory = 'all' | 'posters' | 'flyers' | 'classroom'

export type WorkItem = {
  id: string
  title: string
  category: Exclude<WorkCategory, 'all'>
  tag: string
  image: string
  description: string
}

export const WORK_ITEMS: WorkItem[] = [
  {
    id: 'w1',
    title: 'Phonics & Alphabet Wall',
    category: 'posters',
    tag: 'Visual guide',
    image: '/images/poster-phonics.png',
    description:
      'A colorful, print-ready phonics wall that turns letter sounds into an interactive daily reference for young learners.',
  },
  {
    id: 'w2',
    title: 'Irregular Verbs Cheat Sheet',
    category: 'posters',
    tag: 'Grammar',
    image: '/images/poster-verbs.png',
    description:
      'A structured irregular-verbs poster that helps students master tricky conjugations at a glance.',
  },
  {
    id: 'w3',
    title: 'Storytelling Workshop Flyer',
    category: 'flyers',
    tag: 'Event',
    image: '/images/flyer-workshop.png',
    description:
      'Announcement flyer designed for a hands-on English storytelling workshop for children.',
  },
  {
    id: 'w4',
    title: 'Summer Reading Challenge',
    category: 'flyers',
    tag: 'Campaign',
    image: '/images/flyer-reading.png',
    description:
      'A cheerful reading-challenge flyer that motivates learners to read through the summer break.',
  },
  {
    id: 'w5',
    title: 'Hands-on Vocabulary Session',
    category: 'classroom',
    tag: 'In action',
    image: '/images/classroom-1.png',
    description:
      'Students building sentences with handmade flashcards during an interactive vocabulary lesson.',
  },
  {
    id: 'w6',
    title: 'Phonics Wheel Demo',
    category: 'classroom',
    tag: 'Workshop',
    image: '/images/classroom-2.png',
    description:
      'Demonstrating a handmade phonics wheel to a small group during a teacher-training workshop.',
  },
]

export type Video = {
  id: string
  title: string
  duration: string
  level: string
  thumbnail: string
  src: string
}

// Royalty-free sample clips stand in for the real lesson videos.
export const VIDEOS: Video[] = [
  {
    id: 'v1',
    title: 'Mini Lesson: Mastering the /th/ Sound',
    duration: '2:14',
    level: 'Beginner',
    thumbnail: '/images/video-lesson.png',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    id: 'v2',
    title: 'Irregular Verbs Made Simple',
    duration: '3:41',
    level: 'Intermediate',
    thumbnail: '/images/video-grammar.png',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  },
  {
    id: 'v3',
    title: 'Classroom Story Time in Action',
    duration: '4:05',
    level: 'All levels',
    thumbnail: '/images/classroom-1.png',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  },
]

export type Product = {
  id: string
  name: string
  category: string
  image: string
  description: string
  options: ('buy' | 'rent')[]
  buyPrice?: number
  rentPrice?: number
}

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Printable Worksheet Bundle',
    category: 'Digital Download',
    image: '/images/product-worksheets.png',
    description:
      'Printable PDF worksheets, flashcards, and poster templates ready to download and use in any lesson.',
    options: ['buy'],
    buyPrice: 12,
  },
  {
    id: 'p2',
    name: 'Handmade Story Kit',
    category: 'Physical DIY Prop',
    image: '/images/product-story-kit.png',
    description:
      'A tactile storytelling kit with felt characters and story cards to bring English narratives to life.',
    options: ['buy', 'rent'],
    buyPrice: 45,
    rentPrice: 9,
  },
  {
    id: 'p3',
    name: 'Phonics Wheel',
    category: 'Physical DIY Prop',
    image: '/images/product-phonics-wheel.png',
    description:
      'A rotating phonics wheel that makes blending letter sounds playful and hands-on for early readers.',
    options: ['buy', 'rent'],
    buyPrice: 22,
    rentPrice: 5,
  },
  {
    id: 'p4',
    name: 'Vocabulary Dice Set',
    category: 'Physical DIY Prop',
    image: '/images/product-vocab-dice.png',
    description:
      'Oversized vocabulary dice with words and pictures — perfect for speaking games and warm-ups.',
    options: ['buy', 'rent'],
    buyPrice: 18,
    rentPrice: 4,
  },
]

export type Audience = {
  id: string
  title: string
  intro: string
  points: string[]
}

export const AUDIENCES: Audience[] = [
  {
    id: 'students',
    title: 'For Students',
    intro: 'Engaging lessons and interactive tools that build real confidence.',
    points: [
      'Interactive DIY study tools & games',
      'Downloadable guides and practice sheets',
      'Fun challenges and video mini-lessons',
    ],
  },
  {
    id: 'parents',
    title: 'For Parents',
    intro: 'Clear communication and resources to support learning at home.',
    points: [
      'Regular progress updates',
      'Home-learning tips and routines',
      'Tactile study games for family time',
    ],
  },
  {
    id: 'teachers',
    title: 'For Teachers & Educators',
    intro: 'Ready-made and custom materials to elevate your classroom.',
    points: [
      'Material rentals for workshops',
      'Custom DIY prop design',
      'Printable resources & complete kits',
    ],
  },
]

export const TESTIMONIALS = [
  {
    quote:
      "Farah's phonics wheel completely changed how my daughter approaches reading. She actually asks to practice now!",
    name: 'Amira B.',
    role: 'Parent',
  },
  {
    quote:
      'I rented a full workshop kit for my classroom and it was flawless — well made, thoughtful, and the kids loved every activity.',
    name: 'Sonia K.',
    role: 'Primary School Teacher',
  },
  {
    quote:
      'The printable bundles save me hours of prep every week. Clear, beautiful, and genuinely useful materials.',
    name: 'Youssef M.',
    role: 'ESL Tutor',
  },
]

export const FAQS = [
  {
    q: 'How does renting DIY materials work?',
    a: 'Rentals are available locally. You choose a kit, pick your dates through the contact form, and I prepare everything ready-to-use. Props are cleaned and quality-checked between every rental.',
  },
  {
    q: 'Are the printable downloads reusable?',
    a: 'Yes. Once you purchase a digital bundle you receive print-ready PDFs you can reprint as many times as you need for your own classroom or home use.',
  },
  {
    q: 'Can you design a custom prop or poster?',
    a: 'Absolutely. Custom design is one of my favorite parts of the work. Send me your theme, level, and goals through the contact form and I will put together a proposal.',
  },
  {
    q: 'Do you offer workshops for teachers?',
    a: 'Yes — I run hands-on workshops on building tactile learning aids and interactive lessons. Reach out for available dates and group sizes.',
  },
]

export const CONTACT = {
  email: 'affesfarah6@gmail.com',
  whatsapp: '+216 00 000 000',
  location: 'Tunis, Tunisia',
}
