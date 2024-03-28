"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_conversation extends Model {
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
  user_conversation.init(
    {
      joined_timestamp: DataTypes.DATE,
      left_timestamp: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "user_conversation",
    }
  );
  return user_conversation;
};
