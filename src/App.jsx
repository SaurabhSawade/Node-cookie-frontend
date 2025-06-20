import React, { useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:4000';

function App() {
  const [response, setResponse] = useState('');

  const handleRequest = async (endpoint) => {
    try {
      const res = await axios.get(`${API}${endpoint}`, { withCredentials: true });
      setResponse(`${res.status}: ${JSON.stringify(res.data)}`);
    } catch (err) {
      if (err.response) {
        setResponse(`${err.response.status}: ${JSON.stringify(err.response.data)}`);
      } else {
        setResponse('Network error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">🍪 Cookie & Status Demo</h1>

      <div className="grid gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleRequest('/set-cookie')}>
          Set Cookie
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleRequest('/get-cookie')}>
          Get Cookie
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => handleRequest('/status/200')}>
          Status 200
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => handleRequest('/status/201')}>
          Status 201
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleRequest('/status/400')}>
          Status 400
        </button>
        <button className="bg-red-700 text-white px-4 py-2 rounded" onClick={() => handleRequest('/status/404')}>
          Status 404
        </button>
        <button className="bg-black text-white px-4 py-2 rounded" onClick={() => handleRequest('/status/500')}>
          Status 500
        </button>
      </div>

      <div className="mt-6 p-4 bg-white rounded shadow">
        <strong>Response:</strong>
        <pre className="text-sm mt-2">{response}</pre>
      </div>
    </div>
  );
}

export default App;