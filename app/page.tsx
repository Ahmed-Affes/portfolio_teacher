import { Providers } from '@/components/providers'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { WorkShowcase } from '@/components/work-showcase'
import { Videos } from '@/components/videos'
import { ResourceShop } from '@/components/resource-shop'
import { WhoIServe } from '@/components/who-i-serve'
import { Testimonials } from '@/components/testimonials'
import { Faq } from '@/components/faq'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'
import { CartDrawer } from '@/components/cart-drawer'
import { BackToTop } from '@/components/back-to-top'

export default function Page() {
  return (
    <Providers>
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main>
          <Hero />
          <About />
          <WorkShowcase />
          <Videos />
          <ResourceShop />
          <WhoIServe />
          <Testimonials />
          <Faq />
          <Contact />
        </main>
        <SiteFooter />
        <CartDrawer />
        <BackToTop />
      </div>
    </Providers>
  )
}
