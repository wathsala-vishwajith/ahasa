import React, { useState } from 'react';
import type { AccuWeatherLocation } from '../services/accuweather';
import { fetchLocationAutocomplete, fetchCurrentCondition } from '../services/accuweather';

// Helper to determine if it's day time (6 AM to 6 PM)
const isDayTime = () => {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18;
};

// Helper to get card background based on day/night (same as WeatherCard)
const getCardBackground = (isDay: boolean) => {
  return isDay
    ? 'linear-gradient(135deg, #7fd8ff 0%, #a6e0ff 100%)'
    : 'linear-gradient(135deg, #232946 0%, #3a3f5a 100%)';
};

interface AddWeatherCardProps {
  onAdd: (city: string, locationKey?: string, condition?: any) => void;
}

const AddWeatherCard: React.FC<AddWeatherCardProps> = ({ onAdd }) => {
  const [input, setInput] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [suggestions, setSuggestions] = useState<AccuWeatherLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<AccuWeatherLocation | null>(null);
  
  const isDay = isDayTime();

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setSelectedSuggestion(null); // Clear selection on input change
    if (e.target.value.length > 1) {
      setLoading(true);
      setError(null);
      try {
        const results = await fetchLocationAutocomplete(e.target.value);
        setSuggestions(results);
      } catch (err) {
        setError('Failed to fetch suggestions');
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (loc: AccuWeatherLocation) => {
    setInput(loc.LocalizedName);
    setSelectedSuggestion(loc);
    setSuggestions([]);
    // Do not auto-add, wait for user to click Add
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSuggestion) {
      setLoading(true);
      setError(null);
      try {
        const condition = await fetchCurrentCondition(selectedSuggestion.Key);
        onAdd(selectedSuggestion.LocalizedName, selectedSuggestion.Key, condition);
        setInput('');
        setShowInput(false);
        setSelectedSuggestion(null);
      } catch (err) {
        setError('Failed to fetch weather');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      style={{
        width: window.innerWidth <= 768 ? 220 : 260,
        borderRadius: 24,
        padding: window.innerWidth <= 768 ? 16 : 24,
        background: getCardBackground(isDay),
        color: isDay ? '#1f2937' : '#f9fafb',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        margin: window.innerWidth <= 768 ? 8 : 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: window.innerWidth <= 768 ? 280 : 360,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        position: 'relative',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        flexShrink: 0,
      }}
      onClick={() => setShowInput(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!showInput ? (
        <>
          <div style={{ 
            fontSize: 64, 
            fontWeight: 700, 
            marginBottom: 8,
            opacity: isHovered ? 0.8 : 1,
            transition: 'opacity 0.2s ease-in-out'
          }}>+</div>
          <div style={{ 
            fontSize: 18, 
            color: isDay ? 'rgba(31, 41, 55, 0.8)' : 'rgba(249, 250, 251, 0.9)',
            fontWeight: 500
          }}>Add City</div>
        </>
      ) : (
        <form onSubmit={handleAdd} style={{ width: '100%', position: 'relative' }} autoComplete="off">
          <input
            type="text"
            placeholder="Enter city name..."
            value={input}
            onChange={handleInput}
            autoFocus
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 12,
              border: `1px solid ${isDay ? 'rgba(31, 41, 55, 0.3)' : 'rgba(255, 255, 255, 0.4)'}`,
              fontSize: 16,
              marginBottom: 8,
              backgroundColor: isDay ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.15)',
              color: isDay ? '#1f2937' : '#f9fafb',
              outline: 'none',
              transition: 'all 0.2s ease-in-out',
            }}
          />
          {loading && <div style={{ 
            fontSize: 14, 
            color: isDay ? 'rgba(31, 41, 55, 0.7)' : 'rgba(249, 250, 251, 0.8)',
            fontStyle: 'italic'
          }}>Loading...</div>}
          {error && <div style={{ 
            fontSize: 14, 
            color: isDay ? '#dc2626' : '#f87171',
            fontWeight: 500
          }}>{error}</div>}
          {suggestions.length > 0 && (
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              position: 'absolute',
              top: 52,
              left: 0,
              right: 0,
              background: isDay ? 'rgba(255, 255, 255, 0.98)' : 'rgba(30, 41, 59, 0.95)',
              border: `1px solid ${isDay ? 'rgba(31, 41, 55, 0.25)' : 'rgba(255, 255, 255, 0.4)'}`,
              borderRadius: 12,
              zIndex: 10,
              maxHeight: 180,
              overflowY: 'auto',
              color: isDay ? '#1f2937' : '#f9fafb',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}>
              {suggestions.map(s => (
                <li
                  key={s.Key}
                  style={{ 
                    padding: 12, 
                    cursor: 'pointer', 
                    borderBottom: `1px solid ${isDay ? 'rgba(31, 41, 55, 0.15)' : 'rgba(255, 255, 255, 0.15)'}`,
                    transition: 'background-color 0.2s ease-in-out'
                  }}
                  onClick={e => { e.stopPropagation(); handleSelect(s); }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDay ? 'rgba(31, 41, 55, 0.08)' : 'rgba(255, 255, 255, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {s.LocalizedName}, {s.AdministrativeArea.LocalizedName}, {s.Country.LocalizedName}
                </li>
              ))}
            </ul>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 12,
              border: 'none',
              background: isDay 
                ? 'linear-gradient(135deg, #ffb700 0%, #ffa500 100%)' 
                : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 16,
              cursor: selectedSuggestion ? 'pointer' : 'not-allowed',
              marginTop: 8,
              opacity: selectedSuggestion ? 1 : 0.5,
            }}
            disabled={!selectedSuggestion || loading}
          >
            Add
          </button>
        </form>
      )}
    </div>
  );
};

export default AddWeatherCard;
