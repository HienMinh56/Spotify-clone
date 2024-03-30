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
const { getUrlQuery } = require('../utils/helpers.util');


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


/**
 * Get Spotify catalog information about an artist's albums.
 * 
 * @param {Object} req - Server request object
 * @param {number} itemLimit - The maximum number of items to return. Default: 30
 * @param {string} id - The Spotify Id of the artist
 * @returns {Object}
 */
const getAlbum = async (req, itemLimit, id) => {
    const { offset, limit, page } = getUrlQuery(req.params, itemLimit);
    const { artistId = id } = req.params;

    const { data: artistAlbum } = await getData(`/artists/${artistId}/albums?limit=${limit}&offset=${offset}`, req.cookies.access_token);

    const /** {string} */ baseUrl = `${req.baseUrl}/${artistId}/album`;

    return { baseUrl, page, ...artistAlbum }
}


module.exports = {
    getSeveralDetail,
    getAlbum
}