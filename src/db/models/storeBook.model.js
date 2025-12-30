const StoreBookInitializer = (sequelize, DataTypes) => {
  const StoreBook = sequelize.define(
    'StoreBook',
    {
      store_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
    },
    {
      tableName: 'store_books',
      timestamps: true,
    }
  )

  StoreBook.associate = (models) => {
    StoreBook.belongsTo(models.Store, {
      foreignKey: 'store_id',
    })

    StoreBook.belongsTo(models.Book, {
      foreignKey: 'book_id',
    })
  }

  return StoreBook
}

export default StoreBookInitializer;