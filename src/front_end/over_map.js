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
  if(hostString.includes("printer")){
    pic.setAttribute("src", "device_images/printer.png");
  }
  else if(hostString.includes("hp")){
    pic.setAttribute("src", "device_images/multifunction_printer.jpeg");
  }
  else if (hostString.includes("srv") || hostString.includes("server") ){
    pic.setAttribute("src", "device_images/server.png");
  }
  else if(hostString.includes("switch")){
    pic.setAttribute("src", "device_images/switch.png");
  }
  else{
    pic.setAttribute("src", "device_images/laptop.png");
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

//sort an array by a given key
function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? 1 : ((x > y) ? -1 : 0)); //flipped negatives so that most negative is at top
  });
}

function clearMenu(){
  //get side nav container, remove all elements except the close button
  var container = document.getElementById("mySidenav");

  //remove all text from sidenav
  var elements = container.getElementsByClassName("stations");
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

function loadMenu(areaName) {
  //make parent the sidenav
  var parent = document.getElementById('mySidenav');

  //split json object into two arrays
  var station1 = [];
  var station2 = [];
  //for now, put even hosts into station 1, odd into station 2
  for (var j = 0; j < Object.keys(jsonObject).length; j++) {
    if (j%2 == 0){
      station1.push(jsonObject[j]);
    }else{
      station2.push(jsonObject[j]);
    }
  }

  //sort elements so that red buttons are on top, grey are on bottom
  station1 = sortByKey(station1, 'check_execution_time');
  station1 = sortByKey(station1, 'current_state');

  station2 = sortByKey(station2, 'check_execution_time');
  station2 = sortByKey(station2, 'current_state');

  //Create heading of areaName passed in
  var menuKMLName = document.createElement("H1");
  menuKMLName.setAttribute("class", "stations");
  menuKMLName.innerHTML = areaName;
  menuKMLName.setAttribute("style", "text-align:center;font-size: 24px;");
  parent.appendChild(menuKMLName);

  //Create subheading of "Station 1" - change later to reflect real station number
  var menuStationName = document.createElement("H2");
  menuStationName.setAttribute("class", "stations");
  menuStationName.innerHTML = "Station 1";
  menuStationName.setAttribute("style", "text-align:Left;font-size: 18px; padding: 0 15px;");
  parent.appendChild(menuStationName);

  //populate station1
  for (var j = 0; j < station1.length; j++) {
    var temp = 'mybutton' + j;
    createButtons('button', station1[j], 'mySidenav');
  }
  var br = document.createElement("br");
  br.setAttribute("class", "stations");
  parent.appendChild(br);

  //hard code Station 2 and populate with buttons
  var menuStationName2 = document.createElement("H2");
  menuStationName2.setAttribute("class", "stations");
  menuStationName2.innerHTML = "Station 2";
  menuStationName2.setAttribute("style", "text-align:Left;font-size: 18px; padding: 0 15px;");
  parent.appendChild(menuStationName2);

  for (var j = 0; j < station2.length; j++) {
    var temp = 'mybutton' + j;
    createButtons('button', station2[j], 'mySidenav');
  }
  var br2 = document.createElement("br");
  br2.setAttribute("class", "stations");
  parent.appendChild(br2);

  enableAccordion();
}

//menu for when main KML is in view
function loadMainViewMenu(){
  var parent = document.getElementById('mySidenav');
  var title = document.createElement("H1");
  title.setAttribute("class", "stations");
  title.innerHTML = "Main View";
  title.setAttribute("style", "text-align:center;font-size: 24px;");
  parent.appendChild(title);
}
