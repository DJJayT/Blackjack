class actions {

    gameLogic;

    constructor() {
        this.mainButtonsClicked();
        this.clickChips(); //Muss zu clickChips gechanged werden
        this.gameLogic = new gameLogic();
    }

    mainButtonsClicked() {
        let self = this;
        $(document).ready(function() {
            $("#backToMenuButton").on("click", function () {
                window.location.href='../';
            });
            $("#startGame").on("click", function() {
                self.startGame();
            });
        });
    }

    clickChips() {
        let self = this;
        $(document).ready(function() {
            $("#bet").on("click", function () {
                self.bet();
            });
            $(".playchip").each(function() {
                self.chipClicked(this);
            });
        });
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
        this.gameLogic.test();
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

    bet() {
        console.log("Yee");
    }

    chipClicked(chip) {
        console.log(chip.id);
    }

    startGame() {
        this.gameLogic.startGame();
    }
}