<?php
require_once("../private/models/autoloader.php");

$urlParams = explode('/', $_SERVER['REQUEST_URI']);

$controllerCreate = "\controller\design";
$function = "create";

if (isset($urlParams[1])) {
    session_start();

    if (isset($urlParams[2])) {
        $controllerCreate = "\controller\\" . $urlParams[1];
        $function = $urlParams[2];
    }

    $controllerCreate = $controllerCreate . "Controller";
    $function = $function . "Action";

    if(class_exists($controllerCreate) && function_exists($function)) {
        $controller = new $controllerCreate();
        $controller->$function();
    } else {
        $controller = new \controller\designController();
        $controller->createAction();
    }
} else {
    $controllerCreate = $controllerCreate . "Controller";
    $function = $function . "Action";
    $controller = new $controllerCreate();
    $controller->$function();
}