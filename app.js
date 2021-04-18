const plaintextInput = document.getElementById("plaintextInput");
const btnGenerate = document.querySelector(".btn-generate");
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

/* Uppercase all characters */
const upperCase = (inputText) => {
  const upperCased = inputText.toUpperCase(inputText);
  console.log(`[Uppercase] ${upperCased}`);
  return upperCased;
};

/* Encode uppercased characters */
const encodeCharacters = (inputText) => {
  const encoded = inputText.replace("A", ".-");
  console.log(`[Encode] ${encoded}`);
  return encoded;
};

/* Generate Morse code */
const generateMorse = (inputText) => {
  var morse = upperCase(inputText);
  var morse = encodeCharacters(morse);
  return morse;
};

/* Populate the output field on click */
btnGenerate.addEventListener("click", function () {
  console.log("[i] Generate Morse");
  //morseOutput.innerHTML = plaintextInput.value;
  morseOutput.innerHTML = generateMorse(plaintextInput.value);
});
