'use client'

import { useEffect, useRef, useState } from 'react'

export function ScrollPaperPlane() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const planeRef = useRef<HTMLDivElement | null>(null)
  const trailPoints = useRef<{ x: number; y: number; time: number }[]>([])
  const currentProgress = useRef(0)
  const targetProgress = useRef(0)
  const animFrameId = useRef<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const updateScrollProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      targetProgress.current = Math.min(1, Math.max(0, scrollY / maxScroll))
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    window.addEventListener('resize', updateScrollProgress, { passive: true })
    updateScrollProgress()

    const getPlaneCoordinates = (p: number, width: number, height: number) => {
      const isMobile = width < 768

      if (isMobile) {
        // Keep plane smaller and hugging the right side gently on mobile
        const x = width * (0.75 + 0.16 * Math.sin(p * Math.PI * 2.2))
        const y = height * (0.12 + 0.74 * p)
        return { x, y }
      }

      // Smooth S-curve gliding path from top-left toward bottom-right across the desktop screen
      const x = width * (0.08 + 0.82 * (p + 0.15 * Math.sin(p * Math.PI * 2.5)))
      const y = height * (0.12 + 0.76 * p)
      return { x, y }
    }

    const renderLoop = () => {
      // Smooth lerp damping for buttery 60+ FPS flight
      currentProgress.current += (targetProgress.current - currentProgress.current) * 0.08
      const p = currentProgress.current

      const canvas = canvasRef.current
      const plane = planeRef.current

      if (canvas && plane) {
        const width = window.innerWidth
        const height = window.innerHeight

        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width
          canvas.height = height
        }

        const ctx = canvas.getContext('2d')
        const currentPos = getPlaneCoordinates(p, width, height)

        // Calculate heading angle by sampling ahead slightly on the curve
        const nextPos = getPlaneCoordinates(Math.min(1, p + 0.008), width, height)
        const dx = nextPos.x - currentPos.x
        const dy = nextPos.y - currentPos.y
        const angleRad = Math.atan2(dy, dx)
        const angleDeg = (angleRad * 180) / Math.PI

        // Position and orient the paper airplane
        plane.style.transform = `translate3d(${currentPos.x}px, ${currentPos.y}px, 0) translate(-50%, -50%) rotate(${angleDeg}deg)`

        // Record flight trail history
        const now = performance.now()
        trailPoints.current.push({ x: currentPos.x, y: currentPos.y, time: now })

        // Keep trail fresh (approx 1.8 seconds)
        trailPoints.current = trailPoints.current.filter((pt) => now - pt.time < 1800)

        // Draw animated dashed/dotted flight trail
        if (ctx) {
          ctx.clearRect(0, 0, width, height)

          const pts = trailPoints.current
          if (pts.length > 2) {
            for (let i = 1; i < pts.length; i++) {
              const age = (now - pts[i].time) / 1800 // 0 (new) to 1 (old)
              const alpha = Math.max(0, 1 - age) * 0.85

              ctx.save()
              ctx.beginPath()
              ctx.setLineDash([4, 6])
              ctx.lineDashOffset = -p * 60
              ctx.lineWidth = width < 768 ? 2 : 2.5
              ctx.strokeStyle = `rgba(255, 200, 55, ${alpha})`
              ctx.shadowColor = `rgba(249, 168, 201, ${alpha * 0.6})`
              ctx.shadowBlur = 6

              ctx.moveTo(pts[i - 1].x, pts[i - 1].y)
              ctx.lineTo(pts[i].x, pts[i].y)
              ctx.stroke()
              ctx.restore()
            }
          }
        }
      }

      animFrameId.current = requestAnimationFrame(renderLoop)
    }

    animFrameId.current = requestAnimationFrame(renderLoop)

    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('resize', updateScrollProgress)
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-40 select-none overflow-hidden" aria-hidden="true">
      {/* Canvas for trailing dotted flight path */}
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />

      {/* Floating Paper Airplane */}
      <div
        ref={planeRef}
        className="absolute left-0 top-0 will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        {/* Idle Bobbing wrapper for gentle hovering */}
        <div className="animate-bob" style={{ animationDuration: '3.6s' }}>
          <svg
            viewBox="0 0 54 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-7 sm:size-11 drop-shadow-[0_4px_8px_rgba(45,31,29,0.18)]"
          >
            {/* Soft pink bottom shadow fold */}
            <path
              d="M2 22L50 4L28 40L20 27L2 22Z"
              fill="#F9A8C9"
              stroke="#2D1F1D"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Main Upper Wing (Crisp White) */}
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

            {/* Center Fold Crease Line (Warm Yellow & Pink Accents) */}
            <path
              d="M50 4L20 27"
              stroke="#FFC837"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M20 27L24 33"
              stroke="#F9A8C9"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Sparkle Star at the nose tip */}
            <circle cx="50" cy="4" r="2.2" fill="#FFC837" stroke="#2D1F1D" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </div>
  )
}
