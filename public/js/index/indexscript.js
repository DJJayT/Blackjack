class indexscript {

    constructor() {
        this.clickButtons();
    }
    
    /***
     * Methode um den Buttons Funktionen zuzusweisen
     */
    clickButtons() {
        $(document).ready(function () {
            $("#singleplayer").on("click", function () {
                window.location.href='/singleplayer/';
            });
            $("#multiplayer").on("click", function() {
               $(this).text("Folgt irgendwann!");
            });
        });
    }
}