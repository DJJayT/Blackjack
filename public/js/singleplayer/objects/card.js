class card {

    color; //Kreuz, Pik, Karo oder Herz
    symbol; //Welches Symbol
    value; //Welchen Wert
    ace = false; //Ob Ass oder nicht
    played = false;

    x;
    y;
    imageObject;
    showCard;

    constructor(color, symbol) {
        this.color = color;
        this.symbol = symbol;
        if (symbol < 10 && symbol !== 0) {
            this.value = symbol + 1;
        } else {
            this.value = 10; //Für Bube, Dame, König
        }
        if (symbol === 0) {
            this.ace = true;
            this.value = 11;
        }
    }

    setDrawVariables(x, y, imageObject = null, showCard = true) {
        this.x = x;
        this.y = y;
        if(imageObject !== null) {
            this.imageObject = imageObject;
        }

        this.showCard = showCard;
    }
    
    getX() {
        return designLogic.canvasWidth/2 + this.x - 40;
    }

}