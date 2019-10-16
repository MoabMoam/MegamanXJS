// Variaveis principais
var canvas;
var ctx;
var velocidade = 4;
var width = 800
var height = 600
var tile1 = new Image();
var megamanX;
var num_posicoes;
var frames;
var temporizador = 0
var maxPulos = 3;
var refX = document.getElementById("posX");
var refY = document.getElementById("posY");
var contEspinho = 1;
var contEspinho2 = 1;

// Recursos
var background = new Image();
background.src = "stage.png";
var player = new Image();
player.src = "player.png";
var logo = new Image();
logo.src = "_play.png";
var lose = new Image()
lose.src = "perdeu.png"
var thorn = new Image()
thorn.src = "_espinho.png";
var life10 = new Image()
life10.src = "./vida/VIDA_10.png"
var life9 = new Image()
life9.src = "./vida/VIDA_9.png"
var life8 = new Image()
life8.src = "./vida/VIDA_8.png"
var life7 = new Image()
life7.src = "./vida/VIDA_7.png"
var life6 = new Image()
life6.src = "./vida/VIDA_6.png"
var life5 = new Image()
life5.src = "./vida/VIDA_5.png"
var life4 = new Image()
life4.src = "./vida/VIDA_4.png"
var life3 = new Image()
life3.src = "./vida/VIDA_3.png"
var life2 = new Image()
life2.src = "./vida/VIDA_2.png"
var life1 = new Image()
life1.src = "./vida/VIDA_1.png"
var life0 = new Image()
life0.src = "./vida/VIDA_0.png"

// Estados
var _estadoAtual;  
var _estados = { 
    jogar: 0,
    jogando: 1,
    perdeu: 2
};

// Objetos
var play = { // Botão play
    img: logo,
    x: 0,
    y: 0,
    widght: 310,
    height: 220,
};

var perdeu = { // Botão perdeu
    img: lose,
    x: 0,
    y: 0,
    widght: 660,
    height: 500,
};

var gameWorld = { // Mundo
    img: background,
    x: 0,
    y: 0,
    width: 800,
    height: 600
};

var char = { // Mega Man
    img: player,
    x: 310,
    y: 0,
    width: 85,
    height: 98,
    gravidade: 0.9,
    velocidade: 0,
    forcaDoPulo: 13,
    qntPulos: 0,
    vida: 2500,

    atualiza: function() { // Gravidade
      this.velocidade += this.gravidade;
      this.y += this.velocidade;

      if (this.y > 375) {
        this.y = 375
        this.qntPulos = 0
      }
    },

    pula: function() { // Pulo
      if (this.qntPulos < maxPulos) {
        this.velocidade = -this.forcaDoPulo
        this.qntPulos += 1
      }
    },
};

var espinho = { // Espinho
  img: thorn,
  x: 50,
  y: 0,
  width: 15,
  height: 25,
  velocidade: 5
};

var espinho2 = {
  x: 50,
  y: 0,
  width: 15,
  height: 25,
  velocidade: 5
}


var barra10 = { // Barra de vida
  img: life10,
  x: 50,
  y: 512,
  width: 180,
  height: 10,
};
var barra9 = {
  img: life9,
  x: 50,
  y: 512,
  width: 140,
  height: 10,
};
var barra8 = {
  img: life8,
  x: 50,
  y: 512,
  width: 140,
  height: 10,
};
var barra7 = {
  img: life7,
  x: 50,
  y: 512,
  width: 140,
  height: 10,
};
var barra6 = {
  img: life6,
  x: 50,
  y: 512,
  width: 140,
  height: 10,
};
var barra5 = {
  img: life5,
  x: 50,
  y: 512,
  width: 140,
  height: 10,
};
var barra4 = {
  img: life4,
  x: 50,
  y: 512,
  width: 140,
  height: 10,
};
var barra3 = {
  img: life3,
  x: 50,
  y: 512,
  width: 140,
  height: 10,
};
var barra2 = {
  img: life2,
  x: 50,
  y: 512,
  width: 140,
  height: 10,
};
var barra1 = {
  img: life1,
  x: 50,
  y: 512,
  width: 140,
  height: 10,
};
var barra0 = {
  img: life0,
  x: 50,
  y: 512,
  width: 140,
  height: 10,
};

// Centralizando  o personagem
var cam = {
  x: 0,
  y: 0,
  width: 800,
  height: 600,
  leftEdge: function() {
    return this.x + this.width * 0.25;
  },
  rightEdge: function() {
    return this.x + this.width * 0.75;
  },
  topEdge: function() {
    return this.y + this.height * 0.25;
  },
  bottomEdge: function() {
    return this.x + this.height * 0.75;
  }
};

// centralizando a câmera
cam.x = (gameWorld.width - cam.width) / 2;
cam.y = (gameWorld.height - cam.height) / 2;

// Movendo o jogador
var mvLeft = (mvRight = mvUp = mvDown = false);
window.document.addEventListener(
  "keydown",
  function(e) {
    var key = e.keyCode;
    switch (key) {
      case 37:
        mvLeft = true;
        break;
      case 39:
        mvRight = true;
        break;
      case 88:
        mvUp = true;
        break;
      case 40:
        mvDown = true;
        break;
    }
  },
    false
);
window.document.addEventListener(
  "keyup",
  function(e) {
    var key = e.keyCode;
    switch (key) {
      case 37:
        mvLeft = false;
        break;
      case 39:
        mvRight = false;
        break;
      case 88:
        mvUp = false;
        break;
      case 40:
        mvDown = false;
        break;
    }
  },
    false,
);

var mvLeft = (mvRight = mvUp = mvDown = false);
window.document.addEventListener(
  "keydown",
    function(e) {
      var key = e.keyCode;
      switch (key) {
        case 37:
          mvLeft = true;
          break;
        case 39:
          mvRight = true;
          break;
        case 88:
          mvUp = true;
          break;
        case 40:
          mvDown = true;
          break;
        }
    },
    false
);
window.document.addEventListener(
      "keyup",
      function(e) {
        var key = e.keyCode;
        switch (key) {
          case 37:
            mvLeft = false;
            break;
          case 39:
            mvRight = false;
            break;
          case 88:
            mvUp = false;
            break;
          case 40:
            mvDown = false;
            break;
        }
      },
      false,
    );
 
function movendoChar() {
    if (mvLeft && !mvRight) {
        char.x -= 4;
    }
    if (mvRight && !mvLeft) {
        char.x += 4;
    }
    if (mvUp && !mvDown) {
        char.pula()
    }
    if (mvDown && !mvUp) {
      
    }
}

// Limite da Câmera
function limiteCam() {
  if (cam.x < 0) {
    cam.x = 0;
  }
  if (cam.x + cam.widght > gameWorld.width) {
    cam.x = gameWorld.width - cam.width;
  }
  if (cam.y < 0) {
    cam.y = 0;
  }
  if (cam.y + cam.height > gameWorld.height) {
    cam.y = gameWorld.height - cam.height;
  }
}

// Limite do Mega Man
function limiteChar() {
  if (char.x < 49) {
    char.x = 49;
  }
  if (char.x > 670) {
    char.x = 670;
  }
  if (char.y < 60) {
    char.y = 60;
  }
  if (char.y > 375) {
    char.y = 375
    char.qntPulos = 0
  }
}

// Clique
function clique(event) {
  if (_estadoAtual == _estados.jogar) {
    _estadoAtual = _estados.jogando
  }
}

// Função inicializadora
function main() {
    width = 800
    height = 600

    canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height

    ctx = canvas.getContext("2d")
    document.body.appendChild(canvas)

    document.addEventListener("mousedown", clique)

    _estadoAtual = _estados.jogar


    run()
}

// Agrupamento de funções principais
function run () {
    update()
    draw()
    movendoChar()
    limiteCam()
    limiteChar()
    posAtual()
    colisao()
    contVida()
    window.requestAnimationFrame(run)

  console.log(espinho2.x)
  

}

function update() {
    frames += 1
    char.atualiza()
}

// Desenhar
function draw() {
  ctx.drawImage(gameWorld.img, 0, 0, 800, 600); // Desenhar mundo

  if (_estadoAtual == _estados.jogar) {
    ctx.drawImage(play.img, 270, 150, 310, 150); // Desenhar botão play
  } else if (_estadoAtual == _estados.jogando) {
    temporizador += 1 // temporizador
    // Desenhar objeto indo e vindo
    // Primeiro espinho
    if (contEspinho % 2 == 0) {
    ctx.drawImage(espinho.img, espinho.x -= espinho.velocidade, 450, espinho.width, espinho.height);
    if (espinho.x == 50) {
      contEspinho += 1
    }
    }
    if (contEspinho % 2  != 0) {
      ctx.drawImage(espinho.img, espinho.x += espinho.velocidade, 450, espinho.width, espinho.height);
    }
    if (espinho.x == 735) {
      contEspinho += 1
    }
    // Segundo espinho
    if (temporizador > 140) {
      if (contEspinho2 % 2 != 0) {
        ctx.drawImage(espinho.img, espinho2.x += espinho2.velocidade, 450, espinho.width, espinho.height);
        if (espinho2.x == 735) {
          contEspinho2 += 1
        }
        }
        if (contEspinho2 % 2  == 0) {
          ctx.drawImage(espinho.img, espinho2.x -= espinho2.velocidade, 450, espinho.width, espinho.height);
        }
        if (espinho2.x == 50) {
          contEspinho2 += 1
        }
     }
     

    ctx.drawImage(char.img, char.x, char.y, char.width, char.height); // Desenhar personagem principal

    if (char.vida <= 2500 && char.vida > 2250) { // 100% de vida
      ctx.drawImage(barra10.img, barra10.x, barra10.y, barra10.width, barra10.height)
     } else if (char.vida <= 2250 && char.vida > 2000) { // 90% de vida
      ctx.drawImage(barra9.img, barra10.x, barra10.y, barra10.width, barra10.height)
     } else if (char.vida <= 2000 && char.vida > 1750) { // 80% de vida
      ctx.drawImage(barra8.img, barra10.x, barra10.y, barra10.width, barra10.height)
     } else if (char.vida <= 1750 && char.vida > 1500) { // 70% de vida
      ctx.drawImage(barra7.img, barra10.x, barra10.y, barra10.width, barra10.height)
     } else if (char.vida <= 1500 && char.vida > 1250) { // 60% de vida
      ctx.drawImage(barra6.img, barra10.x, barra10.y, barra10.width, barra10.height)
     } else if (char.vida <= 1250 && char.vida > 1000) { // 50% de vida
      ctx.drawImage(barra5.img, barra10.x, barra10.y, barra10.width, barra10.height)
     } else if (char.vida <= 1000 && char.vida > 750) { // 40% de vida
      ctx.drawImage(barra4.img, barra10.x, barra10.y, barra10.width, barra10.height)
     } else if (char.vida <= 750 && char.vida > 500) { // 30% de vida
      ctx.drawImage(barra3.img, barra10.x, barra10.y, barra10.width, barra10.height)
     } else if (char.vida <= 500 && char.vida > 250) { // 20 % de vida
      ctx.drawImage(barra2.img, barra10.x, barra10.y, barra10.width, barra10.height)
     } else if (char.vida <= 250 && char.vida > 0) { // 10 % de vida
      ctx.drawImage(barra1.img, barra10.x, barra10.y, barra10.width, barra10.height)
     } else if (char.vida == 0) {                   // 0% de vida
      ctx.drawImage(barra0.img, barra10.x, barra10.y, barra10.width, barra10.height)
     }

  } else if (_estadoAtual == _estados.perdeu) { // Desenhar botão de gamer over 
    ctx.drawImage(perdeu.img, 270, 150, 310, 150);
    ctx.drawImage(barra0.img, barra10.x, barra10.y, barra10.width, barra10.height)   
  }

}

// Colisão
function colisao() {
  if (char.x > espinho.x - 77 && char.x < espinho.x + 15) { // Colisão com o espinho
    if (char.y > 340) {
      char.vida -= 50 
    }
  }
  if (char.x > espinho2.x - 77 && char.x < espinho2.x + 15) { // Colisão com o espinho
    if (char.y > 340) {
      char.vida -= 50
    }
  }
}

// Contador de vida
function contVida() {
  if (char.vida == 0) {
    _estadoAtual = _estados.perdeu
  }
}

// Posição atual do jogador
function posAtual() {
  refX.textContent = char.x;
  refY.textContent = char.y;
}

// Inicializar o jogo
main();
