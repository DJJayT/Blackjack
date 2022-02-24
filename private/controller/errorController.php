<?php

namespace controller;

class errorController extends baseController
{
    public function showAction(): void
    {
        $this->renderViewAction("general/generalhead.html");
        $this->renderViewAction("Bitte geb keinen Blödsinn ein");
        $this->renderViewAction("general/generalfooter.html");
    }
}