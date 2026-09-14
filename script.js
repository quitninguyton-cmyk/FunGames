const DISCORD_LINK = "https://discord.gg/Rb64dunDJ";

/* =========================
PLAYER DATA
========================= */

let username = localStorage.getItem("creatorHQUsername") || "";

let xp = Number(localStorage.getItem("creatorHQXP")) || 0;
let gamesPlayed = Number(localStorage.getItem("creatorHQGames")) || 0;
let wins = Number(localStorage.getItem("creatorHQWins")) || 0;
let streak = Number(localStorage.getItem("creatorHQStreak")) || 0;

let clickCount = 0;
let clickTimer = null;

/* =========================
DEMO CREATOR HQ MEMBERS
========================= */

/*
These are example leaderboard members.

quintYT is the owner and starts with the
highest score.
*/

const leaderboardPlayers = [
{
username: "quintYT",
xp: 25000,
wins: 150,
avatar: "👑"
},
{
username: "Hassan",
xp: 5420,
wins: 52,
avatar: "🔥"
},
{
username: "KitKat",
xp: 4850,
wins: 46,
avatar: "🌌"
},
{
username: "CoolCat",
xp: 4210,
wins: 39,
avatar: "⚡"
},
{
username: "GamerPro",
xp: 3900,
wins: 34,
avatar: "⚔️"
},
{
username: "IbelieveImANight",
xp: 3450,
wins: 29,
avatar: "🛡️"
}
];

/* =========================
NAVIGATION
========================= */

function showPage(pageId) {

```
document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
});

const page = document.getElementById(pageId);

if (!page) {
    console.error("Page not found:", pageId);
    return;
}

page.classList.add("active");

window.scrollTo({
    top: 0,
    behavior: "smooth"
});

if (pageId === "leaderboard") {
    renderLeaderboard();
}
```

}

/* =========================
DISCORD
========================= */

function joinDiscord() {
window.open(DISCORD_LINK, "_blank");
}

/* =========================
PLAYER PROFILE
========================= */

function saveUsername() {

```
const input = document.getElementById("username");

if (!input) return;

const newName = input.value.trim();

if (!newName) {
    alert("Please enter a username!");
    return;
}

if (newName.length < 2) {
    alert("Your username needs at least 2 characters.");
    return;
}

localStorage.setItem(
    "creatorHQUsername",
    newName
);

username = newName;

document.getElementById(
    "usernameDisplay"
).textContent = newName;

renderLeaderboard();

alert(`✅ Welcome to Creator HQ, ${newName}!`);
```

}

function loadUsername() {

```
const savedName =
    localStorage.getItem("creatorHQUsername");

if (!savedName) return;

username = savedName;

const input =
    document.getElementById("username");

const display =
    document.getElementById("usernameDisplay");

if (input) {
    input.value = savedName;
}

if (display) {
    display.textContent = savedName;
}
```

}

/* =========================
STATS
========================= */

function saveStats() {

```
localStorage.setItem(
    "creatorHQXP",
    xp
);

localStorage.setItem(
    "creatorHQGames",
    gamesPlayed
);

localStorage.setItem(
    "creatorHQWins",
    wins
);

localStorage.setItem(
    "creatorHQStreak",
    streak
);
```

}

function updateStats() {

```
const xpElement =
    document.getElementById("xp");

const playedElement =
    document.getElementById("played");

const winsElement =
    document.getElementById("wins");

const streakElement =
    document.getElementById("streak");

if (xpElement) {
    xpElement.textContent =
        xp.toLocaleString();
}

if (playedElement) {
    playedElement.textContent =
        gamesPlayed.toLocaleString();
}

if (winsElement) {
    winsElement.textContent =
        wins.toLocaleString();
}

if (streakElement) {
    streakElement.textContent =
        streak.toLocaleString();
}

renderLeaderboard();
```

}

/* =========================
GAME REWARDS
========================= */

function finishGame(reward, won = false) {

```
gamesPlayed++;

xp += reward;

if (won) {
    wins++;
    streak++;
} else {
    streak = 0;
}

saveStats();
updateStats();
```

}

/* =========================
LEADERBOARD
========================= */

function renderLeaderboard() {

```
const page =
    document.getElementById("leaderboard");

if (!page) return;

let leaderboard =
    [...leaderboardPlayers];

/*
   Add the current player if they
   entered a username.
*/

if (username) {

    leaderboard.push({
        username: username,
        xp: xp,
        wins: wins,
        avatar: "🎮",
        currentPlayer: true
    });
}

/*
   Sort highest XP first.
*/

leaderboard.sort(
    (a, b) => b.xp - a.xp
);

let existing =
    document.getElementById(
        "liveLeaderboard"
    );

if (!existing) {

    existing =
        document.createElement("div");

    existing.id =
        "liveLeaderboard";

    existing.className =
        "rank-list";

    page.appendChild(existing);
}

existing.innerHTML = `
    <div class="leaderboard-title">
        <h2>🏆 Live Creator HQ Leaderboard</h2>
        <p>Highest XP players are ranked first.</p>
    </div>
`;

leaderboard.forEach((player, index) => {

    const row =
        document.createElement("div");

    row.className = "rank";

    if (player.currentPlayer) {
        row.classList.add(
            "current-player"
        );
    }

    let medal;

    if (index === 0) {
        medal = "🥇";
    } else if (index === 1) {
        medal = "🥈";
    } else if (index === 2) {
        medal = "🥉";
    } else {
        medal = `#${index + 1}`;
    }

    row.innerHTML = `
        <span>${medal}</span>

        <div class="leader-info">
            <h2>
                ${player.avatar}
                ${escapeHTML(player.username)}
                ${player.currentPlayer
                    ? '<small> YOU</small>'
                    : ''}
            </h2>

            <p>
                🏆 ${player.wins.toLocaleString()}
                wins
            </p>
        </div>

        <strong>
            ⭐ ${player.xp.toLocaleString()} XP
        </strong>
    `;

    existing.appendChild(row);
});
```

}

/* =========================
SAFETY FOR USERNAMES
========================= */

function escapeHTML(text) {

```
const div =
    document.createElement("div");

div.textContent = text;

return div.innerHTML;
```

}

/* =========================
CLICK RUSH
========================= */

function startClicker() {

```
clearInterval(clickTimer);

clickTimer = null;
clickCount = 0;

const box =
    document.getElementById(
        "gameBox"
    );

box.innerHTML = `
    <h2>⚡ Click Rush</h2>

    <p>
        Click as many times as possible
        in 10 seconds!
    </p>

    <div class="big-number"
         id="clickNumber">
        0
    </div>

    <div class="timer">
        ⏱️
        <span id="clickTime">10</span>
    </div>

    <button id="clickGameButton">
        CLICK!
    </button>
`;

const button =
    document.getElementById(
        "clickGameButton"
    );

button.addEventListener(
    "click",
    () => {

        clickCount++;

        document.getElementById(
            "clickNumber"
        ).textContent =
            clickCount;

        if (clickTimer !== null) {
            return;
        }

        let time = 10;

        clickTimer =
            setInterval(() => {

                time--;

                document.getElementById(
                    "clickTime"
                ).textContent =
                    time;

                if (time <= 0) {

                    clearInterval(
                        clickTimer
                    );

                    clickTimer = null;

                    finishGame(
                        clickCount,
                        clickCount >= 15
                    );

                    box.innerHTML = `
                        <h2>
                            🏁 Time's Up!
                        </h2>

                        <div class="big-number">
                            ${clickCount}
                        </div>

                        <p>
                            Clicks
                        </p>

                        <p>
                            ⭐ +${clickCount} XP
                        </p>

                        <br>

                        <button
                            onclick="startClicker()">
                            🔄 Play Again
                        </button>
                    `;
                }

            }, 1000);
    }
);
```

}

/* =========================
TARGET HUNT
========================= */

function startTarget() {

```
const box =
    document.getElementById(
        "gameBox"
    );

let score = 0;
let time = 15;

box.innerHTML = `
    <h2>🎯 Target Hunt</h2>

    <p>
        Hit as many targets as possible!
    </p>

    <div class="timer">
        ⏱️
        <span id="targetTime">15</span>
    </div>

    <div
        class="target-area"
        id="targetArea">
    </div>
`;

const area =
    document.getElementById(
        "targetArea"
    );

function createTarget() {

    const target =
        document.createElement(
            "button"
        );

    target.className =
        "target";

    target.textContent =
        "🎯";

    target.style.left =
        Math.random() *
        (area.clientWidth - 60) +
        "px";

    target.style.top =
        Math.random() *
        (area.clientHeight - 60) +
        "px";

    target.onclick = () => {

        score++;

        target.remove();

        createTarget();
    };

    area.appendChild(target);
}

createTarget();

const timer =
    setInterval(() => {

        time--;

        const timeElement =
            document.getElementById(
                "targetTime"
            );

        if (timeElement) {
            timeElement.textContent =
                time;
        }

        if (time <= 0) {

            clearInterval(timer);

            finishGame(
                score,
                score >= 10
            );

            box.innerHTML = `
                <h2>🎯 Game Over!</h2>

                <div class="big-number">
                    ${score}
                </div>

                <p>
                    Targets Hit
                </p>

                <p>
                    ⭐ +${score} XP
                </p>

                <br>

                <button
                    onclick="startTarget()">
                    🔄 Play Again
                </button>
            `;
        }

    }, 1000);
```

}

/* =========================
NUMBER GUESS
========================= */

function startGuess() {

```
const secret =
    Math.floor(
        Math.random() * 100
    ) + 1;

let attempts = 0;

const box =
    document.getElementById(
        "gameBox"
    );

box.innerHTML = `
    <h2>🔢 Number Guess</h2>

    <p>
        Guess a number from 1 to 100.
    </p>

    <input
        id="guessInput"
        type="number"
        min="1"
        max="100"
        placeholder="Number"
    >

    <button onclick="checkGuess()">
        GUESS
    </button>

    <div
        id="guessResult"
        class="timer">
    </div>
`;

window.checkGuess = function () {

    const input =
        document.getElementById(
            "guessInput"
        );

    const result =
        document.getElementById(
            "guessResult"
        );

    const guess =
        Number(input.value);

    if (
        guess < 1 ||
        guess > 100
    ) {

        result.textContent =
            "⚠️ Enter 1-100.";

        return;
    }

    attempts++;

    if (guess === secret) {

        const reward =
            Math.max(
                100,
                500 - attempts * 25
            );

        finishGame(
            reward,
            true
        );

        result.innerHTML = `
            🎉 CORRECT!

            <br>

            ${attempts} attempts.

            <br>

            ⭐ +${reward} XP

            <br><br>

            <button
                onclick="startGuess()">
                🔄 Play Again
            </button>
        `;

    } else if (
        guess < secret
    ) {

        result.textContent =
            "⬆️ Too low!";

    } else {

        result.textContent =
            "⬇️ Too high!";
    }
};
```

}

/* =========================
ROCK PAPER SCISSORS
========================= */

function startRPS() {

```
const box =
    document.getElementById(
        "gameBox"
    );

box.innerHTML = `
    <h2>
        ✊ Rock Paper Scissors
    </h2>

    <p>
        Choose your move!
    </p>

    <div class="hero-buttons">

        <button
            onclick="playRPS('rock')">
            ✊ ROCK
        </button>

        <button
            onclick="playRPS('paper')">
            ✋ PAPER
        </button>

        <button
            onclick="playRPS('scissors')">
            ✌️ SCISSORS
        </button>

    </div>

    <div
        id="rpsResult"
        class="timer">
        Choose your move!
    </div>
`;
```

}

function playRPS(player) {

```
const choices = [
    "rock",
    "paper",
    "scissors"
];

const computer =
    choices[
        Math.floor(
            Math.random() *
            choices.length
        )
    ];

const result =
    document.getElementById(
        "rpsResult"
    );

if (player === computer) {

    finishGame(25, false);

    result.textContent =
        `🤝 Draw! Computer chose ${computer}.`;

    return;
}

const playerWins =
    (player === "rock" &&
        computer === "scissors") ||

    (player === "paper" &&
        computer === "rock") ||

    (player === "scissors" &&
        computer === "paper");

if (playerWins) {

    finishGame(100, true);

    result.textContent =
        `🎉 YOU WIN! Computer chose ${computer}. +100 XP`;

} else {

    finishGame(10, false);

    result.textContent =
        `💀 You lost! Computer chose ${computer}. +10 XP`;
}
```

}

/* =========================
STARTUP
========================= */

document.addEventListener(
"DOMContentLoaded",
() => {

```
    updateStats();
    loadUsername();
    renderLeaderboard();

    showPage("home");

    console.log(
        "⚡ Creator HQ Ultimate Hub loaded!"
    );
}


);
