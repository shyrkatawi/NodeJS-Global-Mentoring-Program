import { Dialect, Sequelize } from 'sequelize';
import 'dotenv/config';

const HOST = process.env.DB_HOST;
const PORT = Number.parseInt(process.env.DB_PORT);
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DB_TYPE = process.env.DB_TYPE;
const DIALECT = process.env.DB_DIALECT as Dialect;

export const sequelize = new Sequelize(
    DB_TYPE,
    USER,
    PASSWORD,
    {
        host: HOST,
        port: PORT,
        dialect: DIALECT,
        logging: false
    }
);