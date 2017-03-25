var maps_api_src = 'https://maps.googleapis.com/maps/api/js?key='+config.GOOGLE_MAPS_API_KEY+'&callback=initMap';
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = maps_api_src;
document.body.appendChild(script);


//allows all javascript files to communicate with each other through mapping
require.config({
  paths: {
    'geo': 'geoxml3',
    'overmap': 'over_map',
    'dashboard': 'dashboard_map',
    'jquery': 'jquery-3.1.1.min'
  }
});

//loads functions from overmap and enables main menu to be displayed from the beginning
require(["overmap"], function() {
  console.log("over map loaded OK.");
});

// FAKE mapping of all the areas and stations within the area
var areasMapped = {
  "Assembly Line": ["1","2"],
  "Wheel Alignment": ["3","4","5"],
  "Body OffLoad": ["6","7"],
  "Dyno": ["8","9"],
  "Finish Line": ["10"],
  "Paint Touch Up": ["11"],
  "Rework": ["12","13","14"]
}

/*var areasMapped = {
  "Area 1": ["1","2", "6", "9", "10", "11", "14"],
  "Area 2": ["3","4","5","7", "8", "12", "13"]
}*/

var map;

var mainKmlSource = '../KMZ/MBV.kml';
var subKmlSources = [
  '../KMZ/Assembly Line1.kml',
  '../KMZ/Body OffLoad1.kml',
  '../KMZ/Dyno1.kml',
  '../KMZ/Finish Line1.kml',
  '../KMZ/Paint Touch Up1.kml',
  '../KMZ/Rework1.kml',
  '../KMZ/Wheel Alignment1.kml'];

  /*var mainKmlSource = '../KMZ2/harbor_walk.kml';
  var subKmlSources = [
    '../KMZ2/hw_area1.kml',
    '../KMZ2/hw_area2.kml'];*/

  var areaTitles = [];

  /**
  * Initializes the map and calls the function that loads the KML layer.
  */
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(-19.257753, 146.823688),
      zoom:2,
      mapTypeId: 'terrain',
      styles: [
        {
          featureType: "all",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
        },
      ],
    });

    var kmlParser = new geoXML3.parser({
      map: map,
      suppressInfoWindows: true
    });

    kmlParser.parse(mainKmlSource);

    for(var i = 0; i < subKmlSources.length; i++) {
      kmlParser.parse(subKmlSources[i]);
    }
    console.log(jsonObject);
    console.log(dataObject[0]);

  //  console.log(Object.keys(dataObject)[0]);
    var bounds;
    var placemark;

    google.maps.event.addListener(kmlParser, 'parsed', function () {
      placemark = kmlParser.docs[kmlParser.docs.length - 1].placemarks[0];
      addClickListener(map, placemark);
      areaTitles.push(placemark.polygon.title);
      if(placemark.polygon.title == 'MBV') {
      //if(placemark.polygon.title == 'Harbor Walk') {
        placemark.polygon.fillColor = '#9c9086'; // Grey
        placemark.polygon.fillOpacity = 0.4;
        placemark.polygon.strokeWeight = 1;
        placemark.polygon.strokeColor = "#dbdbdb";

        bounds = placemark.polygon.bounds;
      } else {
        placemark.polygon.fillColor = '#57bc5b'; // Green
        placemark.polygon.fillOpacity = 1;
        placemark.polygon.strokeColor = "#dbdbdb";
        placemark.polygon.strokeWeight = 1;

      }
      //fit intial map load to main map
      map.fitBounds(bounds);

    });

  }

  //when an area is clicked on, the side menu will change automatically
  function addClickListener(map, place) {
    google.maps.event.addListener(place.polygon, 'click', function(event) {
      map.fitBounds(place.polygon.bounds);
      if(place.polygon.title == 'MBV') {
      //if(place.polygon.title == 'Harbor Walk') {
        console.log("main kml");
        clearMenu();
        populateMainViewMenu(place.polygon.title);
      } else {
        console.log(place.polygon.title);
        clearMenu();
        loadMenu(place.polygon.title);
      }
    });
  }

  function getAreasMapped(){
    return areasMapped;
  }

  function getAreaTitles(){
    return areaTitles;
  }
