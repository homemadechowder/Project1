//Instantiates the map
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

var map = L.map('map', {
    center: [51.505, -0.09], zoom: 13, preferCanvas: true, scrollWheelZoom: true, 
});
//using leafletjs (https://leafletjs.com/examples/quick-start/) + Mapbox OpenStreetMap
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGNvbmxhbiIsImEiOiJjazJ3cjN1dTgwNDN0M2NvM3EwaG91bmp5In0.6bgdXdcPl-J3gSuxpsZWMg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.satellite',
    accessToken: 'pk.eyJ1IjoiZGNvbmxhbiIsImEiOiJjazJ3cjN1dTgwNDN0M2NvM3EwaG91bmp5In0.6bgdXdcPl-J3gSuxpsZWMg'
}).addTo(mymap);

//this makes the map interactive vs. static
mapp.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl:mapboxgl
}))


//This adds the leaflet js marker on the map
var marker = L.marker([51.5, -0.09]).addTo(mymap);

//now adding a circle

var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: "#f05",
    fillOpacity: .025,
    radius: 500
}).addTo(mymap);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);
//This adds the leaflet js marker on the map
var marker = L.marker([51.5, -0.09]).addTo(mymap);

var greenIcon = L.icon({
    iconUrl: 'leaf-green.png',
    shadowUrl: 'leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});