var requestType = process.argv[2];
var requestValue = process.argv[3];
var fs = require("fs");
if (requestType === "movie-this") { movieRun() }
else {
    if (requestType === "spotify-this-song") { spotRun() }
    else {
        if (requestType === "my-tweets") { tweetRun() }
        else {
            if (requestType === "do-what-it-says") { whatRun() }
        }
    }
} // End of else, else, else

function spotRun() {

    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: '65db216b87ed48e18b96c6f480d009de',
        secret: '53d82f11f41749cfa2ba627784b37ed8'
    });
    if (!requestValue) { requestValue = "The Sign" }

    spotify.search({ type: 'track', query: requestValue, limit: 1, }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("The artist's name(s): " + data.tracks.items[0].artists[0].name);
        console.log("The song's name: " + data.tracks.items[0].name);
        console.log("A preview url: " + data.tracks.items[0].preview_url);
        console.log("The name of the album: " + data.tracks.items[0].album.name);
    }); // End of spotify.search
} // End of spotRun

function tweetRun() {

    var keys = require('./keys');

    var Twitter = require('twitter');
    var client = new Twitter({
        "consumer_key": keys.consumer_key,
        "consumer_secret": keys.consumer_secret,
        "access_token_key": keys.access_token_key,
        "access_token_secret": keys.access_token_secret,
        "bearer_token": keys.bearer_token
    });

    //  GET "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=ChasofCharlotte&trim_user&exclude_replies&count=20";
    var params = {
        screen_name: 'DeveloperChas',
        count: 20
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log("logging tweets now");
            var tweetsOut = JSON.stringify(tweets, null, 2);
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
            } // End of for
        } // End of if
        else {
            console.log(error);
        } // End of else
    }); // End of client.get
} // End of function tweet


function whatRun() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) { return console.log(err); }
        else {
            var demand = data;
            var splitDemand = demand.split(",");
            console.log(splitDemand);
            requestValue = splitDemand[1];
            if (splitDemand[0] === "spotify-this-song") { spotRun(); }
            else {
                if (splitDemand[0] === "movie-this") { movieRun(); }
                else {
                    if (splitDemand[0] === "my-tweets") { tweetRun(); }
                } // End of else
            } // End of else
        } // End of else
    }); // End of fs readFile
} // End of whatRun definition

function movieRun() {
    var l = process.argv.length;
    // Check for a movie name bing entered
    if (!process.argv[3]) {
        var movie = "Mr%20Nobody";
        console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt04859471");
        console.log("It's on Netflix!");
    }
    else {
        if (l <= 4) {
            movie = process.argv[3];
        }
        else {
            movie = process.argv[3];
            for (var i = 4; i < (l); i++) {
                movie = movie + "%20" + process.argv[i];
            }
        } // End of if = else 
        var request = require('request');
        var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&apikey=e6c32cb8";
        request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("The movie's title is: " + JSON.parse(body).Title);
                console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
                console.log("The movie's release year was: " + JSON.parse(body).Released);
                console.log("The movie's actors are: " + JSON.parse(body).Actors);
                console.log("The movie's Rotten Tomatoes score is: " + JSON.parse(body).Tomatoes);
                console.log("The movie's language is: " + JSON.parse(body).Language);
                console.log("The movie's plot is: " + JSON.parse(body).Plot);
            } // End of if - error
        }); // End of request
    } // End of if - else at Mr Nobody
} // End of function MovieRun
