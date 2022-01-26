class gameLogic {

    designLogic;
    cardShoe;
    player;
    dealer;

    constructor() {
        this.designLogic = new designLogic();
        this.cardShoe = new cardShoe();
        this.player = new player();
        this.dealer = new dealer();
    }

    test() {
        this.designLogic.showCard(this.cardShoe.getRandomCard());
    }

    startGame() {
        if(this.player.bet == 0) {
            alert("Du musst zuerst einen Einsatz tätigen!");
            return;
        }


    }

}