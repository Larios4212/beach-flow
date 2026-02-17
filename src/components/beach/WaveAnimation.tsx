/* WaveAnimation — subtle ocean background at the top of the beach map */
export default function WaveAnimation() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[22%] overflow-hidden">
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-600/30 via-ocean-500/15 to-transparent" />

      {/* wave layers */}
      <svg className="absolute bottom-0 w-[200%] animate-wave" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1350,20 1440,40 L1440,80 L0,80 Z" fill="rgba(34,211,238,0.08)" />
      </svg>
      <svg className="absolute bottom-0 w-[200%] animate-wave-slow" viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ animationDelay: '-2s' }}>
        <path d="M0,50 C320,10 640,70 960,30 C1120,10 1280,60 1440,50 L1440,80 L0,80 Z" fill="rgba(34,211,238,0.05)" />
      </svg>

      {/* label */}
      <span className="absolute left-4 top-3 text-[11px] font-semibold uppercase tracking-widest text-ocean-300/60">
        🌊 Ocean
      </span>
    </div>
  );
}
