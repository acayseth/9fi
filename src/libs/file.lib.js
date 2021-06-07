const
  path = require('path'),
  fs = require('fs');

module.exports.exists = (filename) => {
  try {
    return fs.existsSync(path.join(process.cwd(), 'storage', 'founds', `${filename}.found`));
  } catch (e) {
    console.error(e, 'e');
  }
};

module.exports.create = (filename) => {
  try {
    return fs.writeFileSync(path.join(process.cwd(), 'storage', 'founds', `${filename}.found`));
  } catch (e) {
    console.error(e, 'e');
  }
};