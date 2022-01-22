<?php
require_once("../private/models/autoloader.php");

/***
 * TODO:
 * Check wenn Spieler im Multiplayer war (Session) und wieder in Lobby bringen
 */

session_start();

$urlParams = explode('/', $_SERVER['REQUEST_URI']);

$controllerCreate = "\controller\design";
$function = "create";

if ($urlParams[1] != null) {
    if (($urlParams[1] == "singleplayer" ||                     //Hier wird Singleplayer und/oder Multiplayer geladen
            $urlParams[1] == "multiplayer") &&
        (count($urlParams) == 2 ||                              //Hier wird geschaut ob nicht noch etwas anderes ausgeführt wird oder ob es leer ist
            $urlParams[2] == null)) {

        $design = new \controller\designController();
        $function = $urlParams[1] . "Action";
        $design->$function();

    } else if (class_exists("controller\\" . $urlParams[1] . "Controller")) { //Hier ist dynamisch für alles weitere
        $controller = $urlParams[1];
        $controllerCreate = "controller\\" . $controller . "Controller";
        $controller = new $controllerCreate();
        if (isset($urlParams[2]) && method_exists($controller, $urlParams[2] . "Action")) {
            $function = $urlParams[2] . "Action";
            $controller->$function();
        } else {
            $design = new \controller\designController(); //Fehler falls nicht gefunden
            $design->errorAction();
        }
    } else {
        $design = new \controller\designController(); //Fehler falls nicht gefunden
        $design->errorAction();
    }
} else {
    $controllerCreate = $controllerCreate . "Controller"; //Standardaktion (Startseite laden)
    $function = $function . "Action";
    $controller = new $controllerCreate();
    $controller->$function();
}