<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>KML Click Capture Sample</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="w3_edited.css">
</head>
<body>
  <script src="require.js"></script>
  <script src="config.js"></script>
  <script>
  require(['dashboard_map']);
  </script>
  <div id="over_map">
    <div class="w3-opennav w3-xlarge w3-hide-xlarge w3-right" onclick="w3_open()">&#9776;</div>
    <nav class="w3-sidenav w3-collapse w3-white w3-card-2 w3-animate-right" style="width:0px;right:0;" id="mySidenav">
      <a href="javascript:void(0)" onclick="w3_close()" class="w3-closenav w3-xlarge w3-hide-xlarge">&times;</a>
      <script>
      var jsonObject = <?php include('../back_end/hostTest.php'); echo $myJsonObject; ?>;
      </script>
    </div>
  </div>
</nav>
</div>
<div id="map">
  <div id="capture"></div>
</div>
</body>
</html>
