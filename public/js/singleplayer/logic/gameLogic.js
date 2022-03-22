class gameLogic {
    
    static gameRunning = false;
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
        console.log(card);
        this.player.createCardValueText();
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
        this.designLogic.updateTable(this.player.cards, this.dealer.cards, this.player.valueText, this.dealer.valueText);
        this.dealer.createCardValueText();
    }

    checkNextStep(playerValue) {
        console.log(playerValue);
        if (playerValue === 21) {
            this.playerStands();
        } else if (playerValue > 21) {
            this.playerStands();
        }
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
        while(this.dealer.getCardValues() < 17 && !(this.player.getCardValues() > 21)) {
            this.hitDealer();
        }
        this.dealer.createCardValueText();
        this.designLogic.updateTable(this.player.cards, this.dealer.cards, this.player.valueText, this.dealer.valueText);
    }

    startGame() {
        if (this.player.bet === 0) {
            alert("Du musst zuerst einen Haupteinsatz tätigen!");
            return;
        }
        gameLogic.gameRunning = true;
        this.designLogic.startGame(); //Bet-Chip muss noch Clicked etc. entfernt werden
        this.dealCards();


        //Check Perfect Pair
        if (this.playPerfectPair === true) {
            console.log(this.player.checkPairHit());
        }

        //Check 21+3
        if (this.player.play213 === true) {
            console.log("Coming soon");
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
}