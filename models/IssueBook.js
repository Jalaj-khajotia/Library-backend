'use strict';

var crypto = require('crypto');
var Promise = require('bluebird');

function IssueBookModel(database) {
    this.db = database;
};

IssueBookModel.prototype.getAllIssueBooks = function() {
    return this.db.get('issueBook');
};

IssueBookModel.prototype.getIssueBook = function(id) { 
     return this.db.getbyId('issueBook', newTask);  
};

IssueBookModel.prototype.addIssueBook = function(newTask) {
    return this.db.set('issueBook', newTask);
};

IssueBookModel.prototype.bulkAddIssueBooks = function(newTask) {	
    return this.db.bulkAdd('issueBook', newTask);
};
IssueBookModel.prototype.returnIssueBook = function(id, newTask) {   
      return this.db.update('issueBook', newTask, id);
};

IssueBookModel.prototype.bulkReturn = function(id, returnDate) {   
      return this.db.bulkUpdate('issueBook', returnDate, id);
};

IssueBookModel.prototype.deleteIssueBook = function(id) {
      return this.db.delete('issueBook', id);
};

module.exports = IssueBookModel;
