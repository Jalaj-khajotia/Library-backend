'use strict';

var crypto = require('crypto');
var Promise = require('bluebird');

function CategoriesModel(database) {
    this.db = database;
};

CategoriesModel.prototype.getAllCategories = function() {
    return this.db.get('category') || [];
};

CategoriesModel.prototype.getCategory = function(id) {
    var task = this.db.getbyId('category', id);
   
    return task;
     if (!task) {
        throw new Error('Task doesn\'t exists.');
    }
};

CategoriesModel.prototype.addCategory = function(newTask) {    
    return this.db.set('category', newTask);;
};

CategoriesModel.prototype.updateCategory = function(id, updatedTask) {   

    var task = this.getCategory(id);
    if (!task) {
        throw new Error('Category doesn\'t exists.');
    }
    return this.db.update('category',updatedTask, id); 
};

CategoriesModel.prototype.deleteCategory = function(id) {
     var task = this.db.getbyId('category', id);
    var db = this.db;
    return task.then(function(s) {
        return db.delete('category', id);
    }, function() {
        throw new Error('category doesn\'t exists.');
    });
    
};

module.exports = CategoriesModel;
