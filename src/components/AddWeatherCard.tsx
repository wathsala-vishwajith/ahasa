import React, { useState } from 'react';
import type { AccuWeatherLocation } from '../services/accuweather';
import { fetchLocationAutocomplete, fetchCurrentCondition } from '../services/accuweather';

interface AddWeatherCardProps {
  onAdd: (city: string, locationKey?: string, condition?: any) => void;
}

const AddWeatherCard: React.FC<AddWeatherCardProps> = ({ onAdd }) => {
  const [input, setInput] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [suggestions, setSuggestions] = useState<AccuWeatherLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
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

  const handleSelect = async (loc: AccuWeatherLocation) => {
    setInput(loc.LocalizedName);
    setSuggestions([]);
    setShowInput(false);
    setLoading(true);
    try {
      const condition = await fetchCurrentCondition(loc.Key);
      onAdd(loc.LocalizedName, loc.Key, condition);
    } catch (err) {
      setError('Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input.trim());
      setInput('');
      setShowInput(false);
    }
  };

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
        minHeight: 360,
        cursor: 'pointer',
        transition: 'background 0.2s',
        position: 'relative',
      }}
      onClick={() => setShowInput(true)}
    >
      {!showInput ? (
        <>
          <div style={{ fontSize: 64, fontWeight: 700, marginBottom: 8 }}>+</div>
          <div style={{ fontSize: 18, color: '#555' }}>Add City</div>
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
              padding: 8,
              borderRadius: 8,
              border: '1px solid #ccc',
              fontSize: 16,
              marginBottom: 8,
            }}
          />
          {loading && <div style={{ fontSize: 14, color: '#888' }}>Loading...</div>}
          {error && <div style={{ fontSize: 14, color: 'red' }}>{error}</div>}
          {suggestions.length > 0 && (
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              position: 'absolute',
              top: 44,
              left: 0,
              right: 0,
              background: '#fff',
              border: '1px solid #ccc',
              borderRadius: 8,
              zIndex: 10,
              maxHeight: 180,
              overflowY: 'auto',
              color: '#232946',
            }}>
              {suggestions.map(s => (
                <li
                  key={s.Key}
                  style={{ padding: 8, cursor: 'pointer', borderBottom: '1px solid #eee' }}
                  onClick={e => { e.stopPropagation(); handleSelect(s); }}
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
              padding: 8,
              borderRadius: 8,
              border: 'none',
              background: '#ffb700',
              color: '#232946',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              marginTop: 8,
            }}
          >
            Add
          </button>
        </form>
      )}
    </div>
  );
};

export default AddWeatherCard;
