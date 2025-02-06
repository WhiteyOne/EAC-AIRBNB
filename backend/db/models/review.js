'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.hasOne(models.ReviewImage, {
        foreignKey: "id",
        onDelete:"CASCADE"
      });
      Review.belongsToMany(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE"
      });
      Review.belongsToMany(models.Spot, {
        foreignKey: "spotId",
        onDelete: "CASCADE"
      });
    }
  }
  Review.init({
    spotId:{
      type: DataTypes.INTEGER,
      allowNull:false
      },
      url:{ 
        type: DataTypes.STRING,
        allowNull: false
      },
    }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};