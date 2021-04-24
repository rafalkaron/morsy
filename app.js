const plaintextInput = document.getElementById("plaintextInput");
const morseOutput = document.getElementById("morseOutput");
const btnLight = document.getElementById("btnLight");
const elem = document.documentElement;

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
  "=": "-...-",
  "+": ".-.-.",
  "@": ".--.-.",
};

const allowedCharacters = Object.keys(morseDictionary);

/* Generate Morse code */
const generateMorse = (inputText) => {
  let morse = inputText.toUpperCase(inputText);
  morse = morse.replace(/(\r\n|\n|\r)/gm, "");
  let uniqueCharacters = Array.from(new Set(morse));
  let found = uniqueCharacters.every((r) => allowedCharacters.indexOf(r) >= 0);
  let invalidCharacters = uniqueCharacters.filter(
    (el) => !allowedCharacters.includes(el)
  );

  if (found === true) {
    morse = morse.replace(/./gi, (m) => morseDictionary[m]);
    plaintextInput.style.borderColor = "black";
    morseOutput.style.color = "black";
    morseOutput.style.fontWeight = "500";
    return morse;
  } else {
    plaintextInput.style.borderColor = "#B33C1B";
    morseOutput.style.fontWeight = "bold";
    morseOutput.style.color = "#B33C1B";
    console.log(`[!] Illegal Symbol`);
    return `From your message above, remove the following untranslatable characters: \r\n
    ${invalidCharacters.join(", ")}`;
  }
};

/* Populate the output field on change */
plaintextInput.addEventListener(
  "input",
  (event) => (morseOutput.innerHTML = generateMorse(plaintextInput.value))
);

/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}

/* Init strobo */
btnLight.addEventListener("click", function () {
  console.log("[i] Light");
  openFullscreen();
});
