import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";


import { Author, Store, StoreBook } from "./models.js";

const bookSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}
const Book = sequelize.define('Book', bookSchema,
    {
        tableName: 'books',
        timestamps: true,
    }
)

Book.belongsTo(Author, {
    foreignKey: 'author_id',
})
    
Book.belongsToMany(Store, {
    through: StoreBook,
    foreignKey: 'book_id',
    otherKey: 'store_id',
})

