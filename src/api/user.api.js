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
 * Get detailed profile information about the current user.
 * 
 * @param {Object} req - Server request object
 * @returns {Object}
 */
const getProfile = async (req) => {
    const /** {object} */ { data: currentProfile } = await getData('/me', req.cookies.access_token);

    return currentProfile;
}


module.exports = {
    getProfile
}