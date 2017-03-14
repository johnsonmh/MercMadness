<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>KML Click Capture Sample</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="w3_edited.css">
  <script type='text/javascript' src='over_map.js'></script>

</head>
<body>

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

<script type='text/javascript' src='jquery-3.1.1.min.js'></script>
<script type='text/javascript' src='over_map.js'></script>
<script type='text/javascript' src='config.js'></script>
<script type='text/javascript' src='geoxml3.js'></script>
<script type='text/javascript' src='dashboard_map.js'></script>

</body>
</html>
