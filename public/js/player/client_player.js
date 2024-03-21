/**
 * @license Apache-2.0
 * @copyright Fancy 2024
 */

'use strict';


/**
 * Custom modules
 */
import { cookies, transferPlayback } from "./client_player.api.js";


const /** {Array<HTMLElement>} */ $players = document.querySelectorAll('[data-player]');


const updatePlayerInfo = (playerState, $player) => {

    const /** {HTMLElement} */ $trackBanner = $player.querySelector('[data-track-banner]');
    const /** {HTMLElement} */ $trackName = $player.querySelector('[data-track-name]');
    const /** {HTMLElement} */ $trackArtist = $player.querySelector('[data-track-artist]');

    // destructure current playerState
    const {
        track_window: {
            current_track: {
                album: { images: trackImages },
                artists: trackArtists,
                name: trackName
            }
        }
    } = playerState;

    const {
        url = '/images/track-banner.png',
        width,
        height
    } = trackImages.find(item => item.width > 200 && item.width < 400);

    const /** {string} */ artistNames = trackArtists.map(({ name }) => name).join(', ');

    /**
     * Update player image, track name, artist name
     * and remove hide and disabled class
     */
    $trackBanner.src = url;
    $trackBanner.width = width;
    $trackBanner.height = height;

    $trackBanner.alt = trackName;
    $trackName.textContent = trackName;
    $trackArtist.textContent = artistNames;
    $player.classList.remove('hide');
    $player.classList.remove('disabled');

}


/**
 * When any changes occur in player this function will be execute
 * e.g. change track/volume/play/pause/seek/next/previous
 * 
 * @param {object} playerState - Currently playing track object
 */
const playerStateChange = (playerState) => {
    const { track_window } = playerState;

    // Update player ui
    $players.forEach(player => updatePlayerInfo(playerState, player));
    
}


window.onSpotifyWebPlaybackSDKReady = () => {

    const /** {number} */ volume = localStorage.getItem('volume') ?? 100;

    /**
     * Create Spotify player instance
     */
    const player = new Spotify.Player({
        name: 'Musify Web Player',
        getOAuthToken: (callback) => { callback(cookies.get('access_token')); },
        volume: volume / 100
    });


    // Player is ready
    player.addListener('ready', async ({ device_id }) => {
        
        // Store device_id in localStorage
        localStorage.setItem('device_id', device_id);


        // Transfer playback to current device
        await transferPlayback(device_id);

    });


    // Call event when any changes occur in player
    player.addListener('player_state_changed', playerStateChange);


    // Connect player
    player.connect();

}