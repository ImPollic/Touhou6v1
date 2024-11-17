function Tela_Menu() {
    background(0);
    push();
    textAlign(CENTER);
    textSize(30);
    text("PROJETO TOUHOU", width/2, height/4);
    textSize(20);
    text("por ImPollic", width/2, height/4 + 40);
    rect(30, height/1.5, width - 60, 40);
    fill("black")
    text("Aperte aqui para iniciar", width/2, height/1.38);
    fill("white");
    pop();
}