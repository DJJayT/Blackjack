class dealer extends person {

    getCardValues() {
        if(gameLogic.gameRunning === true) {
            return this.cards[0].value;
        } else {
            return super.getCardValues();
        }
    }


}