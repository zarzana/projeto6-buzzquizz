// token para acesso do axios (Gabriel)
axios.defaults.headers.common['Authorization'] = 'Fxjk1r6zE4PiUsz1zfhA34GZ';

// get para obter todos os quizzes
// const quizzesPromisse = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');

// get para obter quizz por id
// const quizzPromisse = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/ID_DO_QUIZZ');

// post para criar quizz
// const newQuizzPromisse = axios.post('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes', newQuizz);

function loadQuizz(quizzId) {

    const quizzPromisse = axios.get(`https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${quizzId}`)
    quizzPromisse.then(renderQuizzPage)

}

function fisherYatesShuffle(arr) {

    let i = arr.length;

    while (--i > 0) {

      let randIndex = Math.floor(Math.random() * (i + 1));
      [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];

    }

    return arr;

}

function renderQuizzPage (quizzResponse) {

    var quizzData = quizzResponse.data;

    // quizz banner

    var quizzBanner = document.createElement('div');
    quizzBanner.setAttribute('class', 'quizz-banner darken-60');
    quizzBanner.setAttribute('data-test', 'banner');

    var quizzBannerImage = document.createElement('img');
    quizzBannerImage.setAttribute('src', quizzData.image);

    var quizzBannerH1 = document.createElement('h1');
    quizzBannerH1.innerHTML = quizzData.title;

    quizzBanner.appendChild(quizzBannerImage);
    quizzBanner.appendChild(quizzBannerH1);
    document.body.appendChild(quizzBanner);

    // quizz questions

    quizzData.questions.forEach(question => {
        
        var quizzQuestionDiv = document.createElement('div');
        quizzQuestionDiv.setAttribute('class', 'quizz-question');
        quizzQuestionDiv.setAttribute('data-test', 'question');

        var quizzQuestionTitle = document.createElement('div');
        quizzQuestionTitle.setAttribute('class', 'quizz-question-title');
        quizzQuestionTitle.setAttribute('data-test', 'question-title');
        quizzQuestionTitle.style.backgroundColor = question.color;
        var quizzQuestionTitleH2 = document.createElement('h2');
        quizzQuestionTitleH2.innerHTML = question.title;
        quizzQuestionTitle.appendChild(quizzQuestionTitleH2);

        var quizzAnswersDiv = document.createElement('div');
        quizzAnswersDiv.setAttribute('class', 'quizz-answers');

        fisherYatesShuffle(question.answers).forEach(answer => {

            var quizzAnswer = document.createElement('div');
            quizzAnswer.setAttribute('class', 'quizz-answer')
            quizzAnswer.setAttribute('data-test', 'answer')

            var quizzAnswerImage = document.createElement('img');
            quizzAnswerImage.setAttribute('src', answer.image);

            var quizzAnswerText = document.createElement('p');
            quizzAnswerText.innerHTML = answer.text;
            quizzAnswerText.setAttribute('data-test', 'answer-text')

            quizzAnswer.appendChild(quizzAnswerImage);
            quizzAnswer.appendChild(quizzAnswerText);
            quizzAnswersDiv.appendChild(quizzAnswer);

        })

        quizzQuestionDiv.appendChild(quizzQuestionTitle);
        quizzQuestionDiv.appendChild(quizzAnswersDiv);
        document.body.appendChild(quizzQuestionDiv);

        answerSelection(quizzQuestionDiv.lastChild)

    });

}

function answerSelection(questionDiv, targetClass = 'quizz-answer') {

    var elements = questionDiv.querySelectorAll('.' + targetClass);

    for (let i = 0; i < elements.length; i++) {

        elements[i].addEventListener('click', () => {

            for (let j = 0; j < elements.length; j++) {

                if (elements[i] != elements[j]) {

                    elements[j].style.opacity = 0.3;

                }

            }

        })

    }

}

// loadQuizz(1)
