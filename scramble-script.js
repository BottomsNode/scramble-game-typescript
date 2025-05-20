"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let isGameAlive = false;
let originalSentence = "";
let scrambledSentence = "";
let timeLeft = 40;
let countdownTimer;
let streak = 0;
let current_streaks = Number(localStorage.getItem("final_streak"));
let game_streak = Number(localStorage.getItem("final_streak"));
const sentences = [
    "The sun is shining brightly in the sky.",
    "The birds are singing their sweet melodies.",
    "The flowers are blooming in every color.",
    "The trees are swaying gently in the breeze.",
    "The children are playing happily in the park.",
    "The dogs are running freely in the fields.",
    "The cats are sleeping peacefully in the sun.",
    "The bees are buzzing happily from flower to flower.",
    "The butterflies are fluttering their colorful wings.",
    "The wind is blowing softly through the trees.",
    "The clouds are drifting lazily across the sky.",
    "The mountains are towering high in the distance.",
    "The rivers are flowing smoothly to the sea.",
    "The oceans are vast and deep and mysterious.",
    "The stars are twinkling brightly in the night sky."
];
const startBtn = document.getElementById("start");
const playAgainBtn = document.getElementById("play_again");
const data = document.getElementById("data");
const inputEnter = document.getElementById("get_input");
const streakDisplay = document.getElementById("streak");
// Promise function for delay
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
// Adding event listeners
startBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", resetGame);
inputEnter.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        guessSentence();
    }
});
function startGame() {
    return __awaiter(this, void 0, void 0, function* () {
        if (isGameAlive === false) {
            isGameAlive = true;
            // let current_streaks: number = Number(localStorage.getItem("streak"))!;
            console.log(current_streaks);
            streakDisplay.innerText = "Streak: " + current_streaks.toString();
            console.log(current_streaks);
            data.innerHTML = "Starting the Game in 2 Seconds...";
            data.style.color = "black";
            yield delay(2000);
            fetchWord();
            startBtn.style.display = "none";
            playAgainBtn.style.display = "none";
        }
        else {
            alert("Game is already running!");
        }
    });
}
// Getting a random sentence from the array
function fetchWord() {
    originalSentence = newSentence();
    console.log("Original Sentence : " + originalSentence);
    const words = originalSentence.split(" ");
    const shuffledWords = words.sort(() => Math.random() - 0.5);
    scrambledSentence = shuffledWords.join(" ").toLowerCase().replace(".", "");
    console.log("Scrambled Sentence : " + scrambledSentence);
    data.innerHTML = "<b>GUESS THE WORD</b><br><br>" + scrambledSentence + "<br>Time Left: " + timeLeft + " seconds";
    data.style.color = "black";
    inputEnter.style.visibility = 'visible';
    inputEnter.innerText = "";
    inputEnter.focus();
    timeLeft = 40;
    countdownTimer = setInterval(updateTimer, 1000);
}
// Picking the random sentence from the sentence Array
function newSentence() {
    const ranNum = Math.floor(Math.random() * sentences.length);
    return sentences[ranNum].toLowerCase().replace(".", "");
}
function guessSentence() {
    return __awaiter(this, void 0, void 0, function* () {
        const userInput = inputEnter.value.toLowerCase().trim();
        if (userInput === "") {
            console.log(userInput);
            alert("Please enter a sentence!");
            inputEnter.focus();
            return;
        }
        clearInterval(countdownTimer);
        if (userInput === originalSentence) {
            current_streaks++;
            streakDisplay.innerHTML = `Current Streak: ${current_streaks}`;
            data.innerHTML = `Correct! The sentence was: ${originalSentence}`;
            data.style.color = "#4CAF50";
            yield delay(3000);
            let final_streak = current_streaks;
            localStorage.setItem("final_streak", final_streak.toString());
            fetchWord();
        }
        else {
            streak = current_streaks;
            streakDisplay.innerHTML = `Current Streak: ${streak}`;
            data.innerHTML = `Submitted Sentence is wrong! <br>The sentence was: ${originalSentence}`;
            data.style.color = "#db340a";
            playAgainBtn.style.display = "inline";
        }
    });
}
function updateTimer() {
    timeLeft--;
    if (timeLeft <= 0) {
        clearInterval(countdownTimer);
        guessTime();
    }
    else {
        data.innerHTML = "<b>GUESS THE WORD</b><br><br>" + scrambledSentence + "<br>Time Left: " + timeLeft + " seconds";
    }
}
function guessTime() {
    data.innerHTML = "<b>TIME'S UP!</b><br><br>The sentence was: " + originalSentence;
    data.style.color = "red";
    playAgainBtn.style.display = "inline";
}
function resetGame() {
    // rest the all values
    clearInterval(countdownTimer);
    isGameAlive = false;
    inputEnter.style.visibility = 'hidden';
    startBtn.style.display = "inline";
    playAgainBtn.style.display = "none";
    data.innerHTML = "";
    streak = 0;
    streakDisplay.innerHTML = "Current Streak: " + streak;
}
