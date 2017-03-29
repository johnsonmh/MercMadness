//use Google maps API defined in config.js -> calls initMap()
var maps_api_src = 'https://maps.googleapis.com/maps/api/js?key='+config.GOOGLE_MAPS_API_KEY+'&callback=initMap';
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = maps_api_src;
document.head.appendChild(script);

  var map;
  var areaTitles = [];
  var kmlParser;
  var allAreaPolygons = [];

  //created as the kmls are loaded -> use in over_map.js to iterate allAreaPolygons array
  //and match titles/area names to polygons
  function getAreaTitles(){
    return areaTitles;
  }

  //make an array of all the polygons -> use in over_map.js to change polygon colors based on area status
  function gatherPolygons() {
    for (var i = 0; i < areaTitles.length; i++){
      allAreaPolygons.push(kmlParser.docs[i].placemarks[0]);
    }
    return allAreaPolygons;
  }

  //parse the main kml
  function parseMain(mainKML){
    kmlParser.parse(mainKML);
  }

  //parse the subKML sources
  function parseSubKMLs(subKmlSources){
    for(var i = 0; i < subKmlSources.length; i++) {
      kmlParser.parse(subKmlSources[i]);
    }
  }

  //Initialize the map and call the function that loads the KML layer -> geoxml3.js
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
    // parseMain();
    // parseOthers();

    //console.log("json obj[0] = " +jsonObject[0].host_name);

    for (var i = 0; i < mainKmlArray.length; i++){
      //index array to get main kml json object
      var kmlSource = mainKmlArray[i];
      //console.log(kmlSource.mainKmlSource);
      parseMain(kmlSource.mainKmlSource);
      parseSubKMLs(kmlSource.subKmlSources);
    }

    var bounds;
    var placemark;
    google.maps.event.addListener(kmlParser, 'parsed', function () {
      placemark = kmlParser.docs[kmlParser.docs.length - 1].placemarks[0];
      // console.log(placemark.polygon.title);
      addClickListener(map, placemark);
      //add title of the kml to areaTitles
      areaTitles.push(placemark.polygon.title);
      if(placemark.polygon.title.includes("Main")) {
      //if(placemark.polygon.title == 'Harbor Walk') {
        placemark.polygon.fillColor = '#9c9086'; // Grey
        placemark.polygon.fillOpacity = 0.4;
        placemark.polygon.strokeWeight = 1;
        placemark.polygon.strokeColor = "#dbdbdb";
        //store boundary of main kml to fitBounds later
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
      if(place.polygon.title.includes("Main")) {
      //if(place.polygon.title == 'Harbor Walk') {
        console.log("main kml: "+place.polygon.title);
        clearMenu();
        populateMainViewMenu("General areas");
      } else {
        console.log(place.polygon.title);
        clearMenu();
        loadMenu(place.polygon.title);
      }
    });

  }
