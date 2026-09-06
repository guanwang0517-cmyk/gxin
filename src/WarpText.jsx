import { useMemo, useRef, useState } from 'react'
import './warp-text.css'

export default function WarpText({
  text,
  color = '#111',
  warpStrength = 0.08,
  warpScale = 1.7,
  speed = 0.55,
  pointerInfluence = 0.42,
  pointerStrength = 0.38,
  refraction = 0.018,
  ripple = false,
  fontSize = 'clamp(3rem, 10vw, 9rem)',
  fontWeight = 800,
  style,
}) {
  const host = useRef(null)
  const [pointer, setPointer] = useState({ x: -1000, y: -1000, active: false })
  const glyphs = useMemo(() => [...text], [text])
  const onMove = (event) => {
    const box = host.current.getBoundingClientRect()
    setPointer({ x: event.clientX - box.left, y: event.clientY - box.top, active: true })
  }
  const onLeave = () => setPointer((current) => ({ ...current, active: false }))

  return <div ref={host} className="warp-text" style={{ ...style, '--warp-color': color, '--warp-size': fontSize, '--warp-weight': fontWeight, '--warp-speed': `${Math.max(.12, 1.25 - speed)}s`, '--warp-scale': warpScale }} onPointerMove={onMove} onPointerLeave={onLeave} aria-label={text}>
    {ripple && pointer.active && <i className="warp-ripple" style={{ left: pointer.x, top: pointer.y, '--ripple-size': `${180 + pointerInfluence * 360}px` }} />}
    <span className="warp-glyphs" aria-hidden="true">
      {glyphs.map((glyph, index) => <Glyph key={`${glyph}-${index}`} char={glyph} pointer={pointer} influence={pointerInfluence} strength={pointerStrength} warpStrength={warpStrength} refraction={refraction} />)}
    </span>
  </div>
}

function Glyph({ char, pointer, influence, strength, warpStrength, refraction }) {
  const ref = useRef(null)
  let transform = 'translate3d(0,0,0) scale(1) skewX(0deg)'
  let blur = 0
  if (pointer.active && ref.current) {
    const box = ref.current.getBoundingClientRect()
    const dx = pointer.x - (box.left - ref.current.parentElement.parentElement.getBoundingClientRect().left + box.width / 2)
    const dy = pointer.y - (box.top - ref.current.parentElement.parentElement.getBoundingClientRect().top + box.height / 2)
    const distance = Math.hypot(dx, dy)
    const reach = 240 + influence * 360
    const force = Math.max(0, 1 - distance / reach) * strength
    transform = `translate3d(${dx * force * .12}px,${dy * force * .16}px,0) scale(${1 + force * warpStrength}) skewX(${dx * force * .018}deg)`
    blur = force * refraction * 20
  }
  return <span ref={ref} className="warp-glyph" style={{ transform, filter: `blur(${blur}px)` }}>{char}</span>
}
