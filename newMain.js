// Variaveis principais
var canvas;
var ctx;
var width = 800
var height = 600
var megamanX;
var num_posicoes;
var frames;
var temporizador = 0
var maxPulos = 1;
var contEspinho = 1;
var contEspinho2 = 1;
var playerScore = 0;
var paredeLimite1 = 50;
var paredeLimite2 = 730;
var paredeLimite3 = 50
var paredeLimite4 = 730
var contScore = 0;


// Recursos
var background = new Image();
background.src = "stage.png";
var player = new Image();
player.src = "player.png";
var logo = new Image();
logo.src = "_play.png";
var lose = new Image();
lose.src = "perdeu.png";
var thorn = new Image();
thorn.src = "_espinho.png";
var life1 = new Image();
life1.src = "./barrax/1.png"
var life2 = new Image();
life2.src = "./barrax/2.png"
var life3 = new Image();
life3.src = "./barrax/3.png"
var life4 = new Image();
life4.src = "./barrax/4.png";
var life5 = new Image();
life5.src = "./barrax/5.png";
var life6 = new Image();
life6.src = "./barrax/6.png";
var life7 = new Image();
life7.src = "./barrax/7.png";
var life8 = new Image();
life8.src = "./barrax/8.png";
var life9 = new Image();
life9.src = "./barrax/9.png";
var life10 = new Image();
life10.src = "./barrax/10.png"
var life11 = new Image();
life11.src = "./barrax/11.png";
var life12 = new Image();
life12.src = "./barrax/12.png";
var life13 = new Image();
life13.src = "./barrax/13.png";
var life14 = new Image();
life14.src = "./barrax/14.png";
var life15 = new Image();
life15.src = "./barrax/15.png";
var life16 = new Image();
life16.src = "./barrax/16.png";
var life17 = new Image();
life17.src = "./barrax/17.png";


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
    x: 270,
    y: 150,
    widght: 288,
    height: 150,
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
    vida: 2550,

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

// Espinhos
var espinho = { 
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

// Barra de vida
var barra1 = { 
  img: life1,
  x: 10,
  y: 90,
  width: 20,
  height: 100,
};
var barra2 = {
  img: life2,
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
var barra4 = {
  img: life4,
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
var barra6 = {
  img: life6,
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
var barra8 = {
  img: life8,
  x: 50,
  y: 512,
  width: 140,
  height: 10,
};
var barra9 = {
  img: life9,
  x: 50,
  y: 512,
  width: 140,
  height: 10,
};
var barra10 = {
  img: life10,
  x: 10,
  y: 90,
  width: 20,
  height: 100,
};
var barra11 = {
  img: life11,
  x: 50,
  y: 512,
  width: 140,
  height: 10,
};
var barra12 = {
  img: life12,
  x: 50,
  y: 512,
  width: 140,
  height: 10,
};
var barra13 = {
  img: life13,
  x: 50,
  y: 512,
  width: 140,
  height: 10,
};
var barra14 = {
  img: life14,
  x: 50,
  y: 512,
  width: 140,
  height: 10,
};
var barra15 = {
  img: life15,
  x: 50,
  y: 512,
  width: 140,
  height: 10,
};
var barra16 = {
  img: life16,
  x: 50,
  y: 512,
  width: 140,
  height: 10,
};
var barra17 = {
  img: life17,
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

// Barra de vida
function barraVida() {
  if (char.vida <= 2550 && char.vida > 2400) {
    ctx.drawImage(barra1.img, barra10.x, barra10.y, barra10.width, barra10.height)
   } else if (char.vida <= 2400 && char.vida > 2250) { 
    ctx.drawImage(barra2.img, barra10.x, barra10.y, barra10.width, barra10.height)
   } else if (char.vida <= 2250 && char.vida > 2100) { 
    ctx.drawImage(barra3.img, barra10.x, barra10.y, barra10.width, barra10.height)
   } else if (char.vida <= 2100 && char.vida > 1950) { 
    ctx.drawImage(barra4.img, barra10.x, barra10.y, barra10.width, barra10.height)
   } else if (char.vida <= 1950 && char.vida > 1800) { 
    ctx.drawImage(barra5.img, barra10.x, barra10.y, barra10.width, barra10.height)
   } else if (char.vida <= 1800 && char.vida > 1650) { 
    ctx.drawImage(barra6.img, barra10.x, barra10.y, barra10.width, barra10.height)
   } else if (char.vida <= 1650 && char.vida > 1500) { 
    ctx.drawImage(barra7.img, barra10.x, barra10.y, barra10.width, barra10.height)
   } else if (char.vida <= 1500 && char.vida > 1350) { 
    ctx.drawImage(barra8.img, barra10.x, barra10.y, barra10.width, barra10.height)
   } else if (char.vida <= 1350 && char.vida > 1200) { 
    ctx.drawImage(barra9.img, barra10.x, barra10.y, barra10.width, barra10.height)
   } else if (char.vida <= 1200 && char.vida > 1050) { 
    ctx.drawImage(barra10.img, barra10.x, barra10.y, barra10.width, barra10.height)
   } else if (char.vida <= 1050 && char.vida > 900) { 
    ctx.drawImage(barra11.img, barra10.x, barra10.y, barra10.width, barra10.height)
   } else if (char.vida <= 900 && char.vida > 750) { 
    ctx.drawImage(barra12.img, barra10.x, barra10.y, barra10.width, barra10.height)
   } else if (char.vida <= 750 && char.vida > 600) { 
    ctx.drawImage(barra13.img, barra10.x, barra10.y, barra10.width, barra10.height)
   } else if (char.vida <= 600 && char.vida > 450) { 
    ctx.drawImage(barra14.img, barra10.x, barra10.y, barra10.width, barra10.height)
   } else if (char.vida <= 450 && char.vida > 300) { 
    ctx.drawImage(barra15.img, barra10.x, barra10.y, barra10.width, barra10.height)
   } else if (char.vida <= 300 && char.vida > 150) { 
    ctx.drawImage(barra16.img, barra10.x, barra10.y, barra10.width, barra10.height)
   } else if (char.vida <= 150 && char.vida > 0) { 
    ctx.drawImage(barra16.img, barra10.x, barra10.y, barra10.width, barra10.height)
   } else if (char.vida == 0) {
    ctx.drawImage(barra17.img, barra10.x, barra10.y, barra10.width, barra10.height)
   }

}

// Score
function score() {
  playerScore = parseInt(temporizador / 5)
  ctx.font = "30px Arial Black"
  ctx.fillText(`Score: ${playerScore}`, 300, 525)
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

// Agrupamento de funções
function run () {
    update()
    draw()
    movendoChar()
    limiteCam()
    limiteChar()
    colisao()
    contVida()
    window.requestAnimationFrame(run)
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
    if (espinho.x == paredeLimite1) {
      contEspinho += 1
    }
    }
    if (contEspinho % 2  != 0) {
      ctx.drawImage(espinho.img, espinho.x += espinho.velocidade, 450, espinho.width, espinho.height);
    }
    if (espinho.x == paredeLimite2) {
      contEspinho += 1
    }
    // Segundo espinho
    if (temporizador > 140) {
      if (contEspinho2 % 2 != 0) {
        ctx.drawImage(espinho.img, espinho2.x += espinho2.velocidade, 450, espinho.width, espinho.height);
        if (espinho2.x == paredeLimite4) {
          contEspinho2 += 1
        }
        }
        if (contEspinho2 % 2  == 0) {
          ctx.drawImage(espinho.img, espinho2.x -= espinho2.velocidade, 450, espinho.width, espinho.height);
        }
        if (espinho2.x == paredeLimite3) {
          contEspinho2 += 1
        }
     }

     // Aumento da velocidade do espinho
     if (playerScore > 108) {
       espinho.velocidade = 10
       
     }
     if (playerScore > 130) {
       espinho2.velocidade = 8
       paredeLimite3 = 52
       paredeLimite4 = 732
     }
     


    ctx.drawImage(char.img, char.x, char.y, char.width, char.height); // Desenhar personagem principal
    
    barraVida() // Barra de vida
    score()  // Pontuação do jogador


  } else if (_estadoAtual == _estados.perdeu) { // Desenhar botão de gamer over 
    ctx.drawImage(perdeu.img, perdeu.x, perdeu.y, perdeu.widght, perdeu.height);
    ctx.drawImage(barra17.img, barra10.x, barra10.y, barra10.width, barra10.height);
    score();
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

// Inicializar o jogo
main();
