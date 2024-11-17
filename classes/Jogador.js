let [
  moverDireita,
  moverEsquerda,
  moverCima,
  moverBaixo
] = [
  false,
  false,
  false,
  false
]

function irDireita() { moverDireita = true; }
function NAOirDireita() { moverDireita = false; }
function irEsquerda() { moverEsquerda = true; }
function NAOirEsquerda() { moverEsquerda = false; }
function irCima() { moverCima = true; }
function NAOirCima() { moverCima = false; }
function irBaixo() { moverBaixo = true; }
function NAOirBaixo() { moverBaixo = false; }

class Jogador {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.d = 10;
    this.ataques = [];
    this.vivo = true;
    //this.sprite = loadImage('/assets/cirno-flying.gif');
    this.sprite = loadImage('/assets/marisa.gif');
    this.inv = 0;
    this.explosivos = [];
    this.animation = [];
    for (let i = 0; i < 6; i+=TWO_PI/5) {
      this.animation.push(i);
    }
  }
  mostrar () {
    let y = color("yellow");
    push();
    image(this.sprite,this.x - 19, this.y - 35, 40,65)
    stroke(y);
    strokeWeight(2);
    fill("white");
    circle(
      this.x,
      this.y,
      this.d
    )
    strokeWeight(0.5);
    fill(255,255,255,80);
    stroke(255,255,0,80);
    //if (keyIsDown && keyCode == 32) {
    for (let circ of this.animation) {
      circle(this.x + 50*cos(circ), this.y + 50*sin(circ), 5);
    }
    //}

    pop();
  }
  mover() {
    if (keyIsPressed) {
      if (keyCode == 38) { if (this.y < 0) return this.y += 10; this.y -= 5; }
      if (keyCode == 40) { if (this.y > height) return this.y -= 10; this.y += 5; }
      if (keyCode == 39) { if (this.x > width) return this.x -= 10; this.x += 5; }
      if (keyCode == 37) { if (this.x < 0) return this.x += 10; this.x -= 5; }
    }
    if (moverCima) {
      if (this.y < 0) {
        return this.y += 10; 
      } 
      this.y -= 5;
    }
    if (moverBaixo) { 
      if (this.y > height) { 
        return this.y -= 10; 
      } 
      this.y += 5; 
    }
    if (moverDireita) {
      if (this.x > width) { 
        return this.x -= 10; 
      } 
      this.x += 5;
    }
    if (moverEsquerda) {
      if (this.x < 0) {
        return this.x += 10; 
      }
      this.x -= 5;
    }
  }
  prepararAtaque() {
    this.ataques.push(new Projetil(this.x - this.d, this.y, 10));
    this.ataques.push(new Projetil(this.x + this.d, this.y, 10));
   
  }
  prepararAtaqueInt() {
    this.ataques.push(new DesvioInteligente(this.x, this.y + 5, 10));
  }
  invensivel(){
    push()
    stroke("orange");
    noFill();
    circle(this.x, this.y, this.inv)
    pop();
  }
  carregarExplosao() {
    for (let i = 0; i< 20; i++) {
        this.explosivos.push(new Desvios(this.x, this.y, 10,undefined,random(-2,2)));
    }
  }
}