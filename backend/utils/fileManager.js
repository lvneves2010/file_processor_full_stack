const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../logs');

// Ensure logs directory exists
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const writeLog = (filename, content) => {
  const filePath = path.join(logsDir, filename);
  fs.writeFileSync(filePath, content);
};

const readLog = (filename) => {
  const filePath = path.join(logsDir, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error('Log file not found');
  }
  return fs.readFileSync(filePath, 'utf-8');
};

const deleteLog = (filename) => {
  const filePath = path.join(logsDir, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error('Log file not found');
  }
  fs.unlinkSync(filePath);
}

module.exports = {
  writeLog,
  readLog,
  deleteLog
};
