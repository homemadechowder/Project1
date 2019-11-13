//EDAMAM Api Key = d2d2590ec9988c392da648e07513249d

//Zomato Api = https://developers.zomato.com/api/v2.1/cities?lat=1&lon=2&count=3

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
var cityName;
var cityId;
var lat;
var lng;
var x = document.getElementById("map");
var database = firebase.database();
 
//**************************************************************************

//Function to get your current location*************************************
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
  //This function will make a prompt asking the user that the browser wants to know your location
  getLocation(); 
  
//on click function for submit
$("#submit").on("click", function(){
  console.log("clicked");
  //Get input for the food type
  var food = $("#food").val(); 
  //Set the Edamam queryURL
  // var queryURL = "https://api.edamam.com/api/food-database/parser?ingr="+ food + "&from = 50&category=fast-foods&app_id=f6a7e516&app_key=d2d2590ec9988c392da648e07513249d";
  var queryURL_city = "https://developers.zomato.com/api/v2.1/locations?lat="+lat +"&lon="+lng;
  var queryURL_food = "https://api.edamam.com/api/food-database/parser?ingr="+ food + "&category=fast-foods&app_id=f6a7e516&app_key=d2d2590ec9988c392da648e07513249d";
  var queryURL_recipe = "https://api.edamam.com/search?q="+ food + "&app_id=f6a7e516&app_key=d2d2590ec9988c392da648e07513249d";
  
  //Function calls
  getCity();
  ajax();
  ajax_recipe();
  initMap();

//AJAX REQUESTS************************************************************
  
function getCity(){
  $.ajax({
    url: queryURL_city,
    method: "GET",
    beforeSend: function(xhr){xhr.setRequestHeader('user-key', "a7fa6325161097eb1463d89abfbf98f8");
    }
  })
  .then(function(response){
    console.log(queryURL_city);
    console.log(response);
    cityName = response.location_suggestions[0].city_name;
    cityId = response.location_suggestions[0].city_id;
    console.log(cityName);

    $("#city").text(cityName);
  
  })
}



function ajax(){
    
  //Ajax Request
    $.ajax({
      url: queryURL_food,
      method: "GET"
    })
   
    //Response handler
   .then(function(response) {
      restaurantArr = [];
      
      for (i = 1; i < 20; i++){
      var restaurantName = response.hints[i].food.brand;
      var itemName = response.hints[i].food.label;
      
      //Add the new restaurant onto the restaurant array used later in google maps api to output restaurant markers onto the map interface
      restaurantArr.push(restaurantName);
      console.log("Restaurant" +i + ": " + restaurantName);
      console.log("Name of Dish " + i + ": " + itemName);
       
     
      }

      })
}

function ajax_getDetail(){

}

function ajax_recipe(){
  $.ajax({
    url: queryURL_recipe,
    method: "GET"
  })
 
  //Response handler
 .then(function(response) {
    
     
     console.log(response)
     
  })
}
  
});
//****************************************************************************


})


//MAP INITIALIZING*********************************************************
function initMap(){
    //Using the information received from the broswer of your current location, set a location parameter for google maps api
    var location = new google.maps.LatLng(lat, lng);
    
    infowindow = new google.maps.InfoWindow();
  
    //Set it so it is centered on your current location
    map = new google.maps.Map(
        document.getElementById('map'), {center: location, zoom: 10});
  
    
   
  //Loop through all the items on the restaurantArr to put markers
  for (i = 0; i < restaurantArr.length; i++){
    console.log(restaurantArr.length);
      
      //The request specifications for google maps search
      var request = {
      query: restaurantArr[i],
      fields: ['name','geometry'],
      
    }; 
    console.log(restaurantArr[i]);
    
     
    //Initialize places service from Google Maps API
    var service = new google.maps.places.PlacesService(map);
  
    //Function to request information using .findPlaceFromQuery
    service.findPlaceFromQuery(request, function(results, status) {
      console.log(results);
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