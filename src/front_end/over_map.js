function w3_open() {
  document.getElementById("mySidenav").style.width = "300px";
  document.getElementById("mySidenav").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidenav").style.display = "none";
}
var json_obj_str = JSON.stringify($myJsonObject);
console.log(json_obj_str);

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
