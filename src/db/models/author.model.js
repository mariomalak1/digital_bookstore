const AuthorInitializer = (sequelize, DataTypes) => {
  const Author = sequelize.define(
    'Author',
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
    },
    {
      tableName: 'authors',
      timestamps: false,
    }
  )

  Author.associate = (models) => {
    Author.hasMany(models.Book, {
      foreignKey: 'author_id',
    })
  }

  return Author
}

export default AuthorInitializer;