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
        this.cards.forEach(function(card) {
            value += card.value;
        });
        return value;
    }


}