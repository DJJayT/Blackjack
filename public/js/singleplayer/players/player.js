class player extends person {
    money = 2000;
    bet = 0;
    sidebet213 = 0;
    sidebetPair = 0;
    betsLastRound = Array(0, 0, 0); //Main-bet, sidebetPair, sidebet213
    split = false;
    double = false;
    cardsSplitHand = Array();
    splitStandFirstHand = false;
    valueTextSplitted = "";
    
    addBet(betValue) {
        if (this.money >= betValue) {
            this.bet += betValue;
            this.money -= betValue;
        }
        return this.bet;
    }
    
    resetBets() {
        this.bet = 0;
        this.sidebetPair = 0;
        this.sidebet213 = 0;
    }
    
    revokeBets() {
        if (this.bet > 0) {
            this.money += this.bet;
            this.bet = 0;
        }
        if (this.sidebetPair > 0) {
            this.money += this.sidebetPair;
            this.sidebetPair = 0;
        }
        if (this.sidebet213 > 0) {
            this.money += this.sidebet213;
            this.sidebet213 = 0;
        }
    }
    
    newRound() {
        super.newRound();
        this.cardsSplitHand = Array();
        
        if(this.double === true) {
            this.bet /= 2;
        }
        this.betsLastRound = Array(this.bet, this.sidebetPair, this.sidebet213);
        this.bet = 0;
        this.split = false;
        this.splitStandFirstHand = false;
        this.double = false;
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
    
    checkDoublePossible() {
        if(this.split === false) {
            return this.cards.length === 2;
        } else {
            return false;
        }
    }
    
    checkSplitPossible() {
        return this.cards[0].value === this.cards[1].value && this.cards.length === 2;
    }
    
    checkPairHit() {
        let kindOfPair;
        
        if (this.cards[0].symbol === this.cards[1].symbol) {
            if (this.cards[0].color === this.cards[1].color) {
                kindOfPair = "PerfectPair";
            } else if (this.cards[0].color === 0 && this.cards[1].color === 1 || //Checks für schwarzes Paar
                this.cards[0].color === 1 && this.cards[1].color === 0 ||
                this.cards[0].color === 2 && this.cards[1].color === 3 || //Checks für rotes Paar
                this.cards[0].color === 3 && this.cards[1].color === 2) {
                kindOfPair = "ColoredPair";
            } else {
                kindOfPair = "NormalPair";
            }
        } else {
            kindOfPair = "No hits";
        }
        return kindOfPair;
    }
    
    splitCards() {
        this.split = true;
        let cardForSplit = this.cards.pop();
        this.cardsSplitHand.push(cardForSplit);
        
        cardForSplit.x = -35;
        cardForSplit.y = 54;
        this.cards[0].x = 70;
    }
    
    hit(randomCard) {
        if (this.split === true) {
            if (this.splitStandFirstHand === true) {
                this.cardsSplitHand.push(randomCard);
                return;
            }
        }
        this.cards.push(randomCard);
        
    }
    
    getCardValues(splitted) {
        let value = 0;
        if (splitted === false) {
            this.cards.forEach(function (card) {
                value += card.value;
            });
        } else {
            this.cardsSplitHand.forEach(function (card) {
                value += card.value;
            });
        }
        
        return value;
    }
    
    checkHowMuchAces(splitted) {
        let aces = 0;
        if (splitted === false) {
            this.cards.forEach(function (card) {
                if (card.ace) {
                    aces++;
                }
            });
        } else {
            this.cardsSplitHand.forEach(function (card) {
                if (card.ace) {
                    aces++;
                }
            });
        }
        return aces;
    }
    
    checkBlackjack() {
        if(this.split) {
            return false;
        }
        
        let value = this.getCardValues(false);
        return (value === 21 && this.cards.length === 2);
    }
}