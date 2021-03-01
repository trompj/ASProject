// NodeJS, Express, TypeORM RESTful API
// Justin Tromp
// Application setup - Start server and set controllers to be used
// TODO: - Remember to turn off CORS prior to production
//       - "No metadata found" error that does not appear to impact functionality. Look into on next release.

import "reflect-metadata";
import * as express from "express";
import {createExpressServer, useExpressServer} from "routing-controllers";
import {createConnection} from "typeorm";
import { ContactController } from "./controller/ContactController";
import * as dotenv from 'dotenv';

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

// Create a typeorm connection
createConnection().then(connection => {
    // Setup dotenv to use environment variables
    dotenv.config();

    const port = process.env.PORT;

    // Create and setup express application
    const app = express()
        .on('error', (err: any) => {
            if (err.code === 'EADDRINUSE') {
                console.log('Server startup error: Port is already in use');
            }
            else {
                console.log(err);
            }
        });


    app.use(express.json());

    // Allow cors for development
    const cors = require('cors');
    app.use(cors());

    // Register controllers
    useExpressServer(app, {
        controllers: [ContactController],
        routePrefix: "/api",
    });

    // Start swagger documentation
    app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Start express server on port and output result
    app.listen(port, () => {
        return console.log(`Server is listening on ${port}`);
    });
});
