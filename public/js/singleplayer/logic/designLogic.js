class designLogic {

    colorNames = ["Herz", "Karo", "Kreuz", "Pik"];

    getSymbol(cardSymbol) {
        switch(cardSymbol) {
            case 0:
                return "A";
            case 10:
                return "J";
            case 11:
                return "Q";
            case 12:
                return "K";
            default:
                return cardSymbol + 1;
        }
    }

    showCard(card) {
        let symbol = this.getSymbol(card.symbol);
        let cardImg;
        cardImg = symbol + "_" + this.colorNames[card.color] + ".png";
        $("#test").attr("src", "../../../public/img/" + cardImg); //Fehlerhaft lokal, nur auf Server
        console.log(cardImg)
    }

    showBet(totalBet) {
        $("#playerbet").text(totalBet);
    }

    showMoney(playerMoney) {
        $("#playermoney").text(playerMoney);
    }
}