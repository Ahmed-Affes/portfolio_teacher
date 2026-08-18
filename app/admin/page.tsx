'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  BellRing,
  BookOpen,
  CheckCircle2,
  Copy,
  Database,
  Download,
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  GraduationCap,
  HelpCircle,
  Image as ImageIcon,
  Inbox,
  Key,
  LayoutDashboard,
  Lock,
  LogOut,
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
  Video,
  Volume2,
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
  | 'database'
  | 'settings'

export default function AdminPage() {
  const {
    state,
    isRealtimeConnected,
    hasNotificationPermission,
    requestNotifications,
    testNotificationChime,
    updateHero,
    updateAbout,
    updateContact,
    addWork,
    updateWork,
    toggleWorkActive,
    deleteWork,
    addVideo,
    updateVideo,
    toggleVideoActive,
    deleteVideo,
    addProduct,
    updateProduct,
    toggleProductActive,
    deleteProduct,
    addAudience,
    updateAudience,
    toggleAudienceActive,
    deleteAudience,
    addAudiencePoint,
    removeAudiencePoint,
    addTestimonial,
    updateTestimonial,
    toggleTestimonialActive,
    deleteTestimonial,
    addFaq,
    updateFaq,
    toggleFaqActive,
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

  // Form State for Hero (including Hero Image)
  const [heroForm, setHeroForm] = useState(state.hero)

  // Form State for About (including Portrait Image)
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
              <span
                className={cn(
                  'flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.65rem] font-bold',
                  isRealtimeConnected
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    : 'bg-primary/20 text-foreground',
                )}
              >
                <span className={cn('size-1.5 rounded-full', isRealtimeConnected ? 'bg-emerald-500 animate-pulse' : 'bg-primary')} />
                {isRealtimeConnected ? 'Realtime Live' : 'Studio v2.5'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Realtime Push Notification Permission Toggle */}
            <button
              type="button"
              onClick={async () => {
                const granted = await requestNotifications()
                if (granted) {
                  toast('Device notifications enabled for new orders & inquiries!')
                } else {
                  toast('Please allow notifications in your browser settings.')
                }
              }}
              title={hasNotificationPermission ? 'Device Notifications Active' : 'Enable Device Push Notifications'}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all',
                hasNotificationPermission
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'border-amber-500/30 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20',
              )}
            >
              <BellRing className="size-3.5" />
              <span className="hidden sm:inline">
                {hasNotificationPermission ? 'Push Active' : 'Enable Push Alerts'}
              </span>
            </button>

            {/* Test Notification Chime */}
            <button
              type="button"
              onClick={() => {
                testNotificationChime()
                toast('Played notification chime & sent test alert!')
              }}
              title="Test Notification Sound & Alert"
              className="hidden items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted md:inline-flex"
            >
              <Volume2 className="size-3.5 text-primary" />
              Test Chime
            </button>

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
              className="hidden items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted sm:inline-flex"
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
              { id: 'hero', label: 'Hero & Photo', icon: Sparkles, badge: null },
              { id: 'about', label: 'About & Portrait', icon: BookOpen, badge: null },
              { id: 'works', label: 'Work Showcase', icon: Palette, badge: state.works.length },
              { id: 'videos', label: 'Video Lessons', icon: Video, badge: state.videos.length },
              { id: 'shop', label: 'Resource Shop', icon: ShoppingBag, badge: state.products.length },
              { id: 'audiences', label: 'Target Audiences', icon: GraduationCap, badge: state.audiences.length },
              { id: 'testimonials', label: 'Testimonials', icon: Star, badge: state.testimonials.length },
              { id: 'faqs', label: 'FAQ Section', icon: HelpCircle, badge: state.faqs.length },
              { id: 'contact', label: 'Contact Details', icon: Phone, badge: null },
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
              { id: 'database', label: 'Supabase SQL', icon: Database, badge: null },
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
                        Welcome to your Realtime Studio
                      </h2>
                      <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        Full CRUD control over every photo, text, DIY prop, rental item, incoming inquiry, and customer order in Sfax.
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
                      <div className="flex items-center justify-between">
                        <p className="text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">
                          Works Showcase
                        </p>
                        <span className="text-[0.65rem] font-semibold text-emerald-600">
                          {state.works.filter((w) => w.isActive !== false).length} Active
                        </span>
                      </div>
                      <p className="mt-1 font-serif text-2xl font-bold text-foreground sm:text-3xl">
                        {state.works.length}
                      </p>
                      <p className="text-[0.65rem] text-muted-foreground">Props, posters, worksheets</p>
                    </div>

                    <div className="rounded-2xl border border-border/80 bg-background/80 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">
                          Shop Products
                        </p>
                        <span className="text-[0.65rem] font-semibold text-emerald-600">
                          {state.products.filter((p) => p.isActive !== false).length} Active
                        </span>
                      </div>
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
                    onClick={() => setActiveTab('database')}
                    className="flex items-center gap-3 rounded-2xl border border-border/80 bg-card p-4 text-left shadow-xs transition-all hover:border-primary hover:shadow-md"
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/20 text-foreground">
                      <Database className="size-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Supabase Database SQL</h4>
                      <p className="text-[0.7rem] text-muted-foreground">Copy complete database schema &amp; setup</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* 2. HERO & HERO PHOTO TAB */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold">Hero Section &amp; Classroom Photo</h2>
                    <p className="text-xs text-muted-foreground">
                      Edit the main headline, bio introduction, hero photo, and above-the-fold statistics.
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
                        toast('Hero Section, Photo & Stats saved successfully!')
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:shadow-md"
                    >
                      <Save className="size-3.5" />
                      Save Changes
                    </button>
                  </div>
                </div>

                {/* Hero Photo CRUD */}
                <div className="rounded-2xl border border-primary/30 bg-card p-5 space-y-4 shadow-xs">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="size-4 text-primary" />
                    <h3 className="font-serif text-sm font-bold text-foreground">Home Section Hero Photo</h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
                    <div className="relative aspect-[4/4.4] w-full overflow-hidden rounded-xl border border-border bg-muted">
                      <Image
                        src={heroForm.image || '/images/hero-classroom.png'}
                        alt="Hero Preview"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="mb-1 block text-xs font-semibold">Hero Photo URL / Local Path</label>
                        <input
                          type="text"
                          value={heroForm.image || ''}
                          onChange={(e) => setHeroForm({ ...heroForm, image: e.target.value })}
                          placeholder="/images/hero-classroom.png"
                          className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <span className="text-[0.65rem] font-bold uppercase text-muted-foreground">Quick Presets:</span>
                        <div className="mt-1.5 flex flex-wrap gap-2">
                          {[
                            { name: 'Classroom Hero', url: '/images/hero-classroom.png' },
                            { name: 'Phonics Kit', url: '/images/product-phonics-wheel.png' },
                            { name: 'Farah Portrait', url: '/images/farah-portrait.png' },
                          ].map((preset) => (
                            <button
                              key={preset.url}
                              type="button"
                              onClick={() => setHeroForm({ ...heroForm, image: preset.url })}
                              className="rounded-lg border border-border bg-muted/40 px-2.5 py-1 text-[0.7rem] font-semibold hover:bg-muted"
                            >
                              {preset.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
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

            {/* 3. ABOUT & PORTRAIT PHOTO TAB */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold">About Farah &amp; Portrait Photo</h2>
                    <p className="text-xs text-muted-foreground">
                      Edit the narrative story, portrait photo, manifesto quote, location, and the 4 methodology pillars.
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
                        toast('About Section, Portrait & Pillars saved successfully!')
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:shadow-md"
                    >
                      <Save className="size-3.5" />
                      Save Changes
                    </button>
                  </div>
                </div>

                {/* About Portrait Photo CRUD */}
                <div className="rounded-2xl border border-primary/30 bg-card p-5 space-y-4 shadow-xs">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="size-4 text-primary" />
                    <h3 className="font-serif text-sm font-bold text-foreground">About Me Portrait Photo</h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
                    <div className="relative aspect-[4/4.7] w-full overflow-hidden rounded-xl border border-border bg-muted">
                      <Image
                        src={aboutForm.portraitImage || '/images/farah-portrait.png'}
                        alt="Portrait Preview"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="mb-1 block text-xs font-semibold">Portrait Photo URL / Local Path</label>
                        <input
                          type="text"
                          value={aboutForm.portraitImage || ''}
                          onChange={(e) => setAboutForm({ ...aboutForm, portraitImage: e.target.value })}
                          placeholder="/images/farah-portrait.png"
                          className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <span className="text-[0.65rem] font-bold uppercase text-muted-foreground">Quick Presets:</span>
                        <div className="mt-1.5 flex flex-wrap gap-2">
                          {[
                            { name: 'Default Portrait', url: '/images/farah-portrait.png' },
                            { name: 'Classroom Hero', url: '/images/hero-classroom.png' },
                            { name: 'Story Kit', url: '/images/product-story-kit.png' },
                          ].map((preset) => (
                            <button
                              key={preset.url}
                              type="button"
                              onClick={() => setAboutForm({ ...aboutForm, portraitImage: preset.url })}
                              className="rounded-lg border border-border bg-muted/40 px-2.5 py-1 text-[0.7rem] font-semibold hover:bg-muted"
                            >
                              {preset.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
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
                            Highlights (comma separated)
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

            {/* 4. WORK SHOWCASE TAB (CRUD + ACTIVATE/DEACTIVATE) */}
            {activeTab === 'works' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold">Portfolio Work Items ({state.works.length})</h2>
                    <p className="text-xs text-muted-foreground">
                      Add, update, activate/deactivate, or remove handcrafted props, printable worksheets, and posters.
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
                  {state.works.map((item) => {
                    const isItemActive = item.isActive !== false
                    return (
                      <div
                        key={item.id}
                        className={cn(
                          'group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card shadow-xs transition-all',
                          isItemActive ? 'border-border/80 hover:border-primary/50' : 'border-dashed border-muted-foreground/40 opacity-70 bg-muted/20',
                        )}
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

                          <button
                            type="button"
                            onClick={() => {
                              toggleWorkActive(item.id)
                              toast(`"${item.title}" is now ${isItemActive ? 'Deactivated (Hidden)' : 'Active (Live)'}`)
                            }}
                            className={cn(
                              'absolute right-3 top-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.65rem] font-bold shadow-md backdrop-blur-sm transition-all',
                              isItemActive
                                ? 'bg-emerald-500 text-white'
                                : 'bg-muted-foreground/80 text-white',
                            )}
                          >
                            {isItemActive ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                            {isItemActive ? 'Active' : 'Hidden'}
                          </button>
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
                    )
                  })}
                </div>
              </div>
            )}

            {/* 5. VIDEO LESSONS TAB (CRUD + ACTIVATE/DEACTIVATE) */}
            {activeTab === 'videos' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold">Video Lessons &amp; Clips ({state.videos.length})</h2>
                    <p className="text-xs text-muted-foreground">
                      Manage, activate/deactivate, or add video mini-lessons and demonstrations.
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
                  {state.videos.map((vid) => {
                    const isVidActive = vid.isActive !== false
                    return (
                      <div
                        key={vid.id}
                        className={cn(
                          'group flex flex-col justify-between overflow-hidden rounded-2xl border bg-card shadow-xs',
                          isVidActive ? 'border-border/80' : 'border-dashed border-muted-foreground/40 opacity-70 bg-muted/20',
                        )}
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
                          <button
                            type="button"
                            onClick={() => {
                              toggleVideoActive(vid.id)
                              toast(`"${vid.title}" is now ${isVidActive ? 'Deactivated (Hidden)' : 'Active (Live)'}`)
                            }}
                            className={cn(
                              'absolute right-2 top-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.65rem] font-bold shadow-md',
                              isVidActive ? 'bg-emerald-500 text-white' : 'bg-muted-foreground/80 text-white',
                            )}
                          >
                            {isVidActive ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                            {isVidActive ? 'Active' : 'Hidden'}
                          </button>
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
                    )
                  })}
                </div>
              </div>
            )}

            {/* 6. RESOURCE SHOP TAB (CRUD + ACTIVATE/DEACTIVATE) */}
            {activeTab === 'shop' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold">Resource Shop Products ({state.products.length})</h2>
                    <p className="text-xs text-muted-foreground">
                      Add, price, activate/deactivate, and manage DIY props and printable sets available for buy or rent.
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
                  {state.products.map((prod) => {
                    const isProdActive = prod.isActive !== false
                    return (
                      <div
                        key={prod.id}
                        className={cn(
                          'group flex flex-col justify-between overflow-hidden rounded-2xl border bg-card shadow-xs',
                          isProdActive ? 'border-border/80' : 'border-dashed border-muted-foreground/40 opacity-70 bg-muted/20',
                        )}
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

                          <button
                            type="button"
                            onClick={() => {
                              toggleProductActive(prod.id)
                              toast(`"${prod.name}" is now ${isProdActive ? 'Deactivated (Hidden)' : 'Active (Live)'}`)
                            }}
                            className={cn(
                              'absolute right-2 top-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.65rem] font-bold shadow-md',
                              isProdActive ? 'bg-emerald-500 text-white' : 'bg-muted-foreground/80 text-white',
                            )}
                          >
                            {isProdActive ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                            {isProdActive ? 'Active' : 'Hidden'}
                          </button>
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
                    )
                  })}
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
                      Edit or deactivate tailored messaging for Students, Parents, and Teachers.
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
                  {state.audiences.map((aud) => {
                    const isAudActive = aud.isActive !== false
                    return (
                      <div
                        key={aud.id}
                        className={cn(
                          'rounded-2xl border bg-card p-4 space-y-3',
                          isAudActive ? 'border-border' : 'border-dashed border-muted-foreground/40 opacity-70 bg-muted/20',
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-sm font-bold">{aud.title}</span>
                          <button
                            type="button"
                            onClick={() => {
                              toggleAudienceActive(aud.id)
                              toast(`"${aud.title}" is now ${isAudActive ? 'Deactivated' : 'Active'}`)
                            }}
                            className={cn(
                              'flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.65rem] font-bold',
                              isAudActive ? 'bg-emerald-500/20 text-emerald-600' : 'bg-muted text-muted-foreground',
                            )}
                          >
                            {isAudActive ? 'Active' : 'Deactivated'}
                          </button>
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
                    )
                  })}
                </div>
              </div>
            )}

            {/* 8. TESTIMONIALS TAB (CRUD + ACTIVATE/DEACTIVATE) */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold">
                      Community Testimonials ({state.testimonials.length})
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Add, update, activate/deactivate, and manage endorsements from parents and teachers.
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
                  {state.testimonials.map((test) => {
                    const isTestActive = test.isActive !== false
                    return (
                      <div
                        key={test.id}
                        className={cn(
                          'flex flex-col justify-between rounded-2xl border bg-card p-5 shadow-xs',
                          isTestActive ? 'border-border' : 'border-dashed border-muted-foreground/40 opacity-70 bg-muted/20',
                        )}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-primary">
                              {Array.from({ length: test.rating || 5 }).map((_, i) => (
                                <Star key={i} className="size-3.5 fill-current" />
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                toggleTestimonialActive(test.id)
                                toast(`Testimonial from ${test.name} is now ${isTestActive ? 'Hidden' : 'Live'}`)
                              }}
                              className={cn(
                                'flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.65rem] font-bold',
                                isTestActive ? 'bg-emerald-500/20 text-emerald-600' : 'bg-muted text-muted-foreground',
                              )}
                            >
                              {isTestActive ? 'Active' : 'Hidden'}
                            </button>
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
                    )
                  })}
                </div>
              </div>
            )}

            {/* 9. FAQS TAB (CRUD + ACTIVATE/DEACTIVATE) */}
            {activeTab === 'faqs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold">Frequently Asked Questions ({state.faqs.length})</h2>
                    <p className="text-xs text-muted-foreground">
                      Edit, activate/deactivate, or add new questions to provide clarity on rentals and workshops.
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
                  {state.faqs.map((faq) => {
                    const isFaqActive = faq.isActive !== false
                    return (
                      <div
                        key={faq.id}
                        className={cn(
                          'flex items-start justify-between gap-4 rounded-2xl border bg-card p-4 shadow-xs',
                          isFaqActive ? 'border-border' : 'border-dashed border-muted-foreground/40 opacity-70 bg-muted/20',
                        )}
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif text-sm font-semibold text-foreground">{faq.q}</h4>
                            <button
                              type="button"
                              onClick={() => {
                                toggleFaqActive(faq.id)
                                toast(`FAQ is now ${isFaqActive ? 'Hidden' : 'Active'}`)
                              }}
                              className={cn(
                                'rounded-full px-2 py-0.5 text-[0.65rem] font-bold',
                                isFaqActive ? 'bg-emerald-500/20 text-emerald-600' : 'bg-muted text-muted-foreground',
                              )}
                            >
                              {isFaqActive ? 'Active' : 'Hidden'}
                            </button>
                          </div>
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
                    )
                  })}
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
                      Messages sent directly through the portfolio web app (no Outlook or external client required).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={testNotificationChime}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted"
                  >
                    <Volume2 className="size-3.5 text-primary" />
                    Test Alert Tone
                  </button>
                </div>

                {state.messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-12 text-center">
                    <Inbox className="size-10 text-muted-foreground" />
                    <p className="mt-2 font-serif text-base font-semibold">No messages yet</p>
                    <p className="text-xs text-muted-foreground">
                      When visitors send an inquiry through the contact form, it will pop up here instantly in real-time with an alert chime.
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
                            {msg.status === 'unread' && (
                              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[0.65rem] font-bold text-amber-600 dark:text-amber-400">
                                New
                              </span>
                            )}
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
                  <button
                    type="button"
                    onClick={testNotificationChime}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted"
                  >
                    <Volume2 className="size-3.5 text-primary" />
                    Test Alert Tone
                  </button>
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

            {/* 13. SUPABASE DATABASE SCHEMA TAB */}
            {activeTab === 'database' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold">Supabase PostgreSQL Schema</h2>
                    <p className="text-xs text-muted-foreground">
                      Run this clean deadlock-free script in your Supabase SQL Editor.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const sqlScript = `-- 100% Deadlock-Free Supabase Schema for Farah Affes Portfolio\nCREATE EXTENSION IF NOT EXISTS "uuid-ossp";\n\nCREATE TABLE IF NOT EXISTS public.contact_messages (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,\n    name TEXT NOT NULL,\n    email TEXT NOT NULL,\n    role TEXT DEFAULT 'Student',\n    topic TEXT DEFAULT 'General question',\n    message TEXT NOT NULL,\n    status TEXT DEFAULT 'unread'\n);\n\nCREATE TABLE IF NOT EXISTS public.orders (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,\n    customer_name TEXT DEFAULT 'Guest',\n    customer_email TEXT DEFAULT 'Not provided',\n    customer_phone TEXT NOT NULL,\n    customer_location TEXT DEFAULT 'Sfax, Tunisia',\n    items JSONB NOT NULL DEFAULT '[]'::jsonb,\n    subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0.00,\n    currency TEXT DEFAULT 'TND',\n    status TEXT DEFAULT 'pending',\n    rental_dates TEXT,\n    notes TEXT\n);\n\nCREATE TABLE IF NOT EXISTS public.portfolio_settings (\n    id TEXT PRIMARY KEY DEFAULT 'current_state',\n    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,\n    hero JSONB NOT NULL DEFAULT '{}'::jsonb,\n    about JSONB NOT NULL DEFAULT '{}'::jsonb,\n    stats JSONB NOT NULL DEFAULT '[]'::jsonb,\n    contact JSONB NOT NULL DEFAULT '{}'::jsonb,\n    admin_pin TEXT DEFAULT 'farah2026'\n);\n\nALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;\nALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;\nALTER TABLE public.portfolio_settings ENABLE ROW LEVEL SECURITY;\n\nDO $$\nBEGIN\n    DROP POLICY IF EXISTS "Public access on contact_messages" ON public.contact_messages;\n    CREATE POLICY "Public access on contact_messages" ON public.contact_messages FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);\n\n    DROP POLICY IF EXISTS "Public access on orders" ON public.orders;\n    CREATE POLICY "Public access on orders" ON public.orders FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);\n\n    DROP POLICY IF EXISTS "Public access on portfolio_settings" ON public.portfolio_settings;\n    CREATE POLICY "Public access on portfolio_settings" ON public.portfolio_settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);\nEND $$;\n\nDO $$\nDECLARE\n    tbl text;\n    tables_to_add text[] := ARRAY['contact_messages', 'orders', 'portfolio_settings'];\nBEGIN\n    FOREACH tbl IN ARRAY tables_to_add\n    LOOP\n        IF NOT EXISTS (\n            SELECT 1 FROM pg_publication_tables \n            WHERE pubname = 'supabase_realtime' \n              AND schemaname = 'public' \n              AND tablename = tbl\n        ) THEN\n            EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE public.%I', tbl);\n        END IF;\n    END LOOP;\nEND $$;`
                      navigator.clipboard.writeText(sqlScript)
                      toast('Full Supabase SQL copied to clipboard!')
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:shadow-md"
                  >
                    <Copy className="size-3.5" />
                    Copy Clean SQL
                  </button>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-xs">
                  <div className="flex items-center gap-3 rounded-xl bg-primary/10 p-3.5 text-xs text-foreground">
                    <Sparkles className="size-4 shrink-0 text-primary" />
                    <p>
                      <strong>How to install in Supabase:</strong> Open your Supabase project dashboard, click <strong>SQL Editor</strong> on the left sidebar, click <strong>New Query</strong>, paste this code, and click <strong>Run</strong>.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-muted/40 p-4 font-mono text-xs text-foreground overflow-x-auto">
                    <pre>{`-- 1. Create table for Contact Messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT DEFAULT 'Student',
    topic TEXT DEFAULT 'General question',
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread'
);

-- 2. Create table for Material & Resource Orders (Buy & Rent)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer_name TEXT DEFAULT 'Guest',
    customer_email TEXT DEFAULT 'Not provided',
    customer_phone TEXT NOT NULL,
    customer_location TEXT DEFAULT 'Sfax, Tunisia',
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    currency TEXT DEFAULT 'TND',
    status TEXT DEFAULT 'pending',
    rental_dates TEXT,
    notes TEXT
);

-- 3. Create table for Live Dynamic Portfolio Settings
CREATE TABLE IF NOT EXISTS public.portfolio_settings (
    id TEXT PRIMARY KEY DEFAULT 'current_state',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    hero JSONB NOT NULL DEFAULT '{}'::jsonb,
    about JSONB NOT NULL DEFAULT '{}'::jsonb,
    stats JSONB NOT NULL DEFAULT '[]'::jsonb,
    contact JSONB NOT NULL DEFAULT '{}'::jsonb,
    admin_pin TEXT DEFAULT 'farah2026'
);

-- 4. Enable Row Level Security (RLS) & Clean Policies
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_settings ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    DROP POLICY IF EXISTS "Public access on contact_messages" ON public.contact_messages;
    CREATE POLICY "Public access on contact_messages" ON public.contact_messages FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Public access on orders" ON public.orders;
    CREATE POLICY "Public access on orders" ON public.orders FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Public access on portfolio_settings" ON public.portfolio_settings;
    CREATE POLICY "Public access on portfolio_settings" ON public.portfolio_settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
END $$;

-- 5. Safe & Idempotent Realtime Publication Setup
DO $$
DECLARE
    tbl text;
    tables_to_add text[] := ARRAY['contact_messages', 'orders', 'portfolio_settings'];
BEGIN
    FOREACH tbl IN ARRAY tables_to_add
    LOOP
        IF NOT EXISTS (
            SELECT 1 FROM pg_publication_tables 
            WHERE pubname = 'supabase_realtime' 
              AND schemaname = 'public' 
              AND tablename = tbl
        ) THEN
            EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE public.%I', tbl);
        END IF;
    END LOOP;
END $$;`}</pre>
                  </div>
                </div>
              </div>
            )}

            {/* 14. STUDIO SETTINGS & BACKUP TAB */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-xl font-bold">Studio Security &amp; Data Management</h2>
                  <p className="text-xs text-muted-foreground">
                    Update your admin access PIN, export full portfolio backups, or restore previous states.
                  </p>
                </div>

                {/* Device Notification Settings */}
                <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-base font-bold">Device &amp; Mobile Push Alerts</h3>
                      <p className="text-xs text-muted-foreground">
                        Receive instant SMS-style sound &amp; push alerts when visitors send inquiries or place orders.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={testNotificationChime}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted"
                    >
                      <Volume2 className="size-3.5 text-primary" /> Test Tone
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-border bg-muted/20 p-3.5">
                    <div className="flex items-center gap-3">
                      <BellRing className="size-4 text-primary" />
                      <span className="text-xs font-semibold">Browser &amp; OS Push Notifications</span>
                    </div>
                    <button
                      type="button"
                      onClick={async () => {
                        const granted = await requestNotifications()
                        if (granted) {
                          toast('Device push alerts enabled!')
                        } else {
                          toast('Please allow notification permission in your browser.')
                        }
                      }}
                      className={cn(
                        'rounded-lg px-3 py-1 text-xs font-semibold transition-all',
                        hasNotificationPermission
                          ? 'bg-emerald-500 text-white'
                          : 'bg-primary text-primary-foreground',
                      )}
                    >
                      {hasNotificationPermission ? 'Enabled ✓' : 'Enable Push'}
                    </button>
                  </div>
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
  const [isActive, setIsActive] = useState(item?.isActive !== false)

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
      isActive,
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

          <div className="flex items-center gap-2 rounded-xl bg-muted/40 p-2.5">
            <input
              type="checkbox"
              id="workActiveCheckbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="size-4 rounded text-primary focus:ring-primary"
            />
            <label htmlFor="workActiveCheckbox" className="text-xs font-semibold cursor-pointer">
              Active (Visible on public portfolio website)
            </label>
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
  const [isActive, setIsActive] = useState(item?.isActive !== false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title,
      duration,
      category,
      level,
      src,
      thumbnail,
      isActive,
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

          <div className="flex items-center gap-2 rounded-xl bg-muted/40 p-2.5">
            <input
              type="checkbox"
              id="vidActiveCheckbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="size-4 rounded text-primary focus:ring-primary"
            />
            <label htmlFor="vidActiveCheckbox" className="text-xs font-semibold cursor-pointer">
              Active (Visible on public portfolio website)
            </label>
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
  const [isActive, setIsActive] = useState(item?.isActive !== false)

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
      isActive,
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

          <div className="flex items-center gap-2 rounded-xl bg-muted/40 p-2.5">
            <input
              type="checkbox"
              id="prodActiveCheckbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="size-4 rounded text-primary focus:ring-primary"
            />
            <label htmlFor="prodActiveCheckbox" className="text-xs font-semibold cursor-pointer">
              Active (Visible in public shop &amp; cart checkout)
            </label>
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
  const [isActive, setIsActive] = useState(item?.isActive !== false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ name, role, quote, rating, isActive })
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

          <div className="flex items-center gap-2 rounded-xl bg-muted/40 p-2.5">
            <input
              type="checkbox"
              id="testActiveCheckbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="size-4 rounded text-primary focus:ring-primary"
            />
            <label htmlFor="testActiveCheckbox" className="text-xs font-semibold cursor-pointer">
              Active (Visible on public testimonials slider)
            </label>
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
  const [isActive, setIsActive] = useState(item?.isActive !== false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ q, a, isActive })
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

          <div className="flex items-center gap-2 rounded-xl bg-muted/40 p-2.5">
            <input
              type="checkbox"
              id="faqActiveCheckbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="size-4 rounded text-primary focus:ring-primary"
            />
            <label htmlFor="faqActiveCheckbox" className="text-xs font-semibold cursor-pointer">
              Active (Visible in public FAQ accordion)
            </label>
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
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-center">
                <div>
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
                </div>

                <div className="relative aspect-[4/4.4] w-full overflow-hidden rounded-2xl border-2 border-white/80 shadow-xl">
                  <Image
                    src={heroData.image || '/images/hero-classroom.png'}
                    alt="Hero Preview"
                    fill
                    className="object-cover"
                  />
                </div>
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
              <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="relative aspect-[4/4.7] w-full overflow-hidden rounded-2xl border-2 border-white/80 shadow-xl">
                  <Image
                    src={aboutData.portraitImage || '/images/farah-portrait.png'}
                    alt="Portrait Preview"
                    fill
                    className="object-cover"
                  />
                </div>

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
              {state.works.filter((w) => w.isActive !== false).slice(0, 6).map((w) => (
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
              {state.videos.filter((v) => v.isActive !== false).slice(0, 3).map((v) => (
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
              {state.products.filter((p) => p.isActive !== false).slice(0, 3).map((p) => (
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
              {state.testimonials.filter((t) => t.isActive !== false).slice(0, 3).map((t) => (
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
              {state.faqs.filter((f) => f.isActive !== false).slice(0, 4).map((f) => (
                <div key={f.id} className="rounded-xl border border-border bg-card p-3">
                  <h4 className="font-serif text-xs font-bold">{f.q}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          )}

          {section === 'audiences' && (
            <div className="grid gap-4 sm:grid-cols-3">
              {state.audiences.filter((a) => a.isActive !== false).map((a) => (
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
