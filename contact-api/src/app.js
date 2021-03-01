"use strict";
// NodeJS, Express, TypeORM RESTful API
// Justin Tromp
// Application setup - Start server and set controllers to be used
// TODO: - Remember to turn off CORS prior to production
//       - "No metadata found" error that does not appear to impact functionality. Look into on next release.
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express = require("express");
var routing_controllers_1 = require("routing-controllers");
var typeorm_1 = require("typeorm");
var ContactController_1 = require("./controller/ContactController");
var dotenv = require("dotenv");
var swaggerUi = require("swagger-ui-express");
var swaggerDocument = require("./docs/swagger.json");
// Create a typeorm connection
typeorm_1.createConnection().then(function (connection) {
    // Setup dotenv to use environment variables
    dotenv.config();
    var port = process.env.PORT;
    // Create and setup express application
    var app = express()
        .on('error', function (err) {
        if (err.code === 'EADDRINUSE') {
            console.log('Server startup error: Port is already in use');
        }
        else {
            console.log(err);
        }
    });
    app.use(express.json());
    // Allow cors for development
    var cors = require('cors');
    app.use(cors());
    // Register controllers
    routing_controllers_1.useExpressServer(app, {
        controllers: [ContactController_1.ContactController],
        routePrefix: "/api",
    });
    // Start swagger documentation
    app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    // Start express server on port and output result
    app.listen(port, function () {
        return console.log("Server is listening on " + port);
    });
});
