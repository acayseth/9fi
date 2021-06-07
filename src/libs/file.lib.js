const
  path = require('path'),
  fs = require('fs');

module.exports.exists = (filename) => {
  try {
    return fs.existsSync(path.join(process.cwd(), 'storage', 'founds', `${filename}.found`));
  } catch (e) {
    console.error(e, 'e');
    return false;
  }
};

module.exports.create = (filename) => {
  try {
    fs.writeFileSync(path.join(process.cwd(), 'storage', 'founds', `${filename}.found`));
    return true;
  } catch (e) {
    console.error(e, 'e');
    return false;
  }
};