module.exports = (sequelize, Sequelize) => {
  const Game = sequelize.define(
    "Game",
    {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      igdbId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      coverUrl: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      publisher: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      genres: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      platforms: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      releaseDate: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: true,
      },
      rating: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
      },
      ratingCount: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    },
  );
  return Game;
};
