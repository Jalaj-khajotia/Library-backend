'use strict';

var crypto = require('crypto');
var Promise = require('bluebird');

function IssueModel(database) {
    this.db = database;
};

IssueModel.prototype.getAllIssues = function() {
    return this.db.get('issue') || [];
};

IssueModel.prototype.findIssuesByProperty = function(prop, value) {
    var task, i, len;
    var products = this.getIssues();
    var users = this.db.get('issue');
    return new Promise(function(fulfill, reject) {
        var tasks = products.
        then(function(products) {
            users.then(function(user_data) {
                for (i = 0, len = products.length; i < len; i++) {
                    var product = products[i];
                    if (products[i].id == value) {

                        return fulfill(product);
                    }
                }
                return reject('not found');
            }, function(error) {

            });

            //return reply(users);
        }, function(error) {
            return reject(error);
            console.log(error);
        });
    });
};

IssueModel.prototype.getIssues = function() {
    var tasks = this.getAllIssues();
    return tasks;
};

IssueModel.prototype.getIssuesByName = function(name) {
    try {
        var selectedIssues = [];
        this.getAllIssues().then(function(product) {
            for (var i = product.length - 1; i >= 0; i--) {
                if (product[i].bookName === name) {
                    selectedIssues.push(product[i]);
                }
            };
        })
        return (selectedIssues);
    }
    catch(er) {
        return er;
    };
}

IssueModel.prototype.getIssue = function(id) {
    var task = this.findIssuesByProperty('id', id);

    return task;
    if (!task) {
        throw new Error('Task doesn\'t exists.');
    }
};


IssueModel.prototype.addIssue = function(newTask) {  
    console.log('data from issue controller');
    console.log(newTask);
    return this.db.set('issue', newTask);
};
IssueModel.prototype.addBulk = function(newTask) {  
    console.log('data from issue controller');
    console.log(newTask);
    return this.db.bulkUpdate('issue', newTask);
};


IssueModel.prototype.updateIssue = function(id, updatedTask) {
    updatedTask = updatedTask.trim();

    var task = this.findIssuesByProperty('id', id);

    if (!task) {
        throw new Error('Task doesn\'t exists.');
    }

    task.value = updatedTask;

    return task;
};

IssueModel.prototype.deleteIssue = function(id) {
    var task = this.findIssuesByProperty('id', id);
    var db = this.db;
    return task.then(function(s) {
        return db.delete('issue', id);
    }, function() {
        throw new Error('issue doesn\'t exists.');
    });
};

module.exports = IssueModel;
