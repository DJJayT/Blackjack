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
    
    getCardValuesRemovedAces(value = null, splitted = false) {
        if(value === null) {
            if(this instanceof player) {
                value = this.getCardValues(splitted);
            } else {
                value = this.getCardValues();
            }
        }
        let aces;
        
        if(this instanceof player) {
            aces = this.checkHowMuchAces(splitted);
        } else {
            aces = this.checkHowMuchAces();
        }
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
    
    createCardValueText(splitted = false) {
        let value;
        let aces;
        if(this instanceof player) {
            value = this.getCardValues(splitted)
            aces = this.checkHowMuchAces(splitted);
        } else {
            value = this.getCardValues();
            aces = this.checkHowMuchAces();
        }
        
        let valueText = value;
        
        if(this instanceof dealer && gameLogic.gameRunning) {
            this.valueText = valueText;
            return;
        }
        
        if (value < 21 && aces >= 1 && gameLogic.gameRunning) {
            let secondValue = value - 10;
            valueText = secondValue + "/" + value;
            
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
                valueText = secondValue + "/" + higherValue;
            } else {
                valueText = higherValue;
            }
        }
        
        if(this instanceof player && splitted === true) {
            this.valueTextSplitted = valueText;
        } else {
            this.valueText = valueText;
        }
    }
    
    checkBlackjack() {
        let value = this.getCardValues();
        return (value === 21 && this.cards.length === 2);
    }
    
}