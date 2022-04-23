class gameLogic {
    
    static gameRunning = false;
    static gameDisplay = "";
    designLogic;
    cardShoe;
    player;
    dealer;
    playPerfectPair = false;
    play213 = false;
    
    
    constructor() {
        this.designLogic = new designLogic();
        this.cardShoe = new cardShoe();
        this.player = new player();
        this.dealer = new dealer();
    }
    
    hitPlayer() {
        let card = this.cardShoe.getRandomCard();
        this.player.hit(card);
        this.designLogic.addCardPlayer(card, this.player.cards.length);
        let playerValue = this.player.getCardValues();
        this.checkNextStep(playerValue);
        this.player.createCardValueText();
        
        this.dealerCardCheck();
        this.designLogic.updateTable(this.player.cards, this.dealer.cards, this.player.valueText, this.dealer.valueText);
    }
    
    hitDealer(showCard = true) {
        let card = this.cardShoe.getRandomCard();
        if (showCard) {
            this.designLogic.addCardDealer(card, this.dealer.cards.length);
        } else {
            this.designLogic.addDealerHiddenCard(card, this.dealer.cards.length);
        }
        this.dealer.hit(card);
        this.dealer.createCardValueText();
        
        this.dealerCardCheck();
        this.designLogic.updateTable(this.player.cards, this.dealer.cards, this.player.valueText, this.dealer.valueText);
    }
    
    doublePlayer() {
        if(this.player.money >= this.player.bet && this.player.checkDoublePossible()) {
            this.player.money -= this.player.bet;
            this.player.bet += this.player.bet;
            this.hitPlayer();
            this.playerStands();
        } else {
            alert("Dein Einsatz reicht dafür nicht aus!");
        }
    }
    
    showButtons() {
    
    }
    
    checkNextStep(playerValue) {
        let checkValue = this.player.getCardValuesRemovedAces(playerValue);
        setTimeout(function() {
            if (checkValue === 21) {
                this.playerStands();
            } else if (checkValue > 21) {
                this.playerStands();
            }
        }.bind(this), 50);
    }
    
    playerStands() {
        gameLogic.gameRunning = false;
        this.player.createCardValueText();
        this.designLogic.hideGameButtons();
        this.playCardsDealer();
    }
    
    playCardsDealer() {
        this.designLogic.addCardDealer(this.dealer.cards[1], this.dealer.cards.length - 1);
        this.dealer.createCardValueText();
        while (this.dealer.getCardValuesRemovedAces() < 17 && !(this.player.getCardValuesRemovedAces() > 21)) {
            this.hitDealer();
        }
        this.dealer.createCardValueText();
        this.designLogic.updateTable(this.player.cards, this.dealer.cards, this.player.valueText, this.dealer.valueText);
        this.gameEnd();
    }
    
    startGame() {
        console.log(this.player.money);
        if (this.cardShoe.nextRoundShuffle) {
            this.cardShoe.dealerCardPlayed();
        }
        
        gameLogic.gameDisplay = "";
        if (this.player.bet === 0) {
            alert("Du musst zuerst einen Haupteinsatz tätigen!");
            return;
        }
        this.player.cards = Array();
        this.dealer.cards = Array();
        gameLogic.gameRunning = true;
        this.designLogic.startGame(); //Bet-Chip muss noch Clicked etc. entfernt werden
        this.dealCards();
        
        
        //Check Perfect Pair
        if (this.playPerfectPair === true) {
            console.log(this.player.checkPairHit());
        }
        
        //Check 21+3
        if (this.player.play213 === true) {
            console.log("Cumming soon");
        }
        
    }
    
    dealCards() {
        this.hitPlayer();
        this.hitDealer();
        this.hitPlayer();
        this.hitDealer(false);
    }
    
    playerBet(betValue) {
        let betTotal = this.player.addBet(betValue);
        this.designLogic.showBet(betTotal);
        this.designLogic.showMoney(this.player.money);
    }
    
    playerSidebet213(betValue) {
        let betTotal = this.player.addSidebet213(betValue);
        this.designLogic.showSidebet213(betTotal);
        this.designLogic.showMoney(this.player.money);
        this.play213 = true;
        //21+3 rechter Side Bet
        //Not working atm
    }
    
    playerSidebetPair(betValue) {
        let betTotal = this.player.addSidebetPair(betValue);
        this.designLogic.showSidebetPair(betTotal);
        this.designLogic.showMoney(this.player.money);
        this.playPerfectPair = true;
        //PerfectPair linker Side Bet
    }
    
    revokeBet() {
        this.player.revokeBets();
        this.designLogic.resetBets();
        this.designLogic.showMoney(this.player.money);
    }
    
    calculateWin() {
        let playerScore = this.player.getCardValuesRemovedAces();
        let dealerScore = this.dealer.getCardValuesRemovedAces();
        
        if (playerScore <= 21) { //Checks if Player busts
            if (dealerScore <= 21) { //Checks if dealer busts
                let playerBlackjack = this.player.checkBlackjack();
                let dealerBlackjack = this.dealer.checkBlackjack();
                
                if (playerBlackjack && !dealerBlackjack) { //Blackjack checks
                    gameLogic.gameDisplay = "You won! - Blackjack";
                    this.player.money += this.player.bet * 2.5;
                    return;
                }
                if (playerBlackjack && dealerBlackjack) {
                    gameLogic.gameDisplay = "Push!";
                    this.player.money += this.player.bet;
                    return;
                }
                if (!playerBlackjack && dealerBlackjack) {
                    gameLogic.gameDisplay = "You lost!";
                    return;
                }
                
                if (playerScore === dealerScore) { //Score checks
                    gameLogic.gameDisplay = "Push!";
                    this.player.money += this.player.bet;
                    return;
                }
                if (playerScore > dealerScore) {
                    gameLogic.gameDisplay = "You won!";
                    this.player.money += this.player.bet * 2;
                    return;
                }
                if (dealerScore > playerScore) {
                    gameLogic.gameDisplay = "You lost!";
                    return;
                }
            }
            gameLogic.gameDisplay = "You won!";
            this.player.money += this.player.bet * 2;
            return;
        }
        gameLogic.gameDisplay = "You lost!";
    }
    
    gameEnd() {
        this.calculateWin();
        this.player.resetBets();
        this.designLogic.gameEnd();
        this.designLogic.setNewMoney(this.player.money);
        this.designLogic.updateTable(this.player.cards, this.dealer.cards, this.player.valueText, this.dealer.valueText);
    }
    
    dealerCardCheck() {
        if (!this.cardShoe.nextRoundShuffle) {
            if (this.cardShoe.checkDealerCardPlayed()) {
                this.cardShoe.nextRoundShuffle = true;
                gameLogic.gameDisplay = "Card-shuffle next round!";
            }
        }
    }
}