//allows all javascript files to communicate with each other through mapping
require.config({
  paths: {
    'geo': 'geoxml3',
    'overmap': 'over_map'
  }
});

require(["geo"], function() {
  console.log("geoxml3 loaded OK.");
});

//get all functions from over_map.js
require(['overmap']);

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

    console.log(jsonObject);
    var bounds;
    var placemark;
    google.maps.event.addListener(kmlParser, 'parsed', function () {
      placemark = kmlParser.docs[kmlParser.docs.length - 1].placemarks[0];
      addClickListener(map, placemark);

      if(placemark.polygon.title == 'MBV') {
        placemark.polygon.fillColor = '#c6c6c6'; // Grey
        bounds = placemark.polygon.bounds;
      } else {
        placemark.polygon.fillColor = '#4caf50'; // Green
      }
      //fit intial map load to main map
      map.fitBounds(bounds);

    });

    loadMainViewMenu();

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
        console.log("other kml");
        clearMenu();
        loadMenu(place.polygon.title);
      }
    });
  }

  var maps_api_src = 'https://maps.googleapis.com/maps/api/js?key='+config.GOOGLE_MAPS_API_KEY+'&callback=initMap';
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = maps_api_src;
  document.body.appendChild(script);
