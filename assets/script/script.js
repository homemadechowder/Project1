//EDAMAM Api Key = d2d2590ec9988c392da648e07513249d


var queryURL = "https://api.edamam.com/api/food-database/parser?ingr=brown%20rice&category=fast-foods&app_id=f6a7e516&app_key=d2d2590ec9988c392da648e07513249d";

$.ajax({
    url: queryURL,
    method: "GET"
  })

  //Response handler
    .then(function(response) {

    //Store the data for image_original_url in imageUrl
      console.log(response);
    });