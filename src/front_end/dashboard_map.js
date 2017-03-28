var maps_api_src = 'https://maps.googleapis.com/maps/api/js?key='+config.GOOGLE_MAPS_API_KEY+'&callback=initMap';
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = maps_api_src;
document.head.appendChild(script);


  var map;
  var areaTitles = [];
  var kmlParser;
  var allAreaPolygons = [];

  function getAreasMapped(){
    return areasMapped;
  }

  function getAreaTitles(){
    return areaTitles;
  }

  function gatherPolygons() {
    for (var i = 0; i < areaTitles.length; i++){
      allAreaPolygons.push(kmlParser.docs[i].placemarks[0]);
    }
    return allAreaPolygons;
  }

  function parseMain(){
    kmlParser.parse(mainKmlSource);
  }

  function parseOthers(){
    for(var i = 0; i < subKmlSources.length; i++) {
      kmlParser.parse(subKmlSources[i]);
    }
  }

  //Initializes the map and calls the function that loads the KML layer.
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

    kmlParser = new geoXML3.parser({
      map: map,
      suppressInfoWindows: true
    });

    //separating these into two functions makes it load smoother!
    parseMain();
    parseOthers();

    console.log("json obj[0] = " +jsonObject[0].host_name);

    //var hostInfoJsonObject = JSON.parse(dataObject[0]);
    //console.log(Object.keys(hostInfoJsonObject).length);

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
        placemark.polygon.fillColor = 'grey'; 
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
