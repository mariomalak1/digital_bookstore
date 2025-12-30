const BookInitializer = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
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
    },
    {
      tableName: 'books',
      timestamps: false,
    }
  )

  Book.associate = (models) => {
    Book.belongsTo(models.Author, {
      foreignKey: 'author_id',
    })

    Book.belongsToMany(models.Store, {
      through: models.StoreBook,
      foreignKey: 'book_id',
      otherKey: 'store_id',
    })
  }

  return Book
}

export default BookInitializer;