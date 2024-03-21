/**
 * @license Apache-2.0
 * @copyright Fancy 2024
 */

'use strict';


const cookies = new Map(document.cookie.split('; ').map(item => item.split('=')));
const BASE_URL = 'https://api.spotify.com/v1';
const headers = {
    'Authorization': `Bearer ${cookies.get('access_token')}`,
    'Content-Type': 'application/json'
}


/**
 * Transfer playback to a new device and determine if it should start playing.
 * 
 * @param {string} deviceId - Current device id
 * @param {Boolean} play - if true then playback happens on new device otherwise keep the current playback state.
 */
const transferPlayback = async (deviceId, play = false) => {
    try {
        const reqBody = { device_ids: [deviceId], play }

        await fetch(`${BASE_URL}/me/player`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(reqBody)
        })
    } catch (error) {
        console.log(error);
    }
}


export {
    cookies,
    transferPlayback
}