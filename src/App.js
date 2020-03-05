import React from 'react';
import Navbar from './components/navbar/Navbar'
import SL from './components/sl/SL';
import YR from './components/yr/YR';
import '@fortawesome/fontawesome-free/js/all'
import 'bulma';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <YR/>
      <SL/>
    </div>
  );
}

export default App;
