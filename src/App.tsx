import { useState } from 'react'
import './App.css'
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle';

function App() {


  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <DarkModeToggle />
      </div>
    
    </div>
  )
}

export default App
