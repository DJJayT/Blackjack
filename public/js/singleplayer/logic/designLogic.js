class designLogic {
    
    static canvasWidth = 0;
    static canvasHeight = 0;
    playerMoney = 2000;
    cardsDealer = Array();
    cardsPlayer = Array();
    valueTextDealer = "";
    valueTextPlayer = "";
    
    colorNames = ["Herz", "Karo", "Kreuz", "Pik"];
    
    constructor() {
        this.resizeCanvas();
        $(window).resize(function () {
            this.resizeCanvas();
        }.bind(this));
        
        $(function () {
            this.loadCards();
            this.hideGameButtons();
        }.bind(this));
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
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 13; j++) {
                let symbol = this.getSymbol(j);
                let cardImg = "../../../public/img/" + symbol + "_" + this.colorNames[i] + ".png";
                let img = new Image(27, 42);
                img.src = cardImg;
                
                $("#gameField").append(img);
            }
        }
    }
    
    resizeCanvas() {
        designLogic.canvasWidth = (window.innerWidth / 100) * 80;
        designLogic.canvasHeight = (window.innerHeight / 100) * 50;
        $(function () {
            let canvas = document.getElementById("gameField");
            canvas.width = designLogic.canvasWidth;
            canvas.height = designLogic.canvasHeight;
            this.updateTable(this.cardsPlayer, this.cardsDealer, this.valueTextPlayer, this.valueTextDealer);
        }.bind(this));
    }
    
    addCard(card, cardLength, x, y, showCard = true, cardFromDealer = false) {
        console.log(card);
        let symbol = this.getSymbol(card.symbol);
        let cardImg = symbol + "_" + this.colorNames[card.color] + ".png";
        
        let img = new Image(27, 42);
        img.src = "../../../public/img/" + cardImg;
        
        card.setDrawVariables(x, y, img, showCard, cardFromDealer);
    }
    
    addCardDealer(card, cardLength, showCard = true) {
        let x = cardLength * 15;
        let y = 40;
        
        this.addCard(card, cardLength, x, y, showCard, true);
    }
    
    addDealerHiddenCard(card, cardLength) {
        let x = cardLength * 15;
        let y = 40;
        let cardImg = "Cardback.png";
        
        let img = new Image(27, 42);
        img.src = "../../../public/img/" + cardImg;
        
        card.setDrawVariables(x, y, img, false, true);
    }
    
    addCardPlayer(card, cardLength) {
        let x = cardLength * 14;
        let y = cardLength * 13 + 40;
        
        this.addCard(card, cardLength, x, y);
    }
    
    showMoney(playerMoney, reset = true) {
        this.playerMoney = playerMoney;
        let canvas = document.getElementById("gameField");
        let ctx = canvas.getContext("2d");
        
        if(reset) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText(playerMoney, 5, 20);
    }
    
    updateTable(cardsPlayer, cardsDealer, scorePlayer, scoreDealer) {
        this.cardsPlayer = cardsPlayer; //Für Resize-Event
        this.cardsDealer = cardsDealer;
        this.valueTextPlayer = scorePlayer;
        this.valueTextDealer = scoreDealer;
        
        let canvas = document.getElementById("gameField");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.showMoney(this.playerMoney, false);
        
        setTimeout(function() {
            this.showCardsFromArray(cardsPlayer, ctx);
            this.showCardsFromArray(cardsDealer, ctx);
        }.bind(this), 50);
        
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(scorePlayer, designLogic.canvasWidth / 2, designLogic.canvasHeight - 20);
        ctx.fillText(scoreDealer, designLogic.canvasWidth / 2, 30);
        
        ctx.fillText(gameLogic.gameDisplay, designLogic.canvasWidth / 2, designLogic.canvasHeight / 2);
    }
    
    showCardsFromArray(cards, ctx) {
        let height = designLogic.canvasHeight;
        let width = designLogic.canvasWidth;
        
        for (let i = 0; i < cards.length; i++) {
            let card = cards[i];
            setTimeout(function () {
                if ((width === designLogic.canvasWidth && height === designLogic.canvasHeight) && card.imageObject !== null) {
                    ctx.drawImage(card.imageObject, card.getX(), card.getY(), 45, 70);
                }
            }, 50 + i * 50);
        }
    }
    
    resetBets() {
        $("#mainbet_text").text(0);
        $("#sidebet_213_text").text(0);
        $("#sidebet_pair_text").text(0);
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
    
    startGame() {
        this.cardsDealer = Array();
        this.cardsPlayer = Array();
        
        $("#chips").addClass("hidden");
        $("#startGame").addClass("hidden");
        $("#mainbet").removeClass("clickable");
        $(".sidebet").removeClass("clickable");
        $(".playchip").removeClass("clicked");
        this.showGameButtons();
    }
    
    gameEnd() {
        $("#chips").removeClass("hidden");
        $("#startGame").removeClass("hidden");
        $("#mainbet").addClass("clickable");
        $(".sidebet").addClass("clickable");
        
        this.resetBets();
    }
    
    hideGameButtons() {
        let gameButtons = $(".gameButton");
        
        gameButtons.css({"width": 0});
        gameButtons.css({"height": 0});
        gameButtons.addClass("hidden");
        
    }
    
    showGameButtons() {
        let gameButtons = $(".gameButton");
        
        gameButtons.css({"width": "75px"});
        gameButtons.css({"height": "50px"});
        gameButtons.removeClass("hidden");
    }
    
    setNewMoney(playerMoney) {
        this.playerMoney = playerMoney;
    }
}