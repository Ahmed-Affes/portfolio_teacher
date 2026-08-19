'use client'

import Link from 'next/link'
import { Globe, Lock, Mail, MapPin, MessageCircle, Send, Sparkles, Heart } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/data'
import { usePortfolio } from '@/lib/portfolio-context'
import { CloudDivider, DoodleStar } from '@/components/cloud-decorations'

export function SiteFooter() {
  const { state } = usePortfolio()
  const { contact } = state

  const whatsappRaw = contact.whatsappRaw || contact.whatsapp.replace(/[^0-9]/g, '')

  return (
    <footer className="relative overflow-hidden bg-[#FAF5EC] text-[#2D1F1D] border-t-3 border-[#2D1F1D]">
      <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-18">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a href="#home" className="group flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl border-2 border-[#2D1F1D] bg-[#FFC837] text-[#2D1F1D] shadow-[3px_3px_0px_#2D1F1D] transition-transform duration-200 group-hover:rotate-12">
                <Sparkles className="size-5 fill-[#FF7D6B] text-[#2D1F1D]" />
              </span>
              <div>
                <span className="font-sans text-xl font-black text-[#2D1F1D]">Farah Affes</span>
                <p className="text-xs font-bold text-[#FF7D6B] flex items-center gap-1">
                  <span>English Educator &amp; Studio</span>
                  <Heart className="size-3 fill-[#FF7D6B]" />
                </p>
              </div>
            </a>
            <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-[#6B5550] text-pretty">
              English educator and DIY material designer helping learners grow through
              interactive, hands-on English education in {contact.location}.
            </p>
            <div className="mt-5 flex gap-2.5">
              {[
                { icon: Mail, href: `mailto:${contact.email}`, label: 'Email', bg: 'bg-[#FFE68C]' },
                {
                  icon: MessageCircle,
                  href: `https://wa.me/${whatsappRaw}`,
                  label: 'WhatsApp',
                  bg: 'bg-[#A7F3D0]',
                },
                {
                  icon: Send,
                  href: `https://t.me/${contact.email.split('@')[0]}`,
                  label: 'Telegram',
                  bg: 'bg-[#DDD6FE]',
                },
                { icon: Globe, href: '#home', label: 'Website', bg: 'bg-[#FFB5B5]' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className={`flex size-10 items-center justify-center rounded-2xl border-2 border-[#2D1F1D] ${s.bg} text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_#2D1F1D] active:translate-y-0 active:shadow-none`}
                >
                  <s.icon className="size-4.5 stroke-[2.5]" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-[#2D1F1D]">
              Explore Sections 🎒
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {NAV_ITEMS.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="text-xs font-bold text-[#6B5550] transition-colors hover:text-[#FF7D6B]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-[#2D1F1D]">
              Contact Details 🌸
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-xs font-bold text-[#6B5550]">
              <li className="flex items-center gap-2.5">
                <span className="flex size-7 items-center justify-center rounded-xl border border-[#2D1F1D] bg-[#FFE68C] text-[#2D1F1D]">
                  <Mail className="size-3.5" />
                </span>
                <a href={`mailto:${contact.email}`} className="hover:text-[#FF7D6B]">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex size-7 items-center justify-center rounded-xl border border-[#2D1F1D] bg-[#A7F3D0] text-[#2D1F1D]">
                  <MessageCircle className="size-3.5" />
                </span>
                <a
                  href={`https://wa.me/${whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF7D6B]"
                >
                  {contact.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex size-7 items-center justify-center rounded-xl border border-[#2D1F1D] bg-[#DDD6FE] text-[#2D1F1D]">
                  <MapPin className="size-3.5" />
                </span>
                <span>{contact.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t-2 border-[#2D1F1D]/10 pt-6 text-xs font-bold text-[#6B5550] sm:flex-row">
          <p>© {new Date().getFullYear()} Farah Affes Studio. All rights reserved.</p>
          <p className="text-center handwriting text-base text-[#FF7D6B] font-bold sm:text-right">
            Handmade with love &amp; imagination in Sfax 🌸
          </p>
        </div>
      </div>
    </footer>
  )
}
