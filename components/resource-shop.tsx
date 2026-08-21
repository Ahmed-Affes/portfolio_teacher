'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Check, Download, Info, Repeat, ShoppingBag, Sparkles, Heart, Package, Tag } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { SectionScene } from '@/components/section-scene'
import { type Product } from '@/lib/data'
import { useCart } from '@/components/cart-provider'
import { usePortfolio } from '@/lib/portfolio-context'
import {
  CraftPriceTag,
  MarketAwning,
  MarketShelfLedge,
  CuteSticker,
  FloatingCloud,
  DoodleRainbow,
  SmilingFlower,
  SmilingStar,
  PastelBalloon,
} from '@/components/cloud-decorations'
import { cn } from '@/lib/utils'

const SHOP_CATEGORIES = [
  { id: 'all', label: 'All Atelier Items 🛒' },
  { id: 'Props', label: 'Handmade Props ✂️' },
  { id: 'Digital Download', label: 'Printables 📄' },
  { id: 'Kits', label: 'Classroom Kits 🎒' },
]

export function ResourceShop() {
  const { state } = usePortfolio()
  const { products } = state
  const { addItem, count, openCart } = useCart()
  const [activeCategory, setActiveCategory] = useState('all')

  const activeProducts = products.filter((p) => p.isActive !== false)

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return activeProducts
    if (activeCategory === 'Props') return activeProducts.filter((p) => p.category.toLowerCase().includes('prop') || p.category.toLowerCase().includes('puppet'))
    if (activeCategory === 'Digital Download') return activeProducts.filter((p) => p.category.toLowerCase().includes('digital') || p.category.toLowerCase().includes('download') || p.category.toLowerCase().includes('worksheet'))
    if (activeCategory === 'Kits') return activeProducts.filter((p) => p.category.toLowerCase().includes('kit') || p.category.toLowerCase().includes('pack'))
    return activeProducts
  }, [activeProducts, activeCategory])

  const handleAdd = (product: Product, mode: 'buy' | 'rent') => {
    const price = mode === 'buy' ? product.buyPrice : product.rentPrice
    if (price == null) return
    addItem({ productId: product.id, name: product.name, image: product.image, mode, price })
  }

  const totalCartCount = count ?? 0

  return (
    <section id="shop" className="section-shell relative bg-[#FFFDF9] py-10 sm:py-14 lg:py-16 overflow-hidden">
      {/* Happy Stationary Decorations */}
      <FloatingCloud mood="smiling" size="md" className="top-6 right-10 opacity-60 hidden md:block" />
      <DoodleRainbow size={64} className="top-16 left-8 opacity-70 hidden lg:block" />
      <SmilingStar size={34} color="#FFC837" className="bottom-12 right-12 opacity-75 hidden sm:block" />
      <SmilingFlower size={42} color="#FFB5B5" className="bottom-20 left-6 opacity-70 hidden md:block" />
      <PastelBalloon color="#FF7D6B" size={44} className="top-1/2 right-4 opacity-70 hidden xl:block" />

      <SectionScene theme="shop" pattern="dots" />

      <div className="section-inner section-stack">
        {/* Header & Cart Badge */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionHeading
              number="04"
              eyebrow="Farah's Atelier Market 🛒"
              title="Handcrafted educational tools & printables"
              intro="Buy or rent handmade classroom props, tactile phonics puppets, and printable activity packs crafted with love in Sfax."
              align="left"
              typewriterIntro
            />
          </Reveal>

          {/* Market Cart Status Pill */}
          <Reveal delay={60}>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openCart}
                className="cute-btn bg-[#FFE68C] px-4 py-2 text-xs font-black text-[#2D1F1D] hover:bg-[#FFC837] cursor-pointer"
              >
                <ShoppingBag className="size-4 text-[#FF7D6B]" />
                <span>Cart ({totalCartCount})</span>
                {totalCartCount > 0 && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-[#FF7D6B] text-[0.65rem] text-white">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </div>
          </Reveal>
        </div>

        {/* Category Filter Chips with Horizontal Scroll Fade */}
        <Reveal delay={80} className="w-full">
          <div className="relative -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="scroll-fade-r sm:[mask-image:none] scrollbar-hide flex gap-2 sm:gap-2.5 overflow-x-auto pb-2 pt-1 snap-x snap-mandatory sm:flex-wrap sm:overflow-visible pr-8 sm:pr-0">
              {SHOP_CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      'group inline-flex shrink-0 snap-start items-center gap-1.5 rounded-2xl border-[1.5px] border-[#2D1F1D]/50 px-3.5 py-2 text-xs font-black transition-all cursor-pointer min-h-[44px] touch-manipulation',
                      isSelected
                        ? 'bg-[#FFC837] text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] -translate-y-0.5'
                        : 'bg-white text-[#6B5550] shadow-xs hover:bg-[#FFE68C]/40 hover:text-[#2D1F1D]',
                    )}
                  >
                    <span>{cat.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* The Artisan Market Stall Canopy & Wooden Shelf Frame */}
        <div className="relative rounded-[1.6rem] sm:rounded-[2.5rem] border-[1.5px] border-[#3E251E]/40 bg-[#FAF5EC] p-3.5 sm:p-6 lg:p-8 shadow-[0_8px_24px_rgba(45,31,29,0.06),3px_3px_0px_rgba(45,31,29,0.55)] sm:shadow-[0_12px_30px_rgba(45,31,29,0.08),4px_4px_0px_rgba(45,31,29,0.6)]">
          {/* Mediterranean Striped Market Awning Header */}
          <div className="-mx-3.5 -mt-3.5 mb-5 sm:-mx-6 sm:-mt-6 sm:mb-8 lg:-mx-8 lg:-mt-8">
            <MarketAwning />
          </div>

          {/* Product Cards Display Stand */}
          <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product, i) => {
              const primaryPrice = product.buyPrice ?? product.rentPrice ?? 0
              const priceTagLabel = product.category === 'Digital Download' ? 'DOWNLOAD' : product.options.includes('rent') ? 'BUY / RENT' : 'BUY'

              return (
                <Reveal key={product.id} delay={i * 40}>
                  <div className="group relative flex h-full flex-col">
                    {/* Hanging Kraft Paper Price Tag with Jute String Loop */}
                    <CraftPriceTag price={primaryPrice} label={priceTagLabel} />

                    {/* Product Card Container with organic craft squircle radii & subtle tilt */}
                    <div className={cn(
                      'relative flex flex-1 flex-col overflow-hidden rounded-[1.6rem_1.2rem_1.8rem_1.4rem] sm:rounded-[2.4rem_1.4rem_2.2rem_1.6rem] border-[1.5px] border-[#3E251E]/40 bg-white shadow-[0_6px_16px_rgba(45,31,29,0.05),2.5px_2.5px_0px_rgba(45,31,29,0.6)] sm:shadow-[0_8px_20px_rgba(45,31,29,0.06),3px_3px_0px_rgba(45,31,29,0.65)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(45,31,29,0.1),4.5px_4.5px_0px_rgba(45,31,29,0.75)]',
                      i % 2 === 0 ? 'rotate-0 sm:rotate-[-0.4deg]' : 'rotate-0 sm:rotate-[0.4deg]',
                    )}>
                      {/* Product Image Preview */}
                      <div className="relative aspect-[4/3] sm:aspect-[4/3.2] w-full overflow-hidden bg-[#FFF9E6] border-b border-[#2D1F1D]/20">
                        <Image
                          src={product.image || '/placeholder.svg'}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute left-2.5 top-2.5 rounded-full border border-[#2D1F1D]/30 bg-[#FFE68C] px-2.5 py-0.5 text-[0.62rem] sm:text-[0.65rem] font-black uppercase text-[#2D1F1D] shadow-xs">
                          {product.category}
                        </span>
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-1 flex-col p-3.5 sm:p-4 bg-white justify-between">
                        <div>
                          <h3 className="font-sans text-sm sm:text-base font-black leading-snug text-[#2D1F1D] transition-colors group-hover:text-[#FF7D6B]">
                            {product.name}
                          </h3>

                          <p className="mt-1 text-xs font-medium leading-relaxed text-[#6B5550] line-clamp-2">
                            {product.description}
                          </p>

                          {/* Highlights */}
                          {product.features && (
                            <div className="mt-2 flex flex-wrap gap-1 border-t border-[#2D1F1D]/10 pt-2">
                              {product.features.slice(0, 2).map((feat) => (
                                <span
                                  key={feat}
                                  className="inline-flex items-center gap-1 rounded-lg border border-[#2D1F1D]/30 bg-[#FAF5EC] px-1.5 py-0.5 text-[0.6rem] font-bold text-[#2D1F1D]"
                                >
                                  <Check className="size-2.5 text-[#10B981] stroke-[3]" />
                                  <span className="truncate max-w-[150px]">{feat}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Pricing Bar & Action Buttons */}
                        <div className="mt-2.5 sm:mt-3 border-t border-[#2D1F1D]/10 pt-2.5 sm:pt-3">
                          <div className="flex items-center justify-between text-xs font-black text-[#2D1F1D]">
                            {product.buyPrice != null && (
                              <div>
                                <span className="block text-[0.58rem] sm:text-[0.6rem] font-bold uppercase text-[#6B5550]">Buy</span>
                                <span className="text-xs sm:text-sm font-black">{product.buyPrice} DT</span>
                              </div>
                            )}
                            {product.rentPrice != null && (
                              <div className="text-right">
                                <span className="block text-[0.58rem] sm:text-[0.6rem] font-bold uppercase text-[#6B5550]">Rent/Day</span>
                                <span className="text-xs sm:text-sm font-black text-[#FF7D6B]">{product.rentPrice} DT</span>
                              </div>
                            )}
                          </div>

                          <div className="mt-2 flex gap-1.5">
                            {product.options.includes('buy') && (
                              <button
                                type="button"
                                onClick={() => handleAdd(product, 'buy')}
                                className="cute-btn flex-1 bg-[#FFC837] py-2 text-[0.7rem] font-black text-[#2D1F1D] hover:bg-[#FFB800] min-h-[38px] touch-manipulation"
                              >
                                {product.category === 'Digital Download' ? (
                                  <Download className="size-3" />
                                ) : (
                                  <ShoppingBag className="size-3" />
                                )}
                                <span>{product.category === 'Digital Download' ? 'Download' : 'Buy'}</span>
                              </button>
                            )}
                            {product.options.includes('rent') && (
                              <button
                                type="button"
                                onClick={() => handleAdd(product, 'rent')}
                                className="cute-btn flex-1 bg-[#A7F3D0] py-2 text-[0.7rem] font-black text-[#2D1F1D] hover:bg-[#86EFAC] min-h-[38px] touch-manipulation"
                              >
                                <Repeat className="size-3" />
                                <span>Rent</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* Handcrafted Wooden Shelf Display Ledge at bottom of the row */}
          <div className="mt-6">
            <MarketShelfLedge />
          </div>
        </div>
      </div>
    </section>
  )
}
