import { WiDaySunny, WiNightClear, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';
import {
  RainAnimation,
  SnowAnimation,
  CloudAnimation,
  PartlyCloudyAnimation,
  SunRaysAnimation,
  ThunderstormAnimation,
  FogAnimation
} from './WeatherAnimations';

// Helper to get weather animation based on weather icon
export const getWeatherAnimation = (iconNumber: number | null, isDayTime: boolean) => {
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
  if ([6, 7, 8, 9, 10].includes(iconNumber) || !isDayTime) {
    return <CloudAnimation />;
  }
  
  // Default fallback
  return <CloudAnimation />;
};

// Helper to get icon based on weather
export const getWeatherIcon = (iconNumber: number | null, isDay: boolean) => {
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
export const getCardBackground = (isDay: boolean) => {
  return isDay
    ? 'linear-gradient(135deg, #7dd3fc 0%, #bae6fd 100%)'
    : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)';
}; 