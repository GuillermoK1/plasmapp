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
    geoCoords: string;
    // Add other properties of Company as needed
    [key: string]: any;
};

export default defineEventHandler(async (event) => {
    const query = getQuery(event) as QueryParams;
    const { service, postalCode } = query;
    console.log('query: ', query);

    if (!service || !postalCode) {
        throw new Error('Service and postalCode are required.');
    }

    // Convertir código postal a coordenadas geográficas del cliente
    const clientCoords = await geocode(postalCode);
    console.log('clientCoords: ', clientCoords);
    if (!clientCoords) {
        throw new Error("Failed to convert postal code to geographic coordinates");
      }

    // Extraer la provincia de los dos primeros dígitos del código postal
    const province = postalCode.substring(0, 2);
    console.log('province: ', province);

    // Buscar empresas en la base de datos
    const companies = await searchCompanies(province, service);

    // Calcular la distancia de cada empresa al cliente
    const companiesWithDistance = companies.map((company: Company) => {
        const companyCoords = JSON.parse(company.geoCoords); // Parsear geoCoords
        const distance = geolib.getDistance(
            { latitude: clientCoords.lat, longitude: clientCoords.lng },
            { latitude: companyCoords.lat, longitude: companyCoords.lng }
        );
        return { ...company, distance };
    });

    // Ordenar empresas por distancia
    companiesWithDistance.sort((a: Company, b: Company) => a.distance - b.distance);
    console.log('companiesWithDistance: ', companiesWithDistance);
    return companiesWithDistance;
});
