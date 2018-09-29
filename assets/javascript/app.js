$(document).ready(function() {


var config = {
   apiKey: "AIzaSyDgZnzLX0LLIVRKIPRnQZGxASVr-0g5-A4",
   authDomain: "kuproject1-2bd9a.firebaseapp.com",
   databaseURL: "https://kuproject1-2bd9a.firebaseio.com",
   projectId: "kuproject1-2bd9a",
   storageBucket: "kuproject1-2bd9a.appspot.com",
   messagingSenderId: "641399126415"
  };

 firebase.initializeApp(config);
 
 var db = firebase.database();

 db.ref().startAt().limitToLast(5).on("child_added", function(snapshot) {
    var recentSearch = snapshot.val().search;
    var recentURL = snapshot.val().url;
    $('#recentSearches').append('<a href="' + recentURL + '">' + recentSearch + "</a><br>");

 });

function extraLargeImage(element) {
    return element.size === 'extralarge';
}

var artistResult = ["", "", ""];
var artistResultImage = ["", "", ""];
var artistResultLastFM = ["", "", ""];
var artistTopDiscogs = ["", "", ""];
var artistTopDiscogThumb = ["", "", ""];


 $("#submitbtn").click(function(e) {
    e.preventDefault();
    $("#displayResults").val("");
    var artist = $("#searchForm").val();
    var artistSearch = artist.split(' ').join('+');
    var currentURL = "https://last.fm/music/" + artistSearch

    lastFMPull(artistSearch);

    db.ref().push({
        search: artist,
        url: currentURL
    });  

});

function createCard(aIMG, aName, aLFM, aTD, aTDT) {
    $("#displayResults").append(
        '<div class="card">'  +
        '<img class="card-img-top" src="' + aIMG +
        '">' + '<div class="card-body">' +
        '<h5 class="card-title">' + aName +'</h5>' +
        '<a href="' + aLFM + '" class="card-link">' + aName +
        ' on Last.fm' + '</a>' + '<br>' +
        "Top Releases on Discogs:" + '<br>' + '<div class="card-text">' +
        '<img class="card-text" src="' + aTDT + '">' + '<br>' + " " + aTD +
        '</div>' +
        '</div>'
    );

}

function lastFMPull(artistSearch) {

    var lastApi = "5ab1615116e0cf8fa1c5270f3ab5310b";
    var lastFMURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artistSearch + "&api_key=" + lastApi + "&format=json";

  $.ajax({
    url: lastFMURL,
    method: "GET"
}).done(function(response) {

    for(x = 0; x < 3; x++) {
    var artistName = response.similarartists.artist[x].name;
    var artistLastFM = response.similarartists.artist[x].url;
    var artistImage = response.similarartists.artist[x].image.find(extraLargeImage);

    artistImage = artistImage ? artistImage['#text'] : '';
    
    artistResult[x] = artistName;
    artistResultImage[x] = artistImage;
    artistResultLastFM[x] = artistLastFM;
        }
    }).then(function() {
        for(x=0; x < 3; x++) {
        discogsPull(artistResult[x], artistResultImage[x], artistResultLastFM[x], x);
        }
    });
}

function discogsPull(aResult, aResultImg, aResultLFM, y) {
    var discToken = "wbbxBuWRXkskhtSOFJfYlguczHGzXROzjdXySTcI";

        aResultString = aResult.split(' ').join('+');
        var discURL = "https://api.discogs.com/database/search?q=" + aResultString + "?artist&token=" + discToken

        $.ajax({
            url: discURL,
            method: "GET"
        }).done(function(response) {
            for(x=0; x <3; x++) {
            artistTopDiscogs[x] = response.results[0].title;
            artistTopDiscogThumb[x] = response.results[0].thumb;
            }

        }).then(function() {
            createCard(aResultImg, aResult, aResultLFM, artistTopDiscogs[y], artistTopDiscogThumb[y]);
        });
    }
 
});

