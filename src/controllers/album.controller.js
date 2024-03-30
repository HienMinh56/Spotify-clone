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
const albumApi = require('../api/album.api');
const artistApi = require('../api/artist.api');
const apiConfig = require('../config/api.config');
const { msToTimeCode } = require('../utils/helpers.util');


const album = async (req, res) => {

    // Current user profile
    const currentProfile = await userApi.getProfile(req);

    // Recently played tracks
    const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

    // New release albums
    const newRelease = await albumApi.getNewRelease(req);

    res.render('./pages/album', {
        title: 'New Releases',
        currentProfile,
        recentlyPlayedTracks,
        albums: newRelease
    });    
}


const albumDetail = async (req, res) => {

    // Current user profile
    const currentProfile = await userApi.getProfile(req);

    // Recently played tracks
    const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

    // Album detail
    const albumDetail = await albumApi.getDetail(req);

    // More by artist
    const [firstArtist] = albumDetail.artists;
    const moreByArtist = await artistApi.getAlbum(req, apiConfig.LOW_LIMIT, firstArtist.id);

    res.render('./pages/album_detail', {
        currentProfile,
        recentlyPlayedTracks,
        albumDetail,
        moreByArtist: { firstArtist, ...moreByArtist },
        msToTimeCode
    });
}


module.exports = {
    album,
    albumDetail
}