function w3_open() {
  document.getElementById("mySidenav").style.width = "300px";
  document.getElementById("mySidenav").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidenav").style.display = "none";
}



var acc = document.getElementsByClassName("accordion");
//console.log(acc);

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

/*console.log(Object.keys(jsonObject).length);
for (i = 0; i < Object.keys(jsonObject).length ; i++) {
  console.log(document.getElementById("tryingJson").innerHTML = jsonObject[i].host_name);
}*/

function createButtons(type, currentJsonObject, parentId) {
  var element;
  if (currentJsonObject.current_problem_id == "0"){
    element = document.createElement("buttonGreen");
  }
  else if (currentJsonObject.current_problem_id == "1"){
    element = document.createElement("buttonYellow");
  }
  else{
    element = document.createElement("buttonRed");
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

function addBreak(parentId) {
  var br = document.createElement("br");
  var parent = document.getElementById(parentId);
  parent.appendChild(br);
}

function compareJsonObjects( thisJson, otherJson ){
  if (thisJson.current_problem_id < otherJson.current_problem_id){
    return -1;
  }else if (thisJson.current_problem_id > otherJson.current_problem_id){
    return 1;
  }else {
    return 0;
  }
}

window.onload = function () {
  //need to sort jsobObject so that red buttons are at the top


  //on load of sideNav, create buttons
  for (var j = 0; j < Object.keys(jsonObject).length; j++) {
    var temp = 'mybutton' + j;
    createButtons('button', jsonObject[j], 'mySidenav');
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
