axios.defaults.headers.common['Authorization'] = 'gScBm2BaQcHtufzILhmtZOn3';

function rendering_quizzes (quizzes) {

    const listIds = localStorage.getItem('ids');
    const ids = JSON.parse(listIds);
    console.log(ids)

    const createQuizzDiv = document.querySelector('.createQuizzDiv')
    createQuizzDiv.innerHTML = ''

    if (ids == undefined) {
        
        createQuizzDiv.innerHTML = `
        <div class="create_quizz border_dashed">

          <p class="title">Você não criou nenhum quizz ainda :(</p>
          <button data-test="create-btn" onclick="Create()" class="create_quizz_buttom">Criar Quizz</button>
        
        </div>
        `
    } else {
        createQuizzDiv.innerHTML += `
            <div class="your_quizzes">

                <div class="title_your_quizzes">
                    <p class="title">Seus Quizzes</p>
                    <div data-test="create-btn" onclick="Create()" class="img_add_quiz">
                        <img src="../Assets/add-circle-outline.svg">
                    </div>
                </div>
            
                <div class="quizzes">

                    
                </div>
            </div>`

        for (let count = 0; count< ids.length; count++) {
            const promisse = axios.get(`https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${ids[count].id}`)
            
            const quizzCreated = document.querySelector('.quizzes')
            console.log('aq')
            promisse.then(function (quizzUser){

                
                const quizzData = quizzUser.data
                console.log(quizzData.id)
                quizzCreated.innerHTML += `
                <div data-test="my-quiz" onclick="enter_in_quiz(${quizzData.id})" class="quizz">

                    <img class="img_quiz" src=${quizzData.image}>
                    <div class="gradient"></div>

                    <div class="text_quizz">
                        <p>${quizzData.title}</p>
                    </div>

                </div>`
            })
            
            
        }
    }

    const HTMLquizzes = document.querySelector('.all_quizzes .quizzes')
    const all_quizzes = quizzes.data

    HTMLquizzes.innerHTML = ''
    

    for (let i = 0; i < all_quizzes.length; i++) {
        HTMLquizzes.innerHTML += `
        <div data-test="others-quiz" onclick="enter_in_quiz(${all_quizzes[i].id})" class="quizz">

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








function rendering_quizz (quizz) {
    console.log(quizz)

    const HTMLquizz = document.querySelector('.content_adjust')
    HTMLquizz.innerHTML = ''
    var quizz = new QuizzPage(quizz.data.id, HTMLquizz);
    
    quizz.load();

}



function enter_in_quiz (id) {
    const promisse = axios.get(`https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${id}`)
    promisse.then(rendering_quizz)
}