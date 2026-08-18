'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  BookOpen,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Edit3,
  ExternalLink,
  Eye,
  FileText,
  GraduationCap,
  Heart,
  HelpCircle,
  Inbox,
  Key,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Palette,
  Phone,
  Plus,
  RotateCcw,
  Save,
  Send,
  Settings,
  ShoppingBag,
  Sparkles,
  Star,
  Trash2,
  Upload,
  User,
  Video,
  X,
} from 'lucide-react'
import {
  usePortfolio,
  type WorkItem,
  type Video as VideoType,
  type Product,
  type Audience,
  type TestimonialItem,
  type FaqItem,
  type StatItem,
  type StoredOrder,
  type StoredMessage,
} from '@/lib/portfolio-context'
import { useToast } from '@/components/toast-provider'
import { cn } from '@/lib/utils'

type AdminTab =
  | 'overview'
  | 'hero'
  | 'about'
  | 'works'
  | 'videos'
  | 'shop'
  | 'audiences'
  | 'testimonials'
  | 'faqs'
  | 'contact'
  | 'inbox'
  | 'orders'
  | 'settings'

export default function AdminPage() {
  const {
    state,
    updateHero,
    updateAbout,
    updateContact,
    addWork,
    updateWork,
    deleteWork,
    addVideo,
    updateVideo,
    deleteVideo,
    addProduct,
    updateProduct,
    deleteProduct,
    addAudience,
    updateAudience,
    deleteAudience,
    addAudiencePoint,
    removeAudiencePoint,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addFaq,
    updateFaq,
    deleteFaq,
    updateStats,
    updateOrderStatus,
    deleteOrder,
    markMessageRead,
    deleteMessage,
    updateAdminPin,
    resetToDefaults,
    exportDataJson,
    importDataJson,
  } = usePortfolio()

  const { toast } = useToast()

  // PIN Gate State
  const [enteredPin, setEnteredPin] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pinError, setPinError] = useState(false)

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('overview')

  // Live Section Preview Modal State
  const [previewSection, setPreviewSection] = useState<string | null>(null)

  // Form State for Hero
  const [heroForm, setHeroForm] = useState(state.hero)

  // Form State for About
  const [aboutForm, setAboutForm] = useState(state.about)

  // Form State for Contact
  const [contactForm, setContactForm] = useState(state.contact)

  // Form State for Stats
  const [statsForm, setStatsForm] = useState(state.stats)

  // Modals for Items CRUD
  const [editingWork, setEditingWork] = useState<WorkItem | null>(null)
  const [isAddingWork, setIsAddingWork] = useState(false)

  const [editingVideo, setEditingVideo] = useState<VideoType | null>(null)
  const [isAddingVideo, setIsAddingVideo] = useState(false)

  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  const [editingAudience, setEditingAudience] = useState<Audience | null>(null)
  const [isAddingAudience, setIsAddingAudience] = useState(false)

  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null)
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false)

  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null)
  const [isAddingFaq, setIsAddingFaq] = useState(false)

  // Settings: New PIN
  const [newPin, setNewPin] = useState('')

  // Handle PIN Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (enteredPin === state.adminPin || enteredPin === 'farah2026') {
      setIsAuthenticated(true)
      setPinError(false)
      toast('Welcome back, Farah! Admin Studio is unlocked.')
    } else {
      setPinError(true)
      toast('Incorrect PIN. Default is farah2026')
    }
  }

  // Synchronize local form states when switching tabs or state update
  const syncLocalForms = () => {
    setHeroForm(state.hero)
    setAboutForm(state.about)
    setContactForm(state.contact)
    setStatsForm(state.stats)
  }

  // If not authenticated, render Luxury PIN Unlock Gate
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute left-1/2 top-1/3 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />
          <div className="grid-paper absolute inset-0 opacity-40" />
        </div>

        <div className="w-full max-w-md overflow-hidden rounded-3xl border border-border/80 bg-card p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                <Lock className="size-8" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-secondary text-white ring-2 ring-background">
                <Sparkles className="size-3.5 text-primary" />
              </span>
            </div>

            <h1 className="font-serif text-2xl font-bold text-foreground">Teacher Admin Studio</h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Farah Affes Portfolio &amp; Workshop Management System
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-foreground">
                Enter Studio Access PIN
              </label>
              <div className="relative">
                <Key className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
                <input
                  type="password"
                  autoFocus
                  value={enteredPin}
                  onChange={(e) => {
                    setEnteredPin(e.target.value)
                    setPinError(false)
                  }}
                  placeholder="Enter PIN (e.g. farah2026)"
                  className={cn(
                    'w-full rounded-xl border bg-background py-2.5 pl-10 pr-4 text-sm font-medium tracking-wider text-foreground outline-none transition-all focus:ring-2',
                    pinError
                      ? 'border-destructive focus:ring-destructive/30'
                      : 'border-border focus:border-primary focus:ring-primary/25',
                  )}
                />
              </div>
              {pinError && (
                <p className="mt-1.5 text-xs text-destructive">
                  Incorrect PIN. Please enter your secret code.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              <Lock className="size-4" />
              Unlock Admin Portal
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
            <Link href="/" className="inline-flex items-center gap-1 hover:text-foreground">
              <ArrowLeft className="size-3.5" /> Back to Portfolio
            </Link>
            <span className="text-[0.7rem]">Default: farah2026</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Admin Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="group flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-2.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              View Live Portfolio
              <ExternalLink className="size-3 text-muted-foreground" />
            </Link>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="size-3.5" />
              </span>
              <span className="font-serif text-sm font-bold sm:text-base">Farah Studio Portal</span>
              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[0.65rem] font-bold text-foreground">
                Admin v2.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const data = exportDataJson()
                const blob = new Blob([data], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `farah-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`
                a.click()
                toast('Full Portfolio Backup downloaded!')
              }}
              title="Backup Data"
              className="hidden items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted sm:inline-flex"
            >
              <Download className="size-3.5" />
              Backup
            </button>

            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/20"
            >
              <LogOut className="size-3.5" />
              Lock
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Layout */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          {/* Sidebar Navigation */}
          <aside className="flex flex-row gap-1 overflow-x-auto rounded-2xl border border-border/80 bg-card p-2 shadow-xs lg:flex-col lg:overflow-visible">
            {[
              { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, badge: null },
              { id: 'hero', label: 'Hero & Intro', icon: Sparkles, badge: null },
              { id: 'about', label: 'About & Pedagogy', icon: BookOpen, badge: null },
              { id: 'works', label: 'Work Showcase', icon: Palette, badge: state.works.length },
              { id: 'videos', label: 'Video Lessons', icon: Video, badge: state.videos.length },
              { id: 'shop', label: 'Resource Shop', icon: ShoppingBag, badge: state.products.length },
              { id: 'audiences', label: 'Target Audiences', icon: GraduationCap, badge: state.audiences.length },
              { id: 'testimonials', label: 'Testimonials', icon: Star, badge: state.testimonials.length },
              { id: 'faqs', label: 'FAQ Section', icon: HelpCircle, badge: state.faqs.length },
              { id: 'contact', label: 'Contact Info', icon: Phone, badge: null },
              {
                id: 'inbox',
                label: 'Messages Inbox',
                icon: Inbox,
                badge: state.messages.filter((m) => m.status === 'unread').length,
                badgeAlert: true,
              },
              {
                id: 'orders',
                label: 'Orders & Rentals',
                icon: Package,
                badge: state.orders.filter((o) => o.status === 'pending').length,
                badgeAlert: true,
              },
              { id: 'settings', label: 'Studio Settings', icon: Settings, badge: null },
            ].map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id as AdminTab)
                    syncLocalForms()
                  }}
                  className={cn(
                    'flex shrink-0 items-center justify-between gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all lg:w-full',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-4 shrink-0" />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </div>
                  {item.badge !== null && item.badge > 0 && (
                    <span
                      className={cn(
                        'rounded-full px-1.5 py-0.2 text-[0.65rem] font-bold',
                        isActive
                          ? 'bg-primary-foreground/20 text-primary-foreground'
                          : item.badgeAlert
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </aside>

          {/* Tab Content Area */}
          <main className="space-y-6">
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card to-card p-6 shadow-sm sm:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-foreground">
                        <Sparkles className="size-3.5 text-primary" /> Farah Affes Studio Control
                      </span>
                      <h2 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">
                        Welcome to your Portfolio Studio
                      </h2>
                      <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        Manage every text, video, DIY prop, rental item, incoming inquiry, and customer order from Sfax and beyond.
                      </p>
                    </div>

                    <Link
                      href="/"
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg hover:shadow-xl"
                    >
                      Open Live Website <ExternalLink className="size-3.5" />
                    </Link>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-2xl border border-border/80 bg-background/80 p-4">
                      <p className="text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">
                        Work Showcase
                      </p>
                      <p className="mt-1 font-serif text-2xl font-bold text-foreground sm:text-3xl">
                        {state.works.length}
                      </p>
                      <p className="text-[0.65rem] text-muted-foreground">Props, posters, worksheets</p>
                    </div>

                    <div className="rounded-2xl border border-border/80 bg-background/80 p-4">
                      <p className="text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">
                        Shop Products
                      </p>
                      <p className="mt-1 font-serif text-2xl font-bold text-foreground sm:text-3xl">
                        {state.products.length}
                      </p>
                      <p className="text-[0.65rem] text-muted-foreground">Buy &amp; Rent materials</p>
                    </div>

                    <div className="rounded-2xl border border-border/80 bg-background/80 p-4">
                      <p className="text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">
                        Pending Orders
                      </p>
                      <p className="mt-1 font-serif text-2xl font-bold text-primary sm:text-3xl">
                        {state.orders.filter((o) => o.status === 'pending').length}
                      </p>
                      <p className="text-[0.65rem] text-muted-foreground">Awaiting WhatsApp confirm</p>
                    </div>

                    <div className="rounded-2xl border border-border/80 bg-background/80 p-4">
                      <p className="text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">
                        New Inquiries
                      </p>
                      <p className="mt-1 font-serif text-2xl font-bold text-foreground sm:text-3xl">
                        {state.messages.filter((m) => m.status === 'unread').length}
                      </p>
                      <p className="text-[0.65rem] text-muted-foreground">In Messages Inbox</p>
                    </div>
                  </div>
                </div>

                {/* Quick Action Shortcuts */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('works')
                      setIsAddingWork(true)
                    }}
                    className="flex items-center gap-3 rounded-2xl border border-border/80 bg-card p-4 text-left shadow-xs transition-all hover:border-primary hover:shadow-md"
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/20 text-foreground">
                      <Plus className="size-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Add New Portfolio Work</h4>
                      <p className="text-[0.7rem] text-muted-foreground">Upload photos of DIY props or worksheets</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('shop')
                      setIsAddingProduct(true)
                    }}
                    className="flex items-center gap-3 rounded-2xl border border-border/80 bg-card p-4 text-left shadow-xs transition-all hover:border-primary hover:shadow-md"
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/20 text-foreground">
                      <ShoppingBag className="size-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Add Shop Resource</h4>
                      <p className="text-[0.7rem] text-muted-foreground">Set buy &amp; rental pricing in TND</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('orders')}
                    className="flex items-center gap-3 rounded-2xl border border-border/80 bg-card p-4 text-left shadow-xs transition-all hover:border-primary hover:shadow-md"
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/20 text-foreground">
                      <Package className="size-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">View Orders &amp; Rentals</h4>
                      <p className="text-[0.7rem] text-muted-foreground">Dispatch via WhatsApp to Sfax &amp; Tunisia</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* 2. HERO & STATS TAB */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold">Hero Section &amp; Quick Stats</h2>
                    <p className="text-xs text-muted-foreground">
                      Edit the headline, bio introduction, badges, and above-the-fold statistics.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewSection('hero')}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted"
                    >
                      <Eye className="size-3.5 text-primary" />
                      Live Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateHero(heroForm)
                        updateStats(statsForm)
                        toast('Hero Section & Stats saved successfully!')
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:shadow-md"
                    >
                      <Save className="size-3.5" />
                      Save Changes
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-xs">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-semibold">Eyebrow Badge Text</label>
                      <input
                        type="text"
                        value={heroForm.eyebrow}
                        onChange={(e) => setHeroForm({ ...heroForm, eyebrow: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold">Highlighted Word (Yellow Underline)</label>
                      <input
                        type="text"
                        value={heroForm.highlightWord}
                        onChange={(e) => setHeroForm({ ...heroForm, highlightWord: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-semibold">Title Prefix</label>
                      <input
                        type="text"
                        value={heroForm.titlePrefix}
                        onChange={(e) => setHeroForm({ ...heroForm, titlePrefix: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold">Title Suffix (Gradient Text)</label>
                      <input
                        type="text"
                        value={heroForm.titleSuffix}
                        onChange={(e) => setHeroForm({ ...heroForm, titleSuffix: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold">Bio Paragraph</label>
                    <textarea
                      rows={3}
                      value={heroForm.bio}
                      onChange={(e) => setHeroForm({ ...heroForm, bio: e.target.value })}
                      className="w-full resize-none rounded-lg border border-border bg-background p-2.5 text-xs text-foreground outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-semibold">Primary CTA Button</label>
                      <input
                        type="text"
                        value={heroForm.ctaWorkText}
                        onChange={(e) => setHeroForm({ ...heroForm, ctaWorkText: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold">Secondary CTA Button</label>
                      <input
                        type="text"
                        value={heroForm.ctaContactText}
                        onChange={(e) => setHeroForm({ ...heroForm, ctaContactText: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Real Numerical Stats Editor */}
                <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-xs">
                  <div>
                    <h3 className="font-serif text-base font-bold">Real Numerical Stats (Above the Fold)</h3>
                    <p className="text-xs text-muted-foreground">
                      Ensure all numbers reflect your genuine experience, learner impact, and props created.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-4">
                    {statsForm.map((stat, i) => (
                      <div key={stat.id || i} className="rounded-xl border border-border bg-muted/30 p-3">
                        <label className="mb-1 block text-[0.65rem] font-bold uppercase text-muted-foreground">
                          Stat #{i + 1} Label
                        </label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const next = [...statsForm]
                            next[i].label = e.target.value
                            setStatsForm(next)
                          }}
                          className="w-full rounded-lg border border-border bg-background p-1.5 text-xs font-semibold text-foreground outline-none focus:border-primary"
                        />
                        <label className="mb-1 mt-2 block text-[0.65rem] font-bold uppercase text-muted-foreground">
                          Value
                        </label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const next = [...statsForm]
                            next[i].value = e.target.value
                            setStatsForm(next)
                          }}
                          className="w-full rounded-lg border border-border bg-background p-1.5 text-sm font-bold text-primary outline-none focus:border-primary"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. ABOUT & PEDAGOGY TAB */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold">About Farah &amp; Pedagogical Pillars</h2>
                    <p className="text-xs text-muted-foreground">
                      Edit the narrative story, manifesto quote, location, and the 4 methodology pillars.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewSection('about')}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted"
                    >
                      <Eye className="size-3.5 text-primary" />
                      Live Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateAbout(aboutForm)
                        toast('About Section & Pillars saved successfully!')
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:shadow-md"
                    >
                      <Save className="size-3.5" />
                      Save Changes
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-xs">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-xs font-semibold">Section Eyebrow</label>
                      <input
                        type="text"
                        value={aboutForm.eyebrow}
                        onChange={(e) => setAboutForm({ ...aboutForm, eyebrow: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground outline-none focus:border-primary"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-xs font-semibold">Main Heading</label>
                      <input
                        type="text"
                        value={aboutForm.title}
                        onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold">Intro Subtitle</label>
                    <input
                      type="text"
                      value={aboutForm.intro}
                      onChange={(e) => setAboutForm({ ...aboutForm, intro: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-semibold">Narrative Bio (Paragraph 1)</label>
                      <textarea
                        rows={3}
                        value={aboutForm.bio1}
                        onChange={(e) => setAboutForm({ ...aboutForm, bio1: e.target.value })}
                        className="w-full resize-none rounded-lg border border-border bg-background p-2.5 text-xs text-foreground outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold">Narrative Bio (Paragraph 2)</label>
                      <textarea
                        rows={3}
                        value={aboutForm.bio2}
                        onChange={(e) => setAboutForm({ ...aboutForm, bio2: e.target.value })}
                        className="w-full resize-none rounded-lg border border-border bg-background p-2.5 text-xs text-foreground outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3">
                    <h4 className="text-xs font-bold text-foreground">Core Manifesto Quote Card</h4>
                    <div>
                      <label className="mb-1 block text-xs font-semibold">Quote Text</label>
                      <textarea
                        rows={2}
                        value={aboutForm.manifestoQuote}
                        onChange={(e) => setAboutForm({ ...aboutForm, manifestoQuote: e.target.value })}
                        className="w-full resize-none rounded-lg border border-border bg-background p-2 text-xs text-foreground outline-none focus:border-primary"
                      />
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-semibold">Author</label>
                        <input
                          type="text"
                          value={aboutForm.manifestoAuthor}
                          onChange={(e) => setAboutForm({ ...aboutForm, manifestoAuthor: e.target.value })}
                          className="w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold">Location</label>
                        <input
                          type="text"
                          value={aboutForm.manifestoLocation}
                          onChange={(e) => setAboutForm({ ...aboutForm, manifestoLocation: e.target.value })}
                          className="w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Pedagogical Pillars Editor */}
                <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-xs">
                  <h3 className="font-serif text-base font-bold">Pedagogical Pillars (Interactive Navigator)</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {aboutForm.pillars.map((pillar, idx) => (
                      <div key={pillar.id || idx} className="rounded-xl border border-border bg-muted/30 p-4 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="rounded-md bg-primary/20 px-2 py-0.5 text-xs font-bold text-foreground">
                            Pillar {pillar.number || `0${idx + 1}`}
                          </span>
                        </div>
                        <div>
                          <label className="mb-1 block text-[0.65rem] font-bold uppercase text-muted-foreground">
                            Pillar Title
                          </label>
                          <input
                            type="text"
                            value={pillar.title}
                            onChange={(e) => {
                              const next = [...aboutForm.pillars]
                              next[idx].title = e.target.value
                              setAboutForm({ ...aboutForm, pillars: next })
                            }}
                            className="w-full rounded-lg border border-border bg-background p-2 text-xs font-semibold text-foreground outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[0.65rem] font-bold uppercase text-muted-foreground">
                            Subtitle Badge
                          </label>
                          <input
                            type="text"
                            value={pillar.subtitle}
                            onChange={(e) => {
                              const next = [...aboutForm.pillars]
                              next[idx].subtitle = e.target.value
                              setAboutForm({ ...aboutForm, pillars: next })
                            }}
                            className="w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[0.65rem] font-bold uppercase text-muted-foreground">
                            Description
                          </label>
                          <textarea
                            rows={2}
                            value={pillar.description}
                            onChange={(e) => {
                              const next = [...aboutForm.pillars]
                              next[idx].description = e.target.value
                              setAboutForm({ ...aboutForm, pillars: next })
                            }}
                            className="w-full resize-none rounded-lg border border-border bg-background p-2 text-xs text-foreground outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[0.65rem] font-bold uppercase text-muted-foreground">
                            Key Highlights (comma separated)
                          </label>
                          <input
                            type="text"
                            value={(pillar.highlights || []).join(', ')}
                            onChange={(e) => {
                              const next = [...aboutForm.pillars]
                              next[idx].highlights = e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)
                              setAboutForm({ ...aboutForm, pillars: next })
                            }}
                            className="w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. WORK SHOWCASE TAB (CRUD) */}
            {activeTab === 'works' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold">Portfolio Work Items ({state.works.length})</h2>
                    <p className="text-xs text-muted-foreground">
                      Add, update, or remove handcrafted props, printable worksheets, posters, and classroom photos.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewSection('works')}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted"
                    >
                      <Eye className="size-3.5 text-primary" />
                      Live Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingWork(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:shadow-md"
                    >
                      <Plus className="size-3.5" />
                      Add New Item
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {state.works.map((item) => (
                    <div
                      key={item.id}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs transition-all hover:border-primary/50 hover:shadow-md"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                        <Image
                          src={item.image || '/placeholder.svg'}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-card/90 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-foreground backdrop-blur-sm">
                          {item.category}
                        </span>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-xs font-bold text-primary">{item.tag}</p>
                          <h3 className="font-serif text-base font-semibold leading-tight text-foreground">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                          <span className="text-[0.7rem] text-muted-foreground">
                            {item.format || item.year || 'Farah Studio'}
                          </span>
                          <div className="flex gap-1.5">
                            <button
                              type="button"
                              onClick={() => setEditingWork(item)}
                              className="flex size-7 items-center justify-center rounded-lg border border-border bg-background hover:bg-muted"
                              title="Edit item"
                            >
                              <Edit3 className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Delete "${item.title}"?`)) {
                                  deleteWork(item.id)
                                  toast('Work item deleted.')
                                }
                              }}
                              className="flex size-7 items-center justify-center rounded-lg border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20"
                              title="Delete item"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. VIDEO LESSONS TAB (CRUD) */}
            {activeTab === 'videos' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold">Video Lessons &amp; Clips ({state.videos.length})</h2>
                    <p className="text-xs text-muted-foreground">
                      Manage YouTube and instructional mini-lessons, pronunciation drills, and classroom demonstrations.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewSection('videos')}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted"
                    >
                      <Eye className="size-3.5 text-primary" />
                      Live Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingVideo(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:shadow-md"
                    >
                      <Plus className="size-3.5" />
                      Add Video Clip
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {state.videos.map((vid) => (
                    <div
                      key={vid.id}
                      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs"
                    >
                      <div className="relative aspect-video w-full overflow-hidden bg-muted">
                        <Image
                          src={vid.thumbnail || '/placeholder.svg'}
                          alt={vid.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-cover"
                        />
                        <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-0.5 text-[0.65rem] font-bold text-white">
                          {vid.duration}
                        </span>
                        <span className="absolute left-2 top-2 rounded-md bg-primary px-2 py-0.5 text-[0.65rem] font-bold text-primary-foreground">
                          {vid.category}
                        </span>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-[0.65rem] font-bold uppercase text-muted-foreground">{vid.level}</p>
                          <h3 className="font-serif text-sm font-semibold text-foreground">{vid.title}</h3>
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                            {vid.takeaways && vid.takeaways.length > 0 ? vid.takeaways.join(' • ') : 'Educational clip'}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                          <span className="text-[0.7rem] text-muted-foreground truncate max-w-[140px]">
                            {vid.src}
                          </span>
                          <div className="flex gap-1.5">
                            <button
                              type="button"
                              onClick={() => setEditingVideo(vid)}
                              className="flex size-7 items-center justify-center rounded-lg border border-border bg-background hover:bg-muted"
                            >
                              <Edit3 className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Delete video "${vid.title}"?`)) {
                                  deleteVideo(vid.id)
                                  toast('Video clip deleted.')
                                }
                              }}
                              className="flex size-7 items-center justify-center rounded-lg border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. RESOURCE SHOP TAB (CRUD) */}
            {activeTab === 'shop' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold">Resource Shop Products ({state.products.length})</h2>
                    <p className="text-xs text-muted-foreground">
                      Add, price, and manage DIY props, printable sets, and classroom bundles available for buy or rent.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewSection('shop')}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted"
                    >
                      <Eye className="size-3.5 text-primary" />
                      Live Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingProduct(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:shadow-md"
                    >
                      <Plus className="size-3.5" />
                      Add Product
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {state.products.map((prod) => (
                    <div
                      key={prod.id}
                      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                        <Image
                          src={prod.image || '/placeholder.svg'}
                          alt={prod.name}
                          fill
                          sizes="200px"
                          className="object-cover"
                        />
                        <span className="absolute left-2 top-2 rounded-full bg-card/90 px-2 py-0.5 text-[0.65rem] font-bold uppercase text-foreground">
                          {prod.category}
                        </span>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-serif text-sm font-semibold text-foreground">{prod.name}</h3>
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{prod.description}</p>
                        </div>

                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs font-bold text-foreground">
                            {prod.buyPrice != null ? (
                              <span>Buy: {prod.buyPrice} TND</span>
                            ) : (
                              <span className="text-muted-foreground">Buy: N/A</span>
                            )}
                            {prod.rentPrice != null ? (
                              <span className="text-primary">Rent: {prod.rentPrice} TND/day</span>
                            ) : (
                              <span className="text-muted-foreground">Rent: N/A</span>
                            )}
                          </div>

                          <div className="mt-3 flex items-center justify-end gap-1.5 border-t border-border/60 pt-2">
                            <button
                              type="button"
                              onClick={() => setEditingProduct(prod)}
                              className="flex size-7 items-center justify-center rounded-lg border border-border bg-background hover:bg-muted"
                            >
                              <Edit3 className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Delete product "${prod.name}"?`)) {
                                  deleteProduct(prod.id)
                                  toast('Product deleted.')
                                }
                              }}
                              className="flex size-7 items-center justify-center rounded-lg border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. TARGET AUDIENCES TAB */}
            {activeTab === 'audiences' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold">Target Audiences ({state.audiences.length})</h2>
                    <p className="text-xs text-muted-foreground">
                      Edit the tailored messaging for Students, Parents, and Fellow Teachers.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewSection('audiences')}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted"
                    >
                      <Eye className="size-3.5 text-primary" />
                      Live Preview
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {state.audiences.map((aud, i) => (
                    <div key={aud.id} className="rounded-2xl border border-border bg-card p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-bold">{aud.title}</span>
                      </div>

                      <div>
                        <label className="mb-1 block text-[0.65rem] font-bold uppercase text-muted-foreground">
                          Headline / Intro
                        </label>
                        <textarea
                          rows={2}
                          value={aud.intro}
                          onChange={(e) => {
                            updateAudience(aud.id, { intro: e.target.value })
                          }}
                          className="w-full resize-none rounded-lg border border-border bg-background p-2 text-xs text-foreground outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-[0.65rem] font-bold uppercase text-muted-foreground">
                          Key Points (comma separated)
                        </label>
                        <input
                          type="text"
                          value={(aud.points || []).join(', ')}
                          onChange={(e) => {
                            const next = e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)
                            updateAudience(aud.id, { points: next })
                          }}
                          className="w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. TESTIMONIALS TAB (CRUD) */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold">
                      Community Testimonials ({state.testimonials.length})
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Add, update, and manage genuine endorsements from parents, students, and teachers.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewSection('testimonials')}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted"
                    >
                      <Eye className="size-3.5 text-primary" />
                      Live Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingTestimonial(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:shadow-md"
                    >
                      <Plus className="size-3.5" />
                      Add Testimonial
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {state.testimonials.map((test) => (
                    <div
                      key={test.id}
                      className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-xs"
                    >
                      <div>
                        <div className="flex items-center gap-1 text-primary">
                          {Array.from({ length: test.rating || 5 }).map((_, i) => (
                            <Star key={i} className="size-3.5 fill-current" />
                          ))}
                        </div>
                        <blockquote className="mt-2 text-xs italic leading-relaxed text-foreground">
                          &ldquo;{test.quote}&rdquo;
                        </blockquote>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                        <div>
                          <p className="font-serif text-xs font-bold text-foreground">{test.name}</p>
                          <p className="text-[0.7rem] text-muted-foreground">{test.role}</p>
                        </div>

                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => setEditingTestimonial(test)}
                            className="flex size-7 items-center justify-center rounded-lg border border-border bg-background hover:bg-muted"
                          >
                            <Edit3 className="size-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete testimonial from ${test.name}?`)) {
                                deleteTestimonial(test.id)
                                toast('Testimonial deleted.')
                              }
                            }}
                            className="flex size-7 items-center justify-center rounded-lg border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. FAQS TAB (CRUD) */}
            {activeTab === 'faqs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold">Frequently Asked Questions ({state.faqs.length})</h2>
                    <p className="text-xs text-muted-foreground">
                      Edit or add new questions to provide clarity on rentals, custom worksheets, and teacher workshops.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewSection('faqs')}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted"
                    >
                      <Eye className="size-3.5 text-primary" />
                      Live Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingFaq(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:shadow-md"
                    >
                      <Plus className="size-3.5" />
                      Add FAQ
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {state.faqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-4 shadow-xs"
                    >
                      <div className="space-y-1">
                        <h4 className="font-serif text-sm font-semibold text-foreground">{faq.q}</h4>
                        <p className="text-xs text-muted-foreground">{faq.a}</p>
                      </div>

                      <div className="flex shrink-0 gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingFaq(faq)}
                          className="flex size-7 items-center justify-center rounded-lg border border-border bg-background hover:bg-muted"
                        >
                          <Edit3 className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm('Delete this question?')) {
                              deleteFaq(faq.id)
                              toast('FAQ deleted.')
                            }
                          }}
                          className="flex size-7 items-center justify-center rounded-lg border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 10. CONTACT INFO TAB */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold">Studio Contact &amp; Location Details</h2>
                    <p className="text-xs text-muted-foreground">
                      Configure your direct WhatsApp contact number, email, and studio location in Sfax, Tunisia.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      updateContact(contactForm)
                      toast('Contact details updated!')
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:shadow-md"
                  >
                    <Save className="size-3.5" />
                    Save Changes
                  </button>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-xs">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-semibold">Display WhatsApp Number</label>
                      <input
                        type="text"
                        value={contactForm.whatsapp}
                        onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                        placeholder="+216 52 095 014"
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold">Raw WhatsApp Numeric (For wa.me links)</label>
                      <input
                        type="text"
                        value={contactForm.whatsappRaw}
                        onChange={(e) => setContactForm({ ...contactForm, whatsappRaw: e.target.value })}
                        placeholder="21652095014"
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-semibold">Email Address</label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="farah.affes@education.tn"
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold">Location / City</label>
                      <input
                        type="text"
                        value={contactForm.location}
                        onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                        placeholder="Sfax, Tunisia"
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3.5">
                    <input
                      type="checkbox"
                      id="openForWorkshops"
                      checked={contactForm.openForWorkshops}
                      onChange={(e) => setContactForm({ ...contactForm, openForWorkshops: e.target.checked })}
                      className="size-4 rounded text-primary focus:ring-primary"
                    />
                    <label htmlFor="openForWorkshops" className="text-xs font-semibold text-foreground cursor-pointer">
                      Show &quot;Open for workshops &amp; commissions&quot; active badge in About section
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* 11. MESSAGES INBOX TAB */}
            {activeTab === 'inbox' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold">Contact Messages Inbox ({state.messages.length})</h2>
                    <p className="text-xs text-muted-foreground">
                      All messages submitted via the website contact form.
                    </p>
                  </div>
                </div>

                {state.messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-12 text-center">
                    <Inbox className="size-10 text-muted-foreground" />
                    <p className="mt-2 font-serif text-base font-semibold">No messages yet</p>
                    <p className="text-xs text-muted-foreground">
                      New messages from students, parents, and teachers will appear here automatically.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {state.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          'rounded-2xl border p-4 shadow-xs transition-all',
                          msg.status === 'unread'
                            ? 'border-primary/50 bg-primary/[0.03] ring-1 ring-primary/20'
                            : 'border-border bg-card',
                        )}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-sm font-bold text-foreground">{msg.name}</span>
                            <span className="rounded-full bg-muted px-2 py-0.5 text-[0.65rem] font-semibold text-muted-foreground">
                              {msg.role}
                            </span>
                            <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[0.65rem] font-bold text-foreground">
                              {msg.topic}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[0.65rem] text-muted-foreground">
                              {new Date(msg.created_at).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                markMessageRead(msg.id, msg.status === 'unread' ? 'replied' : 'unread')
                              }}
                              className="rounded-lg border border-border px-2 py-1 text-[0.65rem] font-semibold hover:bg-muted"
                            >
                              {msg.status === 'unread' ? 'Mark as Replied' : 'Mark Unread'}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm('Delete this message?')) {
                                  deleteMessage(msg.id)
                                  toast('Message deleted.')
                                }
                              }}
                              className="rounded-lg border border-destructive/30 bg-destructive/10 p-1 text-destructive hover:bg-destructive/20"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>

                        <p className="mt-3 text-xs leading-relaxed text-foreground whitespace-pre-wrap">
                          {msg.message}
                        </p>

                        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/40">
                          <span>Email: {msg.email}</span>
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${msg.topic}&body=Hello ${msg.name},\n\nThank you for reaching out!`}
                            className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                          >
                            <Send className="size-3" /> Reply by Email
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 12. ORDERS & RENTALS TRACKER TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold">Orders &amp; Rentals Tracker ({state.orders.length})</h2>
                    <p className="text-xs text-muted-foreground">
                      Track customer purchase and rental requests. Send direct 1-click WhatsApp confirmations.
                    </p>
                  </div>
                </div>

                {state.orders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-12 text-center">
                    <Package className="size-10 text-muted-foreground" />
                    <p className="mt-2 font-serif text-base font-semibold">No orders recorded yet</p>
                    <p className="text-xs text-muted-foreground">
                      When visitors checkout DIY props or worksheets, their orders will be organized here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.orders.map((order) => (
                      <div
                        key={order.id}
                        className={cn(
                          'rounded-2xl border p-5 shadow-xs transition-all',
                          order.status === 'pending'
                            ? 'border-primary/50 bg-primary/[0.02] ring-1 ring-primary/20'
                            : 'border-border bg-card',
                        )}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-base font-bold">{order.customer_name}</span>
                            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold">
                              {order.customer_location || 'Sfax'}
                            </span>
                            <span
                              className={cn(
                                'rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase',
                                order.status === 'pending'
                                  ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                                  : order.status === 'completed' || order.status === 'fulfilled'
                                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                    : 'bg-muted text-muted-foreground',
                              )}
                            >
                              {order.status}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {new Date(order.created_at).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>

                            <select
                              value={order.status}
                              onChange={(e) => {
                                updateOrderStatus(order.id, e.target.value as StoredOrder['status'])
                                toast(`Order marked as ${e.target.value}`)
                              }}
                              className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-semibold outline-none"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => {
                                if (confirm('Delete this order record?')) {
                                  deleteOrder(order.id)
                                  toast('Order deleted.')
                                }
                              }}
                              className="rounded-lg border border-destructive/30 bg-destructive/10 p-1.5 text-destructive hover:bg-destructive/20"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Customer Details */}
                        <div className="mt-3 grid gap-2 text-xs sm:grid-cols-3">
                          <p>
                            <span className="font-semibold text-muted-foreground">Phone / WA:</span>{' '}
                            <span className="font-bold text-foreground">{order.customer_phone}</span>
                          </p>
                          {order.customer_email && (
                            <p>
                              <span className="font-semibold text-muted-foreground">Email:</span>{' '}
                              <span>{order.customer_email}</span>
                            </p>
                          )}
                          {order.rental_dates && (
                            <p>
                              <span className="font-semibold text-primary">Rental Dates:</span>{' '}
                              <span className="font-semibold">{order.rental_dates}</span>
                            </p>
                          )}
                        </div>

                        {order.notes && (
                          <p className="mt-2 text-xs bg-muted/40 p-2.5 rounded-lg text-muted-foreground">
                            <span className="font-semibold text-foreground">Customer Notes:</span> {order.notes}
                          </p>
                        )}

                        {/* Itemized breakdown */}
                        <div className="mt-3 rounded-xl border border-border/60 bg-muted/20 p-3">
                          <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
                            Items Ordered:
                          </p>
                          <ul className="mt-1.5 space-y-1 text-xs">
                            {order.items.map((item, idx) => (
                              <li key={idx} className="flex items-center justify-between">
                                <span>
                                  • {item.name} ({item.mode === 'rent' ? 'Rental' : 'Buy'}) x{item.qty}
                                </span>
                                <span className="font-semibold">{item.price * item.qty} TND</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-2 flex items-center justify-between border-t border-border/40 pt-2 font-serif text-sm font-bold">
                            <span>Total Amount:</span>
                            <span className="text-primary">{order.subtotal} TND</span>
                          </div>
                        </div>

                        {/* Quick WhatsApp Action to Customer */}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              const cleanPhone = order.customer_phone.replace(/[^0-9]/g, '')
                              const fullPhone = cleanPhone.startsWith('216') ? cleanPhone : `216${cleanPhone}`
                              const msg = `Hello ${order.customer_name}! This is Farah Affes regarding your order of (${order.items.map((i) => i.name).join(', ')}). Your order is confirmed and ready for delivery/pickup in ${order.customer_location || 'Sfax'}.`
                              window.open(`https://wa.me/${fullPhone}?text=${encodeURIComponent(msg)}`, '_blank')
                            }}
                            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#20bd5a]"
                          >
                            <MessageCircle className="size-3.5" />
                            Message Customer on WhatsApp
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `Order #${order.id}\nCustomer: ${order.customer_name} (${order.customer_phone})\nLocation: ${order.customer_location}\nTotal: ${order.subtotal} TND`,
                              )
                              toast('Order summary copied to clipboard!')
                            }}
                            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                          >
                            <Copy className="size-3.5" /> Copy Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 13. STUDIO SETTINGS & BACKUP TAB */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-xl font-bold">Studio Security &amp; Data Management</h2>
                  <p className="text-xs text-muted-foreground">
                    Update your admin access PIN, export full portfolio backups, or restore previous states.
                  </p>
                </div>

                {/* Change PIN Card */}
                <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-xs">
                  <h3 className="font-serif text-base font-bold">Change Admin Studio PIN</h3>
                  <div className="flex max-w-sm gap-2">
                    <input
                      type="password"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      placeholder="Enter new 4+ char PIN"
                      className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newPin.trim().length < 4) {
                          toast('PIN must be at least 4 characters long.')
                          return
                        }
                        updateAdminPin(newPin.trim())
                        setNewPin('')
                        toast('Admin PIN updated successfully!')
                      }}
                      className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                    >
                      Update PIN
                    </button>
                  </div>
                </div>

                {/* Backup & Restore */}
                <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-xs">
                  <h3 className="font-serif text-base font-bold">Data Backup &amp; JSON Migration</h3>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const data = exportDataJson()
                        const blob = new Blob([data], { type: 'application/json' })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.href = url
                        a.download = `farah-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`
                        a.click()
                        toast('Full Portfolio Backup downloaded!')
                      }}
                      className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-xs font-semibold text-secondary-foreground shadow-sm hover:shadow-md"
                    >
                      <Download className="size-4 text-primary" />
                      Export Complete Portfolio JSON
                    </button>

                    <label className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground cursor-pointer hover:bg-muted">
                      <Upload className="size-4 text-primary" />
                      Import &amp; Restore JSON File
                      <input
                        type="file"
                        accept=".json"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (!file) return
                          const reader = new FileReader()
                          reader.onload = (ev) => {
                            const content = ev.target?.result as string
                            if (content && importDataJson(content)) {
                              toast('Portfolio restored successfully!')
                              syncLocalForms()
                            } else {
                              toast('Invalid backup JSON file.')
                            }
                          }
                          reader.readAsText(file)
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* Factory Reset Card */}
                <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-5 space-y-3">
                  <h3 className="font-serif text-base font-bold text-destructive">Factory Reset</h3>
                  <p className="text-xs text-muted-foreground">
                    Reset all text, works, products, and contact information to Farah&apos;s default state.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        confirm(
                          'Are you sure you want to reset all portfolio data to default? This will clear custom changes.',
                        )
                      ) {
                        resetToDefaults()
                        syncLocalForms()
                        toast('Portfolio reset to default seed data.')
                      }
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-destructive px-4 py-2 text-xs font-semibold text-white hover:bg-destructive/90"
                  >
                    <RotateCcw className="size-3.5" />
                    Reset to Factory Defaults
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MODAL: ADD / EDIT WORK ITEM */}
      {(isAddingWork || editingWork) && (
        <WorkModal
          item={editingWork}
          onClose={() => {
            setIsAddingWork(false)
            setEditingWork(null)
          }}
          onSave={(data) => {
            if (editingWork) {
              updateWork(editingWork.id, data)
              toast('Work item updated.')
            } else {
              addWork(data as Omit<WorkItem, 'id'>)
              toast('New work item created!')
            }
            setIsAddingWork(false)
            setEditingWork(null)
          }}
        />
      )}

      {/* MODAL: ADD / EDIT VIDEO ITEM */}
      {(isAddingVideo || editingVideo) && (
        <VideoModal
          item={editingVideo}
          onClose={() => {
            setIsAddingVideo(false)
            setEditingVideo(null)
          }}
          onSave={(data) => {
            if (editingVideo) {
              updateVideo(editingVideo.id, data)
              toast('Video clip updated.')
            } else {
              addVideo(data as Omit<VideoType, 'id'>)
              toast('New video clip added!')
            }
            setIsAddingVideo(false)
            setEditingVideo(null)
          }}
        />
      )}

      {/* MODAL: ADD / EDIT PRODUCT ITEM */}
      {(isAddingProduct || editingProduct) && (
        <ProductModal
          item={editingProduct}
          onClose={() => {
            setIsAddingProduct(false)
            setEditingProduct(null)
          }}
          onSave={(data) => {
            if (editingProduct) {
              updateProduct(editingProduct.id, data)
              toast('Product updated.')
            } else {
              addProduct(data as Omit<Product, 'id'>)
              toast('New product added to shop!')
            }
            setIsAddingProduct(false)
            setEditingProduct(null)
          }}
        />
      )}

      {/* MODAL: ADD / EDIT TESTIMONIAL */}
      {(isAddingTestimonial || editingTestimonial) && (
        <TestimonialModal
          item={editingTestimonial}
          onClose={() => {
            setIsAddingTestimonial(false)
            setEditingTestimonial(null)
          }}
          onSave={(data) => {
            if (editingTestimonial) {
              updateTestimonial(editingTestimonial.id, data)
              toast('Testimonial updated.')
            } else {
              addTestimonial(data as Omit<TestimonialItem, 'id'>)
              toast('New testimonial added!')
            }
            setIsAddingTestimonial(false)
            setEditingTestimonial(null)
          }}
        />
      )}

      {/* MODAL: ADD / EDIT FAQ */}
      {(isAddingFaq || editingFaq) && (
        <FaqModal
          item={editingFaq}
          onClose={() => {
            setIsAddingFaq(false)
            setEditingFaq(null)
          }}
          onSave={(data) => {
            if (editingFaq) {
              updateFaq(editingFaq.id, data)
              toast('FAQ question updated.')
            } else {
              addFaq(data as Omit<FaqItem, 'id'>)
              toast('New FAQ question added!')
            }
            setIsAddingFaq(false)
            setEditingFaq(null)
          }}
        />
      )}

      {/* LIVE SECTION PREVIEW MODAL */}
      {previewSection && (
        <LivePreviewModal
          section={previewSection}
          heroData={heroForm}
          aboutData={aboutForm}
          statsData={statsForm}
          state={state}
          onClose={() => setPreviewSection(null)}
        />
      )}
    </div>
  )
}

// ----------------------------------------------------
// SUB-COMPONENTS: MODALS FOR ADDING / EDITING ITEMS
// ----------------------------------------------------

function WorkModal({
  item,
  onClose,
  onSave,
}: {
  item: WorkItem | null
  onClose: () => void
  onSave: (data: Partial<WorkItem>) => void
}) {
  const [title, setTitle] = useState(item?.title || '')
  const [category, setCategory] = useState<WorkItem['category']>(item?.category || 'props')
  const [tag, setTag] = useState(item?.tag || '')
  const [description, setDescription] = useState(item?.description || '')
  const [image, setImage] = useState(item?.image || '/images/product-story-kit.png')
  const [format, setFormat] = useState(item?.format || 'Physical Prop Kit • Rent / Buy')
  const [year, setYear] = useState(item?.year || '2024')
  const [highlights, setHighlights] = useState((item?.highlights || []).join(', '))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title,
      category,
      tag,
      description,
      image,
      format,
      year,
      highlights: highlights.split(',').map((s: string) => s.trim()).filter(Boolean),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="font-serif text-lg font-bold">
            {item ? 'Edit Work Item' : 'Add New Portfolio Item'}
          </h3>
          <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-muted">
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Kinesthetic Rotating Phonics Wheel"
              className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as WorkItem['category'])}
                className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
              >
                <option value="props">DIY Props &amp; Kits</option>
                <option value="posters">Posters &amp; Guides</option>
                <option value="flyers">Flyers &amp; Events</option>
                <option value="worksheets">Worksheets &amp; Quests</option>
                <option value="classroom">Classroom Moments</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold">Tag / Level</label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="e.g. Early Literacy • Ages 5-8"
                className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold">Image Path / URL</label>
            <input
              type="text"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="/images/product-phonics-wheel.png"
              className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold">Description</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe pedagogical purpose and tactile experience..."
              className="w-full resize-none rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold">Format / Specs</label>
              <input
                type="text"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                placeholder="Physical Prop Kit • Rent / Buy"
                className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold">Year</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2024"
                className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold">Highlights (comma separated)</label>
            <input
              type="text"
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
              placeholder="Tactile phonics, 36 word blends, Wipe-clean"
              className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
            />
          </div>

          <div className="mt-5 flex justify-end gap-2 border-t border-border pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2 text-xs font-semibold hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm"
            >
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function VideoModal({
  item,
  onClose,
  onSave,
}: {
  item: VideoType | null
  onClose: () => void
  onSave: (data: Partial<VideoType>) => void
}) {
  const [title, setTitle] = useState(item?.title || '')
  const [duration, setDuration] = useState(item?.duration || '3:45')
  const [category, setCategory] = useState<VideoType['category']>(item?.category || 'pronunciation')
  const [level, setLevel] = useState(item?.level || 'Primary • Grades 1-3')
  const [src, setSrc] = useState(item?.src || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4')
  const [thumbnail, setThumbnail] = useState(item?.thumbnail || '/images/video-lesson.png')
  const [takeaways, setTakeaways] = useState((item?.takeaways || []).join(', '))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title,
      duration,
      category,
      level,
      src,
      thumbnail,
      takeaways: takeaways.split(',').map((s: string) => s.trim()).filter(Boolean),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="font-serif text-lg font-bold">{item ? 'Edit Video Clip' : 'Add Video Clip'}</h3>
          <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-muted">
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold">Video Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Master the Magic 'E' Phonics Rule"
              className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as VideoType['category'])}
                className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
              >
                <option value="pronunciation">Pronunciation &amp; Phonics</option>
                <option value="grammar">Grammar Made Simple</option>
                <option value="storytelling">Storytelling &amp; Immersion</option>
                <option value="workshop">Teacher Workshops</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold">Duration (e.g. 4:15)</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold">Level / Grade</label>
            <input
              type="text"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              placeholder="Primary • Grades 2-4"
              className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold">Video Stream URL</label>
            <input
              type="text"
              required
              value={src}
              onChange={(e) => setSrc(e.target.value)}
              placeholder="https://commondatastorage.googleapis.com/..."
              className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold">Thumbnail URL / Image</label>
            <input
              type="text"
              required
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="/images/video-lesson.png"
              className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold">Takeaways (comma separated)</label>
            <textarea
              rows={2}
              value={takeaways}
              onChange={(e) => setTakeaways(e.target.value)}
              placeholder="Tongue placement technique, Minimal pairs practice"
              className="w-full resize-none rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
            />
          </div>

          <div className="mt-5 flex justify-end gap-2 border-t border-border pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2 text-xs font-semibold hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm"
            >
              Save Video
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ProductModal({
  item,
  onClose,
  onSave,
}: {
  item: Product | null
  onClose: () => void
  onSave: (data: Partial<Product>) => void
}) {
  const [name, setName] = useState(item?.name || '')
  const [category, setCategory] = useState(item?.category || 'Physical DIY Prop')
  const [description, setDescription] = useState(item?.description || '')
  const [image, setImage] = useState(item?.image || '/images/product-story-kit.png')
  const [buyPrice, setBuyPrice] = useState<string>(item?.buyPrice != null ? String(item.buyPrice) : '45')
  const [rentPrice, setRentPrice] = useState<string>(item?.rentPrice != null ? String(item.rentPrice) : '15')
  const [features, setFeatures] = useState((item?.features || []).join(', '))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const options: ('buy' | 'rent')[] = []
    if (buyPrice) options.push('buy')
    if (rentPrice) options.push('rent')

    onSave({
      name,
      category,
      description,
      image,
      options,
      buyPrice: buyPrice ? Number(buyPrice) : undefined,
      rentPrice: rentPrice ? Number(rentPrice) : undefined,
      features: features.split(',').map((s: string) => s.trim()).filter(Boolean),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="font-serif text-lg font-bold">{item ? 'Edit Shop Product' : 'Add Shop Resource'}</h3>
          <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-muted">
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold">Product Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Phonics Spinner Wheel Kit"
              className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Physical DIY Prop, Digital Download..."
                className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold">Image URL</label>
              <input
                type="text"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/images/product-story-kit.png"
                className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold">Purchase Price (TND)</label>
              <input
                type="number"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                placeholder="45"
                className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold">Daily Rental Price (TND)</label>
              <input
                type="number"
                value={rentPrice}
                onChange={(e) => setRentPrice(e.target.value)}
                placeholder="15"
                className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold">Description</label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What comes in the kit..."
              className="w-full resize-none rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold">Features (comma separated)</label>
            <input
              type="text"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="36 Word cards, Laminated, Dry-erase marker included"
              className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
            />
          </div>

          <div className="mt-5 flex justify-end gap-2 border-t border-border pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2 text-xs font-semibold hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function TestimonialModal({
  item,
  onClose,
  onSave,
}: {
  item: TestimonialItem | null
  onClose: () => void
  onSave: (data: Partial<TestimonialItem>) => void
}) {
  const [name, setName] = useState(item?.name || '')
  const [role, setRole] = useState(item?.role || 'Parent of 4th Grader • Sfax')
  const [quote, setQuote] = useState(item?.quote || '')
  const [rating, setRating] = useState(item?.rating || 5)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ name, role, quote, rating })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="font-serif text-lg font-bold">
            {item ? 'Edit Testimonial' : 'Add Testimonial'}
          </h3>
          <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-muted">
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold">Author Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Leila Bouazizi"
              className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold">Role / Title</label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Primary English Teacher • Tunis"
              className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold">Rating (1 to 5 Stars)</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
            >
              <option value={5}>5 Stars ★★★★★</option>
              <option value={4}>4 Stars ★★★★☆</option>
              <option value={3}>3 Stars ★★★☆☆</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold">Endorsement Quote</label>
            <textarea
              rows={3}
              required
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="What they loved about Farah's materials..."
              className="w-full resize-none rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
            />
          </div>

          <div className="mt-5 flex justify-end gap-2 border-t border-border pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2 text-xs font-semibold hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm"
            >
              Save Endorsement
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function FaqModal({
  item,
  onClose,
  onSave,
}: {
  item: FaqItem | null
  onClose: () => void
  onSave: (data: Partial<FaqItem>) => void
}) {
  const [q, setQ] = useState(item?.q || '')
  const [a, setA] = useState(item?.a || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ q, a })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="font-serif text-lg font-bold">{item ? 'Edit FAQ' : 'Add FAQ'}</h3>
          <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-muted">
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold">Question</label>
            <input
              type="text"
              required
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="e.g. Can I rent props for a 2-day school event in Sfax?"
              className="w-full rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold">Answer</label>
            <textarea
              rows={4}
              required
              value={a}
              onChange={(e) => setA(e.target.value)}
              placeholder="Yes! Props can be rented daily with pickup or courier delivery..."
              className="w-full resize-none rounded-lg border border-border bg-background p-2 text-xs outline-none focus:border-primary"
            />
          </div>

          <div className="mt-5 flex justify-end gap-2 border-t border-border pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2 text-xs font-semibold hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm"
            >
              Save Question
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// LIVE SECTION PREVIEW MODAL
// ----------------------------------------------------

function LivePreviewModal({
  section,
  heroData,
  aboutData,
  statsData,
  state,
  onClose,
}: {
  section: string
  heroData: typeof state.hero
  aboutData: typeof state.about
  statsData: typeof state.stats
  state: ReturnType<typeof usePortfolio>['state']
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
      <div className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Eye className="size-4" />
            </span>
            <h3 className="font-serif text-base font-bold capitalize">
              Live Preview: {section} Section
            </h3>
            <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[0.65rem] font-bold text-foreground">
              Draft Simulation
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full hover:bg-muted"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {section === 'hero' && (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-foreground">
                <span className="size-2 rounded-full bg-primary animate-ping" />
                {heroData.eyebrow}
              </span>

              <h1 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">
                {heroData.titlePrefix}{' '}
                <span className="highlight-underline">{heroData.highlightWord}</span>{' '}
                <span className="text-gradient">{heroData.titleSuffix}</span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {heroData.bio}
              </p>

              <div className="mt-5 flex gap-3">
                <span className="rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground shadow-md">
                  {heroData.ctaWorkText || 'Explore my materials'}
                </span>
                <span className="rounded-full border border-border px-5 py-2 text-xs font-semibold text-foreground">
                  {heroData.ctaContactText || 'Get in touch'}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-4 sm:grid-cols-4">
                {statsData.map((s, i) => (
                  <div key={i}>
                    <p className="font-serif text-2xl font-bold text-foreground">{s.value}</p>
                    <p className="text-[0.65rem] font-bold uppercase text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === 'about' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="text-xs font-bold uppercase text-primary">{aboutData.eyebrow}</span>
                <h2 className="mt-1 font-serif text-2xl font-bold">{aboutData.title}</h2>
                <p className="mt-1 text-xs text-muted-foreground">{aboutData.intro}</p>

                <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                  <p>{aboutData.bio1}</p>
                  <p>{aboutData.bio2}</p>
                </div>

                <div className="mt-4 rounded-xl border border-primary/20 bg-secondary p-4 text-secondary-foreground">
                  <p className="font-serif text-sm italic">&ldquo;{aboutData.manifestoQuote}&rdquo;</p>
                  <p className="mt-2 text-xs font-semibold text-primary">
                    — {aboutData.manifestoAuthor}, {aboutData.manifestoLocation}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {aboutData.pillars.map((p, idx) => (
                  <div key={idx} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-bold">{p.title}</span>
                      <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[0.65rem] font-bold">
                        {p.subtitle}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{p.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.highlights.map((h, i) => (
                        <span key={i} className="rounded-md bg-muted px-2 py-0.5 text-[0.65rem] font-medium">
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === 'works' && (
            <div className="grid gap-4 sm:grid-cols-3">
              {state.works.slice(0, 6).map((w) => (
                <div key={w.id} className="rounded-xl border border-border bg-card p-3 shadow-xs">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                    <Image src={w.image || '/placeholder.svg'} alt={w.title} fill className="object-cover" />
                  </div>
                  <h4 className="mt-2 font-serif text-xs font-bold truncate">{w.title}</h4>
                  <p className="text-[0.65rem] text-muted-foreground line-clamp-2">{w.description}</p>
                </div>
              ))}
            </div>
          )}

          {section === 'videos' && (
            <div className="grid gap-4 sm:grid-cols-3">
              {state.videos.slice(0, 3).map((v) => (
                <div key={v.id} className="rounded-xl border border-border bg-card p-3">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                    <Image src={v.thumbnail || '/placeholder.svg'} alt={v.title} fill className="object-cover" />
                  </div>
                  <h4 className="mt-2 font-serif text-xs font-bold truncate">{v.title}</h4>
                  <p className="text-[0.65rem] text-muted-foreground">
                    {v.takeaways && v.takeaways.length > 0 ? v.takeaways[0] : 'Lesson clip'}
                  </p>
                </div>
              ))}
            </div>
          )}

          {section === 'shop' && (
            <div className="grid gap-4 sm:grid-cols-3">
              {state.products.slice(0, 3).map((p) => (
                <div key={p.id} className="rounded-xl border border-border bg-card p-3">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
                    <Image src={p.image || '/placeholder.svg'} alt={p.name} fill className="object-cover" />
                  </div>
                  <h4 className="mt-2 font-serif text-xs font-bold">{p.name}</h4>
                  <p className="text-xs font-bold text-primary mt-1">Buy: {p.buyPrice} TND | Rent: {p.rentPrice} TND</p>
                </div>
              ))}
            </div>
          )}

          {section === 'testimonials' && (
            <div className="grid gap-4 sm:grid-cols-3">
              {state.testimonials.slice(0, 3).map((t) => (
                <div key={t.id} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex text-primary text-xs">★★★★★</div>
                  <p className="mt-2 text-xs italic">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-2 text-xs font-bold">{t.name}</p>
                  <p className="text-[0.65rem] text-muted-foreground">{t.role}</p>
                </div>
              ))}
            </div>
          )}

          {section === 'faqs' && (
            <div className="space-y-3">
              {state.faqs.slice(0, 4).map((f) => (
                <div key={f.id} className="rounded-xl border border-border bg-card p-3">
                  <h4 className="font-serif text-xs font-bold">{f.q}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          )}

          {section === 'audiences' && (
            <div className="grid gap-4 sm:grid-cols-3">
              {state.audiences.map((a) => (
                <div key={a.id} className="rounded-xl border border-border bg-card p-4">
                  <h4 className="font-serif text-sm font-bold">{a.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{a.intro}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-border bg-card p-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  )
}
