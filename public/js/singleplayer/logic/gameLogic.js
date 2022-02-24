class gameLogic {

    /***
     * TODO Jason:
     * - Blackjack Prüfung Einbindung
     * - Ass-Regel Prüfung
     * - Stand Regel einbauen
     * - Double Regel einbauen
     * - Split Regel einbauen
     */

    /***
     * TODO Marius:
     * - 21+3 Sidebet hinzufügen
     * - Perfect Pair Regel hinzufügen
     * - Zu PHP einlesen
     */

    /***
     * TODO Kev:
     * - Zu Canvas einlesen und umsetzen <- Hauptprio
     *
     * - Evtl Buttons etc. nach Live-Blackjack anordnen
     * - Chip Farbe nach Bet-Size geben
     * - Buttons für Hit etc. gleich groß machen
     * - "Zurück zum Menü" runter und centern
     * - Spieleranzeigen sinnvoll setzen
     * - Buttons evtl besser sortieren
     * - Divs hinzufügen zum Karten Splitten
     * - Playerbet-Chip Hover funktioniert nicht
     */

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

    hitPlayer() {
        let card = this.cardShoe.getRandomCard();
        this.designLogic.showCardPlayer(card);
        this.player.hit(card);
        let playerValue = this.player.getCardValues();
        this.checkNextStep(playerValue);
        this.designLogic.showCardValuePlayer(playerValue, this.player.checkHowMuchAces());
    }

    hitDealer(showCard) {
        let card = this.cardShoe.getRandomCard();
        if(showCard) {
            this.designLogic.showCardDealer(card);
        } else {
            this.designLogic.showDealerHiddenCard();
        }
        this.dealer.hit(card);
    }

    checkNextStep(playerValue) {
        let aces = this.player.checkHowMuchAces();

        if(playerValue == 21) {
            this.playCardsDealer();
        } else if(playerValue > 21) {
            this.playerStands();
        }
    }

    playerStands() {
        this.designLogic.hideGameButtons();
    }

    playCardsDealer() {

    }

    startGame() {
        if(this.player.bet == 0) {
            alert("Du musst zuerst einen Haupteinsatz tätigen!");
            return;
        }
        this.designLogic.startGame(); //Bet-Chip muss noch Clicked etc. entfernt werden
        this.dealCards();
    }

    dealCards() {
        this.hitPlayer();
        this.hitDealer(true);
        this.hitPlayer();
        this.hitDealer(false);
    }

    playerBet(betValue) {
        let betTotal = this.player.addBet(betValue);
        this.designLogic.showBet(betTotal);
        this.designLogic.showMoney(this.player.money);
    }

    playerSidebet213(betValue) {
        let betTotal = this.player.addSidebet213(betValue);
        this.designLogic.showSidebet213(betTotal);
        this.designLogic.showMoney(this.player.money);
    }

    playerSidebetPair(betValue) {
        let betTotal = this.player.addSidebetPair(betValue);
        this.designLogic.showSidebetPair(betTotal);
        this.designLogic.showMoney(this.player.money);
    }

    revokeBet() {
        this.player.revokeBet();
        this.designLogic.showBet("0");
        this.designLogic.showMoney(this.player.money);
    }

}