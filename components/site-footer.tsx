import { Globe, Send, Mail, MapPin, MessageCircle, Sparkles } from 'lucide-react'
import { CONTACT, NAV_ITEMS } from '@/lib/data'

export function SiteFooter() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#home" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="size-5" />
              </span>
              <span className="font-serif text-lg font-semibold">Farah Affes</span>
            </a>
            <p className="mt-4 max-w-sm leading-relaxed text-secondary-foreground/70 text-pretty">
              English educator and DIY material designer helping learners grow through
              interactive, hands-on English education.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { icon: Mail, href: `mailto:${CONTACT.email}`, label: 'Email' },
                {
                  icon: MessageCircle,
                  href: `https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, '')}`,
                  label: 'WhatsApp',
                },
                { icon: Send, href: '#', label: 'Telegram' },
                { icon: Globe, href: '#', label: 'Website' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <s.icon className="size-4.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary-foreground/60">
              Explore
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="text-secondary-foreground/80 transition-colors hover:text-primary"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary-foreground/60">
              Reach out
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-secondary-foreground/80">
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-primary">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="size-4 text-primary" />
                {CONTACT.whatsapp}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                {CONTACT.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-secondary-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Farah Affes. All rights reserved.</p>
          <p>Empowering learners, one hands-on lesson at a time.</p>
        </div>
      </div>
    </footer>
  )
}
