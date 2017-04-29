var GREEN = "#57bc5b";
var RED = "#e84c3d";
var YELLOW = "#FFD000";
var GREY = "#D3D3D3";

var PARSED_hosts; //ALL parsed hosts
var total = 0;
var polygons = [];
var titles;
var statusAreaMapping = {};
var panelOpen = false;


window.onload = function(){
  centerMap();
  titles = getAreaTitles();
  //initialize statusAreaMapping to empty arrays
  for (var i = 0; i < titles.length;i++){
    statusAreaMapping[titles[i]] = [];
  }

  setInterval(function() {
    refreshPage();
  }, 4000);

  //begin over_map.js functions
  //get the two json objects (-> status.dat and all host.cfg files) and combine the information
  refreshPage();
};

function refreshPage(){
  //if an accordion panel is open, do not refresh the page
  if (panelOpen == false){

    //clear all variables that are built using updating information
    PARSED_hosts = [];
    clearAreaStatus();
    clearMenu();

    //go through all hosts, append to PARSED_hosts, gather info on their statuses and put into statusAreaMapping object
    getAreaStatus();

    //depending on what KML the user is already looking at, populate the menu with new information
    if (inFocusArea.includes("Main")){
      //display general area statuses in main menu on load
      populateMainViewMenu("General Areas");
    }
    else{
      //if the area that was previously in focus is not a main, stay on that area, reload that menu
      loadMenu(inFocusArea);
    }
  }
}

//menu for when a main KML is in view
function populateMainViewMenu(name){

  var parent = document.getElementById('mySidenav');

  //add logo to menu
  var logo = document.createElement("img");
  logo.setAttribute("id", "logo");
  logo.setAttribute("class", "stations");
  logo.setAttribute("src", config.PATH_TO_IMAGES + "/mercedes_logo.png");

  //if logo is clicked, map zooms out
  logo.onclick = function () {
    centerMap();
  }

  parent.appendChild(logo);

  var title = document.createElement("H1");
  title.setAttribute("class", "stations");
  title.innerHTML = name;
  title.setAttribute("style", "text-align:center;font-size: 24px;");
  parent.appendChild(title);

  var br = document.createElement("br");
  br.setAttribute("class", "stations");
  parent.appendChild(br);

  calculateAreaStatus();
}

//color the polygons based off of the information gathered from getAreaStatus()
function calculateAreaStatus() {
  polygons = gatherPolygons();
  for (var i = 0; i < titles.length; i++){
    if (statusAreaMapping[titles[i]].includes("red")){
      colorPolygonByTitle(titles[i], RED);
    }
    else if (statusAreaMapping[titles[i]].includes("yellow")){
      colorPolygonByTitle(titles[i], YELLOW);
    }
    else if (statusAreaMapping[titles[i]].includes("green")){
      colorPolygonByTitle(titles[i], GREEN);
    }
  }
}

//when page refreshes, it needs to clear the area status list - otherwise it is not fresh information
function clearAreaStatus() {
  for (var i = 0; i < titles.length; i++){
    statusAreaMapping[titles[i]] = [];
  }
}

//color each polygon, given the title of the polygon and what color it should be
function colorPolygonByTitle(title, color) {
  for (var i = 0; i < titles.length; i++){
    if (title == polygons[i].name){
      polygons[i].polygon.setOptions({fillColor: color});
      //change main menu too!
      var parent = document.getElementById("mySidenav");
      createPulseButtons(title, color, parent);
    }
  }
}

//for the main menu, pulse buttons represent the areas - red blinks fast, yellow medium fast, green not at all
function createPulseButtons(title, color, parent) {

  var container = document.createElement("div");
  container.setAttribute("class", "container");

  var areaButton = document.createElement("button");
  areaButton.setAttribute("id", "buttonMain");

  //if button is clicked, map zooms in on that area
  areaButton.onclick = function () {
    for (var i = 0; i < titles.length; i++){
      if (title == polygons[i].name){
        map.fitBounds(polygons[i].polygon.bounds);
        inFocusArea = titles[i];
        clearMenu();
        loadMenu(titles[i]);
      }
    }
  }

  if (color == RED){
    areaButton.setAttribute("class", "pulse-button-red");
  }
  if (color == GREEN){
    areaButton.setAttribute("class", "no-pulse-button");
    areaButton.style.backgroundColor = GREEN;
    areaButton.style.color = GREEN;
  }
  if (color == YELLOW){
    areaButton.setAttribute("class", "pulse-button-yellow");
    areaButton.style.backgroundColor = YELLOW;
    areaButton.style.color = YELLOW;
  }

  container.innerHTML = title;

  //breaks in between buttons
  var br = document.createElement("br");
  br.setAttribute("class", "stations");

  var br1 = document.createElement("br");
  br1.setAttribute("class", "stations");
  container.appendChild(areaButton);
  parent.appendChild(container);
}

//sidenav open function
function w3_open() {
  document.getElementById("mySidenav").style.width = "400px";
  document.getElementById("mySidenav").style.display = "block";
}

//sidenav close function and collapse all open accordions
function w3_close() {
  document.getElementById("mySidenav").style.display = "none";
  closeAllAccordions();
}

//within the panel, display all information on the host_name
function createTextInPanel( panel, host ){
  var keyArr = Object.keys(host);
  keyArr.sort();

  for ( var i = 0; i < keyArr.length; i++) {
    var element = document.createElement("P");
    element.textContent = keyArr[i].capitalize() + ": " + host[keyArr[i]];
    panel.appendChild(element);
  }
}

//capitalize first letter of a string -> use "STRING".capitalize()
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

//populate the station with buttons -> buttons represent each device
function createButtons(type, currentJsonObject, parentId) {
  var element;
  if (currentJsonObject.plugin_output.includes('OK')){ //OK
    element = document.createElement("buttonGreen");
  }
  else if (currentJsonObject.plugin_output.includes('CRITICAL')){ //CRITICAL
    element = document.createElement("buttonRed");
  }
  else if (currentJsonObject.plugin_output.includes('WARNING')){ //WARNING
    element = document.createElement("buttonYellow");
  }
  else if (currentJsonObject.plugin_output.includes('check timed out')){ //Checking of host failed
    element = document.createElement("buttonRed");
  }
  else{
    element = document.createElement("buttonGrey"); //unknown / pending
  }

  //set class attribute and display the host's name - maybe change to ALIAS later?
  element.setAttribute("class", "accordion");
  element.innerHTML = currentJsonObject.alias;

  //create the panel to slide out from under the button
  var pan = document.createElement("div");
  pan.setAttribute("class", "panel");

  //create text within the panel
  createTextInPanel( pan, currentJsonObject );

  //find and display host image for easy locating on the floor
  var pic = document.createElement("img");



  //host image names in the folders must MATCH EXACTLY the alias name of the host in nagios
  //IMAGE EXTENSIONS CAN ONLY BE .JPEG at this time!
  var found = false;
  if (found == false){
    var pathToImageJpeg = config.PATH_TO_IMAGES + "/" + currentJsonObject.alias + '.jpeg';
    $.get(pathToImageJpeg)
      .done(function() {
          pic.setAttribute("src", pathToImageJpeg);
          found = true;
      }).fail(function() {
          pic.setAttribute("src", config.PATH_TO_IMAGES+'/not_found.jpeg');
      });
  }

  // if (found == false){
  //   var pathToImagePng = config.PATH_TO_IMAGES + "/" + currentJsonObject.alias + '.png';
  //   $.get(pathToImagePng)
  //     .done(function() {
  //         pic.setAttribute("src", pathToImagePng);
  //         found = true;
  //     }).fail(function() {
  //         pic.setAttribute("src", config.PATH_TO_IMAGES+'/not_found.jpeg');
  //     });
  // }

  //set id attribute for device for CSS purposes
  pic.setAttribute("id", "device");
  pan.appendChild(pic);

  //add some space after image
  var br = document.createElement("br");
  pan.appendChild(br);
  var br1 = document.createElement("br");
  pan.appendChild(br1);

  //Append the button element and panel to the sideNav
  var parent = document.getElementById(parentId);
  parent.appendChild(element);
  parent.appendChild(pan);
}

//enables clicking and opening accordion panels
function enableAccordion(){
  var acc = document.getElementsByClassName("accordion");
  var i;
  for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight){
        panel.style.maxHeight = null;
      } else {
        panelOpen = true;
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    }
  }
}

//when the sidenav is closed, close all accordion panels
function closeAllAccordions(){
  panelOpen = false;
  var acc = document.getElementsByClassName("accordion");
  var i;
  for (i = 0; i < acc.length; i++) {
    var panel = acc[i].nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    }
  }
}

//sort an array by a given key - used for button sorting
function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? 1 : ((x > y) ? -1 : 0)); //flipped negatives so that most negative is at top
  });
}

//strip "STA from station name, for example ""STA11" -> 11
function parseStationStr(stationNum){
  if (stationNum.includes("STA")){
    stationNum = stationNum.replace(/\D/g,''); //remove "STA"
    var isnum = /^\d+$/.test(stationNum); //boolean
    if(isnum){
      return stationNum;
    }
  }
}

//use area-station mapping from config.js -> need for mapStationToArea()
function getAreasMapped(buildingTitle){
  return areasMapped;
}

function mapStationToArea(stationNum){
  //fetch info from dashboard_map
  var areas = getAreaTitles();
  var areasMapped = getAreasMapped();

  //using the mapping defined in config.js, you can find which area your station is in
  var keyArr = Object.keys(areasMapped);
  for ( var i = 0; i < keyArr.length; i++) {
    var numArr = areasMapped[keyArr[i]];
    var area = keyArr[i];
    for (var j = 0; j < numArr.length;j++){
      if(numArr[j] == stationNum){
        return area;
      }
    }
  }
}

//parses host individually -> returns [ Station Number, Area Title ] info from each host!
function parseHost(host){
  var rtnArr = [];
  aliasStr = host.alias.toUpperCase();
  aliasArr = host.alias.split(' ');

  //use regex matching to get the STA__ station number from the alias
  for (var i = 0; i < aliasArr.length; i++){
    if(aliasArr[i].match(/^([STA]{3}[0-9]{1,})$/g)){
      var stationNumber = parseStationStr(aliasArr[i]);
      //console.log("station num = "+ stationNumber);
      rtnArr.push(stationNumber);
      rtnArr.push(mapStationToArea(stationNumber));
    }
  }
  return rtnArr;
}

// getting an array of the hosts in the area that has been recently clicked on
function processHostsInFocus(all, areaName){
  var areasMapped = getAreasMapped();
  var stationList = areasMapped[areaName];
  var hosts_in_station = [];

  for (var j = 0; j < stationList.length; j++){
    hosts_in_station[stationList[j]] = [];
  }

  for (var i = 0; i < all.length; i++){
    for (var j = 0; j < stationList.length; j++){
      if (all[i]['station_number'] == stationList[j]){
        hosts_in_station[stationList[j]].push(all[i]);
      }
    }
  }
  return hosts_in_station;
}

function loadMenu(areaName) {
  var hosts_in_focus = [];
  //this is where hosts whose area matches the area in focus get to populate the menu!
  // device type, station number, and area on map are added to the host information

  var total_states = 0;
  var num_hosts;
  for (var i = 0; i < PARSED_hosts.length; i++){
    //if the area name matches the areaName passed into the function, then host is in focus!
    if (PARSED_hosts[i].area_name === areaName){
      hosts_in_focus.push(PARSED_hosts[i]);
      total_states += PARSED_hosts[i].current_state;
      num_hosts++;
    }
  }

  //check which area is in focus and then populate it with the corresponding hosts
  var arrayOfObjects = processHostsInFocus(hosts_in_focus, areaName);

  //make parent = sidenav
  var parent = document.getElementById('mySidenav');

  //add logo to menu
  var logo = document.createElement("img");
  logo.setAttribute("id", "logo");
  logo.setAttribute("class", "stations");
  logo.setAttribute("src", config.PATH_TO_IMAGES + "/mercedes_logo.png");
  logo.onclick = function () {
    centerMap();
  }
  parent.appendChild(logo);


  //Create heading of areaName passed in
  var menuKMLName = document.createElement("H1");
  menuKMLName.setAttribute("class", "stations");
  menuKMLName.innerHTML = areaName;
  menuKMLName.setAttribute("style", "text-align:center;font-size: 24px;");
  parent.appendChild(menuKMLName);

  var keyArr = Object.keys(arrayOfObjects);
  for ( var i = 0; i < keyArr.length; i++) {
    var station_hosts_array = arrayOfObjects[keyArr[i]];

    //sort elements so that red buttons are on top, grey are on bottom
    //station_hosts_array = sortByKey(station_hosts_array, 'check_execution_time');
    station_hosts_array = sortByKey(station_hosts_array, 'current_state');

    //Create subheading of "Station 1" - change later to reflect real station number
    var menuStationName = document.createElement("H2");
    menuStationName.setAttribute("class", "stations");
    menuStationName.innerHTML = "Station " + keyArr[i];
    menuStationName.setAttribute("style", "text-align:Left;font-size: 18px; padding: 0 15px;");
    parent.appendChild(menuStationName);

    //populate stations with buttons
    for (var j = 0; j < station_hosts_array.length; j++) {
      var temp = 'mybutton' + j;
      createButtons('button', station_hosts_array[j], 'mySidenav');
    }
    //add a little break for spacing
    var br = document.createElement("br");
    br.setAttribute("class", "stations");
    parent.appendChild(br);
  }

  //enable panel drop downs for buttons
  enableAccordion();
}

//remove all elements in sidenav menu except the close button
function clearMenu(){
  //get side nav container
  var container = document.getElementById("mySidenav");

  //remove all text from sidenav
  var elements = container.getElementsByClassName("stations");
  while (elements[0]) {
    elements[0].parentNode.removeChild(elements[0]);
  }
  //remove all pulse buttons from Main menu sidenav
  var elements = container.getElementsByClassName("pulse-button");
  while (elements[0]) {
    elements[0].parentNode.removeChild(elements[0]);
  }
  //remove all breaks in between buttons
  var elements = container.getElementsByClassName("container");
  while (elements[0]) {
    elements[0].parentNode.removeChild(elements[0]);
  }
  //remove all non pulse buttons from Main menu sidenav
  var elements = container.getElementsByClassName("no-pulse-button");
  while (elements[0]) {
    elements[0].parentNode.removeChild(elements[0]);
  }
  //remove all button elements from sidenav
  var buttons = container.getElementsByClassName("accordion");
  while (buttons[0]) {
    buttons[0].parentNode.removeChild(buttons[0]);
  }
  //remove all panel elements from sidenav
  var panels = container.getElementsByClassName("panel");
  while (panels[0]) {
    panels[0].parentNode.removeChild(panels[0]);
  }
}

function getAreaStatus(){
  //Here we combine the two json objects - one made from Status.dat and one made from all the Host .config files
  var hostInfoJsonObject = JSON.parse(dataObject[0]);
  var UNPARSED_hosts = [];

  // combine info from status.dat json and host.cfg files json
  // jsonObject -> status.dat
  // hostInfoJsonObject -> host config files
  for (var i = 0; i < jsonObject.length; i++){
    for (var j = 0; j < hostInfoJsonObject.length; j++){
      if (jsonObject[i].host_name == hostInfoJsonObject[j].host_name){
        jsonObject[i]['alias'] = hostInfoJsonObject[j].alias;
        jsonObject[i]['address'] = hostInfoJsonObject[j].address;
        jsonObject[i]['contact_groups'] = hostInfoJsonObject[j].contact_groups;
        jsonObject[i]['hostgroups'] = hostInfoJsonObject[j].hostgroups;
        UNPARSED_hosts.push(jsonObject[i]);
      }
    }
  }

  for (var i = 0; i < UNPARSED_hosts.length; i++){
    var current_host = UNPARSED_hosts[i];
    parsed_host = parseHost(current_host);

    //add new info on device station_number and area_name parsed from host alias
    current_host["station_number"] = parsed_host[0]; //station num
    current_host["area_name"] = parsed_host[1]; //area

    // change host colors based on the plugin output
    if (current_host.plugin_output.includes('OK')){ //OK
      current_host["color_state"] = "green";
    }
    else if (current_host.plugin_output.includes('CRITICAL')){ //CRITICAL
      current_host["color_state"] = "red";
    }
    else if (current_host.plugin_output.includes('WARNING')){ //WARNING
      current_host["color_state"] = "yellow";
    }
    else if (current_host.plugin_output.includes('check timed out')){ //Checking of host failed
      current_host["color_state"] = "red";
    }
    else{
      current_host["color_state"] = "grey";
    }

    //add this host to list of ALL hosts -> PARSED_hosts
    PARSED_hosts.push(current_host);
    total++;
    addHostStateToArea(current_host.color_state, current_host.station_number);
  }
}

function addHostStateToArea(color_state, host_station){
  var area = mapStationToArea(host_station);
  for (var i = 0; i < titles.length;i++){
    if (titles[i] == area){
      statusAreaMapping[titles[i]].push(color_state);
    }
  }
}
