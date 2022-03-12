class designLogic {

    colorNames = ["Herz", "Karo", "Kreuz", "Pik"];

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
        this.showCard(cardImg, "dealer");
    }

    showDealerHiddenCard() {
        $("#dealercards").append("<img id='cardToAdd' class='card' src='../../../public/img/Hintergrund.png' width='50px'>");
    
        
    }

    showCardPlayer(card) {
        let symbol = this.getSymbol(card.symbol);
        let cardImg;
        cardImg = symbol + "_" + this.colorNames[card.color] + ".png";
        this.showCard(cardImg, "player");
    }

    showCard(cardImg, person) {
    
        let ctx = document.getElementById("gameField").getContext("2d");
        let img = new Image();
        img.src= "../../../public/img/" + cardImg;
        img.onload = function() {
            ctx.drawImage(img, 10, 10);
        };
        
        
        
        
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