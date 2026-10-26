import { useEffect, useRef, useState } from 'react'

/**
 * Accordéon accessible partagé : chaque concept fournit son propre
 * rendu via la fonction `render`. Gère aria-expanded, aria-controls,
 * la navigation clavier et l'ouverture exclusive.
 */
export interface AccordionEntry {
  question: string
  answer: string
}

export function Accordion({
  items,
  render,
  className,
}: {
  items: readonly AccordionEntry[]
  className?: string
  render: (props: {
    entry: AccordionEntry
    index: number
    open: boolean
    toggle: () => void
    buttonProps: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> & {
      ref: (el: HTMLButtonElement | null) => void
    }
    regionProps: React.HTMLAttributes<HTMLDivElement>
  }) => React.ReactNode
}) {
  const [openIndex, setOpenIndex] = useState<number>(0)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    buttonRefs.current = buttonRefs.current.slice(0, items.length)
  }, [items.length])

  const toggle = (i: number) => setOpenIndex((cur) => (cur === i ? -1 : i))

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = items.length - 1
    let target: number | null = null
    if (e.key === 'ArrowDown') target = i === last ? 0 : i + 1
    else if (e.key === 'ArrowUp') target = i === 0 ? last : i - 1
    else if (e.key === 'Home') target = 0
    else if (e.key === 'End') target = last
    if (target !== null) {
      e.preventDefault()
      buttonRefs.current[target]?.focus()
    }
  }

  return (
    <div className={className}>
      {items.map((entry, i) => {
        const open = openIndex === i
        const id = `faq-q-${i}`
        const panelId = `faq-a-${i}`
        return (
          <div key={entry.question}>
            {render({
              entry,
              index: i,
              open,
              toggle: () => toggle(i),
              buttonProps: {
                ref: (el: HTMLButtonElement | null) => {
                  buttonRefs.current[i] = el
                },
                id,
                'aria-expanded': open,
                'aria-controls': panelId,
                onClick: () => toggle(i),
                onKeyDown: (e: React.KeyboardEvent) => onKeyDown(e, i),
                type: 'button',
              },
              regionProps: {
                id: panelId,
                role: 'region',
                'aria-labelledby': id,
              },
            })}
          </div>
        )
      })}
    </div>
  )
}
