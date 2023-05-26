(() => {
    "use strict";
    document.documentElement.classList.add("lock");
    let score = 0;
    let highscore = 0;
    let secretNumber = 0;
    let hardLevel = false;
    let storageEasyLevelScore = false;
    let storageMediumLevelScore = false;
    let storageHardLevelScore = false;
    const checkButton = document.querySelector(".check");
    const againButton = document.querySelector(".again");
    const displayNumber = document.querySelector(".header__question");
    const hightScore = document.querySelector(".page__highscore");
    const displayScore = document.querySelector(".page__score");
    const inputNumber = document.querySelector(".page__number-input");
    const body = document.querySelector("body");
    const starGameButton = document.querySelectorAll(".header__level");
    const headerMenu = document.querySelector(".header__menu");
    const infoLevel = document.querySelector(".header__between");
    const chooseLevelButton = document.querySelector(".footer__button");
    const massageBlock = document.querySelector(".page__guess-message");
    const localStorageGetResult = highscore => {
        if (storageEasyLevelScore) localStorage.setItem("easyLevel", highscore); else if (storageMediumLevelScore) localStorage.setItem("mediumLevel", highscore); else if (storageHardLevelScore) localStorage.setItem("hardLevel", highscore);
    };
    const localStorageSetResult = () => {
        const easyHighscore = localStorage.getItem("easyLevel");
        const mediumHighscore = localStorage.getItem("mediumLevel");
        const hardHighscore = localStorage.getItem("hardLevel");
        if (easyHighscore && storageEasyLevelScore) {
            highscore = easyHighscore;
            return highscore;
        }
        if (mediumHighscore && storageMediumLevelScore) {
            highscore = mediumHighscore;
            return highscore;
        }
        if (hardHighscore && storageHardLevelScore) {
            highscore = hardHighscore;
            return highscore;
        }
        return 0;
    };
    const displayGuessMessage = async message => {
        if (message === "Game Over!") massageBlock.style.color = "#ff0000"; else if (message === "Начни угадывать!") massageBlock.style.color = "#fbff00"; else massageBlock.style.color = "#fff";
        massageBlock.textContent = message;
    };
    const generatorSecretNumber = numberChooseLevel => Math.trunc(Math.random() * `${numberChooseLevel}`) + 1;
    const chooseLevel = e => {
        e.preventDefault();
        const {target} = e;
        setTimeout((() => {
            headerMenu.classList.add("start-game");
        }), 300);
        if (target.classList.contains("easy")) {
            target.classList.add("choose");
            storageEasyLevelScore = true;
            highscore = localStorageSetResult();
            score = 15;
            displayScore.textContent = score;
            hightScore.textContent = highscore || 0;
            infoLevel.textContent = "(Между 1 и 20)";
            secretNumber = generatorSecretNumber(20);
        } else if (target.classList.contains("medium")) {
            target.classList.add("choose");
            storageMediumLevelScore = true;
            highscore = localStorageSetResult();
            score = 20;
            displayScore.textContent = score;
            hightScore.textContent = highscore || 0;
            infoLevel.textContent = "(Между 1 и 50)";
            secretNumber = generatorSecretNumber(50);
        } else if (target.classList.contains("hard")) {
            target.classList.add("choose");
            storageHardLevelScore = true;
            highscore = localStorageSetResult();
            hightScore.textContent = highscore || 0;
            score = 30;
            displayScore.textContent = score;
            infoLevel.textContent = "(Между 1 и 100)";
            hardLevel = true;
            secretNumber = generatorSecretNumber(100);
        }
    };
    const startGame = () => {
        storageEasyLevelScore = false;
        storageMediumLevelScore = false;
        storageHardLevelScore = false;
        displayGuessMessage("Начни угадывать!");
        if (headerMenu.classList.contains("start-game")) headerMenu.classList.remove("start-game");
        if (hardLevel) hardLevel = false;
        starGameButton.forEach((buttom => {
            if (buttom.classList.contains("choose")) buttom.classList.remove("choose");
            buttom.addEventListener("click", chooseLevel);
        }));
    };
    const playGame = () => {
        const guessingNumber = Number(inputNumber.value);
        let numberValue = parseFloat(inputNumber.value);
        if (numberValue === 0) {
            displayGuessMessage("Введите выше 0!");
            return;
        } else if (!guessingNumber) {
            displayGuessMessage("Введите число!");
            return;
        } else if (guessingNumber === secretNumber) {
            displayGuessMessage("Правильно!");
            displayNumber.textContent = secretNumber;
            body.style.backgroundColor = "rgb(9, 250, 21)";
            if (score > highscore) {
                highscore = score;
                hightScore.textContent = highscore;
                if (storageEasyLevelScore) localStorageGetResult(highscore); else if (storageMediumLevelScore) localStorageGetResult(highscore); else if (storageHardLevelScore) localStorageGetResult(highscore);
            }
        } else if (guessingNumber !== secretNumber) if (score > 1) {
            const difference = guessingNumber > secretNumber ? guessingNumber - secretNumber : secretNumber - guessingNumber;
            if (secretNumber > difference && difference > 10 && difference <= 30 && hardLevel) {
                displayGuessMessage("Очень мало");
                score--;
                displayScore.textContent = score;
                return;
            } else if (secretNumber < difference && difference > 10 && difference <= 30 && hardLevel) {
                displayGuessMessage("Очень много");
                score--;
                displayScore.textContent = score;
                return;
            } else if (secretNumber > guessingNumber && difference === 1) {
                displayGuessMessage("Чуть больше");
                score--;
                displayScore.textContent = score;
                return;
            } else if (secretNumber < guessingNumber && difference === 1) {
                displayGuessMessage("Чуть меньше");
                score--;
                displayScore.textContent = score;
                return;
            } else if (secretNumber > difference && difference > 30 && hardLevel) {
                console.log(hardLevel);
                displayGuessMessage("Безумно мало");
                score--;
                displayScore.textContent = score;
                return;
            } else if (secretNumber < difference && difference > 30 && hardLevel) {
                displayGuessMessage("Безумно много");
                score--;
                displayScore.textContent = score;
                return;
            } else {
                displayGuessMessage(guessingNumber > secretNumber ? "Слишком много!" : "Слишком мало!");
                score--;
                displayScore.textContent = score;
                return;
            }
        } else {
            displayGuessMessage("Game Over!");
            displayScore.textContent = 0;
        }
    };
    const clearScore = () => {
        displayNumber.textContent = "???";
        displayGuessMessage("Начни угадывать!");
        inputNumber.value = "";
        body.style.backgroundColor = "rgb(0, 0, 0)";
    };
    const playAgain = () => {
        starGameButton.forEach((buttom => {
            if (buttom.classList.contains("choose")) {
                const spanText = buttom.querySelector("span").textContent;
                const number = Number(spanText.split("и ")[1].replace(")", ""));
                secretNumber = generatorSecretNumber(number);
            }
        }));
        clearScore();
    };
    const eventChooseGame = () => {
        clearScore();
        startGame();
    };
    checkButton.addEventListener("click", playGame);
    againButton.addEventListener("click", playAgain);
    chooseLevelButton.addEventListener("click", eventChooseGame);
    window.addEventListener("load", (() => {
        const preloader = document.querySelector(".preloader");
        setTimeout((() => {
            document.documentElement.classList.remove("lock");
            preloader.remove();
            startGame();
        }), 2e3);
    }));
})();