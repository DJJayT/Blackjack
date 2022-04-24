class actions {

    gameLogic;
    firstStart = true;
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
            $(".playchip").each(function() {
                $(this).on("click", function() {
                    self.chipClicked(this);
                });
            });
            $("#back").on("click", function() {
                self.revokeBet();
            });
            $("#mainbet").on("click", function () {
                self.bet();
            });
            $("#sidebet_pair").on("click", function () {
                self.sidebetPair();
            });
            $("#sidebet_213").on("click", function () {
                self.sidebet213();
            });
            $("#repeat2x").on("click", function() {
                self.sameBetOrDouble();
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
        this.gameLogic.hitPlayer();
    }

    standButtonClicked() {
        this.gameLogic.playerStands();
    }

    splitButtonClicked() {
        this.gameLogic.splitPlayerCards();
    }

    doubleButtonClicked() {
        this.gameLogic.doublePlayer();
    }

    bet() {
        if(this.currentBetValue !== null) {
            this.gameLogic.playerBet(this.currentBetValue);
        }
    }

    sidebet213() {
        if(this.currentBetValue !== null) {
            this.gameLogic.playerSidebet213(this.currentBetValue);
        }
    }

    sidebetPair() {
        if(this.currentBetValue !== null) {
            this.gameLogic.playerSidebetPair(this.currentBetValue);
        }
    }

    revokeBet() {
        this.gameLogic.revokeBet();
    }

    chipClicked(chip) {
        $(chip).addClass("clicked");
        if(this.currentBetClicked !== chip && this.currentBetClicked !== null) {
            $(this.currentBetClicked).removeClass("clicked");
        }

        let tempVar = chip.id.split("chip");
        this.currentBetValue = parseInt(tempVar[1]);
        this.currentBetClicked = chip;
    }

    startGame() {
        if(this.firstStart === true) {
            this.clickButtons();
            this.firstStart = false;
        }
        if(this.gameLogic.startGame()) {
            this.currentBetValue = null;
            this.currentBetClicked = null;
        }
    }
    
    sameBetOrDouble() {
        this.gameLogic.betSameAmountOrDouble();
    }
}