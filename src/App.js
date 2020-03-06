import React from 'react';
import Navbar from './components/navbar/Navbar'
import SL from './components/sl/SL';
import Weather from './components/weather/Weather';
import '@fortawesome/fontawesome-free/js/all'
import 'bulma';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Weather/>
      <SL/>
    </div>
  );
}

export default App;
