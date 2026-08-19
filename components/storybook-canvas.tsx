'use client'

import { useEffect, useRef, useState } from 'react'

// Farah's curated storybook palette
const C = {
  yellow: '#FFC837',
  yellowLight: '#FFE082',
  yellowBg: '#FFF9E6',
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

    const resize = () => {
      if (!canvas) return
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = width * dpr
      canvas.height = height * dpr
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.scale(dpr, dpr)
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

    // Floating story particles (letters, stars, confetti, notes)
    const symbols = ['A', 'B', 'C', 'D', 'E', '★', '♥', '1', '2', '3', '✦', '✿', '♪', '✂']
    const particles = Array.from({ length: 48 }).map((_, i) => ({
      id: i,
      xRel: Math.random(),
      y: Math.random() * height,
      speed: 0.4 + Math.random() * 0.8,
      size: 9 + Math.random() * 14,
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
      scale = 1,
      withBook = false,
      withHeart = false,
      waving = false,
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(scale, scale)

      // Ears
      ctx.fillStyle = C.white
      ctx.strokeStyle = C.dark
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.ellipse(-7, -24, 4.5, 12, -0.15, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = C.pink
      ctx.beginPath()
      ctx.ellipse(-7, -24, 2.2, 8, -0.15, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = C.white
      ctx.beginPath()
      ctx.ellipse(7, -24, 4.5, 12, 0.15, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = C.pink
      ctx.beginPath()
      ctx.ellipse(7, -24, 2.2, 8, 0.15, 0, Math.PI * 2)
      ctx.fill()

      // Head
      ctx.fillStyle = C.white
      ctx.beginPath()
      ctx.ellipse(0, -10, 14, 12, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Cheeks & Eyes
      ctx.fillStyle = C.pink
      ctx.beginPath()
      ctx.arc(-8, -8, 3, 0, Math.PI * 2)
      ctx.arc(8, -8, 3, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = C.dark
      ctx.beginPath()
      ctx.arc(-5, -12, 2, 0, Math.PI * 2)
      ctx.arc(5, -12, 2, 0, Math.PI * 2)
      ctx.fill()

      // Nose
      ctx.fillStyle = C.pinkDark
      ctx.beginPath()
      ctx.arc(0, -9, 1.5, 0, Math.PI * 2)
      ctx.fill()

      // Body
      ctx.fillStyle = C.white
      ctx.beginPath()
      ctx.ellipse(0, 10, 12, 14, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      if (withBook) {
        ctx.fillStyle = C.yellow
        ctx.strokeStyle = C.dark
        ctx.lineWidth = 1.5
        ctx.fillRect(-9, 3, 18, 12)
        ctx.strokeRect(-9, 3, 18, 12)
        ctx.fillStyle = C.white
        ctx.fillRect(-7, 5, 14, 8)
      } else if (withHeart) {
        ctx.fillStyle = C.pinkDark
        ctx.beginPath()
        ctx.arc(-3, 6, 3.5, 0, Math.PI, true)
        ctx.arc(3, 6, 3.5, 0, Math.PI, true)
        ctx.lineTo(0, 14)
        ctx.closePath()
        ctx.fill()
      } else if (waving) {
        ctx.fillStyle = C.white
        ctx.beginPath()
        ctx.arc(13, -2 + Math.sin(frameCount * 0.12) * 4, 3.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      }

      ctx.restore()
    }

    const drawBear = (ctx: CanvasRenderingContext2D, x: number, y: number, scale = 1, waving = false) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(scale, scale)
      ctx.fillStyle = '#C89666'
      ctx.strokeStyle = C.dark
      ctx.lineWidth = 2

      // Ears
      ctx.beginPath()
      ctx.arc(-11, -20, 5, 0, Math.PI * 2)
      ctx.arc(11, -20, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Head
      ctx.beginPath()
      ctx.arc(0, -10, 14, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Muzzle
      ctx.fillStyle = '#E8C5A5'
      ctx.beginPath()
      ctx.ellipse(0, -6, 6, 5, 0, 0, Math.PI * 2)
      ctx.fill()

      // Eyes & Nose
      ctx.fillStyle = C.dark
      ctx.beginPath()
      ctx.arc(-5, -12, 1.8, 0, Math.PI * 2)
      ctx.arc(5, -12, 1.8, 0, Math.PI * 2)
      ctx.arc(0, -8, 2.2, 0, Math.PI * 2)
      ctx.fill()

      // Body
      ctx.fillStyle = '#C89666'
      ctx.beginPath()
      ctx.ellipse(0, 10, 14, 15, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Paintbrush or wave
      if (waving) {
        ctx.fillStyle = '#C89666'
        ctx.beginPath()
        ctx.arc(14, -2 + Math.sin(frameCount * 0.12) * 4, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      } else {
        ctx.fillStyle = '#FFE082'
        ctx.fillRect(8, -6, 3, 16)
        ctx.fillStyle = C.pink
        ctx.beginPath()
        ctx.arc(9.5, -9, 3, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    const drawFox = (ctx: CanvasRenderingContext2D, x: number, y: number, scale = 1, waving = false) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(scale, scale)
      ctx.fillStyle = '#FF8A65'
      ctx.strokeStyle = C.dark
      ctx.lineWidth = 2

      // Ears
      ctx.beginPath()
      ctx.moveTo(-12, -14)
      ctx.lineTo(-14, -28)
      ctx.lineTo(-4, -18)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(12, -14)
      ctx.lineTo(14, -28)
      ctx.lineTo(4, -18)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Head
      ctx.beginPath()
      ctx.ellipse(0, -9, 14, 12, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Cheeks
      ctx.fillStyle = C.white
      ctx.beginPath()
      ctx.ellipse(-7, -5, 6, 5, 0.3, 0, Math.PI * 2)
      ctx.ellipse(7, -5, 6, 5, -0.3, 0, Math.PI * 2)
      ctx.fill()

      // Eyes & Nose
      ctx.fillStyle = C.dark
      ctx.beginPath()
      ctx.arc(-5, -10, 1.8, 0, Math.PI * 2)
      ctx.arc(5, -10, 1.8, 0, Math.PI * 2)
      ctx.arc(0, -5, 2, 0, Math.PI * 2)
      ctx.fill()

      // Body
      ctx.fillStyle = '#FF8A65'
      ctx.beginPath()
      ctx.ellipse(0, 10, 12, 14, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      if (waving) {
        ctx.fillStyle = '#FF8A65'
        ctx.beginPath()
        ctx.arc(13, -2 + Math.sin(frameCount * 0.12) * 4, 3.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      } else {
        // Megaphone
        ctx.fillStyle = C.yellow
        ctx.beginPath()
        ctx.moveTo(6, 4)
        ctx.lineTo(18, 0)
        ctx.lineTo(18, 12)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }

      ctx.restore()
    }

    const drawCat = (ctx: CanvasRenderingContext2D, x: number, y: number, scale = 1, waving = false) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(scale, scale)
      ctx.fillStyle = '#FFE082'
      ctx.strokeStyle = C.dark
      ctx.lineWidth = 2

      // Ears
      ctx.beginPath()
      ctx.moveTo(-11, -14)
      ctx.lineTo(-12, -25)
      ctx.lineTo(-3, -16)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(11, -14)
      ctx.lineTo(12, -25)
      ctx.lineTo(3, -16)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Head
      ctx.beginPath()
      ctx.arc(0, -9, 13, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Cheeks & Eyes
      ctx.fillStyle = C.pink
      ctx.beginPath()
      ctx.arc(-7, -6, 2.5, 0, Math.PI * 2)
      ctx.arc(7, -6, 2.5, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = C.dark
      ctx.beginPath()
      ctx.arc(-5, -10, 1.8, 0, Math.PI * 2)
      ctx.arc(5, -10, 1.8, 0, Math.PI * 2)
      ctx.arc(0, -7, 1.5, 0, Math.PI * 2)
      ctx.fill()

      // Body
      ctx.fillStyle = '#FFE082'
      ctx.beginPath()
      ctx.ellipse(0, 10, 11, 13, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      if (waving) {
        ctx.fillStyle = '#FFE082'
        ctx.beginPath()
        ctx.arc(12, -2 + Math.sin(frameCount * 0.12) * 4, 3.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      } else {
        // Shopping bag
        ctx.fillStyle = C.pinkDark
        ctx.fillRect(7, 3, 10, 12)
        ctx.strokeRect(7, 3, 10, 12)
      }

      ctx.restore()
    }

    const drawCloud = (ctx: CanvasRenderingContext2D, x: number, y: number, size = 30) => {
      ctx.save()
      ctx.fillStyle = 'rgba(255, 255, 255, 0.94)'
      ctx.strokeStyle = C.dark
      ctx.lineWidth = 1.6
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
      ctx.lineWidth = 1.2
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
      ctx.lineWidth = 1.6
      ctx.beginPath()
      ctx.ellipse(x, y, 10, 13, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y + 13)
      ctx.lineTo(x - 2, y + 28 + Math.sin(frameCount * 0.05) * 3)
      ctx.stroke()
      ctx.restore()
    }

    // --- MAIN RENDER LOOP (60 FPS) ---
    const render = () => {
      frameCount++
      smoothProgress += (scrollProgress - smoothProgress) * 0.075

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        animFrameRef.current = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, width, height)

      const p = smoothProgress
      const sceneIndex = Math.min(7, Math.floor(p / 0.125))
      const sceneProgress = (p % 0.125) / 0.125

      // 8 Scene Background Colors (Full screen story canvas)
      const sceneBgs = [
        C.yellowBg,    // 1. Hero (Morning Yellow)
        C.creamBg,     // 2. About (Classroom Cream)
        C.pinkBg,      // 3. Work (Art Atelier Pink)
        C.lavenderBg,  // 4. Videos (Storytime Lavender)
        C.peachBg,     // 5. Shop (Market Peach)
        C.greenBg,     // 6. Who I Serve (Meadow Green)
        C.pinkBg,      // 7. Testimonials/FAQ (Kind Words Rose)
        C.yellowBg,    // 8. Contact/Footer (Festive Celebration)
      ]

      const currentBg = sceneBgs[sceneIndex]
      const nextBg = sceneBgs[Math.min(7, sceneIndex + 1)]

      // Paint base background color across the entire viewport
      ctx.fillStyle = currentBg
      ctx.fillRect(0, 0, width, height)

      // Smooth crossfade transition between scenes (0.02 progress units)
      if (sceneProgress > 0.84) {
        const crossAlpha = (sceneProgress - 0.84) / 0.16
        ctx.save()
        ctx.globalAlpha = crossAlpha
        ctx.fillStyle = nextBg
        ctx.fillRect(0, 0, width, height)
        ctx.restore()
      }

      // If screen is wider than 800px, render the rich storybook characters & scene props
      if (width >= 800) {
        // Calculate side strip width (matching content layout gutters)
        const stripWidth = Math.max(90, Math.min(160, (width - 1100) / 2 + 65))

        // --- SCENE 1: Good Morning ☀️ ---
        if (sceneIndex === 0 || (sceneIndex === 1 && sceneProgress < 0.2)) {
          const sunY = height * 0.7 - sceneProgress * (height * 0.48)
          // Glowing Morning Sun
          ctx.save()
          ctx.fillStyle = C.yellow
          ctx.strokeStyle = C.dark
          ctx.lineWidth = 2.5
          ctx.beginPath()
          ctx.arc(stripWidth * 0.52, sunY, 34, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
          // Sun Face
          ctx.fillStyle = C.dark
          ctx.beginPath()
          ctx.arc(stripWidth * 0.52 - 8, sunY - 4, 2.5, 0, Math.PI * 2)
          ctx.arc(stripWidth * 0.52 + 8, sunY - 4, 2.5, 0, Math.PI * 2)
          ctx.arc(stripWidth * 0.52, sunY + 6, 2, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()

          // Clouds & Birds
          drawCloud(ctx, stripWidth * 0.35, height * 0.22 + Math.sin(frameCount * 0.02) * 8, 38)
          drawCloud(ctx, width - stripWidth * 0.75, height * 0.35 + Math.cos(frameCount * 0.02) * 8, 42)

          // V-Birds
          ctx.save()
          ctx.strokeStyle = C.dark
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(stripWidth * 0.75, height * 0.15)
          ctx.lineTo(stripWidth * 0.75 + 7, height * 0.12)
          ctx.lineTo(stripWidth * 0.75 + 14, height * 0.15)
          ctx.stroke()
          ctx.restore()

          // Rabbit looking up with wonder
          drawRabbit(ctx, stripWidth * 0.5, height - 52, 1.1)
          drawRabbit(ctx, width - stripWidth * 0.5, height - 52, 1.1)
        }

        // --- SCENE 2: The Classroom 📚 ---
        if (sceneIndex === 1 || (sceneIndex === 2 && sceneProgress < 0.2)) {
          // Chalkboard on left
          ctx.save()
          ctx.fillStyle = '#2D3748'
          ctx.strokeStyle = '#D97706'
          ctx.lineWidth = 3
          ctx.fillRect(stripWidth * 0.15, height * 0.26, stripWidth * 0.7, 50)
          ctx.strokeRect(stripWidth * 0.15, height * 0.26, stripWidth * 0.7, 50)
          ctx.fillStyle = C.white
          ctx.font = 'bold 12px sans-serif'
          ctx.fillText('Hello! ✏️', stripWidth * 0.24, height * 0.26 + 30)
          ctx.restore()

          // Rabbit with open book
          drawRabbit(ctx, stripWidth * 0.5, height - 52, 1.1, true)
          drawRabbit(ctx, width - stripWidth * 0.5, height - 52, 1.1, true)

          drawStar(ctx, stripWidth * 0.4, height * 0.16, 7)
          drawStar(ctx, width - stripWidth * 0.4, height * 0.24, 8)
        }

        // --- SCENE 3: The Art Atelier ✂️ ---
        if (sceneIndex === 2 || (sceneIndex === 3 && sceneProgress < 0.2)) {
          drawBear(ctx, stripWidth * 0.5, height - 52, 1.1)
          drawBear(ctx, width - stripWidth * 0.5, height - 52, 1.1)

          // Craft paper & scissors
          ctx.save()
          ctx.fillStyle = C.pink
          ctx.fillRect(stripWidth * 0.3, height * 0.24 + Math.sin(frameCount * 0.03) * 10, 14, 14)
          ctx.fillStyle = C.green
          ctx.fillRect(width - stripWidth * 0.6, height * 0.32 + Math.cos(frameCount * 0.03) * 10, 13, 13)
          ctx.restore()
        }

        // --- SCENE 4: Story Time 🎬 ---
        if (sceneIndex === 3 || (sceneIndex === 4 && sceneProgress < 0.2)) {
          drawFox(ctx, stripWidth * 0.5, height - 52, 1.1)
          drawFox(ctx, width - stripWidth * 0.5, height - 52, 1.1)

          ctx.save()
          ctx.fillStyle = C.purple
          ctx.font = 'bold 18px sans-serif'
          ctx.fillText('♪', stripWidth * 0.35, height * 0.28 + Math.sin(frameCount * 0.04) * 12)
          ctx.fillText('♫', width - stripWidth * 0.65, height * 0.24 + Math.cos(frameCount * 0.04) * 12)
          ctx.restore()
        }

        // --- SCENE 5: The Market 🛒 ---
        if (sceneIndex === 4 || (sceneIndex === 5 && sceneProgress < 0.2)) {
          drawCat(ctx, stripWidth * 0.5, height - 52, 1.1)
          drawCat(ctx, width - stripWidth * 0.5, height - 52, 1.1)

          ctx.save()
          ctx.fillStyle = C.yellow
          ctx.strokeStyle = C.dark
          ctx.lineWidth = 1.5
          ctx.fillRect(stripWidth * 0.25, height * 0.26, 26, 17)
          ctx.strokeRect(stripWidth * 0.25, height * 0.26, 26, 17)
          ctx.fillStyle = C.dark
          ctx.font = 'bold 8px sans-serif'
          ctx.fillText('SALE', stripWidth * 0.28, height * 0.26 + 12)
          ctx.restore()
        }

        // --- SCENE 6: Who I Serve 🧸 (All 4 Animals Together!) ---
        if (sceneIndex === 5 || (sceneIndex === 6 && sceneProgress < 0.2)) {
          drawRabbit(ctx, stripWidth * 0.22, height - 48, 0.74)
          drawBear(ctx, stripWidth * 0.42, height - 48, 0.74)
          drawFox(ctx, stripWidth * 0.62, height - 48, 0.74)
          drawCat(ctx, stripWidth * 0.82, height - 48, 0.74)

          drawRabbit(ctx, width - stripWidth * 0.82, height - 48, 0.74)
          drawBear(ctx, width - stripWidth * 0.62, height - 48, 0.74)
          drawFox(ctx, width - stripWidth * 0.42, height - 48, 0.74)
          drawCat(ctx, width - stripWidth * 0.22, height - 48, 0.74)

          drawStar(ctx, stripWidth * 0.5, height * 0.28, 6, C.yellow)
          drawStar(ctx, width - stripWidth * 0.5, height * 0.32, 6, C.pink)
        }

        // --- SCENE 7: Kind Words 💖 ---
        if (sceneIndex === 6 || (sceneIndex === 7 && sceneProgress < 0.2)) {
          drawRabbit(ctx, stripWidth * 0.5, height - 52, 1.1, false, true)
          drawRabbit(ctx, width - stripWidth * 0.5, height - 52, 1.1, false, true)

          // Speech bubble
          ctx.save()
          ctx.fillStyle = C.white
          ctx.strokeStyle = C.dark
          ctx.lineWidth = 1.8
          ctx.beginPath()
          ctx.ellipse(stripWidth * 0.46, height * 0.32, 24, 16, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
          ctx.fillStyle = C.pinkDark
          ctx.font = 'bold 12px sans-serif'
          ctx.fillText('♥', stripWidth * 0.46 - 5, height * 0.32 + 4)
          ctx.restore()
        }

        // --- SCENE 8: The End & Celebration 🌸 ---
        if (sceneIndex === 7) {
          drawBalloon(ctx, stripWidth * 0.3, height * 0.24 + Math.sin(frameCount * 0.03) * 15, C.pink)
          drawBalloon(ctx, stripWidth * 0.7, height * 0.18 + Math.cos(frameCount * 0.03) * 15, C.yellow)
          drawBalloon(ctx, width - stripWidth * 0.3, height * 0.26 + Math.sin(frameCount * 0.03) * 15, C.purple)
          drawBalloon(ctx, width - stripWidth * 0.7, height * 0.2 + Math.cos(frameCount * 0.03) * 15, C.green)

          drawRabbit(ctx, stripWidth * 0.22, height - 48, 0.74, false, false, true)
          drawBear(ctx, stripWidth * 0.42, height - 48, 0.74, true)
          drawFox(ctx, stripWidth * 0.62, height - 48, 0.74, true)
          drawCat(ctx, stripWidth * 0.82, height - 48, 0.74, true)

          drawRabbit(ctx, width - stripWidth * 0.82, height - 48, 0.74, false, false, true)
          drawBear(ctx, width - stripWidth * 0.62, height - 48, 0.74, true)
          drawFox(ctx, width - stripWidth * 0.42, height - 48, 0.74, true)
          drawCat(ctx, width - stripWidth * 0.22, height - 48, 0.74, true)
        }

        // Floating upward story particles in the side gutters
        particles.forEach((pt) => {
          pt.y -= pt.speed
          if (pt.y < -20) pt.y = height + 20
          pt.rot += pt.rotSpeed

          const px =
            pt.side === 'left'
              ? pt.xRel * (stripWidth - 30) + 15
              : width - stripWidth + pt.xRel * (stripWidth - 30) + 15

          ctx.save()
          ctx.translate(px, pt.y)
          ctx.rotate(pt.rot)
          ctx.fillStyle = pt.color
          ctx.font = `bold ${pt.size}px sans-serif`
          ctx.fillText(pt.char, 0, 0)
          ctx.restore()
        })
      }

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
