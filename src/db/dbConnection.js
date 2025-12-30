import { Sequelize } from "sequelize";


export const sequelize = new Sequelize(
    {
        dialect: 'sqlite',
        storage: './database.sqlite',
        logging: true,
    }
);


export const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true })
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
} 
