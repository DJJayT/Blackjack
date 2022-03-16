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
        
        if (value < 21 && aces >= 1) {
            let secondValue = value - 10;
            this.valueText = secondValue + "/" + value;
            
        } else if (value > 21 && aces >= 1) {
            let secondValue = value - (aces * 10);
            let higherValue = value;
            
            do {
                if (aces >= 1) {
                    higherValue -= 10;
                    aces--;
                }
            } while (value <= 21 || aces === 0);
            
            if (higherValue !== secondValue) {
                this.valueText = secondValue + "/" + higherValue;
            }
        }
    }

    checkBlackjack() {
        let value = this.getCardValues();
        return (value === 21 && this.cards.length === 2);
    }

}