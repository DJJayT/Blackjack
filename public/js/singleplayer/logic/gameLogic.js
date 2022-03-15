class gameLogic {
    
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
        this.designLogic.showCardValuePlayer(playerValue, this.player.checkHowMuchAces());
        this.designLogic.showCards(this.player.cards, this.dealer.cards);
    }

    hitDealer(showCard) {
        let card = this.cardShoe.getRandomCard();
        if (showCard) {
            this.designLogic.showCardDealer(card);
        } else {
            this.designLogic.showDealerHiddenCard();
        }
        this.dealer.hit(card);
        this.designLogic.showCards(this.player.cards, this.dealer.cards);
    }

    checkNextStep(playerValue) {
        let aces = this.player.checkHowMuchAces();

        if (playerValue === 21) {
            this.playCardsDealer();
        } else if (playerValue > 21) {
            this.playerStands();
        }
    }

    playerStands() {
        this.designLogic.hideGameButtons();
        this.playCardsDealer();
    }

    playCardsDealer() {

    }

    startGame() {
        if (this.player.bet === 0) {
            alert("Du musst zuerst einen Haupteinsatz tätigen!");
            return;
        }
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
        this.hitDealer(true);
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