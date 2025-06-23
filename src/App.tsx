import './App.css'
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle';
import WeatherCard from './components/WeatherCard';
import AddWeatherCard from './components/AddWeatherCard';
import { useEffect, useState } from 'react';
import { fetchCurrentCondition, fetchDetailedCurrentCondition } from './services/accuweather';
import type { AccuWeatherCurrentCondition } from './services/accuweather';
import Modal from './components/Modal';
import WeatherDetailsView from './components/WeatherDetailsView';
import useDarkMode from './hooks/useDarkMode';

interface CardData {
  id: string;
  location: string;
  locationKey?: string;
  condition?: AccuWeatherCurrentCondition | null;
}

// Local storage key for saved weather cards
const STORAGE_KEY = 'ahasa-weather-cards';

// Helper functions for localStorage
const saveCardsToStorage = (cards: CardData[]) => {
  try {
    // Only save essential data (without condition data)
    const cardsToSave = cards.map(card => ({
      id: card.id,
      location: card.location,
      locationKey: card.locationKey
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cardsToSave));
  } catch (error) {
    console.error('Failed to save cards to localStorage:', error);
  }
};

const loadCardsFromStorage = (): CardData[] => {
  try {
    const savedCards = localStorage.getItem(STORAGE_KEY);
    if (savedCards) {
      return JSON.parse(savedCards);
    }
  } catch (error) {
    console.error('Failed to load cards from localStorage:', error);
  }
  return [];
};

function App() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [detailedWeatherData, setDetailedWeatherData] = useState<any | null>(null);
  const [loadingDetailedData, setLoadingDetailedData] = useState(false);
  const darkMode = useDarkMode();

  // Load cards from localStorage on app initialization
  useEffect(() => {
    const savedCards = loadCardsFromStorage();
    if (savedCards.length > 0) {
      setCards(savedCards);
    }
  }, []);

  // Fetch weather conditions for loaded cards
  useEffect(() => {
    const fetchInitialConditions = async () => {
      if (cards.length === 0) return;
      
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
  }, [cards.length]); // Only run when cards are first loaded or count changes

  // Save cards to localStorage whenever cards change
  useEffect(() => {
    if (cards.length > 0) {
      saveCardsToStorage(cards);
    } else {
      // Clear storage when no cards remain
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [cards]);

  const handleAddCard = (city: string, locationKey?: string, condition?: any) => {
    const id = (locationKey || city.toLowerCase().replace(/\s+/g, '-'));
    if (!cards.some(card => card.id === id)) {
      const newCard = { id, location: city, locationKey, condition };
      setCards(prevCards => [...prevCards, newCard]);
    }
  };

  const handleRemoveCard = (id: string) => {
    setCards(prevCards => prevCards.filter(c => c.id !== id));
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
        alignItems: 'center',
        justifyContent: cards.length === 0 ? 'center' : 'flex-start'
      }}>
        {cards.length === 0 ? (
          <div style={{
            textAlign: 'center',
            marginBottom: '120px'
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              marginBottom: '8px', 
              fontWeight: 600,
              color: darkMode ? '#f9fafb' : '#1f2937'
            }}>
              Welcome to Ahasa Weather
            </h2>
            <p style={{ 
              fontSize: '16px', 
              marginBottom: '24px',
              color: darkMode ? 'rgba(249, 250, 251, 0.8)' : 'rgba(31, 41, 55, 0.8)'
            }}>
              Start by adding your first city to see the weather
            </p>
            <AddWeatherCard onAdd={handleAddCard} />
          </div>
        ) : (
          <>
            {cards.map(card => (
              <WeatherCard
                key={card.id}
                id={card.id}
                location={card.location}
                condition={card.condition}
                onRemove={handleRemoveCard}
                onClick={() => handleCardClick(card)}
              />
            ))}
            <AddWeatherCard onAdd={handleAddCard} />
          </>
        )}
      </div>

      <Modal isOpen={!!selectedCard} onClose={handleCloseModal}>
        {selectedCard && (
          <div>
            {loadingDetailedData ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px',
                color: darkMode ? '#d1d5db' : '#6b7280' 
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
                locationKey={selectedCard.locationKey || ''}
              />
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px',
                color: darkMode ? '#d1d5db' : '#6b7280' 
              }}>
                <h2 style={{ 
                  marginBottom: '16px',
                  color: darkMode ? '#f9fafb' : '#1f2937'
                }}>{selectedCard.location}</h2>
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
