import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";

import { Book, StoreBook } from "./models.js" 

const storeSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
   
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    logo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}

const Store = sequelize.define('Store', storeSchema, 
	{
		timestamps: true,
	}
)

Store.belongsToMany(Book, {
	through: StoreBook,
	foreignKey: 'store_id',
	otherKey: 'book_id',
})
