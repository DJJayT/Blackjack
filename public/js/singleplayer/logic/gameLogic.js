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
        let card = this.cardShoe.getRandomCard();
        this.designLogic.showCard(card);
        this.player.hit(card);
        console.log(this.player.cards);
    }

    startGame() {
        if(this.player.bet == 0) {
            alert("Du musst zuerst einen Einsatz tätigen!");
            return;
        }

        this.designLogic.startGame(); //Bet-Chip muss noch Clicked etc. entfernt werden

    }

    playerBet(betValue) {
        let betTotal = this.player.addBet(betValue);
        this.designLogic.showBet(betTotal);
        this.designLogic.showMoney(this.player.money);
    }

    revokeBet() {
        let betTotal = this.player.revokeBet();
        this.designLogic.showBet("0");
        this.designLogic.showMoney(this.player.money);
    }

}