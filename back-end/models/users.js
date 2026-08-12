module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstname: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    telphone: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    },
  },{
    timestamps: false,
  });
  User.associate = function(models) {
    User.hasMany(models.UserGames, { foreignKey: 'userId' });
  }
  return User;
};
