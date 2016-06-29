'use strict';

var crypto = require('crypto');
var Promise = require('bluebird');

function UsersModel(database) {
    this.db = database;
};

UsersModel.prototype.getAllUsers = function() {
    return this.db.get('user') || [];
};

UsersModel.prototype.getUser = function(id) {
    var task = this.db.getbyId('user', id);
     return task;
    if (!task) {
        throw new Error('Task doesn\'t exists.');
    }   
};

UsersModel.prototype.addUser = function(newTask) {
    var tasks = this.getAllUsers();
    newTask = newTask.trim();

    // We don't want duplicates
    if (this.findTaskByProperty('value', newTask)) {
        throw new Error('Task already exists for id: ' + task.id);
    }

    var task = {
        // Collisions can happen but unlikely
        // 1 byte to hex turns into two characters
        id: crypto.randomBytes(8).toString('hex'),
        value: newTask
    }
    tasks.push(task);

    this.db.set('tasks', tasks);

    return task;
};

//          not implemented

UsersModel.prototype.updateUser = function(id, updatedTask) {
    if (!task) {
        throw new Error('Task doesn\'t exists.');
    }

    task.value = updatedTask;

    return task;
};

UsersModel.prototype.deleteUser = function(id) {
    
    var task, i, len;
    var tasks = this.getAllUsers();

    for (i = 0, len = tasks.length; i < len; i++) {
        task = tasks[i];
        if (task.id === id) {
            this.db.delete('user', tasks);
            return;
        }
    }
};

module.exports = UsersModel;
