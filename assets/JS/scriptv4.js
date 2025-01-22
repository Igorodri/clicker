const click = document.getElementById("area"); //Quadrado que, ao clickar, muda as cores e incrementa o valor de N
const number = document.getElementById("number");// Para mudar o número de pontos feitos pelo jogador
const nivel = document.getElementById("fase");//Indicar o nível que o jogador se encontra
const timerElement = document.getElementById('timer');//Variável que armazena o timer
const btn_sair = document.getElementById("retornar");//Variável que armazena o botão de voltar

const x2 = document.getElementById("2x");//Habilidade que atribui o valor de 2 a variável incremento
const x4 = document.getAnimations("4x");//Habilidade que atribui o valor de 4 a variável incremento
const seta = document.getElementById("avancar");//Habilidade de avançar uma fase

const cores = [//Todas as cores que o "click" pode ter de background
    "#FF0000", // Vermelho
    "#00FF00", // Verde Limão
    "#0000FF", // Azul
    "#FFFF00", // Amarelo
    "#FF00FF", // Magenta
    "#00FFFF", // Ciano
    "#FF6347", // Tomate
    "#FF4500", // Laranja Vermelho
    "#2E8B57", // Verde Mar Escuro
    "#DA70D6", // Magenta Claro
    "#FF8C00", // Laranja Escuro
    "#FF1493", // Rosa Choque
    "#ADFF2F", // Verde Chartreuse
    "#FF00FF", // Magenta
    "#F0E68C", // Amarelo Areia
    "#7FFF00", // Verde Chartreuse
    "#D2691E", // Chocolate
    "#FFB6C1", // Rosa Claro
    "#E0FFFF", // Ciano Claro
    "#FF7F50", // Coral
    "#6A5ACD", // Azul Aço
    "#A0522D", // Marrom
    "#C71585", // Rosa Escuro
    "#F4A460", // Areia
    "#4682B4", // Azul Aço
    "#B22222", // Vermelho Tijolo
    "#5F9EA0", // Verde Azulado
    "#7B68EE", // Azul Médio
    "#00BFFF", // Azul Céu
    "#8A2BE2", // Azul Violeta
    "#6B8E23", // Verde Oliva
    "#E9967A", // Salmão Claro
    "#00FA9A", // Verde Água
    "#40E0D0", // Turquesa
    "#9ACD32", // Verde Amarelo
    "#3CB371", // Verde Mar
    "#D3D3D3", // Cinza Claro
    "#F08080", // Salmão
    "#B0E0E6", // Azul Poeira
    "#FF6347", // Tomate
    "#C71585", // Rosa Escuro
    "#DA70D6", // Magenta Claro
    "#FF69B4", // Rosa Choque
    "#FF4500", // Laranja Vermelho
    "#00BFFF", // Azul Céu
    "#8A2BE2", // Azul Violeta
    "#9ACD32", // Verde Amarelo
    "#FF00FF", // Magenta
    "#E6E6FA", // Lavanda
    "#FF8C00", // Laranja Escuro
    "#B22222", // Vermelho Tijolo
    "#00FF7F", // Verde Mar
    "#B0C4DE", // Azul Claro
    "#FF1493", // Rosa Choque
    "#FF4500", // Laranja Vermelho
    "#E6E6FA", // Lavanda
    "#FF00FF", // Magenta
    "#B22222", // Vermelho Tijolo
    "#FF8C00", // Laranja Escuro
    "#00FA9A", // Verde Água
    "#F5DEB3", // Trigo
    "#FF69B4", // Rosa Choque
    "#FFE4C4", // Areia
    "#FF1493", // Rosa Choque
    "#FF6347", // Tomate
    "#ADFF2F", // Verde Limão
    "#F0E68C", // Amarelo Areia
    "#E9967A", // Salmão Claro
    "#FFD700", // Ouro
    "#FF00FF", // Magenta
    "#00BFFF", // Azul Céu
    "#8A2BE2", // Azul Violeta
    "#FF4500", // Laranja Vermelho
    "#D2691E", // Chocolate
    "#FF6347", // Tomate
    "#FF8C00", // Laranja Escuro
    "#00FA9A", // Verde Água
    "#F5F5DC", // Bege
    "#FF00FF", // Magenta
    "#8A2BE2", // Azul Violeta
    "#00FF7F", // Verde Mar
    "#FF6347", // Tomate
    "#FFD700", // Ouro
    "#FF8C00", // Laranja Escuro
    "#FF1493", // Rosa Choque
    "#00BFFF", // Azul Céu
    "#ADFF2F", // Verde Limão
    "#E0FFFF", // Ciano Claro
    "#FF4500", // Laranja Vermelho
    "#FF6347", // Tomate
    "#FF1493", // Rosa Choque
    "#FF4500", // Laranja Vermelho
    "#00FF7F", // Verde Mar
    "#B0E0E6", // Azul Poeira
    "#FF00FF", // Magenta
    "#00FA9A", // Verde Água
    "#FF6347", // Tomate
    "#F5DEB3", // Trigo
    "#FF69B4", // Rosa Choque
    "#FFE4C4", // Areia
    "#FF1493"  // Rosa Choque
];

i = 0; //Variável de controle que controla as cores que serão mostradas no jogo

n = 0;//Variável que contabiliza os pontos

n_comparador = 0;//Variável para comparar o pontos e permitir que o usuário passe de fase ao chegar no valor de 150 pontos

incremento = 0;//Valor do ganho de pontos que o usuário pode ter

fase = 1;//Variável de controle de fases

contador_fase = 0//Váriavel que conta as fases a partir de zero, para que a skill AVANÇAR possa funcionar corretamente

controller = true; // Isso controla que a notificação não se repita

habilidade_em_uso = false;//Variável que controla se a habilidade tá em uso ou não
fim_game = false//Variável que controla o uso de skills quando o jogo termina

cooldow_ativo_1 = false;//Variável que controla o tempo que a habilidade 2X vai estar inativa
cooldow_ativo_2 = false;//Variável que controla o tempo que a habilidade 4X vai estar inativa

function speed2(){
    const duracao = 10000;//Variável que controla a duração da habilidade
    const duracao_cooldown = 15000;//Variável que controla o tempo que a variável vai estar inativa

    if(!habilidade_em_uso && !fim_game){
      if(!cooldow_ativo_1){
        incremento = 2//Valor do incremento aumentado após o uso da habilidade
        habilidade_em_uso = true;//Indica que a habilidade esta em uso, impossibilitando que outra skill seja usada
        Toastify({
            text: "2X ATIVADO",//Avisa o ativamento da skill
            duration: 5000,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top", // `top` ou `bottom`
            position: "right", // `left`, `center` ou `right`
            stopOnFocus: true, 
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)", //Cor vermelha: linear-gradient(to right, #ff0000, #ec5353) e cor verde linear-gradient(to right, #00b09b, #96c93d) 
            },
            onClick: function(){} 
          }).showToast();

        setTimeout(() => {
            incremento = 1; //Volta o valor do incremento a 1 após a duração da habilidade chegar no fim
            habilidade_em_uso = false;//Variável de controle das habilidades volta para false após o termino da habilidade
            Toastify({
                text: "2X DESATIVADO",//Avisa o desativamento da skill após a sua duração
                duration: 5000,
                destination: "",
                newWindow: true,
                close: true,
                gravity: "top", // `top` ou `bottom`
                position: "right", // `left`, `center` ou `right`
                stopOnFocus: true, 
                style: {
                  background: "linear-gradient(to right, #ff0000, #ec5353)", //Cor vermelha: linear-gradient(to right, #ff0000, #ec5353) e cor verde linear-gradient(to right, #00b09b, #96c93d) 
                },
                onClick: function(){} 
              }).showToast();


            setTimeout(() => {//Avisa que a skill pode ser usada novamente
                Toastify({
                    text: "2X pode ser usado novamente",//Avisa que a skill pode ser usada novamente
                    duration: 5000,
                    destination: "",
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` ou `bottom`
                    position: "right", // `left`, `center` ou `right`
                    stopOnFocus: true, 
                    style: {
                      background: "linear-gradient(to right, #00b09b, #96c93d)", //Cor vermelha: linear-gradient(to right, #ff0000, #ec5353) e cor verde linear-gradient(to right, #00b09b, #96c93d) 
                    },
                    onClick: function(){} 
                  }).showToast();
                cooldow_ativo_1 = false; // Finaliza o cooldown
            }, duracao_cooldown);

        }, duracao);

        cooldow_ativo_1 = true;//Habilita o cooldown da skill
    }else{
        Toastify({
            text: "2X está em Cooldown",//Avisa que a skill esta em cooldown
            duration: 3000,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top", // `top` ou `bottom`
            position: "right", // `left`, `center` ou `right`
            stopOnFocus: true, 
            style: {
              background: "linear-gradient(to right, #ff0000, #ec5353)", //Cor vermelha: linear-gradient(to right, #ff0000, #ec5353) e cor verde linear-gradient(to right, #00b09b, #96c93d) 
            },
            onClick: function(){} 
          }).showToast();
    }

    }else{
      Toastify({
        text: "Impossível usar 2X",//Impossível usar a habilidade quando outra skill estiver sendo usada
        duration: 3000,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "top", // `top` ou `bottom`
        position: "right", // `left`, `center` ou `right`
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #ff0000, #ec5353)", //Cor vermelha: linear-gradient(to right, #ff0000, #ec5353) e cor verde linear-gradient(to right, #00b09b, #96c93d) 
        },
        onClick: function(){} 
      }).showToast();
    }
    
}

function speed4(){
  const duracao = 6000; 
  const duracao_cooldown = 25000;

  if(!habilidade_em_uso && !fim_game){
    if(!cooldow_ativo_2){
      incremento = 4
      habilidade_em_uso = true;
      Toastify({
          text: "4X ATIVADO",
          duration: 5000,
          destination: "",
          newWindow: true,
          close: true,
          gravity: "top", // `top` ou `bottom`
          position: "right", // `left`, `center` ou `right`
          stopOnFocus: true, 
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)", //Cor vermelha: linear-gradient(to right, #ff0000, #ec5353) e cor verde linear-gradient(to right, #00b09b, #96c93d) 
          },
          onClick: function(){} 
        }).showToast();

      setTimeout(() => {
          incremento = 1;
          habilidade_em_uso = false;
          Toastify({
              text: "4X DESATIVADO",
              duration: 5000,
              destination: "",
              newWindow: true,
              close: true,
              gravity: "top", // `top` ou `bottom`
              position: "right", // `left`, `center` ou `right`
              stopOnFocus: true, 
              style: {
                background: "linear-gradient(to right, #ff0000, #ec5353)", //Cor vermelha: linear-gradient(to right, #ff0000, #ec5353) e cor verde linear-gradient(to right, #00b09b, #96c93d) 
              },
              onClick: function(){} // Callback after click
            }).showToast();


          setTimeout(() => {
              Toastify({
                  text: "4X pode ser usado novamente",
                  duration: 5000,
                  destination: "",
                  newWindow: true,
                  close: true,
                  gravity: "top", // `top` ou `bottom`
                  position: "right", // `left`, `center` ou `right`
                  stopOnFocus: true, 
                  style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)", //Cor vermelha: linear-gradient(to right, #ff0000, #ec5353) e cor verde linear-gradient(to right, #00b09b, #96c93d) 
                  },
                  onClick: function(){}
                }).showToast();
              cooldow_ativo_2 = false; // Finaliza o cooldown
          }, duracao_cooldown);

      }, duracao);

      cooldow_ativo_2 = true;
  }else{
      Toastify({
          text: "4X está em Cooldown",
          duration: 3000,
          destination: "",
          newWindow: true,
          close: true,
          gravity: "top", // `top` ou `bottom`
          position: "right", // `left`, `center` ou `right`
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #ff0000, #ec5353)", //Cor vermelha: linear-gradient(to right, #ff0000, #ec5353) e cor verde linear-gradient(to right, #00b09b, #96c93d) 
          },
          onClick: function(){} 
        }).showToast();
  }

  }else{
    Toastify({
      text: "Impossível usar 4X",
      duration: 3000,
      destination: "",
      newWindow: true,
      close: true,
      gravity: "top", // `top` ou `bottom`
      position: "right", // `left`, `center` ou `right`
      stopOnFocus: true, 
      style: {
        background: "linear-gradient(to right, #ff0000, #ec5353)", //Cor vermelha: linear-gradient(to right, #ff0000, #ec5353) e cor verde linear-gradient(to right, #00b09b, #96c93d) 
      },
      onClick: function(){} 
    }).showToast();
  }
  
}

function avancar(){
    if(contador_fase >= 3 && fim_game == false){
      seta.style.border = "1px solid black"
      fase++;
      contador_fase = 0;
      controller = true; 
      Toastify({
          text: "FASE "+ fase,
          duration: 1200,
          destination: "",
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #ff7e5f, #feb47b)", //Cor vermelha: linear-gradient(to right, #ff0000, #ec5353) e cor verde linear-gradient(to right, #00b09b, #96c93d) 
          },
          onClick: function(){} // Callback after click
        }).showToast();

      nivel.innerText = 'Fase ' + fase;

    Toastify({
        text: "FASE AVANÇADA",
        duration: 1200,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "top", // `top` ou `bottom`
        position: "right", // `left`, `center` ou `right`
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #ff7e5f, #feb47b)", //Cor vermelha: linear-gradient(to right, #ff0000, #ec5353) e cor verde linear-gradient(to right, #00b09b, #96c93d) 
        },
        onClick: function(){} 
      }).showToast();
    }else{
      Toastify({
        text: "Impossível usar AVANÇAR",
        duration: 1200,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "top", // `top` ou `bottom`
        position: "right", // `left`, `center` ou `right`
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #ff0000, #ec5353)", //Cor vermelha: linear-gradient(to right, #ff0000, #ec5353) e cor verde linear-gradient(to right, #00b09b, #96c93d) 
        },
        onClick: function(){} 
      }).showToast();
    }
    
}

function passar_fase(){
    if(n_comparador >= 150){
        fase++;
        contador_fase++;
        n_comparador = 0 //resetar valor
        Toastify({
            text: "FASE "+ fase,
            duration: 1200,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #ff7e5f, #feb47b)", //Cor vermelha: linear-gradient(to right, #ff0000, #ec5353) e cor verde linear-gradient(to right, #00b09b, #96c93d) 
            },
            onClick: function(){} // Callback after click
          }).showToast();

        nivel.innerText = 'Fase ' + fase;

    }
}

function startTimer(minutes) {
  incremento = 1;
  let time = minutes * 60; 
  
  const timer = setInterval(() => {
      const minutesLeft = Math.floor(time / 60);
      const secondsLeft = time % 60;
      
      // Formatar o tempo para MM:SS
      timerElement.textContent = `${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;

      if (time <= 0) {
          clearInterval(timer);
          Toastify({
            text: "Fim de Jogo!",
            duration: 12000,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #ff0000, #ec5353)", //Cor vermelha: linear-gradient(to right, #ff0000, #ec5353) e cor verde linear-gradient(to right, #00b09b, #96c93d) 
            },
            onClick: function(){} // Callback after click
          }).showToast();
          incremento = 0;
          fim_game = true;//Bloqueia o uso de skills quando o jogo termina
          btn_sair.style.display = "block"
      }
      
      time--;
  }, 1000);
}

function incrementar(){
  n += incremento;
  n_comparador += incremento;
  i++;
  number.innerText = n;
  passar_fase();

  if(i == 99){
      i = 0;
  }else{
      click.style.backgroundColor = cores[i];
      timerElement.style.color = cores[i];
      btn_sair.style.backgroundColor = cores[i];
  }

  if(contador_fase >= 3 && controller == true){
    seta.style.border = "3px solid green"
      Toastify({
          text: "AVANÇAR PODE SER USADO!",
          duration: 5000,
          destination: "",
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function(){}
      }).showToast();
      controller = false; // Isso controla que a notificação não se repita
  }

}

click.addEventListener("click",incrementar);



document.addEventListener('keydown', function(e) {
  if (e.key === 'q'){
        speed2();
  }

})//TECLA DE ATALHO PARA USAR 2X

document.addEventListener('keydown', function(e) {
  if (e.key === 'e')
    speed4()
})//TECLA DE ATALHO PARA USAR 4X

document.addEventListener('keydown', function(e) {
  if (e.key === 'r')
    avancar()
})//TECLA DE ATALHO PARA USAR AVANÇAR

let keyPressed = false;

document.addEventListener('keydown', function(e) {
  if (e.key === ' ' && !keyPressed) {
    incrementar();
    keyPressed = true;
  }
});

document.addEventListener('keyup', function(e) {
  if (e.key === ' ') {
    keyPressed = false;
  }
});//TECLA DE ATALHO PARA USAR AVANÇAR

click.addEventListener('touchstart', function(event) {
     if (!keyPressed) {
        event.preventDefault(); 
        incrementar();
        keyPressed = true;
  }
});

click.addEventListener('touchend', function(event) {
    keyPressed = false;
});

btn_sair.addEventListener("click", function(){
  location.reload();
})//Aplica um reload na página








