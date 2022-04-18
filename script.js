console.log('Flappy Bird');

//FRAMES
let frames = 0;

//SONS DE COLISÃO
const som_HIT = new Audio();
som_HIT.src = './Efeitos/efeitos_hit.wav';
const som_CAIU = new Audio();
som_CAIU.src = './Efeitos/efeitos_caiu.wav';
const som_PONTO = new Audio();
som_PONTO.src = './Efeitos/efeitos_ponto.wav';
const som_PULO = new Audio();
som_PULO.src = './Efeitos/efeitos_pulo.wav';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

//FUNÇÃO DE COLISÃO
function fazColisao(flappyBird,chao){
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if(flappyBirdY >= chaoY){
        return true;
    } else{
        return false;
    }
};


//MOSTRAR A IMAGEM DO FLAPPY BIRD NA TELA
function criarFappyBird() {
    const flappyBird = {
        spriteX:0,
        spriteY:0,
        largura:33,
        altura:24,
        x:10,
        y:50,
        pulo:4.6,
        pular(){
            flappyBird.velocidade = - flappyBird.pulo;
        },
        gravidade:0.25,
        velocidade:0,

        atualizar(){
            if(fazColisao(flappyBird,globais.chao)){
                som_HIT.play();
                setTimeout(()=>{
                    mudarParaTela(Telas.INICIO);
                }, 300);                
                return;
            }

            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        movimentos: [
            { spriteX: 0, spriteY:  0, },
            { spriteX: 0, spriteY: 26, },
            { spriteX: 0, spriteY: 52, },
            { spriteX: 0, spriteY: 26, },
        ],
        frameAtual:0,
        atualizarFrame(){
            const intervaloFrame = 10;
            const passouIntervalo = frames % intervaloFrame === 0;
            if(passouIntervalo){
                const baseIncremento = 1;
                const incremento = baseIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao;
            }
        },
        desenha(){
            flappyBird.atualizarFrame();
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];
            contexto.drawImage(
                sprites,
                spriteX, spriteY,
                flappyBird.largura, flappyBird.altura,
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura
            );        
        }
    };
    return flappyBird;
};

// MOSTRAR A IMAGEM DO CHÃO NA TELA
function criarChao(){
    const chao = {
        spriteX:0,
        spriteY:610,
        largura:224,
        altura:112,
        x:0,
        y:canvas.height - 112,
        atualizar(){
            const movChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.x - movChao;
            chao.x = movimentacao % repeteEm;
        },
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
    return chao;
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

const globais = {};
let telaAtiva = {};
function mudarParaTela(novaTela) {
    telaAtiva = novaTela;
    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
}

const Telas = {
    INICIO:{
        inicializa(){
            globais.flappyBird = criarFappyBird();
            globais.chao = criarChao();
        },
        desenha() {
            plFundo.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
            getReady.desenha();
        },
        click(){
            mudarParaTela(Telas.JOGO);
        },
        atualizar(){
            globais.chao.atualizar();
        }
    },
    
};

Telas.JOGO = {
    desenha(){
        plFundo.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
    },
    click(){
        globais.flappyBird.pular();
    },
    atualizar(){
        globais.flappyBird.atualizar();
    }
}

//FUNÇÃO DE CHAMAR AS TELAS
function loop(){

    telaAtiva.desenha();
    telaAtiva.atualizar();
    frames = frames + 1;
    requestAnimationFrame(loop);
};

window.addEventListener('click', function() {
    if(telaAtiva.click){
        telaAtiva.click();
    }
});

mudarParaTela(Telas.INICIO);
loop();
