import { Animals } from "./animals-class";

function createAnimalsFrom(animalList) {
  let animalsCreated = [];

  animalList.forEach((animal, index) => {
    animalsCreated[index] = new Animals(animal.name, animal.sound, animal.face);
  });

  return animalsCreated;
}

export { createAnimalsFrom };
