import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";

import { Store, Book } from "./models.js"


const storeBookSchema = {
  	store_id: {
		type: DataTypes.INTEGER,
	},
      	
	book_id: {
		type: DataTypes.INTEGER,
	},
	
	price: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	
	copies: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	
	sold_out: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
}

const StoreBook = sequelize.define('StoreBook', storeBookSchema,
	{
		tableName: 'store_books',
		timestamps: true,
    }
)

StoreBook.belongsTo(Store, {
	foreignKey: 'store_id',
})

StoreBook.belongsTo(Book, {
	foreignKey: 'book_id',
})

module.exports = StoreBook;