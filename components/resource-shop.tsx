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
    addItem({ productId: product.id, name: product.name, image: product.image, mode, price })
  }

  return (
    <section id="shop" className="section-shell relative bg-muted/20">
      <div className="section-inner section-stack">
        <Reveal>
          <SectionHeading
            number="04"
            eyebrow="Resource hub"
            title="Educational materials & rental shop"
            intro="DIY props, printable games, and classroom sets to buy or rent."
            align="center"
          />
        </Reveal>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4 lg:gap-4">
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.id} delay={i * 30}>
              <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm sm:rounded-2xl">
                <div className="relative aspect-[4/3] bg-muted">
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-card/95 px-1.5 py-0.5 text-[0.55rem] font-bold uppercase text-foreground sm:left-2 sm:top-2 sm:px-2 sm:text-[0.6rem]">
                    {product.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-2.5 sm:p-3">
                  <h3 className="font-serif text-xs font-semibold leading-snug text-foreground line-clamp-2 sm:text-sm">
                    {product.name}
                  </h3>
                  <div className="mt-auto pt-2">
                    <div className="flex items-baseline gap-2 text-foreground">
                      {product.buyPrice != null && (
                        <span className="font-serif text-sm font-bold sm:text-base">
                          {product.buyPrice} <span className="text-[0.6rem] font-normal text-muted-foreground">TND</span>
                        </span>
                      )}
                      {product.rentPrice != null && (
                        <span className="text-[0.6rem] text-muted-foreground sm:text-xs">
                          / {product.rentPrice} rent
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex gap-1">
                      {product.options.includes('buy') && (
                        <button
                          type="button"
                          onClick={() => handleAdd(product, 'buy')}
                          className="inline-flex flex-1 items-center justify-center gap-1 rounded-full bg-primary py-1.5 text-[0.6rem] font-semibold text-primary-foreground sm:py-2 sm:text-[0.65rem]"
                        >
                          {product.category === 'Digital Download' ? <Download className="size-3" /> : <ShoppingBag className="size-3" />}
                          Buy
                        </button>
                      )}
                      {product.options.includes('rent') && (
                        <button
                          type="button"
                          onClick={() => handleAdd(product, 'rent')}
                          className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-border py-1.5 text-[0.6rem] font-semibold sm:py-2 sm:text-[0.65rem]"
                        >
                          <Repeat className="size-3" /> Rent
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="flex items-start justify-center gap-2 text-center text-[0.65rem] text-muted-foreground sm:text-xs">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          Rentals available locally in Tunis — add to cart for availability confirmation.
        </p>
      </div>
    </section>
  )
}
