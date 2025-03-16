'use strict';
const { Spot } = require('../models');
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        userId: 1,
        address: '123 First St',
        city: 'San Diego',
        state: 'California',
        country: 'USA',
        lat: 12.34,
        lng: -12.34,
        name: 'Airbnb Name',
        description: 'Airbnb Name Description',
        price: 123.45,
      },
      {
        userId: 2,
        address: '1234 Second St',
        city: 'Los Angeles',
        state: 'California',
        country: 'USA',
        lat: 12.44,
        lng: -12.44,
        name: 'Airbnb Second Name',
        description: 'Airbnb Second Name Description',
        price: 123.55,
      },
      {
        userId: 3,
        address: '12345 Third St',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 12.54,
        lng: -12.54,
        name: 'Airbnb Third Name',
        description: 'Airbnb Third Name Description',
        price: 123.65,
      },
      {
        userId: 2,
        address: '1232 destict ave',
        city: 'Sandy',
        state: 'Utah',
        country: 'USA',
        lat: 12.54,
        lng: -12.54,
        name: 'Old Cottage',
        description: 'This is a nice family style home with a grand view.',
        price: 155.55,
      },
      {
        userId: 1,
        address: '9286 equestion park circle',
        city: 'Everet',
        state: 'Washington',
        country: 'USA',
        lat: 12.54,
        lng: -12.54,
        name: 'Bungalo on Equestrian',
        description: 'Jam packed week? This little cottage style home is amentiy centric. ',
        price: 175.25,
      },
      {
        userId: 3,
        address: '1414 fling ln',
        city: 'Carol',
        state: 'Caolina',
        country: 'USA',
        lat: 12.54,
        lng: -12.54,
        name: 'Carol Fling',
        description: 'This little cabin has everything you and your significant other needs for a romatic get away.',
        price: 189.65,
      },
      {
        userId: 3,
        address: '3455 fire stone ave',
        city: 'flaming gorge',
        state: 'Utah',
        country: 'USA',
        lat: 12.54,
        lng: -12.54,
        name: ' will keep you enjoying things at home and away.',
        description: 'gasdgas',
        price: 123.65,
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = ['Spots', "Owner"];
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      // name: { [Op.in]: ['Airbnb Name', 'Airbnb Second Name', 'Airbnb Third Name'] }
    }, {});
  }
};

