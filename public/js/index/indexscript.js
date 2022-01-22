class indexscript {

    constructor() {
        this.clickButtons();
    }

    clickButtons() {
        let self = this;
        $(document).ready(function () {
            $("#singleplayer").on("click", function () {
                window.location.href='/singleplayer/';
            });
            $("#multiplayer").on("click", function() {
               $(this).text("Noch in Arbeit!");
            });
        })
    }

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }


}