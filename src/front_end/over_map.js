function w3_open() {
  document.getElementById("mySidenav").style.width = "300px";
  document.getElementById("mySidenav").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidenav").style.display = "none";

  /*if(parent.frames && parent.frames['side']) {
      var elem = parent.frames['side'].document.documentElement;
      console.log(elem);
      elem.style.width = "180px";
      var mainElem = parent.frames['main'].document.body;
      console.log(mainElem);
      //mainElem.style.marginLeft = "180px";
   }*/

}


/*console.log(Object.keys(jsonObject).length);
for (i = 0; i < Object.keys(jsonObject).length ; i++) {
console.log(document.getElementById("tryingJson").innerHTML = jsonObject[i].host_name);
}*/

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

  }else{
    element = document.createElement("buttonGrey"); //unknown / pending
  }
  element.setAttribute("class", "accordion");
  //Assign different attributes to the element.
  //element.type = type;
  //element.value = value; // Really? You want the default value to be the type string?
  //element.name = name; // And the name too?
  //element.id = id;
  element.innerHTML = currentJsonObject.host_name;

  //create the panel within the button
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

  var parent = document.getElementById(parentId);
  //Append the button element and panel to the sideNav
  parent.appendChild(element);
  parent.appendChild(pan);
}

//simple function, just adds a bit of space
function addBreak(parentId) {
  var br = document.createElement("br");
  var parent = document.getElementById(parentId);
  parent.appendChild(br);
}

//sort an array by a given key
function sortByKey(array, key) {
return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? 1 : ((x > y) ? -1 : 0)); //flipped negatives so that most negative is at top
});
}


window.onload = function () {

  //make parent the sidenav
  var parent = document.getElementById('mySidenav');

  //split json object into two arrays
  var station1 = [];
  var station2 = [];
  //station1.push(jsonObject[1]);
  //console.log(station1);

  for (var j = 0; j < Object.keys(jsonObject).length; j++) {
    if (j%2 == 0){
      station1.push(jsonObject[j]);
    }else{
      station2.push(jsonObject[j]);
    }
  }
  console.log(station1);
  console.log(station2);

  //sort elements
  station1 = sortByKey(station1, 'check_execution_time');
  station1 = sortByKey(station1, 'current_state');

  station2 = sortByKey(station2, 'check_execution_time');
  station2 = sortByKey(station2, 'current_state');


// this is hard coded right now - will be changed so that each time a station is clicked, the menu updates info
  var menuKMLName = document.createElement("H1");
  menuKMLName.innerHTML = "Wheel Alignment";
  menuKMLName.setAttribute("style", "text-align:center;font-size: 24px;");
  parent.appendChild(menuKMLName);

  var menuStationName = document.createElement("H2");
  menuStationName.innerHTML = "Station 1";
  menuStationName.setAttribute("style", "text-align:Left;font-size: 18px; padding: 0 15px;");
  parent.appendChild(menuStationName);


  //jsonObject = sortByKey(jsonObject, 'check_execution_time');
  //jsonObject = sortByKey(jsonObject, 'current_state');

  //on load of sideNav, create buttons
  /*for (var j = 0; j < Object.keys(jsonObject).length; j++) {
    var temp = 'mybutton' + j;
    createButtons('button', jsonObject[j], 'mySidenav');
  }
  addBreak('mySidenav');*/

  //populate station1
  for (var j = 0; j < station1.length; j++) {
    var temp = 'mybutton' + j;
    createButtons('button', station1[j], 'mySidenav');
  }
  addBreak('mySidenav');

  var menuStationName2 = document.createElement("H2");
  menuStationName2.innerHTML = "Station 2";
  menuStationName2.setAttribute("style", "text-align:Left;font-size: 18px; padding: 0 15px;");
  parent.appendChild(menuStationName2);

  for (var j = 0; j < station2.length; j++) {
    var temp = 'mybutton' + j;
    createButtons('button', station2[j], 'mySidenav');
  }
  addBreak('mySidenav');

//enables clicking and opening accordion
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
