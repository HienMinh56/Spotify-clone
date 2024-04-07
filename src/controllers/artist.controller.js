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
const artistApi = require('../api/artist.api');
const { msToTimeCode } = require('../utils/helpers.util');


const artistDetail = async (req, res) => {

    // Current user profile
    const currentProfile = await userApi.getProfile(req);

    // Recently played tracks
    const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

    // Artist albums
    const artistAlbums = await artistApi.getAlbum(req, apiConfig.LOW_LIMIT);

    // Artist detail
    const artistDetail = await artistApi.getDetail(req);

    // Artist top tracks
    const artistTopTrack = await artistApi.getTopTracks(req);

    // Artist related artists
    const relatedArtist = await artistApi.getRelated(req);

    res.render('./pages/artist_detail', {
        currentProfile,
        recentlyPlayedTracks,
        artistAlbums,
        artistDetail,
        artistTopTrack,
        relatedArtist,
        msToTimeCode
    });
}


const artistAlbum = async (req, res) => {

    // Current user profile
    const currentProfile = await userApi.getProfile(req);

    // Recently played tracks
    const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

    // Artist albums
    const artistAlbums = await artistApi.getAlbum(req);

    // Artist detail
    const artistDetail = await artistApi.getDetail(req);

    res.render('./pages/album', {
        currentProfile,
        recentlyPlayedTracks,
        title: artistDetail.name,
        albums: artistAlbums,
        isArtistAlbum: true
    });
}


module.exports = {
    artistDetail,
    artistAlbum
}