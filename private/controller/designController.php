<?php

namespace controller;

class designController extends baseController
{
    /**
     * Creates the gamefield on load
     */
    function createAction()
    {
        $this->renderViewAction("general/generalhead.html");
        $this->renderViewAction("index/indexhead.html");
        $this->renderViewAction("index/indexbody.html");
        $this->renderViewAction("general/generalfooter.html");
    }

    /**
     * Shows an error for wrong inputs
     */
    function errorAction()
    {
        $this->renderViewAction("general/generalhead.html");
        $this->renderViewAction("Bitte geb keinen Blödsinn ein");
        $this->renderViewAction("general/generalfooter.html");
    }

    function singleplayerAction() {
        $this->renderViewAction("general/generalhead.html");
        $this->renderViewAction("singleplayer/singleplayerhead.html");
        $this->renderViewAction("singleplayer/singleplayerbody.html");
        $this->renderViewAction("general/generalfooter.html");
        //Hier Code schreiben
    }

    function multiplayerAction() {
        //Hier Code schreiben
    }
}