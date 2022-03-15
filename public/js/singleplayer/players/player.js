class player extends person {
    money = 2000;
    bet = 0;
    sidebet213 = 0;
    sidebetPair = 0;
    betsLastRound = Array(0, 0, 0);
    
    addBet(betValue) {
        if (this.money >= betValue) {
            this.bet += betValue;
            this.money -= betValue;
        }
        return this.bet;
    }
    
    revokeBets() {
        if (this.bet > 0) {
            this.money += this.bet;
            this.bet = 0;
        }
        if(this.sidebetPair > 0) {
            this.money += this.sidebetPair;
            this.sidebetPair = 0;
        }
        if(this.sidebet213 > 0) {
            this.money += this.sidebet213;
            this.sidebet213 = 0;
        }
    }
    
    newRound() {
        super.newRound();
        this.betsLastRound = [this.bet, this.sidebetPair, this.sidebet213];
        this.bet = 0;
    }
    
    addSidebet213(betValue) {
        if (this.money >= betValue) {
            this.sidebet213 += betValue;
            this.money -= betValue;
        }
        return this.sidebet213;
    }
    
    addSidebetPair(betValue) {
        if (this.money >= betValue) {
            this.sidebetPair += betValue;
            this.money -= betValue;
            
        }
        return this.sidebetPair;
    }
    
    checkPairHit() {
        let kindOfPair;
        
        if (this.cards[0].symbol == this.cards[1].symbol && this.cards[0].color == this.cards[1].color) {
            kindOfPair = "PerfectPair";
        } else if (this.cards[0].color == this.cards[1].color) {
            kindOfPair = "ColoredPair"
        } else if (this.cards[0].symbol == this.cards[1].symbol) {
            kindOfPair = "RedBlackPair";
            
        } else {
            kindOfPair = "No hits";
        }
        return kindOfPair;
    }
}