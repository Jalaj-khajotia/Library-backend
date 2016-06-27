'use strict';

// Tasks routes
var Joi = require('joi');
var Boom = require('boom');
var Promise = require('bluebird');
var BookController = require('../controllers/Book-controller');

exports.register = function(server, options, next) {
    // Setup the controller
    var bookController = new BookController(options.database);

    // Binds all methods
    // similar to doing `BookController.index.bind(BookController);`
    // when declaring handlers

    server.bind(bookController);      

    // Declare routes
    server.route([
        {
            method: 'GET',
            path: '/books',
            config: {        
                auth: false,         
                handler: bookController.index,
                validate: {
                    query: Joi.object().keys({
                        start: Joi.number().min(0),
                        limit: Joi.number().min(1)
                    })
                }
            }
        },
        {
            method: 'GET',
            path: '/book/{id}',
            config: {
                  auth: false,
                handler: bookController.show,
                validate: {
                    params: {
                        id: Joi.number().integer()
                    }
                }
            }
        },
        {
            method: 'POST',
            path: '/book',
            config: {
                 auth: false,
                handler: bookController.store
            }
        },
        {
            method: 'PUT',
            path: '/book/{id}',
            config: {
                auth: false,
                handler: bookController.update,
                validate: {
                    params: {
                        id: Joi.number().integer()
                    }
                }
            }
        },
        {
            method: 'DELETE',
            path: '/book/{id}',
            config: {
                auth: false,
                handler: bookController.destroy,
                validate: {
                    params: {
                        id: Joi.number().integer()
                    }
                }
            }
        }
    ]);
    next();
}

exports.register.attributes = {
    name: 'routes-books',
    version: '1.0.1'
};

function getValidatedUser(email, password){
    return new Promise(function(fulfill, reject){

        var users = [
            {
                id: 123,
                email: 'admin@admin.com',
                password: 'admin',
                scope: ['user', 'admin', 'user-123']
            },
            {
                id: 124,
                email: 'guest@guest.com',
                password: 'guest',
                scope: ['user', 'user-124']
            },
            {
                id: 125,
                email: 'other@other.com',
                password: 'other',
                scope: ['user', 'user-125']
            }
        ];

        // This is done to remove the password before being sent.
        function grabCleanUser(user) {
            var user = user;
            delete user.password;
            return user;
        };

        // very simple look up based on the user array above.
        if (email === users[0].email && password === users[0].password) {
            return fulfill(grabCleanUser(users[0]));
        } else if (email === users[1].email && password === users[1].password) {
            return fulfill(grabCleanUser(users[1]));
        } else if (email === users[2].email && password === users[2].password) {
            return fulfill(grabCleanUser(users[2]));
        } else {
            return reject(null);
        }
    });
}