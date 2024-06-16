import axios from 'axios';

interface GeocodeResponse {
    results: Array<{
        geometry: {
            location: {
                lat: number;
                lng: number;
            };
        };
    }>;
    status: string;
}

export const geocode = async (postalCode: string): Promise<{ lat: number; lng: number }> => {
    const API_KEY = process.env.API_KEY;
    const response = await axios.get<GeocodeResponse>(`https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${postalCode}|country:ES&key=${API_KEY}`);
    if (response.data && response.data.status === 'OK' && response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
    } else {
        throw new Error('Código postal inválido.');
    }
};
