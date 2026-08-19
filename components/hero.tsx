'use client'

import Image from 'next/image'
import { ArrowRight, Sparkles, Star, Heart, Palette, BookOpen } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SplitReveal } from '@/components/split-reveal'
import { TypewriterText } from '@/components/typewriter-text'
import { ParallaxFloat } from '@/components/parallax-float'
import { usePortfolio } from '@/lib/portfolio-context'
import { cn } from '@/lib/utils'
import {
  FloatingCloud,
  WashiTape,
  DoodleStar,
  CuteSticker,
  SmilingSun,
  FloatingBalloon,
  FloatingBubble,
  FloatingTurtle,
  FloatingTweety,
  PaperPlaneDoodle,
  PushPin,
} from '@/components/cloud-decorations'
import { LearningExpressTrain } from '@/components/learning-train'

export function Hero() {
  const { state } = usePortfolio()
  const { hero, stats, works } = state

  const propsCount = works.filter((w) => w.category === 'props').length
  const marqueeList =
    hero.marqueeItems && hero.marqueeItems.length > 0
      ? hero.marqueeItems
      : [
        '✨ Phonics & Storytelling',
        '✂️ Handmade Classroom Props',
        '🎨 Printable Craft Sheets',
        '🎒 Creative Workshops',
        '🧸 Educational Games & Kits',
        '📚 Joyful English Learning',
      ]

  return (
    <section
      id="home"
      className="section-shell relative flex min-h-[min(100svh,56rem)] flex-col justify-between overflow-hidden bg-transparent pt-[calc(var(--header-h)+2rem)] lg:pt-[calc(var(--header-h)+3rem)]"
    >
      {/* Floating Animated Background Decorations */}
      <ParallaxFloat speed={0.2} className="absolute right-4 top-20 sm:right-12 sm:top-24">
        <SmilingSun size={96} />
      </ParallaxFloat>

      <ParallaxFloat speed={-0.14} className="absolute left-[42%] top-28 hidden md:block">
        <PaperPlaneDoodle size={72} />
      </ParallaxFloat>

      <ParallaxFloat speed={0.12} className="absolute -left-10 top-20">
        <FloatingCloud size="lg" mood="laughing" />
      </ParallaxFloat>
      <ParallaxFloat speed={-0.1} className="absolute right-4 top-44 hidden sm:block">
        <FloatingCloud size="md" mood="winking" style={{ animationDelay: '2s' }} />
      </ParallaxFloat>
      <ParallaxFloat speed={0.08} className="absolute left-1/3 bottom-24 hidden lg:block">
        <FloatingCloud size="sm" mood="giggling" style={{ animationDelay: '3.5s' }} />
      </ParallaxFloat>

      <ParallaxFloat speed={0.18} className="absolute left-6 top-1/2">
        <FloatingBalloon color="#FF7D6B" size={48} />
      </ParallaxFloat>

      {/* Cute Floating Tweety Birdie */}
      <ParallaxFloat speed={-0.12} className="absolute left-[15%] bottom-28 hidden md:block">
        <FloatingTweety size={52} />
      </ParallaxFloat>

      {/* Cute Floating Kawaii Turtle */}
      <ParallaxFloat speed={0.15} className="absolute right-[8%] bottom-32 hidden md:block">
        <FloatingTurtle size={56} />
      </ParallaxFloat>

      <FloatingBubble className="left-1/4 top-1/3" size={40} />
      <FloatingBubble className="right-1/4 bottom-36" size={44} />

      {/* Playful Floating Doodle Stars */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-paper absolute inset-0 opacity-40" />
        <DoodleStar className="absolute left-[8%] top-[25%] opacity-80" color="#FFC837" size={28} />
        <DoodleStar className="absolute right-[12%] top-[18%] opacity-80" color="#FF7D6B" size={22} />
        <DoodleStar className="absolute right-[22%] bottom-[30%] opacity-80" color="#A7F3D0" size={26} />
      </div>

      {/* Main Content Grid */}
      <div className="section-inner my-auto w-full">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 xl:gap-16">
          {/* Left Column: Headline, Bio, Actions, Stats */}
          <div className="flex flex-col items-start">
            <Reveal>
              <CuteSticker color="yellow" rotate="rotate-[-2deg]" className="text-xs sm:text-sm">
                <Sparkles className="size-4 text-[#2D1F1D] fill-[#FFC837]" />
                <span>{hero.eyebrow || 'Hello there! Welcome to my creative studio ✨'}</span>
              </CuteSticker>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-4 font-sans text-3xl font-black leading-[1.12] tracking-tight text-[#2D1F1D] sm:text-5xl lg:text-[3.35rem] xl:text-[3.65rem] text-balance">
                <SplitReveal text={`${hero.titlePrefix} `} as="span" delay={0} stagger={35} />
                <span className="relative inline-block rounded-2xl bg-[#FFE68C] px-3 py-1 text-[#2D1F1D] shadow-[3px_3px_0px_#2D1F1D] -rotate-1 transition-transform duration-200 hover:rotate-1 animate-pop-in">
                  {hero.highlightWord}
                </span>{' '}
                <span className="text-[#FF7D6B]">
                  <SplitReveal text={hero.titleSuffix} as="span" delay={200} stagger={40} />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#6B5550] sm:text-lg text-pretty font-medium min-h-[3.5em]">
                <TypewriterText text={hero.bio} speed={22} startDelay={300} showCursor={false} />
              </p>
            </Reveal>

            {/* Handwritten Note Accent */}
            <Reveal delay={180}>
              <div className="mt-2 flex items-center gap-2 text-sm font-bold text-[#FF7D6B] handwriting text-lg min-h-[1.75em]">
                <TypewriterText
                  text="Handmade with heart & imagination!"
                  speed={45}
                  startDelay={600}
                  className="text-[#FF7D6B]"
                />
                <Heart className="size-4 fill-[#FF7D6B] animate-bounce" />
              </div>
            </Reveal>

            {/* 3D Tactile CTA Buttons */}
            <Reveal delay={220}>
              <div className="mt-6 flex flex-wrap items-center gap-3.5 sm:mt-7">
                <a
                  href="#work"
                  className="cute-btn bg-[#FFC837] px-7 py-3.5 text-sm font-black text-[#2D1F1D] hover:bg-[#FFB800] sm:text-base"
                >
                  <span>{hero.ctaWorkText || 'Explore My Crafts 🎒'}</span>
                  <ArrowRight className="size-4.5 stroke-[2.5]" />
                </a>

                <a
                  href="#contact"
                  className="cute-btn bg-white px-6 py-3.5 text-sm font-black text-[#2D1F1D] hover:bg-[#FAF5EC] sm:text-base"
                >
                  <span>{hero.ctaContactText || 'Say Hello 🌸'}</span>
                </a>
              </div>
            </Reveal>

            {/* Quick Stats Flashcards */}
            <Reveal delay={280}>
              <dl className="mt-8 grid w-full max-w-xl grid-cols-2 gap-3 pt-6 sm:grid-cols-4">
                {stats.map((s, idx) => {
                  const bgColors = ['bg-[#FFE68C]', 'bg-[#A7F3D0]', 'bg-[#DDD6FE]', 'bg-[#FFB5B5]']
                  return (
                    <div
                      key={s.id || s.label}
                      className={`flex flex-col items-center justify-center rounded-2xl border-2 border-[#2D1F1D] p-3 text-center shadow-[3px_3px_0px_#2D1F1D] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[5px_5px_0px_#2D1F1D] ${bgColors[idx % bgColors.length]
                        }`}
                    >
                      <dt className="font-sans text-2xl font-black text-[#2D1F1D] sm:text-3xl">
                        {s.value}
                      </dt>
                      <dd className="mt-0.5 text-[0.65rem] font-black uppercase tracking-wider text-[#2D1F1D]/80 sm:text-[0.7rem]">
                        {s.label}
                      </dd>
                    </div>
                  )
                })}
              </dl>
            </Reveal>
          </div>

          {/* Right Column: Hero Visual with Playful Scrapbook Framing */}
          <Reveal delay={100} direction="left" className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative">
              {/* PushPin on hero frame */}
              <PushPin color="red" className="left-1/2 -top-1" />
              <WashiTape color="#FF7D6B" className="left-12 -top-4 w-24" pattern="stripes" />
              <WashiTape color="#A7F3D0" className="right-12 -bottom-4 w-24 left-auto rotate-3" pattern="dots" />

              {/* Framed Hero Image */}
              <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-[2.5rem] border-3 border-[#2D1F1D] bg-white shadow-[8px_8px_0px_#2D1F1D] transition-transform duration-300 hover:rotate-1">
                <Image
                  src={hero.image || '/images/hero-classroom.png'}
                  alt="Farah teaching in a bright, engaging English classroom in Sfax"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-center"
                />

                {/* Floating sticker pill on the image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border-2 border-[#2D1F1D] bg-white/95 p-3 shadow-[3px_3px_0px_#2D1F1D] backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-xl border border-[#2D1F1D] bg-[#FFC837] text-[#2D1F1D]">
                      <Palette className="size-4" />
                    </span>
                    <div>
                      <p className="text-xs font-black text-[#2D1F1D]">Farah Affes Studio</p>
                      <p className="text-[0.65rem] font-bold text-[#6B5550]">
                        {propsCount}+ Interactive Props Made
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border-2 border-[#2D1F1D] bg-[#FFE68C] px-2.5 py-0.5 text-[0.68rem] font-black text-[#2D1F1D]">
                    Sfax, TN 📍
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Farah's Learning Express Train on Railway Track */}
      <div className="mt-8">
        <LearningExpressTrain />
      </div>
    </section>
  )
}
