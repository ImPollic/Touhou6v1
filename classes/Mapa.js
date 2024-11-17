class Mapa {
  constructor () {
    this.projeteis = [];
    this.feixes = [];
    for (let i = 0; i < 20; i++) {
      this.projeteis.push(new Desvios(random(0, width), random(0, 10)));
    }
    for (let i = 0; i < 10; i++) {
      this.novoFeixe();
    }
    //console.log(this.feixes.length)
  }
  novoProjetil (d = 15, x = random(0, width), y = random(0, 10), vx, vy) {
    this.projeteis.push(new Desvios(x, y, d, vx, vy));
  }
  novoFeixe() {
    let num = parseInt(random(1,7)) % 2 == 0
    this.feixes.push(new Feixe ((num)? 1 : width - 51, random(0, height), 30, 10, (num)? 4 : -4, 2 ))
  }
}