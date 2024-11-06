"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
let countUp = "";
let countDown = "";
for (let i = 1; i <= 10; i++) countUp += i + " ";
for (let i = 10; i >= 1; i--) countDown += i + " ";
printOut(countUp.trim());
printOut(countDown.trim());
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
const targetNumber = 45;
let guess = -1;
while (guess !== targetNumber) {
    guess = Math.floor(Math.random() * 60) + 1;
}
printOut("Guessed the number: " + guess);
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
const bigTargetNumber = Math.floor(Math.random() * 1000000) + 1;
let bigGuess = 73;
let attempts = 0;
const startTime = Date.now();
while (bigGuess !== bigTargetNumber) {
    bigGuess = Math.floor(Math.random() * 1000000) + 1;
    attempts++;
}
const endTime = Date.now();
printOut("Guessed the number: " + bigGuess);
printOut("Attempts: " + attempts);
printOut("Time taken (ms): " + (endTime - startTime));
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");

let primes = [];
for (let num = 2; num < 200; num++) {
    let isPrime = true; 
    for (let i = 2; i <= Math.sqrt(num); i++) { 
        if (num % i === 0) {
            isPrime = false;
            break;
        }
    }
    if (isPrime) primes.push(num);
}
printOut("Prime numbers between 1 and 200: " + primes.join(", "));
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
for (let row = 1; row <= 7; row++) {
    let rowPattern = "";
    for (let col = 1; col <= 9; col++) {
        rowPattern += `K${col}R${row} `;
    }
    printOut(rowPattern.trim());
}
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
function getGrade(score) {
    let percent = (score / 236) * 100;
    if (percent >= 89) return "A";
    if (percent >= 77) return "B";
    if (percent >= 65) return "C";
    if (percent >= 53) return "D";
    if (percent >= 41) return "E";
    return "F";
}
let grades = [];
for (let i = 0; i < 5; i++) {
    let score = Math.floor(Math.random() * 236) + 1;
    let grade = getGrade(score);
    grades.push({ score, grade });
    printOut(`Student ${i + 1}: Score = ${score}, Grade = ${grade}`);
}
printOut("Sorted Grades:");
grades.sort((a, b) => a.score - b.score).reverse();
grades.forEach(g => printOut(`${g.grade} (${g.score})`));
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}
let counts = { fullStraight: 0, threePairs: 0, twoAndFourOfAKind: 0, yahtzee: 0 };

function rollUntilFullStraight() {
    let throws = 0;
    let unique = new Set();
    while (unique.size < 6) {
        unique.add(rollDice());
        throws++;
    }
    return throws;
}
counts.fullStraight = rollUntilFullStraight();
printOut(`Throws for Full Straight: ${counts.fullStraight}`);

function rollUntilThreePairs() {
    let throws = 0;
    while (true) {
        let rolls = Array.from({ length: 6 }, rollDice);
        let counts = {};
        for (let roll of rolls) counts[roll] = (counts[roll] || 0) + 1;
        if (Object.values(counts).filter(v => v === 2).length === 3) break;
        throws++;
    }
    return throws;
}
counts.threePairs = rollUntilThreePairs();
printOut(`Throws for Three Pairs: ${counts.threePairs}`);

function rollUntilTwoAndFourOfAKind() {
    let throws = 0;
    while (true) {
        let rolls = Array.from({ length: 6 }, rollDice);
        let counts = {};
        for (let roll of rolls) counts[roll] = (counts[roll] || 0) + 1;
        if (Object.values(counts).includes(2) && Object.values(counts).includes(4)) break;
        throws++;
    }
    return throws;
}
counts.twoAndFourOfAKind = rollUntilTwoAndFourOfAKind();
printOut(`Throws for Two and Four of a Kind: ${counts.twoAndFourOfAKind}`);

function rollUntilYahtzee() {
    let throws = 0;
    while (true) {
        let rolls = Array.from({ length: 6 }, rollDice);
        if (new Set(rolls).size === 1) break;
        throws++;
    }
    return throws;
}
counts.yahtzee = rollUntilYahtzee();
printOut(`Throws for Yahtzee: ${counts.yahtzee}`);
printOut(newLine);
