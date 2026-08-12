module.exports = (sequlize, Sequelize) => {
  const UserGames = sequlize.define("UserGames", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    gameId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    userRating: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
    },
    favorite: {
        type: Sequelize.DataTypes.BOOLEAN,
        defualtValue: false
    }
  }, {
    timestamps: false,
  });
  UserGames.associate = function(models) {
    UserGames.belongsTo(models.User, { foreignKey: "userId" });
    UserGames.belongsTo(models.Game, { foreignKey: "gameId" });
  }
  return UserGames;
};
