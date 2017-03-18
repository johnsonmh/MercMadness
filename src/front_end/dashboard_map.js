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
  loadMainViewMenu();
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

  var areaTitles = [];

  /**
  * Initializes the map and calls the function that loads the KML layer.
  */
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(-19.257753, 146.823688),
      zoom: 2,
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

    //console.log(jsonObject);
    var bounds;
    var placemark;

    google.maps.event.addListener(kmlParser, 'parsed', function () {
      placemark = kmlParser.docs[kmlParser.docs.length - 1].placemarks[0];
      addClickListener(map, placemark);
      areaTitles.push(placemark.polygon.title);
      if(placemark.polygon.title == 'MBV') {
        placemark.polygon.fillColor = '#c6c6c6'; // Grey
        bounds = placemark.polygon.bounds;
      } else {
        placemark.polygon.fillColor = '#4caf50'; // Green
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
        console.log("main kml");
        clearMenu();
        loadMainViewMenu(place.polygon.title);
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

  var maps_api_src = 'https://maps.googleapis.com/maps/api/js?key='+config.GOOGLE_MAPS_API_KEY+'&callback=initMap';
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = maps_api_src;
  document.body.appendChild(script);
