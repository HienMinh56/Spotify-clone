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
const { playlist, playlistDetail } = require('../controllers/playlist.controller');


router.get(['/', '/page/:page'], playlist);

router.get('/:playlistId', playlistDetail);


module.exports = router;