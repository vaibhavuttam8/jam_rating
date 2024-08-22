// src/components/Login.tsx
import React from 'react';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID || ""; // Ensure client ID is loaded from environment variables
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || "http://localhost:3010/callback";
const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT || "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE || "token";

export const Login = () => {
    const handleLogin = () => {
        if (!CLIENT_ID) {
            console.error('Client ID is missing');
            return;
        }

        const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=${RESPONSE_TYPE}&scope=user-read-private`;

        window.location.href = authUrl;
    };

    return (
        <div>
            <button onClick={handleLogin}>Login to Spotify</button>
        </div>
    );
};
