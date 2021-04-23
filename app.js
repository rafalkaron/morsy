const plaintextInput = document.getElementById("plaintextInput");
const morseOutput = document.getElementById("morseOutput");

/* Character:Morse Dictionary */
const morseDictionary = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",

  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  0: "-----",

  ".": ".-.-.-",
  "?": "..--..",
  "!": "-.-.--",
  "(": "-.--.",
  ")": "-.--.-",
  ":": "---...",
  ";": "-.-.-.",
  ",": "--..--",
  "'": ".----.",
  "/": "-..-.",
  "&": ".-...",
  "-": "-....-",
  " ": "/",
};

const allowedCharacters = Object.keys(morseDictionary);

/* Generate Morse code */
const generateMorse = (inputText) => {
  let morse = inputText.toUpperCase(inputText);
  let uniqueCharacters = Array.from(new Set(morse));
  //let characters = Array.from(morse);
  //let lastCharacter = characters[characters.length - 1];

  console.log(uniqueCharacters);
  /*
  for (const character of characters) {
    if (character in morseDictionary) {
      console.log(`[Valid character]${character}`);
      plaintextInput.style.borderColor = "black";
      morseOutput.style.background = "white";
    } else {
      plaintextInput.style.borderColor = "orangered";
      morseOutput.style.background = "black";
      //morse.output.style.content = "Invalid input";
    }
  }*/

  morse = morse.replace(/./gi, (m) => morseDictionary[m]);
  console.log(`[Encode] ${morse}`);
  return morse;
};

/* Populate the output field on change */
plaintextInput.addEventListener(
  "input",
  (event) => (morseOutput.innerHTML = generateMorse(plaintextInput.value))
);

/* Populate the output field on click 
btnGenerate.addEventListener("click", function () {
  console.log("[i] Generate Morse");
  morseOutput.innerHTML = generateMorse(plaintextInput.value);
});*/
