/**
 * @license Apache-2.0
 * @copyright Fancy 2024
 */

'use strict';


/**
 * Custom modules
 */
const userApi = require('../api/user.api');
const playerApi = require('../api/player.api');
const categoryApi = require('../api/category.api');
const playlistApi = require('../api/playlist.api');


const explore = async (req, res) => {

    // Current user profile
    const currentProfile = await userApi.getProfile(req);

    // Recently played tracks
    const recentlyPlayed = await playerApi.getRecentPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track)

    // Get several categories
    const categories = await categoryApi.getSeveralDetail(req);

    res.render('./pages/explore', {
        currentProfile,
        recentlyPlayedTracks,
        categories
    });
}


const exploreDetail = async (req, res) => {

    // Current user profile
    const currentProfile = await userApi.getProfile(req);

    // Recently played tracks
    const recentlyPlayed = await playerApi.getRecentPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track)

    // Get category tracks
    const catInfo = await categoryApi.getDetail(req);

    // Get category playlist
    const catPlaylist = await playlistApi.getCategoryPlaylist(req);

    res.render('./pages/explore_detail', {
        currentProfile,
        recentlyPlayedTracks,
        catInfo,
        catPlaylist
    });    
}


module.exports = {
    explore,
    exploreDetail
}