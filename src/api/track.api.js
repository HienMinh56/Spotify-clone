/**
 * @license Apache-2.0
 * @copyright Fancy 2024
 */

'use strict';


/**
 * Custom modules
 */
const { getData } = require('../config/axios.config');


/**
 * Recommended are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of track will be returned together with pool size details.
 * 
 * @param {Object} req - Server request object
 * @param {Object} seeds - Object of artist or track seeds string
 * @param {Number} itemLimit - The maximum number of items to return. Default: 30
 * @returns {Object}
 */
const getRecommendedTrack = async (req, trackSeed, itemLimit) => {
    const { data: { tracks: recommendedTracks } } = await getData(`/recommendations?seed_tracks=${trackSeed}&limit=${itemLimit}`, req.cookies.access_token)

    return recommendedTracks;
}


module.exports = {
    getRecommendedTrack
}