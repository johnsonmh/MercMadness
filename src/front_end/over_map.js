require(["dashboard_map"], function () {
  console.log("dashboard_map working from over_map");

});

var begun = 0;
//populateMainViewMenu();
//console.log(begun);

function createPulseButtons(parent){

  //create buttons, red pulses
  var areaButton = document.createElement("button");
  areaButton.setAttribute("id", "buttonMain");
  areaButton.setAttribute("class", "pulse-button");

  parent.appendChild(areaButton);

  //breaks in between buttons
  var br = document.createElement("br");
  br.setAttribute("class", "stations");
  parent.appendChild(br);
  var br1 = document.createElement("br");
  br1.setAttribute("class", "stations");
  parent.appendChild(br1);
  var br2 = document.createElement("br");
  br2.setAttribute("class", "stations");
  parent.appendChild(br2);

  var areaButton2 = document.createElement("button");
  areaButton2.setAttribute("id", "buttonMain");
  areaButton2.setAttribute("class", "no-pulse-button");
  areaButton2.style.backgroundColor = "#57bc5b";
  areaButton2.style.color = "#57bc5b";

  parent.appendChild(areaButton2);

}


function addFullScreenButton(){
  var googleOptions = document.getElementsByClassName("gmnoprint");
  console.log(googleOptions[5]);
  var itm = googleOptions[5].lastChild;
  var cln = itm.cloneNode(true);
  cln.firstChild.innerHTML = "Full Screen";
  cln.firstChild.onclick = function (){
    window.open('http://localhost:8080/merc/front_end/dashboard.php'); // MAYBE CONFIG - DEPENDS ON WHAT THEY ARE RUNNING THEIR NAGIOS ON
  }
  //console.log(cln.firstChild.innerHTML);
  googleOptions[5].appendChild(cln);
}

//sidenav open function
function w3_open() {
  document.getElementById("mySidenav").style.width = "300px";
  document.getElementById("mySidenav").style.display = "block";
}

//sidenav close function
function w3_close() {
  document.getElementById("mySidenav").style.display = "none";
}

//populate the station with buttons
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
  else{
    element = document.createElement("buttonGrey"); //unknown / pending
  }

  //set class attribute and display the host's name - maybe change to ALIAS later?
  element.setAttribute("class", "accordion");
  element.innerHTML = currentJsonObject.host_name;

  //create the panel to slide out from under the button
  var pan = document.createElement("div");
  pan.setAttribute("class", "panel");

  //create text within the panel
  var currProbID = document.createElement("P");
  var plugOut = document.createElement("P");
  var execTime = document.createElement("P");
  currProbID.innerHTML = "Problem ID: " + currentJsonObject.current_problem_id;
  plugOut.innerHTML = "Plugin Output: " + currentJsonObject.plugin_output;
  execTime.innerHTML = "Check Execution Time: " + currentJsonObject.check_execution_time;
  pan.appendChild(currProbID);
  pan.appendChild(plugOut);
  pan.appendChild(execTime);

  //find right image for device
  var hostString = currentJsonObject.host_name.toLowerCase();
  var pic = document.createElement("img");
  var device = currentJsonObject.device_type.toLowerCase();

  if(device == "printer"){
    pic.setAttribute("src", "images/printer.png");
  }
  else if (device == "hp" ){
    pic.setAttribute("src", "images/multifunction_printer.jpeg");
  }
  else if (device == "srv" || device == "server" ){
    pic.setAttribute("src", "images/server.png");
  }
  else if (device == "switch"){
    pic.setAttribute("src", "images/switch.png");
  }
  else if (device == "pc"){
    pic.setAttribute("src", "images/laptop.png");
  }
  else{
    pic.setAttribute("src", "images/not_found.jpeg");
  }

  //set id attribute for device for CSS purposes
  pic.setAttribute("id", "device");
  pan.appendChild(pic);

  //add some space after image
  var br = document.createElement("br");
  pan.appendChild(br);

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
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
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

function mapStationToArea(stationNum){
  //fetch info from dashboard_map
  var areas = getAreaTitles();
  var areasMapped = getAreasMapped();

  //using the mapping created in dashboard_map.js, you can find which area your station is in
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

//gets [ deviceType, Station Number, Area Title ] info from each host!
function parseHost(host){

  //example host names: QSYS_PC_STA11_PEDALP   QSYS_PC_STA19_XWHEEL  QSYS_PC_STA19_XLIGHT
  //will return an array with [ deviceType, stationNum, area ]
  var type = host.hostgroups;
  type = type.toUpperCase();
  var capsHostName = host.host_name.toUpperCase();
  var hostNameArr = capsHostName.split('_');
  var rtnArr = [];

  switch (type) {
    case "QSYS_PC_WIN_CTRL":
    //console.log("qsys pc win control");
    rtnArr.push(hostNameArr[1]);
    stationNumber = parseStationStr(hostNameArr[2]);
    rtnArr.push(stationNumber);
    rtnArr.push(mapStationToArea(stationNumber));
    break;
    case "QSYS_SVR_WIN":
    //console.log("qsys server win");
    break;
    case "QSYS_CTRL":
    //console.log("qsys ctrl");
    break;
    case "QSYS_SVR_LNX":
    //console.log("qsys server linux");
    break;
    case "SWITCHES":
    rtnArr.push(hostNameArr[0]);
    stationNumber = parseStationStr(hostNameArr[1]);
    rtnArr.push(stationNumber);
    rtnArr.push(mapStationToArea(stationNumber));
    //console.log("switches");
    break;
    case "PRINTERS":
    rtnArr.push(hostNameArr[0]);
    stationNumber = parseStationStr(hostNameArr[1]);
    rtnArr.push(stationNumber);
    rtnArr.push(mapStationToArea(stationNumber));
    //console.log("printers");
    break;
    case "WIRELESS":
    //console.log("wireless");
    break;
    case "WINDOWS":
    //console.log("windows");
    break;
  }
  return rtnArr;
}

function processHostsInFocus(all, aName){
  var areasMapped = getAreasMapped();
  var stationList = areasMapped[aName];
  var hosts_in_station = [];

  for (var j = 0; j < stationList.length; j++){
    hosts_in_station[stationList[j]] = [];
  }

  for (var i = 0; i < all.length; i++){
    for (var j = 0; j < stationList.length; j++){
      if (all[i]['station_number'] == stationList[j]){
        //var stationObj = {};
        //stationObj[stationList[j]] = all[i];
        //hosts_in_station.push(stationObj);
        hosts_in_station[stationList[j]].push(all[i]);
      }
    }
  }
  //console.log(hosts_in_station);
  return hosts_in_station;
}

function loadMenu(areaName) {
  //FAKE HOST data - needs to be combined with the STATUS.DAT info for live information
  var host1 = {
    "host_name": "QSYS_PC_STA3_PEDALP",
    "alias": "Pedal Push Controller STA3",
    "address": "53.234.79.188",
    "contact_groups": "+luhd,shopfloor,admins",
    "max_check_attempts": "10",
    "hostgroups": "QSYS_PC_WIN_CTRL",
    "----------BAD INFO STARTS HERE--": "------------",
    "plugin_output": "CRITICAL battery almost dead",
    "current_problem_id": "33",
    "check_execution_time": "5.00",
    "current_state": "3"
  }

  //Here we combine the two json objects - one made from Status.dat and one made from all the Host .config files
  var hostInfoJsonObject = JSON.parse(dataObject[0]);
  //console.log(Object.keys(hostInfoJsonObject).length);
  //console.log(jsonObject.length);
  //console.log(hostInfoJsonObject.length);

  var UNPARSED_hosts = [];

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

  //console.log(jsonObject[7]);

  var PARSED_hosts = []; //ALL parsed hosts... maybe delete later?

  var hosts_in_focus = [];
  //this is where hosts whose area matches the area in focus get to populate the menu!
  // device type, station number, and area on map are added to the host information
  var total_states = 0;
  var num_hosts;
  for (var i = 0; i < UNPARSED_hosts.length; i++){
    original_unparsed_host = UNPARSED_hosts[i];
    parsed_host = parseHost(original_unparsed_host);
    original_unparsed_host["device_type"] = parsed_host[0];
    original_unparsed_host["station_number"] = parsed_host[1];
    original_unparsed_host["area_name"] = parsed_host[2];
    parsed_host = original_unparsed_host;
    PARSED_hosts.push(parsed_host);
    //if the area name matches the areaName passed into the function, then host is in focus!
    if (parsed_host.area_name === areaName){
      hosts_in_focus.push(parsed_host);
      total_states += parsed_host.current_state;
      num_hosts++;
    }
  }



  //here for testing, I am going to check which area is in focus
  // and then populate it with the above fake hosts
  var arrayOfObjects = processHostsInFocus(hosts_in_focus, areaName);

  //make parent the sidenav
  var parent = document.getElementById('mySidenav');

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
    station_hosts_array = sortByKey(station_hosts_array, 'check_execution_time');
    station_hosts_array = sortByKey(station_hosts_array, 'current_state');

    //Create subheading of "Station 1" - change later to reflect real station number
    var menuStationName = document.createElement("H2");
    menuStationName.setAttribute("class", "stations");
    menuStationName.innerHTML = "Station " + keyArr[i];
    menuStationName.setAttribute("style", "text-align:Left;font-size: 18px; padding: 0 15px;");
    parent.appendChild(menuStationName);

    //populate station1
    for (var j = 0; j < station_hosts_array.length; j++) {
      var temp = 'mybutton' + j;
      createButtons('button', station_hosts_array[j], 'mySidenav');
    }
    var br = document.createElement("br");
    br.setAttribute("class", "stations");
    parent.appendChild(br);
  }

  //enable panel drop downs for buttons
  enableAccordion();
}


//menu for when main KML is in view
function populateMainViewMenu(){
  /*if (begun == 0){
    addFullScreenButton();
  }
  begun = begun+1;*/

  var parent = document.getElementById('mySidenav');
  var title = document.createElement("H1");
  title.setAttribute("class", "stations");
  title.innerHTML = "Main View";
  title.setAttribute("style", "text-align:center;font-size: 24px;");
  parent.appendChild(title);
  createPulseButtons(parent);

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
