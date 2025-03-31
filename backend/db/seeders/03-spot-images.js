'use strict';
const { SpotImage } = require('../models');
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAXm4aLk4-YCwvUQeJhvo-fZ1LK3SrZfhBnQ&s",
        preview: true
      },
      {
        spotId: 2,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwgZkuamOQbiNLIOuUhTkTmOXkS3EapmWPJQ&s",
        preview: true
      },
      {
        spotId: 3,
        url: "https://media.gq.com/photos/66019f02c081abc36b271454/3:2/w_1686,h_1124,c_limit/airbnb-art.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/5e67688b-757d-44d6-8b4b-1e91dc6fe49f.jpg?im_w=1920",
        preview: false
      },
      {
        spotId: 4,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpw2F6XNtanIDd4jPTIRNpY3LX4EH69cNTzQ&s",
        preview: true
      },
      {
        spotId: 5,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOCDLbwpkt49WReOaQiNLy-TVbshqrRAcE3w&s",
        preview: true
      },
      {
        spotId: 6,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN2vy0m7bekVdQjly7Cz1styzNxKTnc8d7Gg&s",
        preview: true
      },
      {
        spotId: 7,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOWfS7JXrXiC5YSla1WotEXGEI1NtPowcdog&s",
        preview: true
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      // name: { [Op.in]: ['Airbnb Name', 'Airbnb Second Name', 'Airbnb Third Name'] }
    }, {});
  }
};