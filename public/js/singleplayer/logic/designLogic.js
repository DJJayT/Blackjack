class designLogic {
    
    static canvasWidth = 0;
    static canvasHeight = 0;
    cardsDealer = Array();
    cardsPlayer = Array();
    
    colorNames = ["Herz", "Karo", "Kreuz", "Pik"];
    
    constructor() {
        this.resizeCanvas();
        $(window).resize(function () {
            this.resizeCanvas();
        }.bind(this));
        this.loadCards();
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
    
    loadCards() {
        $(function () {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 13; j++) {
                    let symbol = this.getSymbol(j);
                    let cardImg = "../../../public/img/" + symbol + "_" + this.colorNames[i] + ".png";
                    let img = new Image(27, 42);
                    img.src = cardImg;
                    
                    $("#gameField").append(img);
                    
                    
                }
            }
        }.bind(this));
    }
    
    resizeCanvas() {
        designLogic.canvasWidth = (window.innerWidth / 100) * 80;
        designLogic.canvasHeight = (window.innerHeight / 100) * 40;
        $(function () {
            let canvas = document.getElementById("gameField");
            canvas.width = designLogic.canvasWidth;
            canvas.height = designLogic.canvasHeight;
            this.showCards(this.cardsPlayer, this.cardsDealer);
        }.bind(this));
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
        let x = cardLength * 14; //Testfunktion
        let y = (designLogic.canvasHeight - 70) - (cardLength * 13);
        
        let symbol = this.getSymbol(card.symbol);
        let cardImg;
        cardImg = symbol + "_" + this.colorNames[card.color] + ".png";
        
        let img = new Image(27, 42);
        img.src = "../../../public/img/" + cardImg;
        
        card.setDrawVariables(x, y, img);
    }
    
    showCards(cardsPlayer, cardsDealer) {
        this.cardsPlayer = cardsPlayer; //Für Resize-Event
        this.cardsDealer = cardsDealer;
        
        let canvas = document.getElementById("gameField");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        console.log(cardsPlayer);
        
        let reversed = cardsPlayer.reverse();
        cardsPlayer.forEach(function (card) {
            ctx.drawImage(card.imageObject, card.getX(), card.y, 45, 70);
        });
        
        
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
            
            if (higherValue === secondValue) {
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