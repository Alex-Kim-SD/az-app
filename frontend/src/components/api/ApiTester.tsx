import React, { useState } from 'react';
import './ApiTester.css';

// This component allows users to test API endpoints by sending GET, POST, or DELETE requests.
const ApiTester: React.FC = () => {
  // Form state
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('/users');
  const [body, setBody] = useState('{}');

  // Server response
  const [response, setResponse] = useState<string | null>(null);

  // Send the request
  const sendRequest = async () => {
    try {
      const res = await fetch(`http://localhost:4000${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: method !== 'GET' && method !== 'DELETE' ? body : undefined,
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResponse(`Error: ${err.message}`);
    }
  };

  // Preload GPT text-only example
  const fillGptPrompt = () => {
    setMethod('POST');
    setEndpoint('/openai');
    setBody(JSON.stringify(
      {
        question: 'What are three fun facts about the ocean?',
      },
      null,
      2
    ));
  };

  return (
    <div className="api-tester">
      <h2>API Tester</h2>

      {/* Preset example for OpenAI text input */}
      <button className="fill-button" onClick={fillGptPrompt}>
        Load GPT Example Prompt
      </button>

      {/* Method + Endpoint input */}
      <div className="method-endpoint">
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="DELETE">DELETE</option>
        </select>

        <input
          type="text"
          placeholder="/users or /openai"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
        />
      </div>

      {/* JSON body input for POST/PUT requests */}
      {method !== 'GET' && method !== 'DELETE' && (
        <textarea
          className="request-body"
          placeholder='{"key":"value"}'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      )}

      {/* Send button */}
      <button className="send-button" onClick={sendRequest}>
        Send Request
      </button>

      {/* Server response output */}
      {response && (
        <pre className="response-output">
          {response}
        </pre>
      )}
    </div>
  );
};

export default ApiTester;