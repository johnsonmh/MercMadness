var map;
var mainKmlSource = 'https://raw.githubusercontent.com/johnsonmh/MercMadness/master/KMZ/MBV.kml';
var subKmlSources = [
  'https://raw.githubusercontent.com/johnsonmh/MercMadness/master/KMZ/Assembly%20Line1.kml',
  'https://raw.githubusercontent.com/johnsonmh/MercMadness/master/KMZ/Body%20OffLoad1.kml',
  'https://raw.githubusercontent.com/johnsonmh/MercMadness/master/KMZ/Dyno1.kml',
  'https://raw.githubusercontent.com/johnsonmh/MercMadness/master/KMZ/Finish%20Line1.kml',
  'https://raw.githubusercontent.com/johnsonmh/MercMadness/master/KMZ/Paint%20Touch%20Up1.kml',
  'https://raw.githubusercontent.com/johnsonmh/MercMadness/master/KMZ/Rework1.kml',
  'https://raw.githubusercontent.com/johnsonmh/MercMadness/master/KMZ/Wheel%20Alignment1.kml'
];


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
  var kmlLayer = new google.maps.KmlLayer(src, {
    suppressInfoWindows: true,
    preserveViewport: false,
    map: map,
  });
  google.maps.event.addListener(kmlLayer, 'click', function(event) {
    // var content = event.featureData.infoWindowHtml;
    // var testimonial = document.getElementById('capture');
    // testimonial.innerHTML = content;
    map.fitBounds(kmlLayer.getDefaultViewport());
  });
}
var maps_api_src = 'https://maps.googleapis.com/maps/api/js?key='+config.GOOGLE_MAPS_API_KEY+'&callback=initMap';
document.write('\x3Cscript async defer src='+maps_api_src+'>\x3C/script>');