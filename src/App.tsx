import './App.css'
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle';
import WeatherCard from './components/WeatherCard';
import AddWeatherCard from './components/AddWeatherCard';
import React from 'react';

function App() {
  const [cards, setCards] = React.useState([
    { id: 'cairo', location: 'Cairo' },
    { id: 'london', location: 'London' },
    { id: 'tokyo', location: 'Tokyo' },
  ]);

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
        <WeatherCard key={card.id} id={card.id} initialLocation={card.location} onRemove={id => setCards(cards.filter(c => c.id !== id))} />
      ))}
      <AddWeatherCard onAdd={handleAddCard} />
    </div>
  )
}

export default App
