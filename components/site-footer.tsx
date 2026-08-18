import { Globe, Mail, MapPin, MessageCircle, Send, Sparkles } from 'lucide-react'
import { CONTACT, NAV_ITEMS } from '@/lib/data'

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-secondary text-secondary-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 size-80 rounded-full bg-primary/8 blur-[100px]" />
        <div className="noise-overlay absolute inset-0 opacity-[0.03]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a href="#home" className="group flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
                <Sparkles className="size-5" />
              </span>
              <div>
                <span className="font-serif text-xl font-semibold">Farah Affes</span>
                <p className="text-[0.65rem] font-medium uppercase tracking-widest text-secondary-foreground/50">
                  English Educator
                </p>
              </div>
            </a>
            <p className="mt-5 max-w-sm leading-relaxed text-secondary-foreground/70 text-pretty">
              English educator and DIY material designer helping learners grow through
              interactive, hands-on English education.
            </p>
            <div className="mt-6 flex gap-2.5">
              {[
                { icon: Mail, href: `mailto:${CONTACT.email}`, label: 'Email' },
                {
                  icon: MessageCircle,
                  href: `https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, '')}`,
                  label: 'WhatsApp',
                },
                {
                  icon: Send,
                  href: `https://t.me/${CONTACT.email.split('@')[0]}`,
                  label: 'Telegram',
                },
                { icon: Globe, href: '#home', label: 'Website' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-secondary-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-secondary-foreground/50">
              Explore
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {NAV_ITEMS.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="text-sm text-secondary-foreground/75 transition-colors duration-300 hover:text-primary"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-secondary-foreground/50">
              Reach out
            </h3>
            <ul className="mt-5 flex flex-col gap-3.5 text-sm text-secondary-foreground/75">
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-primary" />
                <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-primary">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="size-4 shrink-0 text-primary" />
                {CONTACT.whatsapp}
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-4 shrink-0 text-primary" />
                {CONTACT.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-secondary-foreground/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Farah Affes. All rights reserved.</p>
          <p className="text-center italic sm:text-right">
            Empowering learners, one hands-on lesson at a time.
          </p>
        </div>
      </div>
    </footer>
  )
}
