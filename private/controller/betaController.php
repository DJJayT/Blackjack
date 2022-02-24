<?php

namespace controller;

class betaController extends baseController
{
    public function showAction(): void
    {
        $this->renderViewAction("general/generalhead.html");
        $this->renderViewAction("beta/betaheader.php");
        $this->renderViewAction("singleplayer/singleplayerhead.html");
        $this->renderViewAction("beta/betabody.html");
        $this->renderViewAction("general/generalfooter.html");
        //Hier Code schreiben
    }
}