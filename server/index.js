const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
require('dotenv').config();

// Connecting our .env variable
massive( process.env.CONNECTION_STRING )
  .then( db => app.set('db', db) )
  .catch( (error) => console.log(error));

const app = express();

app.use( bodyParser.json() );

// Session initialization
app.use( session({
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 200 * 1000
  }
}) );

// Controllers
const users_controller = require('./controllers/users_controller');
const petowners_controller = require('./controllers/petowners_controller');
const caregivers_controller = require ('./controllers/caregivers_controller');
const animals_controller = require ('./controllers/animals_controller');
const availability_controller = require ('./controllers/availability_controller');
const bookings_controller = require ('./controllers/bookings_controller');
const jobs_controller = require ('./controllers/jobs_controller');
const reviews_controller = require ('./controllers/reviews_controller');

// Users management
app.post('/register', users_controller.register);
app.post('/login', users_controller.login);
app.post('/logout', users_controller.logout);
app.get('/user/:id', users_controller.getOne);

// Petowners management
app.get('/petowners', petowners_controller.getAll);
app.get('/petowner/:id', petowners_controller.getOne);
app.delete('/delete/petowner/:id', petowners_controller.destroy);

// Caregivers management
app.get('/caregivers', caregivers_controller.getAll);
app.get('/caregiver/:id', caregivers_controller.getOne);
app.delete('/delete/caregiver/:id', caregivers_controller.destroy);

// Animals management
app.post('/animal', animals_controller.create);
app.get('/animals', animals_controller.getAll);
app.get('/animals/:id', animals_controller.getUserAnimals);
app.get('/animal/:id', animals_controller.getOne);
app.put('/update/animal/:id', animals_controller.update);
app.delete('/delete/animal/:id', animals_controller.destroy);

// Availability management
app.post('/create/available', availability_controller.create);
app.get('/available', availability_controller.getAll);
app.put('/update/available/:id', availability_controller.update);

// Booking management
app.post('/create/booked', bookings_controller.create);
app.get('/booked', bookings_controller.getAll);
app.put('/update/booked', bookings_controller.update);

// Jobs management
app.post('/job', jobs_controller.create);
app.get('/jobs', jobs_controller.getAll);
app.get('/job/:id', jobs_controller.getOne);

// Reviews management
app.post('/review', reviews_controller.create);
app.get('/reviews', reviews_controller.getAll);
app.get('/reviews/:client', reviews_controller.getReviewsForCaregiver);


const port = process.env.PORT || 3050;
app.listen( port, () => console.log(`Listening on port: ${port}`) );