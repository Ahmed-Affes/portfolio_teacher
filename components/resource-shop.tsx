'use client'

import Image from 'next/image'
import { Download, ShoppingBag, Repeat } from 'lucide-react'
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
    <section id="shop" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Resource hub"
          title="Educational materials & rental shop"
          intro="High-quality DIY props, printable games, and physical classroom sets available for purchase or temporary rental for local workshops and lessons."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/10"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
                  {product.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-lg font-semibold leading-tight">
                  {product.name}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>

                <div className="mt-4 flex items-end gap-3">
                  {product.buyPrice != null && (
                    <div>
                      <span className="block text-xs text-muted-foreground">Buy</span>
                      <span className="font-serif text-xl font-semibold">
                        {product.buyPrice} TND
                      </span>
                    </div>
                  )}
                  {product.rentPrice != null && (
                    <div>
                      <span className="block text-xs text-muted-foreground">
                        Rent / day
                      </span>
                      <span className="font-serif text-xl font-semibold">
                        {product.rentPrice} TND
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {product.options.includes('buy') && (
                    <button
                      type="button"
                      onClick={() => handleAdd(product, 'buy')}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                    >
                      {product.category === 'Digital Download' ? (
                        <Download className="size-4" />
                      ) : (
                        <ShoppingBag className="size-4" />
                      )}
                      {product.category === 'Digital Download' ? 'Download' : 'Buy'}
                    </button>
                  )}
                  {product.options.includes('rent') && (
                    <button
                      type="button"
                      onClick={() => handleAdd(product, 'rent')}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                    >
                      <Repeat className="size-4" />
                      Rent
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground text-pretty">
          Rentals are available locally in Tunis. Add items to your cart and I&apos;ll
          confirm availability and pickup details after you check out.
        </p>
      </div>
    </section>
  )
}
