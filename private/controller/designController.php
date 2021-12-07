<?php

namespace controller;

class designController extends baseController
{
    /**
     * Creates the gamefield on load
     */
    function createAction()
    {
        $this->renderViewAction("indexhead.html");
    }

    /**
     * Shows an error for wrong inputs
     */
    function errorAction()
    {
        $this->renderViewAction("Bitte geb keinen Blödsinn ein");
    }
}