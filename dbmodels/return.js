'use strict';
module.exports = function(sequelize, DataTypes) {
  var Return = sequelize.define('Return', {
    bookName: DataTypes.STRING,
    returnDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Return;
};