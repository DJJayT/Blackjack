<?php

use models\routing;

require_once("../private/models/autoloader.php");

/***
 * TODO:
 * Diese Datei überarbeiten
 */

if(!isset($_SESSION)) {
    session_start();
}

try {
    new routing();
} catch(Exception $ex) {
    return;
}