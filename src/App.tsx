import React, { useState } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';

const App: React.FC = () => {
  const [response, setResponse] = useState<string>('');
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const handleStart = async () => {
    try {
      const requestBody = {
        image_path: 'https://lambda.com',
        success: true,
        message: '失敗しました',
        class_name: 1,
        confidence: '0.0004',
        request_timestamp: '2024-04-22T00:00:00+09:00',
        response_timestamp: '2024-04-23T12:00:00+09:00'
      };

      const response = await axios.post('http://127.0.0.1:8000/ai_analysis_logs/create/', requestBody);
      setResponse(JSON.stringify(response.data, null, 2));
      setStatusCode(response.status);
    } catch (error: any) {
      setResponse(error.message);
      setStatusCode(error.response?.status || null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={reactLogo} className="App-logo" alt="logo" />
        <img src={viteLogo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        
        <button className="App-link" onClick={handleStart}>
          開始！
        </button>
        {statusCode && <p>Status Code: {statusCode}</p>}
        {response && <pre>{response}</pre>}
      </header>
    </div>
  );
}

export default App;