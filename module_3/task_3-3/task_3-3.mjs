"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
function printTodayDate() {
    const today = new Date().toLocaleDateString("no-NB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    printOut("Today's date: " + today);
}

printTodayDate();
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
function getTodayDateObject() {
    return new Date();
}

function calculateDaysUntilLaunch(targetDate) {
    const today = getTodayDateObject();
    const msDifference = targetDate - today;
    const daysLeft = Math.ceil(msDifference / (1000 * 60 * 60 * 24));
    return daysLeft;
}

function displayLaunchCountdown() {
    const targetDate = new Date('2025-05-14');
    const todayDate = new Date().toLocaleDateString("no-NB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    const daysLeft = calculateDaysUntilLaunch(targetDate);
    printOut(`Today's date is: ${todayDate}`);
    printOut(`Countdown to 2XKO release: ${daysLeft} days left!`);
}

displayLaunchCountdown();
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
function circleProperties(radius) {
    const diameter = 2 * radius;
    const circumference = 2 * Math.PI * radius;
    const area = Math.PI * radius * radius;
    printOut(`Diameter: ${diameter}, Circumference: ${circumference.toFixed(2)}, Area: ${area.toFixed(2)}`);
}

circleProperties(5);
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
function rectangleProperties(dimensions) {
    const { width, height } = dimensions;
    const circumference = 2 * (width + height);
    const area = width * height;
    printOut(`Width: ${width}, height: ${height}, circumference: ${circumference}, area: ${area}`);
}

rectangleProperties({ width: 8, height: 5 });
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
function convertTemperature(temp, scale) {
    let celsius, fahrenheit, kelvin;

    switch (scale.toLowerCase()) {
        case 'celsius':
            celsius = temp;
            fahrenheit = (celsius * (9 / 5)) + 32;
            kelvin = celsius + 273.15;
            break;
        case 'fahrenheit':
            fahrenheit = temp;
            celsius = (fahrenheit - 32) * (5 / 9);
            kelvin = (fahrenheit - 32) * (5/9) + 273.15;
            break;
        case 'kelvin':
            kelvin = temp;
            celsius = kelvin - 273.15;
            fahrenheit = (kelvin - 273.15) * (9 / 5) + 32;
            break;
        default:
            printOut("Invalid scale");
            return;
    }
    printOut(`Celsius: ${Math.round(celsius)}, Fahrenheit: ${Math.round(fahrenheit)}, Kelvin: ${Math.round(kelvin)}`);
}

convertTemperature(100, 'celsius');
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
function calculateNetPrice(grossPrice, taxGroup) {
    let vat;
    switch (taxGroup.toLowerCase()) {
        case 'normal':
            vat = 25;
            break;
        case 'food':
            vat = 15;
            break;
        case 'hotel':
        case 'transport':
        case 'cinema':
            vat = 10;
            break;
        default:
            printOut("Unknown VAT group!");
            return NaN;
    }
    const netPrice = (100 * grossPrice) / (vat + 100);
    printOut(`Gross Price: ${grossPrice}, Net Price: ${netPrice.toFixed(2)}`);
    return netPrice;
}

calculateNetPrice(125, 'normal');
calculateNetPrice(115, 'food');
calculateNetPrice(110, 'hotel');
calculateNetPrice(150, 'goblins');
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
function calculateSpeedOrDistanceOrTime(distance, time, speed) {
    if (distance === undefined) {
        if (time && speed) return printOut(`Distance: ${time * speed}`);
    } else if (time === undefined) {
        if (distance && speed) return printOut(`Time: ${distance / speed}`);
    } else if (speed === undefined) {
        if (distance && time) return printOut(`Speed: ${distance / time}`);
    }
    return NaN;
}

calculateSpeedOrDistanceOrTime(100, 2, undefined);
calculateSpeedOrDistanceOrTime(undefined, 2, 50);
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
function adjustString(text, maxSize, char, addBefore) {
    let newText = text;
    while (newText.length < maxSize) {
        newText = addBefore ? char + newText : newText + char;
    }
    printOut(newText);
    return newText;
}

adjustString("Hello", 8, "g", true);
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
function testMathExpression() {
    let currentNumber = 1; 
    let rowLength = 2;      

    for (let n = 1; n <= 200; n++) {
        const leftSide = Array.from({ length: rowLength }, () => currentNumber++)
            .reduce((acc, num) => acc + num, 0);

        const rightSide = Array.from({ length: rowLength - 1 }, () => currentNumber++)
            .reduce((acc, num) => acc + num, 0);

        if (leftSide !== rightSide) {
            printOut(`Mismatch at line ${n}`);
            return;
        }

        rowLength++;
    }

    printOut("Maths fun!");
}

testMathExpression();
printOut(newLine);


printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

printOut(`Factorial of 5: ${factorial(5)}`);
printOut(newLine);
