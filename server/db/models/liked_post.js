"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class liked_post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // super m-m
      this.belongsTo(models.user);
      this.belongsTo(models.post);
    }
  }
  liked_post.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "liked_post",
    }
  );
  return liked_post;
};
