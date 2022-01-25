class gameLogic {

    designLogic;
    cardshoe;
    player;
    dealer;

    constructor() {
        this.designLogic = new designLogic();
        this.cardshoe = new cardshoe();
        this.player = new player();
        this.dealer = new dealer();
    }

}