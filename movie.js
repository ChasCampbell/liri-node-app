var movieRun = function() {

    var requestType = process.argv[2];
    if (requestType === "movie-this") {
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
    }
} // End of top line function definition
