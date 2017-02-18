<?php
include 'movies.php';

$movies = new SimpleXMLElement($xmlstr);

echo $movies->movie[0]->plot;
?>