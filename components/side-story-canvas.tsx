'use client'

import { useEffect, useRef } from 'react'

const chapters = ['WELCOME', 'STORY', 'MAKE', 'PLAY', 'SHARE', 'GATHER', 'CHEER', 'HELLO']
const palette = { ink: '#2D1F1D', yellow: '#FFC837', coral: '#FF7D6B', pink: '#F9A8C9', mint: '#A7F3D0', white: '#FFFFFF', blue: '#BFE8F2' }

type Particle = { x: number; y: number; size: number; speed: number; phase: number }

function cloud(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, alpha = 0.8) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = palette.white; ctx.strokeStyle = palette.ink; ctx.lineWidth = 2
  ctx.beginPath(); ctx.arc(x, y + 8 * s, 17 * s, Math.PI, 0); ctx.arc(x + 22 * s, y, 23 * s, Math.PI, 0); ctx.arc(x + 49 * s, y + 9 * s, 16 * s, Math.PI, 0); ctx.lineTo(x + 65 * s, y + 22 * s); ctx.lineTo(x, y + 22 * s); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore()
}
function balloon(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, color: string, drift: number) {
  ctx.save(); ctx.translate(x + Math.sin(drift) * 15 * s, y); ctx.fillStyle = color; ctx.strokeStyle = palette.ink; ctx.lineWidth = 2
  ctx.beginPath(); ctx.ellipse(0, 0, 19 * s, 25 * s, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-4 * s, 24 * s); ctx.lineTo(0, 31 * s); ctx.lineTo(4 * s, 24 * s); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, 31 * s); ctx.quadraticCurveTo(Math.sin(drift) * 10, 58 * s, 3 * s, 78 * s); ctx.stroke(); ctx.restore()
}
function bird(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, flap: number) { ctx.save(); ctx.translate(x, y); ctx.strokeStyle = palette.ink; ctx.lineWidth = 2.5 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-17 * s, Math.sin(flap) * 5 * s); ctx.quadraticCurveTo(-8 * s, -10 * s, 0, 0); ctx.quadraticCurveTo(9 * s, -10 * s, 18 * s, Math.sin(flap) * 5 * s); ctx.stroke(); ctx.restore() }
function plane(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, angle: number) { ctx.save(); ctx.translate(x, y); ctx.rotate(angle); ctx.fillStyle = palette.white; ctx.strokeStyle = palette.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-28 * s, -7 * s); ctx.lineTo(30 * s, 0); ctx.lineTo(-22 * s, 11 * s); ctx.lineTo(-7 * s, 2 * s); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-7 * s, 2 * s); ctx.lineTo(-20 * s, -16 * s); ctx.lineTo(30 * s, 0); ctx.stroke(); ctx.restore() }
function sun(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) { ctx.save(); ctx.fillStyle = palette.yellow; ctx.strokeStyle = palette.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 34 * s, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * 44 * s, y + Math.sin(a) * 44 * s); ctx.lineTo(x + Math.cos(a) * 58 * s, y + Math.sin(a) * 58 * s); ctx.stroke() } ctx.restore() }
function stars(ctx: CanvasRenderingContext2D, progress: number, w: number, h: number) { ctx.fillStyle = palette.yellow; for (let i = 0; i < 18; i++) { const x = ((i * 137 + progress * 220) % (w + 120)) - 60; const y = (i * 83 + Math.sin(progress * 8 + i) * 40) % h; ctx.globalAlpha = 0.2 + (i % 3) * 0.15; ctx.beginPath(); ctx.arc(x, y, 2 + (i % 3), 0, Math.PI * 2); ctx.fill() } ctx.globalAlpha = 1 }

export function SideStoryCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  const target = useRef(0); const current = useRef(0); const particles = useRef<Particle[]>([])
  useEffect(() => {
    if (window.innerWidth < 900) return
    const canvas = ref.current; const ctx = canvas?.getContext('2d'); if (!canvas || !ctx) return
    particles.current = Array.from({ length: 42 }, (_, i) => ({ x: (i * 71) % 100, y: (i * 43) % 100, size: 1 + i % 3, speed: 0.2 + (i % 4) * 0.08, phase: i * 1.7 }))
    let raf = 0
    const resize = () => { const d = Math.min(2, devicePixelRatio); canvas.width = innerWidth * d; canvas.height = innerHeight * d; canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`; ctx.setTransform(d, 0, 0, d, 0, 0) }
    const scroll = () => { target.current = Math.min(1, Math.max(0, scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight))) }
    const render = (time: number) => {
      current.current += (target.current - current.current) * 0.065; const p = current.current; const w = innerWidth; const h = innerHeight; ctx.clearRect(0, 0, w, h)
      const chapter = Math.floor(p * 7); const local = p * 7 - chapter; const sky = ctx.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, chapter % 3 === 2 ? '#F9D7CC' : palette.blue); sky.addColorStop(1, palette.white); ctx.fillStyle = sky; ctx.globalAlpha = 0.18; ctx.fillRect(0, 0, w, h); ctx.globalAlpha = 1
      stars(ctx, p, w, h)
      particles.current.forEach((item) => { const x = ((item.x / 100 * w + time * item.speed + p * 220 * (item.phase % 2 ? 1 : -1)) % (w + 100)) - 50; const y = ((item.y / 100 * h + Math.sin(time * 0.001 + item.phase) * 28 + p * h * 0.7) % (h + 80)) - 40; ctx.fillStyle = item.phase % 3 ? palette.white : palette.pink; ctx.globalAlpha = 0.28; ctx.beginPath(); ctx.arc(x, y, item.size, 0, Math.PI * 2); ctx.fill() }); ctx.globalAlpha = 1
      cloud(ctx, ((w * 0.08 + p * w * 0.8) % (w + 260)) - 130, h * 0.16 + Math.sin(time * 0.0005) * 14, 1.45, 0.65)
      cloud(ctx, ((w * 0.72 - p * w * 0.65) % (w + 300)) - 150, h * 0.63 + Math.sin(time * 0.0007 + 2) * 18, 1.1, 0.55)
      cloud(ctx, ((w * 0.42 + p * w * 0.45) % (w + 220)) - 110, h * 0.88, 0.8, 0.5)
      balloon(ctx, w * 0.16 + Math.sin(p * 11) * 30, h * 0.42 - p * h * 0.12, 0.9, palette.coral, time * 0.001); balloon(ctx, w * 0.82, h * 0.25 + Math.sin(p * 9) * 40, 0.7, palette.pink, time * 0.001 + 2)
      bird(ctx, w * (0.24 + ((p * 0.9) % 0.65)), h * (0.22 + Math.sin(time * 0.0008) * 0.04), 0.85, time * 0.006); bird(ctx, w * (0.68 - ((p * 0.55) % 0.4)), h * 0.48, 0.55, time * 0.006 + 1)
      plane(ctx, w * (0.76 - p * 0.34), h * (0.72 - p * 0.28), 1, -0.12 + Math.sin(time * 0.001) * 0.06)
      sun(ctx, w * (0.84 - p * 0.45), h * (0.16 + p * 0.38), 0.65)
      ctx.save(); ctx.globalAlpha = 0.65; ctx.fillStyle = palette.ink; ctx.font = '700 11px sans-serif'; ctx.letterSpacing = '2px'; ctx.textAlign = 'center'; ctx.fillText(chapters[chapter], w / 2, h - 28); ctx.restore()
      if (local > 0.82 && chapter < 7) { ctx.globalAlpha = (local - 0.82) / 0.18; ctx.fillStyle = palette.ink; ctx.font = '700 11px sans-serif'; ctx.fillText(chapters[chapter + 1], w / 2, h - 28); ctx.globalAlpha = 1 }
      raf = requestAnimationFrame(render)
    }
    resize(); scroll(); addEventListener('resize', resize); addEventListener('scroll', scroll, { passive: true }); raf = requestAnimationFrame(render)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); removeEventListener('scroll', scroll) }
  }, [])
  return <canvas ref={ref} aria-hidden="true" className="side-story-canvas" />
}
