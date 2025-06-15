import './App.css'
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle';
import WeatherCard from './components/WeatherCard';

function App() {


  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <DarkModeToggle />
      </div>
      <WeatherCard id="cairo" initialLocation="Cairo" />
      <WeatherCard id="london" initialLocation="London" />
      <WeatherCard id="tokyo" initialLocation="Tokyo" />
    </div>
  )
}

export default App
