import oracledb from "oracledb";

export const getDBConnection = () => {
    return oracledb.getConnection({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectString: process.env.DB_CONNECTION_STRING
    });
};
