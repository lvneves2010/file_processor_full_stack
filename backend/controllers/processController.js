const { exec } = require('child_process');
const { writeLog, readLog, deleteLog } = require('../utils/fileManager');
const { v4: uuidv4 } = require('uuid'); // For unique filenames

const runCommand = (req, res) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ error: 'No command provided' });
  }

  const logFilename = `${uuidv4()}.log`;

  exec(command, (error, stdout, stderr) => {
    const logContent = `
Command: ${command}
${error ? 'Error:\n' + error.message : ''}
${stdout ? 'Output:\n' + stdout : ''}
${stderr ? 'Stderr:\n' + stderr : ''}
    `.trim();

    try {
      writeLog(logFilename, logContent);
      res.status(200).json({ message: 'Command executed', logFile: logFilename });
    } catch (err) {
      res.status(500).json({ error: 'Failed to write log file' });
    }
  });
};
const getLogList = (req, res) => {
  const fs = require('fs');
  const path = require('path');

  const logsDir = path.join(__dirname, '../logs');

  fs.readdir(logsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read log directory' });
    }

    const logFiles = files.filter(file => file.endsWith('.log'));
    res.status(200).json(logFiles);
  });
};

const getLogFile = (req, res) => {
  const { filename } = req.params;

  if (!filename) {
    return res.status(400).json({ error: 'No filename provided' });
  }

  try {
    const log = readLog(filename);
    if (!log) {
      return res.status(404).json({ error: 'Log file not found' });
    }
    res.status(200).send(log);
  } catch (err) {
    res.status(500).json({ error: err.message})
  }
}

const deleteLogFile = (req, res) => {
  const { filename } = req.params;
  if (!filename) {
    return res.status(400).json({ error: 'No filename provided' });
  }

  const log = deleteLog(filename);
  res.status(200).json({ message: 'Log file deleted successfully' });
};

module.exports = {
  runCommand,
  getLogFile,
  getLogList,
  deleteLogFile,
  endPoint1: (req, res) => res.status(200).send('request OK'),
};
