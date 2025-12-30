import { sequelize } from '../dbConnection.js'
import { DataTypes } from 'sequelize'

import StoreModel from './store.model.js'
import BookModel from './book.model.js'
import AuthorModel from './author.model.js'
import StoreBookModel from './storeBook.model.js'

const Store = StoreModel(sequelize, DataTypes)
const Book = BookModel(sequelize, DataTypes)
const Author = AuthorModel(sequelize, DataTypes)
const StoreBook = StoreBookModel(sequelize, DataTypes)

const models = { Store, Book, Author, StoreBook }

Object.values(models).forEach((model) => {
  if (model.associate) model.associate(models)
})

export { sequelize, Store, Book, Author, StoreBook }
export default models