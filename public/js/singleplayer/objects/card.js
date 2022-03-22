class card {

    color; //Kreuz, Pik, Karo oder Herz
    symbol; //Welches Symbol
    value; //Welchen Wert
    ace = false; //Ob Ass oder nicht
    played = false;

    x;
    y;
    imageObject = null;
    showCard;
    cardFromDealer;

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

    setDrawVariables(x, y, imageObject = null, showCard, cardFromDealer) {
        this.x = x;
        this.y = y;
        if(imageObject !== null) {
            this.imageObject = imageObject;
        }

        this.showCard = showCard;
        this.cardFromDealer = cardFromDealer;
    }
    
    getX() {
        if(this.cardFromDealer === false) {
            return designLogic.canvasWidth/2 + this.x - 40;
        } else {
            return designLogic.canvasWidth/2 + this.x - 30;
        }
    }
    
    getY() {
        if(this.cardFromDealer === false) {
            return designLogic.canvasHeight - this.y - 60;
        } else {
            return this.y;
        }
    }

}