import React, { useEffect } from 'react';
import axios from 'axios';
import { useData } from '../contexts/DataContext';

const StartButton: React.FC = () => {
    const { imagePath, setResponse, setResponse2, setStatusCode, setStatusCode2 } = useData();
    const lambdaApiUrl = import.meta.env.VITE_LAMBDA_API_URL;
    const djangoApiUrl = import.meta.env.VITE_DJANGO_API_URL;

    useEffect(() => {
        axios.defaults.withCredentials = true;
    }, []);

    const handleStart = async () => {
        try {
            const requestBody_1 = {
                image_path: imagePath,
            };
            const response_1 = await axios.post(lambdaApiUrl, requestBody_1);
            
            const processedData = {
                image_path: imagePath,
                response_from_API: response_1.data,
                request_timestamp: new Date().toISOString(),
                response_timestamp: response_1.headers.date,
            };
            console.log(JSON.stringify(processedData, null, 2));
            const requestBody_2 = processedData;
            const response_2 = await axios.post(djangoApiUrl, requestBody_2);

            setResponse2(JSON.stringify(response_2.data, null, 2));
            setStatusCode2(response_2.status);
        } catch (error: any) {
            const processedData = {
                image_path: imagePath,
                response_from_API: error.response?.data, // エラーレスポンスのデータを使用
                request_timestamp: new Date().toISOString(),
                response_timestamp: error.response?.headers.date,
            };
            console.log(JSON.stringify(processedData, null, 2));
            const response_2 = await axios.post(djangoApiUrl, processedData);
    
            setResponse2(JSON.stringify(response_2.data, null, 2));
            setStatusCode2(response_2.status);
        }
    };

    return (
        <button className="App-link" onClick={handleStart}>
            開始！
        </button>
    );
};

export default StartButton;