'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    department: DataTypes.STRING,
    usereMail: DataTypes.STRING,
    userPassword: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Issue);  
        User.hasMany(models.Return);
      }
    }
  });
  return User;
};