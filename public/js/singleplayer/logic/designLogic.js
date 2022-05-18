class designLogic {
    
    static canvasWidth = 0; //Breite des Canvas
    static canvasHeight = 0; //Höhe des Canvas
    playerMoney = 2000; //Anzahl Geld vom Spieler
    cardsDealer = Array(); //Die gezogenen Karten des Dealers
    cardsPlayer = Array(); //Die gezogenen Karten des Spielers
    splittedCardsPlayer = Array(); //Die gezogenen Karten des Spielers auf 2. Hand (gesplittete Hand)
    valueScoreSplitted = ""; //Kartenwert gesplittete Hand
    split = false; //Ist split getätigt worden?
    valueTextDealer = ""; //Kartenwert Dealer
    valueTextPlayer = ""; //Kartenwert Spieler
    
    colorNames = ["Herz", "Karo", "Kreuz", "Pik"]; //Namen der Karten um ID einem Bild zuzuweisen
    
    /***
     * Setzt Funktionen auf bestimmte Events (Klick, Resize) um das Spiel spielen zu können
     */
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
    
    /***
     * Gibt das Bildsymbol passend zur ID
     * @param cardSymbol
     * @returns {string|int}
     */
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
    
    /***
     * Lässt die Bilder alle Preloaden, sodass diese direkt genutzt werden können
     */
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
    
    /***
     * Zeichnet das Canvas neu anhand der Größe des geänderten Fensters
     */
    resizeCanvas() {
        designLogic.canvasWidth = (window.innerWidth / 100) * 80;
        designLogic.canvasHeight = (window.innerHeight / 100) * 50;
        $(function () {
            let canvas = document.getElementById("gameField");
            canvas.width = designLogic.canvasWidth;
            canvas.height = designLogic.canvasHeight;
            this.updateTable(this.cardsPlayer, this.cardsDealer, this.valueTextPlayer, this.valueTextDealer, this.splittedCardsPlayer, this.valueScoreSplitted);
        }.bind(this));
    }
    
    /***
     * Fügt eine Karte dem Spielfeld anhand der Parameter hinzu
     * @param card
     * @param cardLength
     * @param x
     * @param y
     * @param showCard
     * @param cardFromDealer
     */
    addCard(card, cardLength, x, y, showCard = true, cardFromDealer = false) {
        let symbol = this.getSymbol(card.symbol);
        let cardImg = symbol + "_" + this.colorNames[card.color] + ".png";
        
        let img = new Image(27, 42);
        img.src = "../../../public/img/" + cardImg;
        
        card.setDrawVariables(x, y, img, showCard, cardFromDealer);
    }
    
    /***
     * Fügt dem Dealer eine Karte hinzu und gibt der Karte die Zeichnungsparameter
     * @param card
     * @param cardLength
     * @param showCard
     */
    addCardDealer(card, cardLength, showCard = true) {
        let x = cardLength * 15;
        let y = 40;
        
        this.addCard(card, cardLength, x, y, showCard, true);
    }
    
    /***
     * Fügt dem Dealer die versteckte Karte hinzu
     * @param card
     * @param cardLength
     */
    addDealerHiddenCard(card, cardLength) {
        let x = cardLength * 15;
        let y = 40;
        let cardImg = "Cardback.png";
        
        let img = new Image(27, 42);
        img.src = "../../../public/img/" + cardImg;
        
        card.setDrawVariables(x, y, img, false, true);
    }
    
    /***
     * Fügt dem Spieler eine Karte hinzu und gibt der Karte die Zeichnungsparameter
     * @param card
     * @param cardLength
     * @param double
     * @param split
     * @param splitStandFirstHand
     * @param cardLengthSplit
     */
    addCardPlayer(card, cardLength, double, split, splitStandFirstHand, cardLengthSplit) {
        let y = cardLength * 14 + 40;
        let x = 14;
        
        if(double === false && split === false) {
            x = cardLength * 14;
        }
        
        if(split === true) {
            if(splitStandFirstHand === false) {
                x = cardLength * 14 + 56;
            } else {
                x = cardLengthSplit * 14 - 49;
                y = cardLengthSplit * 14 + 40;
            }
        }
        
        this.addCard(card, cardLength, x, y);
    }
    
    /***
     * Lässt das Geld des Spielers auf dem Spielfeld anzeigen
     * @param playerMoney
     * @param reset
     */
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
    
    /***
     * Zeichnet den ganzen Tisch einmal neu mit den gegebene Parametern wie den Karten
     * @param cardsPlayer
     * @param cardsDealer
     * @param scorePlayer
     * @param scoreDealer
     * @param cardsSplitted
     * @param scoreSplitted
     */
    updateTable(cardsPlayer, cardsDealer, scorePlayer, scoreDealer, cardsSplitted = Array(), scoreSplitted = "") {
        this.cardsPlayer = cardsPlayer; //Für Resize-Event
        this.cardsDealer = cardsDealer;
        this.valueTextPlayer = scorePlayer;
        this.valueTextDealer = scoreDealer;
        this.splittedCardsPlayer = cardsSplitted;
        this.valueScoreSplitted = scoreSplitted;
        
        let canvas = document.getElementById("gameField");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.showMoney(this.playerMoney, false);
        
        setTimeout(function() {
            this.showCardsFromArray(cardsPlayer, ctx);
            this.showCardsFromArray(cardsDealer, ctx);
            if(cardsSplitted.length !== 0) {
                this.showCardsFromArray(cardsSplitted, ctx);
            }
        }.bind(this), 50);
        
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(scoreDealer, designLogic.canvasWidth / 2, 30);
        if(cardsSplitted.length === 0) {
            ctx.fillText(scorePlayer, designLogic.canvasWidth / 2, designLogic.canvasHeight - 20);
        } else {
            ctx.fillText(scorePlayer, designLogic.canvasWidth / 2 + 50, designLogic.canvasHeight - 20);
            ctx.fillText(scoreSplitted, designLogic.canvasWidth / 2 - 50, designLogic.canvasHeight - 20);
        }
        
        ctx.fillText(gameLogic.gameDisplay, designLogic.canvasWidth / 2, designLogic.canvasHeight / 2);
    }
    
    /***
     * Zeichnet alle Karten anhand des gegebenen Arrays
     * @param cards
     * @param ctx
     */
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
    
    /***
     * Setzt die Zahl der Einsatzchips auf 0
     */
    resetBets() {
        $("#mainbet_text").text(0);
        $("#sidebet_213_text").text(0);
        $("#sidebet_pair_text").text(0);
    }
    
    /***
     * Zeigt den Einsatz auf dem Haupteinsatz Chip
     * @param totalBet
     */
    showBet(totalBet) {
        $("#mainbet_text").text(totalBet);
    }
    
    /***
     * Zeigt den Einsatz auf dem 21+3 Sidebet
     * @param totalBet
     */
    showSidebet213(totalBet) {
        $("#sidebet_213_text").text(totalBet);
    }
    
    /***
     * Zeigt den Einsatz auf dem Perfect-Pair Sidebet
     * @param totalBet
     */
    showSidebetPair(totalBet) {
        $("#sidebet_pair_text").text(totalBet);
    }
    
    /***
     * Funktion um das Spiel Design-seitig zu starten (Buttons deaktivieren etc.)
     */
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
    
    /***
     * Funktion um das Spiel Design-seitig zu beenden (Buttons wieder aktivieren etc.)
     */
    gameEnd() {
        $("#chips").removeClass("hidden");
        $("#startGame").removeClass("hidden");
        $("#mainbet").addClass("clickable");
        $(".sidebet").addClass("clickable");
        
        this.resetBets();
    }
    
    /***
     * Versteckt die Buttons, welche zum Spielen benutzt werden
     */
    hideGameButtons() {
        let gameButtons = $(".gameButton");
        
        gameButtons.css({"width": 0});
        gameButtons.css({"height": 0});
        gameButtons.addClass("hidden");
        
    }
    
    /***
     * Zeigt die Buttons, welche zum Spielen benutzt werden
     */
    showGameButtons() {
        let gameButtons = $(".gameButton");
        
        gameButtons.css({"width": "75px"});
        gameButtons.css({"height": "50px"});
        gameButtons.removeClass("hidden");
    }
    
    /***
     * Setzt das Design-Spielerguthaben auf das tatsächliche momentane Spielerguthaben
     * @param playerMoney
     */
    setNewMoney(playerMoney) {
        this.playerMoney = playerMoney;
    }
    
    /***
     * Setzt den Einsatz nochmal nach dem Split um
     * @param playerBet
     */
    setSplitBet(playerBet) {
        $("#mainbet_text").text(playerBet + "/" + playerBet);
    }
    
}