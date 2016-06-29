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
var issueBookModel = require('./dbmodels/issue_book')(sequelize, Sequelize);


categoryModel.hasMany(bookModel);
userModel.hasMany(issueModel);
bookModel.hasMany(issueBookModel);
issueModel.hasMany(issueBookModel);

module.exports = function() {

    function Database() {};

    Database.prototype.get = function(key) {
        if (key === 'book') {
            return bookModel.findAll({ include: [{ all: true }] });
        } else if (key === 'category') {
            return categoryModel.findAll({ include: [{ all: true }] });
        } else if (key === 'user') {
            return userModel.findAll({ include: [{ all: true }] });
        } else if (key === 'issue') {
            return issueModel.findAll({ include: [{ all: true }] });
        } else if (key === 'issueBook') {
            return issueBookModel.findAll({ include: [{ all: true }] });
        }
    };

    Database.prototype.getbyId = function(key, id) {
        if (key === 'book') {
            return bookModel.findOne({ where: { id: id } });
        } else if (key === 'category') {
            return categoryModel.findOne({ where: { id: id } });
        } else if (key === 'user') {
            return userModel.findOne({ where: { id: id } });
        } else if (key === 'issue') {
            return issueModel.findOne({ where: { id: id },include: [{ all: true }]  });
        } else if (key === 'issueBook') {
            return issueBookModel.findOne({ where: { id: id } });
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
        } else if (key === 'user') {
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
        } else if (key === 'issueBook') {
            return issueBookModel.build(value).save().then(function(success) {
                console.log(success);
                return success;
            }, function(error) {
                return error;
            });
        }
    };
    /*        
        [{
            "pending":true,
            "bookId":1,
            "issueId": 1
        },{
            "pending":true,
            "bookId":1,
            "issueId": 1
        }]        
    */
    Database.prototype.bulkAdd = function(key, value) {
        if (key === 'issue') {
            return issueModel.bulkCreate(value).then(function(success) {
                return value;
            }, function(error) {
                return error;
            });
        } else if (key === 'issueBook') {            
            return issueBookModel.bulkCreate(value).then(function(success) {
                console.log(value);
                return success;
            }, function(error) {
                console.log(error);
                return error;
            });
        }
    }

    Database.prototype.getInfo = function(key, value) {
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
        } else if (key === 'issue') {
            return issueModel.update(value, { where: { id: id } }).then(function(success) {
                return value;
            }, function(error) {
                return error;
            });
        } else if (key === 'issueBook') {
            return issueBookModel.update(value, { where: { IssueId: id } }).then(function(success) {
                return value;
            }, function(error) {
                return error;
            });
        } else if (key === 'category') {
            return categoryModel.update(value, { where: { IssueId: id } }).then(function(success) {
                return success;
            }, function(error) {
                return error;
            });
        } else if (key === 'user') {
            return userModel.update(value, { where: { IssueId: id } }).then(function(success) {
                return success;
            }, function(error) {
                return error;
            });
        }
    }

    Database.prototype.bulkUpdate = function(key, value, id) {
        if (key === 'issueBook') {
            return issueBookModel.findAll({ where: { IssueId: id } })
                .then(function() {
                    return issueBookModel.update(value)
                }).spread(function(affectedCount, affectedRows) {
                    return issueBookModel.findAll();
                }).then(function(tasks) {
                    console.log(tasks)
                });
        };
    };

    Database.prototype.delete = function(key, id) {
        if (key === 'book') {
            return bookModel.destroy({ where: { id: id } }).then(function(success) {
                return success;
            }, function(error) {
                return error;
            });
        } else if (key === 'category') {
            return categoryModel.destroy({ where: { id: id } }).then(function(success) {
                return success;
            }, function(error) {
                return error;
            });
        } else if (key === 'issueBook') {
            return issueBookModel.destroy({ where: { id: id } }).then(function(success) {
                return success;
            }, function(error) {
                return error;
            });
        } else if (key === 'issue') {
            return issueModel.destroy({ where: { id: id } }).then(function(success) {
                return success;
            }, function(error) {
                return error;
            });
        } else if (key === 'user') {
            return userModel.destroy({ where: { id: id } }).then(function(success) {
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
