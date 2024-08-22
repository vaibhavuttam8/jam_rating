import React, { useState, useEffect } from 'react';
import { setAccessToken, getCurrentlyPlayingTrack } from '../services/SpotifyServices';

interface CurrentlyPlayingProps {
  token: string;
}

interface Track {
  name: string;
  artists: { name: string }[];
}

const CurrentlyPlaying: React.FC<CurrentlyPlayingProps> = ({ token }) => {
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    setAccessToken(token);

    const fetchCurrentlyPlayingTrack = async () => {
      const currentTrack = await getCurrentlyPlayingTrack();
      setTrack(currentTrack as Track | null);
    };

    fetchCurrentlyPlayingTrack();
  }, [token]);

  return (
    <div>
      {track ? (
        <div>
          <h3>Currently Playing:</h3>
          <p>{track.name} by {track.artists.map(artist => artist.name).join(', ')}</p>
        </div>
      ) : (
        <p>No track currently playing</p>
      )}
    </div>
  );
};

export default CurrentlyPlaying;
