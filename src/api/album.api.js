/**
 * @license Apache-2.0
 * @copyright Fancy 2024
 */

'use strict';


/**
 * Custom modules
 */
const { getData } = require('../config/axios.config');
const { getUrlQuery } = require('../utils/helpers.util');


/**
 * Get a list of new album releases featured in Spotify
 * 
 * @param {Object} req - Server request object
 * @param {number} itemLimit - The maximum number of items to return. Default: 30
 * @returns {Object}
 */
const getNewRelease = async (req, itemLimit) => {
    const { limit, offset, page } = getUrlQuery(req.params, itemLimit);

    const { data: { albums: newRelease } } = await getData(`/browse/new-releases?limit=${limit}&offset=${offset}`, req.cookies.access_token);

    return { baseUrl: req.baseUrl, page, ...newRelease}
}


/**
 * Get Spotify catalog information about a single album.
 * 
 * @param {Object} req - Server request object
 * @returns {Object}
 */
const getDetail = async (req) => {
    const { albumId } = req.params;

    const { data: albumDetail } = await getData(`/albums/${albumId}`, req.cookies.access_token);

    return albumDetail;
}


module.exports = {
    getNewRelease,
    getDetail
}