import React from 'react';
import { WiStrongWind, WiHumidity, WiThermometer, WiBarometer, WiDaySunny, WiNightClear, WiRaindrop, WiCloudy } from 'react-icons/wi';
import { BsEye } from 'react-icons/bs';
import { FaTemperatureHigh, FaTemperatureLow, FaCompass } from 'react-icons/fa';

interface DetailedWeatherData {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: string | null;
  IsDayTime: boolean;
  Temperature: {
    Metric: { Value: number; Unit: string; UnitType: number };
    Imperial: { Value: number | { source: string; parsedValue: number }; Unit: string; UnitType: number };
  };
  RealFeelTemperature: {
    Metric: { Value: number; Unit: string; UnitType: number; Phrase: string };
    Imperial: { Value: number | { source: string; parsedValue: number }; Unit: string; UnitType: number; Phrase: string };
  };
  RealFeelTemperatureShade: {
    Metric: { Value: number; Unit: string; UnitType: number; Phrase: string };
    Imperial: { Value: number | { source: string; parsedValue: number }; Unit: string; UnitType: number; Phrase: string };
  };
  RelativeHumidity: number;
  IndoorRelativeHumidity: number;
  DewPoint: {
    Metric: { Value: number; Unit: string; UnitType: number };
    Imperial: { Value: number | { source: string; parsedValue: number }; Unit: string; UnitType: number };
  };
  Wind: {
    Direction: { Degrees: number; Localized: string; English: string };
    Speed: {
      Metric: { Value: number; Unit: string; UnitType: number };
      Imperial: { Value: number; Unit: string; UnitType: number };
    };
  };
  WindGust: {
    Speed: {
      Metric: { Value: number; Unit: string; UnitType: number };
      Imperial: { Value: number; Unit: string; UnitType: number };
    };
  };
  UVIndex: number;
  UVIndexText: string;
  Visibility: {
    Metric: { Value: number; Unit: string; UnitType: number };
    Imperial: { Value: number | { source: string; parsedValue: number }; Unit: string; UnitType: number };
  };
  ObstructionsToVisibility: string;
  CloudCover: number;
  Ceiling: {
    Metric: { Value: number | { source: string; parsedValue: number }; Unit: string; UnitType: number };
    Imperial: { Value: number | { source: string; parsedValue: number }; Unit: string; UnitType: number };
  };
  Pressure: {
    Metric: { Value: number | { source: string; parsedValue: number }; Unit: string; UnitType: number };
    Imperial: { Value: number; Unit: string; UnitType: number };
  };
  PressureTendency: { LocalizedText: string; Code: string };
  Past24HourTemperatureDeparture: {
    Metric: { Value: number; Unit: string; UnitType: number };
    Imperial: { Value: number | { source: string; parsedValue: number }; Unit: string; UnitType: number };
  };
  ApparentTemperature: {
    Metric: { Value: number; Unit: string; UnitType: number };
    Imperial: { Value: number | { source: string; parsedValue: number }; Unit: string; UnitType: number };
  };
  WindChillTemperature: {
    Metric: { Value: number; Unit: string; UnitType: number };
    Imperial: { Value: number | { source: string; parsedValue: number }; Unit: string; UnitType: number };
  };
  WetBulbTemperature: {
    Metric: { Value: number; Unit: string; UnitType: number };
    Imperial: { Value: number | { source: string; parsedValue: number }; Unit: string; UnitType: number };
  };
  WetBulbGlobeTemperature: {
    Metric: { Value: number; Unit: string; UnitType: number };
    Imperial: { Value: number | { source: string; parsedValue: number }; Unit: string; UnitType: number };
  };
  Precip1hr: {
    Metric: { Value: number | { source: string; parsedValue: number }; Unit: string; UnitType: number };
    Imperial: { Value: number | { source: string; parsedValue: number }; Unit: string; UnitType: number };
  };
  TemperatureSummary: {
    Past6HourRange: {
      Minimum: {
        Metric: { Value: number; Unit: string; UnitType: number };
        Imperial: { Value: number | { source: string; parsedValue: number }; Unit: string; UnitType: number };
      };
      Maximum: {
        Metric: { Value: number; Unit: string; UnitType: number };
        Imperial: { Value: number | { source: string; parsedValue: number }; Unit: string; UnitType: number };
      };
    };
    Past12HourRange: {
      Minimum: {
        Metric: { Value: number; Unit: string; UnitType: number };
        Imperial: { Value: number | { source: string; parsedValue: number }; Unit: string; UnitType: number };
      };
      Maximum: {
        Metric: { Value: number; Unit: string; UnitType: number };
        Imperial: { Value: number | { source: string; parsedValue: number }; Unit: string; UnitType: number };
      };
    };
    Past24HourRange: {
      Minimum: {
        Metric: { Value: number; Unit: string; UnitType: number };
        Imperial: { Value: number | { source: string; parsedValue: number }; Unit: string; UnitType: number };
      };
      Maximum: {
        Metric: { Value: number; Unit: string; UnitType: number };
        Imperial: { Value: number | { source: string; parsedValue: number }; Unit: string; UnitType: number };
      };
    };
  };
  MobileLink: string;
  Link: string;
}

interface WeatherDetailsViewProps {
  location: string;
  weatherData: DetailedWeatherData;
}

const WeatherDetailsView: React.FC<WeatherDetailsViewProps> = ({ location, weatherData }) => {
  const getValue = (value: number | { source: string; parsedValue: number }): number => {
    return typeof value === 'number' ? value : value.parsedValue;
  };

  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getUVColor = (uvIndex: number) => {
    if (uvIndex <= 2) return '#22c55e'; // Green
    if (uvIndex <= 5) return '#eab308'; // Yellow
    if (uvIndex <= 7) return '#f97316'; // Orange
    if (uvIndex <= 10) return '#ef4444'; // Red
    return '#8b5cf6'; // Purple
  };

  const getPressureTendencyIcon = (tendency: string) => {
    switch (tendency.toLowerCase()) {
      case 'rising': return '↗️';
      case 'falling': return '↘️';
      default: return '➡️';
    }
  };

  const isDayTime = weatherData.IsDayTime;

  return (
    <div style={{
      color: isDayTime ? '#1f2937' : '#f3f4f6',
      background: isDayTime 
        ? 'linear-gradient(135deg, #bfdbfe 0%, #dbeafe 50%, #f0f9ff 100%)'
        : 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
      borderRadius: '16px',
      padding: '24px',
      maxWidth: '600px',
      margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          margin: '0 0 8px 0',
          color: isDayTime ? '#1f2937' : '#f9fafb'
        }}>
          {location}
        </h2>
        <p style={{ 
          fontSize: '16px', 
          margin: '0 0 16px 0',
          color: isDayTime ? '#6b7280' : '#d1d5db',
          fontWeight: '500'
        }}>
          {formatTime(weatherData.LocalObservationDateTime)}
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '16px'
        }}>
          <div style={{ fontSize: '48px', fontWeight: '700' }}>
            {Math.round(weatherData.Temperature.Metric.Value)}°C
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '18px', fontWeight: '600', textTransform: 'capitalize' }}>
              {weatherData.WeatherText}
            </div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              Feels like {Math.round(weatherData.RealFeelTemperature.Metric.Value)}°C
            </div>
          </div>
        </div>
      </div>

      {/* Main Weather Info Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {/* Temperature Details */}
        <div style={{
          background: isDayTime ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '20px',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${isDayTime ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)'}`
        }}>
          <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <WiThermometer size={24} />
            Temperature Details
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
            <div>
              <div style={{ opacity: 0.8 }}>Current</div>
              <div style={{ fontWeight: '600' }}>{Math.round(weatherData.Temperature.Metric.Value)}°C</div>
            </div>
            <div>
              <div style={{ opacity: 0.8 }}>Real Feel</div>
              <div style={{ fontWeight: '600' }}>{Math.round(weatherData.RealFeelTemperature.Metric.Value)}°C</div>
            </div>
            <div>
              <div style={{ opacity: 0.8 }}>In Shade</div>
              <div style={{ fontWeight: '600' }}>{Math.round(weatherData.RealFeelTemperatureShade.Metric.Value)}°C</div>
            </div>
            <div>
              <div style={{ opacity: 0.8 }}>Dew Point</div>
              <div style={{ fontWeight: '600' }}>{Math.round(weatherData.DewPoint.Metric.Value)}°C</div>
            </div>
          </div>
        </div>

        {/* Wind Information */}
        <div style={{
          background: isDayTime ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '20px',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${isDayTime ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)'}`
        }}>
          <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <WiStrongWind size={24} />
            Wind Information
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
            <div>
              <div style={{ opacity: 0.8 }}>Speed</div>
              <div style={{ fontWeight: '600' }}>{weatherData.Wind.Speed.Metric.Value} km/h</div>
            </div>
            <div>
              <div style={{ opacity: 0.8 }}>Direction</div>
              <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <FaCompass size={12} />
                {weatherData.Wind.Direction.Localized} ({weatherData.Wind.Direction.Degrees}°)
              </div>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ opacity: 0.8 }}>Gust Speed</div>
              <div style={{ fontWeight: '600' }}>{weatherData.WindGust.Speed.Metric.Value} km/h</div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Info Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {/* Humidity */}
        <div style={{
          background: isDayTime ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${isDayTime ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.15)'}`
        }}>
          <WiHumidity size={32} style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>Humidity</div>
          <div style={{ fontSize: '20px', fontWeight: '600' }}>{weatherData.RelativeHumidity}%</div>
        </div>

        {/* UV Index */}
        <div style={{
          background: isDayTime ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${isDayTime ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.15)'}`
        }}>
          {isDayTime ? <WiDaySunny size={32} style={{ marginBottom: '8px', color: getUVColor(weatherData.UVIndex) }} /> : <WiNightClear size={32} style={{ marginBottom: '8px' }} />}
          <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>UV Index</div>
          <div style={{ fontSize: '20px', fontWeight: '600', color: getUVColor(weatherData.UVIndex) }}>
            {weatherData.UVIndex} - {weatherData.UVIndexText}
          </div>
        </div>

        {/* Visibility */}
        <div style={{
          background: isDayTime ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${isDayTime ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.15)'}`
        }}>
          <BsEye size={32} style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>Visibility</div>
          <div style={{ fontSize: '20px', fontWeight: '600' }}>
            {getValue(weatherData.Visibility.Metric.Value)} km
          </div>
        </div>

        {/* Cloud Cover */}
        <div style={{
          background: isDayTime ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${isDayTime ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.15)'}`
        }}>
          <WiCloudy size={32} style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>Cloud Cover</div>
          <div style={{ fontSize: '20px', fontWeight: '600' }}>{weatherData.CloudCover}%</div>
        </div>
      </div>

      {/* Pressure and Additional Info */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {/* Pressure */}
        <div style={{
          background: isDayTime ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '20px',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${isDayTime ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)'}`
        }}>
          <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <WiBarometer size={24} />
            Pressure
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '600' }}>
                {getValue(weatherData.Pressure.Metric.Value)} mb
              </div>
              <div style={{ fontSize: '14px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px' }}>
                {getPressureTendencyIcon(weatherData.PressureTendency.LocalizedText)}
                {weatherData.PressureTendency.LocalizedText}
              </div>
            </div>
          </div>
        </div>

        {/* Precipitation */}
        <div style={{
          background: isDayTime ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '20px',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${isDayTime ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)'}`
        }}>
          <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <WiRaindrop size={24} />
            Precipitation
          </h3>
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '8px' }}>
              <span style={{ opacity: 0.8 }}>Past Hour: </span>
              <span style={{ fontWeight: '600' }}>{getValue(weatherData.Precip1hr.Metric.Value)} mm</span>
            </div>
            <div>
              <span style={{ opacity: 0.8 }}>Status: </span>
              <span style={{ fontWeight: '600' }}>
                {weatherData.HasPrecipitation 
                  ? `${weatherData.PrecipitationType}` 
                  : 'No precipitation'
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Temperature Range Summary */}
      <div style={{
        background: isDayTime ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '20px',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${isDayTime ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)'}`
      }}>
        <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaTemperatureHigh size={20} />
          24-Hour Temperature Range
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
              <FaTemperatureLow size={16} style={{ color: '#3b82f6' }} />
              <span style={{ fontSize: '14px', opacity: 0.8 }}>Minimum</span>
            </div>
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#3b82f6' }}>
              {Math.round(getValue(weatherData.TemperatureSummary.Past24HourRange.Minimum.Metric.Value))}°C
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
              <FaTemperatureHigh size={16} style={{ color: '#ef4444' }} />
              <span style={{ fontSize: '14px', opacity: 0.8 }}>Maximum</span>
            </div>
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#ef4444' }}>
              {Math.round(getValue(weatherData.TemperatureSummary.Past24HourRange.Maximum.Metric.Value))}°C
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
              <WiThermometer size={16} />
              <span style={{ fontSize: '14px', opacity: 0.8 }}>Departure</span>
            </div>
            <div style={{ fontSize: '18px', fontWeight: '600' }}>
              {weatherData.Past24HourTemperatureDeparture.Metric.Value > 0 ? '+' : ''}
              {Math.round(weatherData.Past24HourTemperatureDeparture.Metric.Value)}°C
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetailsView; 