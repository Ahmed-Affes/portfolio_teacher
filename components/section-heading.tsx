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
          'flex items-center gap-3',
          align === 'center' && 'justify-center',
        )}
      >
        {number && (
          <span
            className={cn(
              'font-serif text-4xl font-bold leading-none tracking-tighter opacity-20 sm:text-5xl',
              dark ? 'text-primary' : 'text-secondary',
            )}
          >
            {number}
          </span>
        )}
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em]',
            dark
              ? 'bg-primary/20 text-primary ring-1 ring-primary/30'
              : 'bg-primary/15 text-foreground ring-1 ring-primary/25',
          )}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        className={cn(
          'mt-3 font-serif text-2xl font-semibold leading-[1.15] tracking-tight sm:text-3xl lg:text-4xl text-balance',
          dark ? 'text-secondary-foreground' : 'text-foreground',
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            'mt-3 text-sm leading-relaxed sm:text-base text-pretty',
            dark ? 'text-secondary-foreground/75' : 'text-muted-foreground',
          )}
        >
          {intro}
        </p>
      )}
    </div>
  )
}
