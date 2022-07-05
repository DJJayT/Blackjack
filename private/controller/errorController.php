<?php

namespace controller;

class errorController extends baseController
{
    public function notFoundAction(): void
    {
        $this->renderViewAction("general/generalhead.html");
        $this->renderViewAction("Die Seite wurde nicht gefunden");
        $this->renderViewAction("general/generalfooter.html");
    }
    
    public function notAllowedAction(): void
    {
        $this->renderViewAction("general/generalhead.html");
        $this->renderViewAction("Error 403 - Die Anforderung ist nicht erlaubt");
        $this->renderViewAction("general/generalfooter.html");
    }
}