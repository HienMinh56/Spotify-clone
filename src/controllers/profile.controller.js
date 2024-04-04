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
const apiConfig = require('../config/api.config');
const { msToTimeCode } = require('../utils/helpers.util');


const profile = async (req, res) => {

    // Current user profile
    const currentProfile = await userApi.getProfile(req);

    // Recently played tracks
    const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

    // Current user top artist
    const userTopArtist = await userApi.getTopArtist(req, apiConfig.LOW_LIMIT);

    // Current user top tracks
    const userTopTracks = await userApi.getTopTracks(req, 6);

    // Current user followed artist
    const userFollowedArtist = await userApi.getFollowedArtist(req);

    res.render('./pages/profile', {
        currentProfile,
        recentlyPlayedTracks,
        userTopArtist,
        userTopTracks,
        userFollowedArtist,
        msToTimeCode
    });
}


const topArtist = async (req, res) => {

    // Current user profile
    const currentProfile = await userApi.getProfile(req);

    // Recently played tracks
    const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

    // Current user top artist
    const userTopArtist = await userApi.getTopArtist(req);

    res.render('./pages/user_top_artist', {
        currentProfile,
        recentlyPlayedTracks,
        artists: userTopArtist,
        title: 'Your top artists'
    });
}


const topTrack = async (req, res) => {

    // Current user profile
    const currentProfile = await userApi.getProfile(req);

    // Recently played tracks
    const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

    // Current user top tracks
    const userTopTracks = await userApi.getTopTracks(req, 50);

    res.render('./pages/user_top_track', {
        currentProfile,
        recentlyPlayedTracks,
        tracks: userTopTracks,
        title: 'Your top tracks',
        msToTimeCode
    });
}


module.exports = {
    profile,
    topArtist,
    topTrack
}