"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static async findByLogin(login) {
      let user = await this.findOne({ where: { name: login } });
      if (!user) {
        user = await this.findOne({ where: { email: login } });
      }
      return user;
    }

    static async findByNameAndEmail(name, email) {
      let user = await this.findOne({
        where: { [Op.and]: [{ name, email }] },
      });

      if (!user) return "user not found";
      return user;
    }

    static associate(models) {
      this.hasMany(models.post, { foreignKey: "userId" });
      this.belongsToMany(models.conversation, {
        through: models.user_conversation,
      });
      // this.belongsToMany(models.conversation, {
      //   through: models.message,
      // });
      //super m-m
      this.belongsToMany(models.post, {
        through: models.liked_post,
      });
      this.hasMany(models.liked_post, { foreignKey: "userId" });
    }
  }

  // user.findByFirstName = async (login) => {
  //   const user = await user.findOne({ where: { name: input } });

  //   if (!user) {
  //     return "user not found";
  //   }

  //   return user;
  // };

  user.init(
    {
      name: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, allowNull: false },
      auth0_id: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  return user;
};
