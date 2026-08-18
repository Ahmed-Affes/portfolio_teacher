import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  number,
  className,
  dark = false,
}: {
  eyebrow: string
  title: string
  intro?: string
  align?: 'left' | 'center'
  number?: string
  className?: string
  dark?: boolean
}) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center gap-2.5',
          align === 'center' && 'justify-center',
        )}
      >
        {number && (
          <span
            className={cn(
              'font-serif text-3xl font-bold leading-none tracking-tighter opacity-15 sm:text-4xl',
              dark ? 'text-primary' : 'text-secondary',
            )}
          >
            {number}
          </span>
        )}
        <span
          className={cn(
            'inline-flex items-center rounded-full px-3 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] sm:text-[0.7rem]',
            dark
              ? 'bg-primary/20 text-primary ring-1 ring-primary/25'
              : 'bg-primary/15 text-foreground ring-1 ring-primary/20',
          )}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        className={cn(
          'mt-2 font-serif text-xl font-semibold leading-[1.15] tracking-tight sm:text-2xl lg:text-3xl text-balance',
          dark ? 'text-secondary-foreground' : 'text-foreground',
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            'mt-1.5 text-xs leading-relaxed sm:text-sm text-pretty',
            dark ? 'text-secondary-foreground/70' : 'text-muted-foreground',
          )}
        >
          {intro}
        </p>
      )}
    </div>
  )
}
