<?php
require_once("../private/models/autoloader.php");

session_start();

$urlParams = explode('/', $_SERVER['REQUEST_URI']);

$controllerCreate = "\controller\design";
$function = "create";

if ($urlParams[1] != null) {
    if (class_exists("controller\\" . $urlParams[1]."Controller")) {
        $controller = $urlParams[1];
        $controllerCreate = "controller\\" . $controller."Controller";
        $controller = new $controllerCreate();
        if (isset($urlParams[2]) && method_exists($controller, $urlParams[2]."Action")) {
            $function = $urlParams[2]."Action";
            $controller->$function();
        } else {
            $design = new \controller\designController();
            $design->errorAction();
        }
    } else {
        $design = new \controller\designController();
        $design->errorAction();
    }
} else {
    $controllerCreate = $controllerCreate."Controller";
    $function = $function."Action";
    $controller = new $controllerCreate();
    $controller->$function();
}