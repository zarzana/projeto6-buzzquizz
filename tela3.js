

function addQuestions(numero){
    const areaQuestions = document.querySelector(".area");
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
    areaQuestions.innerHTML+=`<button>Prosseguir pra criar níveis</button>`;
}

function addLevels(numero){
    const areaLevels = document.querySelector(".area");
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
    areaLevels.innerHTML+=`<button>Finalizar Quizz</button>`;
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

