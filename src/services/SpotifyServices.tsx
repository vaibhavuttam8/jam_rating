import axios from 'axios';

class SpotifyService {
  private currentAccessToken: string | null = null;

  constructor(accessToken?: string) {
    this.currentAccessToken = accessToken || null;
  }

  private async hasAccessToken(): Promise<boolean> {
    return !!this.currentAccessToken;
  }

  private async getNewAccessTokenFromRefreshToken(): Promise<void> {
    // Implement the logic to get a new access token using the refresh token
    // Set this.currentAccessToken to the new token value
  }

  public async getCurrentlyPlayingSong(): Promise<any> {
    if (!await this.hasAccessToken()) {
      await this.getNewAccessTokenFromRefreshToken();
    }

    try {
      const response = await axios({
        url: 'https://api.spotify.com/v1/me/player/currently-playing',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.currentAccessToken}`
        }
      });

      const isSongPlaying = !!response.data.item;

      console.log(response);

      if (!isSongPlaying) {
        throw new Error("No song playing");
      }

      return response.data; // Return or map to your desired format

    } catch (error) {
      console.error('Error fetching currently playing song:', error);
      throw error;
    }
  }
}

export default SpotifyService;
