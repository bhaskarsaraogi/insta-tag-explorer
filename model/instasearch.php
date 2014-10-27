<?php
header('Content-type: application/json');
include 'functions.php';
$client = "Enter the client id here";
$query = $_POST['query'];

$api = "https://api.instagram.com/v1/tags/".$query."/media/recent?client_id=".$client;

$response = get_curl($api);
$images = array();

if($response){
	foreach(json_decode($response)->data as $item){
        $src = $item->images->standard_resolution->url;
        $thumb = $item->images->thumbnail->url;
		$url = $item->link;

        $images[] = array(
        "src" => htmlspecialchars($src),
        "thumb" => htmlspecialchars($thumb),
        "url" => htmlspecialchars($url)
        );

    }
}

print_r(str_replace('\\/', '/', json_encode($images)));
die();
?>