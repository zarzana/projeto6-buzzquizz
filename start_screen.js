axios.defaults.headers.common['Authorization'] = 'gScBm2BaQcHtufzILhmtZOn3';

function rendering_quizzes (quizzes) {


    const HTMLquizzes = document.querySelector('.all_quizzes .quizzes')
    const all_quizzes = quizzes.data

    HTMLquizzes.innerHTML = ''
    

    for (let i = 0; i < all_quizzes.length; i++) {
        HTMLquizzes.innerHTML += `
        <div onclick="enter_in_quiz(${all_quizzes[i].id})" class="quizz">

            <img class="img_quiz" src=${all_quizzes[i].image}>
            <div class="gradient"></div>

            <div class="text_quizz">
                <p>${all_quizzes[i].title}</p>
            </div>

        </div>
        `
    }
}



function handle_error (error) {
    alert('Algo deu errado T-T ! Favor recarregue a página ou tente novamente mais tarde!')
    window.location.reload()
    

}







//renderizar os quizzes na tela inicial
const promisse = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes')
promisse.then(rendering_quizzes)
promisse.catch(handle_error)





const exemplo = ["João", "Maria", "José"];  // Array que você quer salvar
const exemploSerializado = JSON.stringify(exemplo); // Array convertida pra uma string

localStorage.setItem("lista3", exemploSerializado);




const listaSerializada = localStorage.getItem(Object.keys(localStorage)[1]);
const listasla = JSON.parse(listaSerializada);
console.log(Object.keys(localStorage)[1])



function rendering_quizz (quizz) {
    const HTMLquizz = document.querySelector('.content_adjust')
    HTMLquizz.innerHTML = ''

    console.log(quizz)

}



function enter_in_quiz (id) {
    const promisse = axios.get(`https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${id}`)
    promisse.then(rendering_quizz)
}