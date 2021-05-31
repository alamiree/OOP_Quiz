// https://opentdb.com/api.php?amount=10&category=21&difficulty=easy
import Quiz from './quiz.js';
class settings {
    constructor() {
        this.settingDom = document.querySelector(".settings");
        this.quizDom = document.querySelector(".quiz");
        this.categoryDom = document.querySelector("#category");
        this.nQuestionsDom = document.querySelector("#nQuestions");
        this.startBtn = document.querySelector("#startBtn");
        this.difficultyDom = [
            document.querySelector("#easy"),
            document.querySelector("#medium"),
            document.querySelector("#hard")
        ];
        this.quiz = {};
        this.startBtn.addEventListener("click", this.startQuizApp)
    }
    startQuizApp = async() => {
        try {
            const amount = this.getAmount();
            const categoryID = this.categoryDom.value;
            const difficulty = this.getDifficulty();
            const Api_url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryID}&difficulty=${difficulty}`;
            let { results } = await this.fetchData(Api_url);
            this.quiz = new Quiz(this.quizDom, amount, results)
            this.toggleElements();
            console.log(results)
        } catch (err) {
            alert(err)
        }
    }

    toggleElements = () => {
        this.settingDom.style.display = "none";
        this.quizDom.style.display = "block";
    }

    getAmount = () => {
        const amount = this.nQuestionsDom.value;
        if (amount > 0 && amount < 20) {
            return amount;
        } else {
            alert("Wrong number of questions")
        }
    }
    getDifficulty = () => {
        const difficulty = this.difficultyDom.filter((el) => el.checked);
        if (difficulty.length === 1) {
            return difficulty[0].id;
        } else {
            alert("Please select difficulty level");
        }
    }
    fetchData = async(Api_url) => {
        const response = await fetch(Api_url);
        const result = await response.json();
        return result;
    }
}
export default settings;