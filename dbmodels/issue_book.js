'use strict';
module.exports = function(sequelize, DataTypes) {
  var Issue_book = sequelize.define('Issue_book', {
    returnDate: DataTypes.DATE,
    pending: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: false
  });
  return Issue_book;
};