'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

type Particle = {
  id: number
  x: number
  y: number
  color: string
  size: number
  char: string
  vx: number
  vy: number
  life: number
}

const SPARKLE_CHARS = ['✦', '⋆', '✿', '✨', '•', '✧', '💖', '☀️', '💛']
const SPARKLE_COLORS = ['#FFC837', '#FF7D6B', '#F59E0B', '#FDE047', '#FB7185', '#34D399']

// 1. High-definition Crisp Smiling Sun Cursor (Normal Moving State)
const DEFAULT_SUN_SVG = encodeURIComponent(`
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 4L14 10L10 14Z" fill="#F59E0B" stroke="#2D1F1D" stroke-width="2" stroke-linejoin="round"/>
  <path d="M22 4L22 9" stroke="#FFB800" stroke-width="3" stroke-linecap="round"/>
  <path d="M33 8L29 12" stroke="#FFB800" stroke-width="3" stroke-linecap="round"/>
  <path d="M37 20L32 20" stroke="#FFB800" stroke-width="3" stroke-linecap="round"/>
  <path d="M33 32L29 28" stroke="#FFB800" stroke-width="3" stroke-linecap="round"/>
  <path d="M22 36L22 31" stroke="#FFB800" stroke-width="3" stroke-linecap="round"/>
  <path d="M10 32L14 28" stroke="#FFB800" stroke-width="3" stroke-linecap="round"/>
  <path d="M5 21L10 21" stroke="#FFB800" stroke-width="3" stroke-linecap="round"/>
  <circle cx="21" cy="20" r="11" fill="#FFC837" stroke="#2D1F1D" stroke-width="2.2"/>
  <circle cx="21" cy="20" r="9" fill="#FFE066"/>
  <circle cx="16" cy="22" r="2.2" fill="#FB7185" opacity="0.85"/>
  <circle cx="26" cy="22" r="2.2" fill="#FB7185" opacity="0.85"/>
  <ellipse cx="17.5" cy="18" rx="1.6" ry="2.2" fill="#2D1F1D"/>
  <circle cx="18.2" cy="17.2" r="0.8" fill="#FFFFFF"/>
  <ellipse cx="24.5" cy="18" rx="1.6" ry="2.2" fill="#2D1F1D"/>
  <circle cx="25.2" cy="17.2" r="0.8" fill="#FFFFFF"/>
  <path d="M18.5 21.5C19.5 23.5 22.5 23.5 23.5 21.5" stroke="#2D1F1D" stroke-width="1.8" stroke-linecap="round" fill="none"/>
</svg>
`)

// 2. High-definition Winking Joyful Sun Cursor (Hover State on buttons & cards)
const POINTER_SUN_SVG = encodeURIComponent(`
<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 4L15 10L10 15Z" fill="#FF7D6B" stroke="#2D1F1D" stroke-width="2" stroke-linejoin="round"/>
  <path d="M23 38L23 33" stroke="#FF7D6B" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M10 34L14 30" stroke="#FF7D6B" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M5 22L10 22" stroke="#FF7D6B" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="22" cy="21" r="12" fill="#FFC837" stroke="#2D1F1D" stroke-width="2.4"/>
  <circle cx="22" cy="21" r="10" fill="#FFE68C"/>
  <circle cx="16" cy="23" r="2.8" fill="#FB7185"/>
  <circle cx="28" cy="23" r="2.8" fill="#FB7185"/>
  <path d="M14.5 18.5C16 16.5 18 16.5 19.5 18.5" stroke="#2D1F1D" stroke-width="2" stroke-linecap="round" fill="none"/>
  <ellipse cx="26" cy="18" rx="1.8" ry="2.2" fill="#2D1F1D"/>
  <circle cx="26.8" cy="17.2" r="0.9" fill="#FFFFFF"/>
  <path d="M18.5 22.5C19.5 25.5 24.5 25.5 25.5 22.5" stroke="#2D1F1D" stroke-width="1.8" stroke-linecap="round" fill="#FF7D6B"/>
  <path d="M36 6L37 10L41 11L37 12L36 16L35 12L31 11L35 10Z" fill="#FFE68C" stroke="#2D1F1D" stroke-width="1"/>
</svg>
`)

export function CuteCursor() {
  const pathname = usePathname()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animFrameRef = useRef<number | null>(null)
  const lastEmitPos = useRef({ x: -100, y: -100 })
  const particleId = useRef(0)
  const [mounted, setMounted] = useState(false)

  const isAdmin = pathname?.startsWith('/admin')

  useEffect(() => {
    if (isAdmin) {
      const el = document.getElementById('cute-cursor-styles')
      if (el) el.remove()
      return
    }

    if (typeof window === 'undefined') return
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    setMounted(true)

    // Inject hardware-accelerated CSS cursor style for perfect zero-lag accuracy
    let styleEl = document.getElementById('cute-cursor-styles')
    if (!styleEl) {
      styleEl = document.createElement('style')
      styleEl.id = 'cute-cursor-styles'
      document.head.appendChild(styleEl)
    }
    styleEl.innerHTML = `
      * {
        cursor: url("data:image/svg+xml,${DEFAULT_SUN_SVG}") 4 4, auto !important;
      }
      button, a, select, [role="button"], .cursor-pointer, .interactive-hover {
        cursor: url("data:image/svg+xml,${POINTER_SUN_SVG}") 4 4, pointer !important;
      }
      input, textarea {
        cursor: text !important;
      }
    `

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastEmitPos.current.x
      const dy = e.clientY - lastEmitPos.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      // Emit cute sparkle when moving
      if (dist > 28) {
        lastEmitPos.current = { x: e.clientX, y: e.clientY }
        addSparkle(e.clientX, e.clientY)
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      // Magic sparkle burst on click
      for (let i = 0; i < 6; i++) {
        addSparkle(e.clientX, e.clientY, true)
      }
    }

    const addSparkle = (x: number, y: number, burst = false) => {
      const angle = Math.random() * Math.PI * 2
      const speed = burst ? Math.random() * 3 + 1.2 : Math.random() * 1.2 + 0.3
      const newParticle: Particle = {
        id: particleId.current++,
        x: x + (Math.random() * 12 - 6),
        y: y + (Math.random() * 12 - 6),
        color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
        size: Math.random() * 5 + 10,
        char: SPARKLE_CHARS[Math.floor(Math.random() * SPARKLE_CHARS.length)],
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (burst ? 1.5 : 0.5),
        life: 1,
      }
      particlesRef.current.push(newParticle)
      if (particlesRef.current.length > 20) {
        particlesRef.current.shift()
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)

    const canvas = canvasRef.current
    let ctx: CanvasRenderingContext2D | null = null
    if (canvas) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      ctx = canvas.getContext('2d')
    }

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }
    window.addEventListener('resize', handleResize)

    const render = () => {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        particlesRef.current.forEach((p) => {
          p.x += p.vx
          p.y += p.vy
          p.life -= 0.035
          if (p.life > 0) {
            ctx.save()
            ctx.font = `bold ${p.size}px sans-serif`
            ctx.fillStyle = p.color
            ctx.globalAlpha = p.life
            ctx.fillText(p.char, p.x, p.y)
            ctx.restore()
          }
        })
        particlesRef.current = particlesRef.current.filter((p) => p.life > 0)
      }
      animFrameRef.current = requestAnimationFrame(render)
    }
    animFrameRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('resize', handleResize)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      const el = document.getElementById('cute-cursor-styles')
      if (el) el.remove()
    }
  }, [isAdmin])

  if (isAdmin || !mounted) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999] size-full select-none"
      aria-hidden="true"
    />
  )
}
