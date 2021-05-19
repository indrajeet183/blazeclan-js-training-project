var DataTypes = require("sequelize").DataTypes;
var _login_history = require("./login_history");

function initModels(sequelize) {
  var login_history = _login_history(sequelize, DataTypes);

  return {
    login_history
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
