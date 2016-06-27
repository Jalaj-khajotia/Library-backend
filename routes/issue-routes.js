'use strict';

// Tasks routes
var Joi = require('joi');
var Boom = require('boom');
var Promise = require('bluebird');
var IssueController = require('../controllers/Issue-controller');

exports.register = function(server, options, next) {
    // Setup the controller
    var issueController = new IssueController(options.database);

    // Binds all methods
    // similar to doing `issueController.index.bind(issueController);`
    // when declaring handlers

    server.bind(issueController);      

    // Declare routes
    server.route([
        {
            method: 'GET',
            path: '/issues',
            config: {
                  auth: false,
                handler: issueController.index,
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
            path: '/issue/{id}',
            config: {
                  auth: false,
                handler: issueController.getIssueByUserid,
                validate: {
                    params: {
                        id: Joi.number().integer()
                    }
                }
            }
        },
        {
            method: 'POST',
            path: '/issue',
            config: {
                 auth: false,
                handler: issueController.store
            }
        },
        {
            method: 'PUT',
            path: '/issue/{id}',
            config: {
                auth: false,
                handler: issueController.update,
                validate: {
                    params: {
                        id: Joi.number().integer()
                    }
                }
            }
        },
        {
            method: 'DELETE',
            path: '/issue/{id}',
            config: {
                auth: false,
                handler: issueController.destroy,
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
    name: 'routes-issue',
    version: '1.0.1'
};
