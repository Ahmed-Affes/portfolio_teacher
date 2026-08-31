import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { WorkShowcase } from '@/components/work-showcase'
import { Videos } from '@/components/videos'
import { WhoIServe } from '@/components/who-i-serve'
import { Testimonials } from '@/components/testimonials'
import { Faq } from '@/components/faq'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'
import { BackToTop } from '@/components/back-to-top'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'

export default function Page() {
  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <WorkShowcase />
        <Videos />
        <WhoIServe />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <BackToTop />
      <MobileBottomNav />
    </div>
  )
}
