import React, { useEffect, useState } from 'react';
import SpotifyService from '../services/SpotifyServices'; // Adjust the import path as necessary

interface Track {
    name: string;
    artists: { name: string }[];
    album: { images: { url: string }[] };
}

export const CurrentlyPlaying = () => {
    const [track, setTrack] = useState<Track | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [spotifyService, setSpotifyService] = useState<SpotifyService | null>(null);

    useEffect(() => {
        const token = window.localStorage.getItem('token');

        if (token) {
            setSpotifyService(new SpotifyService(token));
        } else {
            setError('No access token found');
        }
    }, []);

    useEffect(() => {
        const fetchCurrentlyPlaying = async () => {
            if (!spotifyService) return;

            try {
                const data = await spotifyService.getCurrentlyPlayingSong();
                if (data && data.item) {
                    setTrack(data.item);
                } else {
                    setTrack(null);
                }
            } catch (err) {
                setError('Failed to fetch currently playing track');
            }
        };

        fetchCurrentlyPlaying();
    }, [spotifyService]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!track) {
        return <div>No track is currently playing.</div>;
    }

    return (
        <div>
            <h3>Currently Playing:</h3>
            <p><strong>{track.name}</strong> by {track.artists.map(artist => artist.name).join(', ')}</p>
            {track.album.images.length > 0 && <img src={track.album.images[0].url} alt="Album cover" width="200" />}
        </div>
    );
};
