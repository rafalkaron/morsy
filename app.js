const plaintextInput = document.getElementById("plaintextInput");
const morseOutput = document.getElementById("morseOutput");

/* Character:Morse Dictionary */
const morseDictionary = {
  A: ".-",
  Ą: ".-.-",
  B: "-...",
  C: "-.-.",
  Ć: "-.-..",
  D: "-..",
  E: ".",
  Ę: "..-..",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  Ł: ".-..-",
  M: "--",
  N: "-.",
  Ń: "--.--",
  O: "---",
  Ó: "---.",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  Ś: "...-...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Ź: "--..-.",
  Y: "-.--",
  Z: "--..",
  Ż: "--..-",

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
  let found = uniqueCharacters.every((r) => allowedCharacters.indexOf(r) >= 0);
  let invalidCharacters = uniqueCharacters.filter(
    (el) => !allowedCharacters.includes(el)
  );

  if (found === true) {
    morse = morse.replace(/./gi, (m) => morseDictionary[m]);
    plaintextInput.style.borderColor = "black";
    return morse;
  } else {
    plaintextInput.style.borderColor = "orangered";
    //morseOutput.style.background = "black";
    console.log(`[!] Illegal Symbol`);
    return `Remove the following illegal characters from the [YOUR MESSAGE] field: \r\n
    ${invalidCharacters.join("and ")}`;
  }
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
