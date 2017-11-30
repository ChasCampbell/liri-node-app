var keys = require('./keys');
var requestType = process.argv[2];
var requestValue = process.argv[3];

if (requestType === "my-tweets") {
    var Twitter = require('twitter');
    var client = new Twitter({
        "consumer_key": keys.consumer_key,
        "consumer_secret": keys.consumer_secret,
        "access_token_key": keys.access_token_key,
        "access_token_secret": keys.access_token_secret,
        "bearer_token": keys.bearer_token
    });
    console.log(keys.consumer_key);
    console.log(keys.consumer_secret);
    console.log(keys.access_token_key);
    console.log(keys.access_token_secret);
    //  GET "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=ChasofCharlotte&trim_user&exclude_replies&count=20";
    var params = {
        screen_name: 'DeveloperChas',
        count: 20
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log("logging tweets now");
            console.log(tweets);
            var saveTweets = tweets;
        }
        else {
            console.log(error);
        }
    }); // End of client.get
} //End of if my-tweets
