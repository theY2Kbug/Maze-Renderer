class Boundary{
    constructor(x1, y1, x2, y2) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
    }

    show(){
        // console.log(true)
        stroke(255)
        strokeWeight(2)
        line(this.a.x,this.a.y,this.b.x,this.b.y)
    }
}