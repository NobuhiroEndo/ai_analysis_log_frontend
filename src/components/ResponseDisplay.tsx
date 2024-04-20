import React from 'react';
import { useData } from '../contexts/DataContext';

const ResponseDisplay: React.FC = () => {
  const { response2, statusCode2 } = useData();

  return (
    <div>
      {statusCode2 && (
      <>  
        <p>Status Code: {statusCode2}</p>
        <p>次の値を保存しました</p>
      </>
      )}
      {response2 && <pre>{response2}</pre>}
    </div>
  );
};

export default ResponseDisplay;