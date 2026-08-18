'use client'

import Image from 'next/image'
import { Check, Download, Info, Repeat, ShoppingBag, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { type Product } from '@/lib/data'
import { useCart } from '@/components/cart-provider'
import { usePortfolio } from '@/lib/portfolio-context'

export function ResourceShop() {
  const { state } = usePortfolio()
  const { products } = state
  const { addItem } = useCart()

  const handleAdd = (product: Product, mode: 'buy' | 'rent') => {
    const price = mode === 'buy' ? product.buyPrice : product.rentPrice
    if (price == null) return
    addItem({ productId: product.id, name: product.name, image: product.image, mode, price })
  }

  return (
    <section id="shop" className="section-shell relative bg-muted/30">
      <div className="section-inner section-stack">
        <Reveal>
          <SectionHeading
            number="04"
            eyebrow="Resource Hub"
            title="Educational materials & rental shop"
            intro="Handcrafted props, printable worksheet packs, and physical classroom kits to buy or rent in Sfax and across Tunisia."
            align="center"
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 50}>
              <div className="card-shine group flex h-full flex-col overflow-hidden rounded-2xl border border-border/75 bg-card shadow-sm transform-gpu transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 will-change-transform">
                {/* Product Image */}
                <div className="relative aspect-[4/3.2] w-full overflow-hidden isolate bg-muted">
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transform-gpu transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute left-3 top-3 rounded-full bg-card/95 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-foreground shadow-md backdrop-blur-sm">
                    {product.category}
                  </span>
                </div>

                {/* Product Info */}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="font-serif text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-lg">
                    {product.name}
                  </h3>

                  <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>

                  {/* Feature badges */}
                  {product.features && (
                    <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border/50 pt-2.5">
                      {product.features.slice(0, 2).map((feat) => (
                        <span
                          key={feat}
                          className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground"
                        >
                          <Check className="size-2.5 text-primary" />
                          {feat}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Pricing Bar */}
                  <div className="mt-4 flex items-end justify-between border-t border-border/60 pt-3.5">
                    {product.buyPrice != null && (
                      <div>
                        <span className="block text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
                          Buy
                        </span>
                        <span className="font-serif text-lg font-bold text-foreground sm:text-xl">
                          {product.buyPrice}{' '}
                          <span className="text-xs font-sans font-normal text-muted-foreground">
                            TND
                          </span>
                        </span>
                      </div>
                    )}
                    {product.rentPrice != null && (
                      <div className="text-right">
                        <span className="block text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
                          Rent / day
                        </span>
                        <span className="font-serif text-lg font-bold text-foreground sm:text-xl">
                          {product.rentPrice}{' '}
                          <span className="text-xs font-sans font-normal text-muted-foreground">
                            TND
                          </span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Buy / Rent Buttons */}
                  <div className="mt-4 flex gap-2">
                    {product.options.includes('buy') && (
                      <button
                        type="button"
                        onClick={() => handleAdd(product, 'buy')}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
                      >
                        {product.category === 'Digital Download' ? (
                          <Download className="size-3.5" />
                        ) : (
                          <ShoppingBag className="size-3.5" />
                        )}
                        {product.category === 'Digital Download' ? 'Download' : 'Buy'}
                      </button>
                    )}
                    {product.options.includes('rent') && (
                      <button
                        type="button"
                        onClick={() => handleAdd(product, 'rent')}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border/80 bg-card px-3 py-2.5 text-xs font-semibold text-foreground transition-all duration-300 hover:border-secondary hover:bg-secondary hover:text-secondary-foreground"
                      >
                        <Repeat className="size-3.5" /> Rent
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Informational note */}
        <Reveal delay={120}>
          <div className="mx-auto flex max-w-lg items-start gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-sm backdrop-blur-sm sm:text-left">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-foreground">
              <Info className="size-4" />
            </span>
            <p className="text-xs leading-relaxed text-muted-foreground text-pretty sm:text-sm">
              Prop rentals are available locally across the greater Tunis area. Add items to your cart and Farah will coordinate sanitation, pickup, or delivery dates.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
