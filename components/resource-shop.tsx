'use client'

import Image from 'next/image'
import { Download, Info, Repeat, ShoppingBag } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { PRODUCTS, type Product } from '@/lib/data'
import { useCart } from '@/components/cart-provider'

export function ResourceShop() {
  const { addItem } = useCart()

  const handleAdd = (product: Product, mode: 'buy' | 'rent') => {
    const price = mode === 'buy' ? product.buyPrice : product.rentPrice
    if (price == null) return
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      mode,
      price,
    })
  }

  return (
    <section id="shop" className="relative scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 via-transparent to-muted/30" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            number="04"
            eyebrow="Resource hub"
            title="Educational materials & rental shop"
            intro="DIY props, printable games, and physical classroom sets to buy or rent."
            align="center"
          />
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.id} delay={i * 60}>
              <div className="card-shine group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5">
                <div className="relative aspect-[4/3.2] w-full overflow-hidden bg-muted">
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute left-3 top-3 rounded-full bg-card/95 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-foreground shadow-md backdrop-blur-sm">
                    {product.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-base font-semibold leading-tight text-foreground sm:text-lg">
                    {product.name}
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-4 flex items-end gap-4 border-t border-border/60 pt-4">
                    {product.buyPrice != null && (
                      <div>
                        <span className="block text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                          Buy
                        </span>
                        <span className="font-serif text-xl font-bold text-foreground">
                          {product.buyPrice}{' '}
                          <span className="text-xs font-sans font-normal text-muted-foreground">
                            TND
                          </span>
                        </span>
                      </div>
                    )}
                    {product.rentPrice != null && (
                      <div>
                        <span className="block text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                          Rent / day
                        </span>
                        <span className="font-serif text-xl font-bold text-foreground">
                          {product.rentPrice}{' '}
                          <span className="text-xs font-sans font-normal text-muted-foreground">
                            TND
                          </span>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
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
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border bg-card px-3 py-2.5 text-xs font-semibold text-foreground transition-all duration-300 hover:border-secondary hover:bg-secondary hover:text-secondary-foreground"
                      >
                        <Repeat className="size-3.5" />
                        Rent
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mx-auto mt-8 flex max-w-lg items-start gap-3 rounded-2xl border border-border/60 bg-card/80 p-4 text-center shadow-sm backdrop-blur-sm sm:text-left">
            <span className="mx-auto flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary sm:mx-0">
              <Info className="size-4" />
            </span>
            <p className="text-xs leading-relaxed text-muted-foreground text-pretty sm:text-sm">
              Rentals are available locally in Tunis. Add items to your cart and Farah will
              confirm availability and pickup details.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
