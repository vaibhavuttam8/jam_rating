import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

export const setAccessToken = (token: string): void => {
  spotifyApi.setAccessToken(token);
};

export const getCurrentlyPlayingTrack = async () => {
  try {
    const response = await spotifyApi.getMyCurrentPlaybackState();
    return response?.item || null;
  } catch (error) {
    console.error('Error fetching the current track:', error);
    return null;
  }
};

export const startPlayback = async (trackUri: string, deviceId?: string) => {
  try {
    const response = await spotifyApi.play({
      uris: [trackUri],
      device_id: deviceId,
    });
    return response;
  } catch (error) {
    console.error('Error starting playback:', error);
    throw error;
  }
};