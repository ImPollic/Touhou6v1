class Inimigo extends Jogador {
  constructor(x,y) {
    super(x, y);
    this.vx = 2;
    this.d = 90;
    //this.sprite = loadImage('/assets/flandre.gif');
    this.sprite = loadImage('./assets/remilia.gif');
    this.vida = 750;
  }
  mostrar() {
    push();
    image(this.sprite,this.x - 50, this.y - 50, 90,90)
    stroke("red");
    strokeWeight(2);
    noFill();
    arc(this.x, this.y, 90, 90, 0, (this.vida * TWO_PI) / 750)
    pop();

   
  }
  andar() {
    this.x += this.vx;
    if (this.x - this.d /2<= 0 || this.x + this.d / 2>= width) this.vx = -this.vx;
  }
}
