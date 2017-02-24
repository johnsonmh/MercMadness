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

  loadKmlLayer(mainKmlSource, map);

   for(var i = 0; i < subKmlSources.length; i++) {
     loadKmlLayer(subKmlSources[i], map);
   }
}

/**
 * Adds a KMLLayer based on the URL passed. Clicking on a marker
 * @param {string} src A URL for a KML file.
 */
function loadKmlLayer(src, map) {
  var kmlParser = new geoXML3.parser({
    map: map,
    suppressInfoWindows: true
  });
  kmlParser.parse(src);
  google.maps.event.addListener(kmlParser, 'click', function(event) {
    map.fitBounds(kmlParser.getDefaultViewport());
  });
}

var maps_api_src = 'https://maps.googleapis.com/maps/api/js?key='+config.GOOGLE_MAPS_API_KEY+'&callback=initMap';
document.write('\x3Cscript async defer src='+maps_api_src+'>\x3C/script>');
