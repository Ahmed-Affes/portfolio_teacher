'use client'

import { useEffect, useRef } from 'react'

const palette = {
  ink: '#2D1F1D',
  yellow: '#FFC837',
  coral: '#FF7D6B',
  pink: '#FFB5B5',
  mint: '#A7F3D0',
  blue: '#BFE8F2',
  white: '#FFFFFF',
  paper: '#FAF5EC',
}

type Particle = { x: number; y: number; size: number; speed: number; phase: number; color: string }

function cloud(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, alpha: number) {
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.fillStyle = palette.white
  ctx.strokeStyle = palette.ink
  ctx.lineWidth = 2.2
  ctx.beginPath()
  ctx.arc(x, y + 12 * scale, 22 * scale, Math.PI, 0)
  ctx.arc(x + 28 * scale, y, 30 * scale, Math.PI, 0)
  ctx.arc(x + 64 * scale, y + 12 * scale, 21 * scale, Math.PI, 0)
  ctx.lineTo(x + 85 * scale, y + 30 * scale)
  ctx.lineTo(x, y + 30 * scale)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  ctx.restore()
}

function balloon(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, color: string, sway: number) {
  ctx.save()
  ctx.translate(x + Math.sin(sway) * 18 * scale, y)
  ctx.fillStyle = color
  ctx.strokeStyle = palette.ink
  ctx.lineWidth = 2.2
  ctx.beginPath()
  ctx.ellipse(0, 0, 22 * scale, 29 * scale, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()
  ctx.fillStyle = palette.white
  ctx.globalAlpha = 0.5
  ctx.beginPath()
  ctx.ellipse(-7 * scale, -9 * scale, 5 * scale, 10 * scale, -0.35, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalAlpha = 1
  ctx.strokeStyle = palette.ink
  ctx.beginPath()
  ctx.moveTo(-4 * scale, 28 * scale)
  ctx.lineTo(0, 35 * scale)
  ctx.lineTo(4 * scale, 28 * scale)
  ctx.moveTo(0, 35 * scale)
  ctx.quadraticCurveTo(Math.sin(sway) * 12 * scale, 60 * scale, 3 * scale, 84 * scale)
  ctx.stroke()
  ctx.restore()
}

function bird(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, flap: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.strokeStyle = palette.ink
  ctx.lineWidth = 2.8 * scale
  ctx.lineCap = 'round'
  const wing = Math.sin(flap) * 7 * scale
  ctx.beginPath()
  ctx.moveTo(-19 * scale, wing)
  ctx.quadraticCurveTo(-9 * scale, -12 * scale - wing, 0, 0)
  ctx.quadraticCurveTo(9 * scale, -12 * scale - wing, 19 * scale, wing)
  ctx.stroke()
  ctx.restore()
}

function star(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, color: string, alpha: number) {
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.fillStyle = color
  ctx.strokeStyle = palette.ink
  ctx.lineWidth = 1.4
  ctx.beginPath()
  for (let i = 0; i < 10; i++) {
    const angle = -Math.PI / 2 + (i * Math.PI) / 5
    const radius = (i % 2 ? 0.42 : 1) * 8 * scale
    const px = x + Math.cos(angle) * radius
    const py = y + Math.sin(angle) * radius
    if (i === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  ctx.restore()
}

function sun(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, rotation: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.strokeStyle = palette.ink
  ctx.lineWidth = 2.2
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4
    ctx.beginPath()
    ctx.moveTo(Math.cos(angle) * 44 * scale, Math.sin(angle) * 44 * scale)
    ctx.lineTo(Math.cos(angle) * 59 * scale, Math.sin(angle) * 59 * scale)
    ctx.stroke()
  }
  ctx.fillStyle = palette.yellow
  ctx.beginPath()
  ctx.arc(0, 0, 34 * scale, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()
  ctx.fillStyle = palette.ink
  ctx.beginPath()
  ctx.arc(-10 * scale, -3 * scale, 2.5 * scale, 0, Math.PI * 2)
  ctx.arc(10 * scale, -3 * scale, 2.5 * scale, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(0, 5 * scale, 10 * scale, 0.2, Math.PI - 0.2)
  ctx.stroke()
  ctx.restore()
}

function plane(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, angle: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)
  ctx.fillStyle = palette.white
  ctx.strokeStyle = palette.ink
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(-31 * scale, -8 * scale)
  ctx.lineTo(32 * scale, 0)
  ctx.lineTo(-23 * scale, 12 * scale)
  ctx.lineTo(-7 * scale, 2 * scale)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  ctx.fillStyle = palette.yellow
  ctx.beginPath()
  ctx.moveTo(-7 * scale, 2 * scale)
  ctx.lineTo(32 * scale, 0)
  ctx.lineTo(-18 * scale, -15 * scale)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  ctx.restore()
}

export function SideStoryCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const targetProgress = useRef(0)
  const smoothProgress = useRef(0)
  const particles = useRef<Particle[]>([])

  useEffect(() => {
    if (window.innerWidth < 900) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    particles.current = Array.from({ length: 12 }, (_, index) => ({
      x: (index * 37 + 11) % 100,
      y: (index * 61 + 7) % 100,
      size: 1.5 + (index % 3),
      speed: 0.012 + (index % 4) * 0.004,
      phase: index * 1.9,
      color: index % 3 === 0 ? palette.coral : index % 3 === 1 ? palette.yellow : palette.mint,
    }))

    let frame = 0
    let time = 0
    const resize = () => {
      const scale = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = window.innerWidth * scale
      canvas.height = window.innerHeight * scale
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(scale, 0, 0, scale, 0, 0)
    }
    const updateScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      targetProgress.current = Math.max(0, Math.min(1, window.scrollY / max))
    }
    const render = (timestamp: number) => {
      time = timestamp * 0.001
      smoothProgress.current += (targetProgress.current - smoothProgress.current) * 0.075
      const progress = smoothProgress.current
      const width = window.innerWidth
      const height = window.innerHeight
      const chapter = Math.min(7, Math.floor(progress * 8))
      const fade = progress * 8 - chapter
      ctx.clearRect(0, 0, width, height)

      const sky = ctx.createLinearGradient(0, 0, 0, height)
      sky.addColorStop(0, chapter >= 5 ? '#F9D7CC' : palette.blue)
      sky.addColorStop(1, palette.paper)
      ctx.globalAlpha = 0.2
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, width, height)
      ctx.globalAlpha = 1

      // Keep most decoration in the gutters, with a few large pieces crossing behind sections.
      const drift = time * 0.22
      // One quiet cloud lane and a few hero objects keep the page alive without competing with content.
      cloud(ctx, ((width * 0.03 + drift * 35 + progress * width * 0.35) % (width + 220)) - 120, height * 0.14 + Math.sin(time * 0.35) * 12, 1.35, 0.58)
      cloud(ctx, ((width * 0.69 - drift * 24 - progress * width * 0.3) % (width + 260)) - 130, height * 0.69 + Math.sin(time * 0.28 + 2) * 14, 1.05, 0.48)

      balloon(ctx, width * 0.11 + Math.sin(progress * 8) * 34, height * 0.34 + Math.sin(time * 0.3) * 16 - progress * height * 0.12, 0.92, palette.coral, time * 1.2)
      bird(ctx, width * (0.22 + ((progress * 0.75 + time * 0.018) % 0.62)), height * 0.22 + Math.sin(time * 0.8) * 18, 0.82, time * 5)

      sun(ctx, width * (0.87 - progress * 0.46), height * (0.13 + progress * 0.42), 0.62, time * 0.08)
      plane(ctx, width * (0.73 - progress * 0.42 + Math.sin(time * 0.5) * 0.03), height * (0.76 - progress * 0.34 + Math.cos(time * 0.4) * 0.03), 0.9, -0.12 + Math.sin(time * 0.7) * 0.08)

      particles.current.forEach((particle) => {
        const x = ((particle.x / 100) * width + time * particle.speed * width * 0.18 + progress * width * (particle.phase % 2 ? 0.2 : -0.14)) % (width + 80) - 40
        const y = ((particle.y / 100) * height + Math.sin(time * 0.8 + particle.phase) * 25 + progress * height * 0.45) % (height + 60) - 30
        star(ctx, x, y, particle.size * 0.45, particle.color, 0.3 + (particle.phase % 3) * 0.08)
      })

      ctx.save()
      ctx.globalAlpha = 0.68
      ctx.fillStyle = palette.ink
      ctx.font = '700 11px sans-serif'
      ctx.textAlign = 'center'
      ctx.letterSpacing = '2px'
      ctx.fillText(['WELCOME', 'STORY', 'MAKE', 'PLAY', 'SHARE', 'GATHER', 'CHEER', 'HELLO'][chapter], width / 2, height - 28)
      if (fade > 0.82 && chapter < 7) {
        ctx.globalAlpha = (fade - 0.82) / 0.18
        ctx.fillText(['WELCOME', 'STORY', 'MAKE', 'PLAY', 'SHARE', 'GATHER', 'CHEER', 'HELLO'][chapter + 1], width / 2, height - 28)
      }
      ctx.restore()

      frame = requestAnimationFrame(render)
    }

    resize()
    updateScroll()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', updateScroll, { passive: true })
    frame = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', updateScroll)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="side-story-canvas" />
}
