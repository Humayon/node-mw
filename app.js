const express = require('express');

const app = express();

const morgan = require('morgan');

/**
 * Middleware
 */

// app.use(morgan('dev'));

/**
 * Custom Middleware
 */
let cMiddleware = (req, res, next) => {
  if (req.url === '/help') {
    res.send('<h1>This page is blocked by Admin</h1>');
  }
  next();
};
// app.use(cMiddleware);

/**
 * Tiny logger Middleware
 */

let tinyLogger = () => {
  return (req, res, next) => {
    console.log(`${req.method}-${req.url}`);
    next();
  };
};

//multiple middleware
let middleWare = [cMiddleware, tinyLogger()];

//middle ware calling
app.use(middleWare);

/**
 * Routes
 */
app.get('/help', (req, res) => {
  res.send('<h1>Hello from Help page!!</h1>');
});

app.get('/about', morgan('dev'), (req, res) => {
  res.send('<h1>Hello from About page</h1>');
});

app.get('/', (req, res) => {
  res.send('<h1>Hello from Node</h1>');
});

app.get('*', (req, res) => {
  res.send('<h1>404 not found</h1>');
});

/**
 * Server
 */
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
