class cardshoe {

    cards = Array();

    constructor() {
        for(let i=0; i<6; i++) {
            for(let j=0; j<4; j++) {
                for(let k=0; k<13; k++) {
                    this.cards.push(new card(j,k));
                }
            }
        }
        console.log(this.cards.length);
    }
}