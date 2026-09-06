import { useEffect, useRef, useState } from 'react'
import styles from './LogoIntro.module.css'

const BEZEL_PATH =
  'M 330,303.5 L 75,303.5 Q 53,303.5 53,280 L 53,148 Q 53,126 75,126 L 305,126 Q 327,126 327,148 L 327,172'

const STAND_PATH =
  'M 162,315 L 238,315 L 246,338 Q 248,358 284,366 L 284,372 Q 284,378 274,378 L 126,378 Q 116,378 116,372 L 116,366 Q 152,358 154,338 Z'

const WIRE_PATHS = [
  'M 269,195 L 335,195 L 388,142 L 420,142',
  'M 300,222 L 394,222 L 426,190 L 462,190',
  'M 269,249 L 355,249 L 372,232 L 414,232',
  'M 300,278 L 342,278 L 364,300 L 392,300 L 422,270 L 462,270',
  'M 364,300 L 374,310 L 417,310',
] as const

const INNER_NODES = [
  { cx: 269, cy: 195 },
  { cx: 269, cy: 249 },
] as const

const ENDPOINT_NODES = [
  { cx: 420, cy: 142 },
  { cx: 462, cy: 190 },
  { cx: 414, cy: 232 },
  { cx: 462, cy: 270 },
  { cx: 417, cy: 310 },
] as const

const WIRE_DELAYS_S = [0.50, 0.54, 0.52, 0.58, 0.68] as const
const INNER_DELAYS_S = [0.44, 0.46] as const
const EP_DELAYS_S = [0.85, 0.92, 0.88, 0.98, 1.05] as const
const DRAW_DONE_MS = 1420

type Phase = 'drawing' | 'flying' | 'fading' | 'done'

interface LogoIntroProps {

  logoMarkRef: React.RefObject<HTMLSpanElement | null>

  onComplete: () => void
}

export function LogoIntro({ logoMarkRef, onComplete }: LogoIntroProps) {
  const [phase, setPhase] = useState<Phase>('drawing')
  const [flyTransform, setFlyTransform] = useState('')
  const svgRef = useRef<SVGSVGElement>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms))
  }

  useEffect(() => {
    sessionStorage.setItem('cw-logo-animated', '1')

    const svg = svgRef.current
    if (!svg) return

    svg.querySelectorAll<SVGGeometryElement>('[data-anim]').forEach(el => {
      try {
        const len = Math.ceil(el.getTotalLength()) + 2
        el.style.strokeDasharray = `${len}`
        el.style.strokeDashoffset = `${len}`
      } catch {
        el.style.strokeDasharray = '9999'
        el.style.strokeDashoffset = '9999'
      }
    })

    let r1: number, r2: number
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        svg.classList.add(styles.animate)
      })
    })

    return () => {
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
    }
  }, [])

  useEffect(() => {
    later(() => {
      const target = logoMarkRef.current
      if (!target) return

      const rect = target.getBoundingClientRect()

      const scale = rect.width / 180
      const tx = rect.left + rect.width / 2 - 90
      const ty = rect.top + rect.height / 2 - 90

      setFlyTransform(`translate(${tx}px, ${ty}px) scale(${scale})`)
      setPhase('flying')

      later(() => {
        onComplete()
        setPhase('fading')
        later(() => setPhase('done'), 350)
      }, 420)
    }, DRAW_DONE_MS)

    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [logoMarkRef, onComplete])

  if (phase === 'done') return null

  const isMoving = phase === 'flying' || phase === 'fading'

  return (
    <>

      <div
        className={`${styles.overlay}${isMoving ? ` ${styles.overlayOut}` : ''}`}
        aria-hidden="true"
      />

      <svg
        ref={svgRef}
        className={[
          styles.logoSvg,
          isMoving ? styles.logoMoving : '',
          phase === 'fading' ? styles.logoFading : '',
        ].filter(Boolean).join(' ')}
        style={isMoving ? { transform: flyTransform } : undefined}
        viewBox="0 0 512 512"
        width="180"
        height="180"
        fill="none"
        aria-hidden="true"
        role="img"
      >

        <path
          className={styles.stand}
          d={STAND_PATH}
          fill="#0753F8"
        />

        <path
          data-anim
          className={styles.bezel}
          d={BEZEL_PATH}
          stroke="#0753F8"
          strokeWidth="26"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle
          className={styles.powerDot}
          cx="199"
          cy="303.5"
          r="5.5"
          fill="#ffffff"
        />

        {INNER_NODES.map((n, i) => (
          <g
            key={`inner-${i}`}
            className={`${styles.innerNode} ${styles[`innerNode${i}` as keyof typeof styles]}`}
            style={{ animationDelay: `${INNER_DELAYS_S[i]}s` }}
          >
            <circle cx={n.cx} cy={n.cy} r="14" fill="#0753F8" />
            <circle cx={n.cx} cy={n.cy} r="5.5" fill="#ffffff" />
          </g>
        ))}

        {WIRE_PATHS.map((d, i) => (
          <path
            key={`wire-${i}`}
            data-anim
            className={`${styles.wire} ${styles[`wire${i}` as keyof typeof styles]}`}
            style={{ animationDelay: `${WIRE_DELAYS_S[i]}s` }}
            d={d}
            stroke="#0753F8"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {ENDPOINT_NODES.map((n, i) => (
          <g
            key={`ep-${i}`}
            className={`${styles.node} ${styles[`node${i}` as keyof typeof styles]}`}
            style={{ animationDelay: `${EP_DELAYS_S[i]}s` }}
          >
            <circle cx={n.cx} cy={n.cy} r="14" fill="#0753F8" />
            <circle cx={n.cx} cy={n.cy} r="5.5" fill="#ffffff" />
          </g>
        ))}
      </svg>
    </>
  )
}

