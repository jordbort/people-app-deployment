///////////////////////////////
// DEPENDENCIES
////////////////////////////////
const express = require(`express`);
const cors = require(`cors`)
const morgan = require(`morgan`)


// create application object
const app = express();

// initialize .env variables
require(`dotenv`).config();
require(`./config/db.connection`) // runs all of the code in db.connection.js
// pull PORT from .env, give default value of 4000 and establish DB Connection
const { PORT, MONGODB_URI } = process.env;

app.use(cors()) // allows for cross origin request - open channel
app.use(morgan(`dev`)) // request logger for dev


const peopleController = require(`./controllers/people-controller`)

// Middleware
app.use(express.json()) // without this, the app can't parse JSON coming in from the request (tested using Postman)
app.use(`/people`, peopleController) // when the user navigates to /people, run the contents of people-controller.js

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get(`/`, (request, response) => {
    console.log(`Redirecting to /people ...`)
    response.redirect(`/people`)
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
