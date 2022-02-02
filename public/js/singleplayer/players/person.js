class person {

    cards = Array();

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

    checkBlackjack() {
        let value = this.getCardValues();
        return (value === 21 && this.cards.length === 2);
    }


}