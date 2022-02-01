class person {

    cards = Array();

    hit(randomCard) {
        this.cards.push(randomCard);
    }

    newRound() {
        this.cards = Array();
    }


}