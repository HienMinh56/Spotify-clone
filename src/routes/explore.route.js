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
const { explore, exploreDetail } = require('../controllers/explore.controller');


router.get(['/', '/page/:page'], explore);

router.get(['/:categoryId', '/:categoryId/page/:page'], exploreDetail);


module.exports = router;