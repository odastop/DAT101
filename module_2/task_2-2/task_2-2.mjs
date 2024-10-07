"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
// Original expression
const originalExpression = 2 + 3 * 2 - 4 * 6;
printOut(`Original Expression: 2 + 3 * 2 - 4 * 6 = ${originalExpression}`);
printOut(newLine);

// Modified expression
const modifiedExpression = 2 + 3 * (2 - 4) * 6;
printOut(`Modified Expression: 2 + 3 * (2 - 4) * 6 = ${modifiedExpression}`);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
const meters = 25;
const centimeters = 34;

const totalMillimeters = (meters * 1000) + (centimeters * 10);

const inches = totalMillimeters / 25.4;
const formattedInches = inches.toFixed(2);

printOut(`${meters} meters and ${centimeters} centimeters is equal to ${formattedInches} inches.`);
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
const days = 3;
const hours = 12;
const minutes = 14;
const seconds = 45;

const totalMinutes = (days * 24 * 60) + (hours * 60) + minutes + (seconds / 60);

const formattedTotalMinutes = totalMinutes.toFixed(2);
printOut(`Total time of ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds is equal to ${formattedTotalMinutes} minutes.`);
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
const totalMinutesInput = 6322.52;

const days4 = Math.floor(totalMinutesInput / (24*60));
const remainingMinutesAfterDays = totalMinutesInput % 1440;

const hours4 = Math.floor(remainingMinutesAfterDays / 60);
const remainingMinutesAfterHours = remainingMinutesAfterDays % 60;

const minutes4 = Math.floor(remainingMinutesAfterHours);
const seconds4 = Math.round((remainingMinutesAfterHours - minutes4) * 60); 

printOut(`${totalMinutesInput} minutes is equal to ${days4} days, ${hours4} hours, ${minutes4} minutes, and ${seconds4} seconds.`);
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
const dollars = 54;
const nokToUsd = 8.6 / 76;  
const usdToNok = 76 / 8.6;  

const nok = Math.round(dollars * usdToNok);

printOut(`1 NOK = ${nokToUsd.toFixed(4)} USD`);
printOut(`1 USD = ${usdToNok.toFixed(4)} NOK`);
printOut(`${dollars} USD = ${nok} NOK`);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
const text = "There is much between heaven and earth that we do not understand.";

// number of characters in the text
const textLength = text.length;
printOut(`Number of characters: ${textLength}`);

// character at position number 19
const charAtPosition19 = text.charAt(19);
printOut(`Character at position 19: '${charAtPosition19}'`);

// characters starting at position number 35 and 8 characters forward
const substringFrom35 = text.substring(35, 43);
printOut(`Characters starting at position 35 and 8 characters forward: '${substringFrom35}'`);

// index at which "earth" starts in the text
const indexOfEarth = text.indexOf("earth");
printOut(`Index at which "earth" starts: ${indexOfEarth}`);
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
const comparisons = [
    { expression: "5 > 3", result: 5 > 3 },
    { expression: "7 >= 7", result: 7 >= 7 },
    { expression: "\"a\" > \"b\"", result: "a" > "b" },
    { expression: "\"1\" < \"a\"", result: "1" < "a" },
    { expression: "\"2500\" < \"abcd\"", result: "2500" < "abcd" },
    { expression: "\"arne\" !== \"thomas\"", result: "arne" !== "thomas" },
    { expression: "(2 === 5)", result: (2 === 5) },
    { expression: "(\"abcd\" > \"bcd\")", result: ("abcd" > "bcd") }
];

comparisons.forEach(comp => {
    printOut(`${comp.expression} is ${comp.result}`);
});
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
const text1 = "254";
const text2 = "57.23";
const text3 = "25 kroner";

const number1 = Number(text1);
const number2 = Number(text2);
const number3 = parseInt(text3); 

printOut(`Converting "${text1}" to a number: ${number1}`);
printOut(`Converting "${text2}" to a number: ${number2}`);
printOut(`Converting "${text3}" to a number: ${number3}`);
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
const r = Math.floor(Math.random() * 360) + 1;

printOut(`Randomly generated number between 1 and 360: ${r}`);
printOut(newLine);

printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
const totalDays = 131;

const weeks0 = Math.floor(totalDays / 7); 
const days0 = totalDays % 7; 

printOut(`${totalDays} days is equal to ${weeks0} weeks and ${days0} days.`);
printOut(newLine);