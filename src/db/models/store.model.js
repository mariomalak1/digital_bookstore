const StoreInitializer = (sequelize, DataTypes) => {
  const Store = sequelize.define(
    'Store',
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
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'stores',
      timestamps: false,
    }
  )

  Store.associate = (models) => {
    Store.belongsToMany(models.Book, {
      through: models.StoreBook,
      foreignKey: 'store_id',
      otherKey: 'book_id',
    })
  }

  return Store
}


export default StoreInitializer;