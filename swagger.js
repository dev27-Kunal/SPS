const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Parking Slot API",
      version: "1.0.0",
      description: "API for managing parking slots",
    },
    servers: [
      {
        url: "http://192.168.1.19:5000/api",
      },
      {
        url: "http://localhost:5000/api",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to route files with JSDoc
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
