require("dotenv").config();
var keys = require("./keys.js");

var axios = require("axios");

var Spotify = require("node-spotify-api");

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

var search = process.argv[2];

if (search === "concert-this") {
    getBand();
}

if (search === "movie-this") {
    getMovie();
}

if (search === "spotify-this-song") {
    getSong();
}

// Bands in town
function getBand() {

    var artistName = process.argv.slice(3).join(" ");

    var queryUrl = `https://rest.bandsintown.com/artists/${artistName}/events?app_id=codingbootcamp&date=upcoming`;

    // console.log(queryUrl);

    axios.get(queryUrl).then(function (response, error) {
        data = response.data[0];
        if (!error) {

            // console.log(data)
            console.log(`----------------------------------------------------------`);
            console.log(`Name of the venue: ${data.venue.name}`);
            console.log(``);
            console.log(`City: ${data.venue.city}`);
            console.log(``);
            console.log(`Location: Latitude:${data.venue.latitude}, Longitude:${data.venue.longitude}`);
            console.log(``);
            console.log(`Date of the Event: ${data.datetime} `);
            console.log(`----------------------------------------------------------`);
        } else {
            console.log("An error occurred");
        };
    });
};


// OMDB

function getMovie() {

    var movieName = process.argv.slice(3).join(" + ");

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&apikey=trilogy";

    axios.get(queryUrl).then(function (response, error) {

        if (!error) {
            var data = response.data;
            console.log(`----------------------------------------------------------`);
            console.log(`The movie you requested is: ${data.Title}`);
            console.log(``);
            console.log(`${data.Title} was released in: ${data.Year}`);
            console.log(``);
            console.log(`IMDb rating for this movie is: ${data.imdbRating}`);
            console.log(``);
            console.log(`The movie was produced in: ${data.Country}`);
            console.log(``);
            console.log(`${data.Title} was primarily produced in ${data.Language}`);
            console.log(``);
            console.log(`The plot of the movie is as following: ${data.Plot}`);
            console.log(``);
            console.log(`Here are the actors: ${data.Actors}`);
            console.log(`----------------------------------------------------------`);

            if (movieName === "") {
                movieName = "Mr. Nobody";
                console.log("-----------------------");
                console.log("Hmmm. Seems like you didn't type a movie. In that case, if you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                console.log("It's on Netflix!");
            }

        } else {
            console.log("An error occurred.");
        }
    })
}

function getSong() {

    var nameSong = process.argv.slice(3).join(" + ")

    spotify
        .search({ type: 'track', query: nameSong })
        .then(function (response) {
            var artistName = response.tracks.items[0].album.artists[0].name;
            var songName = response.tracks.items[0].name;
            var songPreview = response.tracks.items[0].external_urls.spotify;
            var albumName = response.tracks.items[0].album.name
            console.log(`----------------------------------------------------------`);
            console.log(`Artist Name: ${artistName}`);
            console.log(`Song Name: ${songName}`);
            console.log(`Song Preview:${songPreview}`);
            console.log(`Album Name:${albumName}`);
            console.log(`----------------------------------------------------------`);
        })
        .catch(function (err) {
            console.log(err);
        });
}

// make global var for process.argv[3];