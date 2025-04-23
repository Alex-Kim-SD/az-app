// Import React and useState hook for state management
import React, { useState } from 'react';

// Define a functional component named ApiTester
const ApiTester: React.FC = () => {
  // State to track which HTTP method the user selects (GET, POST, DELETE, etc.)
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('/users');
  const [body, setBody] = useState('{}');
  const [response, setResponse] = useState<string | null>(null);

  // Function that runs when the "Send" button is clicked
  const sendRequest = async () => {
    try {
      // Make a request to the backend using fetch
      const res = await fetch(`http://localhost:4000${endpoint}`, {
        method, // Use selected method (GET, POST, DELETE, etc.)
        headers: {
          'Content-Type': 'application/json',
        },
        // Only send a body if it's not a GET or DELETE request
        body: method !== 'GET' && method !== 'DELETE' ? body : undefined,
      });

      // Convert the response to JSON
      const data = await res.json();

      // Format and store the response for display
      setResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      // If there's an error (e.g. network or server), show it
      setResponse(`Error: ${err.message}`);
    }
  };

  // The JSX that renders the UI for the API Tester
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '2rem' }}>
      <h2>API Tester</h2>

      {/* Dropdown to select HTTP method */}
      <div>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="DELETE">DELETE</option>
        </select>

        {/* Input field to type the endpoint path */}
        <input
          style={{ width: '60%', marginLeft: '1rem' }}
          type="text"
          placeholder="/users or /users/:id"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
        />
      </div>

      {/* If it's a method that accepts a body, show a textarea to type it in */}
      {method !== 'GET' && method !== 'DELETE' && (
        <div>
          <textarea
            style={{ width: '100%', height: '100px', marginTop: '1rem' }}
            placeholder='{"name":"Alex","email":"alex@example.com","role":"admin"}'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      )}

      {/* Send button triggers the fetch request */}
      <button onClick={sendRequest} style={{ marginTop: '1rem' }}>
        Send
      </button>

      {/* Display the response or error after the request */}
      {response && (
  <pre
    style={{
      marginTop: '1rem',
      background: '#f6f8fa',
      padding: '1rem',
      userSelect: 'text',           // ✅ allows mouse highlight + copy
      fontFamily: 'monospace',      // cleaner look for JSON
    }}
  >
    {response}
  </pre>
)}

    </div>
  );
};

// Export the component so you can use <ApiTester /> elsewhere
export default ApiTester;
