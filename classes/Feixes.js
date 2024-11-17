class Feixe {
    constructor (x, y, w, h, vx, vy = 1){
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.vx = vx;
        this.vy = vy;
    }
    mostrar(cor = "pink") {
        push();
        stroke(cor);
        fill("white");
        ellipse(this.x, this.y, this.w, this.h)
        pop();
    }
    mover () {
        this.x += this.vx;
        this.y += this.vy;

        return !(this.y + this.h > height || this.x < 0 || this.x + this.w > width);
    }
}