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
const artistApi = require('../api/artist.api');
const trackApi = require('../api/track.api');
const { msToTimeCode } = require('../utils/helpers.util');


const trackDetail = async (req, res) => {

    // Current user profile
    const currentProfile = await userApi.getProfile(req);

    // Recently played tracks
    const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

    // Track detail
    const trackDetail = await trackApi.getDetail(req);

    // Track artist detail
    const artistIds = trackDetail.artists.map(({ id }) => id);
    const trackArtists = await artistApi.getSeveralDetail(req, artistIds.join(','));

    // First artist top track
    const [firstArtistId] = artistIds;
    const artistTopTracks = await artistApi.getTopTracks(req, firstArtistId);

    // Related artist
    const relatedArtist = await artistApi.getRelated(req, firstArtistId);

    // Track lyrics
    const { name, artists, external_ids: { isrc } } = trackDetail;
    const trackLyrics = await trackApi.getLyrics(name, artists[0].name, isrc);

    res.render('./pages/track_detail', {
        currentProfile,
        recentlyPlayedTracks,
        trackArtists,
        artistTopTracks,
        relatedArtist,
        trackDetail,
        trackLyrics,
        msToTimeCode
    });

}


module.exports = {
    trackDetail
}