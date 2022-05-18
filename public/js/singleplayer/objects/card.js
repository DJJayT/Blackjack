class card {

    color; //Kreuz, Pik, Karo oder Herz
    symbol; //Welches Symbol
    value; //Welchen Wert
    ace = false; //Ob Ass oder nicht
    played = false; //Bereits gespielt oder nicht

    x; //X-Koordinate für Canvas-Zeichnung
    y; //Y-Koordinate für Canvas Zeichnungen
    imageObject = null; //Bildobjekt durch welches die Karte angezeigt werden kann
    showCard; //Bool, ob die Karte gezeigt werden soll oder nicht (für Dealer 2. Karte)
    cardFromDealer; //Bool, ob die Karte vom Dealer ist oder nicht

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
    
    /***
     * Setzt die Werte welche für das Frontend Relevant sind
     * @param x
     * @param y
     * @param imageObject
     * @param showCard
     * @param cardFromDealer
     */
    setDrawVariables(x, y, imageObject = null, showCard, cardFromDealer) {
        this.x = x;
        this.y = y;
        if(imageObject !== null) {
            this.imageObject = imageObject;
        }

        this.showCard = showCard;
        this.cardFromDealer = cardFromDealer;
    }
    
    /***
     * Holt sich X-Wert anhand der Koordinaten und
     * ob Karte vom Dealer oder nicht.
     * @returns {number}
     */
    getX() {
        if(this.cardFromDealer === false) {
            return designLogic.canvasWidth/2 + this.x - 40;
        } else {
            return designLogic.canvasWidth/2 + this.x - 30;
        }
    }
    
    /***
     * Holt sich Y-Wert anhand der Koordinaten und
     * ob Karte vom Dealer oder nicht.
     * @returns {number}
     */
    getY() {
        if(this.cardFromDealer === false) {
            return designLogic.canvasHeight - this.y - 60;
        } else {
            return this.y;
        }
    }

}