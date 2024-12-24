// Véletlenszerű sorrend generálása (csak a válaszok szövegét keverjük meg)
function shuffleAnswersContent() {
    const answersContainer = document.querySelector('.answers');
    const answerBoxes = Array.from(answersContainer.children);

    const shuffledAnswers = answerBoxes
        .map(box => ({
            text: box.innerHTML,
            correct: box.getAttribute('data-correct'),
        }))
        .sort(() => Math.random() - 0.5);

    answerBoxes.forEach((box, index) => {
        box.setAttribute('data-correct', shuffledAnswers[index].correct);
        const optionLetter = box.querySelector('.option').textContent;
        box.innerHTML = `<span class="option">${optionLetter}</span>${shuffledAnswers[index].text.split('</span>')[1]}`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.querySelector('.question');
    const answerElements = document.querySelectorAll('.answer-box');

    // Kezdetben letiltjuk a kattintásokat
    let answersClickable = false;

    questionElement.style.visibility = 'hidden';
    answerElements.forEach(answer => {
        answer.style.visibility = 'hidden';
    });

    setTimeout(() => {
        questionElement.style.visibility = 'visible';
    }, 2000);

    answerElements.forEach((answer, index) => {
        setTimeout(() => {
            answer.style.visibility = 'visible';
            // Ha az utolsó válasz is megjelent, engedélyezzük a kattintást
            if (index === answerElements.length - 1) {
                answersClickable = true;
            }
        }, 4000 + index * 2000);
    });

    shuffleAnswersContent();
    handleAnswerClick(() => answersClickable);
});

function handleAnswerClick(isClickable) {
    document.querySelectorAll('.answer-box').forEach(answer => {
        answer.addEventListener('click', () => {
            if (!isClickable()) return; // Ha nem kattintható, ne csináljon semmit

            const isCorrect = answer.getAttribute('data-correct') === 'true';

            document.querySelectorAll('.answer-box').forEach(box => {
                box.style.backgroundColor = '';
                box.style.animation = '';
                box.querySelector('.option').style.color = '';
            });

            answer.querySelector('.option').style.color = 'black';

            if (isCorrect) {
                answer.style.backgroundColor = 'orange';
                setTimeout(() => {
                    answer.style.animation = 'blink-correct 0.7s linear infinite';
                }, 3000);

                setTimeout(() => {
                    answer.style.animation = '';
                    showPrizeMessage('5 000 Ft');
                }, 5000);
            } else {
                answer.style.backgroundColor = 'orange';

                const correctAnswer = document.querySelector('.answer-box[data-correct="true"]');
                setTimeout(() => {
                    correctAnswer.style.animation = 'blink 0.7s linear infinite';
                }, 5000);

                setTimeout(() => {
                    showPrizeMessage('0 Ft');
                }, 8000);
            }
        });
    });
}

function showPrizeMessage(prize) {
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.innerHTML = '';

    const prizeMessage = document.createElement('div');
    prizeMessage.className = 'prize-message';

    prizeMessage.innerHTML = `
        <span class="prize-label">Nyeremény:</span><br>
        <span class="prize-amount">${prize}</span>`;

    quizContainer.appendChild(prizeMessage);
}