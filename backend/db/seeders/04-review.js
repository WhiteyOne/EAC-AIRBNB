'use strict';


const { Review } = require('../models');
const { Op } = require("sequelize");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review: "1 1 Amazing place! Had a wonderful stay.",
        stars: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: " 1 2 Decent stay, but could be cleaner.",
        stars: 3
      },
      {
        spotId: 1,
        userId: 3,
        review: " 1 3 Great experience, will come back again.",
        stars: 4
      },
      {
        spotId: 2,
        userId: 1,
        review: "2 1 Great experience, will come back again.",
        stars: 4
      },
      {
        spotId: 2,
        userId: 2,
        review: "2 2 Great experience, will come back again.",
        stars: 4
      },
      {
        spotId: 2,
        userId: 3,
        review: " 2 3 Great experience, will come back again.",
        stars: 4
      },
      {
        spotId: 3,
        userId: 1,
        review: " 3 1Great experience, will come back again.",
        stars: 4
      },
      {
        spotId: 3,
        userId: 2,
        review: " 3 2 Great experience, will come back again.",
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: "3 3 Great experience, will come back again.",
        stars: 4
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {
   //   review: { [Op.in]: ["Amazing place! Had a wonderful stay.", "Decent stay, but could be cleaner.", "Great experience, will come back again."] }
    }, {});
  }
};