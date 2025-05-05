
const express = require('express');
const router = express.Router();
const { endPoint1, runCommand, getLogFile, getLogList, deleteLogFile } = require('../controllers/processController');

// Define route
router.get('/', endPoint1);
router.post('/', runCommand);
router.get('/logs/:filename', getLogFile);
router.get('/logList', getLogList);
router.delete('/logs/:filename', deleteLogFile);

module.exports = { router };
