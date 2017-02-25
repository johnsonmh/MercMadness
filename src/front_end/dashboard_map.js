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

  google.maps.event.addListener(kmlParser, 'parsed', function () {
    var placemark = kmlParser.docs[kmlParser.docs.length - 1].placemarks[0];
    addClickListener(map, placemark.polygon);

    if(placemark.polygon.title == 'MBV') {
      placemark.polygon.fillColor = '#ffd12b';
    } else {
      placemark.polygon.fillColor = '#64f961';
    }

  });

}

function addClickListener(map, polygon) {
  google.maps.event.addListener(polygon, 'click', function(event) {
    map.fitBounds(polygon.bounds);
  });
}

var maps_api_src = 'https://maps.googleapis.com/maps/api/js?key='+config.GOOGLE_MAPS_API_KEY+'&callback=initMap';
document.write('\x3Cscript async defer src='+maps_api_src+'>\x3C/script>');
