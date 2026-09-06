import { useEffect, useRef, useState } from 'react'
import styles from './LogoIntro.module.css'

// ─── SVG geometry ────────────────────────────────────────────────────────────
// ViewBox: 0 0 200 140
// The monitor occupies x:10–110, y:6–82. Stand below. Wires+nodes on the right.

/** Rounded-rect bezel path — starts at bottom of right edge, draws clockwise:
 *  up-right → top → left side → bottom → back.
 *  This means the right edge and screen top appear first (visually satisfying). */
const BEZEL_PATH =
  'M 110,70 L 110,18 Q 110,6 98,6 L 22,6 Q 10,6 10,18 L 10,70 Q 10,82 22,82 L 98,82 Q 110,82 110,70 Z'

/** Five circuit wire paths — all exit from right side of monitor, fan outward. */
const WIRE_PATHS = [
  'M 110,45 L 120,45 L 120,22 L 192,22', // top
  'M 110,45 L 120,45 L 120,33 L 192,33', // upper-mid
  'M 110,45 L 192,45',                   // centre straight
  'M 110,45 L 120,45 L 120,57 L 192,57', // lower-mid
  'M 110,45 L 120,45 L 120,68 L 192,68', // bottom
]

/** Y-centres of the five endpoint nodes */
const NODE_CYS = [22, 33, 45, 57, 68] as const

// ─── Per-wire animation delays (after drawing phase starts) ──────────────────
const WIRE_DELAYS  = [0.45, 0.51, 0.57, 0.63, 0.69] // seconds
const NODE_DELAYS  = [0.90, 0.98, 1.06, 1.14, 1.22] // seconds
const DRAW_DONE_MS = 1400 // when the full draw is complete

// ─── Component ───────────────────────────────────────────────────────────────
type Phase = 'drawing' | 'flying' | 'fading' | 'done'

interface LogoIntroProps {
  /** Ref to the <span> wrapping the navbar logomark (used to calculate fly target). */
  logoMarkRef: React.RefObject<HTMLSpanElement | null>
  /** Called when the logo has landed in the navbar — parent should reveal PNG + text. */
  onComplete: () => void
}

export function LogoIntro({ logoMarkRef, onComplete }: LogoIntroProps) {
  const [phase, setPhase] = useState<Phase>('drawing')
  const [flyTransform, setFlyTransform] = useState<string>('')
  const svgRef = useRef<SVGSVGElement>(null)
  const cleanupRef = useRef<Array<() => void>>([])

  // ── 1. Measure all animated strokes and kick off the draw animation ──────
  useEffect(() => {
    // Mark sessionStorage immediately so a mid-animation refresh won't replay
    sessionStorage.setItem('cw-logo-animated', '1')

    const svg = svgRef.current
    if (!svg) return

    // Measure each animated path and prime its stroke-dasharray/offset
    svg.querySelectorAll<SVGGeometryElement>('[data-anim]').forEach((el) => {
      try {
        const len = Math.ceil(el.getTotalLength()) + 1
        el.style.strokeDasharray = `${len}`
        el.style.strokeDashoffset = `${len}`
      } catch {
        // fallback — non-geometry element (shouldn't happen)
        el.style.strokeDasharray = '9999'
        el.style.strokeDashoffset = '9999'
      }
    })

    // Double-rAF ensures layout is painted before we add the animate class
    let raf1: number
    let raf2: number
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        svg.classList.add(styles.animate)
      })
    })

    cleanupRef.current.push(() => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    })
  }, []) // runs once on mount

  // ── 2. Schedule the fly-to-navbar after draw finishes ───────────────────
  useEffect(() => {
    const flyTimer = window.setTimeout(() => {
      const target = logoMarkRef.current
      if (!target) return

      const rect = target.getBoundingClientRect()
      // SVG is 160×112 px, currently centered via CSS transform.
      // We move it to the logomark's exact screen position and scale it down.
      const scale = rect.width / 160
      // Align SVG top edge to the vertical centre of the logomark
      const targetY = rect.top + rect.height / 2 - (112 * scale) / 2

      setFlyTransform(`translate(${rect.left}px, ${targetY}px) scale(${scale})`)
      setPhase('flying')

      // ── 3. After fly lands, notify parent and start SVG fade-out ────────
      const completeTimer = window.setTimeout(() => {
        onComplete()      // → Navbar shows PNG + text
        setPhase('fading')

        const doneTimer = window.setTimeout(() => setPhase('done'), 380)
        cleanupRef.current.push(() => clearTimeout(doneTimer))
      }, 440) // fly duration + small buffer

      cleanupRef.current.push(() => clearTimeout(completeTimer))
    }, DRAW_DONE_MS)

    cleanupRef.current.push(() => clearTimeout(flyTimer))

    return () => {
      cleanupRef.current.forEach((fn) => fn())
      cleanupRef.current = []
    }
  }, [logoMarkRef, onComplete])

  if (phase === 'done') return null

  const isMoving = phase === 'flying' || phase === 'fading'

  return (
    <>
      {/* ── Full-screen overlay — fades out when logo starts flying ── */}
      <div
        className={`${styles.overlay}${isMoving ? ` ${styles.overlayOut}` : ''}`}
        aria-hidden="true"
      />

      {/* ── Animated SVG emblem ── */}
      <svg
        ref={svgRef}
        className={[
          styles.logoSvg,
          phase === 'flying'  ? styles.logoFlying  : '',
          phase === 'fading'  ? styles.logoFading  : '',
        ].filter(Boolean).join(' ')}
        style={isMoving ? { transform: flyTransform } : undefined}
        viewBox="0 0 200 140"
        width="160"
        height="112"
        fill="none"
        aria-hidden="true"
        role="img"
      >
        {/* Monitor bezel — thick rounded-rect stroke, drawn by CSS animation */}
        <path
          data-anim
          className={styles.bezel}
          d={BEZEL_PATH}
          stroke="#2563eb"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* White screen fill — hides the bezel interior so it looks like a frame */}
        <rect x="17" y="13" width="87" height="64" rx="4" fill="white" />

        {/* Camera dot at bottom-centre of screen bezel */}
        <circle cx="60" cy="82" r="2.5" fill="white" />

        {/* ── Monitor stand (neck + base) — fades in during Phase 2 ── */}
        <g className={styles.stand}>
          <path d="M 52,82 L 68,82 L 64,98 L 56,98 Z" fill="#2563eb" />
          <path d="M 38,98 L 82,98 L 88,110 L 32,110 Z" fill="#2563eb" />
        </g>

        {/* ── Circuit wires — Phase 3, staggered ── */}
        {WIRE_PATHS.map((d, i) => (
          <path
            key={i}
            data-anim
            className={`${styles.wire} ${styles[`wire${i + 1}` as keyof typeof styles]}`}
            style={{ animationDelay: `${WIRE_DELAYS[i]}s` }}
            d={d}
            stroke="#2563eb"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {/* ── Endpoint nodes — Phase 5, elastic pop-in ── */}
        {NODE_CYS.map((cy, i) => (
          <g
            key={i}
            className={`${styles.node} ${styles[`node${i + 1}` as keyof typeof styles]}`}
            style={{ animationDelay: `${NODE_DELAYS[i]}s` }}
          >
            <circle cx="192" cy={cy} r="8"   fill="#2563eb" />
            <circle cx="192" cy={cy} r="3.5" fill="white"   />
          </g>
        ))}
      </svg>
    </>
  )
}
