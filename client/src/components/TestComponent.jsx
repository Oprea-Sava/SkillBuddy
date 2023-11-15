

// client/src/components/TestComponent.js

import React, { useState, useEffect } from 'react';

const TestComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/test');
        console.log(response.url)

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result); 
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'An error occurred while fetching the data.');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>API Test</h2>
      {error ? <p>Error: {error}</p> : null}
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  );
};

export default TestComponent;


