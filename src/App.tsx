import './App.css'
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle';
import WeatherCard from './components/WeatherCard';
import AddWeatherCard from './components/AddWeatherCard';
import React, { useEffect, useState } from 'react';
import { fetchCurrentCondition, fetchDetailedCurrentCondition } from './services/accuweather';
import type { AccuWeatherCurrentCondition } from './services/accuweather';
import Modal from './components/Modal';
import WeatherDetailsView from './components/WeatherDetailsView';

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
  const [detailedWeatherData, setDetailedWeatherData] = useState<any | null>(null);
  const [loadingDetailedData, setLoadingDetailedData] = useState(false);

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

  const handleCardClick = async (card: CardData) => {
    setSelectedCard(card);
    setDetailedWeatherData(null);
    
    if (card.locationKey) {
      setLoadingDetailedData(true);
      try {
        const detailedData = await fetchDetailedCurrentCondition(card.locationKey);
        setDetailedWeatherData(detailedData);
      } catch (error) {
        console.error(`Failed to fetch detailed weather for ${card.location}`, error);
      } finally {
        setLoadingDetailedData(false);
      }
    }
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setDetailedWeatherData(null);
    setLoadingDetailedData(false);
  };

  return (
    <div style={{ 
      position: 'relative', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{ 
        position: 'absolute', 
        top: '8px', 
        right: '8px',
        zIndex: 10
      }}>
        <DarkModeToggle />
      </div>
      <div style={{ 
        display: 'flex', 
        overflowX: 'auto', 
        overflowY: 'hidden',
        padding: '60px 8px 8px 8px', 
        flexShrink: 0,
        height: '100%',
        alignItems: 'center'
      }}>
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
            {loadingDetailedData ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px',
                color: '#6b7280' 
              }}>
                <div style={{ fontSize: '18px', marginBottom: '16px' }}>
                  Loading detailed weather data...
                </div>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  border: '4px solid #e5e7eb',
                  borderTop: '4px solid #3b82f6',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto'
                }} />
              </div>
            ) : detailedWeatherData ? (
              <WeatherDetailsView 
                location={selectedCard.location} 
                weatherData={detailedWeatherData} 
              />
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px',
                color: '#6b7280' 
              }}>
                <h2 style={{ marginBottom: '16px' }}>{selectedCard.location}</h2>
                <p>Unable to load detailed weather data</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default App
