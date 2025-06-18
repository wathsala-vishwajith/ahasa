import React, { useEffect, useState, useMemo } from 'react';
import { WiDaySunny, WiNightClear, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiStrongWind, WiHumidity, WiThermometer } from 'react-icons/wi';
import { FaSpinner } from 'react-icons/fa';
import type { AccuWeatherCurrentCondition } from '../services/accuweather';

// Weather Animation Components
const RainAnimation = () => (
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

const SnowAnimation = () => (
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

const CloudAnimation = () => (
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

const PartlyCloudyAnimation = () => (
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

const SunRaysAnimation = () => {
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
      
      <style>{`
        @keyframes sunRaysRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const ThunderstormAnimation = () => {
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

const FogAnimation = () => (
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

// Helper to get weather animation based on weather icon
const getWeatherAnimation = (iconNumber: number | null, isDayTime: boolean) => {
  if (iconNumber === null) return null;
  
  // Rain conditions
  if ([12, 13, 14, 18].includes(iconNumber)) {
    return <RainAnimation />;
  }
  
  // Snow conditions  
  if ([19, 20, 21, 22, 23, 24].includes(iconNumber)) {
    return <SnowAnimation />;
  }
  
  // Thunderstorm conditions
  if ([15, 16, 17].includes(iconNumber)) {
    return <ThunderstormAnimation />;
  }
  
  // Fog conditions
  if ([6, 7, 8, 11].includes(iconNumber)) {
    return <FogAnimation />;
  }
  
  // Clear/sunny conditions
  if (iconNumber === 1 && isDayTime) {
    return <SunRaysAnimation />;
  }
  
  // Partly cloudy conditions
  if ([2, 3, 4, 5].includes(iconNumber) && isDayTime) {
    return <PartlyCloudyAnimation />;
  }
  
  // Cloudy conditions (overcast and night cloudy)
  if ([6, 7, 8] || !isDayTime) {
    return <CloudAnimation />;
  }
  
  // Default fallback
  return <CloudAnimation />;
};

// Helper to get icon based on weather
const getWeatherIcon = (iconNumber: number | null, isDay: boolean) => {
  if (iconNumber === null) {
    return isDay ? <WiDaySunny size={80} /> : <WiNightClear size={80} />;
  }
  switch (iconNumber) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return isDay ? <WiDaySunny size={80} /> : <WiNightClear size={80} />;
    case 6:
    case 7:
    case 8:
    case 11:
      return <WiFog size={80} />;
    case 12:
    case 13:
    case 14:
    case 18:
      return <WiRain size={80} />;
    case 15:
    case 16:
    case 17:
      return <WiThunderstorm size={80} />;
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
      return <WiSnow size={80} />;
    default:
      return <WiCloudy size={80} />;
  }
};

// Helper to get card background based on day/night
const getCardBackground = (isDay: boolean) => {
  return isDay
    ? 'linear-gradient(135deg, #7fd8ff 0%, #a6e0ff 100%)'
    : 'linear-gradient(135deg, #232946 0%, #3a3f5a 100%)';
};

export interface WeatherCardProps {
  id: string;
  location: string;
  condition?: AccuWeatherCurrentCondition | null;
  onRemove?: (id: string) => void;
  onClick?: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ id, location, condition, onRemove, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  if (!condition) {
    return (
      <div
        style={{
          width: 260,
          borderRadius: 24,
          padding: 24,
          background: 'rgba(200,200,200,0.2)',
          color: '#232946',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          margin: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          minHeight: 360,
        }}
      >
        <FaSpinner className="animate-spin" size={50} />
      </div>
    );
  }

  const {
    WeatherText,
    WeatherIcon,
    IsDayTime,
    Temperature,
    RealFeelTemperature,
    RelativeHumidity,
    Wind,
  } = condition;

  const tempValue = Temperature?.Metric?.Value;
  const realFeelValue = RealFeelTemperature?.Metric?.Value;

  return (
    <>
      <style>{`
        @keyframes rainDrop {
          0% { transform: translateY(-100px); opacity: 1; }
          100% { transform: translateY(400px); opacity: 0; }
        }
        @keyframes splash {
          0%, 80% { opacity: 0; transform: scaleX(0.5) scaleY(0.5); }
          85% { opacity: 1; transform: scaleX(1.2) scaleY(0.8); }
          100% { opacity: 0; transform: scaleX(1.5) scaleY(0.5); }
        }
        @keyframes snowFall {
          0% { transform: translateY(-100px) translateX(0px); opacity: 1; }
          100% { transform: translateY(400px) translateX(20px); opacity: 0; }
        }
        
        /* Realistic Cloud Styles */
        .cloud:before, .cloud:after {
          content: '';
          position: absolute; 
          background: inherit;
          border-radius: 50px;
        }
        
        .cloud:before {
          width: 50px; 
          height: 50px;
          top: -25px; 
          left: 10px;
          transform: rotate(15deg);
        }
        
        .cloud:after {
          width: 60px; 
          height: 70px;
          top: -35px; 
          right: 10px;
          transform: rotate(-15deg);
        }
        
        /* Cloud Animation Keyframes */
        @keyframes moveSlowClouds {
          0% { transform: translateX(0); }
          100% { transform: translateX(450px); }
        }
        
        @keyframes moveMediumClouds {
          0% { transform: translateX(0) scale(0.7); }
          100% { transform: translateX(400px) scale(0.7); }
        }
        
        @keyframes moveFastClouds {
          0% { transform: translateX(0) scale(0.5); }
          100% { transform: translateX(380px) scale(0.5); }
        }
        
        @keyframes gentlePulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        @keyframes cloudMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        @keyframes cloudMoveReverse {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes cloudPuff {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes sunPulse {
          0%, 100% { box-shadow: 0 0 24px 4px #ffe06688; }
          50% { box-shadow: 0 0 36px 12px #ffe066cc; }
        }
        @keyframes sunRayPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes fogMove {
          0%, 100% { transform: translateX(0); opacity: 0.4; }
          50% { transform: translateX(30px); opacity: 0.7; }
        }
        @keyframes fogMoveReverse {
          0%, 100% { transform: translateX(0); opacity: 0.3; }
          50% { transform: translateX(-30px); opacity: 0.6; }
        }
      `}</style>
      <div
        onClick={onClick}
        style={{
          width: 260,
          borderRadius: 24,
          padding: 24,
          background: getCardBackground(IsDayTime),
          color: IsDayTime ? '#232946' : '#fff',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          margin: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          minHeight: 360,
          cursor: onClick ? 'pointer' : 'default',
          overflow: 'hidden',
        }}
      >
        {/* Weather Animation */}
        {getWeatherAnimation(WeatherIcon, IsDayTime)}
        
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(id);
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: isHovered 
                ? (IsDayTime ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.2)')
                : (IsDayTime ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.1)'),
              border: `1px solid ${IsDayTime ? 'rgba(35, 41, 70, 0.15)' : 'rgba(255, 255, 255, 0.3)'}`,
              borderRadius: '50%',
              width: 32,
              height: 32,
              fontSize: 18,
              fontWeight: 'bold',
              cursor: 'pointer',
              color: isHovered 
                ? (IsDayTime ? '#dc2626' : '#ef4444')
                : (IsDayTime ? '#232946' : '#fff'),
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease-in-out',
              boxShadow: isHovered 
                ? `0 2px 8px ${IsDayTime ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.1)'}`
                : `0 1px 4px ${IsDayTime ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.3)'}`,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
            aria-label="Remove card"
          >
            ×
          </button>
        )}
        
        {/* Content */}
        <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 8, textAlign: 'center', zIndex: 5, position: 'relative' }}>{location}</div>
        <div style={{ zIndex: 5, position: 'relative' }}>{getWeatherIcon(WeatherIcon, IsDayTime)}</div>
        <div style={{ fontSize: 40, fontWeight: 700, margin: '8px 0', zIndex: 5, position: 'relative' }}>
          {tempValue !== null ? `${Math.round(tempValue)}°C` : 'N/A'}
        </div>
        <div style={{ fontSize: 18, marginBottom: 16, textTransform: 'capitalize', zIndex: 5, position: 'relative' }}>{WeatherText || 'N/A'}</div>
        <div style={{ display: 'flex', gap: 16, width: '100%', justifyContent: 'space-between', marginTop: 16, zIndex: 5, position: 'relative' }}>
          <div style={{ textAlign: 'center' }}>
            <WiStrongWind size={28} />
            <div style={{ fontSize: 16 }}>
              {Wind?.Speed?.Metric?.Value ?? 'N/A'}<span style={{ fontSize: 12 }}>km/h</span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <WiHumidity size={28} />
            <div style={{ fontSize: 16 }}>{RelativeHumidity ?? 'N/A'}%</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <WiThermometer size={28} />
            <div style={{ fontSize: 16 }}>
              {realFeelValue !== null ? `${Math.round(realFeelValue)}°C` : 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
