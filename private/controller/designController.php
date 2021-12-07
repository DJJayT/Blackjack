<?php

namespace controller;

use views\gridBeginning;

class designController extends baseController
{
    /**
     * Creates the gamefield on load
     */
    function createAction()
    {
        $this->renderViewAction("bodyhead.html");
    }

    /**
     * Shows an error for wrong inputs
     */
    function errorAction()
    {
        $this->renderViewAction("Bitte geb keinen Blödsinn ein");
    }
}