<?php
class autoloader {
    static public function loader($className) {
        $filename = "../private/".str_replace("\\", '/', $className) . ".php";
        if (file_exists($filename)) {
            include($filename);
            if (class_exists($className)) {
                return TRUE;
            }
        }
        return FALSE;
    }
}
spl_autoload_register('autoloader::loader');