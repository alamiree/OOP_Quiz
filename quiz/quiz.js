import Final from './final.js';
import Question from './question.js';
class Quiz {
    constructor(quizElement, amount, questions) {
        this.quizElement = quizElement;
        this.currentElement = document.querySelector(".current");
        this.totalElement = document.querySelector(".total");
        this.finalElement = document.querySelector(".final");
        this.nextBtn = document.querySelector("#next");
        this.totalAmount = amount;
        this.answeredAmount = 0;

        this.questions = this.setQuestion(questions);
        this.nextBtn.addEventListener("click", this.nextQuestion);
        this.renderQuestion()
    }

    setQuestion(questions) {
        return questions.map(question => new Question(question));
    }

    renderQuestion() {
        this.questions[this.answeredAmount].render();
        this.currentElement.innerHTML = this.answeredAmount;
        this.totalElement.innerHTML = this.totalAmount;
    }
    nextQuestion = () => {
        const checkElement = this.questions[this.answeredAmount].answerElements.filter(ele => ele.firstChild.checked);
        if (checkElement.length === 0) {
            alert("Check element");
        } else {
            this.questions[this.answeredAmount].answer(checkElement);
            this.answeredAmount++;
            this.answeredAmount < this.totalAmount ? this.renderQuestion() : this.endQuizApp();
        }
    }
    endQuizApp() {
        this.quizElement.style.display = "none";
        this.finalElement.style.display = "block";
        const correct = this.countCorrectAnswers();
        new Final(correct, this.totalAmount)
    }
    countCorrectAnswers() {
        let count = 0;
        this.questions.forEach(ele => {
            if (ele.isCorrect) {
                count++;
            }
        });
        return count;
    }
}
export default Quiz;