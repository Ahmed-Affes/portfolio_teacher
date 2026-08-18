import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  className,
}: {
  eyebrow: string
  title: string
  intro?: string
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/25 px-3 py-0.5 text-[0.75rem] font-semibold uppercase tracking-wider text-foreground shadow-xs">
        {eyebrow}
      </span>
      <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl text-balance">
        {title}
      </h2>
      {intro && (
        <p className="mt-2 text-sm sm:text-base leading-relaxed text-muted-foreground text-pretty">
          {intro}
        </p>
      )}
    </div>
  )
}
