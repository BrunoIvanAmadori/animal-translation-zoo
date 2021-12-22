import "url-change-event";
import "bootstrap/dist/js/bootstrap";

import "../index.html";
import "../scss/custom.scss";

import "../img/logo.png";
import "../img/send.png";

import { animalList } from "./lib/animal-list";
import { createAnimalsFrom } from "./lib/create-animals-from";
import { initAnimation } from "./lib/init-animation";

// We create an array of Animal Class instances based on a provided animal list
const animals = createAnimalsFrom(animalList);

function goToAnimalTranslationScreen() {
  const textToTranslate = document.getElementById("text-to-translate");
  const output = document.querySelector(".translation__output");

  const welcomeScreen = document.getElementById("welcome");
  const animalTranslationScreen = document.getElementById("animal-translation");

  textToTranslate.value = "";
  output.innerHTML = "<i>No output yet.</i>";

  animalTranslationScreen.style.visibility = "visible";
  welcomeScreen.style.visibility = "hidden";
}

// This function checks if we have a valid animal selection url, then shows the screen and returns the animal
function getSelectedAnimalFrom(url) {
  let selectedAnimal;

  if (url) {
    let urlParams = new URLSearchParams(url);
    for (let i = 0; i < animals.length; i++) {
      if (urlParams.get("animals") == animals[i].name) {
        selectedAnimal = animals[i];
      }
    }
  }

  return selectedAnimal;
}

// This function manipulates DOM to show current animal

function showAnimal(selected) {
  const selectedAnimalName = document.querySelector(
    ".translation__animal-name"
  );
  const selectedAnimalFace = document.querySelector(
    ".translation__animal-face"
  );

  if (selected) {
    selectedAnimalName.innerHTML =
      selected.name.charAt(0).toUpperCase() + selected.name.slice(1);
    selectedAnimalFace.innerHTML = selected.face;
  }
}

// This function gets the selected animal, shows it

function initAnimalSelection() {
  let selectedAnimalInURL;
  selectedAnimalInURL = getSelectedAnimalFrom(window.location.search);

  // If we have a selected animal at start, then let's show the screen and the animal
  if (selectedAnimalInURL) {
    goToAnimalTranslationScreen();
    showAnimal(selectedAnimalInURL);
  }

  // If there are changes in the URl, check if we have an animal and then show it.
  window.addEventListener("urlchangeevent", (ev) => {
    selectedAnimalInURL = getSelectedAnimalFrom(ev.newURL.search);

    if (selectedAnimalInURL) {
      goToAnimalTranslationScreen();
      showAnimal(selectedAnimalInURL);
    }
  });
}

/* This function listens to submits of the translation form.
 * On submit, it checks if there's a selected animal and executes .speak() method.
 */

function initTranslator() {
  const input = document.querySelector(".translation__form");
  const output = document.querySelector(".translation__output");
  const textToTranslate = document.getElementById("text-to-translate");

  input.addEventListener("submit", (ev) => {
    ev.preventDefault();
    let selectedAnimal = getSelectedAnimalFrom(window.location.search);

    if (selectedAnimal) {
      output.innerHTML = selectedAnimal.speak(textToTranslate.value);
    }
  });
}

// Executing all the stuff.
initAnimation();
initAnimalSelection();
initTranslator();
