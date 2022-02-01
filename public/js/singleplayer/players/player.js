class player extends person {
    money = 2000;
    bet = 0;

    constructor() {
        super();
        this.money = 1000;
    }

    addBet(betValue) {
        if(this.money >= betValue) {
            this.bet += betValue;
            this.money -= betValue;
        }
        return this.bet;
    }
}