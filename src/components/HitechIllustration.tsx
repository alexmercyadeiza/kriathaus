import { HITECH_VECTORS } from './hitech-data'

export function HitechIllustration() {
  return (
    <div className="absolute left-[33px] top-[97px] h-[408px] w-[573px] overflow-hidden">
      {HITECH_VECTORS.map((v, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: v.top,
            right: v.right,
            bottom: v.bottom,
            left: v.left,
          }}
        >
          <img
            alt=""
            src={v.src}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="block size-full max-w-none"
          />
        </div>
      ))}
    </div>
  )
}
