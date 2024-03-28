"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.conversation);
    }
  }
  message.init(
    {
      userId: { type: DataTypes.INTEGER },
      text: DataTypes.STRING,
      sent_timestamp: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "message",
    }
  );
  return message;
};
