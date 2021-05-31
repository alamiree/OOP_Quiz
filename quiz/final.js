class Final {
    constructor(correctAnswers, totalAmount) {
        this.scoreElement = document.querySelector(".score");
        this.againBtn = document.querySelector("#again");

        this.render(correctAnswers, totalAmount);
        this.againBtn.addEventListener('click', this.startAgain);
    }
    startAgain = () => {
        location.reload();
    }
    render(correctAnswers, totalAmount) {
        this.scoreElement.innerHTML = `You answered ${correctAnswers} out of ${totalAmount} correct`;
    }
}
export default Final;