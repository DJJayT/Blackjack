class cardShoe {

    cards = Array();
    dealerCard;
    cardsPlayed = 0;
    nextRoundShuffle = false;

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

    getRandomCard() {
        let random;
        do {
            random = Math.floor(Math.random() * 312);
        } while(this.cards[random].played === true);

        this.cardsPlayed++;
        this.cards[random].played = true;
        return this.cards[random];
    }

    dealerCardPlayed() {
        this.cards.forEach(function(card) {
            card.played = false;
        });
        this.dealerCard = Math.floor(Math.random() * (250-208) + 208);
        this.cardsPlayed = 0;
    }

    checkDealerCardPlayed() {
        return (this.cardsPlayed === this.dealerCard);
    }
}