'use client'

import { useState } from 'react'
import { Sparkles, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LearningTrainProps {
  items?: string[]
}

const DEFAULT_CARTS = [
  { text: 'Handmade Classroom Props', icon: '✂️', color: 'bg-[#FFE68C]', passenger: '🐰' },
  { text: 'Printable PDF Worksheets', icon: '📄', color: 'bg-[#A7F3D0]', passenger: null },
  { text: 'Teacher Training Workshops', icon: '🌸', color: 'bg-[#FFB5B5]', passenger: '🐻' },
  { text: 'ESL Curriculum & Phonics', icon: '📚', color: 'bg-[#DDD6FE]', passenger: null },
  { text: 'Interactive Story Puppets', icon: '🎭', color: 'bg-[#BAE6FD]', passenger: '🦊' },
  { text: 'Sensory Learning Quest Kits', icon: '🎒', color: 'bg-[#FED7AA]', passenger: null },
  { text: 'Crafted with Love in Sfax', icon: '💖', color: 'bg-[#FECDD3]', passenger: '🐱' },
]

export function LearningExpressTrain({ items }: LearningTrainProps) {
  const carts = DEFAULT_CARTS

  return (
    <div className="relative w-full select-none overflow-hidden py-3">
      {/* Background Railway Track */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3.5 h-4 flex items-center" aria-hidden="true">
        {/* Top rail */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-[#8C4B1B]/40" />
        
        {/* Wooden Ties / Sleepers pattern */}
        <div className="h-3 w-full bg-[repeating-linear-gradient(90deg,#D49A5B_0_5px,transparent_5px_18px)] opacity-50" />
        
        {/* Bottom rail */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#8C4B1B]/40" />
      </div>

      {/* Scrolling Train Convoy */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-end gap-0 whitespace-nowrap hover:[animation-play-state:paused] pb-1 cursor-pointer">
          {/* Render 2 identical train sets for infinite seamless loop */}
          {[0, 1].map((setIdx) => (
            <div key={setIdx} className="flex items-end gap-0 shrink-0">
              {/* 1. FRONT STEAM LOCOMOTIVE ENGINE */}
              <div className="relative flex items-end mr-2">
                {/* Smoke Puffs */}
                <div className="absolute -top-4 left-6 flex gap-1 pointer-events-none">
                  <span className="text-[0.65rem] animate-float opacity-75">☁️</span>
                  <span className="text-[0.55rem] animate-pulse-gentle opacity-60">✨</span>
                </div>

                <div className="relative flex flex-col items-center">
                  {/* Locomotive Body */}
                  <div className="flex items-end">
                    {/* Cab */}
                    <div className="relative flex h-10 w-12 flex-col items-center justify-between rounded-t-xl border-2 border-[#2D1F1D] bg-[#FF7D6B] p-1 shadow-[2px_2px_0px_#2D1F1D]">
                      {/* Bunny Conductor popping out window */}
                      <div className="absolute -top-3 left-2 text-sm transition-transform hover:scale-125" title="Conductor Bunny 🐰">
                        🐰
                      </div>
                      {/* Cab Window */}
                      <div className="mt-1 h-3.5 w-6 rounded-md border border-[#2D1F1D] bg-[#BAE6FD] flex items-center justify-center">
                        <span className="text-[0.45rem] font-black text-[#2D1F1D]">FARAH</span>
                      </div>
                      <span className="text-[0.55rem] font-black text-white">N° 1</span>
                    </div>

                    {/* Boiler Cylinder & Chimney */}
                    <div className="relative flex h-8 w-16 items-center justify-center rounded-r-2xl border-2 border-l-0 border-[#2D1F1D] bg-[#FFC837] shadow-[2px_2px_0px_#2D1F1D]">
                      {/* Chimney Funnel */}
                      <div className="absolute -top-3.5 left-2 h-4 w-3 rounded-t-md border-2 border-b-0 border-[#2D1F1D] bg-[#2D1F1D]" />
                      
                      {/* Golden Bell / Dome */}
                      <div className="absolute -top-2 left-8 size-2.5 rounded-full border border-[#2D1F1D] bg-[#FFE68C]" />

                      {/* Headlight */}
                      <div className="absolute -right-1 top-2 size-3 rounded-full border border-[#2D1F1D] bg-[#FFF9E6] shadow-xs" />

                      <span className="text-[0.65rem] font-black uppercase tracking-wider text-[#2D1F1D] pl-1">
                        EXPRESS 🚂
                      </span>
                    </div>
                  </div>

                  {/* Locomotive Wheels */}
                  <div className="flex w-full justify-between px-1.5 -mt-1.5 z-10">
                    <div className="size-4 rounded-full border-2 border-[#2D1F1D] bg-[#4A3B32] shadow-xs flex items-center justify-center">
                      <div className="size-1 rounded-full bg-white" />
                    </div>
                    <div className="size-4 rounded-full border-2 border-[#2D1F1D] bg-[#4A3B32] shadow-xs flex items-center justify-center">
                      <div className="size-1 rounded-full bg-white" />
                    </div>
                    <div className="size-4 rounded-full border-2 border-[#2D1F1D] bg-[#4A3B32] shadow-xs flex items-center justify-center">
                      <div className="size-1 rounded-full bg-white" />
                    </div>
                  </div>
                </div>

                {/* Coupler Link to first cart */}
                <div className="h-1 w-3 bg-[#2D1F1D] mb-2" />
              </div>

              {/* 2. CARGO WAGONS / CARTS */}
              {carts.map((cart, cIdx) => (
                <div key={cIdx} className="relative flex items-end">
                  <div className="relative flex flex-col items-center">
                    {/* Jumping Passenger Animal (if any) */}
                    {cart.passenger && (
                      <span
                        className="absolute -top-3 left-3 text-xs transition-transform duration-200 hover:-translate-y-1 hover:scale-125 z-20"
                        title="Happy Passenger"
                      >
                        {cart.passenger}
                      </span>
                    )}

                    {/* Cart Body */}
                    <div
                      className={cn(
                        'relative flex h-8 items-center gap-1.5 rounded-xl border-2 border-[#2D1F1D] px-3 shadow-[2px_2px_0px_#2D1F1D] transition-transform duration-200 hover:-translate-y-0.5',
                        cart.color,
                      )}
                    >
                      {/* Wooden Slat Detail Line */}
                      <div className="absolute inset-x-1 top-1.5 h-[1px] bg-[#2D1F1D]/15" />

                      <span className="text-xs">{cart.icon}</span>
                      <span className="font-sans text-xs font-black uppercase tracking-wider text-[#2D1F1D]">
                        {cart.text}
                      </span>
                    </div>

                    {/* Cart Wheels */}
                    <div className="flex w-full justify-between px-3 -mt-1.5 z-10">
                      <div className="size-3.5 rounded-full border-2 border-[#2D1F1D] bg-[#4A3B32] shadow-xs flex items-center justify-center">
                        <div className="size-1 rounded-full bg-white" />
                      </div>
                      <div className="size-3.5 rounded-full border-2 border-[#2D1F1D] bg-[#4A3B32] shadow-xs flex items-center justify-center">
                        <div className="size-1 rounded-full bg-white" />
                      </div>
                    </div>
                  </div>

                  {/* Coupler Link between carts */}
                  <div className="h-1 w-3 bg-[#2D1F1D] mb-2" />
                </div>
              ))}

              {/* 3. CABOOSE / END GUARD VAN */}
              <div className="relative flex items-end mr-6">
                <div className="relative flex flex-col items-center">
                  <div className="flex h-9 w-12 flex-col items-center justify-between rounded-t-xl border-2 border-[#2D1F1D] bg-[#FF7D6B] p-1 shadow-[2px_2px_0px_#2D1F1D]">
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-[#10B981] animate-ping" />
                      <span className="text-[0.45rem] font-black text-white">END</span>
                    </div>
                    <span className="text-xs">🌸</span>
                  </div>

                  {/* Caboose Wheels */}
                  <div className="flex w-full justify-between px-1.5 -mt-1.5 z-10">
                    <div className="size-3.5 rounded-full border-2 border-[#2D1F1D] bg-[#4A3B32] shadow-xs flex items-center justify-center">
                      <div className="size-1 rounded-full bg-white" />
                    </div>
                    <div className="size-3.5 rounded-full border-2 border-[#2D1F1D] bg-[#4A3B32] shadow-xs flex items-center justify-center">
                      <div className="size-1 rounded-full bg-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
