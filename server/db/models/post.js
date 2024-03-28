"use strict";
const { Model } = require("sequelize");
const user = require("./user");

module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: "userId" });
      //super m-m
      this.belongsToMany(models.user, {
        through: models.liked_post,
      });
      this.hasMany(models.liked_post, { foreignKey: "userId" });
    }
  }

  post.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: user,
          key: "id",
        },
      },
      text: { type: DataTypes.STRING, allowNull: false },
    },

    {
      sequelize,
      modelName: "post",
    }
  );

  return post;
};
