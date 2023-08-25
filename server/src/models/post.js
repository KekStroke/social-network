"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: { allowNull: false, name: "authorId" },
        allowNull: false,
        as: "Author",
      });
    }
  }
  Post.init(
    {
      content: DataTypes.TEXT,
      images: {
        type: DataTypes.TEXT,
        get() {
          return this.getDataValue("images")?.split(";") ?? [];
        },
        set(val) {
          this.setDataValue("images", val?.join(";"));
        },
      },
    },
    {
      sequelize,
      modelName: "Post",
      validate: {
        contentOrImages() {
          if (this.content === null || this.images === null) {
            throw new Error(
              "Either content, images or both should exist in the post!"
            );
          }
        },
      },
    }
  );
  return Post;
};
