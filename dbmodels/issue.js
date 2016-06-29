'use strict';
module.exports = function(sequelize, DataTypes) {
  var Issue = sequelize.define('Issue', {
    issueDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Issue.hasMany(models.Issue_book);
      }
    },
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: false
  });
  return Issue;
};