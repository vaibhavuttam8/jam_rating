// src/Logout.tsx
import React from 'react';

export const Logout = () => {
    const handleLogout = () => {
        window.localStorage.removeItem('token');
        window.location.href = '/';
    };

    return <button onClick={handleLogout}>Logout</button>;
};
