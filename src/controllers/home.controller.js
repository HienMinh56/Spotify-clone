/**
 * @license Apache-2.0
 * @copyright Fancy 2024
 */

'use strict';


/**
 * Custom modules
 */
const apiConfig = require('../config/api.config');
const userApi = require('../api/user.api');
const playerApi = require('../api/player.api');
const trackApi = require('../api/track.api');
const artistApi = require('../api/artist.api');
const albumApi = require('../api/album.api');
const playlistApi = require('../api/playlist.api');


const home = async (req, res) => {

    // Current user profile
    const currentProfile = await userApi.getProfile(req);

    // Recently played tracks
    const recentlyPlayed = await playerApi.getRecentPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track)

    // Recommended albums
    const trackIds = recentlyPlayedTracks.map(({ id }) => id);
    const trackSeed = trackIds.slice(0, 5).join(',');
    const recommendedAlbums = await trackApi.getRecommendedTrack(req, trackSeed, apiConfig.LOW_LIMIT);

    // Recommended artists
    const artistIdEntries = recommendedAlbums.map(track => track.artists.map(artist => artist.id));
    const uniqueArtistIds = [...new Set(artistIdEntries.flat(1))].join(',');
    const recommendedArtists = await artistApi.getSeveralDetail(req, uniqueArtistIds);
    
    // New release albums
    const newRelease = await albumApi.getNewRelease(req, apiConfig.LOW_LIMIT);

    // Featured playlists
    const featuredPlaylist = await playlistApi.getFeatured(req, apiConfig.LOW_LIMIT);

    // Top playlists
    const topPlaylist = await playlistApi.getCategoryPlaylist(req, apiConfig.LOW_LIMIT);

    res.render('./pages/home', {
        currentProfile,
        // recentlyPlayedTracks,
        recommendedAlbums,
        recommendedArtists,
        newRelease,
        featuredPlaylist,
        topPlaylist
    });
}


module.exports = { home }