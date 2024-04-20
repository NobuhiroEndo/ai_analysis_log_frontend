import React, { useEffect } from 'react';
import axios from 'axios';
import { useData } from '../contexts/DataContext';

const StartButton: React.FC = () => {
    const { imagePath, setResponse, setStatusCode } = useData();

    useEffect(() => {
        axios.defaults.withCredentials = true;
    }, []);

    const handleStart = async () => {
        try {
            const requestBody = {
                image_path: imagePath,
            };

            const response = await axios.post('https://7qpvy8fkel.execute-api.ap-northeast-1.amazonaws.com/dev/ai_analysis_log', requestBody);

            setResponse(JSON.stringify(response.data, null, 2));
            setStatusCode(response.status);
        } catch (error: any) {
            setResponse(JSON.stringify(error.response?.data, null, 2));
            setStatusCode(error.response?.status || null);
        }
    };

    return (
        <button className="App-link" onClick={handleStart}>
            開始！
        </button>
    );
};

export default StartButton;