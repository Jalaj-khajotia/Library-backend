'use strict';

var Boom = require('boom');
var UsersModel = require('../models/Users');

function UsersController(database) {
    this.usersModel = new UsersModel(database);
};

// [GET] /tasks
/*
        {"email":"jalajiitr@gmail.com",
        "password": "pass!23"}
*/
UsersController.prototype.index = function(request, reply) {

    this.usersModel.getAllUsers().
    then(function(users) {
        console.log(users);
        for (var i = 0; i < users.length; i++) {
          
            if (users[i].userEmail == request.payload.email) {
                if (users[i].userPassword == request.payload.password) {
                    var user = {          
                         id  :users[i].id,                 
                        email: users[i].userEmail,
                        password: users[i].userPassword,
                        scope: 'admin',
                        name: users[i].name,
                        department: users[i].department
                    }
                    return reply(user);
                } else {
                    return reply(Boom.unauthorized('Bad email or password'));
                }
            }
        }
        return reply(Boom.unauthorized('User not found'));       
        //return reply(users);
    }, function(error) {
        console.log(error);
    });
};

// [GET] /tasks/{id}
UsersController.prototype.show = function(request, reply) {
    try {
        var id = request.params.id;
        this.usersModel.getUser(id).then(function(user){
         reply(user);
        }, function(error){
        reply(error);
        });      
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

// [POST] /tasks
UsersController.prototype.store = function(request, reply) {
    try {
        var value = request.payload.user;
        reply(this.usersModel.addUser(value));          
    } catch (e) {
        reply(Boom.badRequest(e.message));
    }
};

// [PUT] /tasks/{id}
UsersController.prototype.update = function(request, reply) {
    try {
        var id = request.params.id;
        var task = request.payload.user;
        reply(this.usersModel.updateUser(id, task));
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

// [DELETE] /tasks/{id}
UsersController.prototype.destroy = function(request, reply) {
    try {
        var id = request.params.id;

        this.usersModel.deleteUser(id);
        reply().code(204);
    } catch (e) {
        reply(Boom.notFound(e.message));
    }
};

module.exports = UsersController;