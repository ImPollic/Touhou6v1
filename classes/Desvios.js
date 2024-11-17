class Desvios extends Projetil {
  constructor (x, y, d = 15, vx = random(-2, 2), vy = random(1, 3)) {
    super(x, y, d);
    this.vx = vx;
    this.vy = vy;
  }
  mostrar(cor = color(133, 9, 38)) {
    push();
      fill("white");
      stroke(cor);
      strokeWeight(3);
      circle(this.x, this.y, this.d);
    pop();
  }
  atualizar() {
    this.x += this.vx; 
    this.y += this.vy;
    if (this.x < 0 || this.y < 0 || this.x > width || this.y > height) {
      return false;
    }
    return true;
  }
}
class DesvioInteligente extends Desvios {
  constructor(x, y) {
    super(x, y, 5, 1, 2);
  }
  atualizar(x, y, d){
    
    if (this.x > x ) {
      this.x -= this.vx
    } else {
      this.x += this.vx
    }
    
    this.y -= this.vy
  

    if (this.x < 0 || this.y < 0 || this.x > width || this.y > height) {
      return false;
    }
    return true;
  }
}