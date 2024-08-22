// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from '../components/Login';
import { Callback } from '../components/Callback';
import { Search } from '../components/Search';
import { Logout } from '../components/Logout';
import { CurrentlyPlaying } from '../components/CurrentTracks';
const Page = () => {
    return (
        <Router>
            <div>
                <Logout />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/callback" element={<Callback />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/currently-playing" element={<CurrentlyPlaying />} />
                </Routes>
            </div>
        </Router>
    );
};

export default Page;
