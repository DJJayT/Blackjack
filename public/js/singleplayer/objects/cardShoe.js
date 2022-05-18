class cardShoe {

    cards = Array(); //Array mit allen im Spiel vorhandenen Karten
    dealerCard; //Wert wann die Dealer-Card gespielt wird
    cardsPlayed = 0; //Wert wie viele Karten gespielt wurden
    nextRoundShuffle = false; //Bool ob Karten neu gemischt werden

    constructor() {
        for(let i=0; i<6; i++) {
            for(let j=0; j<4; j++) {
                for(let k=0; k<13; k++) {
                    this.cards.push(new card(j,k));
                }
            }
        }
        this.dealerCard = Math.floor(Math.random() * (250-208) + 208);
    }
    
    /***
     * Gibt eine zufällige, nicht gespielte Karte zurück
     * @returns {card}
     */
    getRandomCard() {
        let random;
        do {
            random = Math.floor(Math.random() * 312);
        } while(this.cards[random].played === true);

        this.cardsPlayed++;
        this.cards[random].played = true;
        return this.cards[random];
    }
    
    /***
     * Mischt die Karten neu durch
     */
    dealerCardPlayed() {
        this.cards.forEach(function(card) {
            card.played = false;
        });
        this.dealerCard = Math.floor(Math.random() * (250-208) + 208);
        this.cardsPlayed = 0;
    }
    
    /***
     * Gibt zurück ob Dealer-Karte gespielt wurde.
     * @returns {boolean}
     */
    checkDealerCardPlayed() {
        return (this.cardsPlayed === this.dealerCard);
    }
}