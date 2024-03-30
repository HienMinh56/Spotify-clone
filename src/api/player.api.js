/**
 * @license Apache-2.0
 * @copyright Fancy 2024
 */

'use strict';


/**
 * Custom modules
 */
const { getData } = require('../config/axios.config');
const apiConfig = require('../config/api.config');


/**
 * Get tracks from the current user's recently played tracks
 * 
 * @param {Object} req - Server request object
 * @param {number} itemLimit - The maximum number of items to return, default: 30
 * @returns {Object}
 */
const getRecentlyPlayed = async (req, itemLimit = apiConfig.DEFAULT_LIMIT) => {
    const { data: recentlyPlayed } = await getData(`/me/player/recently-played?limit=${itemLimit}`, req.cookies.access_token);

    return recentlyPlayed;
};


module.exports = { getRecentlyPlayed }