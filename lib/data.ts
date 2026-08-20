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
  { value: '6+', label: 'Years in education' },
  { value: '120+', label: 'DIY props crafted' },
  { value: '40+', label: 'Teacher workshops' },
  { value: '900+', label: 'Learners inspired' },
]

export type WorkCategory = 'all' | 'props' | 'posters' | 'flyers' | 'classroom' | 'worksheets'

export type WorkItem = {
  id: string
  title: string
  category: Exclude<WorkCategory, 'all'>
  tag: string
  image: string
  description: string
  year?: string
  format?: string
  highlights?: string[]
  subtitle?: string
  priceBuy?: number
  priceRent?: number
  dimensions?: string
  materials?: string[]
  tags?: string[]
  isFeatured?: boolean
  isActive?: boolean
}

export const WORK_ITEMS: WorkItem[] = [
  {
    id: 'w1',
    title: 'Interactive Phonics & Alphabet Wall',
    category: 'posters',
    tag: 'Visual Guide',
    image: '/images/poster-phonics.png',
    description:
      'A print-ready phonics wall mapping phonetic vowel blends and consonant clusters with tactile color-coding for young readers.',
    year: '2024',
    format: 'Printable Poster · A1/A2',
    highlights: ['Phoneme-grapheme mapping', 'Visual memory cues', 'Multilingual scaffolding'],
  },
  {
    id: 'w2',
    title: 'Irregular Verbs Master Map',
    category: 'posters',
    tag: 'Grammar Guide',
    image: '/images/poster-verbs.png',
    description:
      'A structured visual cheat sheet grouping 80+ tricky English irregular verbs by rhyming and vowel-shift patterns rather than alphabetical order.',
    year: '2024',
    format: 'High-Res Wall Guide',
    highlights: ['Pattern-based memorization', 'Color-coded tenses', 'Quick classroom reference'],
  },
  {
    id: 'w3',
    title: 'Interactive Storytelling Workshop Flyer',
    category: 'flyers',
    tag: 'Event Design',
    image: '/images/flyer-workshop.png',
    description:
      'Editorial promotional flyer and registration guide designed for an immersive weekend English storytelling workshop for kids.',
    year: '2024',
    format: 'Digital & Print Flyer',
    highlights: ['Engaging visual hierarchy', 'Bilingual parent details', 'High-conversion layout'],
  },
  {
    id: 'w4',
    title: 'Summer Reading & Literacy Challenge',
    category: 'flyers',
    tag: 'Campaign',
    image: '/images/flyer-reading.png',
    description:
      'A cheerful, gamified summer reading passport that motivates ESL learners to read 20 books across different genres with reward stamps.',
    year: '2024',
    format: 'Passport & Campaign Flyer',
    highlights: ['Gamified milestone tracking', 'Family reading logs', 'Printable reward stamps'],
  },
  {
    id: 'w5',
    title: 'Handmade Storytelling Felt Kit',
    category: 'props',
    tag: 'DIY Physical Prop',
    image: '/images/product-story-kit.png',
    description:
      'A tactile storytelling board with interchangeable felt characters, scenery backdrops, and prompt cards to build spoken narrative skills.',
    year: '2024',
    format: 'Physical Prop Kit · Rent / Buy',
    highlights: ['Felt & wood craftsmanship', 'Supports oral storytelling', 'Adaptable to 10+ tales'],
  },
  {
    id: 'w6',
    title: 'Kinesthetic Rotating Phonics Wheel',
    category: 'props',
    tag: 'DIY Physical Prop',
    image: '/images/product-phonics-wheel.png',
    description:
      'Double-disc tactile phonics dial enabling children to spin onset consonants and rime endings to physically construct and pronounce 100+ CVC words.',
    year: '2023',
    format: 'Physical Craft / Wood & Card',
    highlights: ['Kinesthetic learning', 'Self-correcting design', 'Durable laminated finish'],
  },
  {
    id: 'w7',
    title: 'Oversized Vocabulary Action Dice Set',
    category: 'props',
    tag: 'DIY Physical Prop',
    image: '/images/product-vocab-dice.png',
    description:
      'Lightweight oversized dice pairing action verbs with illustrated contextual cues for energetic ESL warm-ups and team speaking games.',
    year: '2023',
    format: 'Set of 4 Physical Dice',
    highlights: ['Active movement learning', 'Speaking prompt generator', 'Classroom tested'],
  },
  {
    id: 'w8',
    title: 'Comprehensive ESL Worksheet & Activity Bundle',
    category: 'worksheets',
    tag: 'Digital Pack',
    image: '/images/product-worksheets.png',
    description:
      'A 60-page curriculum bundle featuring illustrated grammar quests, vocabulary mazes, paired dialogue worksheets, and exit tickets.',
    year: '2024',
    format: 'Print-Ready PDF Bundle',
    highlights: ['60+ reproducible pages', 'Differentiated difficulty', 'Answer keys included'],
  },
  {
    id: 'w9',
    title: 'Collaborative Vocabulary Building in Action',
    category: 'classroom',
    tag: 'Classroom Moment',
    image: '/images/classroom-1.png',
    description:
      'Young learners collaborating in teams to construct descriptive sentences using handmade color-coded tactile flashcards.',
    year: '2024',
    format: 'Live Lesson Documentation',
    highlights: ['Active student engagement', 'Peer-to-peer scaffolding', 'Low anxiety environment'],
  },
  {
    id: 'w10',
    title: 'Teacher Training & Prop Demonstration Workshop',
    category: 'classroom',
    tag: 'Teacher Workshop',
    image: '/images/classroom-2.png',
    description:
      'Demonstrating tactile prop integration and communicative drills to primary school educators during a hands-on pedagogical seminar.',
    year: '2024',
    format: 'Educator Workshop',
    highlights: ['Prop making demo', 'Interactive lesson sequencing', 'Classroom management tips'],
  },
  {
    id: 'w11',
    title: 'Immersive Grammar Escape Game Materials',
    category: 'worksheets',
    tag: 'Game Kit',
    image: '/images/hero-classroom.png',
    description:
      'A thematic classroom escape quest where students solve riddle cards, decipher secret codes, and correct sentence errors to unlock reward boxes.',
    year: '2024',
    format: 'Printable Activity Kit',
    highlights: ['Team puzzle mechanics', 'Grammar review in disguise', 'High excitement format'],
  },
  {
    id: 'w12',
    title: 'Custom Thematic Flashcard Sets',
    category: 'props',
    tag: 'Classroom Aids',
    image: '/images/product-phonics-wheel.png',
    description:
      'Durable, illustrated flashcard decks for everyday conversational scenarios (ordering food, airport travel, describing emotions).',
    year: '2023',
    format: 'Handcrafted Deck of 50 Cards',
    highlights: ['Original vector artwork', 'Dual-sided prompts', 'Laminated durability'],
  },
]

export type VideoCategory = 'all' | 'pronunciation' | 'grammar' | 'storytelling' | 'workshop'

export type Video = {
  id: string
  title: string
  duration: string
  level: string
  category: Exclude<VideoCategory, 'all'>
  thumbnail: string
  src: string
  videoUrl?: string
  description?: string
  ageGroup?: string
  takeaways?: string[]
  isActive?: boolean
}

export const VIDEOS: Video[] = [
  {
    id: 'v1',
    title: 'Mastering the /th/ Sound: Voiced vs. Voiceless',
    duration: '2:14',
    level: 'Beginner',
    category: 'pronunciation',
    thumbnail: '/images/video-lesson.png',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    takeaways: [
      'Tongue-between-teeth physical placement technique',
      'Vocal chord vibration testing with fingers on throat',
      'Minimal pairs practice: "think" vs "this"',
    ],
  },
  {
    id: 'v2',
    title: 'Irregular Verbs Made Visual & Effortless',
    duration: '3:41',
    level: 'Intermediate',
    category: 'grammar',
    thumbnail: '/images/video-grammar.png',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    takeaways: [
      'Grouping irregular verbs by rhyme vowel shifts (sing/sang/sung)',
      'Avoiding rote memorization with contextual sentences',
      'Rapid fire oral recall game demo',
    ],
  },
  {
    id: 'v3',
    title: 'Interactive Storytelling in the Classroom',
    duration: '4:05',
    level: 'All levels',
    category: 'storytelling',
    thumbnail: '/images/classroom-1.png',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    takeaways: [
      'Using vocal inflection and suspense pauses',
      'Physical prop integration to spark questions',
      'Encouraging choral student participation',
    ],
  },
  {
    id: 'v4',
    title: 'Crafting Tactile Phonics Wheels on a Budget',
    duration: '3:15',
    level: 'Educators',
    category: 'workshop',
    thumbnail: '/images/classroom-2.png',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    takeaways: [
      'Materials needed: cardboard, split pins, laminating sheets',
      'Choosing high-utility word family rimes (-at, -op, -in)',
      'Classroom storage and durability tips',
    ],
  },
  {
    id: 'v5',
    title: 'Past Continuous vs. Simple Past with Visual Timelines',
    duration: '2:50',
    level: 'Intermediate',
    category: 'grammar',
    thumbnail: '/images/hero-classroom.png',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    takeaways: [
      'The "interrupted action" visual metaphor',
      'Key trigger words: "while" vs "when"',
      'Real-world story scenarios',
    ],
  },
  {
    id: 'v6',
    title: 'Phonemic Awareness: Short Vowel Discrimination',
    duration: '3:05',
    level: 'Beginner',
    category: 'pronunciation',
    thumbnail: '/images/video-lesson.png',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    takeaways: [
      'Jaw drop and lip shape visual cues',
      'Sorting games for /æ/ (cat) vs /e/ (bed)',
      'Fun physical jumping drills for young learners',
    ],
  },
]

export type Product = {
  id: string
  name: string
  title?: string
  subtitle?: string
  category: string
  format?: string
  image: string
  description: string
  options: ('buy' | 'rent')[]
  buyPrice?: number
  rentPrice?: number
  priceBuy?: number
  priceRent?: number
  badge?: string
  tags?: string[]
  features?: string[]
  isActive?: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Printable ESL Worksheet & Activity Bundle',
    category: 'Digital Download',
    image: '/images/product-worksheets.png',
    description:
      'Print-ready PDF worksheets, flashcards, and poster templates ready to download, customize, and print for unlimited classroom use.',
    options: ['buy'],
    buyPrice: 12,
    features: ['60+ PDF Pages', 'Instant Digital Access', 'Answer Keys Included'],
  },
  {
    id: 'p2',
    name: 'Handmade Storytelling Felt Kit',
    category: 'Physical DIY Prop',
    image: '/images/product-story-kit.png',
    description:
      'A tactile storytelling kit with felt characters, background scenery, and prompt cards to bring English narratives to vivid life.',
    options: ['buy', 'rent'],
    buyPrice: 45,
    rentPrice: 9,
    features: ['Handcrafted Felt', '15 Character Pieces', 'Rental Available in Tunis'],
  },
  {
    id: 'p3',
    name: 'Rotating Phonics Blending Wheel',
    category: 'Physical DIY Prop',
    image: '/images/product-phonics-wheel.png',
    description:
      'A double-layer rotating phonics wheel that makes blending letter sounds playful and hands-on for early readers.',
    options: ['buy', 'rent'],
    buyPrice: 22,
    rentPrice: 5,
    features: ['Double-Disc Mechanism', '100+ Word Blends', 'Laminated Finish'],
  },
  {
    id: 'p4',
    name: 'Oversized Vocabulary Dice Set',
    category: 'Physical DIY Prop',
    image: '/images/product-vocab-dice.png',
    description:
      'Oversized vocabulary dice with words and pictures — perfect for active speaking games, warm-ups, and group challenges.',
    options: ['buy', 'rent'],
    buyPrice: 18,
    rentPrice: 4,
    features: ['Set of 4 Dice', 'Lightweight Foam Core', 'Action Verb Themes'],
  },
]

export type Audience = {
  id: string
  title: string
  subtitle?: string
  ageGroup?: string
  icon?: string
  focus?: string
  intro: string
  points: string[]
  isActive?: boolean
}

export const AUDIENCES: Audience[] = [
  {
    id: 'students',
    title: 'For Students',
    intro: 'Engaging lessons and interactive tools that build real confidence in speaking and writing.',
    points: [
      'Interactive DIY study tools & kinesthetic games',
      'Downloadable visual guides and practice sheets',
      'Fun weekly challenges and video mini-lessons',
    ],
  },
  {
    id: 'parents',
    title: 'For Parents',
    intro: 'Clear communication, home routines, and resources to support language acquisition naturally.',
    points: [
      'Clear, actionable feedback on learning milestones',
      'Practical home-learning tips and daily routines',
      'Tactile study games designed for family playtime',
    ],
  },
  {
    id: 'teachers',
    title: 'For Teachers & Educators',
    intro: 'Ready-made materials, prop rentals, and custom aids to elevate your classroom experience.',
    points: [
      'Prop & material rentals for workshops and special units',
      'Custom DIY prop design tailored to your curriculum',
      'Printable resource packs and complete hands-on kits',
    ],
  },
]

export type MilestoneCategory = 'education' | 'career' | 'life' | 'achievement'

export type CareerMilestone = {
  id: string
  period: string
  title: string
  organization: string
  category: MilestoneCategory
  categoryLabel: string
  description: string
  image?: string
  images?: string[]
  highlights: string[]
  badgeEmoji?: string
  isActive?: boolean
}

export const CAREER_MILESTONES: CareerMilestone[] = [
  // =========================================================================
  // CHAPTER 1: EDUCATION (2 Milestones)
  // =========================================================================
  {
    id: 'm1',
    period: '2018 — 2021',
    title: 'Bachelor’s Degree in English Language, Literature & Linguistics',
    organization: 'Faculty of Letters & Humanities of Sfax',
    category: 'education',
    categoryLabel: 'Academic Degree',
    badgeEmoji: '🎓',
    image: '/images/farah-portrait.png',
    images: [
      '/images/farah-portrait.png',
      '/images/product-worksheets.png',
      '/images/poster-phonics.png',
      '/images/poster-verbs.png',
    ],
    description:
      'Specialized in Applied English Linguistics, Phonetics, and Communicative Language Teaching (CLT). Researched how multi-sensory and phonetic awareness accelerates second-language fluency for young learners.',
    highlights: ['Phonetics & Phonology', 'Communicative Language Teaching', 'Children’s Literature'],
    isActive: true,
  },
  {
    id: 'm1_2',
    period: '2021',
    title: 'Advanced Phonology Practicum & ESL Methodology Honors',
    organization: 'Linguistic Research Department • Sfax',
    category: 'education',
    categoryLabel: 'Pedagogical Practicum',
    badgeEmoji: '📜',
    image: '/images/product-worksheets.png',
    images: [
      '/images/product-worksheets.png',
      '/images/poster-phonics.png',
      '/images/flyer-reading.png',
    ],
    description:
      'Conducted field research on lowering the affective filter in bilingual primary classrooms through rhythm, physical gestures, and interactive syllable mapping.',
    highlights: ['Affective Filter Science', 'Syllable Mapping', 'Early Literacy Pedagogy'],
    isActive: true,
  },

  // =========================================================================
  // CHAPTER 2: TEACHING CAREER (4 Milestones)
  // =========================================================================
  {
    id: 'm2',
    period: '2021 — Present',
    title: 'Primary & Middle School English Teacher',
    organization: 'Private & Public Primary Schools • Sfax, Tunisia',
    category: 'career',
    categoryLabel: 'Teaching Career',
    badgeEmoji: '💼',
    image: '/images/classroom-1.png',
    images: [
      '/images/classroom-1.png',
      '/images/hero-classroom.png',
      '/images/classroom-2.png',
      '/images/video-lesson.png',
    ],
    description:
      'Over 6+ years instructing vibrant student cohorts. Implemented kinesthetic grammar games, drama circles, and interactive storytelling quests that lower learning anxiety and spark confident speaking.',
    highlights: ['900+ Learners Taught', 'Gamified ESL Curricula', 'Confidence-First Speaking'],
    isActive: true,
  },
  {
    id: 'm2_2',
    period: '2022 — Present',
    title: 'ESL Drama Club Director & Creative Storytelling Coach',
    organization: 'Youth Educational Hub • Sfax',
    category: 'career',
    categoryLabel: 'Drama & Storytelling',
    badgeEmoji: '🎭',
    image: '/images/classroom-2.png',
    images: [
      '/images/classroom-2.png',
      '/images/hero-classroom.png',
      '/images/video-grammar.png',
    ],
    description:
      'Directs weekly communicative theater sketches where students write, costume, and perform original short plays in English, building spontaneous oral fluency and teamwork.',
    highlights: ['Interactive Theater', 'Spontaneous Oral Fluency', 'Script Writing Drills'],
    isActive: true,
  },
  {
    id: 'm2_3',
    period: '2023 — Present',
    title: 'Kinesthetic Phonics & Early Literacy Specialist',
    organization: 'Montessori & Early Years Academy',
    category: 'career',
    categoryLabel: 'Early Literacy',
    badgeEmoji: '🔤',
    image: '/images/video-lesson.png',
    images: [
      '/images/video-lesson.png',
      '/images/classroom-1.png',
      '/images/poster-phonics.png',
    ],
    description:
      'Pioneered tactile phonemic awareness stations using sensory letter tracing, sound matching pouches, and double-disc blending wheels for emergent bilingual readers.',
    highlights: ['Tactile Sound Tracing', 'Sound Matching Pouches', 'Blending Drills'],
    isActive: true,
  },
  {
    id: 'm2_4',
    period: '2024 — Present',
    title: 'Differentiated Remedial & Confidence-First Coach',
    organization: 'Community Literacy Program',
    category: 'career',
    categoryLabel: 'Remedial Support',
    badgeEmoji: '🌱',
    image: '/images/hero-classroom.png',
    images: [
      '/images/hero-classroom.png',
      '/images/classroom-2.png',
      '/images/flyer-reading.png',
    ],
    description:
      'Provides dedicated micro-group scaffolding for students struggling with second-language anxiety, accelerating their reading comprehension and self-esteem through low-pressure visual games.',
    highlights: ['Micro-Group Scaffolding', 'Anxiety-Free Coaching', 'Reading Acceleration'],
    isActive: true,
  },

  // =========================================================================
  // CHAPTER 3: CREATIVE ATELIER (3 Milestones)
  // =========================================================================
  {
    id: 'm3',
    period: '2022 — Present',
    title: 'Founder & Head Designer — Farah Creative Atelier',
    organization: 'Tactile Learning Studio & Material Lab',
    category: 'life',
    categoryLabel: 'Creative Atelier',
    badgeEmoji: '✂️',
    image: '/images/product-phonics-wheel.png',
    images: [
      '/images/product-phonics-wheel.png',
      '/images/product-story-kit.png',
      '/images/product-vocab-dice.png',
      '/images/poster-phonics.png',
    ],
    description:
      'Turned a lifelong passion for craft and child psychology into a full educational material laboratory. Handcrafts felt storytelling boards, double-disc phonics dials, and bespoke sensory aids rented and loved by teachers across Tunisia.',
    highlights: ['Handmade Felt & Wood Craft', '100+ Custom Learning Aids', 'Teacher Prop Rentals'],
    isActive: true,
  },
  {
    id: 'm3_2',
    period: '2023 — Present',
    title: 'Creator of the Double-Disc Phonics Dial & Story Kit',
    organization: 'Educational Aids Innovation Lab',
    category: 'life',
    categoryLabel: 'Prop Invention',
    badgeEmoji: '🎯',
    image: '/images/product-story-kit.png',
    images: [
      '/images/product-story-kit.png',
      '/images/product-phonics-wheel.png',
      '/images/product-worksheets.png',
    ],
    description:
      'Engineered rotating concentric phonics dials and magnetic felt boards that transform abstract phoneme blending into a satisfying, tactile physical game.',
    highlights: ['Concentric Dial Mechanics', 'Magnetic Felt Boards', 'Child-Safe Materials'],
    isActive: true,
  },
  {
    id: 'm3_3',
    period: '2024 — Present',
    title: 'National Teacher Prop Rental & Sensory Kit Library',
    organization: 'Serving Schools & Tutors Across Tunisia',
    category: 'life',
    categoryLabel: 'Rental Program',
    badgeEmoji: '📦',
    image: '/images/product-vocab-dice.png',
    images: [
      '/images/product-vocab-dice.png',
      '/images/product-story-kit.png',
      '/images/poster-verbs.png',
    ],
    description:
      'Established a sharing library where primary schools and independent tutoring centers can rent rotating thematic prop crates for seasonal English units.',
    highlights: ['Seasonal Thematic Crates', 'School Rental Library', 'Sanitized & Durable Sets'],
    isActive: true,
  },

  // =========================================================================
  // CHAPTER 4: WORKSHOPS & TRAINING (2 Milestones)
  // =========================================================================
  {
    id: 'm4',
    period: '2023 — Present',
    title: 'Teacher Trainer & Pedagogical Workshop Host',
    organization: 'Tunisian Educator Seminars & Online Masterclasses',
    category: 'achievement',
    categoryLabel: 'Teacher Training',
    badgeEmoji: '🌟',
    image: '/images/classroom-2.png',
    images: [
      '/images/classroom-2.png',
      '/images/flyer-workshop.png',
      '/images/flyer-reading.png',
      '/images/hero-classroom.png',
    ],
    description:
      'Conducts hands-on masterclasses demonstrating how teachers can craft their own low-cost, high-impact DIY classroom props and design student-centered visual materials.',
    highlights: ['Educator Seminars', 'Prop Building Masterclasses', 'Printable ESL Bundles'],
    isActive: true,
  },
  {
    id: 'm4_2',
    period: '2024 — Present',
    title: 'Keynote Speaker on Tactile ESL Pedagogy',
    organization: 'National Language Teaching Symposium',
    category: 'achievement',
    categoryLabel: 'Keynote & Symposium',
    badgeEmoji: '🏆',
    image: '/images/flyer-workshop.png',
    images: [
      '/images/flyer-workshop.png',
      '/images/classroom-2.png',
      '/images/hero-classroom.png',
    ],
    description:
      'Presented research and live demonstrations to 300+ educators on bridging theoretical linguistics with tactile classroom toys to maximize early childhood engagement.',
    highlights: ['300+ Educators Reached', 'Keynote Demonstration', 'Published Visual Frameworks'],
    isActive: true,
  },
]


export const ABOUT_PILLARS = [
  {
    id: 'linguistics',
    number: '01',
    title: 'Linguistics & Applied Pedagogy',
    subtitle: 'Natural Acquisition Science',
    description:
      'Rooted in communicative language teaching (CLT) and phonetic awareness. I break down complex syntactic and phonological rules into intuitive, playful patterns that lower learners’ affective filter.',
    highlights: ['Phoneme-Grapheme Mapping', 'Communicative Fluency', 'Affective Filter Reduction'],
  },
  {
    id: 'props',
    number: '02',
    title: 'Tactile DIY Material Crafting',
    subtitle: 'Turning Abstract into Tangible',
    description:
      'Every physical prop — from rotating phonics wheels to felt storytelling kits — is designed from scratch, tested with real students, and crafted to withstand enthusiastic classroom energy.',
    highlights: ['Kinesthetic Engagement', 'Custom Wood & Felt Aids', 'Classroom-Tested Durability'],
  },
  {
    id: 'classroom',
    number: '03',
    title: '6+ Years Classroom Experience',
    subtitle: 'Proven Student Growth',
    description:
      'Years of direct classroom teaching across primary, middle, and young-adult cohorts. I combine structured discipline with infectious enthusiasm so every student feels celebrated.',
    highlights: ['900+ Learners Taught', 'Small-Group Scaffolding', 'Active Movement Drills'],
  },
  {
    id: 'design',
    number: '04',
    title: 'Content & Material Publishing',
    subtitle: 'Print-Ready Visual Excellence',
    description:
      'High-impact visual aids, differentiated worksheets, and workshop flyers designed with pristine typography and clear cognitive hierarchy to eliminate classroom confusion.',
    highlights: ['Vector Typography', 'Differentiated Practice', 'Ready-to-Print Formats'],
  },
]

export const TESTIMONIALS = [
  {
    quote:
      "Farah's phonics wheel completely changed how my daughter approaches reading. She actually asks to practice now instead of dreading it!",
    name: 'Amira B.',
    role: 'Parent of 7-year-old learner',
  },
  {
    quote:
      'I rented a full workshop kit for my primary classroom and it was flawless — thoughtfully organized, robustly made, and the kids loved every single activity.',
    name: 'Sonia K.',
    role: 'Primary School Teacher, Tunis',
  },
  {
    quote:
      'The printable bundles save me hours of prep every week. Crisp, beautiful, and genuinely pedagogically sound materials.',
    name: 'Youssef M.',
    role: 'ESL Tutor & Educational Consultant',
  },
]

export const FAQS = [
  {
    q: 'How does renting DIY classroom materials work?',
    a: 'Rentals are available locally in the greater Tunis area. You select a prop kit, choose your desired dates through the contact form or cart, and Farah prepares everything sanitized and ready-to-use with teacher activity guides.',
  },
  {
    q: 'Are digital printable downloads reusable?',
    a: 'Yes! Once you purchase a digital resource bundle, you receive lifetime access to high-resolution, print-ready PDF files that you can print as many times as needed for your own classroom or home learning.',
  },
  {
    q: 'Can you design a custom teaching prop or poster for my class?',
    a: 'Absolutely! Custom pedagogical design is one of Farah’s specialties. Share your target age, grammar topic or phonics goal, and timeline via the contact form to receive a tailored concept and quote.',
  },
  {
    q: 'Do you offer teacher-training workshops on DIY material creation?',
    a: 'Yes — Farah hosts hands-on workshops for school faculties and independent educators on building engaging tactile learning aids and gamifying ESL lesson plans. Inquire for dates and group bookings.',
  },
]

export const CONTACT = {
  email: 'affesfarah6@gmail.com',
  whatsapp: '+216 52 095 014',
  whatsappRaw: '21652095014',
  location: 'Sfax, Tunisia',
}
