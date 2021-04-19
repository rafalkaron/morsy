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

/* Generate Morse code */
const generateMorse = (inputText) => {
  if (morseDictionary.ł === undefined) {
    console.log("undefined!");
  }
  let morse = inputText.toUpperCase(inputText);
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
