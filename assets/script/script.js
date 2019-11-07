//EDAMAM Api Key = d2d2590ec9988c392da648e07513249d

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

    console.log(restaurantName);
     
    }
    console.log(response);
 });

});

})