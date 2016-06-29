'use strict';

var crypto = require('crypto');
var Promise = require('bluebird');

function IssueModel(database) {
    this.db = database;
};

IssueModel.prototype.getAllIssues = function() {
    return this.db.get('issue') || [];
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
    var task = this.db.getbyId('issue', id);

    return task;
    if (!task) {
        throw new Error('Task doesn\'t exists.');
    }
};


IssueModel.prototype.addIssue = function(newTask) {  
    console.log('data from issue controller');
    return this.db.set('issue', newTask);
};
IssueModel.prototype.addBulk = function(newTask) {  
    console.log('data from issue controller');  
    return this.db.bulkAdd('issue', newTask);
};

/* 
    Not implemented
*/
IssueModel.prototype.updateIssue = function(id, updatedTask) { 
    var task = this.db.getbyId('issue', id);

    if (!task) {
        throw new Error('Task doesn\'t exists.');
    }

    task.value = updatedTask;

    return task;
};

IssueModel.prototype.deleteIssue = function(id) {
    var task = this.db.getbyId('issue', id);
    var db = this.db;
    return task.then(function(s) {
        return db.delete('issue', id);
    }, function() {
        throw new Error('issue doesn\'t exists.');
    });
};

module.exports = IssueModel;
