"use strict";

const CarTypes = [
  { value: 1, caption: "Aston Martin" },
  { value: 2, caption: "Bentley" },
  { value: 3, caption: "Alfa Romeo" },
  { value: 4, caption: "Ferrari" },
  { value: 5, caption: "Subaru" },
  { value: 6, caption: "Porsche" },
  { value: 7, caption: "Tesla" },
  { value: 8, caption: "Toyota" },
  { value: 9, caption: "Renault" },
  { value: 10, caption: "Peugeot" },
  { value: 11, caption: "Suzuki" },
  { value: 12, caption: "Mitsubishi" },
  { value: 13, caption: "Nissan" },
];

const GirlsNames = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid", "Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"];

const MovieGenre = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Superhero",
  "Thriller",
  "War",
  "Western",
];

//--- Part 1 ----------------------------------------------------------------------------------------------
document.getElementById("cmbTask1Calculate").addEventListener("click", () => {
  const width = parseFloat(document.getElementById("txtRectWidth").value);
  const height = parseFloat(document.getElementById("txtRectHeight").value);

  if (isNaN(width) || isNaN(height)) {
    alert("Please enter valid numbers for width and height.");
    return;
  }

  const circumference = 2 * (width + height);
  const area = width * height;

  document.getElementById("txtTask1Output").textContent = `Circumference = ${circumference}, Area = ${area}`;
});

//--- Part 2 ----------------------------------------------------------------------------------------------
const task2Words = [];

document.getElementById("txtTask2Word").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const inputField = document.getElementById("txtTask2Word");
    const word = inputField.value.trim();

    if (word) {
      task2Words.push(word);
      inputField.value = ""; 
    }

    const wordCount = task2Words.length;
    const wordList = task2Words.join(", ");
    document.getElementById("txtTask2Output").textContent = `Number of words = ${wordCount}, Words: ${wordList}`;

    event.preventDefault(); 
  }
});

//--- Part 3 ----------------------------------------------------------------------------------------------
document.getElementById("cmbTask3CheckAnswer").addEventListener("click", () => {
  const checkboxes = document.querySelectorAll("input[name='chkTask3']:checked");
  const selectedTexts = Array.from(checkboxes).map((checkbox) => checkbox.parentElement.textContent.trim());

  if (selectedTexts.length > 0) {
    document.getElementById("txtTask3Output").textContent = `Selected: ${selectedTexts.join(", ")}`;
  } else {
    document.getElementById("txtTask3Output").textContent = "No checkboxes selected.";
  }
});

//--- Part 4 ----------------------------------------------------------------------------------------------
const divTask4Cars = document.getElementById("divTask4Cars");
const txtTask4Output = document.getElementById("txtTask4Output");

CarTypes.forEach((car) => {
  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = "carType";
  radio.value = car.caption;
  radio.id = `car-${car.value}`;

  const label = document.createElement("label");
  label.htmlFor = `car-${car.value}`;
  label.textContent = car.caption;

  divTask4Cars.appendChild(radio);
  divTask4Cars.appendChild(label);
  divTask4Cars.appendChild(document.createElement("br"));
});

divTask4Cars.addEventListener("change", (event) => {
  if (event.target.name === "carType") {
    txtTask4Output.textContent = `Selected Car: ${event.target.value}`;
  }
});

//--- Part 5 ----------------------------------------------------------------------------------------------
const selectTask5Animals = document.getElementById("selectTask5Animals");
const txtTask5Output = document.getElementById("txtTask5Output");

selectTask5Animals.addEventListener("change", () => {
  const selectedAnimal = selectTask5Animals.options[selectTask5Animals.selectedIndex].text;
  txtTask5Output.textContent = `You selected: ${selectedAnimal}`;
});
