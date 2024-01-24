const fs = require("fs");

function readFile(filePath) {
  try {
    const fileInfo = fs.readFileSync(filePath, "utf-8");
    return fileInfo;
  } catch (error) {
    return false;
  }
}

module.exports = {
  readFile,
};
