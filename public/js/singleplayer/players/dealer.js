class dealer extends person {

    getCardValues(gameRunning = false) {
        if(gameRunning === true) {
            return this.cards[0].value;
        } else {
            return super.getCardValues();
        }
    }


}