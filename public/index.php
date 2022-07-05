<?php

use controller\errorController;
use models\routing;

require_once("../private/models/autoloader.php");

if(!isset($_SESSION)) {
    session_start();
}

routing::methodNotAllowed(static function () {
    $error = new errorController();
    $error->notAllowedAction();
});

routing::pathNotFound(static function () {
    $error = new errorController();
    $error->notFoundAction();
});

routing::add('/', static function () {
    $home = new controller\mainmenuController();
    $home->showAction();
});

routing::add('/singleplayer', static function () {
    $home = new controller\singleplayerController();
    $home->showAction();
});

try {
    routing::run('/');
} catch(Exception $ex) {
    $ErrorController = new errorController();
    $ErrorController->notAllowedAction();
}