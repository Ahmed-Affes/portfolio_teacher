'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Sparkles, ChevronRight, Compass } from 'lucide-react'
import { cn } from '@/lib/utils'

type SectionWaypoint = {
  id: string
  label: string
  number: string
  icon: string
}

const SECTIONS: SectionWaypoint[] = [
  { id: 'home', label: 'Welcome to Atelier', number: '00', icon: '✨' },
  { id: 'about', label: 'About Farah', number: '01', icon: '🌸' },
  { id: 'work', label: 'Craft Showcase', number: '02', icon: '✂️' },
  { id: 'videos', label: 'Video Lessons', number: '03', icon: '🎬' },
  { id: 'serve', label: 'Who I Serve', number: '04', icon: '🧸' },
  { id: 'testimonials', label: 'Endorsements', number: '05', icon: '💬' },
  { id: 'faq', label: 'Atelier FAQ', number: '06', icon: '💡' },
  { id: 'contact', label: 'Get in Touch', number: '07', icon: '💌' },
]

export function ScrollPaperPlane() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const planeIconRef = useRef<HTMLDivElement | null>(null)
  const bannerRef = useRef<HTMLDivElement | null>(null)
  const trailPoints = useRef<{ x: number; y: number; time: number }[]>([])
  const animFrameId = useRef<number | null>(null)
  const [activeSection, setActiveSection] = useState<SectionWaypoint>(SECTIONS[0])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFacingLeft, setIsFacingLeft] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Smooth position lerping
  const targetProgress = useRef(0)
  const currentProgress = useRef(0)

  const findActiveSection = useCallback(() => {
    const scrollY = window.scrollY || window.pageYOffset || 0
    const viewportMiddle = scrollY + window.innerHeight * 0.4

    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const el = document.getElementById(SECTIONS[i].id)
      if (el) {
        const top = el.offsetTop
        if (viewportMiddle >= top - 120) {
          return SECTIONS[i]
        }
      }
    }
    return SECTIONS[0]
  }, [])

  const flyToNextSection = () => {
    const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection.id)
    const nextIndex = (currentIndex + 1) % SECTIONS.length
    const nextSection = SECTIONS[nextIndex]
    const el = document.getElementById(nextSection.id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const flyToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMenuOpen(false)
    }
  }

  // Trajectory function for wide, smooth, sweeping S-curve across the entire screen
  const getFlightCoordinates = (p: number, width: number, height: number) => {
    const isMobile = width < 768

    if (isMobile) {
      // Graceful mobile curve that wanders smoothly across the screen
      const x = width * (0.5 + 0.36 * Math.sin(p * Math.PI * 3.5))
      const y = height * (0.12 + 0.76 * p)
      return { x, y }
    }

    // Wide sweeping desktop flight: Left (15%) -> Right (85%) -> Left (18%) -> Right (82%)
    // Creates majestic full-screen soaring motion as you travel down the chapters
    const x = width * (0.16 + 0.68 * (0.5 - 0.5 * Math.cos(p * Math.PI * 3.5)))
    const y = height * (0.12 + 0.76 * p)
    return { x, y }
  }

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      targetProgress.current = Math.min(1, Math.max(0, scrollY / maxScroll))

      const currentSec = findActiveSection()
      setActiveSection(currentSec)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll()

    // 60 FPS Fluid Aerodynamic Render Loop
    const render = () => {
      // Lerp progress for buttery aerodynamic glide
      currentProgress.current += (targetProgress.current - currentProgress.current) * 0.08
      const p = currentProgress.current

      const width = window.innerWidth
      const height = window.innerHeight

      const canvas = canvasRef.current
      const container = containerRef.current
      const planeIcon = planeIconRef.current

      if (canvas && container) {
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width
          canvas.height = height
        }

        const currentPos = getFlightCoordinates(p, width, height)
        // Sample slightly ahead for tangent vector calculation
        const nextPos = getFlightCoordinates(Math.min(1, p + 0.006), width, height)

        const dx = nextPos.x - currentPos.x
        const dy = nextPos.y - currentPos.y
        let angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI

        // Move flight anchor
        container.style.transform = `translate3d(${currentPos.x}px, ${currentPos.y}px, 0)`

        // Determine if plane is flying left or right
        const flyingLeft = dx < 0
        setIsFacingLeft(flyingLeft)

        // Rotate plane icon naturally in direction of travel
        if (planeIcon) {
          if (flyingLeft) {
            // Flip airplane vertically when heading left so it remains right-side up
            planeIcon.style.transform = `rotate(${angleDeg}deg) scaleY(-1)`
          } else {
            planeIcon.style.transform = `rotate(${angleDeg}deg)`
          }
        }

        // Record flight trail history
        const now = performance.now()
        trailPoints.current.push({ x: currentPos.x, y: currentPos.y, time: now })
        trailPoints.current = trailPoints.current.filter((pt) => now - pt.time < 1600)

        // Draw animated trailing dotted flight path
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.clearRect(0, 0, width, height)
          const pts = trailPoints.current

          if (pts.length > 2) {
            for (let i = 1; i < pts.length; i++) {
              const age = (now - pts[i].time) / 1600
              const alpha = Math.max(0, 1 - age) * 0.85

              ctx.save()
              ctx.beginPath()
              ctx.setLineDash([5, 6])
              ctx.lineWidth = width < 768 ? 2 : 2.5
              ctx.strokeStyle = `rgba(255, 200, 55, ${alpha})`
              ctx.shadowColor = `rgba(249, 168, 201, ${alpha * 0.7})`
              ctx.shadowBlur = 6

              ctx.moveTo(pts[i - 1].x, pts[i - 1].y)
              ctx.lineTo(pts[i].x, pts[i].y)
              ctx.stroke()
              ctx.restore()
            }
          }
        }
      }

      animFrameId.current = requestAnimationFrame(render)
    }

    animFrameId.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
    }
  }, [findActiveSection])

  if (!mounted) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-40 select-none overflow-hidden" aria-hidden="true">
      {/* Canvas for trailing dotted flight path */}
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />

      {/* Floating Paper Airplane Flight Anchor */}
      <div
        ref={containerRef}
        className="pointer-events-auto absolute left-0 top-0 will-change-transform group cursor-pointer"
        style={{ transform: 'translate3d(-120px, -120px, 0)' }}
        onClick={flyToNextSection}
        title="Click to fly to next chapter ✈️"
      >
        <div className="relative flex items-center">
          {/* 1. Paper Airplane Visual (Rotates smoothly along flight path tangent) */}
          <div ref={planeIconRef} className="will-change-transform -translate-x-1/2 -translate-y-1/2">
            <div className="animate-bob" style={{ animationDuration: '3.4s' }}>
              <svg
                viewBox="0 0 54 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-8 sm:size-10 drop-shadow-[0_4px_10px_rgba(45,31,29,0.22)] transition-transform duration-200 group-hover:scale-115"
              >
                {/* Soft pink bottom fold */}
                <path
                  d="M2 22L50 4L28 40L20 27L2 22Z"
                  fill="#F9A8C9"
                  stroke="#2D1F1D"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />

                {/* Main Upper Wing (White) */}
                <path
                  d="M50 4L2 22L20 27L50 4Z"
                  fill="#FFFFFF"
                  stroke="#2D1F1D"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />

                {/* Inner Crease & Pastel Yellow Wing Fold */}
                <path
                  d="M50 4L20 27L28 40L50 4Z"
                  fill="#FFF9E6"
                  stroke="#2D1F1D"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />

                {/* Center Fold Crease Line */}
                <path d="M50 4L20 27" stroke="#FFC837" strokeWidth="2" strokeLinecap="round" />
                <path d="M20 27L24 33" stroke="#F9A8C9" strokeWidth="2" strokeLinecap="round" />

                {/* Nose Sparkle Dot */}
                <circle cx="50" cy="4" r="2.2" fill="#FFC837" stroke="#2D1F1D" strokeWidth="1" />
              </svg>
            </div>
          </div>

          {/* 2. Section Flight Guide Ribbon (Always 100% Upright, positioned smartly on trailing side) */}
          <div
            ref={bannerRef}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1.5 rounded-full border-2 border-[#2D1F1D] bg-white/95 px-3 py-1 text-[0.68rem] font-black text-[#2D1F1D] shadow-[3px_3px_0px_#2D1F1D] backdrop-blur-md transition-all duration-200 group-hover:scale-105 group-hover:bg-[#FFE68C] whitespace-nowrap',
              isFacingLeft ? 'left-6' : 'right-6',
            )}
          >
            <span>{activeSection.icon}</span>
            <span className="text-[#FF7D6B] font-black">{activeSection.number}</span>
            <span className="text-[#2D1F1D] font-bold">{activeSection.label}</span>
            <ChevronRight className="size-3 text-[#2D1F1D] stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* Floating Interactive Flight Waypoint Quick-Selector Button in Bottom-Left */}
      <div className="pointer-events-auto fixed bottom-5 left-5 z-40 hidden sm:block">
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-9 items-center gap-2 rounded-full border-2 border-[#2D1F1D] bg-white px-3 text-xs font-black text-[#2D1F1D] shadow-[3px_3px_0px_#2D1F1D] transition-all hover:bg-[#FFE68C] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <Compass className="size-4 text-[#FF7D6B] animate-spin-slow" />
          <span>Flight Navigator</span>
          <span className="rounded-full bg-[#FFE68C] px-1.5 py-0.2 text-[0.65rem] border border-[#2D1F1D]">
            {activeSection.number}
          </span>
        </button>

        {/* Quick Chapter Flight Menu */}
        {isMenuOpen && (
          <div className="absolute bottom-12 left-0 w-64 rounded-2xl border-3 border-[#2D1F1D] bg-white p-3 shadow-[6px_6px_0px_#2D1F1D] animate-pop-in">
            <div className="flex items-center justify-between border-b border-[#2D1F1D]/10 pb-2">
              <span className="flex items-center gap-1.5 text-xs font-black text-[#2D1F1D]">
                <Sparkles className="size-3.5 text-[#FF7D6B] fill-[#FF7D6B]" />
                <span>Atelier Chapters</span>
              </span>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="text-[0.65rem] font-bold text-[#6B5550] hover:text-[#2D1F1D] cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="mt-2 flex max-h-64 flex-col gap-1 overflow-y-auto pr-1">
              {SECTIONS.map((sec) => {
                const isActive = sec.id === activeSection.id
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => flyToSection(sec.id)}
                    className={cn(
                      'flex items-center justify-between rounded-xl border p-2 text-left text-xs font-bold transition-all cursor-pointer',
                      isActive
                        ? 'border-[#2D1F1D] bg-[#FFE68C] text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D]'
                        : 'border-transparent bg-[#FAF5EC] text-[#6B5550] hover:border-[#2D1F1D]/30 hover:bg-white hover:text-[#2D1F1D]',
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span>{sec.icon}</span>
                      <span>{sec.number} • {sec.label}</span>
                    </div>
                    {isActive && <span className="text-[0.65rem]">✈️</span>}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
