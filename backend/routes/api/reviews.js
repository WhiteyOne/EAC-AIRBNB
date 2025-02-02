const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

// Security Imports
const { setTokenCookie, restoreUser } = require('../../utils/auth');

//Utilities
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Sequelize Imports 
// const { Review } = require('../../db/models');


const router = express.Router();

//Reviews GET Method
router.get('/',async (req,res,next)=>{
    return res.json("hello there")
});


module.exports = router;