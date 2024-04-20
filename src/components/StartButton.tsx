import React, { useEffect } from 'react';
import axios from 'axios';
import { useData } from '../contexts/DataContext';

const StartButton: React.FC = () => {
    const { imagePath, setResponse2, setStatusCode2 } = useData();
    const lambdaApiUrl = import.meta.env.VITE_LAMBDA_API_URL;
    const djangoApiUrl = import.meta.env.VITE_DJANGO_API_URL;

    useEffect(() => {
        axios.defaults.withCredentials = true;
    }, []);

    const handleStart = async () => {
        const requestSentTime = new Date();
        try {
            const requestBody_1 = {
                image_path: imagePath,
            };
            const response_1 = await axios.post(lambdaApiUrl, requestBody_1);
        
            const responseReceivedTime = new Date();

            const processedData = {
                image_path: imagePath,
                response_from_API: response_1.data,
                request_timestamp: requestSentTime.toISOString(),
                response_timestamp: responseReceivedTime.toISOString(),
            };
            console.log(JSON.stringify(processedData, null, 2));
            const requestBody_2 = processedData;
            const response_2 = await axios.post(djangoApiUrl, requestBody_2);

            setResponse2(JSON.stringify(response_2.data, null, 2));
            setStatusCode2(response_2.status);
        } catch (error: any) {
            const errorReceivedTime = new Date();
            const processedData = {
                image_path: imagePath,
                response_from_API: error.response?.data,
                request_timestamp: requestSentTime.toISOString(),
                response_timestamp: errorReceivedTime.toISOString(),
            };
            console.log(JSON.stringify(processedData, null, 2));
            const response_2 = await axios.post(djangoApiUrl, processedData);
    
            setResponse2(JSON.stringify(response_2.data, null, 2));
            setStatusCode2(response_2.status);
        }
    };

    return (
        <button className="App-link" onClick={handleStart}>
            取得
        </button>
    );
};

export default StartButton;