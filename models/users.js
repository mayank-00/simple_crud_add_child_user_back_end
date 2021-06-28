
module.exports = (sequelize, Sequelize) => {

  const { DataTypes } = Sequelize

  const Users = sequelize.define("users", {
    parent_id: {
      type: DataTypes.INTEGER,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true
      },
      uinque: true
    },
  }, {
    underscored: true
  });

  return Users;
};