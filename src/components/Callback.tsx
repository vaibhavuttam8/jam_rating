import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        let token = '';

        if (hash) {
            token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token'))?.split('=')[1] || '';
            window.localStorage.setItem('token', token);
            window.localStorage.setItem('refreshToken', hash.substring(1).split('&').find(elem => elem.startsWith('refresh_token'))?.split('=')[1] || '');
            window.localStorage.setItem('expiresIn', (parseInt(hash.substring(1).split('&').find(elem => elem.startsWith('expires_in'))?.split('=')[1] || '0', 10) * 1000).toString()); // Convert to milliseconds
            window.location.hash = "";
            navigate('/search');
        }
    }, [navigate]);

    return <div>Redirecting...</div>;
};
