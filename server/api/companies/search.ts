import { defineEventHandler, getQuery } from 'h3';
import { searchCompanies } from '../../services/companyServices';
import { geocode } from '../../utils/geocode';
import geolib from 'geolib';

// Define types for query parameters
type QueryParams = {
    service?: string;
    postalCode?: string;
};

// Define type for company
type Company = {
    geoCoords: { lat: number; lon: number };
    // Add other properties of Company as needed
    [key: string]: any;
};

export default defineEventHandler(async (event) => {
    const query = getQuery(event) as QueryParams;
    const { service, postalCode } = query;

    if (!service || !postalCode) {
        throw new Error('Service and postalCode are required.');
    }

    // Convertir código postal a coordenadas geográficas del cliente
    const clientCoords = await geocode(postalCode);

    // Extraer la provincia de los dos primeros dígitos del código postal
    const province = postalCode.substring(0, 2);

    // Buscar empresas en la base de datos
    const companies = await searchCompanies(province, service);

    // Calcular la distancia de cada empresa al cliente
    const companiesWithDistance = companies.map((company: Company) => {
        const distance = geolib.getDistance(
            { latitude: clientCoords.lat, longitude: clientCoords.lng },
            { latitude: company.geoCoords.lat, longitude: company.geoCoords.lon }
        );
        return { ...company, distance };
    });

    // Ordenar empresas por distancia
    companiesWithDistance.sort((a: Company, b: Company) => a.distance - b.distance);

    return companiesWithDistance;
});
