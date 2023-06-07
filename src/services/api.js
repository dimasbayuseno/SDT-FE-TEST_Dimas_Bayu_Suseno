import axios from 'axios';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

export const fetchAccessToken = async () => {
    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: clientId,
                client_secret: clientSecret,
            }).toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        return response.data.access_token;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const fetchNewReleases = async (accessToken) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data.albums.items;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const fetchFeaturedPlaylists = async (accessToken) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data.playlists.items;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const fetchCategories = async (accessToken) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/browse/categories', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data.categories.items;
    } catch (error) {
        console.log(error);
        return [];
    }
};
