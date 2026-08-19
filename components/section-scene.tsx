'use client'

import React from 'react'
import {
  DoodleBook,
  DoodleEnvelope,
  DoodleFlower,
  DoodleHeart,
  DoodleLightbulb,
  DoodleMusicNotes,
  DoodlePalette,
  DoodleRainbow,
  DoodleRing,
  DoodleRuler,
  DoodleStar,
  DoodleStarsCluster,
  FloatingBalloon,
  FloatingBubble,
  FloatingCloud,
  FloatingPencil,
  FloatingTurtle,
  FloatingTweety,
  PaperPlaneDoodle,
  PastelOrb,
  SmilingSun,
  SoftCircle,
} from '@/components/cloud-decorations'
import { ParallaxFloat } from '@/components/parallax-float'
import { cn } from '@/lib/utils'

export type SectionTheme =
  | 'about'
  | 'work'
  | 'videos'
  | 'shop'
  | 'serve'
  | 'testimonials'
  | 'faq'
  | 'contact'

type SectionSceneProps = {
  theme: SectionTheme
  pattern?: 'dots' | 'grid' | 'none'
  className?: string
}

const PATTERN_CLASS = {
  dots: 'dots-pattern opacity-40',
  grid: 'grid-paper opacity-40',
  none: '',
} as const

function SceneLayer({
  className,
  speed,
  children,
}: {
  className?: string
  speed?: number
  children: React.ReactNode
}) {
  return (
    <div className={cn('absolute', className)}>
      {speed !== undefined ? <ParallaxFloat speed={speed}>{children}</ParallaxFloat> : children}
    </div>
  )
}

/**
 * Unique Scene for "About": Story, philosophy, books & pencils
 */
function AboutScene() {
  return (
    <>
      <SceneLayer className="-left-16 top-1/4 hidden sm:block" speed={0.06}>
        <PastelOrb color="#FFE68C" size={150} />
      </SceneLayer>
      <SceneLayer className="-right-12 bottom-1/4 hidden sm:block" speed={-0.05}>
        <PastelOrb color="#FED7AA" size={130} />
      </SceneLayer>

      {/* Gentle floating cloud on left */}
      <SceneLayer className="-left-4 top-14 sm:left-4 sm:top-16" speed={0.09}>
        <FloatingCloud size="sm" />
      </SceneLayer>

      {/* Open book doodle on right */}
      <SceneLayer className="right-4 top-20 sm:right-10 sm:top-24 hidden sm:block" speed={0.12}>
        <DoodleBook size={46} rotate={8} />
      </SceneLayer>

      {/* Cute Kawaii Turtle swimming on bottom left */}
      <SceneLayer className="left-6 bottom-16 sm:left-12 sm:bottom-20 hidden md:block" speed={0.1}>
        <FloatingTurtle size={52} />
      </SceneLayer>

      {/* Dashed ring on top right */}
      <SceneLayer className="right-[18%] top-10 hidden lg:block" speed={-0.06}>
        <DoodleRing color="#FF7D6B" size={48} />
      </SceneLayer>

      {/* Blossom flower on bottom right */}
      <SceneLayer className="right-8 bottom-16 sm:right-16 sm:bottom-24" speed={0.08}>
        <DoodleFlower color="#FFB5B5" size={32} />
      </SceneLayer>
    </>
  )
}

/**
 * Unique Scene for "Work / Portfolio": Craft atelier, art palette, paper plane, stars
 */
function WorkScene() {
  return (
    <>
      <SceneLayer className="-left-14 top-1/3 hidden sm:block" speed={0.05}>
        <PastelOrb color="#A7F3D0" size={160} />
      </SceneLayer>
      <SceneLayer className="-right-16 bottom-1/3 hidden sm:block" speed={-0.06}>
        <PastelOrb color="#FFE68C" size={140} />
      </SceneLayer>

      {/* Cute Tweety Birdie fluttering on top right */}
      <SceneLayer className="right-6 top-10 sm:right-16 sm:top-12" speed={0.14}>
        <FloatingTweety size={52} />
      </SceneLayer>

      {/* Handcrafted artist palette on left */}
      <SceneLayer className="left-4 top-24 sm:left-10 sm:top-28 hidden sm:block" speed={0.1}>
        <DoodlePalette size={54} />
      </SceneLayer>

      {/* Star cluster on middle right */}
      <SceneLayer className="right-8 top-1/2 hidden md:block" speed={-0.08}>
        <DoodleStarsCluster size={42} />
      </SceneLayer>

      {/* Mint doodle ring on bottom left */}
      <SceneLayer className="left-8 bottom-16 sm:left-14 sm:bottom-20 hidden sm:block" speed={0.07}>
        <DoodleRing color="#34D399" size={46} />
      </SceneLayer>

      {/* Floating bubble on top left */}
      <FloatingBubble className="left-[14%] top-12" size={36} />
    </>
  )
}

/**
 * Unique Scene for "Videos": Teaching theatre, music notes, purple balloon, star sparks
 */
function VideosScene() {
  return (
    <>
      <SceneLayer className="-left-12 top-1/4 hidden sm:block" speed={0.05}>
        <PastelOrb color="#DDD6FE" size={150} />
      </SceneLayer>
      <SceneLayer className="-right-12 bottom-1/4 hidden sm:block" speed={-0.06}>
        <PastelOrb color="#FB7185" size={130} />
      </SceneLayer>

      {/* Floating musical notes on top left */}
      <SceneLayer className="left-6 top-12 sm:left-12 sm:top-14" speed={0.12}>
        <DoodleMusicNotes size={52} />
      </SceneLayer>

      {/* High-flying purple balloon on right */}
      <SceneLayer className="right-4 top-20 sm:right-10 sm:top-24" speed={0.15}>
        <FloatingBalloon color="#C084FC" size={46} />
      </SceneLayer>

      {/* Twinkling golden star on bottom left */}
      <SceneLayer className="left-8 bottom-16 sm:left-14 sm:bottom-20" speed={-0.06}>
        <DoodleStar color="#FFC837" size={28} />
      </SceneLayer>

      {/* Bobbing iridescent bubble on bottom right */}
      <FloatingBubble className="right-[12%] bottom-[20%]" size={42} />

      {/* Soft yellow circle on top right */}
      <SoftCircle color="#FFE68C" size={26} className="absolute right-[22%] top-10 hidden md:block" />
    </>
  )
}

/**
 * Unique Scene for "Shop / Printables": Stationery ruler, books, daisy flower, stars
 */
function ShopScene() {
  return (
    <>
      <SceneLayer className="-left-16 top-1/3 hidden sm:block" speed={0.06}>
        <PastelOrb color="#FFC837" size={150} />
      </SceneLayer>
      <SceneLayer className="-right-14 bottom-1/3 hidden sm:block" speed={-0.05}>
        <PastelOrb color="#FED7AA" size={140} />
      </SceneLayer>

      {/* Classroom ruler doodle on top left */}
      <SceneLayer className="left-6 top-12 sm:left-12 sm:top-14" speed={0.1}>
        <DoodleRuler size={62} />
      </SceneLayer>

      {/* Open book doodle on right */}
      <SceneLayer className="right-6 top-20 sm:right-12 sm:top-24 hidden sm:block" speed={0.11}>
        <DoodleBook size={46} rotate={-10} />
      </SceneLayer>

      {/* Blossom daisy flower on bottom left */}
      <SceneLayer className="left-8 bottom-14 sm:left-14 sm:bottom-18" speed={0.08}>
        <DoodleFlower color="#A7F3D0" centerColor="#FFC837" size={34} />
      </SceneLayer>

      {/* Star cluster on top right */}
      <SceneLayer className="right-[16%] top-8 hidden lg:block" speed={-0.07}>
        <DoodleStarsCluster size={38} />
      </SceneLayer>

      {/* Soft lavender circle accent */}
      <SoftCircle color="#DDD6FE" size={28} className="absolute right-10 bottom-16 hidden sm:block" />
    </>
  )
}

/**
 * Unique Scene for "Who I Serve": Community rainbow, fluffy cloud, heart & blossoms
 */
function ServeScene() {
  return (
    <>
      <SceneLayer className="-left-14 top-1/4 hidden sm:block" speed={0.05}>
        <PastelOrb color="#BAE6FD" size={160} />
      </SceneLayer>
      <SceneLayer className="-right-16 bottom-1/4 hidden sm:block" speed={-0.06}>
        <PastelOrb color="#FFE4E6" size={140} />
      </SceneLayer>

      {/* Mini pastel rainbow on top left */}
      <SceneLayer className="left-4 top-10 sm:left-10 sm:top-12" speed={0.12}>
        <DoodleRainbow size={72} />
      </SceneLayer>

      {/* Cheerful fluffy laughing cloud on right */}
      <SceneLayer className="right-2 top-20 sm:right-8 sm:top-24" speed={-0.08}>
        <FloatingCloud size="md" mood="laughing" />
      </SceneLayer>

      {/* Coral doodle heart on bottom right */}
      <SceneLayer className="right-8 bottom-16 sm:right-14 sm:bottom-20" speed={0.09}>
        <DoodleHeart color="#FF7D6B" size={32} />
      </SceneLayer>

      {/* Pink blossom flower on bottom left */}
      <SceneLayer className="left-8 bottom-16 sm:left-16 sm:bottom-22 hidden sm:block" speed={0.08}>
        <DoodleFlower color="#FFB5B5" size={32} />
      </SceneLayer>
    </>
  )
}

/**
 * Unique Scene for "Testimonials": Rose hearts, pink balloon, celebration stars & bubbles
 */
function TestimonialsScene() {
  return (
    <>
      <SceneLayer className="-left-14 top-1/3 hidden sm:block" speed={0.05}>
        <PastelOrb color="#FFB5B5" size={150} />
      </SceneLayer>
      <SceneLayer className="-right-14 bottom-1/3 hidden sm:block" speed={-0.06}>
        <PastelOrb color="#DDD6FE" size={140} />
      </SceneLayer>

      {/* Floating pink balloon on left */}
      <SceneLayer className="left-4 top-14 sm:left-8 sm:top-18" speed={0.14}>
        <FloatingBalloon color="#FB7185" size={46} />
      </SceneLayer>

      {/* Coral doodle heart on top right */}
      <SceneLayer className="right-6 top-12 sm:right-12 sm:top-16" speed={0.1}>
        <DoodleHeart color="#FB7185" size={34} />
      </SceneLayer>

      {/* Twinkling star on bottom right */}
      <SceneLayer className="right-8 bottom-16 sm:right-14 sm:bottom-22" speed={-0.06}>
        <DoodleStar color="#FFC837" size={26} />
      </SceneLayer>

      {/* Bobbing iridescent bubble on bottom left */}
      <FloatingBubble className="left-[12%] bottom-[22%]" size={38} />

      {/* Soft mint circle accent */}
      <SoftCircle color="#A7F3D0" size={24} className="absolute right-[24%] top-10 hidden lg:block" />
    </>
  )
}

/**
 * Unique Scene for "FAQ": Idea lightbulb, yellow pencil, thoughtful purple ring
 */
function FaqScene() {
  return (
    <>
      <SceneLayer className="-left-14 top-1/4 hidden sm:block" speed={0.05}>
        <PastelOrb color="#DDD6FE" size={150} />
      </SceneLayer>
      <SceneLayer className="-right-14 bottom-1/4 hidden sm:block" speed={-0.06}>
        <PastelOrb color="#FFE68C" size={140} />
      </SceneLayer>

      {/* Glowing idea lightbulb on top right */}
      <SceneLayer className="right-6 top-10 sm:right-12 sm:top-12" speed={0.12}>
        <DoodleLightbulb size={48} />
      </SceneLayer>

      {/* Thoughtful floating pencil on left */}
      <SceneLayer className="left-4 top-18 sm:left-10 sm:top-22 hidden sm:block" speed={0.1}>
        <FloatingPencil size={42} />
      </SceneLayer>

      {/* Purple dashed ring on bottom right */}
      <SceneLayer className="right-8 bottom-14 sm:right-16 sm:bottom-18 hidden md:block" speed={-0.07}>
        <DoodleRing color="#8B5CF6" size={48} />
      </SceneLayer>

      {/* Golden twinkle star on top left */}
      <SceneLayer className="left-8 top-10 sm:left-14 sm:top-12" speed={-0.05}>
        <DoodleStar color="#FFC837" size={24} />
      </SceneLayer>
    </>
  )
}

/**
 * Unique Scene for "Contact": Origami paper plane to inbox, love-letter envelope, farewell smiling sun
 */
function ContactScene() {
  return (
    <>
      <SceneLayer className="-left-16 top-1/3 hidden sm:block" speed={0.06}>
        <PastelOrb color="#FF7D6B" size={160} />
      </SceneLayer>
      <SceneLayer className="-right-16 bottom-1/3 hidden sm:block" speed={-0.06}>
        <PastelOrb color="#FFC837" size={150} />
      </SceneLayer>

      {/* Origami paper plane flying towards inbox on top right */}
      <SceneLayer className="right-6 top-10 sm:right-16 sm:top-14" speed={0.13}>
        <PaperPlaneDoodle size={62} />
      </SceneLayer>

      {/* Love-letter envelope on left */}
      <SceneLayer className="left-4 top-16 sm:left-10 sm:top-20" speed={0.11}>
        <DoodleEnvelope size={54} />
      </SceneLayer>

      {/* Smiling sun on bottom left waving farewell */}
      <SceneLayer className="left-4 bottom-12 sm:left-10 sm:bottom-16" speed={0.14}>
        <SmilingSun size={72} />
      </SceneLayer>

      {/* Mint floating balloon on bottom right */}
      <SceneLayer className="right-6 bottom-16 sm:right-12 sm:bottom-20 hidden sm:block" speed={0.12}>
        <FloatingBalloon color="#34D399" size={44} />
      </SceneLayer>
    </>
  )
}

export function SectionScene({ theme, pattern = 'dots', className }: SectionSceneProps) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 z-0 overflow-hidden', className)}
      aria-hidden="true"
    >
      {pattern !== 'none' && <div className={cn('absolute inset-0', PATTERN_CLASS[pattern])} />}

      {theme === 'about' && <AboutScene />}
      {theme === 'work' && <WorkScene />}
      {theme === 'videos' && <VideosScene />}
      {theme === 'shop' && <ShopScene />}
      {theme === 'serve' && <ServeScene />}
      {theme === 'testimonials' && <TestimonialsScene />}
      {theme === 'faq' && <FaqScene />}
      {theme === 'contact' && <ContactScene />}
    </div>
  )
}

