import './App.css'
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle';
import WeatherCard from './components/WeatherCard';
import AddWeatherCard from './components/AddWeatherCard';
import React, { useEffect, useState } from 'react';
import { fetchCurrentCondition } from './services/accuweather';
import type { AccuWeatherCurrentCondition } from './services/accuweather';
import Modal from './components/Modal';

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
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

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

  const handleCardClick = (card: CardData) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <DarkModeToggle />
      </div>
      <div style={{ display: 'flex', overflowX: 'auto', padding: '16px', flexShrink: 0 }}>
        {cards.map(card => (
          <WeatherCard
            key={card.id}
            id={card.id}
            location={card.location}
            condition={card.condition}
            onRemove={id => setCards(cards.filter(c => c.id !== id))}
            onClick={() => handleCardClick(card)}
          />
        ))}
        <AddWeatherCard onAdd={handleAddCard} />
      </div>

      <Modal isOpen={!!selectedCard} onClose={handleCloseModal}>
        {selectedCard && (
          <div>
            <h2>{selectedCard.location}</h2>
            {/* Future tabs will go here */}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default App
