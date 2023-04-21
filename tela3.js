const obj = {};

function checkImage(url) {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);});
}

function addCreation(){
    const areaCreate = document.querySelector(".area");
    areaCreate.innerHTML=`<div class="create">
        <input type="text" class="tituloCreate" id="" placeholder="Titulo do seu Quizz">
        <input type="text" class="urlCreate" id="" placeholder="URL da imagem do seu quizz">
        <input type="text" class="perguntasCreate" id="" placeholder="Quantidade de perguntas do quizz">
        <input type="text" class="niveisCreate" id="" placeholder="Quantidade de níveis do quizz">
    </div>
    <button onclick="Questions()">Prosseguir pra criar perguntas</button>`;
}

function addQuestions(numero){
    const areaQuestions = document.querySelector(".area");
    areaQuestions.innerHTML="";
    for(let i=0;i<numero;i++){
        areaQuestions.innerHTML+=`<div class="pergunta" onclick="selectOption(this)">
        <div class="titulo"><p>Pergunta ${i+1}</p><ion-icon name="create-outline"></ion-icon></div>
        <div>
            <input type="text" class="textPergunta" id="" placeholder="Texto da pergunta">
            <input type="text" class="corPergunta" id="" placeholder="Cor da pergunta">
        </div>
        <div>
            <p>Resposta correta</p>
            <input type="text" class="respostaCorreta" id="" placeholder="Resposta correta">
            <input type="text" class="urlResposta" id="" placeholder="URL da imagem">
        </div>
        <div>
            <p>Resposta incorreta</p>
            <input type="text" class="respostaIncorreta" id="" placeholder="Resposta incorreta 1">
            <input type="text" class="urlResposta" id="" placeholder="URL da imagem 1">
            <input type="text" class="respostaIncorreta" id="" placeholder="Resposta incorreta 2">
            <input type="text" class="urlResposta" id="" placeholder="URL da imagem 2">
            <input type="text" class="respostaIncorreta" id="" placeholder="Resposta incorreta 3">
            <input type="text" class="urlResposta" id="" placeholder="URL da imagem 3">
        </div>
    </div>`;
    }
    areaQuestions.innerHTML+=`<button onclick="Niveis()">Prosseguir pra criar níveis</button>`;
    selectOption(document.querySelector(".pergunta"));
}

function addLevels(numero){
    const areaLevels = document.querySelector(".area");
    areaLevels.innerHTML="";
    for(let i=0;i<numero;i++){
        areaLevels.innerHTML+=`<div class="nivel" onclick="selectOption(this)">
        <div class="titulo"><p>Nivel ${i+1}</p><ion-icon name="create-outline"></ion-icon></div>
            <div>
                <input type="text" class="tituloNivel" id="" placeholder="Titulo do nível">
                <input type="text" class="acertoNivel" id="" placeholder="% de acerto">
                <input type="text" class="urlNivel" id="" placeholder="URL da imagem do nível">
                <input type="text" class="descNivel" id="" placeholder="Descrição do nível">
            </div>
        </div>`;
    }
    areaLevels.innerHTML+=`<button onclick="Success()">Finalizar Quizz</button>`;
    selectOption(document.querySelector(".nivel"));
}

function addSuccess(frase,url){
    const areaSuccess = document.querySelector(".area");
    areaSuccess.innerHTML="";
        areaSuccess.innerHTML+=`<div class="quizz">
        <img class="img_quiz" src="${url}">
        <div class="text_quizz"><p>${frase}</p></div>
        </div>
        <button>Acessar Quizz</button>
        <button class="button2">Voltar para home</button>`;
}

function selectOption(element){
    const lista = document.querySelectorAll(`.${element.classList.value}`);
    lista.forEach(p=>{
        for(const child of p.children){
            if(child.classList!="titulo"){
                child.style.display="none";
            }
        }
    })
    for(const child of element.children){
        child.style.display="flex";
    }
}

function Create(){
    document.body.innerHTML=`<div class="fixed_top_bar">
    <h1>BuzzQuizz</h1>
    </div>
    <p class="criarPTitulo">Comece pelo começo</p>
    <div class="area">
    </div>`;
    addCreation();
}

async function Questions(){
    const titulo = document.querySelector(".tituloCreate");
    const imagem = document.querySelector(".urlCreate");
    const perguntas = document.querySelector(".perguntasCreate");
    const niveis = document.querySelector(".niveisCreate");
    if((titulo.value.length>=20&&titulo.value.length<=65)&&
    await checkImage(imagem.value)&&
    (Number(perguntas.value)>=3)&&
    (Number(niveis.value)>=2)){
        obj["title"] = `${titulo.value}`;
        obj["image"] = `${imagem.value}`;
        obj["questions"] = [];
        obj["levels"] = [];
        for(let i=0;i<perguntas.value;i++){
            obj["questions"][i] = {};
        }
        for(let i=0;i<niveis.value;i++){
            obj["levels"][i] = {};
        }
        document.querySelector(".criarPTitulo").innerHTML="Crie suas perguntas";
        addQuestions(obj["questions"].length);
    }
    else{
        alert("Preencha os dados corretamente");
    }
}

async function Niveis(){
    let rivazio = 0;
    const respIfiltro = [];
    const RegExp = /^#[0-9A-F]{6}$/i;
    let textoP=[],corP=[],respcP=[],respURL=[],respI=[];
    const perguntas = document.querySelectorAll(".pergunta");
    perguntas.forEach(p=>textoP.push(p.querySelector(".textPergunta")));
    const textoPfiltro=textoP.filter(x => x.value.length<20);
    perguntas.forEach(p=>corP.push(p.querySelector(".corPergunta")));
    const corPfiltro=corP.filter(x => !RegExp.test(x.value));
    perguntas.forEach(p=>respcP.push(p.querySelector(".respostaCorreta")));
    const respcPfiltro=respcP.filter(x => x.value.length==0);
    perguntas.forEach(p=>respURL.push(p.querySelector(".urlResposta")));
    const respURLfiltro=respURL.filter(x => !checkImage(x.value));
    perguntas.forEach(p=>respI.push(p.querySelectorAll(".respostaIncorreta")));
    for(let i=0;i<respI.length;i++){
        respIfiltro.push([]);
        let v = 0;
        for(let c=0;c<respI[i].length;c++){
            if(respI[i][c].value.length!=0){
                respIfiltro[i].push(respI[i][c]);
            }else{
                v++;
            }
            if(v==respI[i].length){
                rivazio++;
            }
        }
    }
    if(textoPfiltro.length==0&&
        corPfiltro.length==0&&
        respcPfiltro.length==0&&
        respURLfiltro.length==0&&
        rivazio==0){
        for(let i=0;i<obj["questions"].length;i++){
            obj["questions"][i]['title'] = textoP[i].value;
            obj["questions"][i]['color'] = corP[i].value;
            obj["questions"][i]['answers'] = [{}];
            obj["questions"][i]['answers'][0]['text'] = respcP[0].value
            obj["questions"][i]['answers'][0]['image'] = respURL[0].value
            obj["questions"][i]['answers'][0]['isCorrectAnswer'] = true;
            for(let c=0;c<respIfiltro[i].length;c++){
                obj["questions"][i]['answers'][c+1]={};
                obj["questions"][i]['answers'][c+1]['text'] = respIfiltro[i][c].value
                obj["questions"][i]['answers'][c+1]['image'] = respIfiltro[i][c].nextElementSibling.value
                obj["questions"][i]['answers'][c+1]['isCorrectAnswer'] = false;
            }
        }
        document.querySelector(".criarPTitulo").innerHTML="Agora, decida os níveis";
        addLevels(qtdNivel);
    }else{
        alert("Preencha os dados corretamente");
        console.log(textoPfiltro.length,corPfiltro.length,respcPfiltro.length,respURLfiltro.length,rivazio);
    }
}

function Success(){
    document.querySelector(".criarPTitulo").innerHTML="Seu quizz está pronto!";
    addSuccess(titulo,url);
}
