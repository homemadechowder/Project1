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
var itemNameArr = [];
var recipeArr = [];
var cityName;
var cityId;
var lat;
var lng;
var nameDisp;
var urlDisp;
var imageDisp;
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
  // $("[flag = '1']").empty();
  //Get input for the food type
  var food = $("#food").val(); 
  //Set the Edamam queryURL
  // var queryURL = "https://api.edamam.com/api/food-database/parser?ingr="+ food + "&from = 50&category=fast-foods&app_id=f6a7e516&app_key=d2d2590ec9988c392da648e07513249d";
  var queryURL_city = "https://developers.zomato.com/api/v2.1/locations?lat="+lat+"&lon="+lng;
  var queryURL_food = "https://api.edamam.com/api/food-database/parser?ingr="+food+"&category=fast-foods&app_id=f6a7e516&app_key=d2d2590ec9988c392da648e07513249d";
  var queryURL_recipe = "https://api.edamam.com/search?q="+food+"&app_id=f6a7e516&app_key=d2d2590ec9988c392da648e07513249d";
  var queryURL_search = "https://developers.zomato.com/api/v2.1/search?lat="+lat+"&lon="+lng+"&radius=2000&sort=real_distance";
  var queryURL_nutrition = "";
 
  
  //Function calls
  getCity();
  //ajax_search();
  ajax_recipe();
  initMap();

  

database.ref().on("value", function(snapshot) {
});

function generateSlide(pic, name, link, carbs, calories, fat, protein){
 
  
  // $(".carousel-inner").append("<div class = 'carousel-item active'>").append()

  var slide = $("<div>");
  slide.addClass("carousel-item");
  slide.attr("flag", "1")
  slide.attr("carbs", carbs);
  slide.attr("calories", calories);
  slide.attr("fat", fat);
  slide.attr("protein", protein);
  
  var imgSlide = $("<img>");
  imgSlide.addClass("d-block w-100");
  imgSlide.attr("src",pic);

  slide.append(imgSlide);
  $(".carousel-inner").append(slide);

  var caption = $("<div>");
  var captionh5 = $("<h5>");
  captionh5.text(name);
  var captionP = $("<p>");
  captionP.addClass("link");
  captionP.html("<a href = "+ link +" target = "+ link +" >Link to Recipe</a>");
  caption.addClass("carousel-caption");
  caption.append(captionh5).append(captionP);

  slide.append(caption);
}

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

    $("#city").text("You are located in: " + cityName);
  
  })
}

function ajax_recipe(){
  $.ajax({
    url: queryURL_recipe,
    method: "GET"
  })
 
  //Response handler
 .then(function(response) {
    for(i = 0; i < 20; i++){
    console.log(response);
    var recipeName = response.hits[i].recipe.label;
    var recipeURL = response.hits[i].recipe.url;
    var recipeImage = response.hits[i].recipe.image;
    
    var recipeIngr = response.hits[i].recipe.ingredientLines;
    var recipeNutr = response.hits[i].recipe.totalNutrients;

    var carbs = "Carbohydrates: " + recipeNutr.CHOCDF.quantity + "g";
    console.log(carbs);
    var calories = "Calories: " + recipeNutr.ENERC_KCAL.quantity + "kcal";
    var fat = "Fat: " + recipeNutr.FAT.quantity + "g";
    var protein = "Protein: " + recipeNutr.PROCNT.quantity + "g";

    
    //Generating a button
    // var button = $('<button>');
    // button.addClass("recipeLink");
    // button.addClass("search-btn2  ")
    // button.attr("name", recipeName);
    // button.attr("link", recipeURL);
    // button.attr("image", recipeImage)

    generateSlide(recipeImage, recipeName, recipeURL, carbs, calories, fat, protein); 
    console.log(recipeIngr);
    console.log(recipeNutr);
    // button.text(nameDisp);  
    
    // $("#recipes").append(button);
    recipeArr.push(recipeName);
    database.ref().set({
      recipeArr: recipeArr      
    })
    }
    
  })
}
})
})
$(document).on("click", ".carousel-item", function(){
  console.log($(this));
  
  $(".nutCard").empty();
  var nut = $("<div>");
  nut.addClass("nutCard");
  $("#nutritionCard").append(nut);
  var nutCarb =  $((this)).attr("carbs") + "<br>";
  var nutCal = $((this)).attr("calories")+ "<br>";
  var nutFat = $((this)).attr("fat")+ "<br>";
  var nutProtein = $((this)).attr("protein")+ "<br>";
  console.log(nutCarb);

  nut.append(nutCarb).append(nutCal).append(nutFat).append(nutProtein);


 
  
})

//MAP INITIALIZING*********************************************************
function initMap(){
    //Using the information received from the broswer of your current location, set a location parameter for google maps api
    var location = new google.maps.LatLng(lat, lng);
    infowindow = new google.maps.InfoWindow();
    //Set it so it is centered on your current location
    map = new google.maps.Map(
        document.getElementById('map'), {center: location, zoom: 12.5});   
    //The request specifications for google maps search
    var request = {
      location: location,
      query: 'grocery',
      fields: ['name','geometry']     
    };
     
    //Initialize places service from Google Maps API
    var service = new google.maps.places.PlacesService(map);  
    //Function to request information using .textSearch
    
    service.textSearch(request, function(results, status) {
      console.log(results);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
          console.log(results[i]);
        }
        map.setCenter(results[0].geometry.location);
      }
    });
// }
}
  
//Create Marker
function createMarker(place) {

    new google.maps.Marker({
        position: place.geometry.location,
        map: map
    });
}



//*************************************************************************