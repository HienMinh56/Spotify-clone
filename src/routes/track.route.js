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
const { trackDetail } = require('../controllers/track.controller');


router.get('/:trackId', trackDetail);


module.exports = router;