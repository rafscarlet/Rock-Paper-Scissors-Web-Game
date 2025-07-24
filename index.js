import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let playerScore = 0;
let computerScore = 0;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


function checkResult(player, comp) {
    if (player === comp) return "It's a Tie!😒";
    switch (player) {
        case "rock":
            if (comp === "paper") {
                computerScore++
                return "You Lose!🤔"
            } else {
                playerScore++
                return "You Win!😎"
            }
        case "paper":
            if (comp === "scissors") {
                computerScore++
                return "You Lose!🤔"
            } else {
                playerScore++
                return "You Win!😎"
            }
        case "scissors":
            if (comp === "rock") {
                computerScore++
                return "You Lose!🤔"
            } else {
                playerScore++
                return "You Win!😎"
            }
    }
}


app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/play", (req, res) => {
    playerScore = 0;
    computerScore = 0;
    res.render("game.ejs", { 
        choice: false, 
        computerChoice: false, 
        result: "Pick your weapon!🥁", 
        playerScore: playerScore, 
        computerScore: computerScore });
});

app.post("/play", (req, res) => {
    const rps = ["rock", "paper", "scissors"]
    const userChoice = req.body.gesture;
    const computerChoice = rps[Math.floor(Math.random() * 3)];
    const result = checkResult(userChoice, computerChoice);

    res.render("game.ejs", {
        choice: userChoice,
        computerChoice: computerChoice,
        result: result,
        playerScore: playerScore,
        computerScore: computerScore
    });
});

app.listen(port, () => {
    console.log("Listening on port " + port);
});