'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    copies: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    available: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {   
         Book.hasMany(models.Issue_book);
      }
    },
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: false
    
  });
  return Book;
};