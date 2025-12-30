import {Sequelize} from "sequelize";

import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_SCHEMA,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.HOST,
        dialect: process.env.DB_ENGINE
    }
);


export const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        // sequelize.sync({force: true});
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
} 
