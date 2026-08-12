module.exports = (sequlize, Sequelize) => {
  const UserGames = sequlize.define("UserGames", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  });
  UserGames.associate = function(models) {
    UserGames.belongsTo(models.User, { foreignKey: "userId" });
    UserGames.belongsTo(models.Game, { foreignKey: "gameId" });
  }
  return UserGames;
};
