import { OpenApiValidator } from 'openapi-validator';
import express from 'express';
import bodyParser from 'body-parser';

const apiSpecUrl = 'https://example.com/path/to/your/oas3/spec.yaml';
const validator = new OpenApiValidator({ url: apiSpecUrl });

const app = express();

app.use(bodyParser.json());

app.use(async (req, res, next) => {
  try {
    await validator.validate('post', req.path, req.body);
    next();
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: 'Invalid request body',
      details: err.errors,
    });
  }
});

app.post('/example', (req, res) => {
  res.json({ message: 'Success!' });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


////////////////////

import path from "path";
import * as OpenApiValidator from "express-openapi-validator";

const spec = path.join("assets", "openapi.json");

export const validateInputs = OpenApiValidator.middleware({
  apiSpec: spec,
  validateRequests: true,
  validateResponses: true,
});


///////////////////////

import express from "express";
import * as OpenApiValidator from "express-openapi-validator";

const app = express();

const specUrl = "https://petstore.swagger.io/v2/swagger.json";

app.use(
  OpenApiValidator.middleware({
    apiSpec: specUrl,
    validateRequests: true,
    validateResponses: true,
  })
);

app.get("/pets/:petId", (req, res, next) => {
  const petId = req.params.petId;
  // do something with the petId
  res.send(`You requested pet with ID ${petId}`);
});

// Add error handling middleware to the application
app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

