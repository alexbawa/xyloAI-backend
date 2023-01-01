const { APP_NAME } = require("../constants");

const publishToSpotify = async (spotifyToken, playlist) => {
    let headers = {Authorization: `Bearer ${spotifyToken}`};
    let userResponse = await fetch(`https://api.spotify.com/v1/me`,{headers});
    userResponse = await userResponse.json();

    let playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userResponse.id}/playlists`, {
            headers,
            method: 'POST',
            body: JSON.stringify({
                name: playlist.name,
                description: `Playlist created via ${APP_NAME}`,
            })
        })
    playlistResponse = await playlistResponse.json();

    await fetch(`https://api.spotify.com/v1/users/${userResponse.id}/playlists/${playlistResponse.id}/tracks`, {
        headers,
        method: 'POST',
        body: JSON.stringify({uris: playlist.songs}),
    })

    return playlistResponse.id
}

module.exports = {
    publishToSpotify
}