import Point from "./Point";

class FigureAnimation {
    constructor(method = '', value = 0, center = new Point, moveJoined) {
        this.method = method;
        this.value = value;
        this.center = center;
        this.moveJoined = moveJoined;
    }
}

export default FigureAnimation;