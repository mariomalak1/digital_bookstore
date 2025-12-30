import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";

import { Book } from "./models.js"

const authorSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
      
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}

const Author = sequelize.define('Author', authorSchema, 
	{
		timestamps: true,
	}
)

Author.hasMany(Book, {
	foreignKey: 'author_id',
})

module.exports = Author;