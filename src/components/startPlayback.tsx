import React, { useState } from 'react';
import { setAccessToken, startPlayback } from '../services/SpotifyServices';

interface PlaybackControlProps {
  token: string;
}

const PlaybackControl: React.FC<PlaybackControlProps> = ({ token }) => {
  const [trackUri, setTrackUri] = useState<string>('');
  const [deviceId, setDeviceId] = useState<string | undefined>('');

  const handlePlayTrack = async () => {
    setAccessToken(token);

    try {
      await startPlayback(trackUri, deviceId);
      alert('Playback started!');
    } catch (error) {
      alert('Failed to start playback');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={trackUri}
        onChange={(e) => setTrackUri(e.target.value)}
        placeholder="Enter track URI"
      />
      <input
        type="text"
        value={deviceId}
        onChange={(e) => setDeviceId(e.target.value)}
        placeholder="Enter device ID (optional)"
      />
      <button onClick={handlePlayTrack}>Play Track</button>
    </div>
  );
};

export default PlaybackControl;
