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
    artistDetail,
    artistAlbum
} = require('../controllers/artist.controller');


router.get('/:artistId', artistDetail);

router.get(['/:artistId/album', '/:artistId/album/page/:page'], artistAlbum)


module.exports = router;