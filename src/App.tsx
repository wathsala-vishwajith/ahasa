import './App.css'
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle';
import WeatherCard from './components/WeatherCard';
import AddWeatherCard from './components/AddWeatherCard';
import React, { useEffect, useState } from 'react';
import { fetchCurrentCondition } from './services/accuweather';
import type { AccuWeatherCurrentCondition } from './services/accuweather';

interface CardData {
  id: string;
  location: string;
  locationKey?: string;
  condition?: AccuWeatherCurrentCondition | null;
}

function App() {
  const [cards, setCards] = useState<CardData[]>([
    { id: 'cairo', location: 'Cairo', locationKey: '127164' },
    { id: 'london', location: 'London', locationKey: '328328' },
    { id: 'tokyo', location: 'Tokyo', locationKey: '226396' },
  ]);

  useEffect(() => {
    const fetchInitialConditions = async () => {
      const updatedCards = await Promise.all(
        cards.map(async (card) => {
          if (card.locationKey && !card.condition) {
            try {
              const condition = await fetchCurrentCondition(card.locationKey);
              return { ...card, condition };
            } catch (error) {
              console.error(`Failed to fetch weather for ${card.location}`, error);
              return card; // return original card if fetch fails
            }
          }
          return card;
        })
      );
      setCards(updatedCards);
    };

    fetchInitialConditions();
  }, []); // Run only once on initial load

  const handleAddCard = (city: string, locationKey?: string, condition?: any) => {
    const id = (locationKey || city.toLowerCase().replace(/\s+/g, '-'));
    if (!cards.some(card => card.id === id)) {
      setCards([...cards, { id, location: city, locationKey, condition }]);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <DarkModeToggle />
      </div>
      {cards.map(card => (
        <WeatherCard
          key={card.id}
          id={card.id}
          location={card.location}
          condition={card.condition}
          onRemove={id => setCards(cards.filter(c => c.id !== id))}
        />
      ))}
      <AddWeatherCard onAdd={handleAddCard} />
    </div>
  )
}

export default App
