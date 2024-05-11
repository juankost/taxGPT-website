import React from 'react';
import { CircularProgress } from '@mui/material'; // Ensure you have @mui/material installed

const LoginRedirecting = () => (
    <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-3xl font-bold mb-4">Redirecting to Chat</h1>
        <CircularProgress size={60} />
    </div>
);

export { LoginRedirecting };