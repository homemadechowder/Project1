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
var ingrArr = []; //Array to store snapshotted ingredients
var recipeIngr = []; //Array to store ingredients from API
var cityName; //Auxiliary function that gets cityname
var queryURL_city; //queryURL for finding city
var queryURL_recipe  //queryURL for recipe API
var lat; //variable to store latitude
var lng; //variable to store longitude
var x = document.getElementById("map"); //map variable
var database = firebase.database(); //firebase database initializing
 
//**************************************************************************

database.ref().on("value", function(snapshot) {

  //Save the of the item searched from firebase
  if (snapshot.val().recipe){
  ingrArr = snapshot.val().recipe;
}
});

//Function that appends the data from firebase onto the ingredient box******
function Ingrd(i){
  var newDiv = $("<div>");
  newDiv.addClass("ingDiv");
  
  ingrd = ingrArr.hits[i].recipe.ingredientLines;
  console.log("ingrArr.hits[i] ..... exists");

  for (i = 0; i < ingrd.length; i++){
    
    newDiv.append("- " + ingrd[i] + "<br>");
    $("#ingredCard").append(newDiv);
    
  }
}
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
    console.log(lat+""+lng + "Location Get....ok");

    
  }
//*************************************************************************

//DOCU READY FUNCTION******************************************************
$(document).ready(function(){

  //This function will make a prompt asking the user that the browser wants to know your location
  getLocation(); 
  
//on click function for submit
$("#submit").on("click", function(){
  
  //Remove existing slides
  $("[flag = '1']").remove();
  //Set the first slide to active so the carousel doesn't disappear
  $("#first").addClass("active");
  //Get input for the food type 
  var food = $("#food").val(); 
  //Set the Edamam queryURL
  // var queryURL = "https://api.edamam.com/api/food-database/parser?ingr="+ food + "&from = 50&category=fast-foods&app_id=f6a7e516&app_key=d2d2590ec9988c392da648e07513249d";
  queryURL_city = "https://developers.zomato.com/api/v2.1/locations?lat="+lat+"&lon="+lng;
  queryURL_recipe = "https://api.edamam.com/search?q="+food+"&app_id=b7d7023b&app_key=3d224105a03de287bc949a76844bdba9";
  console.log("queryURL-" + queryURL_recipe);
 
  //Function calls
  getCity();
  ajax_recipe();
  initMap();
});

//Function that generates the slides of the carousel
function generateSlide(i, pic, name, link, carbs, calories, fat, protein){
  
  
  //slide item - add Class and attributes
  var slide = $("<div>");
  slide.addClass("carousel-item");
  slide.attr("flag", "1");
  slide.attr("num", i);
  slide.attr("carbs", carbs);
  slide.attr("calories", calories);
  slide.attr("fat", fat);
  slide.attr("protein", protein);
  
  //image item - add Class and attributes
  var imgSlide = $("<img>");
  imgSlide.addClass("d-block w-100");
  imgSlide.attr("src",pic);
  
  //append image item to slide item
  slide.append(imgSlide);
  //append slide item to carousel
  $(".carousel-inner").append(slide);

  //adding caption to slide item
  var caption = $("<div>");
  var captionh5 = $("<h5>");
  captionh5.text(name);
  var captionP = $("<p>");
  captionP.addClass("link");
  captionP.html("<a href = "+ link +" target = "+ link +" >Link to Recipe</a>");
  caption.addClass("carousel-caption");
  caption.append(captionh5).append(captionP);

  slide.append(caption);
  console.log("slide generated....ok");  
}

//AJAX REQUESTS************************************************************

//A cool function to get city/coords
function getCity(){
  $.ajax({
    url: queryURL_city,
    method: "GET",
    beforeSend: function(xhr){xhr.setRequestHeader('user-key', "a7fa6325161097eb1463d89abfbf98f8");
    }
  })
  .then(function(response){
   
    cityName = response.location_suggestions[0].city_name;
    cityId = response.location_suggestions[0].city_id;
  
    $("#city").text("You are located in: " + cityName);
  
  })
}

//Main Ajax function call to get recipe information
function ajax_recipe(){
  $.ajax({
    url: queryURL_recipe,
    method: "GET"
  })
   //Response handler
 .then(function(response) { 
    console.log("ajax_recipe is called");
    for(i = 0; i < 20; i++){
    console.log("response get...ok");
    console.log(response); 
    //Store response into variables for easier access
    var recipeName = response.hits[i].recipe.label;
    var recipeURL = response.hits[i].recipe.url;
    var recipeImage = response.hits[i].recipe.image;
    
    recipeIngr = response.hits[i].recipe.ingredientLines;
    var recipeNutr = response.hits[i].recipe.totalNutrients;
    var carbs;
    
    console.log(recipeName);
    console.log(recipeURL);
    console.log(recipeImage);
    
    //Check if carbs exist or not;
    if (typeof recipeNutr.CHOCDF == "undefined"){
       console.log("No carbs.. get OK");
       carbs = "No Carbs";
    console.log(carbs);
     }
    else{
      
       carbs = "Carbohydrates: " + Math.round(recipeNutr.CHOCDF.quantity * 100) / 100  + "g";
    }
    //Store other nutrients into variables
    var calories = "Calories: " + Math.round(recipeNutr.ENERC_KCAL.quantity * 100) / 100 + "kcal";
    var fat = "Fat: " + Math.round(recipeNutr.FAT.quantity * 100) / 100 + "g";
    var protein = "Protein: " + Math.round(recipeNutr.PROCNT.quantity * 100)/100 + "g";

    console.log(recipeIngr);
    console.log(recipeNutr);
     
    //Call to generate slide
    generateSlide(i, recipeImage, recipeName, recipeURL, carbs, calories, fat, protein); 
    }
    //Save response into firebase
    database.ref().set({
      recipe:response  
      })  
  
  })
}


})

//Onclick function for slide item
$(document).on("click", ".carousel-item", function(){
  console.log($(this));
  
  //empty out divs so it doesn't carryover
  $(".ingDiv").empty();
  $(".nutCard").empty();
  
  //create a new div to append items
  var nut = $("<div>");
  nut.addClass("nutCard");
  $("#nutritionCard").append(nut);
  var nutCarb =  $((this)).attr("carbs") + "<br>";
  var nutCal = $((this)).attr("calories")+ "<br>";
  var nutFat = $((this)).attr("fat")+ "<br>";
  var nutProtein = $((this)).attr("protein")+ "<br>";
  
  console.log(nutCarb);

  //Append-galore
  nut.append(nutCarb).append(nutCal).append(nutFat).append(nutProtein);

  //number identifier to determine which recipe info it will be using
  var num = parseInt($((this)).attr("num"));
  
  //call ingredient function to post ingredient on another card
  Ingrd(num);
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
          //console.log(results[i]);
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