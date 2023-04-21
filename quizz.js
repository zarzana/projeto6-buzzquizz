// token para acesso do axios (Gabriel)
axios.defaults.headers.common['Authorization'] = 'Fxjk1r6zE4PiUsz1zfhA34GZ';


// |----- COMO UTILIZAR -----|\

// Para utilizar, basta instanciar a classe passando o id do quizz como primeiro parâmetro
// e o objeto da div que deve conter os elementos da página como segundo parâmetro:

// const pageDiv = document.body.querySelector('.page');
// var quizz = new QuizzPage(1, pageDiv);

// Para então carregar os elementos na página, basta utilizar o método .load():

// quizz.load();


class QuizzPage {

    constructor (id, targetElement = document.body) {

        this.id = id;
        this.targetElement = targetElement;

        this.numberOfQuestions = null;
        this.correctAnswers = 0;
        this.data = null;
        this.achievedLevel = null;
        this.percentageCorrect = null;

        this.renderQuizzPage = this.renderQuizzPage.bind(this);
        this.answerSelection = this.answerSelection.bind(this);

    }

    static fisherYatesShuffle (arr) {

        let i = arr.length;
    
        while (--i > 0) {
    
        let randIndex = Math.floor(Math.random() * (i + 1));
        [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];
    
        }
    
        return arr;
    
    }

    load () {

        const quizzPromisse = axios.get(`https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${this.id}`)
        quizzPromisse.then(this.renderQuizzPage)

    }

    renderQuizzPage (quizzResponse) {

        this.data = quizzResponse.data;

        // quizz banner

        var quizzBanner = document.createElement('div');
        quizzBanner.setAttribute('class', 'quizz-banner darken-60');
        quizzBanner.setAttribute('data-test', 'banner');

        var quizzBannerImage = document.createElement('img');
        quizzBannerImage.setAttribute('src', this.data.image);

        var quizzBannerH1 = document.createElement('h1');
        quizzBannerH1.innerHTML = this.data.title;

        quizzBanner.appendChild(quizzBannerImage);
        quizzBanner.appendChild(quizzBannerH1);
        
        this.targetElement.appendChild(quizzBanner);

        // quizz questions

        this.numberOfQuestions = this.data.questions.length;

        this.data.questions.forEach(question => {
            
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

            var i = 0
            var correctAnswerId = null;

            QuizzPage.fisherYatesShuffle(question.answers).forEach(answer => {

                if (answer.isCorrectAnswer) {correctAnswerId = `quizzAnswer${i}`}

                var quizzAnswer = document.createElement('div');
                quizzAnswer.setAttribute('class', 'quizz-answer');
                quizzAnswer.setAttribute('id', `quizzAnswer${i}`);
                quizzAnswer.setAttribute('data-test', 'answer');

                var quizzAnswerImage = document.createElement('img');
                quizzAnswerImage.setAttribute('src', answer.image);

                var quizzAnswerText = document.createElement('p');
                quizzAnswerText.innerHTML = answer.text;
                quizzAnswerText.setAttribute('data-test', 'answer-text');

                quizzAnswer.appendChild(quizzAnswerImage);
                quizzAnswer.appendChild(quizzAnswerText);
                quizzAnswersDiv.appendChild(quizzAnswer);

                i += 1;

            })

            quizzQuestionDiv.appendChild(quizzQuestionTitle);
            quizzQuestionDiv.appendChild(quizzAnswersDiv);
            this.targetElement.appendChild(quizzQuestionDiv);

            this.answerSelection(quizzQuestionDiv.lastChild, correctAnswerId)

        });

    }

    answerSelection (questionDiv, correctAnswerId, targetClass = 'quizz-answer') {

        var elements = questionDiv.querySelectorAll('.' + targetClass);
    
        for (let i = 0; i < elements.length; i++) {
    
            elements[i].addEventListener('click', () => {
    
                if (elements[i].id == correctAnswerId) {
    
                    this.correctAnswers += 1;
        
                }
    
                for (let j = 0; j < elements.length; j++) {
    
                    if (elements[i] === elements[j]) {elements[j].classList.add('selected-answer')}
                    else {elements[j].classList.add('unselected-answer')}
    
                    if (elements[j].id == correctAnswerId) {elements[j].lastChild.style.color = '#009C22'}
                    else {elements[j].lastChild.style.color = '#FF4B4B'}
                
                }
    
                setTimeout(() => {
    
                    questionDiv.closest('.quizz-question').nextSibling.scrollIntoView({ behavior: 'smooth', block: 'center'})
    
                }, 2000)

                this.resultTrigger()
    
            }, {once : true})
    
        }
    
    }

    resultTrigger () {

        if (document.querySelectorAll('.selected-answer').length == this.numberOfQuestions) {
            
            this.percentageCorrect = 100 * this.correctAnswers / this.numberOfQuestions;

            this.data.levels.forEach(level => {

                if (this.percentageCorrect >= level.minValue) {

                    this.achievedLevel = level;

                }

            })

            this.renderResult()
            
        }

    }

    renderResult () {

        var quizzResult = document.createElement('div');
        quizzResult.setAttribute('class', 'quizz-result');

        var quizzResultTitle = document.createElement('div');
        quizzResultTitle.setAttribute('class', 'quizz-result-title');
        quizzResultTitle.setAttribute('data-test', 'level-title');

        var quizzResultTitleH2 = document.createElement('h2');
        quizzResultTitleH2.innerHTML = Math.round(this.percentageCorrect) + '% de acerto: ' + this.achievedLevel.title;
        quizzResultTitle.appendChild(quizzResultTitleH2);

        var quizzResultContent = document.createElement('div');
        quizzResultContent.setAttribute('class', 'quizz-result-content');

        var quizzResultContentImage = document.createElement('img');
        quizzResultContentImage.setAttribute('data-test', 'level-img');
        quizzResultContentImage.setAttribute('src', this.achievedLevel.image);

        var quizzResultContentText = document.createElement('p');
        quizzResultContentText.setAttribute('data-test', 'level-text');
        quizzResultContentText.innerHTML = this.achievedLevel.text;

        var quizzRestartButton = document.createElement('button');
        quizzRestartButton.setAttribute('class', 'quizz-restart-button');
        quizzRestartButton.setAttribute('data-test', 'restart');
        quizzRestartButton.innerHTML = 'Reiniciar Quizz';

        var quizzBackButton = document.createElement('button');
        quizzBackButton.setAttribute('class', 'quizz-back-button');
        quizzBackButton.setAttribute('data-test', 'go-home');
        quizzBackButton.innerHTML = 'Voltar para home';

        quizzResultContent.appendChild(quizzResultContentImage);
        quizzResultContent.appendChild(quizzResultContentText);
        
        quizzResult.appendChild(quizzResultTitle);
        quizzResult.appendChild(quizzResultContent);

        this.targetElement.appendChild(quizzResult);

        this.targetElement.appendChild(quizzRestartButton);
        this.targetElement.appendChild(quizzBackButton);

    }

    empty () {

        this.targetElement.innerHTML = '';

    }

}

const pageDiv = document.body.querySelector('.page');
var quizz = new QuizzPage(26, pageDiv);

quizz.load();
