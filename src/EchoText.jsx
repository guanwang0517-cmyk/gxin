import WarpText from './WarpText'

export default function EchoText({ text, fontSize = 'clamp(3rem, 9vw, 7rem)', fontWeight = 800, color = '#404240' }) {
  const [firstLine, ...remaining] = text.split(' ')
  const shared = { color, warpStrength: .08, warpScale: 1.7, speed: .55, pointerInfluence: .42, pointerStrength: .38, refraction: .018, fontSize, fontWeight, style: { height: '108px' } }
  return <div className="about-warp-lines"><WarpText text={firstLine} {...shared} /><WarpText text={remaining.join(' ')} {...shared} /></div>
}
