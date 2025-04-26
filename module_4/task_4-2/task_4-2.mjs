"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
const numbers = []; 
for (let i = 1; i <= 20; i++) { 
    numbers.push(i);
}
for (const number of numbers) {
    printOut(String(number));
}
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
printOut(numbers.join(", "));
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
const sentence = "Hei på deg, hvordan har du det?";
const words = sentence.split(" ");
words.forEach((word, index) => {
    printOut(`Word ${index + 1} at index ${index}: ${word}`);
});
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
const girlNames = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid", "Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"];

function removeElement(array, element) {
    const index = array.indexOf(element);
    if (index !== -1) {
        array.splice(index, 1);
        printOut(`${element} removed from the array.`);
    } else {
        printOut(`${element} does not exist in the array.`);
    }
}

removeElement(girlNames, "Inger");
removeElement(girlNames, "Oda"); 
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
const boyNames = ["Jakob", "Lucas", "Emil", "Oskar", "Oliver", "William", "Filip", "Noah", "Elias", "Isak", "Henrik", "Aksel", "Kasper", "Mathias", "Jonas", "Tobias", "Liam", "Håkon", "Theodor", "Magnus"];
const allNames = girlNames.concat(boyNames);
printOut(allNames.join(", "));
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
class TBook {
    #title;
    #author;
    #isbn;

    constructor(aTitle, aAuthor, aISBN) {
        this.#title = aTitle;
        this.#author = aAuthor;
        this.#isbn = aISBN;
    }

    toString() {
        return `Title: ${this.#title}, Author: ${this.#author}, ISBN: ${this.#isbn}`;
    }
}

const books = [
    new TBook("En Pingles Dagbok - Salig Røre", "Jeff Kinney", "9788205570115"),
    new TBook("En Pingles Dagbok - Bruk Huet!", "Jeff Kinney", "9788205570092"),
    new TBook("En Pingles Dagbok - Ferieparadiset", "Jeff Kinney", "9788205509498")
];


books.forEach((book) => printOut(book.toString()));

printOut(newLine);