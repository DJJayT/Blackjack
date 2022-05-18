class dealer extends person {
    
    /***
     * Behält 2. Karte während das Spiel läuft für sich
     * @returns {number}
     */
    getCardValues() {
        if(gameLogic.gameRunning === true) {
            return this.cards[0].value;
        } else {
            return super.getCardValues();
        }
    }


}