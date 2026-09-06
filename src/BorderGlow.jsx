import { useRef, useState } from 'react'
import './border-glow.css'

export default function BorderGlow({ children, edgeSensitivity = 30, glowColor = '40 80 80', backgroundColor = '#f6f5ef', borderRadius = 28, glowRadius = 40, glowIntensity = 1, coneSpread = 25, animated = false, colors = [] }) {
  const host = useRef(null)
  const [point, setPoint] = useState({ x: -500, y: -500, visible: false })
  const onMove = (event) => {
    const rect = host.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const edge = Math.min(x, y, rect.width - x, rect.height - y)
    setPoint({ x, y, visible: edge < edgeSensitivity * 2.2 })
  }
  return <div ref={host} onPointerMove={onMove} onPointerLeave={() => setPoint((current) => ({ ...current, visible: false }))} className={`border-glow ${animated ? 'is-animated' : ''}`} style={{ '--glow-x': `${point.x}px`, '--glow-y': `${point.y}px`, '--glow-color': glowColor, '--surface': backgroundColor, '--radius': `${borderRadius}px`, '--glow-radius': `${glowRadius}px`, '--glow-opacity': point.visible ? glowIntensity : 0, '--cone': `${coneSpread}deg`, '--color-a': colors[0] || '#c084fc', '--color-b': colors[1] || '#f472b6', '--color-c': colors[2] || '#38bdf8' }}>{children}</div>
}
