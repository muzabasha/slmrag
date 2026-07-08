import { useRef, useEffect, useId } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
})

interface Props {
  chart: string
  title?: string
  caption?: string
}

export default function MermaidDiagram({ chart, title, caption }: Props) {
  const id = useId()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'default',
      securityLevel: 'loose',
    })
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const render = async () => {
      el.textContent = chart
      try {
        await mermaid.run({ nodes: [el] })
      } catch { /* ignore render errors */ }
    }
    render()
  }, [chart])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark')
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'default',
        securityLevel: 'loose',
      })
      const el = containerRef.current
      if (!el) return
      const render = async () => {
        el.textContent = chart
        try {
          await mermaid.run({ nodes: [el] })
        } catch { /* ignore */ }
      }
      render()
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [chart])

  return (
    <div className="my-6">
      {title && (
        <h4 className="text-lg font-bold text-text dark:text-text-dark mb-3">{title}</h4>
      )}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 border border-border dark:border-border-dark overflow-x-auto">
        <div
          ref={containerRef}
          id={`mermaid-${id}`}
          className="mermaid min-w-0"
        />
      </div>
      {caption && (
        <p className="mt-2 text-xs text-muted dark:text-muted-dark text-center">{caption}</p>
      )}
    </div>
  )
}
