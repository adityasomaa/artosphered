/**
 * Deterministic Y2K abstract graphic — replaces photo placeholders everywhere.
 * Same `seed` always renders the same artwork, so grids look varied but stable.
 * Pure inline SVG (no network, no deps). Fills its container; give the parent
 * a width/height or aspect-ratio.
 *
 * Props:
 *  - seed:  string (varies the composition + hue)
 *  - tone:  'warm' (default) | 'holo' | 'chrome' | 'mono' | 'amber'
 *  - label: optional small caption baked into the art
 *  - style/className: forwarded to the wrapper
 */
function hash(str = '') {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

const TONES = {
  warm: ['#ff8a1e', '#ff5e1a', '#ffb35c', '#5a1d0c'],
  amber: ['#ffb35c', '#ff8a1e', '#fff4e0', '#2a160d'],
  holo: ['#ff4da6', '#36e6ff', '#b6ff3a', '#ffae3d'],
  chrome: ['#fffdf8', '#c9bda8', '#8a7e6c', '#3a3027'],
  mono: ['#f7f1e8', '#8a7866', '#2a160d', '#0b0705'],
}

export default function Graphic({ seed = 'aro', tone = 'warm', label, className = '', style }) {
  const h = hash(seed)
  const pal = TONES[tone] || TONES.warm
  const variant = h % 4
  const cx = 24 + (h % 52)
  const cy = 18 + ((h >> 3) % 60)
  const cx2 = 50 + ((h >> 5) % 45)
  const cy2 = 40 + ((h >> 7) % 50)
  const rot = (h % 60) - 30
  const uid = 'g' + (h % 100000)

  return (
    <div className={className} style={{ position: 'relative', overflow: 'hidden', background: pal[3], ...style }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={uid + 'a'} cx={cx + '%'} cy={cy + '%'} r="70%">
            <stop offset="0%" stopColor={pal[2]} />
            <stop offset="45%" stopColor={pal[0]} />
            <stop offset="100%" stopColor={pal[3]} stopOpacity="0.1" />
          </radialGradient>
          <radialGradient id={uid + 'b'} cx={cx2 + '%'} cy={cy2 + '%'} r="55%">
            <stop offset="0%" stopColor={pal[1]} stopOpacity="0.95" />
            <stop offset="100%" stopColor={pal[1]} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={uid + 'c'} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={pal[0]} />
            <stop offset="100%" stopColor={pal[1]} />
          </linearGradient>
        </defs>

        <rect width="100" height="100" fill={pal[3]} />
        <rect width="100" height="100" fill={`url(#${uid}a)`} />
        <circle cx={cx2} cy={cy2} r="46" fill={`url(#${uid}b)`} />

        {/* perspective grid */}
        <g stroke={pal[2]} strokeOpacity="0.16" strokeWidth="0.4">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={'h' + i} x1="0" y1={i * 12.5} x2="100" y2={i * 12.5} />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={'v' + i} x1={i * 12.5} y1="0" x2={i * 12.5} y2="100" />
          ))}
        </g>

        {/* variant motif */}
        {variant === 0 && (
          <circle cx={cx} cy={cy} r="20" fill="none" stroke={pal[2]} strokeOpacity="0.6" strokeWidth="1.2" />
        )}
        {variant === 1 && (
          <g transform={`rotate(${rot} 50 50)`}>
            <rect x="30" y="30" width="40" height="40" fill="none" stroke={`url(#${uid}c)`} strokeWidth="1.4" />
            <rect x="38" y="38" width="24" height="24" fill="none" stroke={pal[2]} strokeOpacity="0.5" strokeWidth="1" />
          </g>
        )}
        {variant === 2 && (
          <path d={`M ${cx} 80 Q 50 ${cy} 80 70`} fill="none" stroke={pal[2]} strokeOpacity="0.7" strokeWidth="1.4" />
        )}
        {variant === 3 && (
          <circle cx={cx2} cy={cy2} r="10" fill={pal[2]} fillOpacity="0.85" />
        )}

        {/* Y2K sparkle */}
        <g transform={`translate(${72 + (h % 16)} ${16 + (h % 14)})`} fill={pal[2]}>
          <path d="M4 0 L5 3 L8 4 L5 5 L4 8 L3 5 L0 4 L3 3 Z" opacity="0.9" />
        </g>
      </svg>

      {label && (
        <span
          style={{
            position: 'absolute',
            left: '0.8rem',
            bottom: '0.7rem',
            fontFamily: "'Space Grotesk', monospace",
            fontSize: '0.68rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.85)',
            mixBlendMode: 'difference',
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
