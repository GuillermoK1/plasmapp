import axios from 'axios';

export const geocode = async (postalCode: string) => {
    const apiKey = process.env.GEOCODE_API_KEY;
    const response = await axios.get(`https://api.example.com/geocode?postalCode=${postalCode}&key=${apiKey}`);
    
    if (response.data && response.data.coordinates) {
        return response.data.coordinates;
    } else {
        throw new Error('Error al obtener las coordenadas geográficas');
    }
};
