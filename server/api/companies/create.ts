import { defineEventHandler, readBody } from 'h3';
import { geocode } from '../../utils/geocode';
import { saveCompany } from '../../services/companyServices';

interface Company {
  geoCoords: string;
  name: string;
  services: string;
  description: string;
  email: string;
  zip: string;
}

interface RequestBody {
  postalCode: string;
  name: string;
  services: Record<string, boolean>;
  description: string;
  email: string;
}

interface ResponseBody {
  success: boolean;
  error?: string;
}

export default defineEventHandler(async (event): Promise<ResponseBody> => {
  try {
    const body: RequestBody = await readBody(event);

    const { postalCode, name, services, description, email } = body;

    if (!postalCode || !name || !services || !description || !email) {
      throw new Error("Missing required fields");
    }

    // Convertir código postal a coordenadas geográficas
    const geoCoords = await geocode(postalCode);
    if (!geoCoords) {
      throw new Error("Failed to convert postal code to geographic coordinates");
    }

    // Extraer la provincia de los dos primeros dígitos del código postal
    const province = postalCode.substring(0, 2);

    // Filtrar los servicios para incluir solo aquellos que son true
    const filteredServices = Object.keys(services).filter(service => services[service]);

    // Crear el objeto de la empresa
    const company: Company = {
      geoCoords: JSON.stringify(geoCoords),
      name,
      services: JSON.stringify(filteredServices), // Almacenar como JSON en la base de datos
      description,
      email,
      zip: postalCode
    };

    // Guardar en la base de datos
    await saveCompany(province, company);

    return { success: true };
  } catch (error) {
    console.error("Error creating company:", error);
    return { success: false, error: (error as Error).message };
  }
});
