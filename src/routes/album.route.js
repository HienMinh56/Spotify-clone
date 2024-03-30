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
const { album, albumDetail } = require('../controllers/album.controller');


router.get(['/', '/page/:page'], album);

router.get('/:albumId', albumDetail);


module.exports = router;