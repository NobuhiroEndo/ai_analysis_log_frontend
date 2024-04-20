import React from 'react';
import { useData } from '../contexts/DataContext';

const ResponseDisplay: React.FC = () => {
  const { response, statusCode } = useData();

  return (
    <div>
      {statusCode && <p>Status Code: {statusCode}</p>}
      {response && <pre>{response}</pre>}
    </div>
  );
};

export default ResponseDisplay;