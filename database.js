/**
 * There's not much value to this file
 * It's just a database stub to simulate calls
 *   to a db storage engine.
 * Pay little attention to this file in the context
 *   of this example.
 **/
'use strict';
var Sequelize = require('sequelize');
var config = require('./config/config')["development"];
console.log('password ' + config.username);
var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password, {
        logging: console.log,
        define: {
            timestamps: false
        }
    }
);
var bookModel = require('./dbmodels/book')(sequelize, Sequelize);
var categoryModel = require('./dbmodels/category')(sequelize, Sequelize);
var userModel = require('./dbmodels/user')(sequelize, Sequelize);
var issueModel = require('./dbmodels/issue')(sequelize, Sequelize);
var returnModel = require('./dbmodels/return')(sequelize, Sequelize);


/*reviewModel.belongsTo(productModel);
productModel.hasMany(reviewModel);
productModel.hasMany(imageModel);
reviewModel.belongsTo(userModel);*/

categoryModel.hasMany(bookModel);
issueModel.hasOne(returnModel);
userModel.hasMany(issueModel);
userModel.hasMany(returnModel);

module.exports = function() {

    function Database() {};

    Database.prototype.get = function(key) {
        if (key === 'book') {
            return bookModel.findAll({ include: [{ all: true }] });
        } else if (key === 'category') {
            return categoryModel.findAll({ include: [{ all: true }] });
        } else if (key === 'users') {
            return userModel.findAll({ include: [{ all: true }] });
        } else if (key === 'issue') {
            return issueModel.findAll({ include: [{ all: true }] });
        } else if (key === 'return') {
            return returnModel.findAll({ include: [{ all: true }] });
        }     
    };

    Database.prototype.set = function(key, value) {
        if (key === 'book') {
            return bookModel.build(value).save().then(function(success) {
                console.log(success);
                return success;
            }, function(error) {
                return error;
            });
        } else if (key === 'category') {
             return categoryModel.build(value).save().then(function(success) {
                console.log(success);
                return success;
            }, function(error) {
                return error;
            });
        } else if (key === 'users') {
           return userModel.build(value).save().then(function(success) {
                console.log(success);
                return success;
            }, function(error) {
                return error;
            });
        } else if (key === 'issue') {
            return issueModel.build(value).save().then(function(success) {
                console.log(success);
                return success;
            }, function(error) {
                return error;
            });
        } else if (key === 'return') {
            return returnModel.build(value).save().then(function(success) {
                console.log(success);
                return success;
            }, function(error) {
                return error;
            });
        }
    };

    Database.prototype.bulkUpdate = function(key,value){
         if (key === 'issue') {
           return issueModel.bulkCreate(value).then(function(success) {
                return value;
            }, function(error) {
                return error;
            });
         }
    };

    Database.prototype.getInfo = function(key,value){
         if (key === 'issue') {
           return issueModel.bulkCreate(value).then(function(success) {
                return value;
            }, function(error) {
                return error;
            });
         }
    };

    Database.prototype.update = function(key, value, id) {
        if (key === 'book') {
            return bookModel.update(value, { where: { id: id } }).then(function(success) {
                return value;
            }, function(error) {
                return error;
            });
        }
        else if (key === 'issue') {
            return issueModel.update(value, { where: { id: id } }).then(function(success) {
                return value;
            }, function(error) {
                return error;
            });
        }
    }

    Database.prototype.delete = function(key, id) {
        if (key === 'book') {
            return bookModel.destroy({ where: { id: id } }).then(function(success) {
                return success;
            }, function(error) {
                return error;
            });
        }
    }


    // Used in tests
    Database.prototype.clear = function() {
        store = {};
    };

    return new Database();
};
