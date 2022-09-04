import React from 'react';
import ButtonAppBar from "./components/Navbar";
import './App.css';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
      <ButtonAppBar />
      <HomePage />
    </div>
  );
}

export default App;
