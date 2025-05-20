let isGameAlive: boolean = false;
let originalSentence: string = "";
let scrambledSentence: string = "";
let timeLeft: number = 40;
let countdownTimer: number;
let streak: number = 0;
let current_streaks: number = Number(localStorage.getItem("final_streak"))!;
let game_streak: number = Number(localStorage.getItem("final_streak"))!;

const sentences: string[] = [
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

const startBtn: HTMLElement = document.getElementById("start")!;
const playAgainBtn: HTMLElement = document.getElementById("play_again")!;
const data: HTMLElement = document.getElementById("data")!;
const inputEnter = document.getElementById("get_input") as HTMLInputElement;
const streakDisplay: HTMLElement = document.getElementById("streak")!;

// Promise function for delay
function delay(ms: number): Promise<void> {
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

async function startGame(): Promise<void> {
    if (isGameAlive === false) {
        isGameAlive = true;

        // let current_streaks: number = Number(localStorage.getItem("streak"))!;
        console.log(current_streaks);
        streakDisplay.innerText = "Streak: " + current_streaks.toString();
        console.log(current_streaks);

        data.innerHTML = "Starting the Game in 2 Seconds...";
        data.style.color = "black";
        await delay(2000);
        fetchWord();
        startBtn.style.display = "none";
        playAgainBtn.style.display = "none";
    } else {
        alert("Game is already running!");
    }
}

// Getting a random sentence from the array
function fetchWord(): void {
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
function newSentence(): string {
    const ranNum: number = Math.floor(Math.random() * sentences.length);
    return sentences[ranNum].toLowerCase().replace(".", "");
}

async function guessSentence(): Promise<void> {
    const userInput : string = inputEnter.value.toLowerCase().trim()!;
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
        await delay(3000);

        let final_streak: number = current_streaks;
        localStorage.setItem("final_streak", final_streak.toString());

        fetchWord();
    } else {
        streak = current_streaks;
        streakDisplay.innerHTML = `Current Streak: ${streak}`;
        data.innerHTML = `Submitted Sentence is wrong! <br>The sentence was: ${originalSentence}`;
        data.style.color = "#db340a";
        playAgainBtn.style.display = "inline";
    }
}

function updateTimer() {
    timeLeft--;
    if (timeLeft <= 0) {
        clearInterval(countdownTimer);
        guessTime();
    } else {
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