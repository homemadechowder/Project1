//EDAMAM Api Key = d2d2590ec9988c392da648e07513249d

//INITIAL VARIABLES*********************************************************
var restaurantArr = [];
var lat;
var lng;
var x = document.getElementById("map");

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
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;

    lat = position.coords.latitude;
    lng = position.coords.longitude;
  }
//*************************************************************************



//DOCU READY FUNCTION******************************************************
$(document).ready(function(){

$("#submit").on("click", function(){
    
    console.log("clicked");
    var food = $("#food").val();
    var queryURL = "https://api.edamam.com/api/food-database/parser?ingr="+ food + "&category=fast-foods&app_id=f6a7e516&app_key=d2d2590ec9988c392da648e07513249d";

$.ajax({
    url: queryURL,
    method: "GET"
  })
  //Response handler
 .then(function(response) {
    
    for (i = 1; i < 20; i++){
    var restaurantName = response.hints[i].food.brand;
    var itemName = response.hints[i].food.label;
    
    restaurantArr.push(restaurantName);
    // console.log("Restaurant" +i + ": " + restaurantName);
    // console.log("Name of Dish " + i + ": " + itemName);
     
    }
    console.log(response);
    console.log(restaurantArr);
 

});

// $("#mapObj").attr("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyBI7n0cKjaMhAdWPnXVmN8GpuFU5xiDahg&callback=initMap&libraries=places");
    
initMap();

});

})
//*************************************************************************

//MAP INITIALIZING*********************************************************
function initMap(){
    var location = new google.maps.LatLng(30, 65);

    infowindow = new google.maps.InfoWindow();
  
    map = new google.maps.Map(
        document.getElementById('map'), {center: location, zoom: 15});
  

    var request = {
      query: restaurantArr[2],
      fields: ['name', 'geometry'],
    };
    console.log(restaurantArr[2]);
     
  
    var service = new google.maps.places.PlacesService(map);
  
    service.findPlaceFromQuery(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
        map.setCenter(results[0].geometry.location);
      }
    });
}

function createMarker(place) {

    new google.maps.Marker({
        position: place.geometry.location,
        map: map
    });
}
//*************************************************************************