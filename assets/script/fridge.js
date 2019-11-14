//Database on Eastern's Account.
  var firebaseConfig = {
    apiKey: "AIzaSyCrqvDa47jwFdt7Udl2-Qi3f1LZsucXYHM",
    authDomain: "firstproject2-2bbb8.firebaseapp.com",
    databaseURL: "https://firstproject2-2bbb8.firebaseio.com",
    projectId: "firstproject2-2bbb8",
    storageBucket: "firstproject2-2bbb8.appspot.com",
    messagingSenderId: "518162345823",
    appId: "1:518162345823:web:1579f80514bda96a4290ea",
    measurementId: "G-T1KD7DTGQK"
  };
  firebase.initializeApp(firebaseConfig);

//reference to the database
var database = firebase.database();

//reference to folder in database
var ref = database.ref("ingredient");
var fridge;

//calls on function to ref folder
ref.on('value', getData, errData);

//takes input and adds to fridge array, writes fridge array to database
$("#fridge").on("click", addFood);

$("#recipe").on("click", ajax_func); 


//makes fridge equal to array in database
function getData(data){
    fridge=data.val().array1;
}

//error response if pull fails, I may comment this out at some point
function errData(data){
    console.log('Error!');
    console.log(err);
}


function addFood(){

    // takes ingredient and stores it to variable.
    var food = $("#food").val(); 

    //adds food to the array, creates new array if food is empty.
    if (Array.isArray(fridge)){
        fridge.push(food);
    }else{
        fridge=[food];
    }

    //overwrites existing array in DB with fridge array.
    ref.set({
        array1:fridge});
        
}



function ajax_func(){

    var ingredient = fridge[Math.floor(Math.random * fridge.length)];
    console.log(fridge);
    var queryURL = "https://api.edamam.com/search?q="+ingredient+"&to=10&app_id=d35cb7b4&app_key=7fdbcaad271be517c347666c7e4a4ae9";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
   
   .then(function(response) {
      
    console.log(response);  
      
      for (i = 1; i < 20; i++){
      
       
      }
      
   });

}
 