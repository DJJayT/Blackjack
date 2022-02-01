class actions {

    gameLogic;
    currentBetValue = null;
    currentBetClicked = null;

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
                $(this).on("click", function() {
                    self.chipClicked(this);
                });
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
        if(this.currentBetValue !== null) {
            this.gameLogic.playerBet(this.currentBetValue);
        }
    }

    chipClicked(chip) {
        $(chip).addClass("clicked");
        if(this.currentBetClicked !== chip && this.currentBetClicked !== null) {
            $(this.currentBetClicked).removeClass("clicked");
        }

        let tempVar = chip.id.split("chip");
        this.currentBetValue = parseInt(tempVar[1]);
        this.currentBetClicked = chip;
        console.log(this.currentBetClicked);
    }

    startGame() {
        this.gameLogic.startGame();
    }
}