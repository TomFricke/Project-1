// var config = {
   // apiKey: "AIzaSyDgZnzLX0LLIVRKIPRnQZGxASVr-0g5-A4",
 //   authDomain: "kuproject1-2bd9a.firebaseapp.com",
 //   databaseURL: "https://kuproject1-2bd9a.firebaseio.com",
 //   projectId: "kuproject1-2bd9a",
 //   storageBucket: "kuproject1-2bd9a.appspot.com",
 //   messagingSenderId: "641399126415"
//  };

 // firebase.initializeApp(config);

//  var db = firebase.database();
  


 $("#submitbtn").click(function(e) {
    e.preventDefault();
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
    var artistImage = response.similarartists.artist[x].url;
    
    console.log(artistName);
    $("#test").append(artistName)
    }

    
});

 });