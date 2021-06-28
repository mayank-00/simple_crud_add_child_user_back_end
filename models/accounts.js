
module.exports = (sequelize, Sequelize) => {

  const { DataTypes } = Sequelize

  const Accounts = sequelize.define("accounts", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hashed_password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
  }, {
    underscored: true
  });

  return Accounts;
};