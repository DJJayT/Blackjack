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
    
    hitPlayer(double = false) {
        let card = this.cardShoe.getRandomCard();
        this.player.hit(card);
        this.designLogic.addCardPlayer(card, this.player.cards.length, double, this.player.split, this.player.splitStandFirstHand, this.player.cardsSplitHand.length);
        let playerValue = this.player.getCardValues(this.player.splitStandFirstHand);
        this.checkNextStep(playerValue);
        this.player.createCardValueText(this.player.splitStandFirstHand);
        
        this.dealerCardCheck();
        this.designLogic.updateTable(this.player.cards, this.dealer.cards, this.player.valueText, this.dealer.valueText, this.player.cardsSplitHand, this.player.valueTextSplitted);
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
        this.designLogic.updateTable(this.player.cards, this.dealer.cards, this.player.valueText, this.dealer.valueText, this.player.cardsSplitHand, this.player.valueTextSplitted);
    }
    
    doublePlayer() {
        let doublePossible = this.player.checkDoublePossible()
        
        if (this.player.money >= this.player.bet && doublePossible) {
            this.player.money -= this.player.bet;
            this.player.bet += this.player.bet;
            this.player.double = true;
            this.hitPlayer(true);
            this.playerStands();
        } else if(doublePossible === false) {
            alert("Double geht nur nach austeilen der ersten beiden Karten!");
        } else {
            alert("Dein Geld reicht dafür nicht aus!");
        }
    }
    
    splitPlayerCards() {
        if(this.player.split === true) {
            alert("Du kannst nicht 2 mal splitten!");
            return;
        }
        
        let splitPossible = this.player.checkSplitPossible();
        
        if (this.player.money >= this.player.bet && splitPossible) {
            this.player.money -= this.player.bet;
            this.designLogic.setNewMoney(this.player.money);
            this.designLogic.setSplitBet(this.player.bet);
            
            this.player.splitCards();
            this.hitPlayer();
            this.player.createCardValueText();
            this.player.createCardValueText(true);
            
            this.designLogic.updateTable(this.player.cards, this.dealer.cards, this.player.valueText, this.dealer.valueText, this.player.cardsSplitHand, this.player.valueTextSplitted)
            
        } else if(splitPossible === false) {
            alert("Splitten ist nicht möglich!");
        } else {
            alert("Dein Geld reicht dafür nicht aus!");
        }
    }
    
    
    checkNextStep(playerValue) {
        let checkValue = this.player.getCardValuesRemovedAces(playerValue);
        setTimeout(function () {
            if (checkValue === 21) {
                this.playerStands();
            } else if (checkValue > 21) {
                this.playerStands();
            }
        }.bind(this), 50);
    }
    
    playerStands() {
        if(this.player.split === true) {
            if(this.player.splitStandFirstHand === false) {
                this.player.splitStandFirstHand = true;
                this.hitPlayer();
                return;
            }
        }
        
        gameLogic.gameRunning = false;
        this.player.createCardValueText(this.player.splitStandFirstHand);
        this.designLogic.hideGameButtons();
        this.playCardsDealer();
    }
    
    playCardsDealer() {
        this.designLogic.addCardDealer(this.dealer.cards[1], this.dealer.cards.length - 1);
        this.dealer.createCardValueText();
        if(this.player.split === false) {
            while (this.dealer.getCardValuesRemovedAces() < 17 && !(this.player.getCardValuesRemovedAces() > 21)) {
                this.hitDealer();
            }
        } else {
            while(this.dealer.getCardValuesRemovedAces() < 17 && (!(this.player.getCardValuesRemovedAces() > 21) || !(this.player.getCardValuesRemovedAces(null, true) > 21))) {
                this.hitDealer();
            }
        }
        this.dealer.createCardValueText();
        this.designLogic.updateTable(this.player.cards, this.dealer.cards, this.player.valueText, this.dealer.valueText, this.player.cardsSplitHand, this.player.valueTextSplitted);
        this.gameEnd();
    }
    
    startGame() {
        if (this.cardShoe.nextRoundShuffle) {
            this.cardShoe.dealerCardPlayed();
        }
        
        gameLogic.gameDisplay = "";
        if (this.player.bet === 0) {
            alert("Du musst zuerst einen Haupteinsatz tätigen!");
            return false;
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
            console.log("Cumming soon");
        }
        
        
        return true;
    }
    
    dealCards() {
        this.hitPlayer();
        this.hitDealer();
        this.hitPlayer();
        this.hitDealer(false);
    }
    
    playerBet(betValue) {
        if(betValue > this.player.money) {
            alert("Dein Guthaben reicht für diesen Einsatz nicht!");
            return;
        }
        if(betValue > 0) {
            let betTotal = this.player.addBet(betValue);
            this.designLogic.showBet(betTotal);
            this.designLogic.showMoney(this.player.money);
        }
    }
    
    playerSidebet213(betValue) {
        if(betValue > this.player.money) {
            alert("Dein Guthaben reicht für diesen Einsatz nicht!");
            return;
        }
        
        if(betValue > 0) {
            let betTotal = this.player.addSidebet213(betValue);
            this.designLogic.showSidebet213(betTotal);
            this.designLogic.showMoney(this.player.money);
            this.play213 = true;
        }
        //21+3 rechter Side Bet
        //Not working atm
    }
    
    playerSidebetPair(betValue) {
        if(betValue > this.player.money) {
            alert("Dein Guthaben reicht für diesen Einsatz nicht!");
            return;
        }
        
        if(betValue > 0) {
            let betTotal = this.player.addSidebetPair(betValue);
            this.designLogic.showSidebetPair(betTotal);
            this.designLogic.showMoney(this.player.money);
            this.playPerfectPair = true;
        }
        //PerfectPair linker Side Bet
    }
    
    revokeBet() {
        this.player.revokeBets();
        this.designLogic.resetBets();
        this.designLogic.showMoney(this.player.money);
    }
    
    calculateWin(secondLoop = false) {
        let playerScore;
        if(secondLoop === true) {
            playerScore = this.player.getCardValuesRemovedAces(null, true);
        } else {
            playerScore = this.player.getCardValuesRemovedAces();
        }
        let dealerScore = this.dealer.getCardValuesRemovedAces();
        let gameDisplay;
        
        if (playerScore <= 21) { //Checks if Player busts
            if (dealerScore <= 21) { //Checks if dealer busts
                let playerBlackjack = this.player.checkBlackjack();
                let dealerBlackjack = this.dealer.checkBlackjack();
                
                if (playerBlackjack && !dealerBlackjack) { //Blackjack checks
                    gameDisplay = "You won! - Blackjack";
                    this.player.money += this.player.bet * 2.5;
                } else if (playerBlackjack && dealerBlackjack) {
                    gameDisplay = "Push!";
                    this.player.money += this.player.bet;
                } else if (!playerBlackjack && dealerBlackjack) {
                    gameDisplay = "You lost!";
                } else if (playerScore === dealerScore) { //Score checks
                    gameDisplay = "Push!";
                    this.player.money += this.player.bet;
                } else if (playerScore > dealerScore) {
                    gameDisplay = "You won!";
                    this.player.money += this.player.bet * 2;
                } else if (dealerScore > playerScore) {
                    gameDisplay = "You lost!";
                }
            } else {
                gameDisplay = "You won!";
                this.player.money += this.player.bet * 2;
            }
        } else {
            gameDisplay = "You lost!";
        }
        
        if(secondLoop === true) {
            return gameDisplay;
        }
        
        if(this.player.split && secondLoop === false) {
            let secondGameDisplay = this.calculateWin(true);
            gameLogic.gameDisplay = "Left: " + secondGameDisplay + " Right: " + gameDisplay;
        } else {
            gameLogic.gameDisplay = gameDisplay;
        }
    }
    
    gameEnd() {
        this.calculateWin();
        this.designLogic.gameEnd();
        this.designLogic.setNewMoney(this.player.money);
        this.designLogic.updateTable(this.player.cards, this.dealer.cards, this.player.valueText, this.dealer.valueText, this.player.cardsSplitHand, this.player.valueTextSplitted);
        this.player.newRound();
        this.dealer.newRound();
        this.player.resetBets();
    }
    
    dealerCardCheck() {
        if (!this.cardShoe.nextRoundShuffle) {
            if (this.cardShoe.checkDealerCardPlayed()) {
                this.cardShoe.nextRoundShuffle = true;
                gameLogic.gameDisplay = "Card-shuffle next round!";
            }
        }
    }
    
    betSameAmountOrDouble() {
        if((this.player.bet === 0 && this.player.sidebet213 === 0) && this.player.sidebetPair === 0) {
            let mainBet = this.player.betsLastRound[0];
            let sidebetPair = this.player.betsLastRound[1];
            let sidebet213 = this.player.betsLastRound[2];
            
            if((mainBet + sidebetPair + sidebet213) > this.player.money) {
                alert("Dein Guthaben reicht für diesen Einsatz nicht!");
                return;
            }
            
            this.playerBet(mainBet);
            this.playerSidebetPair(sidebetPair);
            this.playerSidebet213(sidebet213);
        } else {
            if((this.player.bet + this.player.sidebetPair + this.player.sidebet213) > this.player.money) {
                alert("Dein Guthaben reicht für diesen Einsatz nicht!");
                return;
            }
            
            this.playerBet(this.player.bet);
            this.playerSidebetPair(this.player.sidebetPair);
            this.playerSidebet213(this.player.sidebet213);
        }
    }
}