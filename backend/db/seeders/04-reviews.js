'use strict';
console.log(1);
const { SpotImage } = require('../models');
const bcrypt = require("bcryptjs");
console.log(2);
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
console.log(3);
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        url:
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      // name: { [Op.in]: ['Airbnb Name', 'Airbnb Second Name', 'Airbnb Third Name'] }
    }, {});
  }
};

