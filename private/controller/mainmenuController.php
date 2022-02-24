<?php

namespace controller;

class mainmenuController extends baseController
{
    /**
     * Creates the main-menu
     */
    public function showAction(): void
    {
        $this->renderViewAction("general/generalhead.html");
        $this->renderViewAction("index/indexhead.html");
        $this->renderViewAction("index/indexbody.html");
        $this->renderViewAction("general/generalfooter.html");
    }
}