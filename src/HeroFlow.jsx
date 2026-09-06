import { useEffect, useRef } from 'react'

// Original canvas flow treatment for the lower hero area. It intentionally uses
// the page palette so the apple remains the primary visual anchor.
export default function HeroFlow() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const host = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const pointer = { x: -1000, y: -1000, active: false }
    let frame = 0
    let animation = 0
    let isVisible = true
    let width = 0
    let height = 0

    const resize = () => {
      const bounds = host.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      width = Math.max(1, bounds.width)
      height = Math.max(1, bounds.height)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const blob = (x, y, radius, inner, outer) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, inner)
      gradient.addColorStop(1, outer)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
    }

    const drawWave = (index, time) => {
      const base = height * (.24 + index * .18)
      const amplitude = 24 + index * 9
      const speed = .55 + index * .08
      const phase = time * speed + index * 1.35
      const color = ['rgba(160, 186, 114, .18)', 'rgba(229, 199, 102, .20)', 'rgba(116, 160, 139, .16)', 'rgba(241, 222, 158, .24)'][index]
      ctx.beginPath()
      ctx.moveTo(0, height)
      for (let x = 0; x <= width + 18; x += 18) {
        const distance = Math.hypot(x - pointer.x, base - pointer.y)
        const influence = pointer.active ? Math.max(0, 1 - distance / 310) * 30 : 0
        const y = base + Math.sin(x * .009 + phase) * amplitude + Math.sin(x * .021 - phase * .72) * amplitude * .35 - influence
        ctx.lineTo(x, y)
      }
      ctx.lineTo(width, height)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
    }

    const render = (now) => {
      frame = now * .001
      ctx.clearRect(0, 0, width, height)
      blob(width * (.12 + Math.sin(frame * .2) * .05), height * .68, width * .68, 'rgba(221, 231, 180, .48)', 'rgba(221, 231, 180, 0)')
      blob(width * (.76 + Math.cos(frame * .17) * .05), height * .43, width * .62, 'rgba(255, 215, 120, .34)', 'rgba(255, 215, 120, 0)')
      blob(width * .51, height * (.89 + Math.sin(frame * .25) * .06), width * .76, 'rgba(105, 152, 132, .21)', 'rgba(105, 152, 132, 0)')
      for (let index = 0; index < 4; index += 1) drawWave(index, frame)
      animation = isVisible ? requestAnimationFrame(render) : 0
    }

    const move = (event) => {
      const bounds = canvas.getBoundingClientRect()
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
      pointer.active = true
    }
    const leave = () => { pointer.active = false; pointer.x = -1000; pointer.y = -1000 }
    const observer = new ResizeObserver(resize)
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (isVisible && !animation) animation = requestAnimationFrame(render)
    }, { threshold: .01 })
    observer.observe(host)
    visibilityObserver.observe(host)
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerleave', leave)
    resize()
    animation = requestAnimationFrame(render)
    return () => {
      observer.disconnect()
      visibilityObserver.disconnect()
      cancelAnimationFrame(animation)
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerleave', leave)
    }
  }, [])

  return <div className="hero-flow" aria-hidden="true"><canvas ref={canvasRef} /></div>
}
