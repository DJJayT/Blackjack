class designLogic {

    static canvasWidth = 0;
    static canvasHeight = 0;

    colorNames = ["Herz", "Karo", "Kreuz", "Pik"];

    constructor() {
        this.resizeCanvas();
        $(window).resize(function() {
            this.resizeCanvas();
        }.bind(this));
    }

    resizeCanvas() {
        designLogic.canvasWidth = (window.innerWidth / 100) * 80;
        designLogic.canvasHeight = (window.innerHeight / 100) * 40;
        $(function () {
            let canvas = document.getElementById("gameField");
            let canvasBorder = document.getElementById("canvasBorder");
            canvas.width = designLogic.canvasWidth;
            canvas.height = designLogic.canvasHeight;
            canvasBorder.width = designLogic.canvasWidth;
            canvasBorder.height = designLogic.canvasHeight;
        });
    }

    getSymbol(cardSymbol) {
        switch (cardSymbol) {
            case 0:
                return "A";
            case 10:
                return "J";
            case 11:
                return "Q";
            case 12:
                return "K";
            default:
                return cardSymbol + 1;
        }
    }

    showCardDealer(card) {
        let symbol = this.getSymbol(card.symbol);
        let cardImg;
        cardImg = symbol + "_" + this.colorNames[card.color] + ".png";
        //this.showCard(cardImg, "dealer");
    }

    showDealerHiddenCard() {
        $("#dealercards").append("<img id='cardToAdd' class='card' src='../../../public/img/Hintergrund.png' width='50px'>");


    }

    addCardPlayer(card, cardLength) {

        let x = 10 + (cardLength * 30); //Testfunktion
        let y = 50 - (cardLength * 30);

        let symbol = this.getSymbol(card.symbol);
        let cardImg;
        cardImg = symbol + "_" + this.colorNames[card.color] + ".png";

        let img = new Image(10, 15);
        img.src = "../../../public/img/" + cardImg;

        card.setDrawVariables(x, y, img);
    }

    showCards(cardsPlayer, cardsDealer) {
        let canvas = document.getElementById("gameField");
        console.log(canvas.width, canvas.height);
        let ctx = canvas.getContext("2d");
        ctx.fillRect(10, 10, 10, 10);


        /*cardsPlayer.forEach(function(card) {
            card.imageObject.onload = function() {
                ctx.drawImage(card.imageObject, card.x, card.y, 30, 10)
            }
        });*/


    }

    showBet(totalBet) {
        $("#mainbet_text").text(totalBet);
    }

    showSidebet213(totalBet) {
        $("#sidebet_213_text").text(totalBet);
    }

    showSidebetPair(totalBet) {
        $("#sidebet_pair_text").text(totalBet);
    }

    showMoney(playerMoney) {
        $("#playermoney").text(playerMoney);
    }

    startGame() {
        $("#chips").addClass("hidden");
        $("#startGame").addClass("hidden");
        $("#buttons").removeClass("hidden");
        $("#mainbet").removeClass("clickable");
        $(".sidebet").removeClass("clickable");
    }

    showCardValuePlayer(value, aces) {
        if (value < 21 && aces >= 1) {
            let secondValue = value - 10;
            $("#playercardsvalue").text(secondValue + "/" + value);

        } else if (value > 21 && aces >= 1) {
            let secondValue = value - (aces * 10);
            let higherValue = value;

            do {
                if (aces >= 1) {
                    higherValue -= 10;
                    aces--;
                }
            } while (value <= 21 || aces == 0);

            if (higherValue == secondValue) {
                $("#playercardsvalue").text(value);
            } else {
                $("#playercardsvalue").text(secondValue + "/" + higherValue);
            }
        } else {
            $("#playercardsvalue").text(value);
        }
    }

    hideGameButtons() {
        $("#buttons").addClass("hidden");
    }

    showGameButtons() {
        $("#buttons").removeClass("hidden");
    }
}