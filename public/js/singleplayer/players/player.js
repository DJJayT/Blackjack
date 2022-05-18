class player extends person {
    money = 2000; //Geld des Spielers
    bet = 0; //Einsatz auf Hauptwette
    sidebet213 = 0; //Einsatz auf Sidebet 21+3
    sidebetPair = 0; //Einsatz auf Sidebet Perfect Pair
    betsLastRound = Array(0, 0, 0); //Main-bet, sidebetPair, sidebet213
    split = false; //Bool ob gesplittet oder nicht
    double = false; //Bool ob doubled oder nicht
    cardsSplitHand = Array(); //Karten der gesplitteten Hand
    splitStandFirstHand = false; //Bool ob Stand bei erster Hand bei split
    valueTextSplitted = ""; //Kartenwert für gesplittete Hand
    
    /***
     * Fügt Einsatz hinzu und entfernt entsprechendes Geld
     * @param betValue
     * @returns {number}
     */
    addBet(betValue) {
        if (this.money >= betValue) {
            this.bet += betValue;
            this.money -= betValue;
        }
        return this.bet;
    }
    
    /***
     * Setzt Einsätze auf 0
     */
    resetBets() {
        this.bet = 0;
        this.sidebetPair = 0;
        this.sidebet213 = 0;
    }
    
    /***
     * Nimmt Einsätze zurück und schreibt sie dem Spieler wieder gut
     */
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
    
    /***
     * Startet eine neue Runde.
     * Setzt Einsätze zurück, speichert sich vorherige Einsätze
     * und setzt split/double auf false.
     */
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
    
    /***
     * Fügt Einsatz an 21+3 Sidebet hinzu
     * @param betValue
     * @returns {number}
     */
    addSidebet213(betValue) {
        if (this.money >= betValue) {
            this.sidebet213 += betValue;
            this.money -= betValue;
        }
        return this.sidebet213;
    }
    
    /***
     * Fügt Einsatz an Perfect-Pair Sidebet hinzu
     * @param betValue
     * @returns {number}
     */
    addSidebetPair(betValue) {
        if (this.money >= betValue) {
            this.sidebetPair += betValue;
            this.money -= betValue;
            
        }
        return this.sidebetPair;
    }
    
    /***
     * Schaut ob Double möglich ist oder nicht
     * @returns {boolean}
     */
    checkDoublePossible() {
        if(this.split === false) {
            return this.cards.length === 2;
        } else {
            return false;
        }
    }
    
    /***
     * Schaut ob Split möglich ist oder nicht
     * @returns {boolean}
     */
    checkSplitPossible() {
        return this.cards[0].value === this.cards[1].value && this.cards.length === 2;
    }
    
    /***
     * Check ob ein Paar getroffen wurde
     * @returns {string}
     */
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
    
    /***
     * Splittet die Karten und packt die 2. Karte in den 2. Array
     */
    splitCards() {
        this.split = true;
        let cardForSplit = this.cards.pop();
        this.cardsSplitHand.push(cardForSplit);
        
        cardForSplit.x = -35;
        cardForSplit.y = 54;
        this.cards[0].x = 70;
    }
    
    /***
     * Fügt gezogene Karte der eigenen Hand hinzu
     * @param randomCard
     */
    hit(randomCard) {
        if (this.split === true) {
            if (this.splitStandFirstHand === true) {
                this.cardsSplitHand.push(randomCard);
                return;
            }
        }
        this.cards.push(randomCard);
        
    }
    
    /***
     * Zählt Kartenwert der jeweiligen Hand zusammen
     * @param splitted
     * @returns {number}
     */
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
    
    /***
     * Schaut wie viele Asse auf der jeweiligen Hand sind
     * @param splitted
     * @returns {number}
     */
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
    
    /***
     * Schaut ob Blackjack vorhanden ist
     * @returns {boolean}
     */
    checkBlackjack() {
        if(this.split === true) {
            return false;
        }
        
        let value = this.getCardValues(false);
        return (value === 21 && this.cards.length === 2);
    }
}