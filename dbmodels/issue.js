'use strict';
module.exports = function(sequelize, DataTypes) {
  var Issue = sequelize.define('Issue', {
    bookName: DataTypes.STRING,
    bookId: DataTypes.INTEGER,
    issueDate: DataTypes.DATE,
    issueExpiry: DataTypes.DATE,
    UserId :{
        type: DataTypes.INTEGER,
              references: 'User', 
              referencesKey: 'id' 
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Issue.hasOne(models.Return);
        Issue.hasMany(models.User);
        Issue.hasMany(models.Book);
      }
    },
      timestamps: true
  });
  return Issue;
};