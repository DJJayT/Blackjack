class player extends person {
    money = 2000;
    bet = 0;
    sidebet213 = 0;
    sidebetPair = 0;
    betLastRound = 0;

    addBet(betValue) {
        if(this.money >= betValue) {
            this.bet += betValue;
            this.money -= betValue;
        }
        return this.bet;
    }

    revokeBet() {
        if(this.bet > 0) {
            this.money += this.bet;
            this.bet = 0;
        }
    }

    newRound() {
        super.newRound();
        this.betLastRound = this.bet;
        this.bet = 0;
    }

    addSidebet213(betValue) {
        if(this.money >= betValue) {
            this.sidebet213 += betValue;
            this.money -= betValue;
        }
        return this.sidebet213;
    }

    addSidebetPair(betValue) {
        if(this.money >= betValue) {
            this.sidebetPair += betValue;
            this.money -= betValue;
        }
        return this.sidebetPair;
    }
}