class actions {

    gameLogic;

    constructor() {
        this.clickButtons(); //Muss zu clickChips gechanged werden
        this.gameLogic = new gameLogic();
    }

    clickChips() {

    }

    clickButtons() {
        let self = this;
        $(document).ready(function () {
            $("#hit").on("click", function () {
                self.hitButtonClicked();
            });
            $("#stand").on("click", function() {
                self.standButtonClicked();
            });
            $("#split").on("click", function() {
                self.splitButtonClicked();
            });
            $("#double").on("click", function() {
                self.doubleButtonClicked();
            });
        });
    }

    hitButtonClicked() {
        console.log("Hit");
    }

    standButtonClicked() {
        console.log("Stand");
    }

    splitButtonClicked() {
        console.log("Split");
    }

    doubleButtonClicked() {
        console.log("Double");
    }





}