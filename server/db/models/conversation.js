"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.user, {
        through: models.user_conversation,
      });
      // this.belongsToMany(models.user, {
      //   through: models.message,
      // });

      //super m-m
      this.hasMany(models.message);
      this.hasMany(models.user_conversation);
    }
  }
  conversation.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "conversation",
    }
  );
  return conversation;
};
