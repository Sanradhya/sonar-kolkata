const BackgroundEffects = () => {
  return (
    <>
      {/* Base gradient background */}
      <div className="fixed inset-0 retro-gradient" />
      
      {/* Radial glow effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Top-left warm glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-mustard/15 rounded-full blur-3xl animate-pulse-soft" />
        
        {/* Center accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
        
        {/* Bottom-right warm glow */}
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-mustard-dark/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
      </div>
      
      {/* Translucent overlay for depth */}
      <div className="fixed inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60 pointer-events-none" />
      
      {/* Subtle noise texture overlay */}
      <div 
        className="fixed inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Vignette effect */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, hsl(35 45% 8% / 0.4) 100%)'
      }} />
    </>
  );
};

export default BackgroundEffects;
