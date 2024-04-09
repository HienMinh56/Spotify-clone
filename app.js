/**
 * @license Apache-2.0
 * @copyright Fancy 2024
 */

'use strict';


/**
 * Node modules
 */
const cors = require('cors');
const cookieParser = require('cookie-parser');


/**
 * Custom modules
 */
const login = require('./src/routes/login.route');
const auth = require('./src/routes/auth.route');
const authenticatedUser = require('./src/middlewares/auth_user.middleware');
const home = require('./src/routes/home.route');
const explore = require('./src/routes/explore.route');
const album = require('./src/routes/album.route');
const playlist = require('./src/routes/playlist.route');
const profile = require('./src/routes/profile.route');
const search = require('./src/routes/search.route');
const artist = require('./src/routes/artist.route');
const track = require('./src/routes/track.route');


// Initial express app
const express = require('express');
const app = express();


/**
 * EJS setting
 */
app.set('view engine', 'ejs');


/**
 * Setting static directory
 */
app.use(express.static(`${__dirname}/public`));


/**
 * Enable cors & cookie parser
 */
app.use(cors()).use(cookieParser());


/**
 * Encode post request body
 */
app.use(express.urlencoded({ extended: true }));


/**
 * Login page
 */
app.use('/login', login);


/**
 * Auth page
 */
app.use('/auth', auth);


/**
 * Check user is authenticated
 */
app.use(authenticatedUser);


/**
 * Home page
 */
app.use('/', home);


/**
 * Explore page
 */
app.use('/explore', explore);


/**
 * Album page
 */
app.use('/album', album);


/**
 * Playlist page
 */
app.use('/playlist', playlist);


/**
 * Playlist page
 */
app.use('/me', profile);


/**
 * Search result page
 */
app.use('/search', search);


/**
 * Artist page
 */
app.use('/artist', artist);


/**
 * Track page
 */
app.use('/track', track);


app.listen(5000, () => {
    console.log(`Server is listening at http://localhost:5000`);
});