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
const searchApi = require('../api/search.api');
const { msToTimeCode } = require('../utils/helpers.util');


const searchRequest = (req, res) => {
    res.redirect(`/search/all/${req.body.query}`);
}


const searchAll = async (req, res) => {

    // Current user profile
    const currentProfile = await userApi.getProfile(req);

    // Recently played tracks
    const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

    // Search result
    const searchAll = await searchApi.getAll(req);

    res.render('./pages/search', {
        currentProfile,
        recentlyPlayedTracks,
        searchAll,
        query: req.params.query,
        type: 'all',
        msToTimeCode
    });
}


const searchAlbum = async (req, res) => {

    // Current user profile
    const currentProfile = await userApi.getProfile(req);

    // Recently played tracks
    const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

    // Search album
    const searchAlbum = await searchApi.getAlbum(req);

    res.render('./pages/search_album', {
        currentProfile,
        recentlyPlayedTracks,
        searchAlbum,
        query: req.params.query,
        type: 'albums'
    });
}


const searchArtist = async (req, res) => {

    // Current user profile
    const currentProfile = await userApi.getProfile(req);

    // Recently played tracks
    const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

    // Search artist
    const searchArtist = await searchApi.getArtist(req);

    res.render('./pages/search_artist', {
        currentProfile,
        recentlyPlayedTracks,
        searchArtist,
        query: req.params.query,
        type: 'artists'
    });
}


const searchPlaylist = async (req, res) => {

    // Current user profile
    const currentProfile = await userApi.getProfile(req);

    // Recently played tracks
    const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

    // Search playlist
    const searchPlaylist = await searchApi.getPlaylist(req);

    res.render('./pages/search_playlist', {
        currentProfile,
        recentlyPlayedTracks,
        searchPlaylist,
        query: req.params.query,
        type: 'playlists'
    });
}


const searchTrack = async (req, res) => {

    // Current user profile
    const currentProfile = await userApi.getProfile(req);

    // Recently played tracks
    const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

    // Search playlist
    const searchTrack = await searchApi.getTrack(req, 50);

    res.render('./pages/search_track', {
        currentProfile,
        recentlyPlayedTracks,
        searchTrack,
        query: req.params.query,
        type: 'tracks',
        msToTimeCode
    });
}


module.exports = {
    searchRequest,
    searchAll,
    searchAlbum,
    searchArtist,
    searchPlaylist,
    searchTrack
}