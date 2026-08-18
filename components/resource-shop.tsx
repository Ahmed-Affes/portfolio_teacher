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
    <section id="shop" className="scroll-mt-20 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Resource hub"
          title="Educational materials & rental shop"
          intro="DIY props, printable games, and physical classroom sets to buy or rent."
          align="center"
        />

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/10"
            >
              <div className="relative aspect-[4/3.2] w-full overflow-hidden bg-muted">
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
                <span className="absolute left-2.5 top-2.5 rounded-full bg-card/95 px-2.5 py-0.5 text-[0.7rem] font-semibold text-foreground backdrop-blur shadow-xs">
                  {product.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-serif text-base font-semibold leading-tight text-foreground">
                  {product.name}
                </h3>
                <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {product.description}
                </p>

                <div className="mt-3.5 flex items-end gap-3 border-t border-border/70 pt-3">
                  {product.buyPrice != null && (
                    <div>
                      <span className="block text-[0.7rem] font-medium text-muted-foreground">Buy</span>
                      <span className="font-serif text-lg font-bold text-foreground">
                        {product.buyPrice} <span className="text-xs font-sans font-normal text-muted-foreground">TND</span>
                      </span>
                    </div>
                  )}
                  {product.rentPrice != null && (
                    <div>
                      <span className="block text-[0.7rem] font-medium text-muted-foreground">
                        Rent / day
                      </span>
                      <span className="font-serif text-lg font-bold text-foreground">
                        {product.rentPrice} <span className="text-xs font-sans font-normal text-muted-foreground">TND</span>
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {product.options.includes('buy') && (
                    <button
                      type="button"
                      onClick={() => handleAdd(product, 'buy')}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-xs transition-all hover:-translate-y-0.5 hover:shadow"
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
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground shadow-xs transition-all hover:bg-muted hover:-translate-y-0.5"
                    >
                      <Repeat className="size-3.5" />
                      Rent
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-xl text-center text-xs font-medium text-muted-foreground text-pretty">
          💡 Rentals are available locally in Tunis. Add items to your cart and Farah will
          confirm availability and pickup details.
        </p>
      </div>
    </section>
  )
}
