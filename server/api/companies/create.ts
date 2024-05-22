import { defineEventHandler, readBody } from 'h3';
import { geocode } from '../../utils/geocode';
import { saveCompany } from '../../services/companyServices';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { postalCode, name, services, description, email } = body;

    // Convertir código postal a coordenadas geográficas
    const geoCoords = await geocode(postalCode);
    
    // Extraer la provincia de los dos primeros dígitos del código postal
    const province = postalCode.substring(0, 2);

    // Crear el objeto de la empresa
    const company = {
        geoCoords,
        name,
        services: JSON.stringify(services), // Almacenar como JSON en la base de datos
        description,
        email
    };

    // Guardar en la base de datos
    await saveCompany(province, company);

    return { success: true };
});
