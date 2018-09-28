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


function extraLargeImage(element) {
    return element.size === 'extralarge';
}

var artistResult = ["", "", ""];
var artistResultImage = ["", "", ""];
var artistResultLastFM = ["", "", ""];
var searchRdy = false;

 $("#submitbtn").click(function(e) {
    e.preventDefault();

    lastFMPull();

    for(x=0; x < 3; x++) {
            createCard(artistResultImage[x], artistResult[x], artistResultLastFM[x]);
            }

function createCard(aIMG, aName, aLFM) {
    $("#displayResults").append(
        '<div class="card">'  +
        '<img class="card-img-top" src="' + aIMG +
        '">' + '<div class="card-body">' +
        '<h5 class="card-title">' + aName +'</h5>' +
        '<a href="' + aLFM + '" class="card-link">' + aName +
        ' on Last.fm' + '</a>' +
        '</div>'
    );

}

function lastFMPull() {

console.log(artistResult[0], artistResult[1],artistResult[2])
    var api = "5ab1615116e0cf8fa1c5270f3ab5310b";
    var artist = $("#searchForm").val();
    var artistSearch = artist.split(' ').join('+');
    var lastFMURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artistSearch + "&api_key=" + api + "&format=json";

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
    });

    return true;
}

    });

});
