<?php

namespace controller;

class baseController
{

    /**
     * Shows the frontend to the user
     * @param $html
     * @param null $params
     */
    public function renderViewAction($html, $params = null): void
    {

        //Shows the frontend to the user
        if(file_exists("../private/views/".$html)) {
            $extension = pathinfo($html, PATHINFO_EXTENSION);
            $html = "../private/views/".$html;
            if ($extension == "php") {
                include $html;
            } else {
                echo file_get_contents($html);
            }
        } else {
            echo $html;
        }
    }
}