'use client'

import { useEffect, useRef } from 'react'

// Curated pastel storybook color palette matching Farah's atelier
const C = {
  yellow: '#FFC837',
  yellowLight: '#FFE082',
  pink: '#F9A8C9',
  pinkDark: '#F48FB1',
  pinkBg: '#FCE4EC',
  green: '#81C784',
  purple: '#B39DDB',
  dark: '#2D1F1D',
  white: '#FFFFFF',
}

export function StorybookCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animFrameRef = useRef<number | null>(null)

  useEffect(() => {
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

    // 16 gentle floating particles strictly constrained to the left and right side margins
    const symbols = ['★', '♥', 'A', 'B', '1', '2', '✦', '✿', '♪', '✂']
    const particles = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      xRel: Math.random(),
      y: Math.random() * height,
      speed: 0.35 + Math.random() * 0.5,
      size: 11 + Math.random() * 8,
      char: symbols[i % symbols.length],
      color: [C.pink, C.yellow, C.green, C.purple, C.pinkDark][i % 5],
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.025,
      side: i % 2 === 0 ? 'left' : 'right',
    }))

    // --- PROCEDURAL 2D DRAWING HELPERS ---
    const drawRabbit = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      scale = 1.0,
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
      ctx.ellipse(0, 20, 14, 5, 0, 0, Math.PI * 2)
      ctx.fill()

      // Ears
      ctx.fillStyle = C.white
      ctx.strokeStyle = C.dark
      ctx.lineWidth = 2.2
      // Left ear
      ctx.beginPath()
      ctx.ellipse(-7, -22, 4.5, 12, -0.15, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = C.pink
      ctx.beginPath()
      ctx.ellipse(-7, -22, 2.2, 8, -0.15, 0, Math.PI * 2)
      ctx.fill()

      // Right ear
      ctx.fillStyle = C.white
      ctx.beginPath()
      ctx.ellipse(7, -22, 4.5, 12, 0.15, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = C.pink
      ctx.beginPath()
      ctx.ellipse(7, -22, 2.2, 8, 0.15, 0, Math.PI * 2)
      ctx.fill()

      // Head
      ctx.fillStyle = C.white
      ctx.beginPath()
      ctx.ellipse(0, -8, 14, 12, 0, 0, Math.PI * 2)
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
      ctx.arc(-5, -10, 1.8, 0, Math.PI * 2)
      ctx.arc(5, -10, 1.8, 0, Math.PI * 2)
      ctx.fill()

      // Nose
      ctx.fillStyle = C.pinkDark
      ctx.beginPath()
      ctx.arc(0, -7, 1.5, 0, Math.PI * 2)
      ctx.fill()

      // Body
      ctx.fillStyle = C.white
      ctx.beginPath()
      ctx.ellipse(0, 9, 12, 14, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      if (withBook) {
        ctx.fillStyle = C.yellow
        ctx.strokeStyle = C.dark
        ctx.lineWidth = 1.6
        ctx.fillRect(-8, 3, 16, 11)
        ctx.strokeRect(-8, 3, 16, 11)
        ctx.fillStyle = C.white
        ctx.fillRect(-6, 5, 12, 7)
        ctx.fillStyle = C.dark
        ctx.font = 'bold 6px sans-serif'
        ctx.fillText('ABC', -5, 10)
      } else if (withHeart) {
        ctx.fillStyle = C.pinkDark
        ctx.beginPath()
        ctx.arc(-3.5, 5, 3.8, 0, Math.PI, true)
        ctx.arc(3.5, 5, 3.8, 0, Math.PI, true)
        ctx.lineTo(0, 13)
        ctx.closePath()
        ctx.fill()
      } else if (waving) {
        ctx.fillStyle = C.white
        ctx.beginPath()
        ctx.arc(12, -2 + Math.sin(frameCount * 0.14) * 4, 3.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      }

      ctx.restore()
    }

    const drawBear = (ctx: CanvasRenderingContext2D, x: number, y: number, scale = 1.0, waving = false) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(scale, scale)

      // Shadow
      ctx.fillStyle = 'rgba(45, 31, 29, 0.12)'
      ctx.beginPath()
      ctx.ellipse(0, 20, 14, 5, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#C89666'
      ctx.strokeStyle = C.dark
      ctx.lineWidth = 2.2

      // Ears
      ctx.beginPath()
      ctx.arc(-10, -18, 5, 0, Math.PI * 2)
      ctx.arc(10, -18, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Head
      ctx.beginPath()
      ctx.arc(0, -8, 14, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Muzzle
      ctx.fillStyle = '#E8C5A5'
      ctx.beginPath()
      ctx.ellipse(0, -5, 6, 5, 0, 0, Math.PI * 2)
      ctx.fill()

      // Eyes & Nose
      ctx.fillStyle = C.dark
      ctx.beginPath()
      ctx.arc(-5, -10, 1.8, 0, Math.PI * 2)
      ctx.arc(5, -10, 1.8, 0, Math.PI * 2)
      ctx.arc(0, -6, 2, 0, Math.PI * 2)
      ctx.fill()

      // Body
      ctx.fillStyle = '#C89666'
      ctx.beginPath()
      ctx.ellipse(0, 9, 14, 15, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      if (waving) {
        ctx.fillStyle = '#C89666'
        ctx.beginPath()
        ctx.arc(13, -2 + Math.sin(frameCount * 0.14) * 4, 3.8, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      } else {
        // Paintbrush
        ctx.fillStyle = '#FFE082'
        ctx.fillRect(8, -4, 3, 14)
        ctx.fillStyle = C.pink
        ctx.beginPath()
        ctx.arc(9.5, -7, 3, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    const drawFox = (ctx: CanvasRenderingContext2D, x: number, y: number, scale = 1.0, waving = false) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(scale, scale)

      // Shadow
      ctx.fillStyle = 'rgba(45, 31, 29, 0.12)'
      ctx.beginPath()
      ctx.ellipse(0, 20, 14, 5, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#FF8A65'
      ctx.strokeStyle = C.dark
      ctx.lineWidth = 2.2

      // Pointy Ears
      ctx.beginPath()
      ctx.moveTo(-11, -12)
      ctx.lineTo(-14, -25)
      ctx.lineTo(-3, -16)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(11, -12)
      ctx.lineTo(14, -25)
      ctx.lineTo(3, -16)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Head
      ctx.beginPath()
      ctx.ellipse(0, -7, 14, 11, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // White Cheeks
      ctx.fillStyle = C.white
      ctx.beginPath()
      ctx.ellipse(-7, -4, 6, 5, 0.3, 0, Math.PI * 2)
      ctx.ellipse(7, -4, 6, 5, -0.3, 0, Math.PI * 2)
      ctx.fill()

      // Eyes & Nose
      ctx.fillStyle = C.dark
      ctx.beginPath()
      ctx.arc(-5, -9, 1.8, 0, Math.PI * 2)
      ctx.arc(5, -9, 1.8, 0, Math.PI * 2)
      ctx.arc(0, -4, 1.8, 0, Math.PI * 2)
      ctx.fill()

      // Body
      ctx.fillStyle = '#FF8A65'
      ctx.beginPath()
      ctx.ellipse(0, 9, 11, 13, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      if (waving) {
        ctx.fillStyle = '#FF8A65'
        ctx.beginPath()
        ctx.arc(12, -2 + Math.sin(frameCount * 0.14) * 4, 3.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      } else {
        // Megaphone
        ctx.fillStyle = C.yellow
        ctx.beginPath()
        ctx.moveTo(6, 3)
        ctx.lineTo(17, -1)
        ctx.lineTo(17, 11)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }

      ctx.restore()
    }

    const drawCat = (ctx: CanvasRenderingContext2D, x: number, y: number, scale = 1.0, waving = false) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(scale, scale)

      // Shadow
      ctx.fillStyle = 'rgba(45, 31, 29, 0.12)'
      ctx.beginPath()
      ctx.ellipse(0, 20, 14, 5, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#FFE082'
      ctx.strokeStyle = C.dark
      ctx.lineWidth = 2.2

      // Triangle Ears
      ctx.beginPath()
      ctx.moveTo(-10, -12)
      ctx.lineTo(-12, -23)
      ctx.lineTo(-2, -14)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(10, -12)
      ctx.lineTo(12, -23)
      ctx.lineTo(2, -14)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Head
      ctx.beginPath()
      ctx.arc(0, -7, 13, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Cheeks & Eyes
      ctx.fillStyle = C.pink
      ctx.beginPath()
      ctx.arc(-7, -5, 2.5, 0, Math.PI * 2)
      ctx.arc(7, -5, 2.5, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = C.dark
      ctx.beginPath()
      ctx.arc(-5, -9, 1.8, 0, Math.PI * 2)
      ctx.arc(5, -9, 1.8, 0, Math.PI * 2)
      ctx.arc(0, -5, 1.5, 0, Math.PI * 2)
      ctx.fill()

      // Body
      ctx.fillStyle = '#FFE082'
      ctx.beginPath()
      ctx.ellipse(0, 8, 11, 13, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      if (waving) {
        ctx.fillStyle = '#FFE082'
        ctx.beginPath()
        ctx.arc(11, -2 + Math.sin(frameCount * 0.14) * 4, 3.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      } else {
        // Shopping bag
        ctx.fillStyle = C.pinkDark
        ctx.fillRect(7, 2, 9, 11)
        ctx.strokeRect(7, 2, 9, 11)
      }

      ctx.restore()
    }

    const drawCloud = (ctx: CanvasRenderingContext2D, x: number, y: number, size = 30) => {
      ctx.save()
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
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

    const drawBalloon = (ctx: CanvasRenderingContext2D, x: number, y: number, color = C.pink) => {
      ctx.save()
      ctx.fillStyle = color
      ctx.strokeStyle = C.dark
      ctx.lineWidth = 1.8
      ctx.beginPath()
      ctx.ellipse(x, y, 10, 13, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y + 13)
      ctx.lineTo(x - 2, y + 26 + Math.sin(frameCount * 0.06) * 3)
      ctx.stroke()
      ctx.restore()
    }

    // --- MAIN RENDER LOOP ---
    const render = () => {
      frameCount++
      smoothProgress += (scrollProgress - smoothProgress) * 0.08

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        animFrameRef.current = requestAnimationFrame(render)
        return
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      // Only draw on screens wider than 900px so mobile content remains clean
      if (width >= 900) {
        const p = smoothProgress
        const sceneIndex = Math.min(7, Math.floor(p / 0.125))
        const sceneProgress = (p % 0.125) / 0.125

        // Left & right strip center coordinates (strictly confined to side gutters)
        const stripLeft = Math.max(38, Math.min(65, width * 0.04))
        const stripRight = width - Math.max(38, Math.min(65, width * 0.04))

        // --- SCENE 1: Hero (Good Morning ☀️) ---
        if (sceneIndex === 0 || (sceneIndex === 1 && sceneProgress < 0.2)) {
          const sunY = height * 0.38 - sceneProgress * (height * 0.15)
          // Rising Morning Sun in Left Margin
          ctx.save()
          ctx.fillStyle = C.yellow
          ctx.strokeStyle = C.dark
          ctx.lineWidth = 2.4
          ctx.beginPath()
          ctx.arc(stripLeft, sunY, 30, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
          // Sun Face
          ctx.fillStyle = C.dark
          ctx.beginPath()
          ctx.arc(stripLeft - 6, sunY - 3, 2.2, 0, Math.PI * 2)
          ctx.arc(stripLeft + 6, sunY - 3, 2.2, 0, Math.PI * 2)
          ctx.arc(stripLeft, sunY + 5, 1.8, 0, Math.PI * 2)
          ctx.fill()
          // Blush Cheeks
          ctx.fillStyle = C.pink
          ctx.beginPath()
          ctx.arc(stripLeft - 11, sunY + 2, 3, 0, Math.PI * 2)
          ctx.arc(stripLeft + 11, sunY + 2, 3, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()

          // Cute Clouds
          drawCloud(ctx, stripLeft - 15, height * 0.18 + Math.sin(frameCount * 0.02) * 6, 32)
          drawCloud(ctx, stripRight - 20, height * 0.25 + Math.cos(frameCount * 0.02) * 6, 34)

          // White Rabbit in lower left gutter looking up
          drawRabbit(ctx, stripLeft, height * 0.72, 1.1)
          drawRabbit(ctx, stripRight, height * 0.72, 1.1)
        }

        // --- SCENE 2: About (The Classroom 📚) ---
        if (sceneIndex === 1 || (sceneIndex === 2 && sceneProgress < 0.2)) {
          // Classroom Chalkboard in Left Gutter
          ctx.save()
          ctx.fillStyle = '#2D3748'
          ctx.strokeStyle = '#D97706'
          ctx.lineWidth = 2.5
          ctx.fillRect(stripLeft - 22, height * 0.26, 44, 34)
          ctx.strokeRect(stripLeft - 22, height * 0.26, 44, 34)
          ctx.fillStyle = C.white
          ctx.font = 'bold 9px sans-serif'
          ctx.fillText('ABC ✏️', stripLeft - 16, height * 0.26 + 21)
          ctx.restore()

          // Rabbit reading storybook
          drawRabbit(ctx, stripLeft, height * 0.72, 1.1, true)
          drawRabbit(ctx, stripRight, height * 0.72, 1.1, true)
        }

        // --- SCENE 3: Work (The Art Atelier ✂️) ---
        if (sceneIndex === 2 || (sceneIndex === 3 && sceneProgress < 0.2)) {
          // Bear with paintbrush
          drawBear(ctx, stripLeft, height * 0.72, 1.1)
          drawBear(ctx, stripRight, height * 0.72, 1.1)

          // Craft paper square in gutter
          ctx.save()
          ctx.fillStyle = C.pink
          ctx.fillRect(stripLeft - 8, height * 0.26 + Math.sin(frameCount * 0.03) * 8, 14, 14)
          ctx.fillStyle = C.green
          ctx.fillRect(stripRight - 8, height * 0.3 + Math.cos(frameCount * 0.03) * 8, 12, 12)
          ctx.restore()
        }

        // --- SCENE 4: Videos (Story Time 🎬) ---
        if (sceneIndex === 3 || (sceneIndex === 4 && sceneProgress < 0.2)) {
          // Fox with megaphone
          drawFox(ctx, stripLeft, height * 0.72, 1.1)
          drawFox(ctx, stripRight, height * 0.72, 1.1)

          // Floating musical notes
          ctx.save()
          ctx.fillStyle = C.purple
          ctx.font = 'bold 20px sans-serif'
          ctx.fillText('♪', stripLeft - 6, height * 0.28 + Math.sin(frameCount * 0.04) * 10)
          ctx.fillText('♫', stripRight - 8, height * 0.24 + Math.cos(frameCount * 0.04) * 10)
          ctx.restore()
        }

        // --- SCENE 5: Shop (The Market 🛒) ---
        if (sceneIndex === 4 || (sceneIndex === 5 && sceneProgress < 0.2)) {
          // Cat with shopping bag
          drawCat(ctx, stripLeft, height * 0.72, 1.1)
          drawCat(ctx, stripRight, height * 0.72, 1.1)

          // Price Tag
          ctx.save()
          ctx.fillStyle = C.yellow
          ctx.strokeStyle = C.dark
          ctx.lineWidth = 1.6
          ctx.fillRect(stripLeft - 12, height * 0.26, 24, 16)
          ctx.strokeRect(stripLeft - 12, height * 0.26, 24, 16)
          ctx.fillStyle = C.dark
          ctx.font = 'bold 8px sans-serif'
          ctx.fillText('SALE', stripLeft - 10, height * 0.26 + 11)
          ctx.restore()
        }

        // --- SCENE 6: Who I Serve (For Everyone 🧸) ---
        if (sceneIndex === 5 || (sceneIndex === 6 && sceneProgress < 0.2)) {
          drawRabbit(ctx, stripLeft - 14, height * 0.72, 0.75)
          drawBear(ctx, stripLeft + 14, height * 0.72, 0.75)

          drawFox(ctx, stripRight - 14, height * 0.72, 0.75)
          drawCat(ctx, stripRight + 14, height * 0.72, 0.75)
        }

        // --- SCENE 7: Testimonials & FAQ (Kind Words 💖) ---
        if (sceneIndex === 6 || (sceneIndex === 7 && sceneProgress < 0.2)) {
          // Rabbit with glowing heart
          drawRabbit(ctx, stripLeft, height * 0.72, 1.1, false, true)
          drawRabbit(ctx, stripRight, height * 0.72, 1.1, false, true)

          // Comic Speech Bubble
          ctx.save()
          ctx.fillStyle = C.white
          ctx.strokeStyle = C.dark
          ctx.lineWidth = 1.8
          ctx.beginPath()
          ctx.ellipse(stripLeft, height * 0.28, 18, 14, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
          ctx.fillStyle = C.pinkDark
          ctx.font = 'bold 12px sans-serif'
          ctx.fillText('♥', stripLeft - 4, height * 0.28 + 4)
          ctx.restore()
        }

        // --- SCENE 8: Celebration (Balloons & Confetti 🌸) ---
        if (sceneIndex === 7) {
          drawBalloon(ctx, stripLeft - 8, height * 0.22 + Math.sin(frameCount * 0.03) * 10, C.pink)
          drawBalloon(ctx, stripLeft + 12, height * 0.16 + Math.cos(frameCount * 0.03) * 10, C.yellow)
          drawBalloon(ctx, stripRight - 12, height * 0.24 + Math.sin(frameCount * 0.03) * 10, C.purple)
          drawBalloon(ctx, stripRight + 8, height * 0.18 + Math.cos(frameCount * 0.03) * 10, C.green)

          drawRabbit(ctx, stripLeft - 14, height * 0.72, 0.75, false, false, true)
          drawBear(ctx, stripLeft + 14, height * 0.72, 0.75, true)
          drawFox(ctx, stripRight - 14, height * 0.72, 0.75, true)
          drawCat(ctx, stripRight + 14, height * 0.72, 0.75, true)
        }

        // Floating upward particles in side gutters only
        particles.forEach((pt) => {
          pt.y -= pt.speed
          if (pt.y < -20) pt.y = height + 20
          pt.rot += pt.rotSpeed

          const px = pt.side === 'left' ? stripLeft + (pt.xRel - 0.5) * 36 : stripRight + (pt.xRel - 0.5) * 36

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

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 size-full select-none"
      aria-hidden="true"
    />
  )
}
