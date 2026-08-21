'use client'

import React from 'react'

/**
 * 3D Shiny Pushpin / Thumbtack with hover wiggle (as shown in reference image)
 */
export function PushPin({
  color = 'red',
  className = '',
  size = 36,
}: {
  color?: 'red' | 'purple' | 'yellow' | 'mint' | 'coral'
  className?: string
  size?: number
}) {
  const pinGradients = {
    red: { top: '#FF5252', mid: '#E53935', bottom: '#B71C1C', highlight: '#FFCDD2' },
    purple: { top: '#D8B4FE', mid: '#A855F7', bottom: '#7E22CE', highlight: '#F3E8FF' },
    yellow: { top: '#FDE047', mid: '#EAB308', bottom: '#CA8A04', highlight: '#FEF9C3' },
    mint: { top: '#6EE7B7', mid: '#10B981', bottom: '#047857', highlight: '#D1FAE5' },
    coral: { top: '#FDA4AF', mid: '#F43F5E', bottom: '#BE123C', highlight: '#FFE4E6' },
  }

  const grad = pinGradients[color] || pinGradients.red

  return (
    <div
      className={`pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_4px_6px_rgba(45,31,29,0.3)] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full overflow-visible">
        {/* Ground / Card Shadow */}
        <ellipse cx="22" cy="38" rx="9" ry="3.5" fill="rgba(45,31,29,0.28)" />

        {/* Metal Pin Needle Point */}
        <path d="M20 22L22 38L24 22Z" fill="#94A3B8" stroke="#2D1F1D" strokeWidth="1.2" strokeLinejoin="round" />

        {/* Pin Lower Collar / Base Ellipse */}
        <ellipse cx="22" cy="24" rx="10" ry="4.5" fill={grad.bottom} stroke="#2D1F1D" strokeWidth="1.8" />
        <ellipse cx="22" cy="23.5" rx="8" ry="3" fill={grad.mid} />

        {/* Pin Waist Cone Body */}
        <path
          d="M15 13C15 17 17 21 22 21C27 21 29 17 29 13L27 9H17L15 13Z"
          fill={grad.mid}
          stroke="#2D1F1D"
          strokeWidth="1.8"
        />

        {/* Pin Head Top Dome */}
        <circle cx="22" cy="10" r="9" fill={grad.top} stroke="#2D1F1D" strokeWidth="1.8" />

        {/* Inner 3D Sphere Shading / Highlight */}
        <ellipse cx="19" cy="7.5" rx="4" ry="2.2" fill={grad.highlight} opacity="0.9" />
        <circle cx="20" cy="8" r="1.5" fill="#FFFFFF" opacity="0.95" />
      </svg>
    </div>
  )
}

/**
 * Hand-Drawn Swirly Loop Arrow (exact reproduction of user image)
 */
export function SwirlyArrow({
  color = '#FF4D88',
  className = '',
  size = 64,
}: {
  color?: string
  className?: string
  size?: number
}) {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 100 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none transition-transform duration-300 hover:scale-110 ${className}`}
      aria-hidden="true"
    >
      {/* Hand-drawn curly loop path */}
      <path
        d="M32 10C24 15 22 25 32 30C46 36 62 28 60 18C58 8 42 6 30 18C16 32 20 60 48 64C72 68 84 52 74 42C62 30 44 40 40 60C34 85 45 105 78 114"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrowhead */}
      <path
        d="M66 118L82 115L80 100"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Cute Smiling Cartoon Sun with Slow Rotating Rays
 */
export function SmilingSun({
  className = '',
  size = 80,
}: {
  className?: string
  size?: number
}) {
  return (
    <div
      className={`pointer-events-none absolute z-0 select-none animate-float-slow opacity-90 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className="relative size-full">
        {/* Rotating Sun Rays */}
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-full animate-spin-slow">
          <g stroke="#2D1F1D" strokeWidth="2.5" strokeLinecap="round">
            <line x1="50" y1="6" x2="50" y2="18" />
            <line x1="50" y1="82" x2="50" y2="94" />
            <line x1="6" y1="50" x2="18" y2="50" />
            <line x1="82" y1="50" x2="94" y2="50" />
            <line x1="18" y1="18" x2="27" y2="27" />
            <line x1="73" y1="73" x2="82" y2="82" />
            <line x1="18" y1="82" x2="27" y2="73" />
            <line x1="73" y1="27" x2="82" y2="18" />
          </g>
        </svg>

        {/* Stable Face & Body */}
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-full">
          {/* Sun Center Body */}
          <circle cx="50" cy="50" r="28" fill="#FFC837" stroke="#2D1F1D" strokeWidth="2.5" />
          {/* Cute Cheeks */}
          <circle cx="38" cy="56" r="3.5" fill="#FF8787" opacity="0.75" />
          <circle cx="62" cy="56" r="3.5" fill="#FF8787" opacity="0.75" />
          {/* Happy Eyes */}
          <circle cx="42" cy="46" r="2.5" fill="#2D1F1D" />
          <circle cx="58" cy="46" r="2.5" fill="#2D1F1D" />
          {/* Smile */}
          <path d="M44 54C47 58 53 58 56 54" stroke="#2D1F1D" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}

/**
 * Floating Pastel Cartoon Balloon with Swaying String
 */
export function FloatingBalloon({
  color = '#FF7D6B',
  className = '',
  size = 56,
}: {
  color?: string
  className?: string
  size?: number
}) {
  return (
    <div
      className={`pointer-events-none absolute z-0 select-none animate-float opacity-85 ${className}`}
      style={{ width: size, height: size * 1.5 }}
      aria-hidden="true"
    >
      <div className="size-full animate-sway">
        <svg viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
          {/* Balloon Body */}
          <ellipse cx="30" cy="30" rx="24" ry="28" fill={color} stroke="#2D1F1D" strokeWidth="2.5" />
          {/* Glint highlight */}
          <ellipse cx="20" cy="18" rx="6" ry="10" fill="#FFFFFF" opacity="0.45" />
          {/* Tie Knot */}
          <polygon points="30,58 26,63 34,63" fill={color} stroke="#2D1F1D" strokeWidth="1.5" />
          {/* Wavy String */}
          <path d="M30 63C25 70 35 75 30 82C27 86 31 89 29 90" stroke="#2D1F1D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    </div>
  )
}

/**
 * Shiny Iridescent Cartoon Bubble with Bobbing Motion
 */
export function FloatingBubble({
  className = '',
  size = 40,
}: {
  className?: string
  size?: number
}) {
  return (
    <div
      className={`pointer-events-none absolute z-0 select-none animate-float opacity-80 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className="size-full animate-bob">
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
          <circle cx="25" cy="25" r="22" fill="url(#bubbleGrad)" stroke="#2D1F1D" strokeWidth="1.8" />
          <ellipse cx="18" cy="15" rx="5" ry="3" fill="#FFFFFF" opacity="0.85" transform="rotate(-30 18 15)" />
          <circle cx="34" cy="34" r="2" fill="#FFFFFF" opacity="0.75" />
          <defs>
            <radialGradient id="bubbleGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#A7F3D0" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#DDD6FE" stopOpacity="0.55" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}

/**
 * Gliding Origami Paper Plane with Dotted Trail
 */
export function PaperPlaneDoodle({
  className = '',
  size = 64,
}: {
  className?: string
  size?: number
}) {
  return (
    <div
      className={`pointer-events-none absolute z-0 select-none animate-plane-glide opacity-85 ${className}`}
      style={{ width: size, height: size * 0.8 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
        {/* Dotted Trajectory Trail */}
        <path
          d="M5 65 Q25 75 45 55 T75 40"
          stroke="#FF7D6B"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Paper Plane Wing Body */}
        <polygon points="75,20 95,35 60,60" fill="#FFFFFF" stroke="#2D1F1D" strokeWidth="2.2" strokeLinejoin="round" />
        <polygon points="75,20 95,35 78,48" fill="#FFE68C" stroke="#2D1F1D" strokeWidth="2.2" strokeLinejoin="round" />
        <polygon points="75,20 60,60 70,42" fill="#FAF5EC" stroke="#2D1F1D" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

/**
 * Animated Blossom Flower
 */
export function DoodleFlower({
  color = '#FFB5B5',
  centerColor = '#FFC837',
  className = '',
  size = 32,
}: {
  color?: string
  centerColor?: string
  className?: string
  size?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block animate-spin-slow select-none ${className}`}
      aria-hidden="true"
    >
      {/* 5 Petals */}
      <circle cx="20" cy="10" r="7" fill={color} stroke="#2D1F1D" strokeWidth="1.5" />
      <circle cx="30" cy="17" r="7" fill={color} stroke="#2D1F1D" strokeWidth="1.5" />
      <circle cx="26" cy="29" r="7" fill={color} stroke="#2D1F1D" strokeWidth="1.5" />
      <circle cx="14" cy="29" r="7" fill={color} stroke="#2D1F1D" strokeWidth="1.5" />
      <circle cx="10" cy="17" r="7" fill={color} stroke="#2D1F1D" strokeWidth="1.5" />
      {/* Flower Center */}
      <circle cx="20" cy="20" r="7" fill={centerColor} stroke="#2D1F1D" strokeWidth="2" />
    </svg>
  )
}

/**
 * Doodle Heart
 */
export function DoodleHeart({
  color = '#FF7D6B',
  className = '',
  size = 28,
}: {
  color?: string
  className?: string
  size?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block animate-bob select-none ${className}`}
      stroke="#2D1F1D"
      strokeWidth="2"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 28C16 28 3 20 3 10C3 5.5 6.5 2 11 2C13.5 2 15 3.5 16 5C17 3.5 18.5 2 21 2C25.5 2 29 5.5 29 10C29 20 16 28 16 28Z" />
    </svg>
  )
}

/**
 * Fluffy organic cloud wavy section divider
 */
export function CloudDivider({
  position = 'top',
  fillColor = '#FFFFFF',
  className = '',
}: {
  position?: 'top' | 'bottom'
  fillColor?: string
  className?: string
}) {
  return (
    <div
      className={`pointer-events-none relative z-10 w-full overflow-hidden leading-none ${
        position === 'top' ? '-mb-1' : '-mt-1 rotate-180'
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-10 w-full sm:h-16 lg:h-20"
        preserveAspectRatio="none"
      >
        <path
          d="M0,45 C150,95 240,15 380,55 C520,95 620,10 760,50 C900,90 1000,15 1140,55 C1280,95 1360,35 1440,55 L1440,120 L0,120 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  )
}

/**
 * Cute open book doodle — educational theme accent
 */
export function DoodleBook({
  className = '',
  size = 48,
  rotate = 0,
}: {
  className?: string
  size?: number
  rotate?: number
}) {
  return (
    <svg
      width={size}
      height={size * 0.85}
      viewBox="0 0 56 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none animate-float-slow ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <path
        d="M4 8C4 8 14 4 28 4C42 4 52 8 52 8V38C52 38 42 34 28 34C14 34 4 38 4 38V8Z"
        fill="#FFE68C"
        stroke="#2D1F1D"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M28 4V34" stroke="#2D1F1D" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 14H22M12 20H20M36 14H46M36 20H44" stroke="#2D1F1D" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M8 6C8 6 16 3 28 3C40 3 48 6 48 6"
        stroke="#FF7D6B"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

/**
 * Floating pencil doodle with bobbing motion
 */
export function FloatingPencil({
  className = '',
  size = 44,
}: {
  className?: string
  size?: number
}) {
  return (
    <div
      className={`pointer-events-none select-none animate-bob ${className}`}
      style={{ width: size, height: size * 1.4 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 44 62" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
        <path
          d="M22 4L38 52L22 58L6 52L22 4Z"
          fill="#FFC837"
          stroke="#2D1F1D"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M22 4L22 58" stroke="#2D1F1D" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
        <path d="M14 28L30 28" stroke="#2D1F1D" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
        <path d="M16 38L26 38" stroke="#2D1F1D" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
        <path d="M18 48L22 58L26 48" fill="#FF7D6B" stroke="#2D1F1D" strokeWidth="2" strokeLinejoin="round" />
        <rect x="18" y="2" width="8" height="6" rx="1" fill="#FFB5B5" stroke="#2D1F1D" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

/**
 * Soft pastel gradient orb — Kidocare / Bloomy style background blob
 */
export function PastelOrb({
  color = '#FFC837',
  size = 120,
  className = '',
  style,
}: {
  color?: string
  size?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`pointer-events-none select-none animate-float-slow rounded-full opacity-50 ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 35% 35%, ${color}CC 0%, ${color}44 45%, transparent 72%)`,
        ...style,
      }}
      aria-hidden="true"
    />
  )
}

/**
 * Hand-drawn circle ring doodle
 */
export function DoodleRing({
  color = '#FF7D6B',
  size = 48,
  className = '',
  strokeWidth = 2.5,
}: {
  color?: string
  size?: number
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none animate-spin-slow opacity-70 ${className}`}
      aria-hidden="true"
    >
      <circle
        cx="24"
        cy="24"
        r="18"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray="4 6"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="10" stroke={color} strokeWidth={strokeWidth * 0.7} opacity="0.45" />
    </svg>
  )
}

/**
 * Filled soft circle accent
 */
export function SoftCircle({
  color = '#A7F3D0',
  size = 32,
  className = '',
}: {
  color?: string
  size?: number
  className?: string
}) {
  return (
    <div
      className={`pointer-events-none select-none animate-bob rounded-full border-2 border-[#2D1F1D] opacity-80 ${className}`}
      style={{ width: size, height: size, backgroundColor: color }}
      aria-hidden="true"
    />
  )
}

/**
 * Animated cute floating background cloud with active expressive faces (smiling, laughing, winking)
 */
export function FloatingCloud({
  className = '',
  style,
  size = 'md',
  mood = 'smiling',
}: {
  className?: string
  style?: React.CSSProperties
  size?: 'sm' | 'md' | 'lg'
  mood?: 'smiling' | 'laughing' | 'winking' | 'giggling'
}) {
  const sizeMap = {
    sm: 'w-24 h-14',
    md: 'w-36 h-20 sm:w-48 sm:h-24',
    lg: 'w-52 h-28 sm:w-72 sm:h-36',
  }

  return (
    <div
      className={`pointer-events-none absolute z-0 select-none animate-float opacity-90 transition-transform ${sizeMap[size]} ${className}`}
      style={style}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-full drop-shadow-[0_8px_18px_rgba(255,200,55,0.2)]"
      >
        {/* Cloud Body with warm soft white/cream gradient */}
        <path
          d="M45,95 Q15,95 15,65 Q15,40 40,40 Q50,15 85,15 Q120,15 135,35 Q165,25 180,55 Q195,75 175,95 Q150,95 45,95 Z"
          fill="url(#cloudGrad)"
          stroke="#2D1F1D"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Cute rosy pink blush cheeks */}
        <circle cx="65" cy="72" r="7" fill="#FF8787" opacity="0.65" />
        <circle cx="135" cy="72" r="7" fill="#FF8787" opacity="0.65" />

        {/* Dynamic Expressive Active Faces */}
        {mood === 'laughing' ? (
          <>
            {/* Happy laughing ^ ^ eyes */}
            <path d="M72,60 Q80,52 88,60" stroke="#2D1F1D" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M112,60 Q120,52 128,60" stroke="#2D1F1D" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Open laughing mouth with tongue */}
            <path d="M91,66 Q100,84 109,66 Z" fill="#FF7D6B" stroke="#2D1F1D" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M95,74 Q100,70 105,74" stroke="#FFB5B5" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : mood === 'winking' ? (
          <>
            {/* Left wide open sparkling eye */}
            <circle cx="80" cy="58" r="4.5" fill="#2D1F1D" />
            <circle cx="82" cy="56" r="1.5" fill="#FFFFFF" />
            {/* Right winking playful line */}
            <path d="M112,60 Q120,54 128,60" stroke="#2D1F1D" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Playful side smile */}
            <path d="M94,68 Q102,78 108,68" stroke="#2D1F1D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        ) : mood === 'giggling' ? (
          <>
            {/* Giggling eyes */}
            <path d="M74,58 Q80,50 86,58" stroke="#2D1F1D" strokeWidth="2.8" strokeLinecap="round" fill="none" />
            <path d="M114,58 Q120,50 126,58" stroke="#2D1F1D" strokeWidth="2.8" strokeLinecap="round" fill="none" />
            {/* Sweet open smile */}
            <path d="M93,67 Q100,79 107,67" stroke="#2D1F1D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Little floating heart */}
            <path d="M100,32 C100,32 94,27 94,22 C94,19 96.5,17 99,17 C100,17 100,18 100,18 C100,18 100,17 101,17 C103.5,17 106,19 106,22 C106,27 100,32 100,32 Z" fill="#FF7D6B" stroke="#2D1F1D" strokeWidth="1.2" />
          </>
        ) : (
          <>
            {/* Bright wide smiling anime eyes */}
            <circle cx="80" cy="57" r="4.5" fill="#2D1F1D" />
            <circle cx="82" cy="55.5" r="1.5" fill="#FFFFFF" />
            <circle cx="120" cy="57" r="4.5" fill="#2D1F1D" />
            <circle cx="122" cy="55.5" r="1.5" fill="#FFFFFF" />
            {/* Big happy cute smile */}
            <path d="M92,67 Q100,78 108,67" stroke="#2D1F1D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        )}

        <defs>
          <linearGradient id="cloudGrad" x1="100" y1="15" x2="100" y2="95" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#FFF9E6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

/**
 * Cute decorative washi tape on card corners
 */
export function WashiTape({
  className = '',
  color = '#FFC837',
  pattern = 'solid',
}: {
  className?: string
  color?: string
  pattern?: 'solid' | 'dots' | 'stripes'
}) {
  return (
    <div
      className={`pointer-events-none absolute -top-3 left-6 z-20 h-6 w-20 -rotate-3 rounded-xs border border-[#2D1F1D]/20 shadow-xs backdrop-blur-xs transition-transform duration-200 group-hover:rotate-0 ${className}`}
      style={{
        backgroundColor: color,
        opacity: 0.88,
        backgroundImage:
          pattern === 'stripes'
            ? 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(45,31,29,0.1) 5px, rgba(45,31,29,0.1) 10px)'
            : pattern === 'dots'
              ? 'radial-gradient(circle, rgba(45,31,29,0.15) 1.5px, transparent 1.5px)'
              : undefined,
        backgroundSize: pattern === 'dots' ? '8px 8px' : undefined,
      }}
      aria-hidden="true"
    />
  )
}

/**
 * Playful doodle star / sparkle icon
 */
export function DoodleStar({
  className = '',
  color = '#FFC837',
  size = 24,
}: {
  className?: string
  color?: string
  size?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block animate-twinkle ${className}`}
      stroke="#2D1F1D"
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  )
}

/**
 * Cute Sticker Stamp Badge (Bloomy / Kidocare style)
 */
export function CuteSticker({
  children,
  color = 'yellow',
  rotate = 'rotate-[-2deg]',
  className = '',
}: {
  children: React.ReactNode
  color?: 'yellow' | 'pink' | 'mint' | 'lavender' | 'orange' | 'white'
  rotate?: string
  className?: string
}) {
  const colorMap = {
    yellow: 'bg-[#FFE68C] text-[#2D1F1D] border-[#2D1F1D]',
    pink: 'bg-[#FFB5B5] text-[#2D1F1D] border-[#2D1F1D]',
    mint: 'bg-[#A7F3D0] text-[#2D1F1D] border-[#2D1F1D]',
    lavender: 'bg-[#DDD6FE] text-[#2D1F1D] border-[#2D1F1D]',
    orange: 'bg-[#FED7AA] text-[#2D1F1D] border-[#2D1F1D]',
    white: 'bg-[#FFFFFF] text-[#2D1F1D] border-[#2D1F1D]',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-2xl border-2 px-3.5 py-1.5 text-xs font-black shadow-[3px_3px_0px_#2D1F1D] transition-transform duration-200 hover:scale-105 hover:rotate-0 cursor-pointer ${colorMap[color]} ${rotate} ${className}`}
    >
      {children}
    </span>
  )
}

/**
 * Cheerful mini rainbow with clouds for community / who-i-serve
 */
export function DoodleRainbow({
  className = '',
  size = 64,
}: {
  className?: string
  size?: number
}) {
  return (
    <div
      className={`pointer-events-none absolute z-0 select-none animate-float-slow opacity-85 ${className}`}
      style={{ width: size, height: size * 0.65 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 65" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
        {/* Rainbow Arcs */}
        <path d="M16,52 A34,34 0 0,1 84,52" stroke="#FF7D6B" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M23,52 A27,27 0 0,1 77,52" stroke="#FFC837" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M30,52 A20,20 0 0,1 70,52" stroke="#34D399" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M37,52 A13,13 0 0,1 63,52" stroke="#C084FC" strokeWidth="5.5" strokeLinecap="round" />
        {/* Left Mini Cloud */}
        <ellipse cx="16" cy="52" rx="9" ry="6.5" fill="#FFFFFF" stroke="#2D1F1D" strokeWidth="1.5" />
        <ellipse cx="10" cy="55" rx="5.5" ry="4.5" fill="#FFFFFF" stroke="#2D1F1D" strokeWidth="1.5" />
        {/* Right Mini Cloud */}
        <ellipse cx="84" cy="52" rx="9" ry="6.5" fill="#FFFFFF" stroke="#2D1F1D" strokeWidth="1.5" />
        <ellipse cx="90" cy="55" rx="5.5" ry="4.5" fill="#FFFFFF" stroke="#2D1F1D" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

/**
 * Cute floating musical notes for video & classroom demonstration
 */
export function DoodleMusicNotes({
  className = '',
  size = 48,
}: {
  className?: string
  size?: number
}) {
  return (
    <div
      className={`pointer-events-none absolute z-0 select-none animate-sway opacity-85 ${className}`}
      style={{ width: size, height: size * 0.9 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 60 54" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
        <ellipse cx="14" cy="40" rx="6" ry="4.5" fill="#FF7D6B" stroke="#2D1F1D" strokeWidth="1.8" transform="rotate(-15 14 40)" />
        <ellipse cx="38" cy="34" rx="6" ry="4.5" fill="#C084FC" stroke="#2D1F1D" strokeWidth="1.8" transform="rotate(-15 38 34)" />
        <path d="M19 38V14L43 8V32" stroke="#2D1F1D" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M19 15L43 9" stroke="#2D1F1D" strokeWidth="4.5" strokeLinecap="round" />
        <ellipse cx="48" cy="22" rx="4" ry="3" fill="#FFC837" stroke="#2D1F1D" strokeWidth="1.5" transform="rotate(-15 48 22)" />
        <path d="M52 21V10C52 10 56 11 58 13" stroke="#2D1F1D" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  )
}

/**
 * Handcrafted Artist / Teacher Palette for Creative Props & Crafting
 */
export function DoodlePalette({
  className = '',
  size = 52,
}: {
  className?: string
  size?: number
}) {
  return (
    <div
      className={`pointer-events-none absolute z-0 select-none animate-float opacity-85 ${className}`}
      style={{ width: size, height: size * 0.85 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 54" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
        <path
          d="M10,24 C10,12 22,6 38,6 C52,6 58,16 58,28 C58,42 46,48 34,48 C28,48 26,42 22,42 C18,42 16,46 12,46 C8,46 10,34 10,24 Z"
          fill="#FFE68C"
          stroke="#2D1F1D"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <ellipse cx="48" cy="34" rx="4" ry="5" fill="#FAF5EC" stroke="#2D1F1D" strokeWidth="1.8" />
        <circle cx="20" cy="16" r="3.5" fill="#FF4D4D" stroke="#2D1F1D" strokeWidth="1.2" />
        <circle cx="30" cy="13" r="3.5" fill="#34D399" stroke="#2D1F1D" strokeWidth="1.2" />
        <circle cx="42" cy="15" r="3.5" fill="#60A5FA" stroke="#2D1F1D" strokeWidth="1.2" />
        <circle cx="20" cy="27" r="3.5" fill="#C084FC" stroke="#2D1F1D" strokeWidth="1.2" />
        <circle cx="28" cy="34" r="3" fill="#FF7D6B" stroke="#2D1F1D" strokeWidth="1.2" />
      </svg>
    </div>
  )
}

/**
 * Yellow classroom ruler for lesson resources & printables
 */
export function DoodleRuler({
  className = '',
  size = 56,
}: {
  className?: string
  size?: number
}) {
  return (
    <div
      className={`pointer-events-none absolute z-0 select-none animate-float-slow opacity-85 ${className}`}
      style={{ width: size, height: size * 0.45 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 80 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
        <rect x="4" y="6" width="72" height="24" rx="4" fill="#FFC837" stroke="#2D1F1D" strokeWidth="2.2" transform="rotate(-8 40 18)" />
        <g stroke="#2D1F1D" strokeWidth="1.5" strokeLinecap="round" transform="rotate(-8 40 18)">
          <line x1="14" y1="6" x2="14" y2="16" />
          <line x1="22" y1="6" x2="22" y2="12" />
          <line x1="30" y1="6" x2="30" y2="16" />
          <line x1="38" y1="6" x2="38" y2="12" />
          <line x1="46" y1="6" x2="46" y2="16" />
          <line x1="54" y1="6" x2="54" y2="12" />
          <line x1="62" y1="6" x2="62" y2="16" />
          <line x1="70" y1="6" x2="70" y2="12" />
        </g>
      </svg>
    </div>
  )
}

/**
 * Glowing idea lightbulb for FAQ & curious answers
 */
export function DoodleLightbulb({
  className = '',
  size = 46,
}: {
  className?: string
  size?: number
}) {
  return (
    <div
      className={`pointer-events-none absolute z-0 select-none animate-bob opacity-85 ${className}`}
      style={{ width: size, height: size * 1.25 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
        <g stroke="#FFC837" strokeWidth="2.2" strokeLinecap="round">
          <line x1="25" y1="2" x2="25" y2="8" />
          <line x1="7" y1="12" x2="12" y2="16" />
          <line x1="43" y1="12" x2="38" y2="16" />
          <line x1="3" y1="28" x2="9" y2="28" />
          <line x1="47" y1="28" x2="41" y2="28" />
        </g>
        <path
          d="M14 26C14 19.9 18.9 15 25 15C31.1 15 36 19.9 36 26C36 30.5 33 34 31 38H19C17 34 14 30.5 14 26Z"
          fill="#FFE68C"
          stroke="#2D1F1D"
          strokeWidth="2.2"
        />
        <path d="M21 24C22 28 28 28 29 24" stroke="#2D1F1D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <rect x="20" y="39" width="10" height="4" rx="1" fill="#CBD5E1" stroke="#2D1F1D" strokeWidth="1.5" />
        <rect x="21" y="44" width="8" height="4" rx="1" fill="#94A3B8" stroke="#2D1F1D" strokeWidth="1.5" />
        <ellipse cx="25" cy="49" rx="3" ry="1.5" fill="#475569" />
      </svg>
    </div>
  )
}

/**
 * Cute love-letter / envelope doodle for Contact
 */
export function DoodleEnvelope({
  className = '',
  size = 52,
}: {
  className?: string
  size?: number
}) {
  return (
    <div
      className={`pointer-events-none absolute z-0 select-none animate-float opacity-85 ${className}`}
      style={{ width: size, height: size * 0.75 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 60 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
        <rect x="3" y="6" width="54" height="34" rx="4" fill="#FFFFFF" stroke="#2D1F1D" strokeWidth="2.2" />
        <path d="M4 8L30 26L56 8" stroke="#2D1F1D" strokeWidth="2" strokeLinejoin="round" />
        <path d="M4 39L22 22M56 39L38 22" stroke="#2D1F1D" strokeWidth="1.5" strokeLinecap="round" />
        <path
          d="M30 29C30 29 25 24 25 21C25 19 26.5 18 28 18C29 18 30 19 30 20C30 19 31 18 32 18C33.5 18 35 19 35 21C35 24 30 29 30 29Z"
          fill="#FF4D88"
          stroke="#2D1F1D"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

/**
 * Cluster of 3 playful sparkle stars
 */
export function DoodleStarsCluster({
  className = '',
  size = 40,
}: {
  className?: string
  size?: number
}) {
  return (
    <div
      className={`pointer-events-none absolute z-0 select-none animate-twinkle opacity-80 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
        <path d="M16 2L18.5 10.5L27 13L18.5 15.5L16 24L13.5 15.5L5 13L13.5 10.5L16 2Z" fill="#FFC837" stroke="#2D1F1D" strokeWidth="1.2" />
        <path d="M34 20L35.5 25.5L41 27L35.5 28.5L34 34L32.5 28.5L27 27L32.5 25.5L34 20Z" fill="#FF7D6B" stroke="#2D1F1D" strokeWidth="1" />
        <circle cx="10" cy="34" r="2.5" fill="#34D399" stroke="#2D1F1D" strokeWidth="1" />
      </svg>
    </div>
  )
}

/**
 * 3D Handcrafted Wooden Clothespin / Peg
 * Clamps onto the top of hanging cards with metal spring coil & wood texture
 */
export function WoodenPeg({
  color = 'wood',
  className = '',
  size = 36,
}: {
  color?: 'wood' | 'coral' | 'yellow' | 'mint' | 'lavender'
  className?: string
  size?: number
}) {
  const pegColors = {
    wood: {
      light: '#F3C590',
      main: '#D49A5B',
      dark: '#9A5B23',
      spring: '#64748B',
      springDark: '#334155',
      highlight: '#FCE7CC',
    },
    coral: {
      light: '#FF9E9E',
      main: '#FF7D6B',
      dark: '#C84332',
      spring: '#64748B',
      springDark: '#334155',
      highlight: '#FFE0DC',
    },
    yellow: {
      light: '#FFEAA7',
      main: '#FFC837',
      dark: '#C5910A',
      spring: '#64748B',
      springDark: '#334155',
      highlight: '#FFF9DB',
    },
    mint: {
      light: '#C6F6D5',
      main: '#6EE7B7',
      dark: '#10B981',
      spring: '#64748B',
      springDark: '#334155',
      highlight: '#E6FFFA',
    },
    lavender: {
      light: '#E9D8FD',
      main: '#C084FC',
      dark: '#7E22CE',
      spring: '#64748B',
      springDark: '#334155',
      highlight: '#F3E8FF',
    },
  }

  const c = pegColors[color] || pegColors.wood

  return (
    <div
      className={`pointer-events-none absolute z-30 -translate-x-1/2 drop-shadow-[0_4px_5px_rgba(45,31,29,0.35)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${className}`}
      style={{ width: size, height: size * 1.5 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full overflow-visible">
        {/* Soft shadow cast onto the card behind */}
        <ellipse cx="16" cy="38" rx="8" ry="3" fill="rgba(45,31,29,0.25)" />

        {/* Left Wooden Leg (Back/Base) */}
        <path
          d="M8 4C8 2.5 9 1.5 10.5 1.5H13C14 1.5 14.5 2.5 14.5 4V16L12 21L13.5 40C13.5 41.5 12.5 42.5 11 42.5H9.5C8 42.5 7 41.5 7 40L9 21L7.5 16V4C7.5 4 8 4 8 4Z"
          fill={c.dark}
        />

        {/* Left Wooden Leg (Front Face) */}
        <path
          d="M9 4.5C9 3.5 9.8 3 11 3H12.5C13.5 3 14 3.5 14 4.5V15.5L12 20.5L13 39.5C13 40.5 12.2 41.5 11 41.5H10C8.8 41.5 8 40.5 8 39.5L9.5 20.5L8.5 15.5V4.5H9Z"
          fill={c.main}
          stroke="#2D1F1D"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* Right Wooden Leg (Front Face) */}
        <path
          d="M23 4.5C23 3.5 22.2 3 21 3H19.5C18.5 3 18 3.5 18 4.5V15.5L20 20.5L19 39.5C19 40.5 19.8 41.5 21 41.5H22C23.2 41.5 24 40.5 24 39.5L22.5 20.5L23.5 15.5V4.5H23Z"
          fill={c.light}
          stroke="#2D1F1D"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* Wood grain & highlight accents */}
        <path d="M11 6V13M11 25V36" stroke={c.highlight} strokeWidth="1" strokeLinecap="round" opacity="0.8" />
        <path d="M21 6V13M21 25V36" stroke={c.highlight} strokeWidth="1" strokeLinecap="round" opacity="0.9" />

        {/* Metal Wire Spring Mechanism (Coil wrapped around center waist) */}
        {/* Spring back arc */}
        <path d="M10 18C10 15 22 15 22 18" stroke={c.springDark} strokeWidth="2.4" strokeLinecap="round" />

        {/* Spring central metal coil */}
        <rect
          x="11"
          y="16.5"
          width="10"
          height="5.5"
          rx="2.5"
          fill={c.spring}
          stroke="#2D1F1D"
          strokeWidth="1.5"
        />
        {/* Spring loop hole */}
        <circle cx="16" cy="19.2" r="1.6" fill="#2D1F1D" />
        {/* Spring metal glint */}
        <line x1="13" y1="17.8" x2="19" y2="17.8" stroke="#E2E8F0" strokeWidth="1" strokeLinecap="round" />

        {/* Clamping notch shadow at the rope pinch point */}
        <line x1="10" y1="29" x2="22" y2="29" stroke="#2D1F1D" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      </svg>
    </div>
  )
}

/**
 * Single Continuous Smooth Clothesline Rope
 * Beautifully textured rope with wooden anchor rings on the left & right
 * and smooth natural sags across the hanging cards
 */
export function ClotheslineRope({
  className = '',
}: {
  className?: string
}) {
  return (
    <div className={`pointer-events-none absolute left-0 right-0 z-20 select-none overflow-visible ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-9 overflow-visible"
        preserveAspectRatio="none"
      >
        {/* Left anchor wooden ring */}
        <circle cx="12" cy="14" r="8" fill="#D49A5B" stroke="#2D1F1D" strokeWidth="2.2" />
        <circle cx="12" cy="14" r="3.5" fill="#2D1F1D" />

        {/* Left rope loop knot */}
        <path
          d="M12 14 Q 24 20 40 18 Q 48 12 40 10 Q 28 10 32 20"
          stroke="#8C4B1B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Smooth continuous rope with 3 natural sags aligned to cards */}
        {/* Drop shadow path */}
        <path
          d="M20 16 C 120 28, 260 28, 380 20 C 500 32, 680 32, 800 20 C 920 28, 1060 28, 1180 16"
          stroke="rgba(45,31,29,0.2)"
          strokeWidth="6"
          strokeLinecap="round"
          transform="translate(0, 2.5)"
        />

        {/* Rope dark outer outline */}
        <path
          d="M20 16 C 120 28, 260 28, 380 20 C 500 32, 680 32, 800 20 C 920 28, 1060 28, 1180 16"
          stroke="#2D1F1D"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* Rope warm golden inner core */}
        <path
          d="M20 16 C 120 28, 260 28, 380 20 C 500 32, 680 32, 800 20 C 920 28, 1060 28, 1180 16"
          stroke="#F3C590"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Braided diagonal twists over rope */}
        <path
          d="M20 16 C 120 28, 260 28, 380 20 C 500 32, 680 32, 800 20 C 920 28, 1060 28, 1180 16"
          stroke="#9A5B23"
          strokeWidth="2.2"
          strokeDasharray="4 5"
          strokeLinecap="round"
        />

        {/* Right rope loop knot */}
        <path
          d="M1188 14 Q 1176 20 1160 18 Q 1152 12 1160 10 Q 1172 10 1168 20"
          stroke="#8C4B1B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Right anchor wooden ring */}
        <circle cx="1188" cy="14" r="8" fill="#D49A5B" stroke="#2D1F1D" strokeWidth="2.2" />
        <circle cx="1188" cy="14" r="3.5" fill="#2D1F1D" />
      </svg>
    </div>
  )
}

/**
 * 3D Artisan Kraft Paper Price Tag with Jute String Loop
 * Hangs from the corner of products in the Resource Shop
 */
export function CraftPriceTag({
  price,
  label = 'BUY',
  className = '',
}: {
  price?: number
  label?: string
  className?: string
}) {
  return (
    <div
      className={`pointer-events-none absolute right-3 -top-3 z-30 select-none drop-shadow-[0_4px_6px_rgba(45,31,29,0.3)] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 54 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-11 h-14 overflow-visible">
        {/* Jute String Loop */}
        <path
          d="M27 14 C 27 2, 38 2, 40 8 C 42 16, 29 16, 27 14"
          stroke="#8C4B1B"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Kraft Paper Tag Body */}
        <path
          d="M10 20 L27 6 L44 20 V64 C44 67 41 70 38 70 H16 C13 70 10 67 10 64 Z"
          fill="#FFE68C"
          stroke="#2D1F1D"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Metal eyelet reinforcement circle */}
        <circle cx="27" cy="17" r="3.5" fill="#FAF5EC" stroke="#2D1F1D" strokeWidth="1.5" />
        <circle cx="27" cy="17" r="1.5" fill="#2D1F1D" />

        {/* Tag decorative dashed stitch line */}
        <path
          d="M14 22 L27 11 L40 22 V62 C40 64 38 66 36 66 H18 C16 66 14 64 14 62 Z"
          stroke="#D97706"
          strokeWidth="1.2"
          strokeDasharray="2.5 2.5"
          fill="none"
        />
        {/* Price display text */}
        <text
          x="27"
          y="42"
          textAnchor="middle"
          fill="#2D1F1D"
          fontSize="11"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
        >
          {price != null ? `${price} DT` : '★'}
        </text>
        <text
          x="27"
          y="55"
          textAnchor="middle"
          fill="#B45309"
          fontSize="7"
          fontWeight="900"
          letterSpacing="0.6"
          fontFamily="system-ui, sans-serif"
        >
          {label.toUpperCase()}
        </text>
      </svg>
    </div>
  )
}

/**
 * Mediterranean Artisan Market Stall Canopy / Awning
 * Striped scalloped roof for Farah's Shop atelier
 */
export function MarketAwning({
  className = '',
}: {
  className?: string
}) {
  return (
    <div className={`pointer-events-none relative w-full select-none overflow-hidden rounded-t-[2.5rem] border-3 border-b-0 border-[#2D1F1D] shadow-xs ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-12 sm:h-14 overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="market-awning-stripes" width="80" height="64" patternUnits="userSpaceOnUse">
            <rect width="40" height="64" fill="#FFC837" />
            <rect x="40" width="40" height="64" fill="#FFFDF9" />
          </pattern>
        </defs>

        {/* Main canopy body with stripes */}
        <rect width="1200" height="46" fill="url(#market-awning-stripes)" />

        {/* Scalloped valance hem */}
        {Array.from({ length: 15 }).map((_, i) => (
          <path
            key={i}
            d={`M ${i * 80} 44 Q ${i * 80 + 20} 62 ${i * 80 + 40} 44 Q ${i * 80 + 60} 62 ${i * 80 + 80} 44`}
            fill={i % 2 === 0 ? '#FFC837' : '#FFFDF9'}
            stroke="#2D1F1D"
            strokeWidth="2.5"
          />
        ))}

        {/* Canopy bottom rim bar */}
        <line x1="0" y1="44" x2="1200" y2="44" stroke="#2D1F1D" strokeWidth="2.5" />
      </svg>
    </div>
  )
}

/**
 * Handcrafted Wooden Display Shelf Ledge
 * Sits below products to give a cozy boutique atelier feeling
 */
export function MarketShelfLedge({
  className = '',
}: {
  className?: string
}) {
  return (
    <div className={`pointer-events-none relative w-full select-none ${className}`} aria-hidden="true">
      <div className="h-3.5 w-full rounded-full border-2 border-[#2D1F1D] bg-gradient-to-r from-[#D49A5B] via-[#F3C590] to-[#D49A5B] shadow-[0_4px_6px_rgba(45,31,29,0.25)]" />
      <div className="mx-auto flex w-[90%] justify-between px-6 pt-0.5">
        <div className="h-3 w-4 rounded-b-md border-2 border-t-0 border-[#2D1F1D] bg-[#8C4B1B]" />
        <div className="h-3 w-4 rounded-b-md border-2 border-t-0 border-[#2D1F1D] bg-[#8C4B1B]" />
        <div className="h-3 w-4 rounded-b-md border-2 border-t-0 border-[#2D1F1D] bg-[#8C4B1B]" />
      </div>
    </div>
  )
}

/**
 * Cute Spiral Binder Wire Rings for Notebook / Planner
 */
export function SpiralBinderRings({
  count = 6,
  className = '',
}: {
  count?: number
  className?: string
}) {
  return (
    <div
      className={`pointer-events-none absolute -left-3.5 top-8 bottom-8 flex flex-col justify-around z-20 select-none ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="relative flex items-center">
          {/* Hole punch */}
          <div className="size-3 rounded-full border border-[#2D1F1D] bg-[#2D1F1D]" />
          {/* Spiral steel wire coil looping out */}
          <div className="absolute -left-2 h-3.5 w-5 rounded-full border-2 border-[#2D1F1D] bg-gradient-to-r from-[#E4E4E7] via-white to-[#A1A1AA] shadow-xs" />
        </div>
      ))}
    </div>
  )
}

/**
 * Cute Kawaii Floating Turtle Background Decoration
 */
export function FloatingTurtle({
  className = '',
  size = 56,
  style,
}: {
  className?: string
  size?: number
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`pointer-events-none absolute z-0 select-none animate-float-slow opacity-85 transition-transform duration-300 hover:scale-110 ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full drop-shadow-[0_6px_12px_rgba(16,185,129,0.2)]">
        {/* Back Flippers */}
        <ellipse cx="14" cy="34" rx="5" ry="3.5" transform="rotate(-20 14 34)" fill="#A7F3D0" stroke="#0F172A" strokeWidth="2" />
        <ellipse cx="36" cy="34" rx="5.5" ry="3.5" transform="rotate(25 36 34)" fill="#A7F3D0" stroke="#0F172A" strokeWidth="2" />
        <ellipse cx="26" cy="33" rx="5" ry="3" fill="#A7F3D0" stroke="#0F172A" strokeWidth="1.8" />
        
        {/* Belly */}
        <path d="M16 28C16 33 28 35 34 30C32 26 22 25 16 28Z" fill="#6EE7B7" stroke="#0F172A" strokeWidth="2" />

        {/* Teal Domed Shell */}
        <path d="M20 13C25 12 38 15 41 24C43 30 36 33 34 33C26 34 20 30 20 25C20 20 17 14 20 13Z" fill="#0D9488" stroke="#0F172A" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M19 23C22 23 35 25 39 31C38 33 34 33.5 32 33C24 33 20 28 19 23Z" fill="#0F766E" stroke="#0F172A" strokeWidth="1.8" />
        <path d="M24 16C28 15 34 17 37 21C35 24 28 23 24 20Z" fill="#14B8A6" opacity="0.75" />

        {/* Head */}
        <circle cx="15" cy="20" r="9" fill="#A7F3D0" stroke="#0F172A" strokeWidth="2.2" />
        <circle cx="19" cy="14" r="2.2" fill="#34D399" />
        <circle cx="14" cy="13" r="1.5" fill="#34D399" />
        <ellipse cx="19.5" cy="23" rx="3" ry="2.2" fill="#FB7185" opacity="0.85" />
        <ellipse cx="16.5" cy="19" rx="2.5" ry="3.2" fill="#0F172A" />
        <circle cx="17.5" cy="17.8" r="1.2" fill="#FFFFFF" />
        <circle cx="15.8" cy="20.5" r="0.6" fill="#FFFFFF" />
        <path d="M10.5 22C11.5 24 13.5 24 14.5 22.5" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}

/**
 * Cute Tweety Birdie Floating Background Decoration
 */
export function FloatingTweety({
  className = '',
  size = 48,
  style,
}: {
  className?: string
  size?: number
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`pointer-events-none absolute z-0 select-none animate-float opacity-90 transition-transform duration-300 hover:scale-110 ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full drop-shadow-[0_6px_12px_rgba(255,200,55,0.25)]">
        {/* Tail Feathers */}
        <path d="M6 24L2 18L10 21Z" fill="#FFC837" stroke="#2D1F1D" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M6 26L1 24L8 25Z" fill="#F59E0B" stroke="#2D1F1D" strokeWidth="1.5" strokeLinejoin="round" />

        {/* Bird Body */}
        <ellipse cx="20" cy="24" rx="12" ry="10" fill="#FFC837" stroke="#2D1F1D" strokeWidth="2.2" />

        {/* Wing with flutter detail */}
        <path d="M14 22C14 22 18 28 24 24C26 21 22 18 16 19C14 19 14 22 14 22Z" fill="#FFE68C" stroke="#2D1F1D" strokeWidth="1.8" />

        {/* Big Cute Tweety Head */}
        <circle cx="28" cy="16" r="10" fill="#FFC837" stroke="#2D1F1D" strokeWidth="2.2" />
        {/* Rosy Cheek */}
        <circle cx="28" cy="21" r="2.8" fill="#FF8787" opacity="0.8" />
        
        {/* Big Sparkling Anime Eye */}
        <ellipse cx="30" cy="14.5" rx="3.2" ry="4" fill="#2D1F1D" />
        <circle cx="31.2" cy="13.2" r="1.5" fill="#FFFFFF" />
        <circle cx="29.2" cy="16.5" r="0.8" fill="#FFFFFF" />

        {/* Cute Orange Beak */}
        <path d="M36 17L42 19L36 21Z" fill="#FF7D6B" stroke="#2D1F1D" strokeWidth="1.8" strokeLinejoin="round" />

        {/* Top Feather Crest */}
        <path d="M26 6C27 2 31 3 30 7" stroke="#2D1F1D" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}

/**
 * Cute Blooming Smiling Flower with rosy blush cheeks
 */
export function SmilingFlower({
  color = '#FFB5B5',
  size = 44,
  className = '',
  style,
}: {
  color?: string
  size?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`pointer-events-none absolute z-0 select-none animate-float opacity-90 ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full drop-shadow-[0_4px_10px_rgba(255,181,181,0.3)]">
        {/* 6 Petals */}
        <circle cx="25" cy="10" r="8.5" fill={color} stroke="#2D1F1D" strokeWidth="1.8" />
        <circle cx="38" cy="17.5" r="8.5" fill={color} stroke="#2D1F1D" strokeWidth="1.8" />
        <circle cx="38" cy="32.5" r="8.5" fill={color} stroke="#2D1F1D" strokeWidth="1.8" />
        <circle cx="25" cy="40" r="8.5" fill={color} stroke="#2D1F1D" strokeWidth="1.8" />
        <circle cx="12" cy="32.5" r="8.5" fill={color} stroke="#2D1F1D" strokeWidth="1.8" />
        <circle cx="12" cy="17.5" r="8.5" fill={color} stroke="#2D1F1D" strokeWidth="1.8" />

        {/* Center Golden Core */}
        <circle cx="25" cy="25" r="11.5" fill="#FFC837" stroke="#2D1F1D" strokeWidth="2" />

        {/* Rosy Blush Cheeks */}
        <circle cx="18.5" cy="27" r="2.2" fill="#FF7D6B" opacity="0.8" />
        <circle cx="31.5" cy="27" r="2.2" fill="#FF7D6B" opacity="0.8" />

        {/* Smiling Eyes */}
        <circle cx="21" cy="22" r="1.6" fill="#2D1F1D" />
        <circle cx="29" cy="22" r="1.6" fill="#2D1F1D" />

        {/* Happy Smile Arc */}
        <path d="M22 26Q25 30 28 26" stroke="#2D1F1D" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}

/**
 * Cheerful Smiling Gold Doodle Star with rosy cheeks
 */
export function SmilingStar({
  color = '#FFC837',
  size = 38,
  className = '',
  style,
}: {
  color?: string
  size?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`pointer-events-none absolute z-0 select-none animate-twinkle opacity-90 ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full drop-shadow-[0_4px_8px_rgba(255,200,55,0.3)]">
        {/* Star Shape */}
        <path
          d="M22 2L26.5 14.5L39.5 17L29.5 25.5L32.5 38.5L22 32L11.5 38.5L14.5 25.5L4.5 17L17.5 14.5L22 2Z"
          fill={color}
          stroke="#2D1F1D"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Rosy Cheeks */}
        <circle cx="16" cy="25" r="2.2" fill="#FF8787" opacity="0.85" />
        <circle cx="28" cy="25" r="2.2" fill="#FF8787" opacity="0.85" />
        {/* Smiling Eyes */}
        <circle cx="18" cy="20" r="1.6" fill="#2D1F1D" />
        <circle cx="26" cy="20" r="1.6" fill="#2D1F1D" />
        {/* Smile */}
        <path d="M19 24Q22 27.5 25 24" stroke="#2D1F1D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}

/**
 * Cheerful Floating Pastel Balloon
 */
export function PastelBalloon({
  color = '#FF7D6B',
  size = 46,
  className = '',
  style,
}: {
  color?: string
  size?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`pointer-events-none absolute z-0 select-none animate-float opacity-90 ${className}`}
      style={{ width: size, height: size * 1.6, ...style }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 76" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full drop-shadow-[0_6px_14px_rgba(255,125,107,0.25)]">
        {/* Balloon Body */}
        <path
          d="M24 6C12 6 4 16 4 30C4 44 18 52 24 54C30 52 44 44 44 30C44 16 36 6 24 6Z"
          fill={color}
          stroke="#2D1F1D"
          strokeWidth="2.2"
        />
        {/* Highlight Curve */}
        <path d="M14 14C10 18 10 24 10 28" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
        {/* Rosy Cheeks */}
        <circle cx="15" cy="34" r="2.5" fill="#FF8787" opacity="0.75" />
        <circle cx="33" cy="34" r="2.5" fill="#FF8787" opacity="0.75" />
        {/* Cute Face */}
        <circle cx="19" cy="28" r="1.8" fill="#2D1F1D" />
        <circle cx="29" cy="28" r="1.8" fill="#2D1F1D" />
        <path d="M21 33Q24 37 27 33" stroke="#2D1F1D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Knot */}
        <path d="M21 54L27 54L24 58Z" fill="#2D1F1D" />
        {/* Swirly Ribbon String */}
        <path d="M24 58Q30 64 22 68Q16 72 24 76" stroke="#2D1F1D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}
