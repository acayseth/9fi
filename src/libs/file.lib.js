const
  path = require('path'),
  fs = require('fs');

const fnReplace = (code) => code

module.exports.exists = (filename) => {
  try {
    return fs.existsSync(path.join(process.cwd(), 'storage', 'founds', `${fnReplace(filename)}.found`));
  } catch (e) {
    console.error(e, 'e');
    return false;
  }
};

module.exports.create = (filename) => {
  try {
    fs.writeFileSync(path.join(process.cwd(), 'storage', 'founds', `${fnReplace(filename)}.found`));
    return true;
  } catch (e) {
    console.error(e, 'e');
    return false;
  }
};