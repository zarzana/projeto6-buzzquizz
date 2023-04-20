const perguntasCriar = document.querySelectorAll(".pergunta");
const niveisCriar = document.querySelectorAll(".nivel");

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

selectOption(perguntasCriar[0]);
selectOption(niveisCriar[0]);