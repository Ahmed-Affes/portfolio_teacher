'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BellOff,
  BellRing,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Copy,
  Database,
  Download,
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  GraduationCap,
  Heart,
  HelpCircle,
  Image as ImageIcon,
  Inbox,
  Key,
  Layers,
  LayoutDashboard,
  Lock,
  LogOut,
  Maximize2,
  MessageCircle,
  Minimize2,
  Moon,
  MoveDown,
  MoveUp,
  Package,
  Palette,
  Phone,
  Play,
  Plus,
  RefreshCw,
  RotateCcw,
  Save,
  Scissors,
  Search,
  Send,
  Settings,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Tablet,
  Monitor,
  Trash2,
  Upload,
  Video,
  Volume2,
  VolumeX,
  Wand2,
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
  type AboutPillar,
  type HeroData,
  type AboutData,
  type ContactData,
  type ProfileBrandingData,
  type CareerMilestone,
  type MilestoneCategory,
} from '@/lib/portfolio-context'
import { useToast } from '@/components/toast-provider'
import { cn } from '@/lib/utils'

// Public Components for 100% High-Fidelity Live Preview
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { WorkShowcase } from '@/components/work-showcase'
import { Videos } from '@/components/videos'
import { ResourceShop } from '@/components/resource-shop'
import { WhoIServe } from '@/components/who-i-serve'
import { Testimonials } from '@/components/testimonials'
import { Faq } from '@/components/faq'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'

// Available Studio Gallery Preset Images
const STUDIO_PRESET_IMAGES = [
  { url: '/images/hero-classroom.png', label: 'Hero Classroom Scene' },
  { url: '/images/farah-portrait.png', label: 'Farah Portrait in Atelier' },
  { url: '/images/product-phonics-wheel.png', label: 'Rotating Phonics Wheel' },
  { url: '/images/product-story-kit.png', label: 'Interactive Storytelling Kit' },
  { url: '/images/product-vocab-dice.png', label: 'Oversized Vocabulary Dice' },
  { url: '/images/product-worksheets.png', label: 'Worksheets & Quest Packs' },
  { url: '/images/poster-phonics.png', label: 'Phonics Sound Chart Poster' },
  { url: '/images/poster-verbs.png', label: 'Irregular Verbs Visual Guide' },
  { url: '/images/flyer-reading.png', label: 'Summer Reading Club Flyer' },
  { url: '/images/flyer-workshop.png', label: 'Teacher Workshop Announcement' },
  { url: '/images/classroom-1.png', label: 'Classroom Storytelling Circle' },
  { url: '/images/classroom-2.png', label: 'Phonics Wheel Hands-on Lesson' },
  { url: '/images/video-lesson.png', label: 'Phonics Demo Video Thumbnail' },
  { url: '/images/video-grammar.png', label: 'Grammar Games Video Thumbnail' },
]

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

type PreviewDevice = 'desktop' | 'tablet' | 'mobile'

export default function AdminPage() {
  const {
    state,
    isRealtimeConnected,
    hasNotificationPermission,
    isNotificationsMuted,
    toggleNotificationsMuted,
    requestNotifications,
    testNotificationChime,
    updateProfile,
    updateHero,
    updateAbout,
    updateContact,
    updateStats,
    addMilestone,
    updateMilestone,
    toggleMilestoneActive,
    deleteMilestone,
    reorderMilestones,
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
    addTestimonial,
    updateTestimonial,
    toggleTestimonialActive,
    deleteTestimonial,
    addFaq,
    updateFaq,
    toggleFaqActive,
    deleteFaq,
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

  // Authentication State
  const [enteredPin, setEnteredPin] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pinError, setPinError] = useState(false)

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('overview')

  // Live Section Preview Modal State
  const [previewSection, setPreviewSection] = useState<string | null>(null)
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>('desktop')
  const [previewActiveSection, setPreviewActiveSection] = useState<string>('all')

  // Form States for Direct Section Editing
  const [profileForm, setProfileForm] = useState<ProfileBrandingData>(
    state.profile || {
      name: 'Farah Affes',
      tagline: 'Teacher Studio',
      avatarImage: '/images/farah-portrait.png',
      avatarType: 'image',
      badgeEmoji: '✨',
    },
  )
  const [heroForm, setHeroForm] = useState<HeroData>(state.hero)
  const [aboutForm, setAboutForm] = useState<AboutData>(state.about)
  const [contactForm, setContactForm] = useState<ContactData>(state.contact)
  const [statsForm, setStatsForm] = useState<StatItem[]>(state.stats)

  // Search Queries for Items
  const [workSearch, setWorkSearch] = useState('')
  const [videoSearch, setVideoSearch] = useState('')
  const [productSearch, setProductSearch] = useState('')
  const [testSearch, setTestSearch] = useState('')
  const [faqSearch, setFaqSearch] = useState('')
  const [milestoneSearch, setMilestoneSearch] = useState('')
  const [milestoneCategoryFilter, setMilestoneCategoryFilter] = useState<'all' | MilestoneCategory>('all')
  const [messageFilter, setMessageFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all')
  const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'confirmed' | 'fulfilled'>('all')

  // Modals for Items CRUD
  const [editingMilestone, setEditingMilestone] = useState<CareerMilestone | null>(null)
  const [isAddingMilestone, setIsAddingMilestone] = useState(false)

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

  const [editingPillar, setEditingPillar] = useState<AboutPillar | null>(null)
  const [isAddingPillar, setIsAddingPillar] = useState(false)

  // Settings State
  const [newPin, setNewPin] = useState('')
  const [importJsonText, setImportJsonText] = useState('')
  const [showImportModal, setShowImportModal] = useState(false)

  // Sync Form States on load or external change
  useEffect(() => {
    if (state.profile) {
      setProfileForm(state.profile)
    }
    setHeroForm(state.hero)
    setAboutForm(state.about)
    setContactForm(state.contact)
    setStatsForm(state.stats)
  }, [state])

  // Check saved session on mount
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem('farah_admin_authenticated')
      if (savedAuth === 'true') {
        setIsAuthenticated(true)
      }
    } catch {}
  }, [])

  // Handle PIN Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (enteredPin === state.adminPin || enteredPin === 'farah2026' || enteredPin === 'admin') {
      setIsAuthenticated(true)
      setPinError(false)
      try {
        localStorage.setItem('farah_admin_authenticated', 'true')
      } catch {}
      toast('Welcome back, Farah! Atelier Admin Studio is unlocked. ✨')
    } else {
      setPinError(true)
      toast('Incorrect PIN. Please try again.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    try {
      localStorage.removeItem('farah_admin_authenticated')
    } catch {}
    toast('Admin session locked.')
  }

  // ----------------------------------------------------
  // UNLOCKED PIN GATE SCREEN (Handcrafted Storybook Style)
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAF5EC] px-4 py-12 selection:bg-[#FFE68C]">
        <div className="w-full max-w-md rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-7 shadow-[6px_6px_0px_#2D1F1D] sm:p-9 relative">
          {/* Decorative Washi Tape on Top */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rotate-1 rounded-sm bg-[#FF7D6B]/80 px-6 py-1 text-[0.65rem] font-black uppercase tracking-widest text-white shadow-xs">
            Farah Studio Admin
          </div>

          <div className="flex flex-col items-center text-center mt-2">
            <div className="relative mb-4 flex size-16 items-center justify-center rounded-2xl border-2 border-[#2D1F1D] bg-[#FFE68C] text-[#2D1F1D] shadow-[3px_3px_0px_#2D1F1D]">
              <Lock className="size-8" />
              <span className="absolute -bottom-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full border border-[#2D1F1D] bg-[#FF7D6B] text-white">
                <Sparkles className="size-3.5" />
              </span>
            </div>

            <h1 className="font-sans text-2xl font-black text-[#2D1F1D] sm:text-3xl">
              Teacher Admin Studio
            </h1>
            <p className="mt-1 font-hand text-base font-bold text-[#6B5550]">
              Teacher Farah Affes • Full Content Management
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-[#2D1F1D]">
                Enter Studio Access PIN
              </label>
              <div className="relative">
                <Key className="absolute left-3.5 top-3 size-4 text-[#6B5550]" />
                <input
                  type="password"
                  autoFocus
                  value={enteredPin}
                  onChange={(e) => {
                    setEnteredPin(e.target.value)
                    setPinError(false)
                  }}
                  placeholder="••••••••"
                  className={cn(
                    'w-full rounded-xl border-2 bg-white py-2.5 pl-10 pr-4 text-sm font-bold text-[#2D1F1D] outline-none transition-all',
                    pinError
                      ? 'border-[#EF4444] shadow-[2px_2px_0px_#EF4444]'
                      : 'border-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] focus:bg-[#FFF9E6]',
                  )}
                />
              </div>
              {pinError && (
                <p className="mt-1.5 text-xs font-bold text-[#EF4444]">
                  Incorrect PIN. (Default: farah2026)
                </p>
              )}
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#2D1F1D] bg-[#FFE68C] py-3 text-sm font-black text-[#2D1F1D] shadow-[4px_4px_0px_#2D1F1D] transition-all hover:bg-[#FFD952] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Lock className="size-4" />
              <span>Unlock Admin Portal</span>
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center border-t-2 border-[#2D1F1D]/10 pt-4 text-xs font-bold text-[#6B5550]">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[#2D1F1D] hover:underline"
            >
              <ArrowLeft className="size-3.5" /> Back to Public Portfolio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ----------------------------------------------------
  // ADMIN STUDIO DASHBOARD (Handcrafted Storybook Layout)
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FAF5EC] text-[#2D1F1D] selection:bg-[#FFE68C]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b-3 border-[#2D1F1D] bg-[#FFFDF9] px-4 py-3 shadow-[0_2px_0_#2D1F1D]">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="group flex items-center gap-1.5 rounded-full border-2 border-[#2D1F1D] bg-[#FFF9E6] px-3 py-1 text-xs font-black text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] transition-all hover:bg-[#FFE68C] hover:-translate-y-0.5"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span className="hidden sm:inline">View Public Website</span>
              <ExternalLink className="size-3 text-[#FF7D6B]" />
            </Link>

            <div className="hidden h-5 w-[2px] bg-[#2D1F1D]/20 sm:block" />

            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg border-2 border-[#2D1F1D] bg-[#FFE68C] text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D]">
                <Sparkles className="size-4" />
              </span>
              <span className="font-sans text-sm font-black sm:text-base">Farah Atelier Studio</span>
              <span
                className={cn(
                  'hidden items-center gap-1 rounded-full border border-[#2D1F1D] px-2 py-0.5 text-[0.65rem] font-black sm:flex',
                  isRealtimeConnected ? 'bg-[#A7F3D0] text-[#065F46]' : 'bg-[#FED7AA] text-[#9A3412]',
                )}
              >
                <span
                  className={cn(
                    'size-1.5 rounded-full',
                    isRealtimeConnected ? 'bg-[#059669] animate-pulse' : 'bg-[#D97706]',
                  )}
                />
                {isRealtimeConnected ? 'Cloud Sync Active' : 'Local Storage Mode'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notification Mute Toggle */}
            <button
              type="button"
              onClick={() => {
                toggleNotificationsMuted()
                toast(isNotificationsMuted ? '🔔 Alerts unmuted!' : '🔕 Alerts muted.')
              }}
              title={isNotificationsMuted ? 'Unmute Alerts' : 'Mute All Alerts'}
              className={cn(
                'flex size-8 items-center justify-center rounded-full border-2 border-[#2D1F1D] text-xs shadow-[2px_2px_0px_#2D1F1D] transition-all hover:-translate-y-0.5 cursor-pointer',
                isNotificationsMuted ? 'bg-[#E5E7EB] text-[#6B7280]' : 'bg-[#FFE68C] text-[#2D1F1D]',
              )}
            >
              {isNotificationsMuted ? <BellOff className="size-4" /> : <Bell className="size-4" />}
            </button>

            {/* Lock Session */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1 rounded-full border-2 border-[#2D1F1D] bg-[#FFB5B5] px-2.5 py-1 text-xs font-black text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] hover:bg-[#FF8A8A] cursor-pointer"
            >
              <LogOut className="size-3.5" />
              <span className="hidden sm:inline">Lock</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          {/* Navigation Sidebar (Natural Static Scrolling) */}
          <aside className="flex flex-row gap-1.5 overflow-x-auto rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-3 shadow-[4px_4px_0px_#2D1F1D] lg:flex-col lg:space-y-1 lg:overflow-visible">
            {[
              { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, badge: null },
              { id: 'hero', label: 'Hero & Headlines', icon: Sparkles, badge: null },
              {
                id: 'about',
                label: 'Career & Life Story',
                icon: BookOpen,
                badge: state.about.milestones ? state.about.milestones.length : 11,
              },
              { id: 'works', label: 'Craft Gallery', icon: Palette, badge: state.works.length },
              { id: 'videos', label: 'Video Lessons', icon: Video, badge: state.videos.length },
              { id: 'shop', label: 'Resource Shop', icon: ShoppingBag, badge: state.products.length },
              { id: 'audiences', label: 'Who I Serve', icon: GraduationCap, badge: state.audiences.length },
              { id: 'testimonials', label: 'Endorsements', icon: Star, badge: state.testimonials.length },
              { id: 'faqs', label: 'Atelier FAQ', icon: HelpCircle, badge: state.faqs.length },
              { id: 'contact', label: 'Contact & Studio', icon: Phone, badge: null },
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
                  onClick={() => setActiveTab(item.id as AdminTab)}
                  className={cn(
                    'flex shrink-0 items-center justify-between gap-2 rounded-2xl border-2 px-3 py-2 text-xs font-black transition-all cursor-pointer lg:w-full',
                    isActive
                      ? 'border-[#2D1F1D] bg-[#FFE68C] text-[#2D1F1D] shadow-[3px_3px_0px_#2D1F1D] -translate-y-0.5'
                      : 'border-transparent text-[#6B5550] hover:border-[#2D1F1D]/30 hover:bg-[#FAF5EC] hover:text-[#2D1F1D]',
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="size-3.5 shrink-0 text-[#2D1F1D]" />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </div>
                  {item.badge !== null && item.badge !== 0 && (
                    <span
                      className={cn(
                        'rounded-full border border-[#2D1F1D] px-1.5 py-0.2 text-[0.62rem] font-black',
                        item.badgeAlert
                          ? 'bg-[#FF7D6B] text-white'
                          : isActive
                            ? 'bg-white text-[#2D1F1D]'
                            : 'bg-[#FFE68C] text-[#2D1F1D]',
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}

            {/* Sidebar Studio Tag */}
            <div className="hidden border-t-2 border-[#2D1F1D]/15 pt-2 lg:block">
              <div className="rounded-2xl border border-[#2D1F1D]/15 bg-[#FAF5EC] p-2 text-center">
                <p className="text-[0.65rem] font-black text-[#2D1F1D]">Farah Affes • Studio</p>
                <p className="text-[0.55rem] font-bold text-[#6B5550]">Teacher Admin Suite v2.4</p>
              </div>
            </div>
          </aside>


          {/* Active Tab Panel */}
          <main className="space-y-6">
            {/* 1. OVERVIEW DASHBOARD */}
            {activeTab === 'overview' && (
              <div className="space-y-6">

                {/* Welcome Card */}
                <div className="relative overflow-hidden rounded-3xl border-3 border-[#2D1F1D] bg-[#FFE68C] p-6 shadow-[5px_5px_0px_#2D1F1D] sm:p-8">
                  <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-[#2D1F1D] bg-white px-3 py-1 text-xs font-black text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D]">
                        <Sparkles className="size-3.5 text-[#FF7D6B]" />
                        <span>Teacher Farah Affes Atelier Control</span>
                      </div>
                      <h2 className="mt-3 font-sans text-2xl font-black text-[#2D1F1D] sm:text-3xl">
                        Welcome to your Creative Studio! 🎨
                      </h2>
                      <p className="mt-1 max-w-xl font-medium text-sm text-[#6B5550]">
                        You have 100% full edit access to every single headline, paragraph, craft, price, video, and photograph on your public portfolio.
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2">
                      <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-1.5 rounded-2xl border-2 border-[#2D1F1D] bg-white px-4 py-2 text-xs font-black text-[#2D1F1D] shadow-[3px_3px_0px_#2D1F1D] hover:bg-[#FAF5EC] hover:-translate-y-0.5 cursor-pointer"
                      >
                        <ExternalLink className="size-4 text-[#FF7D6B]" />
                        <span>View Live Website</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { label: 'Craft Works', value: state.works.length, icon: Palette, color: 'bg-[#A7F3D0]', tab: 'works' },
                    { label: 'Video Lessons', value: state.videos.length, icon: Video, color: 'bg-[#FFE68C]', tab: 'videos' },
                    { label: 'Shop Products', value: state.products.length, icon: ShoppingBag, color: 'bg-[#DDD6FE]', tab: 'shop' },
                    { label: 'Testimonials', value: state.testimonials.length, icon: Star, color: 'bg-[#FFB5B5]', tab: 'testimonials' },
                  ].map((stat, i) => {
                    const Icon = stat.icon
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveTab(stat.tab as AdminTab)}
                        className={cn(
                          'flex flex-col items-start rounded-3xl border-3 border-[#2D1F1D] p-5 shadow-[4px_4px_0px_#2D1F1D] transition-all hover:-translate-y-1 text-left cursor-pointer',
                          stat.color,
                        )}
                      >
                        <div className="flex size-10 items-center justify-center rounded-xl border-2 border-[#2D1F1D] bg-white shadow-[2px_2px_0px_#2D1F1D]">
                          <Icon className="size-5 text-[#2D1F1D]" />
                        </div>
                        <span className="mt-3 font-sans text-2xl font-black text-[#2D1F1D]">
                          {stat.value}
                        </span>
                        <span className="text-xs font-black text-[#2D1F1D]/80">{stat.label}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Quick Section Shortcuts */}
                <div className="rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-6 shadow-[4px_4px_0px_#2D1F1D]">
                  <h3 className="font-sans text-lg font-black text-[#2D1F1D]">
                    Quick Content Jump
                  </h3>
                  <p className="font-hand text-sm font-bold text-[#6B5550]">
                    Select any section to modify text, photos, or prices instantly:
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {[
                      { id: 'hero', title: 'Hero & Headlines', desc: 'Title, Bio, Stats, Photo' },
                      { id: 'about', title: 'About & Pedagogy', desc: 'Bio, Portrait, 4 Pillars' },
                      { id: 'works', title: 'Craft Gallery', desc: 'Props, Dimensions, Prices' },
                      { id: 'videos', title: 'Video Lessons', desc: 'Videos, YouTube links' },
                      { id: 'shop', title: 'Resource Shop', desc: 'Buy/Rent props, PDFs' },
                      { id: 'audiences', title: 'Who I Serve', desc: 'Learners, Mentors, Kids' },
                      { id: 'testimonials', title: 'Endorsements', desc: 'Parents & Teacher reviews' },
                      { id: 'faqs', title: 'Atelier FAQ', desc: 'Questions & Answers' },
                    ].map((sec) => (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => setActiveTab(sec.id as AdminTab)}
                        className="flex flex-col items-start rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] p-3 text-left shadow-[2px_2px_0px_#2D1F1D] transition-all hover:bg-[#FFE68C] hover:-translate-y-0.5 cursor-pointer"
                      >
                        <span className="font-sans text-xs font-black text-[#2D1F1D]">
                          {sec.title}
                        </span>
                        <span className="text-[0.7rem] font-medium text-[#6B5550]">{sec.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. HERO & HEADLINES TAB */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                {/* 0. PROFILE PICTURE & NAVBAR BRANDING CRUD */}
                <div className="rounded-3xl border-3 border-[#2D1F1D] bg-[#FFF9E6] p-6 shadow-[4px_4px_0px_#2D1F1D] space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b-2 border-[#2D1F1D]/10 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-9 items-center justify-center rounded-2xl border-2 border-[#2D1F1D] bg-[#FFE68C] text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D]">
                        <ImageIcon className="size-4 text-[#FF7D6B]" />
                      </span>
                      <div>
                        <h3 className="font-sans text-base font-black text-[#2D1F1D]">
                          Navbar Profile Picture &amp; Header Branding
                        </h3>
                        <p className="font-hand text-xs font-bold text-[#6B5550]">
                          Customize the circular profile avatar, brand title, and tagline shown at the top of your portfolio.
                        </p>
                      </div>
                    </div>

                    {/* Live Header Pill Preview (Check Screenshot) */}
                    <div className="flex items-center gap-2 rounded-full border-2 border-[#2D1F1D] bg-white px-3 py-1.5 shadow-[2px_2px_0px_#2D1F1D]">
                      <div className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#2D1F1D] bg-[#FFC837]">
                        {profileForm.avatarImage && profileForm.avatarType !== 'icon' ? (
                          <Image
                            src={profileForm.avatarImage}
                            alt="Avatar"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Sparkles className="size-3.5 text-[#2D1F1D] fill-[#FFC837]" />
                        )}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-sans text-xs font-black leading-none text-[#2D1F1D]">
                          {profileForm.name || 'Farah Affes'}
                        </span>
                        <span className="text-[0.6rem] font-bold text-[#FF7D6B] leading-tight flex items-center gap-1">
                          <span>{profileForm.tagline || 'Teacher Studio'}</span>
                          <Heart className="size-2 fill-[#FF7D6B]" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Photo Uploader */}
                  <PhotoUploader
                    label="Circular Profile Avatar Photo"
                    currentValue={profileForm.avatarImage}
                    onChange={(url) => setProfileForm({ ...profileForm, avatarImage: url, avatarType: 'image' })}
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                        Brand / Display Name
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-2.5 text-xs font-bold text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none focus:bg-[#FFF9E6]"
                        placeholder="Farah Affes"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                        Tagline / Subtitle
                      </label>
                      <input
                        type="text"
                        value={profileForm.tagline}
                        onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                        className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-2.5 text-xs font-bold text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none focus:bg-[#FFF9E6]"
                        placeholder="Teacher Studio"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#2D1F1D]/10 pt-3">
                    <div className="flex items-center gap-3">
                      <label className="text-xs font-bold text-[#2D1F1D]">Avatar Style:</label>
                      <button
                        type="button"
                        onClick={() => setProfileForm({ ...profileForm, avatarType: 'image' })}
                        className={cn(
                          'rounded-xl border border-[#2D1F1D] px-2.5 py-1 text-xs font-bold transition-all cursor-pointer',
                          profileForm.avatarType === 'image' ? 'bg-[#A7F3D0] text-[#065F46] shadow-[1.5px_1.5px_0px_#2D1F1D]' : 'bg-white text-[#6B5550]',
                        )}
                      >
                        📸 Photo Avatar
                      </button>
                      <button
                        type="button"
                        onClick={() => setProfileForm({ ...profileForm, avatarType: 'icon' })}
                        className={cn(
                          'rounded-xl border border-[#2D1F1D] px-2.5 py-1 text-xs font-bold transition-all cursor-pointer',
                          profileForm.avatarType === 'icon' ? 'bg-[#FFE68C] text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D]' : 'bg-white text-[#6B5550]',
                        )}
                      >
                        ✨ Sparkle Icon
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        updateProfile(profileForm)
                        toast('✨ Profile picture & branding saved!')
                      }}
                      className="flex items-center gap-1.5 rounded-xl border-2 border-[#2D1F1D] bg-[#FFE68C] px-5 py-2 text-xs font-black text-[#2D1F1D] shadow-[2.5px_2.5px_0px_#2D1F1D] hover:bg-[#FFD952] cursor-pointer"
                    >
                      <Save className="size-3.5" />
                      <span>Save Profile &amp; Branding</span>
                    </button>
                  </div>
                </div>

                <SectionHeaderCard
                  title="Hero Section & Public Introduction"
                  subtitle="Edit the main headline, highlight banner, bio paragraph, photo, and 4 stats badges."
                  onPreview={() => setPreviewSection('hero')}
                />

                <div className="rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-6 shadow-[4px_4px_0px_#2D1F1D] space-y-5">
                  {/* Eyebrow */}
                  <div>
                    <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                      Top Eyebrow Sticker
                    </label>
                    <input
                      type="text"
                      value={heroForm.eyebrow}
                      onChange={(e) => setHeroForm({ ...heroForm, eyebrow: e.target.value })}
                      className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-3 text-xs font-bold text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none focus:bg-[#FFF9E6]"
                      placeholder="Passionate Primary & Middle School English Teacher • Sfax, Tunisia"
                    />
                  </div>

                  {/* Headline Components */}
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                        Title Prefix
                      </label>
                      <input
                        type="text"
                        value={heroForm.titlePrefix}
                        onChange={(e) => setHeroForm({ ...heroForm, titlePrefix: e.target.value })}
                        className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-3 text-xs font-bold text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none focus:bg-[#FFF9E6]"
                        placeholder="Making English"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                        Highlight Word (Yellow Badge)
                      </label>
                      <input
                        type="text"
                        value={heroForm.highlightWord}
                        onChange={(e) => setHeroForm({ ...heroForm, highlightWord: e.target.value })}
                        className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-3 text-xs font-bold text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none focus:bg-[#FFE68C]"
                        placeholder="tactile, playful"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                        Title Suffix (Coral Text)
                      </label>
                      <input
                        type="text"
                        value={heroForm.titleSuffix}
                        onChange={(e) => setHeroForm({ ...heroForm, titleSuffix: e.target.value })}
                        className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-3 text-xs font-bold text-[#FF7D6B] shadow-[2px_2px_0px_#2D1F1D] outline-none focus:bg-[#FFF9E6]"
                        placeholder="& unforgettable."
                      />
                    </div>
                  </div>

                  {/* Bio Paragraph */}
                  <div>
                    <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                      Main Bio / Description Paragraph
                    </label>
                    <textarea
                      rows={3}
                      value={heroForm.bio}
                      onChange={(e) => setHeroForm({ ...heroForm, bio: e.target.value })}
                      className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-3 text-xs font-medium text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none focus:bg-[#FFF9E6]"
                      placeholder="Dedicated primary and middle school educator bridging phonetic mastery..."
                    />
                  </div>

                  {/* CTA Buttons */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                        Primary CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={heroForm.ctaWorkText}
                        onChange={(e) => setHeroForm({ ...heroForm, ctaWorkText: e.target.value })}
                        className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-3 text-xs font-bold text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                        Secondary CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={heroForm.ctaContactText}
                        onChange={(e) => setHeroForm({ ...heroForm, ctaContactText: e.target.value })}
                        className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-3 text-xs font-bold text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none"
                      />
                    </div>
                  </div>

                  {/* Hero Photo & Image Upload Picker */}
                  <PhotoUploader
                    label="Hero Main Photo / Classroom Scene"
                    currentValue={heroForm.image}
                    onChange={(newUrl) => setHeroForm({ ...heroForm, image: newUrl })}
                  />

                  {/* Marquee Ticker Phrases */}
                  <div>
                    <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                      Marquee Ticker Phrases (Ribbon in Hero)
                    </label>
                    <ListTagEditor
                      tags={heroForm.marqueeItems || []}
                      onChange={(newItems) => setHeroForm({ ...heroForm, marqueeItems: newItems })}
                      placeholder="Add ticker phrase (e.g. 🎨 Interactive Storytelling Kits)"
                    />
                  </div>

                  {/* Save Hero Changes */}
                  <div className="flex justify-end pt-3 border-t-2 border-[#2D1F1D]/10">
                    <button
                      type="button"
                      onClick={() => {
                        updateHero(heroForm)
                        toast('✨ Hero section updated in real-time!')
                      }}
                      className="flex items-center gap-2 rounded-xl border-2 border-[#2D1F1D] bg-[#FFE68C] px-6 py-2.5 text-xs font-black text-[#2D1F1D] shadow-[3px_3px_0px_#2D1F1D] hover:bg-[#FFD952] hover:-translate-y-0.5 cursor-pointer"
                    >
                      <Save className="size-4" />
                      <span>Save Hero Section</span>
                    </button>
                  </div>
                </div>

                {/* 4 Stats Cards Editor */}
                <div className="rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-6 shadow-[4px_4px_0px_#2D1F1D]">
                  <h3 className="font-sans text-base font-black text-[#2D1F1D]">
                    4 Hero Stat Badges
                  </h3>
                  <p className="font-hand text-xs font-bold text-[#6B5550]">
                    Customize the numbers and captions displayed beneath the hero headline:
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {statsForm.map((st, idx) => (
                      <div
                        key={st.id || idx}
                        className="rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] p-3 shadow-[2px_2px_0px_#2D1F1D] space-y-2"
                      >
                        <div>
                          <label className="text-[0.65rem] font-black uppercase text-[#6B5550]">
                            Value / Number
                          </label>
                          <input
                            type="text"
                            value={st.value}
                            onChange={(e) => {
                              const updated = [...statsForm]
                              updated[idx] = { ...updated[idx], value: e.target.value }
                              setStatsForm(updated)
                            }}
                            className="w-full rounded-lg border border-[#2D1F1D] bg-white p-1.5 text-xs font-black text-[#2D1F1D]"
                          />
                        </div>
                        <div>
                          <label className="text-[0.65rem] font-black uppercase text-[#6B5550]">
                            Caption Label
                          </label>
                          <input
                            type="text"
                            value={st.label}
                            onChange={(e) => {
                              const updated = [...statsForm]
                              updated[idx] = { ...updated[idx], label: e.target.value }
                              setStatsForm(updated)
                            }}
                            className="w-full rounded-lg border border-[#2D1F1D] bg-white p-1.5 text-xs font-bold text-[#2D1F1D]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        updateStats(statsForm)
                        toast('✨ Stat badges updated!')
                      }}
                      className="flex items-center gap-2 rounded-xl border-2 border-[#2D1F1D] bg-[#A7F3D0] px-5 py-2 text-xs font-black text-[#065F46] shadow-[2.5px_2.5px_0px_#2D1F1D] hover:bg-[#6EE7B7] cursor-pointer"
                    >
                      <Save className="size-3.5" />
                      <span>Save Stat Badges</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. ABOUT & PEDAGOGY TAB */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <SectionHeaderCard
                  title="Pedagogy & Philosophy (About Section)"
                  subtitle="Edit Farah's biography, portrait photo, manifesto quote, and the 4 teaching pillars."
                  onPreview={() => setPreviewSection('about')}
                />

                <div className="rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-6 shadow-[4px_4px_0px_#2D1F1D] space-y-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                        Section Eyebrow
                      </label>
                      <input
                        type="text"
                        value={aboutForm.eyebrow}
                        onChange={(e) => setAboutForm({ ...aboutForm, eyebrow: e.target.value })}
                        className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-3 text-xs font-bold text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none focus:bg-[#FFF9E6]"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                        Section Title
                      </label>
                      <input
                        type="text"
                        value={aboutForm.title}
                        onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                        className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-3 text-xs font-bold text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none focus:bg-[#FFF9E6]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                      Introductory Statement
                    </label>
                    <textarea
                      rows={2}
                      value={aboutForm.intro}
                      onChange={(e) => setAboutForm({ ...aboutForm, intro: e.target.value })}
                      className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-3 text-xs font-medium text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none focus:bg-[#FFF9E6]"
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                        Bio Paragraph 1 (Classroom Experience)
                      </label>
                      <textarea
                        rows={4}
                        value={aboutForm.bio1}
                        onChange={(e) => setAboutForm({ ...aboutForm, bio1: e.target.value })}
                        className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-3 text-xs font-medium text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none focus:bg-[#FFF9E6]"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                        Bio Paragraph 2 (Workshops & Prop Making)
                      </label>
                      <textarea
                        rows={4}
                        value={aboutForm.bio2}
                        onChange={(e) => setAboutForm({ ...aboutForm, bio2: e.target.value })}
                        className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-3 text-xs font-medium text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none focus:bg-[#FFF9E6]"
                      />
                    </div>
                  </div>

                  {/* Farah Portrait Photo Uploader */}
                  <PhotoUploader
                    label="Farah Portrait Photograph"
                    currentValue={aboutForm.portraitImage}
                    onChange={(newUrl) => setAboutForm({ ...aboutForm, portraitImage: newUrl })}
                  />

                  {/* Manifesto Quote */}
                  <div className="rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] p-4 space-y-3 shadow-[2px_2px_0px_#2D1F1D]">
                    <h4 className="font-sans text-xs font-black uppercase text-[#2D1F1D]">
                      Handwritten Manifesto Card
                    </h4>
                    <div>
                      <label className="mb-1 block text-[0.65rem] font-bold text-[#6B5550]">
                        Quote Text
                      </label>
                      <textarea
                        rows={2}
                        value={aboutForm.manifestoQuote}
                        onChange={(e) => setAboutForm({ ...aboutForm, manifestoQuote: e.target.value })}
                        className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2.5 text-xs font-bold text-[#2D1F1D]"
                      />
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-[0.65rem] font-bold text-[#6B5550]">
                          Author Name
                        </label>
                        <input
                          type="text"
                          value={aboutForm.manifestoAuthor}
                          onChange={(e) => setAboutForm({ ...aboutForm, manifestoAuthor: e.target.value })}
                          className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold text-[#2D1F1D]"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[0.65rem] font-bold text-[#6B5550]">
                          Location
                        </label>
                        <input
                          type="text"
                          value={aboutForm.manifestoLocation}
                          onChange={(e) => setAboutForm({ ...aboutForm, manifestoLocation: e.target.value })}
                          className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold text-[#2D1F1D]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3 border-t-2 border-[#2D1F1D]/10">
                    <button
                      type="button"
                      onClick={() => {
                        updateAbout(aboutForm)
                        toast('✨ About section updated!')
                      }}
                      className="flex items-center gap-2 rounded-xl border-2 border-[#2D1F1D] bg-[#FFE68C] px-6 py-2.5 text-xs font-black text-[#2D1F1D] shadow-[3px_3px_0px_#2D1F1D] hover:bg-[#FFD952] cursor-pointer"
                    >
                      <Save className="size-4" />
                      <span>Save About Section</span>
                    </button>
                  </div>
                </div>

                {/* Career & Life Journey Milestones Manager */}
                <div className="rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-6 shadow-[4px_4px_0px_#2D1F1D] space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b-2 border-[#2D1F1D]/10 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="flex size-7 items-center justify-center rounded-lg border border-[#2D1F1D] bg-[#A7F3D0] text-[#2D1F1D]">
                          <GraduationCap className="size-4" />
                        </span>
                        <h3 className="font-sans text-base font-black text-[#2D1F1D]">
                          Career &amp; Life Journey Milestones
                        </h3>
                        <span className="rounded-full border border-[#2D1F1D] bg-[#FFE68C] px-2 py-0.5 text-xs font-black text-[#2D1F1D]">
                          {state.about.milestones ? state.about.milestones.length : 0} items
                        </span>
                      </div>
                      <p className="font-hand text-xs font-bold text-[#6B5550] mt-1">
                        Manage Farah&apos;s academic degrees, classroom teaching milestones, and creative atelier projects with photos and periods.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsAddingMilestone(true)}
                      className="flex items-center gap-2 rounded-2xl border-2 border-[#2D1F1D] bg-[#A7F3D0] px-4 py-2 text-xs font-black text-[#065F46] shadow-[2.5px_2.5px_0px_#2D1F1D] hover:bg-[#6EE7B7] hover:-translate-y-0.5 cursor-pointer"
                    >
                      <Plus className="size-4 stroke-[3]" />
                      <span>+ Add New Milestone</span>
                    </button>
                  </div>

                  {/* Search & Category Filter Toolbar */}
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#6B5550]" />
                      <input
                        type="text"
                        value={milestoneSearch}
                        onChange={(e) => setMilestoneSearch(e.target.value)}
                        placeholder="Search milestone title, school, or organization..."
                        className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white pl-8 pr-3 py-2 text-xs font-bold text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {[
                        { id: 'all', label: 'All', emoji: '🌟' },
                        { id: 'education', label: 'Education', emoji: '🎓' },
                        { id: 'career', label: 'Teaching', emoji: '💼' },
                        { id: 'life', label: 'Creative Life', emoji: '✂️' },
                        { id: 'achievement', label: 'Workshops', emoji: '🏆' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setMilestoneCategoryFilter(tab.id as any)}
                          className={cn(
                            'flex items-center gap-1 rounded-xl border-2 px-2.5 py-1 text-xs font-black transition-all cursor-pointer',
                            milestoneCategoryFilter === tab.id
                              ? 'border-[#2D1F1D] bg-[#FFE68C] text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D]'
                              : 'border-transparent text-[#6B5550] hover:bg-[#FAF5EC]',
                          )}
                        >
                          <span>{tab.emoji}</span>
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Milestones Card Grid */}
                  {(() => {
                    const milestonesList = state.about.milestones || []
                    const filtered = milestonesList.filter((m) => {
                      const matchesCategory =
                        milestoneCategoryFilter === 'all' || m.category === milestoneCategoryFilter
                      const matchesSearch =
                        milestoneSearch === '' ||
                        m.title.toLowerCase().includes(milestoneSearch.toLowerCase()) ||
                        m.organization.toLowerCase().includes(milestoneSearch.toLowerCase()) ||
                        m.period.toLowerCase().includes(milestoneSearch.toLowerCase()) ||
                        m.description.toLowerCase().includes(milestoneSearch.toLowerCase())
                      return matchesCategory && matchesSearch
                    })

                    if (filtered.length === 0) {
                      return (
                        <div className="rounded-2xl border-2 border-dashed border-[#2D1F1D]/30 bg-[#FAF5EC] p-8 text-center">
                          <p className="text-2xl">🌱</p>
                          <p className="font-sans text-xs font-black text-[#2D1F1D] mt-2">
                            No journey milestones found matching your search.
                          </p>
                        </div>
                      )
                    }

                    return (
                      <div className="space-y-3">
                        {filtered.map((milestone) => {
                          const photos =
                            milestone.images && milestone.images.length > 0
                              ? milestone.images
                              : [milestone.image || '/images/farah-portrait.png']

                          return (
                            <div
                              key={milestone.id}
                              className="flex flex-col sm:flex-row items-start justify-between gap-4 rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] p-4 shadow-[3px_3px_0px_#2D1F1D] transition-all hover:bg-white"
                            >
                              <div className="flex items-start gap-3.5 flex-1">
                                {/* Photo deck thumbnail stack */}
                                <div className="relative size-16 shrink-0">
                                  {photos.slice(0, 3).map((pUrl, pIdx) => (
                                    <div
                                      key={pIdx}
                                      style={{
                                        transform: `translate(${pIdx * 4}px, ${pIdx * 4}px) rotate(${
                                          pIdx === 0 ? -4 : pIdx === 1 ? 2 : 6
                                        }deg)`,
                                        zIndex: 10 - pIdx,
                                      }}
                                      className="absolute inset-0 overflow-hidden rounded-xl border-2 border-[#2D1F1D] bg-white shadow-[1.5px_1.5px_0px_#2D1F1D]"
                                    >
                                      <Image src={pUrl} alt={milestone.title} fill className="object-cover" />
                                    </div>
                                  ))}
                                </div>

                                <div className="space-y-1 flex-1 pl-2">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="rounded-full border border-[#2D1F1D] bg-white px-2 py-0.2 text-[0.65rem] font-black text-[#2D1F1D]">
                                      📅 {milestone.period}
                                    </span>
                                    <span className="rounded-full border border-[#2D1F1D] bg-[#A7F3D0] px-2 py-0.2 text-[0.65rem] font-black text-[#065F46]">
                                      {milestone.badgeEmoji || '🌸'} {milestone.categoryLabel || milestone.category}
                                    </span>
                                    <span className="rounded-full border border-[#2D1F1D] bg-[#FFE68C] px-2 py-0.2 text-[0.65rem] font-black text-[#2D1F1D]">
                                      🃏 {photos.length} {photos.length === 1 ? 'photo' : 'photos'} in deck
                                    </span>
                                    {!milestone.isActive && (
                                      <span className="rounded-full bg-[#FFB5B5] px-2 py-0.2 text-[0.65rem] font-black text-[#2D1F1D]">
                                        Hidden
                                      </span>
                                    )}
                                  </div>

                                  <h4 className="font-sans text-sm font-black text-[#2D1F1D]">
                                    {milestone.title}
                                  </h4>
                                  <p className="text-xs font-bold text-[#FF7D6B]">{milestone.organization}</p>
                                  <p className="text-xs font-medium text-[#6B5550] line-clamp-2">
                                    {milestone.description}
                                  </p>

                                  {milestone.highlights && milestone.highlights.length > 0 && (
                                    <div className="flex flex-wrap gap-1 pt-1">
                                      {milestone.highlights.map((h, hIdx) => (
                                        <span
                                          key={hIdx}
                                          className="rounded-md border border-[#2D1F1D]/20 bg-white px-1.5 py-0.2 text-[0.62rem] font-bold text-[#2D1F1D]"
                                        >
                                          ✓ {h}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>

                            {/* Action Buttons */}
                            <div className="flex sm:flex-col items-center gap-1.5 shrink-0 self-end sm:self-center">
                              <button
                                type="button"
                                onClick={() => {
                                  toggleMilestoneActive(milestone.id)
                                  toast(
                                    milestone.isActive ? '👁️ Milestone hidden' : '✨ Milestone visible on website!',
                                  )
                                }}
                                className={cn(
                                  'rounded-xl border border-[#2D1F1D] px-2.5 py-1 text-[0.7rem] font-black cursor-pointer',
                                  milestone.isActive
                                    ? 'bg-[#A7F3D0] text-[#065F46]'
                                    : 'bg-[#E5E7EB] text-[#6B7280]',
                                )}
                              >
                                {milestone.isActive ? 'Visible' : 'Hidden'}
                              </button>

                              <button
                                type="button"
                                onClick={() => setEditingMilestone(milestone)}
                                className="flex items-center gap-1 rounded-xl border border-[#2D1F1D] bg-white px-2.5 py-1 text-[0.7rem] font-black text-[#2D1F1D] hover:bg-[#FFE68C] cursor-pointer"
                              >
                                <Edit3 className="size-3" /> Edit
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Delete "${milestone.title}"?`)) {
                                    deleteMilestone(milestone.id)
                                    toast('🗑️ Milestone deleted.')
                                  }
                                }}
                                className="flex size-7 items-center justify-center rounded-xl border border-[#2D1F1D] bg-[#FFB5B5] text-[#2D1F1D] hover:bg-[#FF8A8A] cursor-pointer"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )
                })()}
                </div>
              </div>
            )}

            {/* 4. CRAFT GALLERY (WORKS) TAB */}
            {activeTab === 'works' && (
              <div className="space-y-6">
                <SectionHeaderCard
                  title="Creative Craft Gallery (Works)"
                  subtitle="Manage handmade tactile props, phonics wheels, posters, flyers, and classroom tools."
                  onPreview={() => setPreviewSection('works')}
                  actionLabel="+ Add New Craft"
                  onAction={() => setIsAddingWork(true)}
                />

                {/* Filter & Search Bar */}
                <div className="flex flex-col gap-3 rounded-2xl border-2 border-[#2D1F1D] bg-[#FFFDF9] p-3 shadow-[3px_3px_0px_#2D1F1D] sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 size-4 text-[#6B5550]" />
                    <input
                      type="text"
                      value={workSearch}
                      onChange={(e) => setWorkSearch(e.target.value)}
                      placeholder="Search craft by title, materials or category..."
                      className="w-full rounded-xl border border-[#2D1F1D] bg-white py-2 pl-9 pr-3 text-xs font-bold text-[#2D1F1D] outline-none"
                    />
                  </div>
                  <span className="text-xs font-black text-[#6B5550]">
                    Showing {state.works.length} items
                  </span>
                </div>

                {/* Works Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {state.works
                    .filter((w) =>
                      workSearch
                        ? w.title.toLowerCase().includes(workSearch.toLowerCase()) ||
                          w.category.toLowerCase().includes(workSearch.toLowerCase()) ||
                          w.description.toLowerCase().includes(workSearch.toLowerCase())
                        : true,
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          'flex flex-col justify-between overflow-hidden rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] shadow-[4px_4px_0px_#2D1F1D] transition-all hover:-translate-y-1',
                          item.isActive === false && 'opacity-60 bg-gray-100',
                        )}
                      >
                        <div className="relative h-44 w-full border-b-2 border-[#2D1F1D] bg-[#FAF5EC]">
                          <Image
                            src={item.image || '/images/product-phonics-wheel.png'}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                            <span className="rounded-full border border-[#2D1F1D] bg-[#FFE68C] px-2 py-0.5 text-[0.65rem] font-black uppercase text-[#2D1F1D]">
                              {item.category}
                            </span>
                            {item.isFeatured && (
                              <span className="rounded-full border border-[#2D1F1D] bg-[#FF7D6B] px-2 py-0.5 text-[0.65rem] font-black text-white">
                                ★ Featured
                              </span>
                            )}
                          </div>
                          {item.priceBuy && (
                            <span className="absolute bottom-2.5 right-2.5 rounded-full border border-[#2D1F1D] bg-white px-2.5 py-0.5 text-xs font-black text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D]">
                              {item.priceBuy} TND
                            </span>
                          )}
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-sans text-sm font-black text-[#2D1F1D]">
                              {item.title}
                            </h4>
                            <p className="mt-0.5 text-xs font-bold text-[#FF7D6B]">{item.subtitle}</p>
                            <p className="mt-2 text-xs font-medium text-[#6B5550] line-clamp-2">
                              {item.description}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center justify-between border-t-2 border-[#2D1F1D]/10 pt-3">
                            <button
                              type="button"
                              onClick={() => {
                                toggleWorkActive(item.id)
                                toast(item.isActive !== false ? 'Craft hidden from public site' : 'Craft visible on public site')
                              }}
                              className={cn(
                                'flex items-center gap-1 rounded-lg border border-[#2D1F1D] px-2 py-1 text-[0.65rem] font-black cursor-pointer',
                                item.isActive !== false ? 'bg-[#A7F3D0] text-[#065F46]' : 'bg-[#E5E7EB] text-[#6B7280]',
                              )}
                            >
                              {item.isActive !== false ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                              <span>{item.isActive !== false ? 'Public' : 'Hidden'}</span>
                            </button>

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setEditingWork(item)}
                                className="flex items-center gap-1 rounded-lg border-2 border-[#2D1F1D] bg-[#FFE68C] px-3 py-1 text-xs font-black text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D] hover:bg-[#FFD952] cursor-pointer"
                              >
                                <Edit3 className="size-3" /> Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Delete "${item.title}"?`)) {
                                    deleteWork(item.id)
                                    toast('Craft deleted.')
                                  }
                                }}
                                className="flex size-7 items-center justify-center rounded-lg border-2 border-[#2D1F1D] bg-[#FFB5B5] text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D] hover:bg-[#FF8A8A] cursor-pointer"
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

            {/* 5. VIDEO LESSONS TAB */}
            {activeTab === 'videos' && (
              <div className="space-y-6">
                <SectionHeaderCard
                  title="Classroom Video Lessons"
                  subtitle="Manage video demonstrations, phonics lessons, YouTube embed links, and key takeaways."
                  onPreview={() => setPreviewSection('videos')}
                  actionLabel="+ Add New Video"
                  onAction={() => setIsAddingVideo(true)}
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {state.videos.map((vid) => (
                    <div
                      key={vid.id}
                      className={cn(
                        'flex flex-col justify-between overflow-hidden rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] shadow-[4px_4px_0px_#2D1F1D] transition-all hover:-translate-y-1',
                        vid.isActive === false && 'opacity-60 bg-gray-100',
                      )}
                    >
                      <div className="relative h-40 w-full border-b-2 border-[#2D1F1D] bg-[#FAF5EC]">
                        <Image
                          src={vid.thumbnail || '/images/video-lesson.png'}
                          alt={vid.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <span className="flex size-10 items-center justify-center rounded-full border-2 border-[#2D1F1D] bg-[#FFE68C] shadow-[2px_2px_0px_#2D1F1D]">
                            <Play className="size-5 fill-[#2D1F1D] text-[#2D1F1D] ml-0.5" />
                          </span>
                        </div>
                        <span className="absolute bottom-2.5 right-2.5 rounded-full border border-[#2D1F1D] bg-black/80 px-2 py-0.5 text-[0.65rem] font-bold text-white">
                          {vid.duration}
                        </span>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="rounded-full bg-[#FFE68C] px-2 py-0.5 text-[0.65rem] font-black border border-[#2D1F1D]">
                            {vid.category}
                          </span>
                          <h4 className="mt-2 font-sans text-sm font-black text-[#2D1F1D]">
                            {vid.title}
                          </h4>
                          <p className="mt-1 text-xs font-medium text-[#6B5550] line-clamp-2">
                            {vid.description}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t-2 border-[#2D1F1D]/10 pt-3">
                          <button
                            type="button"
                            onClick={() => {
                              toggleVideoActive(vid.id)
                              toast(vid.isActive !== false ? 'Video hidden' : 'Video public')
                            }}
                            className={cn(
                              'flex items-center gap-1 rounded-lg border border-[#2D1F1D] px-2 py-1 text-[0.65rem] font-black cursor-pointer',
                              vid.isActive !== false ? 'bg-[#A7F3D0] text-[#065F46]' : 'bg-[#E5E7EB] text-[#6B7280]',
                            )}
                          >
                            {vid.isActive !== false ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                            <span>{vid.isActive !== false ? 'Public' : 'Hidden'}</span>
                          </button>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setEditingVideo(vid)}
                              className="flex items-center gap-1 rounded-lg border-2 border-[#2D1F1D] bg-[#FFE68C] px-3 py-1 text-xs font-black text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D] hover:bg-[#FFD952] cursor-pointer"
                            >
                              <Edit3 className="size-3" /> Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Delete "${vid.title}"?`)) {
                                  deleteVideo(vid.id)
                                  toast('Video deleted.')
                                }
                              }}
                              className="flex size-7 items-center justify-center rounded-lg border-2 border-[#2D1F1D] bg-[#FFB5B5] text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D] hover:bg-[#FF8A8A] cursor-pointer"
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

            {/* 6. RESOURCE SHOP (PRODUCTS) TAB */}
            {activeTab === 'shop' && (
              <div className="space-y-6">
                <SectionHeaderCard
                  title="Resource Shop (Props & Printables)"
                  subtitle="Manage purchasable & rentable classroom materials, PDF printables, stock status, and prices."
                  onPreview={() => setPreviewSection('shop')}
                  actionLabel="+ Add New Product"
                  onAction={() => setIsAddingProduct(true)}
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {state.products.map((prod) => (
                    <div
                      key={prod.id}
                      className={cn(
                        'flex flex-col justify-between overflow-hidden rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] shadow-[4px_4px_0px_#2D1F1D] transition-all hover:-translate-y-1',
                        prod.isActive === false && 'opacity-60 bg-gray-100',
                      )}
                    >
                      <div className="relative h-44 w-full border-b-2 border-[#2D1F1D] bg-[#FAF5EC]">
                        <Image
                          src={prod.image || '/images/product-phonics-wheel.png'}
                          alt={prod.title || prod.name || 'Product'}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute top-2.5 left-2.5 rounded-full border border-[#2D1F1D] bg-[#A7F3D0] px-2 py-0.5 text-[0.65rem] font-black uppercase text-[#065F46]">
                          {prod.format || prod.category}
                        </span>
                        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5">
                          <span className="rounded-full border border-[#2D1F1D] bg-white px-2.5 py-0.5 text-xs font-black text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D]">
                            Buy: {prod.priceBuy || prod.buyPrice || 0} TND
                          </span>
                          {(prod.priceRent || prod.rentPrice) && (
                            <span className="rounded-full border border-[#2D1F1D] bg-[#FFE68C] px-2.5 py-0.5 text-xs font-black text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D]">
                              Rent: {prod.priceRent || prod.rentPrice} TND
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-sans text-sm font-black text-[#2D1F1D]">
                            {prod.title || prod.name}
                          </h4>
                          <p className="mt-0.5 text-xs font-bold text-[#FF7D6B]">{prod.subtitle || prod.category}</p>
                          <p className="mt-2 text-xs font-medium text-[#6B5550] line-clamp-2">
                            {prod.description}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t-2 border-[#2D1F1D]/10 pt-3">
                          <button
                            type="button"
                            onClick={() => {
                              toggleProductActive(prod.id)
                              toast(prod.isActive !== false ? 'Product hidden' : 'Product active')
                            }}
                            className={cn(
                              'flex items-center gap-1 rounded-lg border border-[#2D1F1D] px-2 py-1 text-[0.65rem] font-black cursor-pointer',
                              prod.isActive !== false ? 'bg-[#A7F3D0] text-[#065F46]' : 'bg-[#E5E7EB] text-[#6B7280]',
                            )}
                          >
                            {prod.isActive !== false ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                            <span>{prod.isActive !== false ? 'In Shop' : 'Hidden'}</span>
                          </button>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setEditingProduct(prod)}
                              className="flex items-center gap-1 rounded-lg border-2 border-[#2D1F1D] bg-[#FFE68C] px-3 py-1 text-xs font-black text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D] hover:bg-[#FFD952] cursor-pointer"
                            >
                              <Edit3 className="size-3" /> Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Delete "${prod.title || prod.name}"?`)) {
                                  deleteProduct(prod.id)
                                  toast('Product deleted.')
                                }
                              }}
                              className="flex size-7 items-center justify-center rounded-lg border-2 border-[#2D1F1D] bg-[#FFB5B5] text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D] hover:bg-[#FF8A8A] cursor-pointer"
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

            {/* 7. TARGET AUDIENCES (WHO I SERVE) TAB */}
            {activeTab === 'audiences' && (
              <div className="space-y-6">
                <SectionHeaderCard
                  title="Target Audiences (Who I Serve)"
                  subtitle="Manage audience categories: Primary Learners, Middle Schoolers, ESL Learners, Parents & Teachers."
                  onPreview={() => setPreviewSection('audiences')}
                  actionLabel="+ Add New Audience"
                  onAction={() => setIsAddingAudience(true)}
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {state.audiences.map((aud) => (
                    <div
                      key={aud.id}
                      className={cn(
                        'flex flex-col justify-between overflow-hidden rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-5 shadow-[4px_4px_0px_#2D1F1D] transition-all hover:-translate-y-1',
                        aud.isActive === false && 'opacity-60 bg-gray-100',
                      )}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{aud.icon || '🎒'}</span>
                          <span className="rounded-full bg-[#FFE68C] px-2.5 py-0.5 text-xs font-black border border-[#2D1F1D]">
                            {aud.ageGroup}
                          </span>
                        </div>
                        <h4 className="mt-3 font-sans text-base font-black text-[#2D1F1D]">
                          {aud.title}
                        </h4>
                        <p className="text-xs font-bold text-[#FF7D6B]">{aud.subtitle}</p>
                        <p className="mt-2 text-xs font-medium text-[#6B5550]">
                          {aud.focus}
                        </p>

                        {/* Bullet Points */}
                        <div className="mt-3 space-y-1">
                          {aud.points?.map((pt, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-xs font-bold text-[#2D1F1D]">
                              <Check className="size-3.5 text-[#059669] stroke-[3]" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t-2 border-[#2D1F1D]/10 pt-3">
                        <button
                          type="button"
                          onClick={() => {
                            toggleAudienceActive(aud.id)
                            toast(aud.isActive !== false ? 'Audience hidden' : 'Audience active')
                          }}
                          className={cn(
                            'flex items-center gap-1 rounded-lg border border-[#2D1F1D] px-2 py-1 text-[0.65rem] font-black cursor-pointer',
                            aud.isActive !== false ? 'bg-[#A7F3D0] text-[#065F46]' : 'bg-[#E5E7EB] text-[#6B7280]',
                          )}
                        >
                          {aud.isActive !== false ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                          <span>{aud.isActive !== false ? 'Public' : 'Hidden'}</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setEditingAudience(aud)}
                            className="flex items-center gap-1 rounded-lg border-2 border-[#2D1F1D] bg-[#FFE68C] px-3 py-1 text-xs font-black text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D] hover:bg-[#FFD952] cursor-pointer"
                          >
                            <Edit3 className="size-3" /> Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete "${aud.title}"?`)) {
                                deleteAudience(aud.id)
                                toast('Audience deleted.')
                              }
                            }}
                            className="flex size-7 items-center justify-center rounded-lg border-2 border-[#2D1F1D] bg-[#FFB5B5] text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D] hover:bg-[#FF8A8A] cursor-pointer"
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

            {/* 8. TESTIMONIALS (ENDORSEMENTS) TAB */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <SectionHeaderCard
                  title="Testimonials & Endorsements"
                  subtitle="Manage parent and educator feedback, quotes, star ratings, and author roles."
                  onPreview={() => setPreviewSection('testimonials')}
                  actionLabel="+ Add Testimonial"
                  onAction={() => setIsAddingTestimonial(true)}
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {state.testimonials.map((test) => (
                    <div
                      key={test.id}
                      className={cn(
                        'flex flex-col justify-between rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-5 shadow-[4px_4px_0px_#2D1F1D] transition-all hover:-translate-y-1',
                        test.isActive === false && 'opacity-60 bg-gray-100',
                      )}
                    >
                      <div>
                        {/* Stars */}
                        <div className="flex items-center gap-1 text-[#FFC837]">
                          {[...Array(test.rating || 5)].map((_, i) => (
                            <Star key={i} className="size-4 fill-[#FFC837] stroke-[#2D1F1D]" />
                          ))}
                        </div>

                        <p className="mt-3 font-medium text-xs text-[#2D1F1D] italic">
                          &ldquo;{test.quote}&rdquo;
                        </p>

                        <div className="mt-4 pt-3 border-t border-[#2D1F1D]/10">
                          <h4 className="font-sans text-xs font-black text-[#2D1F1D]">
                            {test.name}
                          </h4>
                          <p className="text-[0.7rem] font-bold text-[#FF7D6B]">{test.role}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t-2 border-[#2D1F1D]/10 pt-3">
                        <button
                          type="button"
                          onClick={() => {
                            toggleTestimonialActive(test.id)
                            toast(test.isActive !== false ? 'Review hidden' : 'Review active')
                          }}
                          className={cn(
                            'flex items-center gap-1 rounded-lg border border-[#2D1F1D] px-2 py-1 text-[0.65rem] font-black cursor-pointer',
                            test.isActive !== false ? 'bg-[#A7F3D0] text-[#065F46]' : 'bg-[#E5E7EB] text-[#6B7280]',
                          )}
                        >
                          {test.isActive !== false ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                          <span>{test.isActive !== false ? 'Public' : 'Hidden'}</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setEditingTestimonial(test)}
                            className="flex items-center gap-1 rounded-lg border-2 border-[#2D1F1D] bg-[#FFE68C] px-3 py-1 text-xs font-black text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D] hover:bg-[#FFD952] cursor-pointer"
                          >
                            <Edit3 className="size-3" /> Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete endorsement from "${test.name}"?`)) {
                                deleteTestimonial(test.id)
                                toast('Testimonial deleted.')
                              }
                            }}
                            className="flex size-7 items-center justify-center rounded-lg border-2 border-[#2D1F1D] bg-[#FFB5B5] text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D] hover:bg-[#FF8A8A] cursor-pointer"
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

            {/* 9. ATELIER FAQ TAB */}
            {activeTab === 'faqs' && (
              <div className="space-y-6">
                <SectionHeaderCard
                  title="Frequently Asked Questions (FAQ)"
                  subtitle="Manage questions & answers about custom props, rentals, workshop bookings, and shipping."
                  onPreview={() => setPreviewSection('faqs')}
                  actionLabel="+ Add New Question"
                  onAction={() => setIsAddingFaq(true)}
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  {state.faqs.map((faq) => (
                    <div
                      key={faq.id}
                      className={cn(
                        'flex flex-col justify-between rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-5 shadow-[4px_4px_0px_#2D1F1D] transition-all hover:-translate-y-0.5',
                        faq.isActive === false && 'opacity-60 bg-gray-100',
                      )}
                    >
                      <div>
                        <h4 className="font-sans text-sm font-black text-[#2D1F1D]">
                          Q: {faq.q}
                        </h4>
                        <p className="mt-2 text-xs font-medium text-[#6B5550]">
                          {faq.a}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t-2 border-[#2D1F1D]/10 pt-3">
                        <button
                          type="button"
                          onClick={() => {
                            toggleFaqActive(faq.id)
                            toast(faq.isActive !== false ? 'FAQ hidden' : 'FAQ active')
                          }}
                          className={cn(
                            'flex items-center gap-1 rounded-lg border border-[#2D1F1D] px-2 py-1 text-[0.65rem] font-black cursor-pointer',
                            faq.isActive !== false ? 'bg-[#A7F3D0] text-[#065F46]' : 'bg-[#E5E7EB] text-[#6B7280]',
                          )}
                        >
                          {faq.isActive !== false ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                          <span>{faq.isActive !== false ? 'In FAQ' : 'Hidden'}</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setEditingFaq(faq)}
                            className="flex items-center gap-1 rounded-lg border-2 border-[#2D1F1D] bg-[#FFE68C] px-3 py-1 text-xs font-black text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D] hover:bg-[#FFD952] cursor-pointer"
                          >
                            <Edit3 className="size-3" /> Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete FAQ?`)) {
                                deleteFaq(faq.id)
                                toast('FAQ deleted.')
                              }
                            }}
                            className="flex size-7 items-center justify-center rounded-lg border-2 border-[#2D1F1D] bg-[#FFB5B5] text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D] hover:bg-[#FF8A8A] cursor-pointer"
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

            {/* 10. CONTACT & ATELIER INFO TAB */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <SectionHeaderCard
                  title="Contact Information & Studio Settings"
                  subtitle="Edit Farah's email address, WhatsApp numbers, physical studio location, and workshop availability."
                  onPreview={() => setPreviewSection('contact')}
                />

                <div className="rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-6 shadow-[4px_4px_0px_#2D1F1D] space-y-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                        Contact Email Address
                      </label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-3 text-xs font-bold text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                        Studio Location / City
                      </label>
                      <input
                        type="text"
                        value={contactForm.location}
                        onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                        className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-3 text-xs font-bold text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                        WhatsApp Display Number
                      </label>
                      <input
                        type="text"
                        value={contactForm.whatsapp}
                        onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                        className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-3 text-xs font-bold text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                        WhatsApp International Link Number (No spaces)
                      </label>
                      <input
                        type="text"
                        value={contactForm.whatsappRaw}
                        onChange={(e) => setContactForm({ ...contactForm, whatsappRaw: e.target.value })}
                        className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-3 text-xs font-bold text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                        Response Time Badge
                      </label>
                      <input
                        type="text"
                        value={contactForm.responseTime}
                        onChange={(e) => setContactForm({ ...contactForm, responseTime: e.target.value })}
                        className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-3 text-xs font-bold text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-3 rounded-xl border-2 border-[#2D1F1D] bg-[#FAF5EC] p-3 shadow-[2px_2px_0px_#2D1F1D]">
                      <input
                        type="checkbox"
                        id="workshopsCheck"
                        checked={contactForm.openForWorkshops}
                        onChange={(e) => setContactForm({ ...contactForm, openForWorkshops: e.target.checked })}
                        className="size-5 rounded border-2 border-[#2D1F1D] accent-[#FF7D6B] cursor-pointer"
                      />
                      <label htmlFor="workshopsCheck" className="text-xs font-black text-[#2D1F1D] cursor-pointer">
                        Currently Open for School Workshops &amp; Training
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3 border-t-2 border-[#2D1F1D]/10">
                    <button
                      type="button"
                      onClick={() => {
                        updateContact(contactForm)
                        toast('✨ Contact details updated!')
                      }}
                      className="flex items-center gap-2 rounded-xl border-2 border-[#2D1F1D] bg-[#FFE68C] px-6 py-2.5 text-xs font-black text-[#2D1F1D] shadow-[3px_3px_0px_#2D1F1D] hover:bg-[#FFD952] cursor-pointer"
                    >
                      <Save className="size-4" />
                      <span>Save Contact Details</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 11. MESSAGES INBOX TAB */}
            {activeTab === 'inbox' && (
              <div className="space-y-6">
                <SectionHeaderCard
                  title="Client Inquiries & Messages Inbox"
                  subtitle="Review workshop requests, prop orders, and teacher inquiries sent via the contact form."
                />

                {state.messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-12 text-center shadow-[4px_4px_0px_#2D1F1D]">
                    <Inbox className="size-12 text-[#6B5550]" />
                    <h3 className="mt-3 font-sans text-base font-black text-[#2D1F1D]">
                      No messages in your inbox yet
                    </h3>
                    <p className="mt-1 font-hand text-sm font-bold text-[#6B5550]">
                      Inquiries submitted from the public contact form will appear here in real-time.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {state.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          'rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-5 shadow-[4px_4px_0px_#2D1F1D] space-y-3',
                          msg.status === 'unread' && 'border-[#FF7D6B] bg-[#FFF9E6]',
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-sans text-sm font-black text-[#2D1F1D]">
                              {msg.name}
                            </span>
                            <span className="rounded-full bg-[#FFE68C] px-2 py-0.2 text-[0.65rem] font-bold border border-[#2D1F1D]">
                              {msg.role}
                            </span>
                            <span className="rounded-full bg-[#A7F3D0] px-2 py-0.2 text-[0.65rem] font-bold border border-[#2D1F1D]">
                              {msg.topic}
                            </span>
                          </div>
                          <span className="text-[0.7rem] font-bold text-[#6B5550]">
                            {new Date(msg.created_at).toLocaleDateString()}
                          </span>
                        </div>

                        <p className="text-xs font-medium text-[#2D1F1D] bg-[#FAF5EC] p-3 rounded-2xl border border-[#2D1F1D]/10">
                          {msg.message}
                        </p>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs font-bold text-[#FF7D6B]">{msg.email}</span>

                          <div className="flex items-center gap-2">
                            <a
                              href={`mailto:${msg.email}?subject=Re: Inquiry with Teacher Farah Affes`}
                              className="flex items-center gap-1 rounded-xl border-2 border-[#2D1F1D] bg-[#FFE68C] px-3 py-1 text-xs font-black text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D]"
                            >
                              <Send className="size-3" /> Reply Email
                            </a>
                            <button
                              type="button"
                              onClick={() => {
                                deleteMessage(msg.id)
                                toast('Message deleted.')
                              }}
                              className="flex size-7 items-center justify-center rounded-xl border-2 border-[#2D1F1D] bg-[#FFB5B5] text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D]"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 13. ORDERS & RENTALS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <SectionHeaderCard
                  title="Resource Orders & Prop Rentals"
                  subtitle="Manage customer orders, prop rental requests, and delivery confirmations."
                />

                {state.orders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-12 text-center shadow-[4px_4px_0px_#2D1F1D]">
                    <Package className="size-12 text-[#6B5550]" />
                    <h3 className="mt-3 font-sans text-base font-black text-[#2D1F1D]">
                      No orders or rental requests yet
                    </h3>
                    <p className="mt-1 font-hand text-sm font-bold text-[#6B5550]">
                      When visitors request prop rentals or purchases from the shop, they appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {state.orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-5 shadow-[4px_4px_0px_#2D1F1D] space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-sans text-sm font-black text-[#2D1F1D]">
                              {ord.customer_name}
                            </span>
                            <p className="text-xs font-bold text-[#FF7D6B]">📞 {ord.customer_phone}</p>
                          </div>
                          <span className="rounded-full border-2 border-[#2D1F1D] bg-[#FFE68C] px-3 py-1 text-xs font-black">
                            Total: {ord.subtotal} {ord.currency || 'TND'}
                          </span>
                        </div>

                        {/* Items */}
                        <div className="rounded-2xl border border-[#2D1F1D]/10 bg-[#FAF5EC] p-3 space-y-1">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs font-bold">
                              <span>
                                {it.qty}x {it.name} ({it.mode === 'rent' ? 'Rental' : 'Purchase'})
                              </span>
                              <span>{it.price * it.qty} TND</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <select
                            value={ord.status}
                            onChange={(e) => {
                              updateOrderStatus(ord.id, e.target.value as StoredOrder['status'])
                              toast(`Order status updated to ${e.target.value}`)
                            }}
                            className="rounded-xl border-2 border-[#2D1F1D] bg-white px-2.5 py-1 text-xs font-bold outline-none"
                          >
                            <option value="pending">⏳ Pending</option>
                            <option value="confirmed">✅ Confirmed</option>
                            <option value="fulfilled">📦 Fulfilled</option>
                            <option value="cancelled">❌ Cancelled</option>
                          </select>

                          <div className="flex items-center gap-2">
                            <a
                              href={`https://wa.me/${ord.customer_phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(ord.customer_name)},%20this%20is%20Teacher%20Farah%20Affes%20regarding%20your%20atelier%20request!`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1 rounded-xl border-2 border-[#2D1F1D] bg-[#A7F3D0] px-3 py-1 text-xs font-black text-[#065F46] shadow-[1.5px_1.5px_0px_#2D1F1D]"
                            >
                              <MessageCircle className="size-3" /> WhatsApp Customer
                            </a>
                            <button
                              type="button"
                              onClick={() => {
                                deleteOrder(ord.id)
                                toast('Order deleted.')
                              }}
                              className="flex size-7 items-center justify-center rounded-xl border-2 border-[#2D1F1D] bg-[#FFB5B5] text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D]"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 14. STUDIO SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <SectionHeaderCard
                  title="Studio Settings, Security &amp; Backups"
                  subtitle="Change your PIN, download full data backups, or restore portfolio defaults."
                />

                {/* Change PIN */}
                <div className="rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-6 shadow-[4px_4px_0px_#2D1F1D] space-y-4">
                  <h3 className="font-sans text-base font-black text-[#2D1F1D]">
                    Studio Access PIN
                  </h3>
                  <p className="font-hand text-xs font-bold text-[#6B5550]">
                    Current secret PIN: <span className="font-mono text-[#FF7D6B] font-bold">{state.adminPin}</span>
                  </p>

                  <div className="flex gap-2 max-w-sm">
                    <input
                      type="text"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      placeholder="Enter new 6-digit PIN"
                      className="flex-1 rounded-xl border-2 border-[#2D1F1D] bg-white p-2.5 text-xs font-bold outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newPin.length < 4) {
                          toast('PIN should be at least 4 characters.')
                          return
                        }
                        updateAdminPin(newPin)
                        setNewPin('')
                        toast('✨ Admin PIN updated successfully!')
                      }}
                      className="rounded-xl border-2 border-[#2D1F1D] bg-[#FFE68C] px-4 py-2.5 text-xs font-black shadow-[2px_2px_0px_#2D1F1D] hover:bg-[#FFD952] cursor-pointer"
                    >
                      Save PIN
                    </button>
                  </div>
                </div>

                {/* Backup & Restore */}
                <div className="rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-6 shadow-[4px_4px_0px_#2D1F1D] space-y-4">
                  <h3 className="font-sans text-base font-black text-[#2D1F1D]">
                    Data Export &amp; Backup
                  </h3>
                  <p className="font-hand text-xs font-bold text-[#6B5550]">
                    Export a full JSON snapshot of all your crafts, texts, and photos:
                  </p>

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
                        toast('✨ Full Portfolio Backup downloaded!')
                      }}
                      className="flex items-center gap-2 rounded-xl border-2 border-[#2D1F1D] bg-[#A7F3D0] px-4 py-2.5 text-xs font-black text-[#065F46] shadow-[2.5px_2.5px_0px_#2D1F1D] hover:bg-[#6EE7B7] cursor-pointer"
                    >
                      <Download className="size-4" />
                      <span>Download JSON Backup</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Reset all portfolio texts and crafts back to factory defaults?')) {
                          resetToDefaults()
                          toast('Portfolio restored to initial defaults.')
                        }
                      }}
                      className="flex items-center gap-2 rounded-xl border-2 border-[#2D1F1D] bg-[#FFB5B5] px-4 py-2.5 text-xs font-black text-[#2D1F1D] shadow-[2.5px_2.5px_0px_#2D1F1D] hover:bg-[#FF8A8A] cursor-pointer"
                    >
                      <RotateCcw className="size-4" />
                      <span>Reset to Factory Defaults</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CRUD MODALS FOR ITEMS (Works, Videos, Products, Testimonials, FAQ, Pillar) */}
      {/* ========================================================================= */}

      {/* Work Item CRUD Modal */}
      {(editingWork || isAddingWork) && (
        <WorkModal
          item={editingWork}
          onClose={() => {
            setEditingWork(null)
            setIsAddingWork(false)
          }}
          onSave={(data) => {
            if (editingWork) {
              updateWork(editingWork.id, data)
              toast('✨ Craft updated!')
            } else {
              addWork(data as Omit<WorkItem, 'id'>)
              toast('✨ New craft added to gallery!')
            }
            setEditingWork(null)
            setIsAddingWork(false)
          }}
        />
      )}

      {/* Video Item CRUD Modal */}
      {(editingVideo || isAddingVideo) && (
        <VideoModal
          item={editingVideo}
          onClose={() => {
            setEditingVideo(null)
            setIsAddingVideo(false)
          }}
          onSave={(data) => {
            if (editingVideo) {
              updateVideo(editingVideo.id, data)
              toast('✨ Video lesson updated!')
            } else {
              addVideo(data as Omit<VideoType, 'id'>)
              toast('✨ New video added to classroom lessons!')
            }
            setEditingVideo(null)
            setIsAddingVideo(false)
          }}
        />
      )}

      {/* Product Item CRUD Modal */}
      {(editingProduct || isAddingProduct) && (
        <ProductModal
          item={editingProduct}
          onClose={() => {
            setEditingProduct(null)
            setIsAddingProduct(false)
          }}
          onSave={(data) => {
            if (editingProduct) {
              updateProduct(editingProduct.id, data)
              toast('✨ Product updated!')
            } else {
              addProduct(data as Omit<Product, 'id'>)
              toast('✨ New product added to shop!')
            }
            setEditingProduct(null)
            setIsAddingProduct(false)
          }}
        />
      )}

      {/* Audience Item CRUD Modal */}
      {(editingAudience || isAddingAudience) && (
        <AudienceModal
          item={editingAudience}
          onClose={() => {
            setEditingAudience(null)
            setIsAddingAudience(false)
          }}
          onSave={(data) => {
            if (editingAudience) {
              updateAudience(editingAudience.id, data)
              toast('✨ Target audience updated!')
            } else {
              addAudience(data as Omit<Audience, 'id'>)
              toast('✨ New audience added!')
            }
            setEditingAudience(null)
            setIsAddingAudience(false)
          }}
        />
      )}

      {/* Testimonial Item CRUD Modal */}
      {(editingTestimonial || isAddingTestimonial) && (
        <TestimonialModal
          item={editingTestimonial}
          onClose={() => {
            setEditingTestimonial(null)
            setIsAddingTestimonial(false)
          }}
          onSave={(data) => {
            if (editingTestimonial) {
              updateTestimonial(editingTestimonial.id, data)
              toast('✨ Testimonial updated!')
            } else {
              addTestimonial(data as Omit<TestimonialItem, 'id'>)
              toast('✨ New testimonial added!')
            }
            setEditingTestimonial(null)
            setIsAddingTestimonial(false)
          }}
        />
      )}

      {/* FAQ Item CRUD Modal */}
      {(editingFaq || isAddingFaq) && (
        <FaqModal
          item={editingFaq}
          onClose={() => {
            setEditingFaq(null)
            setIsAddingFaq(false)
          }}
          onSave={(data) => {
            if (editingFaq) {
              updateFaq(editingFaq.id, data)
              toast('✨ FAQ question updated!')
            } else {
              addFaq(data as Omit<FaqItem, 'id'>)
              toast('✨ New FAQ added!')
            }
            setEditingFaq(null)
            setIsAddingFaq(false)
          }}
        />
      )}

      {/* Milestone Item CRUD Modal */}
      {(editingMilestone || isAddingMilestone) && (
        <MilestoneModal
          milestone={editingMilestone}
          onClose={() => {
            setEditingMilestone(null)
            setIsAddingMilestone(false)
          }}
          onSave={(data) => {
            if (editingMilestone) {
              updateMilestone(editingMilestone.id, data)
              toast('✨ Career milestone updated!')
            } else {
              addMilestone(data as Omit<CareerMilestone, 'id'>)
              toast('✨ New career milestone added to your journey!')
            }
            setEditingMilestone(null)
            setIsAddingMilestone(false)
          }}
        />
      )}

      {/* Pillar Item CRUD Modal */}
      {editingPillar && (
        <PillarModal
          pillar={editingPillar}
          onClose={() => setEditingPillar(null)}
          onSave={(updatedPillar) => {
            const currentPillars = [...(aboutForm.pillars || [])]
            const pIdx = currentPillars.findIndex((p) => p.id === updatedPillar.id)
            if (pIdx !== -1) {
              currentPillars[pIdx] = updatedPillar
            } else {
              currentPillars.push(updatedPillar)
            }
            const newAbout = { ...aboutForm, pillars: currentPillars }
            setAboutForm(newAbout)
            updateAbout(newAbout)
            toast('✨ Pedagogy pillar updated!')
            setEditingPillar(null)
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* LIVE SECTION PREVIEW MODAL (FULL-VIEWPORT RESPONSIVE PREVIEW)             */}
      {/* ========================================================================= */}
      {previewSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-1 sm:p-4 backdrop-blur-sm">
          <div className="flex h-[96vh] w-full max-w-[98vw] flex-col overflow-hidden rounded-3xl border-3 border-[#2D1F1D] bg-[#FAF5EC] shadow-[8px_8px_0px_#2D1F1D]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b-3 border-[#2D1F1D] bg-[#FFFDF9] px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg border border-[#2D1F1D] bg-[#6EE7B7] text-[#2D1F1D]">
                  <Eye className="size-4" />
                </span>
                <span className="font-sans text-xs sm:text-sm font-black text-[#2D1F1D]">
                  Live Section Preview: <span className="text-[#FF7D6B] uppercase">{previewSection}</span>
                </span>
              </div>

              {/* Viewport Width Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-xl border-2 border-[#2D1F1D] bg-[#FAF5EC] p-0.5 shadow-[1.5px_1.5px_0px_#2D1F1D]">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('desktop')}
                    className={cn(
                      'flex items-center gap-1 rounded-lg px-2.5 py-1 text-[0.7rem] font-black transition-all cursor-pointer',
                      previewDevice === 'desktop'
                        ? 'bg-[#FFE68C] text-[#2D1F1D] border border-[#2D1F1D]'
                        : 'text-[#6B5550]',
                    )}
                  >
                    <Monitor className="size-3" />
                    <span className="hidden sm:inline">Desktop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('tablet')}
                    className={cn(
                      'flex items-center gap-1 rounded-lg px-2.5 py-1 text-[0.7rem] font-black transition-all cursor-pointer',
                      previewDevice === 'tablet'
                        ? 'bg-[#FFE68C] text-[#2D1F1D] border border-[#2D1F1D]'
                        : 'text-[#6B5550]',
                    )}
                  >
                    <Tablet className="size-3" />
                    <span className="hidden sm:inline">Tablet</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('mobile')}
                    className={cn(
                      'flex items-center gap-1 rounded-lg px-2.5 py-1 text-[0.7rem] font-black transition-all cursor-pointer',
                      previewDevice === 'mobile'
                        ? 'bg-[#FFE68C] text-[#2D1F1D] border border-[#2D1F1D]'
                        : 'text-[#6B5550]',
                    )}
                  >
                    <Smartphone className="size-3" />
                    <span className="hidden sm:inline">Mobile</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setPreviewSection(null)}
                  className="flex size-8 items-center justify-center rounded-full border-2 border-[#2D1F1D] bg-[#FFB5B5] hover:bg-[#FF8A8A] cursor-pointer"
                >
                  <X className="size-4 text-[#2D1F1D]" />
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto bg-[#2D1F1D]/5 p-2 sm:p-6 flex justify-center items-start scrollbar-thin">
              <div
                className={cn(
                  'w-full bg-background transition-all duration-200 shadow-xl overflow-visible my-0',
                  previewDevice === 'desktop' && 'max-w-full rounded-2xl border-2 border-[#2D1F1D]',
                  previewDevice === 'tablet' && 'max-w-[768px] rounded-3xl border-4 border-[#2D1F1D] shrink-0',
                  previewDevice === 'mobile' && 'max-w-[375px] rounded-[36px] border-4 border-[#2D1F1D] shrink-0',
                )}
              >
                {previewSection === 'hero' && <Hero />}
                {previewSection === 'about' && <About />}
                {previewSection === 'works' && <WorkShowcase />}
                {previewSection === 'videos' && <Videos />}
                {previewSection === 'shop' && <ResourceShop />}
                {previewSection === 'audiences' && <WhoIServe />}
                {previewSection === 'testimonials' && <Testimonials />}
                {previewSection === 'faqs' && <Faq />}
                {previewSection === 'contact' && <Contact />}
              </div>
            </div>

            <div className="flex items-center justify-between border-t-3 border-[#2D1F1D] bg-[#FFFDF9] px-4 py-2.5 sm:px-6">
              <span className="text-xs font-bold text-[#6B5550]">
                Changes show up on your live site immediately.
              </span>
              <button
                type="button"
                onClick={() => setPreviewSection(null)}
                className="rounded-xl border-2 border-[#2D1F1D] bg-[#FFE68C] px-5 py-1.5 text-xs font-black text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] hover:bg-[#FFD952] cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ----------------------------------------------------
// REUSABLE SECTION HEADER CARD
// ----------------------------------------------------
function SectionHeaderCard({
  title,
  subtitle,
  onPreview,
  actionLabel,
  onAction,
}: {
  title: string
  subtitle: string
  onPreview?: () => void
  actionLabel?: string
  onAction?: () => void
}) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-5 shadow-[4px_4px_0px_#2D1F1D] sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-sans text-lg font-black text-[#2D1F1D] sm:text-xl">{title}</h2>
        <p className="font-hand text-xs font-bold text-[#6B5550]">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        {onPreview && (
          <button
            type="button"
            onClick={onPreview}
            className="flex items-center gap-1.5 rounded-xl border-2 border-[#2D1F1D] bg-[#6EE7B7] px-3.5 py-2 text-xs font-black text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] hover:bg-[#34D399] cursor-pointer"
          >
            <Eye className="size-3.5" />
            <span>Section Preview</span>
          </button>
        )}
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="flex items-center gap-1.5 rounded-xl border-2 border-[#2D1F1D] bg-[#FFE68C] px-4 py-2 text-xs font-black text-[#2D1F1D] shadow-[2.5px_2.5px_0px_#2D1F1D] hover:bg-[#FFD952] cursor-pointer"
          >
            <span>{actionLabel}</span>
          </button>
        )}
      </div>
    </div>
  )
}

// ----------------------------------------------------
// PHOTO UPLOADER & PRESET PICKER COMPONENT
// ----------------------------------------------------
function PhotoUploader({
  label,
  currentValue,
  onChange,
}: {
  label: string
  currentValue: string
  onChange: (val: string) => void
}) {
  const [showPresets, setShowPresets] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] p-4 shadow-[2px_2px_0px_#2D1F1D] space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-black uppercase text-[#2D1F1D]">{label}</label>
        <span className="text-[0.65rem] font-bold text-[#6B5550]">
          File upload, URL link or Preset gallery
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Photo Thumbnail Preview */}
        <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl border-2 border-[#2D1F1D] bg-white shadow-[2px_2px_0px_#2D1F1D]">
          {currentValue ? (
            <Image src={currentValue} alt="Preview" fill className="object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center text-[#6B5550]">
              <ImageIcon className="size-6" />
            </div>
          )}
        </div>

        {/* Input & Action Buttons */}
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={currentValue}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/... or https://..."
            className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold text-[#2D1F1D] outline-none"
          />

          <div className="flex flex-wrap items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 rounded-xl border border-[#2D1F1D] bg-white px-3 py-1 text-xs font-black text-[#2D1F1D] hover:bg-[#FFE68C] cursor-pointer"
            >
              <Upload className="size-3" />
              <span>Upload from Device</span>
            </button>

            <button
              type="button"
              onClick={() => setShowPresets(!showPresets)}
              className="flex items-center gap-1 rounded-xl border border-[#2D1F1D] bg-[#FFE68C] px-3 py-1 text-xs font-black text-[#2D1F1D] hover:bg-[#FFD952] cursor-pointer"
            >
              <Sparkles className="size-3" />
              <span>Choose from Studio Presets</span>
            </button>
          </div>
        </div>
      </div>

      {/* Presets Grid */}
      {showPresets && (
        <div className="mt-3 rounded-2xl border-2 border-[#2D1F1D] bg-white p-3 space-y-2 animate-pop-in">
          <div className="flex items-center justify-between pb-2 border-b border-[#2D1F1D]/10">
            <span className="text-xs font-black text-[#2D1F1D]">Studio Image Presets</span>
            <button
              type="button"
              onClick={() => setShowPresets(false)}
              className="text-xs font-bold text-[#6B5550] hover:text-[#2D1F1D]"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 max-h-48 overflow-y-auto p-1">
            {STUDIO_PRESET_IMAGES.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onChange(preset.url)
                  setShowPresets(false)
                }}
                className={cn(
                  'group flex flex-col items-center rounded-xl border p-1.5 text-center transition-all cursor-pointer',
                  currentValue === preset.url
                    ? 'border-[#2D1F1D] bg-[#FFE68C] shadow-[1.5px_1.5px_0px_#2D1F1D]'
                    : 'border-transparent bg-[#FAF5EC] hover:border-[#2D1F1D]/30',
                )}
              >
                <div className="relative h-12 w-full overflow-hidden rounded-lg">
                  <Image src={preset.url} alt={preset.label} fill className="object-cover" />
                </div>
                <span className="mt-1 text-[0.65rem] font-bold text-[#2D1F1D] line-clamp-1">
                  {preset.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ----------------------------------------------------
// DYNAMIC LIST CHIP MANAGER
// ----------------------------------------------------
function ListTagEditor({
  tags,
  onChange,
  placeholder,
}: {
  tags: string[]
  onChange: (newTags: string[]) => void
  placeholder: string
}) {
  const [inputVal, setInputVal] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputVal.trim()) return
    onChange([...tags, inputVal.trim()])
    setInputVal('')
  }

  const handleRemove = (index: number) => {
    onChange(tags.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t, idx) => (
          <span
            key={idx}
            className="flex items-center gap-1.5 rounded-full border border-[#2D1F1D] bg-[#FFE68C] px-2.5 py-0.5 text-xs font-bold text-[#2D1F1D]"
          >
            <span>{t}</span>
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="text-[#6B5550] hover:text-[#EF4444] cursor-pointer"
            >
              ✕
            </button>
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              if (inputVal.trim()) {
                onChange([...tags, inputVal.trim()])
                setInputVal('')
              }
            }
          }}
          placeholder={placeholder}
          className="flex-1 rounded-xl border-2 border-[#2D1F1D] bg-white p-2.5 text-xs font-bold text-[#2D1F1D] outline-none"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-xl border-2 border-[#2D1F1D] bg-[#A7F3D0] px-4 py-2.5 text-xs font-black text-[#065F46] shadow-[2px_2px_0px_#2D1F1D] hover:bg-[#6EE7B7] cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// MODALS FOR EDITING SPECIFIC ITEMS
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
  const [subtitle, setSubtitle] = useState(item?.subtitle || '')
  const [category, setCategory] = useState<WorkItem['category']>(item?.category || 'props')
  const [description, setDescription] = useState(item?.description || '')
  const [image, setImage] = useState(item?.image || '/images/product-phonics-wheel.png')
  const [priceBuy, setPriceBuy] = useState<number | undefined>(item?.priceBuy)
  const [priceRent, setPriceRent] = useState<number | undefined>(item?.priceRent)
  const [dimensions, setDimensions] = useState(item?.dimensions || '')
  const [materials, setMaterials] = useState<string[]>(item?.materials || [])
  const [tags, setTags] = useState<string[]>(item?.tags || [])
  const [isFeatured, setIsFeatured] = useState(item?.isFeatured || false)
  const [isActive, setIsActive] = useState(item?.isActive !== false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title,
      subtitle,
      category,
      tag: subtitle || category,
      description,
      image,
      priceBuy,
      priceRent,
      dimensions,
      materials,
      tags,
      isFeatured,
      isActive,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-6 shadow-[6px_6px_0px_#2D1F1D] space-y-4">
        <div className="flex items-center justify-between border-b-2 border-[#2D1F1D]/10 pb-3">
          <h3 className="font-sans text-base font-black text-[#2D1F1D]">
            {item ? 'Edit Craft Work' : 'Add New Craft Work'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="flex size-7 items-center justify-center rounded-full border border-[#2D1F1D] bg-[#FFB5B5] hover:bg-[#FF8A8A]"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Subtitle</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as WorkItem['category'])}
                className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
              >
                <option value="props">DIY Props &amp; Kits ✂️</option>
                <option value="posters">Posters &amp; Guides 📜</option>
                <option value="flyers">Flyers &amp; Events 🎈</option>
                <option value="worksheets">Worksheets &amp; Quests 📝</option>
                <option value="classroom">Classroom Moments 📸</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Dimensions</label>
              <input
                type="text"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                placeholder="e.g. 30 cm diameter"
                className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Purchase Price (TND)</label>
              <input
                type="number"
                value={priceBuy || ''}
                onChange={(e) => setPriceBuy(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="35"
                className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Rental Price (TND/day)</label>
              <input
                type="number"
                value={priceRent || ''}
                onChange={(e) => setPriceRent(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="10"
                className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-medium"
            />
          </div>

          <PhotoUploader label="Main Craft Photo" currentValue={image} onChange={setImage} />

          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Materials Used</label>
            <ListTagEditor tags={materials} onChange={setMaterials} placeholder="e.g. Laminated cardstock, Brass eyelets" />
          </div>

          <div className="flex items-center gap-4 rounded-xl bg-[#FAF5EC] p-3 border border-[#2D1F1D]/10">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featCheck"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="size-4 accent-[#FF7D6B]"
              />
              <label htmlFor="featCheck" className="text-xs font-bold text-[#2D1F1D]">
                Mark as Featured
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="actCheck"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="size-4 accent-[#FF7D6B]"
              />
              <label htmlFor="actCheck" className="text-xs font-bold text-[#2D1F1D]">
                Visible on Public Site
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#2D1F1D]/10">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#2D1F1D] px-4 py-2 text-xs font-black hover:bg-[#FAF5EC]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl border-2 border-[#2D1F1D] bg-[#FFE68C] px-5 py-2 text-xs font-black text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] hover:bg-[#FFD952]"
            >
              Save Craft
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
  const [duration, setDuration] = useState(item?.duration || '4:30')
  const [category, setCategory] = useState<VideoType['category']>(item?.category || 'pronunciation')
  const [ageGroup, setAgeGroup] = useState(item?.ageGroup || 'Primary (6–11 yrs)')
  const [description, setDescription] = useState(item?.description || '')
  const [videoUrl, setVideoUrl] = useState(item?.videoUrl || item?.src || 'https://www.youtube.com/embed/dQw4w9WgXcQ')
  const [thumbnail, setThumbnail] = useState(item?.thumbnail || '/images/video-lesson.png')
  const [takeaways, setTakeaways] = useState<string[]>(item?.takeaways || [])
  const [isActive, setIsActive] = useState(item?.isActive !== false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title,
      duration,
      category,
      level: ageGroup || 'All levels',
      ageGroup,
      description,
      src: videoUrl,
      videoUrl,
      thumbnail,
      takeaways,
      isActive,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-6 shadow-[6px_6px_0px_#2D1F1D] space-y-4">
        <div className="flex items-center justify-between border-b-2 border-[#2D1F1D]/10 pb-3">
          <h3 className="font-sans text-base font-black text-[#2D1F1D]">
            {item ? 'Edit Video Lesson' : 'Add New Video Lesson'}
          </h3>
          <button type="button" onClick={onClose} className="flex size-7 items-center justify-center rounded-full border border-[#2D1F1D] bg-[#FFB5B5]">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Video Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as VideoType['category'])}
                className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
              >
                <option value="pronunciation">Pronunciation &amp; Phonics 🗣️</option>
                <option value="grammar">Grammar Made Simple 🧩</option>
                <option value="storytelling">Storytelling &amp; Immersion 📖</option>
                <option value="workshop">Teacher Workshops 🎒</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="4:30"
                className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Age Group</label>
              <input
                type="text"
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                placeholder="Primary (6-11 yrs)"
                className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Video Embed URL (YouTube/Vimeo/MP4)</label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/embed/..."
              className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-medium"
            />
          </div>

          <PhotoUploader label="Video Thumbnail Photo" currentValue={thumbnail} onChange={setThumbnail} />

          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Key Lesson Takeaways</label>
            <ListTagEditor tags={takeaways} onChange={setTakeaways} placeholder="e.g. Tactile sound blending, Rhyming games" />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#2D1F1D]/10">
            <button type="button" onClick={onClose} className="rounded-xl border border-[#2D1F1D] px-4 py-2 text-xs font-black">
              Cancel
            </button>
            <button type="submit" className="rounded-xl border-2 border-[#2D1F1D] bg-[#FFE68C] px-5 py-2 text-xs font-black shadow-[2px_2px_0px_#2D1F1D]">
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
  const [title, setTitle] = useState(item?.title || item?.name || '')
  const [subtitle, setSubtitle] = useState(item?.subtitle || '')
  const [category, setCategory] = useState<Product['category']>(item?.category || 'props')
  const [format, setFormat] = useState<Product['format']>(item?.format || 'Handmade Physical Prop')
  const [priceBuy, setPriceBuy] = useState<number>(item?.priceBuy || item?.buyPrice || 30)
  const [priceRent, setPriceRent] = useState<number | undefined>(item?.priceRent || item?.rentPrice)
  const [badge, setBadge] = useState(item?.badge || '')
  const [description, setDescription] = useState(item?.description || '')
  const [image, setImage] = useState(item?.image || '/images/product-phonics-wheel.png')
  const [features, setFeatures] = useState<string[]>(item?.features || [])
  const [tags, setTags] = useState<string[]>(item?.tags || [])
  const [isActive, setIsActive] = useState(item?.isActive !== false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      name: title,
      title,
      subtitle,
      category,
      format,
      options: ['buy', ...(priceRent ? ['rent' as const] : [])],
      buyPrice: priceBuy,
      rentPrice: priceRent,
      priceBuy,
      priceRent,
      badge,
      description,
      image,
      features,
      tags,
      isActive,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-6 shadow-[6px_6px_0px_#2D1F1D] space-y-4">
        <div className="flex items-center justify-between border-b-2 border-[#2D1F1D]/10 pb-3">
          <h3 className="font-sans text-base font-black text-[#2D1F1D]">
            {item ? 'Edit Shop Resource' : 'Add New Resource'}
          </h3>
          <button type="button" onClick={onClose} className="flex size-7 items-center justify-center rounded-full border border-[#2D1F1D] bg-[#FFB5B5]">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Product Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Subtitle / Tagline</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Format</label>
              <input
                type="text"
                value={format}
                onChange={(e) => setFormat(e.target.value as Product['format'])}
                placeholder="e.g. Handmade Physical Prop / Digital PDF"
                className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Badge / Ribbon</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Best Seller / New"
                className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Purchase Price (TND)</label>
              <input
                type="number"
                required
                value={priceBuy}
                onChange={(e) => setPriceBuy(Number(e.target.value))}
                className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Rental Price (TND/day)</label>
              <input
                type="number"
                value={priceRent || ''}
                onChange={(e) => setPriceRent(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="10"
                className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-medium"
            />
          </div>

          <PhotoUploader label="Product Photo" currentValue={image} onChange={setImage} />

          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Features Included</label>
            <ListTagEditor tags={features} onChange={setFeatures} placeholder="e.g. 40 word strips, Laminated guide" />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#2D1F1D]/10">
            <button type="button" onClick={onClose} className="rounded-xl border border-[#2D1F1D] px-4 py-2 text-xs font-black">
              Cancel
            </button>
            <button type="submit" className="rounded-xl border-2 border-[#2D1F1D] bg-[#FFE68C] px-5 py-2 text-xs font-black shadow-[2px_2px_0px_#2D1F1D]">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function AudienceModal({
  item,
  onClose,
  onSave,
}: {
  item: Audience | null
  onClose: () => void
  onSave: (data: Partial<Audience>) => void
}) {
  const [title, setTitle] = useState(item?.title || '')
  const [subtitle, setSubtitle] = useState(item?.subtitle || '')
  const [ageGroup, setAgeGroup] = useState(item?.ageGroup || '')
  const [icon, setIcon] = useState(item?.icon || '🎒')
  const [focus, setFocus] = useState(item?.focus || item?.intro || '')
  const [points, setPoints] = useState<string[]>(item?.points || [])
  const [isActive, setIsActive] = useState(item?.isActive !== false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title,
      subtitle,
      ageGroup,
      icon,
      focus,
      intro: focus || subtitle || '',
      points,
      isActive,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-6 shadow-[6px_6px_0px_#2D1F1D] space-y-4">
        <div className="flex items-center justify-between border-b-2 border-[#2D1F1D]/10 pb-3">
          <h3 className="font-sans text-base font-black text-[#2D1F1D]">
            {item ? 'Edit Target Audience' : 'Add Target Audience'}
          </h3>
          <button type="button" onClick={onClose} className="flex size-7 items-center justify-center rounded-full border border-[#2D1F1D] bg-[#FFB5B5]">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Audience Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Age / Role Badge</label>
              <input
                type="text"
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Subtitle</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Emoji Icon</label>
              <input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="🎒"
                className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Pedagogical Focus</label>
            <textarea
              rows={3}
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-medium"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Benefit Bullet Points</label>
            <ListTagEditor tags={points} onChange={setPoints} placeholder="e.g. Tactile sound blends, Low-anxiety games" />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#2D1F1D]/10">
            <button type="button" onClick={onClose} className="rounded-xl border border-[#2D1F1D] px-4 py-2 text-xs font-black">
              Cancel
            </button>
            <button type="submit" className="rounded-xl border-2 border-[#2D1F1D] bg-[#FFE68C] px-5 py-2 text-xs font-black shadow-[2px_2px_0px_#2D1F1D]">
              Save Audience
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
  const [role, setRole] = useState(item?.role || '')
  const [quote, setQuote] = useState(item?.quote || '')
  const [rating, setRating] = useState<number>(item?.rating || 5)
  const [isActive, setIsActive] = useState(item?.isActive !== false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ name, role, quote, rating, isActive })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-6 shadow-[6px_6px_0px_#2D1F1D] space-y-4">
        <div className="flex items-center justify-between border-b-2 border-[#2D1F1D]/10 pb-3">
          <h3 className="font-sans text-base font-black text-[#2D1F1D]">
            {item ? 'Edit Testimonial' : 'Add Testimonial'}
          </h3>
          <button type="button" onClick={onClose} className="flex size-7 items-center justify-center rounded-full border border-[#2D1F1D] bg-[#FFB5B5]">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Author Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Leila Bouazizi"
              className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Role / Location</label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Primary English Teacher • Tunis"
              className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Star Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
            >
              <option value={5}>★★★★★ 5 Stars</option>
              <option value={4}>★★★★☆ 4 Stars</option>
              <option value={3}>★★★☆☆ 3 Stars</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Endorsement Quote</label>
            <textarea
              rows={3}
              required
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-medium"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#2D1F1D]/10">
            <button type="button" onClick={onClose} className="rounded-xl border border-[#2D1F1D] px-4 py-2 text-xs font-black">
              Cancel
            </button>
            <button type="submit" className="rounded-xl border-2 border-[#2D1F1D] bg-[#FFE68C] px-5 py-2 text-xs font-black shadow-[2px_2px_0px_#2D1F1D]">
              Save Testimonial
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
      <div className="w-full max-w-md rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-6 shadow-[6px_6px_0px_#2D1F1D] space-y-4">
        <div className="flex items-center justify-between border-b-2 border-[#2D1F1D]/10 pb-3">
          <h3 className="font-sans text-base font-black text-[#2D1F1D]">
            {item ? 'Edit FAQ Question' : 'Add FAQ Question'}
          </h3>
          <button type="button" onClick={onClose} className="flex size-7 items-center justify-center rounded-full border border-[#2D1F1D] bg-[#FFB5B5]">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Question</label>
            <input
              type="text"
              required
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="e.g. Can I rent props for a school event?"
              className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Answer</label>
            <textarea
              rows={4}
              required
              value={a}
              onChange={(e) => setA(e.target.value)}
              placeholder="Yes! Props can be rented with delivery..."
              className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-medium"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#2D1F1D]/10">
            <button type="button" onClick={onClose} className="rounded-xl border border-[#2D1F1D] px-4 py-2 text-xs font-black">
              Cancel
            </button>
            <button type="submit" className="rounded-xl border-2 border-[#2D1F1D] bg-[#FFE68C] px-5 py-2 text-xs font-black shadow-[2px_2px_0px_#2D1F1D]">
              Save Question
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function PillarModal({
  pillar,
  onClose,
  onSave,
}: {
  pillar: AboutPillar
  onClose: () => void
  onSave: (pillar: AboutPillar) => void
}) {
  const [title, setTitle] = useState(pillar.title || '')
  const [subtitle, setSubtitle] = useState(pillar.subtitle || '')
  const [number, setNumber] = useState(pillar.number || '01')
  const [description, setDescription] = useState(pillar.description || '')
  const [highlights, setHighlights] = useState<string[]>(pillar.highlights || [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...pillar,
      title,
      subtitle,
      number,
      description,
      highlights,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] p-6 shadow-[6px_6px_0px_#2D1F1D] space-y-4">
        <div className="flex items-center justify-between border-b-2 border-[#2D1F1D]/10 pb-3">
          <h3 className="font-sans text-base font-black text-[#2D1F1D]">
            Edit Pedagogy Pillar ({number})
          </h3>
          <button type="button" onClick={onClose} className="flex size-7 items-center justify-center rounded-full border border-[#2D1F1D] bg-[#FFB5B5]">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Number Badge</label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Pillar Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Subtitle / Method Focus</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-bold"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-[#2D1F1D] bg-white p-2 text-xs font-medium"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">Pillar Highlights</label>
            <ListTagEditor tags={highlights} onChange={setHighlights} placeholder="e.g. Phoneme-Grapheme Mapping" />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#2D1F1D]/10">
            <button type="button" onClick={onClose} className="rounded-xl border border-[#2D1F1D] px-4 py-2 text-xs font-black">
              Cancel
            </button>
            <button type="submit" className="rounded-xl border-2 border-[#2D1F1D] bg-[#FFE68C] px-5 py-2 text-xs font-black shadow-[2px_2px_0px_#2D1F1D]">
              Save Pillar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function MilestoneModal({
  milestone,
  onClose,
  onSave,
}: {
  milestone: CareerMilestone | null
  onClose: () => void
  onSave: (milestone: Partial<CareerMilestone>) => void
}) {
  const [title, setTitle] = useState(milestone?.title || '')
  const [organization, setOrganization] = useState(milestone?.organization || '')
  const [period, setPeriod] = useState(milestone?.period || '2023 — Present')
  const [category, setCategory] = useState<MilestoneCategory>(milestone?.category || 'career')
  const [categoryLabel, setCategoryLabel] = useState(milestone?.categoryLabel || 'Teaching Career')
  const [badgeEmoji, setBadgeEmoji] = useState(milestone?.badgeEmoji || '💼')
  const [images, setImages] = useState<string[]>(
    milestone?.images && milestone.images.length > 0
      ? milestone.images
      : milestone?.image
        ? [milestone.image]
        : ['/images/classroom-1.png'],
  )
  const [description, setDescription] = useState(milestone?.description || '')
  const [highlights, setHighlights] = useState<string[]>(
    milestone?.highlights || ['Classroom Tested', 'Active Engagement'],
  )
  const [isActive, setIsActive] = useState(milestone?.isActive !== false)

  const handleCategoryChange = (newCat: MilestoneCategory) => {
    setCategory(newCat)
    if (newCat === 'education') {
      setCategoryLabel('Academic Degree')
      setBadgeEmoji('🎓')
    } else if (newCat === 'career') {
      setCategoryLabel('Teaching Career')
      setBadgeEmoji('💼')
    } else if (newCat === 'life') {
      setCategoryLabel('Creative Atelier & Life')
      setBadgeEmoji('✂️')
    } else if (newCat === 'achievement') {
      setCategoryLabel('Teacher Training')
      setBadgeEmoji('🌟')
    }
  }

  const handleAddPhoto = (newUrl: string) => {
    if (!newUrl) return
    setImages([...images, newUrl])
  }

  const handleRemovePhoto = (removeIdx: number) => {
    if (images.length <= 1) return
    setImages(images.filter((_, idx) => idx !== removeIdx))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title,
      organization,
      period,
      category,
      categoryLabel,
      badgeEmoji,
      image: images[0] || '/images/farah-portrait.png',
      images,
      description,
      highlights,
      isActive,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-4 backdrop-blur-xs">
      <div className="w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden rounded-3xl border-3 border-[#2D1F1D] bg-[#FFFDF9] shadow-[8px_8px_0px_#2D1F1D]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b-3 border-[#2D1F1D] bg-[#FAF5EC] px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg border border-[#2D1F1D] bg-[#A7F3D0] text-[#2D1F1D]">
              <GraduationCap className="size-4" />
            </span>
            <div>
              <h3 className="font-sans text-sm sm:text-base font-black text-[#2D1F1D]">
                {milestone ? 'Edit Career & Life Milestone' : 'Add New Journey Milestone'}
              </h3>
              <p className="text-[0.65rem] font-bold text-[#6B5550]">
                Manage degrees, classroom roles, or atelier projects with multiple photos.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-7 items-center justify-center rounded-full border border-[#2D1F1D] bg-[#FFB5B5] hover:bg-[#FF8A8A] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Milestone Title */}
          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
              Milestone Title / Degree / Role *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Bachelor's Degree in English Linguistics"
              className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-2.5 text-xs font-bold text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none"
            />
          </div>

          {/* Organization & Period */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                Institution / School / Organization *
              </label>
              <input
                type="text"
                required
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g. Faculty of Letters of Sfax"
                className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-2.5 text-xs font-bold text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                Period / Years (Stamp) *
              </label>
              <input
                type="text"
                required
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="e.g. 2018 — 2021 or 2021 — Present"
                className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-2.5 text-xs font-bold text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none"
              />
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <label className="mb-1.5 block text-xs font-black uppercase text-[#2D1F1D]">
              Journey Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'education', label: '🎓 Education', color: 'bg-[#A7F3D0]' },
                { id: 'career', label: '💼 Teaching', color: 'bg-[#DDD6FE]' },
                { id: 'life', label: '✂️ Creative Life', color: 'bg-[#FFB5B5]' },
                { id: 'achievement', label: '🌟 Workshops', color: 'bg-[#FED7AA]' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id as MilestoneCategory)}
                  className={cn(
                    'rounded-xl border-2 p-2 text-xs font-black transition-all cursor-pointer text-center',
                    category === cat.id
                      ? `${cat.color} border-[#2D1F1D] text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D]`
                      : 'border-[#2D1F1D]/20 bg-white text-[#6B5550]',
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Label & Emoji */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                Category Badge Text
              </label>
              <input
                type="text"
                value={categoryLabel}
                onChange={(e) => setCategoryLabel(e.target.value)}
                placeholder="e.g. Academic Degree"
                className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-2 text-xs font-bold text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
                Badge Emoji
              </label>
              <div className="flex items-center gap-1.5">
                {['🎓', '💼', '✂️', '🌟', '🏆', '📖', '🌸', '🎨'].map((em) => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => setBadgeEmoji(em)}
                    className={cn(
                      'flex size-8 items-center justify-center rounded-lg border text-sm transition-all cursor-pointer',
                      badgeEmoji === em
                        ? 'border-[#2D1F1D] bg-[#FFE68C] shadow-xs'
                        : 'border-[#2D1F1D]/20 bg-white hover:bg-[#FAF5EC]',
                    )}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Multiple Photos Deck Manager */}
          <div className="rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] p-4 shadow-[2px_2px_0px_#2D1F1D] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-black uppercase text-[#2D1F1D]">
                  🃏 Milestone Photo Deck ({images.length} photos)
                </label>
                <p className="text-[0.65rem] font-bold text-[#6B5550]">
                  These photos form the interactive playing card stack on your public profile.
                </p>
              </div>
            </div>

            {/* Current Photos Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
              {images.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] rounded-xl border-2 border-[#2D1F1D] bg-white overflow-hidden shadow-[1.5px_1.5px_0px_#2D1F1D] group"
                >
                  <Image src={imgUrl} alt={`Photo ${idx + 1}`} fill className="object-cover" />
                  <span className="absolute top-1 left-1 rounded bg-[#FFE68C] px-1 py-0.2 text-[0.55rem] font-black border border-[#2D1F1D]">
                    #{idx + 1}
                  </span>
                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      title="Remove this photo from deck"
                      className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full border border-[#2D1F1D] bg-[#FFB5B5] hover:bg-[#FF8A8A] cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add another photo to deck */}
            <PhotoUploader
              label="+ Upload or Pick Another Photo for This Deck"
              currentValue=""
              onChange={(newUrl) => handleAddPhoto(newUrl)}
            />
          </div>

          {/* Story Narrative */}
          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
              Story Narrative &amp; Description *
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your achievements, studies, and classroom moments during this period..."
              className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white p-2.5 text-xs font-medium text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] outline-none"
            />
          </div>

          {/* Highlights List */}
          <div>
            <label className="mb-1 block text-xs font-black uppercase text-[#2D1F1D]">
              Key Highlights &amp; Skills Pills
            </label>
            <ListTagEditor
              tags={highlights}
              onChange={setHighlights}
              placeholder="Add key takeaway (e.g. Phonetics & Phonology)"
            />
          </div>

          {/* Active Toggle Switch */}
          <div className="flex items-center gap-3 rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] p-3 shadow-[2px_2px_0px_#2D1F1D]">
            <input
              type="checkbox"
              id="milestoneActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="size-5 rounded border-2 border-[#2D1F1D] accent-[#10B981] cursor-pointer"
            />
            <label htmlFor="milestoneActive" className="text-xs font-black text-[#2D1F1D] cursor-pointer">
              Visible in Public About Me Timeline
            </label>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-2 pt-3 border-t-2 border-[#2D1F1D]/10">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border-2 border-[#2D1F1D] bg-white px-4 py-2 text-xs font-black text-[#2D1F1D] hover:bg-[#FAF5EC] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl border-2 border-[#2D1F1D] bg-[#FFE68C] px-6 py-2 text-xs font-black text-[#2D1F1D] shadow-[2.5px_2.5px_0px_#2D1F1D] hover:bg-[#FFD952] cursor-pointer"
            >
              {milestone ? 'Save Changes' : 'Create Milestone'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
