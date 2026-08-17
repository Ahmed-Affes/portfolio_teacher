# Farah Affes — English Educator & DIY Material Designer

A modern, responsive, and interactive educator portfolio and educational resource shop built with **Next.js 16 (Turbopack)**, **React 19**, **Tailwind CSS v4**, and **Lucide Icons**.

---

## ✨ Features

- 🎓 **Educator Showcase**: Overview of teaching philosophy, classroom instruction, and linguistics expertise.
- 🎨 **Portfolio & Visual Aids Gallery**: Interactive filtered gallery showcasing educational posters, workshop flyers, and classroom moments with image lightbox previews.
- 🎥 **Video Lessons Hub**: Dedicated mini-lesson player with modal video previews for pronunciation and grammar tips.
- 🛍️ **Resource & DIY Material Hub**: Shop interface for printable worksheets, DIY phonics wheels, vocabulary dice, and tactile story kits with purchase and local rental options.
- 🛒 **Interactive Cart System**: Slide-out cart drawer with local storage persistence and automated order draft generation via email.
- 📬 **Interactive Contact System**: Direct inquiry form with real-time validation, plus WhatsApp and direct email contact options.
- 📱 **Fully Responsive & Accessible**: Optimized for mobile, tablet, and desktop screens with smooth scrolling, navigation tracking, and back-to-top button.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Type Checking**: [TypeScript 5](https://www.typescriptlang.org/)
- **Linting**: [ESLint 9](https://eslint.org/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18+ or 20+) installed.

### Installation

```bash
# Clone the repository
git clone https://github.com/Ahmed-Affes/portfolio_teacher.git
cd portfolio_teacher

# Install dependencies
npm install
```

### Development Server

Run the development server locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
# Type check and build optimized static/production files
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```

---

## 📁 Project Structure

```
├── app/
│   ├── globals.css         # Global Tailwind v4 styles and color tokens
│   ├── layout.tsx          # Root layout with fonts, metadata, and analytics
│   └── page.tsx            # Main portfolio one-page landing layout
├── components/
│   ├── ui/                 # Reusable UI primitives (buttons, etc.)
│   ├── about.tsx           # Educator bio and highlights
│   ├── back-to-top.tsx     # Floating scroll-to-top button
│   ├── cart-drawer.tsx     # Slide-out shopping cart drawer
│   ├── cart-provider.tsx   # React context for shopping cart state
│   ├── contact.tsx         # Contact form and channels
│   ├── faq.tsx             # Collapsible FAQ section
│   ├── hero.tsx            # Hero section with headline and statistics
│   ├── providers.tsx       # Root React context providers wrapper
│   ├── resource-shop.tsx   # DIY prop and printable downloads store
│   ├── section-heading.tsx # Consistent section headers
│   ├── site-footer.tsx     # Footer navigation and contact info
│   ├── site-header.tsx     # Sticky header with active section tracking
│   ├── testimonials.tsx    # Parent & teacher reviews
│   ├── toast-provider.tsx  # Toast notification system
│   ├── videos.tsx          # Video mini-lesson showcase and player
│   ├── who-i-serve.tsx     # Target audience breakdown
│   └── work-showcase.tsx   # Filterable teaching gallery with lightbox
├── lib/
│   ├── data.ts             # Portfolio content, products, and links
│   └── utils.ts            # Class name merge utilities (clsx & tailwind-merge)
├── public/                 # Static assets, images, and icons
├── eslint.config.mjs       # ESLint 9 configuration
├── next.config.mjs         # Next.js configuration
├── package.json            # Project dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
