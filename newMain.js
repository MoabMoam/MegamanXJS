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
var maxPulos = 2;

// Recursos
var background = new Image();
background.src = "stage.png";
var player = new Image();
player.src = "player.png";
var logo = new Image();
logo.src = "_play.png";
var lose = new Image()
lose.src = "perdeu.png"

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
    x: 0,
    y: 0,
    width: 85,
    height: 98,
    gravidade: 0.9,
    velocidade: 0,
    forcaDoPulo: 13,
    qntPulos: 0,

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

  //centralizando a o personagem
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

//movendo o jogador
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
        refX.textContent = char.x;
        char.x -= 4;
    }
    if (mvRight && !mvLeft) {
        refX.textContent = char.x;
        char.x += 4;
    }
    if (mvUp && !mvDown) {
        refY.textContent = char.y;
        char.pula()
    }
    if (mvDown && !mvUp) {
        refY.textContent = char.y;
      _estadoAtual = _estados.perdeu
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
    if (char.y + char.height > gameWorld.height) {
        
    }
}

// Clique
function clique(event) {
    _estadoAtual = _estados.jogando
}

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

function run () {
    update()
    draw()
    movendoChar()
    limiteCam()
    limiteChar()

    window.requestAnimationFrame(run)

    console.log(_estadoAtual)
}

function update() {
    frames += 1
    char.atualiza()
}

function draw() {
  ctx.drawImage(gameWorld.img, 0, 0, 800, 600);

  if (_estadoAtual == _estados.jogar) {
    ctx.drawImage(play.img, 270, 150, 310, 150);
  } else if (_estadoAtual == _estados.jogando) {
    ctx.drawImage(char.img, char.x, char.y, 85, 98);
  } else if (_estadoAtual == _estados.perdeu) {
    ctx.drawImage(perdeu.img, 270, 150, 310, 150);
  }
}

// Mostrar posição do jogador
var refX = document.getElementById("posX");
var refY = document.getElementById("posY");

// Inicializar o jogo
main();