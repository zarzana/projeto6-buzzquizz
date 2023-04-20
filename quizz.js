// token para acesso do axios (Gabriel)
axios.defaults.headers.common['Authorization'] = 'Fxjk1r6zE4PiUsz1zfhA34GZ';

// get para obter todos os quizzes
// const quizzesPromisse = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');

// get para obter quizz por id
// const quizzPromisse = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/ID_DO_QUIZZ');

// post para criar quizz
// const newQuizzPromisse = axios.post('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes', newQuizz);


class QuizzPage {

    constructor (id) {
        this.id = id;
        this.numberOfQuestions = null;
        this.correctAnswers = 0;
        this.data = null;
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
        document.body.appendChild(quizzBanner);

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
            document.body.appendChild(quizzQuestionDiv);

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
            
            var percentageCorrect = 100 * this.correctAnswers / this.numberOfQuestions;
            var percentageCorrectDisplay = Math.round(percentageCorrect);

            var achievedLevel = null;

            this.data.levels.forEach(level => {

                if (percentageCorrect >= level.minValue) {

                    achievedLevel = level;

                }

            })
            
        }

    }

}

// const quizz = new QuizzPage(1);
// quizz.load();
