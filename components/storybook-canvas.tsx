'use client'

import { useEffect, useRef, useState } from 'react'

// Curated storybook palette matching Farah's atelier
const C = {
  yellow: '#FFC837',
  yellowLight: '#FFE082',
  yellowBg: '#FFF8E1',
  pink: '#F9A8C9',
  pinkDark: '#F48FB1',
  pinkBg: '#FCE4EC',
  creamBg: '#FFF3E0',
  lavenderBg: '#EDE7F6',
  peachBg: '#FBE9E7',
  greenBg: '#E8F5E9',
  green: '#81C784',
  greenLight: '#A5D6A7',
  purple: '#B39DDB',
  purpleLight: '#CE93D8',
  dark: '#2D1F1D',
  white: '#FFFFFF',
}

const SCENE_NAMES = [
  'Chapter 1 • Good Morning ☀️',
  'Chapter 2 • The Classroom 📚',
  'Chapter 3 • The Art Atelier ✂️',
  'Chapter 4 • Story Time 🎬',
  'Chapter 5 • The Market 🛒',
  'Chapter 6 • For Everyone 🧸',
  'Chapter 7 • Kind Words 💖',
  'Chapter 8 • The Celebration 🌸',
]

export function StorybookCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animFrameRef = useRef<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const canvas = canvasRef.current
    if (!canvas) return

    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = Math.min(2, window.devicePixelRatio || 1)

    const resize = () => {
      if (!canvas) return
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })

    let scrollProgress = 0
    let smoothProgress = 0
    let frameCount = 0

    const updateScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll))
    }

    window.addEventListener('scroll', updateScroll, { passive: true })
    updateScroll()

    // Floating particles (letters, stars, confetti, notes)
    const symbols = ['A', 'B', 'C', 'D', 'E', '★', '♥', '1', '2', '3', '✦', '✿', '♪', '✂']
    const particles = Array.from({ length: 42 }).map((_, i) => ({
      id: i,
      xRel: Math.random(),
      y: Math.random() * height,
      speed: 0.4 + Math.random() * 0.7,
      size: 11 + Math.random() * 12,
      char: symbols[i % symbols.length],
      color: [C.pink, C.yellow, C.green, C.purple, C.pinkDark, '#FF8A65'][i % 6],
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      side: i % 2 === 0 ? 'left' : 'right',
    }))

    // --- PROCEDURAL 2D DRAWING HELPERS ---
    const drawRabbit = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      scale = 1.2,
      withBook = false,
      withHeart = false,
      waving = false,
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(scale, scale)

      // Shadow
      ctx.fillStyle = 'rgba(45, 31, 29, 0.12)'
      ctx.beginPath()
      ctx.ellipse(0, 24, 16, 6, 0, 0, Math.PI * 2)
      ctx.fill()

      // Ears
      ctx.fillStyle = C.white
      ctx.strokeStyle = C.dark
      ctx.lineWidth = 2.2
      // Left ear
      ctx.beginPath()
      ctx.ellipse(-8, -26, 5, 14, -0.15, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = C.pink
      ctx.beginPath()
      ctx.ellipse(-8, -26, 2.5, 9, -0.15, 0, Math.PI * 2)
      ctx.fill()

      // Right ear
      ctx.fillStyle = C.white
      ctx.beginPath()
      ctx.ellipse(8, -26, 5, 14, 0.15, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = C.pink
      ctx.beginPath()
      ctx.ellipse(8, -26, 2.5, 9, 0.15, 0, Math.PI * 2)
      ctx.fill()

      // Head
      ctx.fillStyle = C.white
      ctx.beginPath()
      ctx.ellipse(0, -10, 16, 14, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Cheeks & Eyes
      ctx.fillStyle = C.pink
      ctx.beginPath()
      ctx.arc(-9, -8, 3.5, 0, Math.PI * 2)
      ctx.arc(9, -8, 3.5, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = C.dark
      ctx.beginPath()
      ctx.arc(-6, -12, 2.2, 0, Math.PI * 2)
      ctx.arc(6, -12, 2.2, 0, Math.PI * 2)
      ctx.fill()

      // Nose & Mouth
      ctx.fillStyle = C.pinkDark
      ctx.beginPath()
      ctx.arc(0, -9, 1.8, 0, Math.PI * 2)
      ctx.fill()

      // Body
      ctx.fillStyle = C.white
      ctx.beginPath()
      ctx.ellipse(0, 10, 14, 16, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      if (withBook) {
        ctx.fillStyle = C.yellow
        ctx.strokeStyle = C.dark
        ctx.lineWidth = 1.8
        ctx.fillRect(-10, 3, 20, 13)
        ctx.strokeRect(-10, 3, 20, 13)
        ctx.fillStyle = C.white
        ctx.fillRect(-8, 5, 16, 9)
        ctx.fillStyle = C.dark
        ctx.font = 'bold 7px sans-serif'
        ctx.fillText('ABC', -7, 12)
      } else if (withHeart) {
        ctx.fillStyle = C.pinkDark
        ctx.beginPath()
        ctx.arc(-4, 6, 4.5, 0, Math.PI, true)
        ctx.arc(4, 6, 4.5, 0, Math.PI, true)
        ctx.lineTo(0, 16)
        ctx.closePath()
        ctx.fill()
      } else if (waving) {
        ctx.fillStyle = C.white
        ctx.beginPath()
        ctx.arc(14, -2 + Math.sin(frameCount * 0.14) * 5, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      }

      ctx.restore()
    }

    const drawBear = (ctx: CanvasRenderingContext2D, x: number, y: number, scale = 1.2, waving = false) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(scale, scale)

      // Shadow
      ctx.fillStyle = 'rgba(45, 31, 29, 0.12)'
      ctx.beginPath()
      ctx.ellipse(0, 24, 16, 6, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#C89666'
      ctx.strokeStyle = C.dark
      ctx.lineWidth = 2.2

      // Ears
      ctx.beginPath()
      ctx.arc(-12, -22, 6, 0, Math.PI * 2)
      ctx.arc(12, -22, 6, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Head
      ctx.beginPath()
      ctx.arc(0, -10, 16, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Muzzle
      ctx.fillStyle = '#E8C5A5'
      ctx.beginPath()
      ctx.ellipse(0, -6, 7, 6, 0, 0, Math.PI * 2)
      ctx.fill()

      // Eyes & Nose
      ctx.fillStyle = C.dark
      ctx.beginPath()
      ctx.arc(-6, -12, 2, 0, Math.PI * 2)
      ctx.arc(6, -12, 2, 0, Math.PI * 2)
      ctx.arc(0, -8, 2.5, 0, Math.PI * 2)
      ctx.fill()

      // Body
      ctx.fillStyle = '#C89666'
      ctx.beginPath()
      ctx.ellipse(0, 10, 16, 17, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      if (waving) {
        ctx.fillStyle = '#C89666'
        ctx.beginPath()
        ctx.arc(15, -2 + Math.sin(frameCount * 0.14) * 5, 4.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      } else {
        // Paintbrush
        ctx.fillStyle = '#FFE082'
        ctx.fillRect(9, -6, 3.5, 18)
        ctx.fillStyle = C.pink
        ctx.beginPath()
        ctx.arc(10.5, -9, 3.5, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    const drawFox = (ctx: CanvasRenderingContext2D, x: number, y: number, scale = 1.2, waving = false) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(scale, scale)

      // Shadow
      ctx.fillStyle = 'rgba(45, 31, 29, 0.12)'
      ctx.beginPath()
      ctx.ellipse(0, 24, 16, 6, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#FF8A65'
      ctx.strokeStyle = C.dark
      ctx.lineWidth = 2.2

      // Pointy Ears
      ctx.beginPath()
      ctx.moveTo(-13, -14)
      ctx.lineTo(-16, -30)
      ctx.lineTo(-4, -19)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(13, -14)
      ctx.lineTo(16, -30)
      ctx.lineTo(4, -19)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Head
      ctx.beginPath()
      ctx.ellipse(0, -9, 16, 13, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // White Cheeks
      ctx.fillStyle = C.white
      ctx.beginPath()
      ctx.ellipse(-8, -5, 7, 6, 0.3, 0, Math.PI * 2)
      ctx.ellipse(8, -5, 7, 6, -0.3, 0, Math.PI * 2)
      ctx.fill()

      // Eyes & Nose
      ctx.fillStyle = C.dark
      ctx.beginPath()
      ctx.arc(-6, -11, 2, 0, Math.PI * 2)
      ctx.arc(6, -11, 2, 0, Math.PI * 2)
      ctx.arc(0, -5, 2.2, 0, Math.PI * 2)
      ctx.fill()

      // Body
      ctx.fillStyle = '#FF8A65'
      ctx.beginPath()
      ctx.ellipse(0, 10, 13, 15, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      if (waving) {
        ctx.fillStyle = '#FF8A65'
        ctx.beginPath()
        ctx.arc(14, -2 + Math.sin(frameCount * 0.14) * 5, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      } else {
        // Megaphone
        ctx.fillStyle = C.yellow
        ctx.beginPath()
        ctx.moveTo(7, 4)
        ctx.lineTo(20, -1)
        ctx.lineTo(20, 13)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }

      ctx.restore()
    }

    const drawCat = (ctx: CanvasRenderingContext2D, x: number, y: number, scale = 1.2, waving = false) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(scale, scale)

      // Shadow
      ctx.fillStyle = 'rgba(45, 31, 29, 0.12)'
      ctx.beginPath()
      ctx.ellipse(0, 24, 16, 6, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#FFE082'
      ctx.strokeStyle = C.dark
      ctx.lineWidth = 2.2

      // Triangle Ears
      ctx.beginPath()
      ctx.moveTo(-12, -14)
      ctx.lineTo(-14, -27)
      ctx.lineTo(-3, -17)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(12, -14)
      ctx.lineTo(14, -27)
      ctx.lineTo(3, -17)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Head
      ctx.beginPath()
      ctx.arc(0, -9, 15, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Cheeks & Eyes
      ctx.fillStyle = C.pink
      ctx.beginPath()
      ctx.arc(-8, -6, 3, 0, Math.PI * 2)
      ctx.arc(8, -6, 3, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = C.dark
      ctx.beginPath()
      ctx.arc(-6, -11, 2, 0, Math.PI * 2)
      ctx.arc(6, -11, 2, 0, Math.PI * 2)
      ctx.arc(0, -7, 1.8, 0, Math.PI * 2)
      ctx.fill()

      // Body
      ctx.fillStyle = '#FFE082'
      ctx.beginPath()
      ctx.ellipse(0, 10, 13, 15, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      if (waving) {
        ctx.fillStyle = '#FFE082'
        ctx.beginPath()
        ctx.arc(13, -2 + Math.sin(frameCount * 0.14) * 5, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      } else {
        // Shopping bag
        ctx.fillStyle = C.pinkDark
        ctx.fillRect(8, 2, 11, 14)
        ctx.strokeRect(8, 2, 11, 14)
      }

      ctx.restore()
    }

    const drawCloud = (ctx: CanvasRenderingContext2D, x: number, y: number, size = 32) => {
      ctx.save()
      ctx.fillStyle = 'rgba(255, 255, 255, 0.94)'
      ctx.strokeStyle = C.dark
      ctx.lineWidth = 1.8
      ctx.beginPath()
      ctx.arc(x, y, size * 0.45, 0, Math.PI * 2)
      ctx.arc(x + size * 0.4, y - size * 0.15, size * 0.35, 0, Math.PI * 2)
      ctx.arc(x + size * 0.8, y, size * 0.4, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.restore()
    }

    const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color = C.yellow) => {
      ctx.save()
      ctx.fillStyle = color
      ctx.strokeStyle = C.dark
      ctx.lineWidth = 1.4
      ctx.beginPath()
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos(((18 + i * 72) * Math.PI) / 180) * r + cx, -Math.sin(((18 + i * 72) * Math.PI) / 180) * r + cy)
        ctx.lineTo(Math.cos(((54 + i * 72) * Math.PI) / 180) * (r / 2) + cx, -Math.sin(((54 + i * 72) * Math.PI) / 180) * (r / 2) + cy)
      }
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
      ctx.restore()
    }

    const drawBalloon = (ctx: CanvasRenderingContext2D, x: number, y: number, color = C.pink) => {
      ctx.save()
      ctx.fillStyle = color
      ctx.strokeStyle = C.dark
      ctx.lineWidth = 1.8
      ctx.beginPath()
      ctx.ellipse(x, y, 11, 14, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y + 14)
      ctx.lineTo(x - 2, y + 30 + Math.sin(frameCount * 0.06) * 4)
      ctx.stroke()
      ctx.restore()
    }

    // --- MAIN RENDER LOOP ---
    const render = () => {
      frameCount++
      smoothProgress += (scrollProgress - smoothProgress) * 0.075

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        animFrameRef.current = requestAnimationFrame(render)
        return
      }

      // Reset transform for high-DPI scaling
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      const p = smoothProgress
      const sceneIndex = Math.min(7, Math.floor(p / 0.125))
      const sceneProgress = (p % 0.125) / 0.125

      // 8 Storybook Scene Background Colors
      const sceneBgs = [
        C.yellowBg,    // 1. Hero (Morning Yellow)
        C.creamBg,     // 2. About (Classroom Cream)
        C.pinkBg,      // 3. Work (Art Atelier Pink)
        C.lavenderBg,  // 4. Videos (Storytime Lavender)
        C.peachBg,     // 5. Shop (Market Peach)
        C.greenBg,     // 6. Who I Serve (Meadow Green)
        C.pinkBg,      // 7. Testimonials/FAQ (Kind Words Rose)
        C.yellowBg,    // 8. Contact/Footer (Celebration Yellow)
      ]

      const currentBg = sceneBgs[sceneIndex]
      const nextBg = sceneBgs[Math.min(7, sceneIndex + 1)]

      // 1. Fill base full-screen canvas background
      ctx.fillStyle = currentBg
      ctx.fillRect(0, 0, width, height)

      // 2. Smooth crossfade transition between scenes
      if (sceneProgress > 0.82) {
        const crossAlpha = (sceneProgress - 0.82) / 0.18
        ctx.save()
        ctx.globalAlpha = crossAlpha
        ctx.fillStyle = nextBg
        ctx.fillRect(0, 0, width, height)
        ctx.restore()
      }

      // 3. Side Strips & Characters (Rendered on both left and right margins)
      const leftX = Math.max(35, Math.min(75, width * 0.05))
      const rightX = width - Math.max(35, Math.min(75, width * 0.05))

      // --- SCENE 1: Good Morning ☀️ ---
      if (sceneIndex === 0 || (sceneIndex === 1 && sceneProgress < 0.2)) {
        const sunY = height * 0.65 - sceneProgress * (height * 0.45)
        // Big Glowing Sun with rays on Left side
        ctx.save()
        ctx.fillStyle = C.yellow
        ctx.strokeStyle = C.dark
        ctx.lineWidth = 2.5
        ctx.beginPath()
        ctx.arc(leftX, sunY, 36, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        // Sun Face
        ctx.fillStyle = C.dark
        ctx.beginPath()
        ctx.arc(leftX - 8, sunY - 4, 2.8, 0, Math.PI * 2)
        ctx.arc(leftX + 8, sunY - 4, 2.8, 0, Math.PI * 2)
        ctx.arc(leftX, sunY + 7, 2.2, 0, Math.PI * 2)
        ctx.fill()
        // Cheeks
        ctx.fillStyle = C.pink
        ctx.beginPath()
        ctx.arc(leftX - 14, sunY + 2, 4, 0, Math.PI * 2)
        ctx.arc(leftX + 14, sunY + 2, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Drifting Clouds & Birds
        drawCloud(ctx, leftX - 10, height * 0.2 + Math.sin(frameCount * 0.02) * 8, 42)
        drawCloud(ctx, rightX - 25, height * 0.32 + Math.cos(frameCount * 0.02) * 8, 46)

        // V-Birds
        ctx.save()
        ctx.strokeStyle = C.dark
        ctx.lineWidth = 2.2
        ctx.beginPath()
        ctx.moveTo(rightX - 20, height * 0.16)
        ctx.lineTo(rightX - 12, height * 0.12)
        ctx.lineTo(rightX - 4, height * 0.16)
        ctx.stroke()
        ctx.restore()

        // Rabbit at bottom looking up with wonder
        drawRabbit(ctx, leftX, height - 60, 1.3)
        drawRabbit(ctx, rightX, height - 60, 1.3)
      }

      // --- SCENE 2: The Classroom 📚 ---
      if (sceneIndex === 1 || (sceneIndex === 2 && sceneProgress < 0.2)) {
        // Small Chalkboard on Left
        ctx.save()
        ctx.fillStyle = '#2D3748'
        ctx.strokeStyle = '#D97706'
        ctx.lineWidth = 3.5
        ctx.fillRect(leftX - 25, height * 0.28, 65, 48)
        ctx.strokeRect(leftX - 25, height * 0.28, 65, 48)
        ctx.fillStyle = C.white
        ctx.font = 'bold 11px sans-serif'
        ctx.fillText('Hello! ✏️', leftX - 18, height * 0.28 + 28)
        ctx.restore()

        // Rabbit reading open storybook
        drawRabbit(ctx, leftX, height - 60, 1.3, true)
        drawRabbit(ctx, rightX, height - 60, 1.3, true)

        drawStar(ctx, leftX, height * 0.18, 8)
        drawStar(ctx, rightX, height * 0.24, 9)
      }

      // --- SCENE 3: The Art Atelier ✂️ ---
      if (sceneIndex === 2 || (sceneIndex === 3 && sceneProgress < 0.2)) {
        // Bear holding paintbrush
        drawBear(ctx, leftX, height - 60, 1.3)
        drawBear(ctx, rightX, height - 60, 1.3)

        // Craft paper squares
        ctx.save()
        ctx.fillStyle = C.pink
        ctx.fillRect(leftX - 10, height * 0.26 + Math.sin(frameCount * 0.03) * 10, 16, 16)
        ctx.fillStyle = C.green
        ctx.fillRect(rightX - 10, height * 0.32 + Math.cos(frameCount * 0.03) * 10, 14, 14)
        ctx.restore()
      }

      // --- SCENE 4: Story Time 🎬 ---
      if (sceneIndex === 3 || (sceneIndex === 4 && sceneProgress < 0.2)) {
        // Fox with megaphone
        drawFox(ctx, leftX, height - 60, 1.3)
        drawFox(ctx, rightX, height - 60, 1.3)

        // Floating musical notes
        ctx.save()
        ctx.fillStyle = C.purple
        ctx.font = 'bold 22px sans-serif'
        ctx.fillText('♪', leftX - 8, height * 0.28 + Math.sin(frameCount * 0.04) * 12)
        ctx.fillText('♫', rightX - 12, height * 0.24 + Math.cos(frameCount * 0.04) * 12)
        ctx.restore()
      }

      // --- SCENE 5: The Market 🛒 ---
      if (sceneIndex === 4 || (sceneIndex === 5 && sceneProgress < 0.2)) {
        // Cat with shopping bag
        drawCat(ctx, leftX, height - 60, 1.3)
        drawCat(ctx, rightX, height - 60, 1.3)

        // Price Tag
        ctx.save()
        ctx.fillStyle = C.yellow
        ctx.strokeStyle = C.dark
        ctx.lineWidth = 1.8
        ctx.fillRect(leftX - 14, height * 0.26, 28, 18)
        ctx.strokeRect(leftX - 14, height * 0.26, 28, 18)
        ctx.fillStyle = C.dark
        ctx.font = 'bold 9px sans-serif'
        ctx.fillText('SALE', leftX - 11, height * 0.26 + 13)
        ctx.restore()
      }

      // --- SCENE 6: For Everyone 🧸 (All 4 Animals Together!) ---
      if (sceneIndex === 5 || (sceneIndex === 6 && sceneProgress < 0.2)) {
        drawRabbit(ctx, leftX - 15, height - 55, 0.8)
        drawBear(ctx, leftX + 15, height - 55, 0.8)

        drawFox(ctx, rightX - 15, height - 55, 0.8)
        drawCat(ctx, rightX + 15, height - 55, 0.8)

        drawStar(ctx, leftX, height * 0.28, 7, C.yellow)
        drawStar(ctx, rightX, height * 0.32, 7, C.pink)
      }

      // --- SCENE 7: Kind Words 💖 ---
      if (sceneIndex === 6 || (sceneIndex === 7 && sceneProgress < 0.2)) {
        // Rabbit with glowing heart
        drawRabbit(ctx, leftX, height - 60, 1.3, false, true)
        drawRabbit(ctx, rightX, height - 60, 1.3, false, true)

        // Floating Speech Bubble
        ctx.save()
        ctx.fillStyle = C.white
        ctx.strokeStyle = C.dark
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.ellipse(leftX, height * 0.32, 22, 16, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = C.pinkDark
        ctx.font = 'bold 14px sans-serif'
        ctx.fillText('♥', leftX - 5, height * 0.32 + 5)
        ctx.restore()
      }

      // --- SCENE 8: The Celebration 🌸 ---
      if (sceneIndex === 7) {
        // Floating Balloons
        drawBalloon(ctx, leftX - 10, height * 0.24 + Math.sin(frameCount * 0.03) * 15, C.pink)
        drawBalloon(ctx, leftX + 15, height * 0.18 + Math.cos(frameCount * 0.03) * 15, C.yellow)
        drawBalloon(ctx, rightX - 15, height * 0.26 + Math.sin(frameCount * 0.03) * 15, C.purple)
        drawBalloon(ctx, rightX + 10, height * 0.2 + Math.cos(frameCount * 0.03) * 15, C.green)

        // All 4 animals waving goodbye happily!
        drawRabbit(ctx, leftX - 15, height - 55, 0.8, false, false, true)
        drawBear(ctx, leftX + 15, height - 55, 0.8, true)
        drawFox(ctx, rightX - 15, height - 55, 0.8, true)
        drawCat(ctx, rightX + 15, height - 55, 0.8, true)
      }

      // 4. Floating Upward Particles in the Side Margins
      particles.forEach((pt) => {
        pt.y -= pt.speed
        if (pt.y < -25) pt.y = height + 25
        pt.rot += pt.rotSpeed

        const px = pt.side === 'left' ? leftX + (pt.xRel - 0.5) * 45 : rightX + (pt.xRel - 0.5) * 45

        ctx.save()
        ctx.translate(px, pt.y)
        ctx.rotate(pt.rot)
        ctx.fillStyle = pt.color
        ctx.font = `bold ${pt.size}px sans-serif`
        ctx.fillText(pt.char, 0, 0)
        ctx.restore()
      })

      animFrameRef.current = requestAnimationFrame(render)
    }

    animFrameRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', resize)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  if (!mounted) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 size-full select-none"
      aria-hidden="true"
    />
  )
}
