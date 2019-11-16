# FoodApp v1.1 

## Project Goal
Create a food recipe APP with ability to connect with 2 major food research APIs, run query and generate report base on user input.

## Link to deployed site
[FoodApp v1.1](https://homemadechowder.github.io/Project1/)

## Demo GIF

![Demo](/images/FoodApp_Demo.gif)

## Technology Used

1. HTML5
    - HTML Layout
2. CSS
3. Bootstrap
    - Using Bootstrap Carousel
4. jQuery
    - Event handling
    - Dynamically generating elements for functions to call and read from
    - Attaching attribute and classes to modify
    - Append and remove generated elements for multiple use without refresh
    - 
5. AJAX API Calls
    - Acquire response from desired query url's to parse data
6. Firebase
    - Use firebase to store response from ajax calls for funcitons to snapshot
7. Git Repository
    - Project planning and coordinating
    - Different branch for different sections
    - Merging back to master branch


## APIs utilized

1. EDAMAM food recipe API
    - Includes recipes related to the query item, nutrition, ingredients, and more.

2. Google maps API
    - Outputting grocery stores nearby based on user location coordinates obtained from browser.

3. Zomato City API
    - Outputting the city the user is in based on user location coordinates obtained from browser.

### Firebase set and snapshot example code

Below is the code for obtaining data from firebase to write to the ingredient card on index.html:
```javascript
database.ref().on("value", function(snapshot) {
  if (snapshot.val().recipe){
  ingrArr = snapshot.val().recipe;
}
});
function Ingrd(i){
  //Create new div
  //add a new class for identification
  //save ingredient information from data retrieved from firebase
  //In a for loop, append the ingredient information onto the ingredient card
}
```
Below is the code for storing the response from ajax onto firebase so the function above can snapshot it if it exists:
```javascript
database.ref().set({
    recipe:response  
    })  
```

### Main jQuery AJAX call: EDAMAM Food Recipe Database
The code shown below is the main javascript for getting a response from EDAMAM using an ajax call. All of the information relating to the food searched (query item) is stored into variables for simpler access as well as pushing the entire response onto firebase. 
```javascript
function ajax_recipe(){
  $.ajax({
    url: queryURL_recipe,
    method: "GET"
  })
   //Response handler
 .then(function(response) { 
    
    //Store response into variables in a for loop for easier access
    //Check if carbs exist or not because not all recipes have carbs
    if (typeof recipeNutr.CHOCDF == "undefined"){
       console.log("No carbs.. get OK");
       carbs = "No Carbs";
    console.log(carbs);
     }
    else{
      
       carbs = "Carbohydrates: " + Math.round(recipeNutr.CHOCDF.quantity * 100) / 100  + "g";
    }
    //Store other nutrients (calories, fat, protein) into variables
     
    //Call to generate slide
    generateSlide(i, recipeImage, recipeName, recipeURL, carbs, calories, fat, protein); 
    }
    //Save response into firebase
    database.ref().set({
      recipe:response  
      })  
  
  })
}
```
There is also a call to the generateSlide function that takes in all the variables stored and then outputs nutrition information on a card; this will be documented in the next subsection

#### Getting the Nutrition Information

The generatedSlide function takes in a number of parameters, it will generate a slide in the carousel based on your search result. It will store the nutrition information such as carbs, fat, protein, etc as an attribute so it could be read later without calling ajax again 

```javascript
function generateSlide(i, pic, name, link, carbs, calories, fat, protein){ 
  //slide item - add Class and attributes  
  //image item - add Class and attributes
  //append image item to slide item
  //append slide item to carousel
  //adding caption to slide item
  }
```
##### Variable explanation:
 - i - The identifier for which number of the recipe is from the recipe array stored from the response
 - pic - Taking in the image URL from the response and outputting it in a div in the slides
 - name - Taking in the name of the item to display on the carousel captions
 - link - Taking in the link of the recipe to display on the carousel sub-captions
 - carbs, calories, fat, protein - Taking the nutrition value to store them into attributes


### Outputting data onto the ingredient cards based on an onclick function

To trigger outputs onto the nutrition and ingredient cards on the html, the carousel item must be clicked. We created an on click function with 

```javascript
$(document).on("click", ".carousel-item", function(){
  //empty out divs so it doesn't carryover
  //create a new div to append items
  //read from attributes to store nutrition items
  //append items on to new div generated
  //number identifier to determine which recipe info it will be using
 
  //call ingredient function to post ingredient on another card
}
```
Once the carousel item is clicked, the nutrition information will be read from attributes, and the ingredients information will be read from firebase through a function Ingrd(num); with num being the numerical identifier for which item in the recipe array as shown above in the Firebase set and snapshot example.

### Google Maps API

The map from google was generated mostly from its documentation online. We created a div to append the map object to, and we used one of google map's library, places, with textSearch and found all nearby grocery stores near the user's location. 

An example snipped is shown below:

```javascript
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
          createMarker(results[i]);;
        }
        map.setCenter(results[0].geometry.location);
      }
    });
}
```
createMarker was a function created to place a marker based on the location.

## End User Benefits
1. User will be able to use the website to view and search for information about food nutrition fact.
2. User can enter the food they like to each and get the report about the food that they are interested.
3. User can get food nutrial information, receip, restaurant recommendation, how to cood videos..
4. User might be able to get direction to restaurance, market, or food services agency

## APP Feature List Proposal
* Dynamically search for nutrition recipies, analyze the nutrinal elements of the recipes and menus
* View nutrition label for the bood and recipe
* Choose and recommend healthy brands
* Display nutrition report
* Recommend restaurants that serve the food
* Provide map and direction to the restaurant
* Membership subscription
* On going recipe recommendation, food subject blog, and food news...

