'use strict';

var Database = require('./database');
var Hapi = require('hapi');
var models = require('./dbmodels');
var hapiAuthJWT = require('hapi-auth-jwt2/lib/index');
var JWT = require('jsonwebtoken');

var secret = 'NeverShareYourSecret'; // Never Share This! even in private GitHub repos!


var database = new Database();
var server = new Hapi.Server({ debug: { request: ['info', 'error'] } });

// Expose database
if (process.env.NODE_ENV === 'test') {
    server.database = database;
}

// Create server
server.connection({
    host: 'localhost',
    port: 8000,

    routes: {
        cors: true
    }
});

var validate = function (decoded, request, callback) {
  console.log(" - - - - - - - decoded token:");
  console.log(decoded);
  console.log(" - - - - - - - request info:");
  console.log(request.info);
  console.log(" - - - - - - - user agent:");
  console.log(request.headers['user-agent']);

  // do your checks to see if the person is valid
  console.log(request.payload);
  if (request.email) {
    return callback(null, false);
  }
  else {
    return callback(null, true);
  }
};


server.register([{
    register: hapiAuthJWT
}], function(err) {
    if (err) {
        console.error('Failed to load a plugin:', err);
        throw err;
    }

    server.auth.strategy('jwt', 'jwt',
  { key: secret, validateFunc: validate,
    verifyOptions: { ignoreExpiration: true }
  });

  server.auth.default('jwt');


});

// Add routes
var plugins = [{
    register: require("good"),
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: { ops: '*', request: '*', log: '*', response: '*', 'error': '*' }
        }]
    }
}, {
    register: require('./routes/user-routes.js'),
    options: {
        database: database
    }
}, {
    register: require('./routes/book-routes.js'),
    options: {
        database: database
    }
}, {
    register: require('./routes/issue-routes.js'),
    options: {
        database: database
    }
}, {
    register: require('./routes/issueBook-routes.js'),
    options: {
        database: database
    }
}, {
    register: require('./routes/category-routes.js'),
    options: {
        database: database
    }
}];

server.register(plugins, function(err) {
    if (err) {
        throw err;
    }

    console.log(!module.parent);

    if (!module.parent) {

        models.sequelize.sync().then(function() {
            server.start(function(err) {
                if (err) {
                    throw err;
                }
                //console.log('starting server '+ server.info.uri);
                server.log('info', 'Server running at: ' + server.info.uri);
            });
        });
    };
});

module.exports = server;
