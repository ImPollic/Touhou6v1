let mapa, jogador, fundo, inimigo, vidas = ['♥', '♥', '♥'];
let desvioInt, menuTime, theme;
function preload() {
  fonteTouhou = loadFont('/assets/Logopixies-owwBB.ttf');
  badApple = loadImage('/assets/badApple.gif');
  theme = loadSound('/assets/MarisaTheme.mp3')
}

//let pontos = [];

function setup() {
  createCanvas(400, 500);
  document.getElementById("panel").append(document.querySelector("canvas"));
  document.getElementById("panel").append(document.getElementById("buttons"));
  jogador = new Jogador (width / 2, height - 50);
  jogador.prepararAtaque();
  inimigo = new Inimigo (width /2, 70);
  mapa = new Mapa ();
  fundo = loadImage('/assets/skies.gif');
  theme.setVolume(0.15);
  theme.play();
  
  //desvioInt = new DesvioInteligente (width/2, height/2);

  textSize(15);
  fill("white");
  textFont(fonteTouhou);

  alert("Embodiment of Scarlet Devil por ImPollic v1.0 iniciando!");
  frameRate(50);

  //asad
  //for (let i = 0; i < TWO_PI; i += TWO_PI / 6) pontos.push(i)
}
let iniciar = false;
let score = 0;
let scoreInput = document.getElementById('score');
let proj = 0;
let projInput = document.getElementById('proj');

let px = 0;



function draw() {

  if (!iniciar) {
    Tela_Menu();
    image(badApple, width/2 - 110, 200 )
    if (mouseIsPressed && mouseX > 30 && mouseX < 30 + width - 60 && mouseY > height/1.5 && mouseY < height/1.5 + 40) iniciar = true;
    menuTime = millis();
    getAudioContext().resume();
    return;
  }
  
  background(200);
  image(fundo, 0,0, width, height);
  if (jogador.vivo && inimigo.vida) {
  push();
  text("EMILLY SCARLET: "+inimigo.vida+"/750", 20, 25)
  pop();
  jogador.mostrar();
  inimigo.mostrar();
  inimigo.mostrar();
  inimigo.andar();
 
  /* FHASJHFDSF
  push();
  
  
  translate(inimigo.x, inimigo.y);
  rotate(px);

    stroke(138, 12, 31, 70);
    strokeWeight(2);
    noFill();
    point(0, 0);
    circle(0, 0, 80);
    circle(0, 0, 100);

    pontos.forEach(ponto1 => {
      point(0 + 50*cos(ponto1), 0 + 50*sin(ponto1))
      pontos.forEach(ponto2 => {
        line(0 + 50*cos(ponto1), 0 + 50*sin(ponto1), 0 + 50*cos(ponto2), 0 + 50*sin(ponto2))
      })
    })
    
  pop();
  px+=0.02;
  */

  //if (keyIsPressed && keyCode == 32) {
    for (let ang in jogador.animation) {
      jogador.animation[ang] +=1/40;
    }
  //}
  
  

  for (let ataques of jogador.ataques) {
    ataques.mostrar("yellow");
    if (ataques instanceof DesvioInteligente) {
      ataques.atualizar(inimigo.x, inimigo.y, inimigo.d);
    }

    if (!ataques.mover() || dist(ataques.x, ataques.y, inimigo.x, inimigo.y) < ataques.d/2 + inimigo.d / 2) {
      if (dist(ataques.x, ataques.y, inimigo.x, inimigo.y) < ataques.d/2 + inimigo.d / 2) {
        inimigo.vida -= 5;
        score+=15;
      }
      jogador.ataques.splice(jogador.ataques.indexOf(ataques), 1);
    }
  }
  for (let projeteis of mapa.projeteis) {
    projeteis.mostrar();
    if (!projeteis.atualizar()) {
      mapa.projeteis.splice(mapa.projeteis.indexOf(projeteis), 1);
      proj++;
      if (inimigo.vida < 750 * 20 / 100) {
        let num = parseInt(random(0, 7)) % 2 == 0;
        mapa.novoProjetil(40, num ? 0 : width, random(0, height), num ? 2 : -2, 0)
      }
      else if (inimigo.vida < 750 * 40 / 100) {
        mapa.novoProjetil(30, inimigo.x, inimigo.y, random(-1, 1), random(1, 1.5));
      }
      else if (inimigo.vida < 750 * 70 / 100) {
        mapa.novoProjetil(20);
      } else {
        mapa.novoProjetil();
      }
    }
    // Morte
    if (dist(projeteis.x, projeteis.y, jogador.x, jogador.y) < projeteis.d/2 + jogador.d/2) {
      mapa.projeteis.splice(mapa.projeteis.indexOf(projeteis), 1);
      vidas.shift();
      jogador.inv ++;
      setTimeout(() => jogador.inv = 0, 1000);
      if (!vidas.length) {
        jogador.vivo = false
        jogador.carregarExplosao();
      }
    }
  }
  if (inimigo.vida < 750 * 40 / 100 && inimigo.vida > 750 * 20 / 100)  {
    for (let feixes of mapa.feixes) {
      feixes.mostrar("purple");
      if (!feixes.mover()) {
        mapa.feixes.splice(mapa.feixes.indexOf(feixes), 1)
      }
      if (!(inimigo.vida < 750 * 30 / 100)) {
        if (!mapa.feixes.length) {
          for (let i = 0; i < 5; i++) {
            mapa.novoFeixe();
          }
        }
      }
      if (dist(feixes.x, feixes.y, jogador.x, jogador.y) < feixes.w/2 + jogador.d/2) {
        mapa.feixes.splice(mapa.feixes.indexOf(feixes), 1);
        vidas.shift();
        jogador.inv ++;
        setTimeout(() => jogador.inv = 0, 1000);
        if (!vidas.length) {
          jogador.vivo = false
          jogador.carregarExplosao();
        }
      }
    }
  }
  if (jogador.inv) {
    jogador.inv+=2;
    jogador.invensivel();
  }
  jogador.mover();
  text(vidas.join(''), 5, height - 10);
  push();
  textSize(30)
  text(((millis() - menuTime)/1000).toFixed(2), width - 110, 30)
  pop();
  scoreInput.innerHTML = score;
  projInput.innerHTML = proj+"/10000";
  return;
  }
  textSize(30)
  text((jogador.vivo)?"PARABENS!":"GAME OVER", width/2 - 100, height/2);
  for (let explosivo of jogador.explosivos) {
    explosivo.mostrar("orange");
    explosivo.atualizar();
  }

}
setInterval(() => {if (iniciar) jogador.prepararAtaque()}, 200);
setInterval(() => {if (iniciar) jogador.prepararAtaqueInt()}, 600);
