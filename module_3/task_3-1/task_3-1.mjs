"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1, 2, 3 ----------------------------------------------------------------------------------------");
let wakeUpTimes = [2, 6, 7, 8];

wakeUpTimes.forEach((wakeUpTime) => {
  if (wakeUpTime === 7) {
    printOut(`Wake-up time: ${wakeUpTime} - If I wake up at exactly 7 o'clock, I can take the bus to school.`);
  } else if (wakeUpTime === 8) {
    printOut(`Wake-up time: ${wakeUpTime} - If I wake up at exactly 8 o'clock, I can take the train to school.`);
  } else {
    printOut(`Wake-up time: ${wakeUpTime} - I have to take the car to school.`);
  }
});

printOut(newLine);

printOut("--- Part 4, 5 --------------------------------------------------------------------------------------------");
let testValues = [-2, 0, 7];

testValues.forEach((value) => {
  if (value > 0) {
    printOut(`Value: ${value} - Positive`);
  } else if (value < 0) {
    printOut(`Value: ${value} - Negative`);
  } else {
    printOut(`Value: ${value} - Zero`);
  }
});
printOut(newLine);

printOut("--- Part 6, 7 ----------------------------------------------------------------------------------------------");
let imageSize = Math.floor(Math.random() * 8) + 1;
printOut(`Image size: ${imageSize} MP`);

if (imageSize >= 4 && imageSize < 6) {
  printOut("Thank you");
} else if (imageSize < 4) {
  printOut("The image is too small");
} else {
  printOut("Image is too large");
}
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
const monthList = ["January", "February", "Mars", "April", "Mai", "Jun", "Juli", "August", "September", "October", "November", "December"];
const noOfMonth = monthList.length;
const monthName = monthList[Math.floor(Math.random() * noOfMonth)];

printOut(`Month selected: ${monthName}`);
if (monthName.includes("r") || monthName.includes("R")) {
  printOut("You must take vitamin D");
} else {
  printOut("You do not need to take vitamin D");
}
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
let daysInMonth;
switch (monthName) {
  case "February":
    daysInMonth = 28; 
    break;
  case "April":
  case "Jun":
  case "September":
  case "November":
    daysInMonth = 30;
    break;
  default:
    daysInMonth = 31;
}

printOut(`Number of days in ${monthName}: ${daysInMonth}`);
printOut(newLine);

printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
if (monthName === "March" || monthName === "May") {
  printOut(`In ${monthName}, the gallery is closed for refurbishment.`);
} else if (monthName === "April") {
  printOut("In April, the gallery has a temporary location in the building next door.");
} else {
  printOut(`In ${monthName}, the gallery is open.`);
}
printOut(newLine);
