import React, { useEffect, useState } from 'react';
import './WeatherAnimations.css';

// Weather Animation Components
export const RainAnimation = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: 24 }}>
    {[...Array(20)].map((_, i) => {
      const left = Math.random() * 100;
      const duration = 1 + Math.random() * 2;
      const delay = Math.random() * 2;
      const thickness = 1 + Math.random() * 2;
      const length = 10 + Math.random() * 20;
      return (
        <React.Fragment key={i}>
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              left: `${left}%`,
              width: `${thickness}px`,
              height: `${length}px`,
              background: 'linear-gradient(to bottom, #b3e0ff 60%, #fff 100%)',
              borderRadius: '1px',
              animation: `rainDrop ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
              opacity: 0.7,
            }}
          />
          {/* Splash effect at the bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              left: `calc(${left}% - 4px)`,
              width: '12px',
              height: '6px',
              borderRadius: '50%',
              background: 'rgba(179,224,255,0.5)',
              opacity: 0.7,
              animation: `splash ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
              pointerEvents: 'none',
            }}
          />
        </React.Fragment>
      );
    })}
  </div>
);

export const SnowAnimation = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: 24 }}>
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          top: '-10px',
          left: `${Math.random() * 100}%`,
          width: '6px',
          height: '6px',
          background: 'rgba(255,255,255,0.8)',
          borderRadius: '50%',
          animation: `snowFall ${3 + Math.random() * 3}s linear infinite`,
          animationDelay: `${Math.random() * 3}s`,
        }}
      />
    ))}
  </div>
);

export const CloudAnimation = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: 24 }}>
    {/* Cloud 1 - Large main cloud */}
    <div className="cloud cloud-x1" style={{
      position: 'absolute',
      top: '15%',
      left: '-150px',
      width: '120px',
      height: '40px',
      background: 'rgba(255,255,255,0.8)',
      borderRadius: '120px',
      animation: 'moveSlowClouds 25s linear infinite',
      zIndex: 3,
    }}>
    </div>
    
    {/* Cloud 2 - Medium cloud */}
    <div className="cloud cloud-x2" style={{
      position: 'absolute',
      top: '35%',
      left: '200px',
      width: '100px',
      height: '35px',
      background: 'rgba(255,255,255,0.6)',
      borderRadius: '100px',
      transform: 'scale(0.7)',
      opacity: 0.7,
      animation: 'moveMediumClouds 20s linear infinite',
      zIndex: 2,
    }}>
    </div>
    
    {/* Cloud 3 - Small background cloud */}
    <div className="cloud cloud-x3" style={{
      position: 'absolute',
      top: '5%',
      left: '-80px',
      width: '80px',
      height: '25px',
      background: 'rgba(255,255,255,0.5)',
      borderRadius: '80px',
      transform: 'scale(0.5)',
      opacity: 0.5,
      animation: 'moveFastClouds 15s linear infinite',
      zIndex: 1,
    }}>
    </div>
    
    {/* Cloud 4 - Another medium cloud */}
    <div className="cloud cloud-x4" style={{
      position: 'absolute',
      top: '60%',
      left: '150px',
      width: '90px',
      height: '30px',
      background: 'rgba(255,255,255,0.65)',
      borderRadius: '90px',
      transform: 'scale(0.6)',
      opacity: 0.65,
      animation: 'moveSlowClouds 28s linear infinite',
      animationDelay: '5s',
      zIndex: 2,
    }}>
    </div>
    
    {/* Cloud 5 - Top small cloud */}
    <div className="cloud cloud-x5" style={{
      position: 'absolute',
      top: '25%',
      left: '-200px',
      width: '70px',
      height: '20px',
      background: 'rgba(255,255,255,0.4)',
      borderRadius: '70px',
      transform: 'scale(0.8)',
      opacity: 0.6,
      animation: 'moveMediumClouds 22s linear infinite',
      animationDelay: '8s',
      zIndex: 1,
    }}>
    </div>
  </div>
);

export const PartlyCloudyAnimation = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: 24 }}>
    {/* Sun rays in background */}
    <div style={{ 
      position: 'absolute', 
      top: '20%', 
      right: '20%', 
      transform: 'translate(50%, -50%)', 
      pointerEvents: 'none', 
      zIndex: 1,
      width: '100px',
      height: '100px'
    }}>
      {/* Gentle sun rays */}
      {[...Array(8)].map((_, i) => {
        const rotation = i * 45;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '2px',
              height: '60px',
              background: 'linear-gradient(to bottom, rgba(255,224,102,0.6) 0%, rgba(255,251,230,0.3) 100%)',
              borderRadius: '1px',
              transform: `rotate(${rotation}deg) translateY(-30px)`,
              transformOrigin: '50% 30px',
              opacity: 0.7,
              animation: 'gentlePulse 3s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        );
      })}
    </div>
    
    {/* Fewer, lighter clouds */}
    <div className="cloud cloud-x1" style={{
      position: 'absolute',
      top: '10%',
      left: '-100px',
      width: '80px',
      height: '30px',
      background: 'rgba(255,255,255,0.7)',
      borderRadius: '80px',
      animation: 'moveSlowClouds 30s linear infinite',
      zIndex: 2,
    }}>
    </div>
    
    <div className="cloud cloud-x2" style={{
      position: 'absolute',
      top: '50%',
      left: '180px',
      width: '70px',
      height: '25px',
      background: 'rgba(255,255,255,0.5)',
      borderRadius: '70px',
      transform: 'scale(0.6)',
      opacity: 0.6,
      animation: 'moveMediumClouds 25s linear infinite',
      animationDelay: '10s',
      zIndex: 2,
    }}>
    </div>
    
    <div className="cloud cloud-x3" style={{
      position: 'absolute',
      top: '70%',
      left: '-120px',
      width: '60px',
      height: '20px',
      background: 'rgba(255,255,255,0.4)',
      borderRadius: '60px',
      transform: 'scale(0.5)',
      opacity: 0.5,
      animation: 'moveFastClouds 18s linear infinite',
      animationDelay: '5s',
      zIndex: 1,
    }}>
    </div>
  </div>
);

export const SunRaysAnimation = () => {
  const numRays = 12;
  // State for ray lengths
  const [rayLengths, setRayLengths] = useState(() => Array.from({ length: numRays }, () => 
    100 + Math.random() * 15));

  // Update ray lengths every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setRayLengths(prev => prev.map(() => 
        100 + Math.random() * 15));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ 
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      pointerEvents: 'none', 
      zIndex: 1,
      width: '150px',
      height: '150px'
    }}>
      {/* Sun face - positioned at exact center */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '60px',
          height: '60px',
          background: 'radial-gradient(circle at 60% 40%, #ffe066 80%, #ffd700 100%)',
          borderRadius: '50%',
          border: '2px solid #fffbe6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          boxShadow: '0 0 24px 4px #ffe06688',
          animation: 'sunPulse 2.5s ease-in-out infinite',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Smiling face */}
        <svg width="36" height="36" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="18" fill="none" />
          <ellipse cx="12" cy="16" rx="2" ry="2.5" fill="#fff" />
          <ellipse cx="24" cy="16" rx="2" ry="2.5" fill="#fff" />
          <path d="M12 24 Q18 30 24 24" stroke="#fff" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Static rays container - positioned at exact same center */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: '0px',
        height: '0px',
        zIndex: 1,
      }}>
        {rayLengths.map((len, i) => {
          const rotation = i * (360 / numRays);
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '0px',
                top: '0px',
                width: '4px',
                height: `${len}px`,
                background: 'linear-gradient(to bottom, #ffe066 80%, #fffbe6 100%)',
                borderRadius: '2px',
                transform: `rotate(${rotation}deg) translateY(-30px)`,
                transformOrigin: '50% 0%',
                opacity: 0.9,
                transition: 'height 1.5s cubic-bezier(.4,2,.6,1)',
                zIndex: 1,
              }}
            />
          );
        })}
      </div>

    </div>
  );
};

export const ThunderstormAnimation = () => {
  const [flash, setFlash] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 150);
    }, 3000 + Math.random() * 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <RainAnimation />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: flash ? 'rgba(255,255,255,0.4)' : 'transparent',
          transition: 'background 0.1s ease-in-out',
          pointerEvents: 'none',
          borderRadius: 24,
        }}
      />
    </>
  );
};

export const FogAnimation = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: 24 }}>
    <div
      style={{
        position: 'absolute',
        top: '60%',
        left: '-50%',
        width: '200%',
        height: '40px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        animation: 'fogMove 6s ease-in-out infinite',
      }}
    />
    <div
      style={{
        position: 'absolute',
        top: '40%',
        right: '-50%',
        width: '180%',
        height: '30px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
        animation: 'fogMoveReverse 8s ease-in-out infinite',
      }}
    />
  </div>
); 