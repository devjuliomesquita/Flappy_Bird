console.log('Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

//MOSTRAR A IMAGEM DO FLAPPY BIRD NA TELA

const flappyBird = {
    spriteX:0,
    spriteY:0,
    largura:33,
    altura:24,
    x:10,
    y:50,
    gravidade:0.25,
    velocidade:0,

    atualizar(){
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    desenha(){
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY,
            flappyBird.largura, flappyBird.altura,
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura
        );        
    }
};


// MOSTRAR A IMAGEM DO CHÃO NA TELA

const chao = {
    spriteX:0,
    spriteY:610,
    largura:224,
    altura:112,
    x:0,
    y:canvas.height - 112,
    desenha(){
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura
        );
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura
        );
    }
};

//MOSTRAR O PLANO DE FUNDO

const plFundo = {
    spriteX:390,
    spriteY:0,
    largura:275,
    altura:204,
    x:0,
    y:canvas.height - 204,
    desenha(){
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            plFundo.spriteX, plFundo.spriteY,
            plFundo.largura, plFundo.altura,
            plFundo.x, plFundo.y,
            plFundo.largura, plFundo.altura
        );
        contexto.drawImage(
            sprites,
            plFundo.spriteX, plFundo.spriteY,
            plFundo.largura, plFundo.altura,
            (plFundo.x + plFundo.largura), plFundo.y,
            plFundo.largura, plFundo.altura
        );
    }
};

//MOSTRAR A TELA DE INICIO

const getReady = {
    spriteX:134,
    spriteY:0,
    largura:174,
    altura:152,
    x:(canvas.width/2) - (174/2),
    y:50,
    desenha(){
        contexto.drawImage(
            sprites,
            getReady.spriteX, getReady.spriteY,
            getReady.largura, getReady.altura,
            getReady.x, getReady.y,
            getReady.largura, getReady.altura
        );
    }
};

//DIVISÃO POR TELAS

let telaAtiva = {};
function mudarParaTela(novaTela) {
    telaAtiva = novaTela;
}

const Telas = {
    INICIO:{
        desenha() {
            plFundo.desenha();
            chao.desenha();
            flappyBird.desenha();
            getReady.desenha();
        },
        click(){
            mudarParaTela(Telas.JOGO);
        },
        atualizar(){

        }
    },
    
};

Telas.JOGO = {
    desenha(){
        plFundo.desenha();
        chao.desenha();
        flappyBird.desenha();
    },
    atualizar(){
        flappyBird.atualizar();
    }
}

//FUNÇÃO DE CHAMAR AS TELAS
function loop(){

    telaAtiva.desenha();
    telaAtiva.atualizar();
    requestAnimationFrame(loop);
};

window.addEventListener('click', function() {
    if(telaAtiva.click){
        telaAtiva.click();
    }
});

mudarParaTela(Telas.INICIO);
loop();
