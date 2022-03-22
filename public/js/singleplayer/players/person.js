class person {
    
    cards = Array();
    valueText;
    
    hit(randomCard) {
        this.cards.push(randomCard);
    }
    
    newRound() {
        this.cards = Array();
    }
    
    getCardValues() {
        let value = 0;
        this.cards.forEach(function (card) {
            value += card.value;
        });
        return value;
    }
    
    getCardValuesRemovedAces(value = null) {
        if(value === null) {
            value = this.getCardValues();
        }
        let aces = this.checkHowMuchAces();
        while (value > 21 && aces > 0) {
            if (aces >= 1) {
                value -= 10;
                aces--;
            }
        }
        return value;
    }
    
    checkHowMuchAces() {
        let aces = 0;
        this.cards.forEach(function (card) {
            if (card.ace) {
                aces++;
            }
        });
        return aces;
    }
    
    createCardValueText() {
        let value = this.getCardValues()
        let aces = this.checkHowMuchAces();
        this.valueText = value;
        
        if(this instanceof dealer && gameLogic.gameRunning) {
            return;
        }
        
        if (value < 21 && aces >= 1 && gameLogic.gameRunning) {
            let secondValue = value - 10;
            this.valueText = secondValue + "/" + value;
            
        } else if (value > 21 && aces > 0) {
            let secondValue = value - (aces * 10);
            let higherValue = value;
    
            while (higherValue > 21 && aces > 0) {
                if (aces >= 1) {
                    higherValue -= 10;
                    aces--;
                }
            }
            
            if (higherValue !== secondValue && gameLogic.gameRunning) {
                this.valueText = secondValue + "/" + higherValue;
            } else {
                this.valueText = higherValue;
            }
        }
    }
    
    checkBlackjack() {
        let value = this.getCardValues();
        return (value === 21 && this.cards.length === 2);
    }
    
}