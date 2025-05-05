
const express = require('express');
const router = express.Router();
const { endPoint1, runCommand } = require('../controllers/processController');

// Define route
router.get('/', endPoint1);
router.post('/', runCommand)

module.exports = { router };
