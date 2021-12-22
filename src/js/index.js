import "url-change-event";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap";

import "../index.html";
import "../scss/custom.scss";

import "../img/logo.png";
import "../img/send.png";

// import { Animals } from "./lib/animals-class";
import { animalList } from "./lib/animal-list";
import { createAnimalsFrom } from "./lib/create-animals-from";

const animals = createAnimalsFrom(animalList);

// DOM MANIPULATION

const welcomeScreen = document.getElementById("welcome");
const animalTranslationScreen = document.getElementById("animal-translation");

const selectedAnimalName = document.querySelector(".translation__animal-name");
const selectedAnimalFace = document.querySelector(".translation__animal-face");

var selectedAnimal;

function initAnimalSelection() {
  for (let i = 0; i < animals.length; i++) {
    if (window.location.search == "?animals=" + animals[i].name) {
      selectedAnimal = animals[i].name;
      selectedAnimalName.innerHTML =
        animals[i].name.charAt(0).toUpperCase() + animals[i].name.slice(1);
      selectedAnimalFace.innerHTML = animals[i].face;
      welcomeScreen.style.visibility = "hidden";
      animalTranslationScreen.style.visibility = "visible";
      break;
    } else {
      welcomeScreen.style.visibility = "visible";
      animalTranslationScreen.style.visibility = "hidden";

      selectedAnimalName.innerHTML =
        animals[i].name.charAt(0).toUpperCase() + animals[i].name.slice(1);
      selectedAnimalFace.innerHTML = animals[i].face;
    }
  }

  window.addEventListener("urlchangeevent", (ev) => {
    for (let i = 0; i < animals.length; i++) {
      console.log(animals);
      if (ev.newURL.search == "?animals=" + animals[i].name) {
        console.log("animal selected" + animals[i].name);
        selectedAnimal = animals[i].name;
        selectedAnimalName.innerHTML =
          animals[i].name.charAt(0).toUpperCase() + animals[i].name.slice(1);
        selectedAnimalFace.innerHTML = animals[i].face;

        welcomeScreen.style.visibility = "hidden";
        animalTranslationScreen.style.visibility = "visible";
        break;
      } else {
        console.log("tambien");
        welcomeScreen.style.visibility = "visible";
        animalTranslationScreen.style.visibility = "hidden";
      }
    }
  });
}

function initTranslator() {
  const input = document.querySelector(".translation__form");
  let textToTranslate = document.getElementById("text-to-translate");
  let output = document.querySelector(".translation__output");

  input.addEventListener("submit", (ev) => {
    console.log("submit");
    ev.preventDefault();
    animals.forEach((animal) => {
      console.log(animal);
      console.log(selectedAnimal);
      if (animal.name == selectedAnimal) {
        console.log("pl");
        output.innerHTML = animal.speak(textToTranslate.value);
      }
    });
  });
}

initAnimalSelection();
initTranslator();
