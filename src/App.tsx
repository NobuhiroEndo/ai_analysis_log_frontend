import React from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import ResponseDisplay from './components/ResponseDisplay'
import StartButton from './components/StartButton'
import ImagePathInput from './components/ImagePathInput'
import { DataProvider } from './contexts/DataContext'

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <DataProvider>
        <div className="input-container">
          <ImagePathInput />
          <StartButton />
        </div>
        <ResponseDisplay />
      </DataProvider>
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <header className="App-header">
      <img src={reactLogo} className="App-logo" alt="logo" />
      <img src={viteLogo} className="App-logo" alt="loog" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
    </header>
  );
};

export default App;