'use client'

import { useEffect, useRef } from 'react'

const chapters = [
  ['WELCOME', 'home'],
  ['STORY', 'about'],
  ['MAKE', 'work'],
  ['PLAY', 'videos'],
  ['SHARE', 'shop'],
  ['GATHER', 'serve'],
  ['CHEER', 'testimonials'],
  ['HELLO', 'contact'],
] as const

const colors = {
  ink: '#2D1F1D',
  yellow: '#FFC837',
  coral: '#FF7D6B',
  pink: '#F9A8C9',
  mint: '#A7F3D0',
  paper: '#FAF5EC',
  white: '#FFFFFF',
}

type Particle = { x: number; y: number; r: number; phase: number }

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
  ctx.fillStyle = colors.white
  ctx.strokeStyle = colors.ink
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(x, y + 5 * scale, 9 * scale, Math.PI, 0)
  ctx.arc(x + 10 * scale, y, 12 * scale, Math.PI, 0)
  ctx.arc(x + 24 * scale, y + 6 * scale, 8 * scale, Math.PI, 0)
  ctx.lineTo(x + 32 * scale, y + 13 * scale)
  ctx.lineTo(x, y + 13 * scale)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
}

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.fillStyle = colors.pink
  ctx.strokeStyle = colors.ink
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(x, y + size * 0.8)
  ctx.bezierCurveTo(x - size * 1.1, y + size * 0.1, x - size * 0.55, y - size * 0.45, x, y)
  ctx.bezierCurveTo(x + size * 0.55, y - size * 0.45, x + size * 1.1, y + size * 0.1, x, y + size * 0.8)
  ctx.fill()
  ctx.stroke()
}

function drawCharacter(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, color: string) {
  ctx.fillStyle = color
  ctx.strokeStyle = colors.ink
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(x, y, 10 * scale, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()
  ctx.fillStyle = colors.ink
  ctx.beginPath()
  ctx.arc(x - 3 * scale, y - 1 * scale, 1.3 * scale, 0, Math.PI * 2)
  ctx.arc(x + 3 * scale, y - 1 * scale, 1.3 * scale, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(x, y + 2 * scale, 3 * scale, 0, Math.PI)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x, y + 10 * scale)
  ctx.lineTo(x, y + 26 * scale)
  ctx.moveTo(x, y + 15 * scale)
  ctx.lineTo(x - 9 * scale, y + 21 * scale)
  ctx.moveTo(x, y + 15 * scale)
  ctx.lineTo(x + 9 * scale, y + 21 * scale)
  ctx.stroke()
}

function drawChapter(ctx: CanvasRenderingContext2D, chapter: number, x: number, height: number, time: number) {
  const y = height * 0.48 + Math.sin(time * 0.001 + chapter) * 12
  ctx.save()
  ctx.globalAlpha = 0.9
  if (chapter === 0) {
    ctx.fillStyle = colors.yellow
    ctx.beginPath(); ctx.arc(x + 28, y - 54, 17, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = colors.ink; ctx.stroke()
    drawCloud(ctx, x - 10, y - 15, 0.8)
    drawCharacter(ctx, x + 20, y + 22, 0.9, colors.coral)
  } else if (chapter === 1) {
    ctx.fillStyle = colors.white; ctx.strokeStyle = colors.ink; ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(x - 24, y - 12); ctx.lineTo(x, y - 20); ctx.lineTo(x + 24, y - 12); ctx.lineTo(x, y - 4); ctx.closePath(); ctx.fill(); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(x - 20, y - 9); ctx.lineTo(x - 20, y + 16); ctx.lineTo(x, y + 24); ctx.lineTo(x, y - 4); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.moveTo(x, y - 4); ctx.lineTo(x, y + 24); ctx.lineTo(x + 20, y + 16); ctx.lineTo(x + 20, y - 9); ctx.stroke()
    drawHeart(ctx, x + 26, y - 37, 7)
  } else if (chapter === 2) {
    ctx.fillStyle = colors.mint; ctx.strokeStyle = colors.ink; ctx.lineWidth = 2
    roundedRect(ctx, x - 25, y - 17, 50, 34, 6); ctx.fill(); ctx.stroke()
    ctx.strokeStyle = colors.coral; ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y - 9); ctx.lineTo(x, y + 9); ctx.stroke()
    drawCharacter(ctx, x + 3, y + 38, 0.65, colors.yellow)
  } else if (chapter === 3) {
    ctx.fillStyle = colors.ink; ctx.strokeStyle = colors.ink; ctx.lineWidth = 2
    roundedRect(ctx, x - 25, y - 18, 50, 34, 5); ctx.fill();
    ctx.fillStyle = colors.yellow; ctx.beginPath(); ctx.moveTo(x - 6, y - 10); ctx.lineTo(x + 12, y); ctx.lineTo(x - 6, y + 10); ctx.closePath(); ctx.fill()
    ctx.strokeStyle = colors.coral; ctx.beginPath(); ctx.moveTo(x - 35, y + 25); ctx.quadraticCurveTo(x - 18, y + 12, x - 4, y + 25); ctx.stroke()
  } else if (chapter === 4) {
    ctx.fillStyle = colors.coral; ctx.strokeStyle = colors.ink; ctx.lineWidth = 2
    roundedRect(ctx, x - 20, y - 22, 40, 38, 5); ctx.fill(); ctx.stroke()
    ctx.fillStyle = colors.yellow; ctx.fillRect(x - 8, y - 15, 16, 12); ctx.strokeRect(x - 8, y - 15, 16, 12)
    ctx.strokeStyle = colors.ink; ctx.beginPath(); ctx.arc(x, y - 24, 8, Math.PI, 0); ctx.stroke()
  } else if (chapter === 5) {
    drawCharacter(ctx, x - 10, y + 5, 0.7, colors.mint); drawCharacter(ctx, x + 18, y + 5, 0.7, colors.pink); drawHeart(ctx, x + 5, y - 32, 8)
  } else if (chapter === 6) {
    ctx.fillStyle = colors.yellow; ctx.strokeStyle = colors.ink; ctx.lineWidth = 2
    roundedRect(ctx, x - 27, y - 16, 54, 31, 8); ctx.fill(); ctx.stroke()
    ctx.fillStyle = colors.ink; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('YAY!', x, y + 4)
    drawHeart(ctx, x - 32, y - 30, 6)
  } else {
    ctx.fillStyle = colors.white; ctx.strokeStyle = colors.ink; ctx.lineWidth = 2
    roundedRect(ctx, x - 28, y - 18, 56, 35, 8); ctx.fill(); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(x - 10, y + 17); ctx.lineTo(x - 17, y + 28); ctx.lineTo(x + 1, y + 18); ctx.stroke()
    ctx.fillStyle = colors.coral; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('HELLO', x, y + 3)
  }
  ctx.restore()
}

export function SideStoryCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const target = useRef(0)
  const progress = useRef(0)
  const particles = useRef<Particle[]>([])

  useEffect(() => {
    if (window.innerWidth < 900) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    particles.current = Array.from({ length: 34 }, (_, index) => ({ x: (index * 37) % 100, y: (index * 61) % 100, r: 1 + (index % 3), phase: index * 0.7 }))
    let frame = 0
    const resize = () => { canvas.width = window.innerWidth * devicePixelRatio; canvas.height = window.innerHeight * devicePixelRatio; canvas.style.width = `${window.innerWidth}px`; canvas.style.height = `${window.innerHeight}px`; ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0) }
    const onScroll = () => { target.current = Math.min(1, Math.max(0, window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight))) }
    const render = (time: number) => {
      progress.current += (target.current - progress.current) * 0.075
      const width = window.innerWidth; const height = window.innerHeight; const strip = Math.min(112, Math.max(68, width * 0.1))
      ctx.clearRect(0, 0, width, height)
      const chapterFloat = progress.current * (chapters.length - 1); const active = Math.floor(chapterFloat); const blend = chapterFloat - active
      ctx.fillStyle = 'rgba(255,255,255,0.22)'; ctx.fillRect(0, 0, strip, height); ctx.fillRect(width - strip, 0, strip, height)
      ctx.strokeStyle = 'rgba(45,31,29,0.12)'; ctx.setLineDash([3, 7]); ctx.beginPath(); ctx.moveTo(strip * 0.5, 0); ctx.lineTo(strip * 0.5, height); ctx.moveTo(width - strip * 0.5, 0); ctx.lineTo(width - strip * 0.5, height); ctx.stroke(); ctx.setLineDash([])
      particles.current.forEach((particle) => { const py = ((particle.y * height + time * 0.012 + particle.phase * 20) % height); ctx.fillStyle = `rgba(255,125,107,${0.12 + Math.sin(time * 0.002 + particle.phase) * 0.06})`; ctx.beginPath(); ctx.arc(strip * 0.5 + Math.sin(time * 0.001 + particle.phase) * strip * 0.28, py, particle.r, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(width - strip * 0.5 + Math.sin(time * 0.0012 + particle.phase) * strip * 0.28, py, particle.r, 0, Math.PI * 2); ctx.fill() })
      ctx.strokeStyle = colors.yellow; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(strip * 0.5, height * 0.12); ctx.lineTo(strip * 0.5, height * 0.86); ctx.moveTo(width - strip * 0.5, height * 0.12); ctx.lineTo(width - strip * 0.5, height * 0.86); ctx.stroke()
      const markerY = height * (0.12 + progress.current * 0.74); ctx.fillStyle = colors.yellow; ctx.strokeStyle = colors.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(strip * 0.5, markerY, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.arc(width - strip * 0.5, markerY, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      drawChapter(ctx, active, strip * 0.5, height, time); drawChapter(ctx, active, width - strip * 0.5, height, time)
      if (blend > 0.82 && active < chapters.length - 1) { ctx.globalAlpha = (blend - 0.82) / 0.18; drawChapter(ctx, active + 1, strip * 0.5, height, time); drawChapter(ctx, active + 1, width - strip * 0.5, height, time); ctx.globalAlpha = 1 }
      ctx.fillStyle = colors.ink; ctx.font = '700 9px sans-serif'; ctx.textAlign = 'center'; ctx.save(); ctx.translate(strip * 0.5, height - 22); ctx.rotate(-Math.PI / 2); ctx.fillText(chapters[active][0], 0, 0); ctx.restore(); ctx.save(); ctx.translate(width - strip * 0.5, 22); ctx.rotate(Math.PI / 2); ctx.fillText(chapters[active][0], 0, 0); ctx.restore()
      frame = requestAnimationFrame(render)
    }
    resize(); onScroll(); window.addEventListener('resize', resize); window.addEventListener('scroll', onScroll, { passive: true }); frame = requestAnimationFrame(render)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('scroll', onScroll) }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="side-story-canvas" />
}
