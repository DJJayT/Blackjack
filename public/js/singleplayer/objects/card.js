class card {

    color; //Kreuz, Pik, Karo oder Herz
    symbol; //Welches Symbol
    gamevalue; //Welchen Wert
    ace = false; //Ob Ass oder nicht

    constructor(color, symbol) {
        this.color = color;
        this.symbol = symbol;
        if(symbol < 10) {
            this.gamevalue = symbol + 1;
        } else {
            this.gamevalue = 10; //Für Bube, Dame, König
        }
        if(symbol == 0) {
            this.ace = true;
        }
    }

}