
<?php
$url = "WheelAlignment1.kml";
$contents = file_get_contents($url);
$xml      = new SimpleXMLElement($contents);

$value = (array) $xml->Document->Placemark->Polygon->outerBoundaryIs->LinearRing->coordinates;


$coords   = array();
foreach($value as $coord) {    
    	$args     = explode(" ", $coord);
   	$innercoords = array();

	foreach($args as $arg) {    
	    	$arg     = explode(",", $arg);
	    	$innercoords[] = array($arg[0], $arg[1], $arg[2]);
		print_r($innercoords);
	}

}



?>
<br></br>
<br><a href="index.php">Go back to the Main Page</a></br>
