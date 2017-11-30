var requestType = process.argv[2];
var requestValue = process.argv[3];;

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: '65db216b87ed48e18b96c6f480d009de',
    secret: '53d82f11f41749cfa2ba627784b37ed8'
});

spotify.search({ type: 'track', query: 'All the Small Things', limit: 2 }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    console.log(data.tracks.items[0]);
});

// // Set necessary parts of the credentials on the constructor
// var spotifyApi = new SpotifyWebApi({
//     clientId: '65db216b87ed48e18b96c6f480d009de',
//     clientSecret: '53d82f11f41749cfa2ba627784b37ed8'
// });
// // Get an access token and 'save' it using a setter
// spotifyApi.clientCredentialsGrant()
//     .then(function(data) {
//         console.log('The access token is ' + data.body['access_token']);
//         spotifyApi.setAccessToken(data.body['access_token']);
//     }, function(err) {
//         console.log('Something went wrong!', err);
//     });



// // Get tracks in a playlist
// spotifyApi.getPlaylistTracks('thelinmichael', '3ktAYNcRHpazJ9qecm3ptn', { 'offset': 1, 'limit': 5, 'fields': 'items' })
//     .then(function(data) {
//         var response = JSOnstringify(data.body, null, 2);
//         console.log('The playlist contains these tracks', data.body);
//     }, function(err) {
//         console.log('Something went wrong!', err);
//     });



/*
Spotify.findTrack('Come Together')
    // returns promise containing Spotify API response  
    // to a GET request to the following URL: 
    // 'https://api.spotify.com/v1/search?q=Come%20Together&type=track&limit=1&offset=0'
    .then(function(successCallback, error) {
        if (error) {
            console.log(error);
        }
        else {
            console.log(successCallback);
        }
    });
*/
