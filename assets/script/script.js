//EDAMAM Api Key = d2d2590ec9988c392da648e07513249d

//Firebase******************************************************************
 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyD_GnbDlRayXW3EIdKECBhVBrQSNEh_rhg",
  authDomain: "hello-world-2-e6b58.firebaseapp.com",
  databaseURL: "https://hello-world-2-e6b58.firebaseio.com",
  projectId: "hello-world-2-e6b58",
  storageBucket: "hello-world-2-e6b58.appspot.com",
  messagingSenderId: "799724841835",
  appId: "1:799724841835:web:369fe3759d34cfcf6c3a2e",
  measurementId: "G-B7Z3JWP6TR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



//INITIAL VARIABLES*********************************************************
var restaurantArr = [];
var lat;
var lng;
var x = document.getElementById("map");
var database = firebase.database();

//**************************************************************************

//GET LOCATION**************************************************************
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
   
  }

  
  function showPosition(position) {
    // x.innerHTML = "Latitude: " + position.coords.latitude + 
    // "<br>Longitude: " + position.coords.longitude;

    lat = position.coords.latitude;
    lng = position.coords.longitude;
    console.log(lat+""+lng);

    
  }
//*************************************************************************

//DOCU READY FUNCTION******************************************************
$(document).ready(function(){
  getLocation();

$("#submit").on("click", function(){
   
    
    console.log("clicked");
    var food = $("#food").val();
    var queryURL = "https://api.edamam.com/api/food-database/parser?ingr="+ food + "&category=fast-foods&app_id=f6a7e516&app_key=d2d2590ec9988c392da648e07513249d";

    
function ajax(){

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    //Response handler
   .then(function(response) {
      restaurantArr = [];
      for (i = 1; i < 20; i++){
      var restaurantName = response.hints[i].food.brand;
      var itemName = response.hints[i].food.label;
      
      restaurantArr.push(restaurantName);
      // console.log("Restaurant" +i + ": " + restaurantName);
      // console.log("Name of Dish " + i + ": " + itemName);
       
      }
      console.log(response);
      
   });

}
  ajax();
  initMap();
  
});



// $("#mapObj").attr("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyBI7n0cKjaMhAdWPnXVmN8GpuFU5xiDahg&callback=initMap&libraries=places");
    


})




//*************************************************************************

//MAP INITIALIZING*********************************************************
function initMap(){
    var location = new google.maps.LatLng(lat, lng);
    
    infowindow = new google.maps.InfoWindow();
  
    map = new google.maps.Map(
        document.getElementById('map'), {center: location, zoom: 15});
  
    
   
  for (i = 0; i < restaurantArr.length; i++){
        var request = {
      query: restaurantArr[i],
      fields: ['name', 'geometry'],
      
    }; 
    console.log(restaurantArr[i]);
    
     
  
    var service = new google.maps.places.PlacesService(map);
  
    service.findPlaceFromQuery(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
          console.log(results[i]);
        }
        map.setCenter(results[0].geometry.location);
      }
    });
}
}
  
//Create Marker
function createMarker(place) {

    new google.maps.Marker({
        position: place.geometry.location,
        map: map
    });
}



//*************************************************************************