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
 * Get Spotify catalog information for several artists based on their Spotify IDs
 * 
 * @param {Object} req - Server request object
 * @param {string} artistIds - A comma-separated list of Spotify IDs for the artists. Maximum: 50 IDs
 * @returns {Object}
 */
const getSeveralDetail = async (req, artistIds) => {
    const { data: trackArtists } = await getData(`/artists?ids=${artistIds}`, req.cookies.access_token);

    return trackArtists;
}


module.exports = {
    getSeveralDetail
}