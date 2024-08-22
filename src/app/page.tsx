import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from '../components/Login';
import { Callback } from '../components/Callback';
import { Search } from '../components/Search';
import { Logout } from '../components/Logout';
import CurrentlyPlaying from '../components/CurrentTracks';
import PlaybackControl from '../components/startPlayback';

const Page: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = window.localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <Router>
            <div>
                <Logout />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/callback" element={<Callback />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/currently-playing" element={token ? <CurrentlyPlaying token={token} /> : <div>Please log in to see the currently playing track</div>} />
                    <Route path="/playback" element={token ? <PlaybackControl token={token} /> : <div>Please log in to control playback</div>} />
                </Routes>
            </div>
        </Router>
    );
};

export default Page;
