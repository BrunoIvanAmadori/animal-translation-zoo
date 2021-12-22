class Animals {
  constructor(name, sound, face) {
    this.name = name;
    this.sound = sound;
    this.face = face;
  }

  speak(input) {
    let output;

    if (!input.includes(" ") && input.length > 0) {
      output = input + " " + "<i>" + this.sound + "</i>";
    } else {
      let inputArray = input.split(" ");

      inputArray.forEach((word, index) => {
        inputArray[index] = word + " " + "<i>" + this.sound + "</i>";
      });
      output = inputArray.join(" ");
    }
    return output;
  }
}

export { Animals };
