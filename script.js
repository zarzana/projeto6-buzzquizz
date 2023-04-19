const perguntasCriar = document.querySelectorAll(".pergunta");

function selectPergunta(element){
    perguntasCriar.forEach(p=>{
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