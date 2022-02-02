class indexscript {

    constructor() {
        this.clickButtons();
    }

    clickButtons() {
        $(document).ready(function () {
            $("#singleplayer").on("click", function () {
                window.location.href='/singleplayer/';
            });
            $("#multiplayer").on("click", function() {
               $(this).text("Noch in Arbeit!");
            });
        });
    }
}