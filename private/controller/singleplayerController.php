<?php

namespace controller;

class singleplayerController extends baseController
{
    public function showAction(): void
    {
        $this->renderViewAction("general/generalhead.html");
        $this->renderViewAction("singleplayer/singleplayerhead.html");
        $this->renderViewAction("singleplayer/singleplayerbody.html");
        //$this->renderViewAction("general/generalfooter.html");
        //Hier Code schreiben
    }
}