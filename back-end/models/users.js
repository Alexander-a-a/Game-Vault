models.exports = (sequelize, Sequelize) => {
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
      uniqe: true,
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      uniqe: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      uniqe: true,
      allowNull: false,
    },
    telphone: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
  },{
    timestamps: false,
  });
  return User;
};
