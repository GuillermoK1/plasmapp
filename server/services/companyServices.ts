import { getDBConnection } from '../utils/db';
import oracledb from 'oracledb';

interface Company {
    geoCoords: string;
    name: string;
    services: string;
    description: string;
    email: string;
}

export const saveCompany = async (province: string, company: Company) => {
    const db = await getDBConnection();
    const tableName = `province_${province}`;

    const query = `
        INSERT INTO ${tableName} (GEOCOORD, NAME, SERVICES, DESCRIPTION, EMAIL)
        VALUES (:geoCoords, :name, :services, :description, :email)
    `;
    
    const params = {
        geoCoords: company.geoCoords,
        name: company.name,
        services: company.services,
        description: company.description,
        email: company.email
    };

    await db.execute(query, params, { autoCommit: true });
    await db.close();
};

export const searchCompanies = async (province: string, service: string) => {
    const db = await getDBConnection();
    const tableName = `province_${province}`;

    const query = `
        SELECT GEOCOORD, NAME, SERVICES, DESCRIPTION, EMAIL
        FROM ${tableName}
        WHERE SERVICES LIKE :service
    `;
    
    const params = { service: `%${service}%` };

    const result = await db.execute(query, params, { outFormat: oracledb.OUT_FORMAT_OBJECT });
    await db.close();

    if (!result.rows) {
        return [];
    }

    return result.rows.map((row: any) => ({
        geoCoords: JSON.parse(row.GEOCOORD),
        name: row.NAME,
        services: JSON.parse(row.SERVICES),
        description: row.DESCRIPTION,
        email: row.EMAIL
    }));
};
