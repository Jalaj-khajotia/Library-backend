'use strict';

// Tasks routes
var Joi = require('joi');
var Boom = require('boom');
var Promise = require('bluebird');
var IssueBookcontroller = require('../controllers/IssueBook-controller');

exports.register = function(server, options, next) {
    // Setup the controller
    var issueBookcontroller = new IssueBookcontroller(options.database);

    // Binds all methods
    // similar to doing `returncontroller.index.bind(returncontroller);`
    // when declaring handlers

    server.bind(issueBookcontroller);

    // Declare routes
    server.route([{
        method: 'GET',
        path: '/issuebooks',
        config: {
            auth: 'jwt',
            handler: issueBookcontroller.index
        }
    }, {
        method: 'GET',
        path: '/issuebook/{id}',
        config: {
            auth: 'jwt',
            handler: issueBookcontroller.show,
            validate: {
                params: {
                    id: Joi.number().integer()
                }
            }
        }
    }, {
        method: 'POST',
        path: '/issuebook',
        config: {
            auth: 'jwt',
            handler: issueBookcontroller.store
        }
    }, {
        method: 'POST',
        path: '/issuebooks',
        config: {
            auth: 'jwt',
            handler: issueBookcontroller.bulkStore
        }
    }, {
        method: 'PUT',
        path: '/issuebookbyIssueID/{id}',
        config: {
            auth: 'jwt',
            handler: issueBookcontroller.update,
            validate: {
                params: {
                    id: Joi.number().integer()
                }
            }
        }
    }, {
        method: 'PUT',
        path: '/issuebooksReturn',
        config: {
            auth: 'jwt',
            handler: issueBookcontroller.bulkUpdate
        }
    }, {
        method: 'DELETE',
        path: '/return/{id}',
        config: {
            auth: 'jwt',
            handler: issueBookcontroller.destroy,
            validate: {
                params: {
                    id: Joi.number().integer()
                }
            }
        }
    }]);
    next();
}

exports.register.attributes = {
    name: 'routes-return',
    version: '1.0.1'
};
