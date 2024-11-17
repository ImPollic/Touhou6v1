class Projetil {
  constructor (x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
  }
  mostrar () {
    push();
    fill("white");
    stroke("orange");
    strokeWeight(2);
      //circle(this.x, this.y, this.d);
      ellipse(this.x, this.y, this.d, this.d*2)
    pop();
  }
  mover () {
    if (this.y - this.d/2 > 0) {
      if (!(this instanceof DesvioInteligente)) {
        this.y -= 15;
      }
      return true;
    }
    return false;
  }
}