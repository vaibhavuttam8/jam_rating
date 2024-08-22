import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentlyPlaying from './CurrentTracks';

export const Search: React.FC = () => {
    const [searchKey, setSearchKey] = useState('');
    const [artists, setArtists] = useState<any[]>([]);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = window.localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        } else {
            alert('Please log in first');
        }
    }, []);

    const searchArtists = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            alert('Please log in first');
            return;
        }

        try {
            const { data } = await axios.get('https://api.spotify.com/v1/search', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    q: searchKey,
                    type: 'artist',
                },
            });
            setArtists(data.artists.items);
        } catch (error) {
            console.error('Error searching artists:', error);
        }
    };

    return (
        <div>
            <form onSubmit={searchArtists}>
                <input
                    type="text"
                    onChange={e => setSearchKey(e.target.value)}
                    placeholder="Search for an artist..."
                />
                <button type="submit">Search</button>
            </form>
            <div>
                {artists.map((artist: any) => (
                    <div key={artist.id}>
                        <h3>{artist.name}</h3>
                        {artist.images.length ? (
                            <img src={artist.images[0].url} alt={artist.name} width="200px" />
                        ) : (
                            <div>No Image Available</div>
                        )}
                    </div>
                ))}
            </div>
            {token && <CurrentlyPlaying token={token} />}
        </div>
    );
};

export default Search;
