class designLogic {

    color = ["Herz", "Karo", "Kreuz", "Pik"];

    showCard(card) {
        let symbol;
        let cardImg;
        if(card.symbol == 0) {
            symbol = "A";
        } else if(card.symbol == 10) {
            symbol = "J";
        } else if(card.symbol == 11) {
            symbol = "Q";
        } else if(card.symbol == 12) {
            symbol = "K";
        } else {
            symbol = card.symbol + 1;
        }
        cardImg = symbol + "_" + this.color[card.color] + ".png";
        $("#test").attr("src", "../../../public/img/" + cardImg); //Fehlerhaft
        console.log(cardImg)
    }
}