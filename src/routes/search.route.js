/**
 * @license Apache-2.0
 * @copyright Fancy 2024
 */

'use strict';


/**
 * Node modules
 */
const router = require('express').Router();


/**
 * Custom modules
 */
const {
    searchRequest,
    searchAll,
    searchAlbum,
    searchArtist,
    searchPlaylist,
    searchTrack
} = require('../controllers/search.controller');


router.post('/', searchRequest);

router.get('/all/:query', searchAll);

router.get(['/albums/:query', '/albums/:query/page/:page'], searchAlbum);

router.get(['/artists/:query', '/artists/:query/page/:page'], searchArtist);

router.get(['/playlists/:query', '/playlists/:query/page/:page'], searchPlaylist);

router.get(['/tracks/:query', '/tracks/:query/page/:page'], searchTrack);


module.exports = router;