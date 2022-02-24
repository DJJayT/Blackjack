<?php

namespace models;

use controller\betaController;

/***
 * TODO:
 * Check wenn Spieler im Multiplayer war (Session) und wieder in Lobby bringen
 *
 * Diese Datei muss komplett überarbeitet werden
 */

class routing
{

    public function __construct()
    {
        $urlParams = explode('/', $_SERVER['REQUEST_URI']);

        $controllerCreate = "\controller\mainmenu";
        $function = "show";

        if ($urlParams[1] != null) {

            //Für Canvas
            if($urlParams[1] === "beta") {
                $controller = new betaController();
                $controller->showAction();
                return;
            }





            if (($urlParams[1] === "singleplayer" ||                     //Hier wird Singleplayer und/oder Multiplayer geladen
                    $urlParams[1] === "multiplayer") &&
                (count($urlParams) == 2 ||                              //Hier wird geschaut ob nicht noch etwas anderes ausgeführt wird oder ob es leer ist
                    $urlParams[2] == null)) {

                $controllerCreate = "controller\\" . $urlParams[1] . "Controller";

                $controller = new $controllerCreate();
                $function = "showAction";
                $controller->$function();

            } else if (class_exists("controller\\" . $urlParams[1] . "Controller")) { //Hier ist dynamisch für alles weitere
                $controller = $urlParams[1];
                $controllerCreate = "controller\\" . $controller . "Controller";
                $controller = new $controllerCreate();
                if (isset($urlParams[2]) && method_exists($controller, $urlParams[2] . "Action")) {
                    $function = $urlParams[2] . "Action";
                    $controller->$function();
                } else {
                    $design = new \controller\errorController(); //Fehler falls nicht gefunden
                    $design->showAction();
                }
            } else {
                $design = new \controller\errorController(); //Fehler falls nicht gefunden
                $design->showAction();
            }
        } else {
            $controllerCreate = $controllerCreate . "Controller"; //Standardaktion (Startseite laden)
            $function = $function . "Action";
            $controller = new $controllerCreate();
            $controller->$function();
        }
    }
}