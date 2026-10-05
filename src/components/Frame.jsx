/**
 * Frame — every piece of media on the site goes through this.
 *
 * One shared grade is applied to all of it: a small desaturation, a touch of
 * contrast, a vignette and a still grain. That is the difference between a
 * portfolio and a folder of stock — twenty images shot by twenty people start
 * reading as one studio's body of work once they share a grade.
 *
 * The images here are placeholders standing in for ADGOD's own footage. In
 * Framer this becomes a CMS image/video field; the grade stays on the frame,
 * so anything the client uploads later is graded automatically.
 */
export default function Frame({
  src,
  alt = '',
  ratio = '16 / 9',
  className = '',
  priority = false,
  children,
  style,
}) {
  return (
    <div
      className={`frame grain ${className}`}
      style={{ aspectRatio: ratio, ...style }}
    >
      {src && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: 'saturate(0.82) contrast(1.06) brightness(0.9)' }}
        />
      )}

      {/* vignette — every frame is lit from the middle */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2]"
        style={{
          background:
            'radial-gradient(78% 68% at 50% 45%, transparent 0%, rgba(0,0,0,0.44) 100%)',
        }}
      />

      {children}
    </div>
  )
}
