import React, { useState } from 'react';
import './ApiTester.css';

const ApiTester: React.FC = () => {
  // Form state
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('/users');
  const [body, setBody] = useState('{}');

  // Logs for request and response
  const [openAiRequest, setOpenAiRequest] = useState<object | null>(null);
  const [response, setResponse] = useState<any>(null);

  // Send API request
  const sendRequest = async () => {
    try {
      const parsedBody = JSON.parse(body);

      // Save full OpenAI request object for display
      if (endpoint === '/openai' && method === 'POST') {
        const openAiFormattedRequest = {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: parsedBody.question }],
          max_tokens: 500,
        };
        setOpenAiRequest(openAiFormattedRequest);
      } else {
        setOpenAiRequest(null);
      }

      const res = await fetch(`http://localhost:4000${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: method !== 'GET' && method !== 'DELETE' ? JSON.stringify(parsedBody) : undefined,
      });

      const data = await res.json();
      setResponse(data); // no JSON.stringify

    } catch (err: any) {
      setResponse(`Error: ${err.message}`);
    }
  };

  // Fill in a sample GPT prompt
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

      {/* Preload OpenAI example */}
      <button className="fill-button" onClick={fillGptPrompt}>
        Load GPT Example Prompt
      </button>

      {/* Method + endpoint selection */}
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

      {/* Request body (for POST/DELETE) */}
      {method !== 'GET' && method !== 'DELETE' && (
        <textarea
          className="request-body"
          placeholder='{"question": "What is the ocean?"}'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      )}

      {/* Submit request */}
      <button className="send-button" onClick={sendRequest}>
        Send Request
      </button>

      {/* Display OpenAI formatted request */}
      {openAiRequest && (
        <div className="box">
          <h3>📤 OpenAI Request Payload</h3>
          <pre className="request-output">
            {JSON.stringify(openAiRequest, null, 2)}
          </pre>
        </div>
      )}

      {/* Display response */}
      {response && (
  <div className="box">
    <h3>📥 API Response</h3>

    {/* If OpenAI response */}
    {response.response?.content ? (
      <>
        <p><strong>Assistant says:</strong></p>
        <div className="assistant-response">{response.response.content}</div>
        <details>
          <summary>View Full Response</summary>
          <pre className="response-output">
            {JSON.stringify(response, null, 2)}
          </pre>
        </details>
      </>
    ) : (
      <pre className="response-output">
        {JSON.stringify(response, null, 2)}
      </pre>
    )}
  </div>
)}
    </div>
  );
};

export default ApiTester;
