const plaintextInput = document.getElementById("plaintextInput");
const morseOutput = document.getElementById("morseOutput");
const btnLight = document.getElementById("btnLight");
const rootPageElement = document.documentElement;

/* Character:Morse Dictionary */
const morseDictionary = {
  A: ".- ",
  Ą: ".-.- ",
  B: "-... ",
  C: "-.-. ",
  Ć: "-.-.. ",
  D: "-.. ",
  E: ". ",
  Ę: "..-.. ",
  F: "..-. ",
  G: "--. ",
  H: ".... ",
  I: ".. ",
  J: ".--- ",
  K: "-.- ",
  L: ".-.. ",
  Ł: ".-..- ",
  M: "-- ",
  N: "-. ",
  Ń: "--.-- ",
  O: "--- ",
  Ó: "---. ",
  P: ".--. ",
  Q: "--.- ",
  R: ".-. ",
  S: "... ",
  Ś: "...-... ",
  T: "- ",
  U: "..- ",
  V: "...- ",
  W: ".-- ",
  X: "-..- ",
  Ź: "--..-. ",
  Y: "-.-- ",
  Z: "--.. ",
  Ż: "--..- ",

  1: ".---- ",
  2: "..--- ",
  3: "...-- ",
  4: "....- ",
  5: "..... ",
  6: "-.... ",
  7: "--... ",
  8: "---.. ",
  9: "----. ",
  0: "----- ",

  ".": ".-.-.- ",
  "?": "..--.. ",
  "!": "-.-.-- ",
  "(": "-.--. ",
  ")": "-.--.- ",
  ":": "---... ",
  ";": "-.-.-. ",
  ",": "--..-- ",
  "'": ".----. ",
  "/": "-..-. ",
  "&": ".-... ",
  "-": "-....- ",
  " ": "/",
  "=": "-...- ",
  "+": ".-.-. ",
  "@": ".--.-. ",
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

morseOutput.innerHTML =
  ". -. - . .-. /-.-- --- ..- .-. /-- . ... ... .- --. . /.... . .-. . .-.-.- .-.-.- .-.-.-";

/* Populate the output field on change */
plaintextInput.addEventListener(
  "input",
  (event) => (morseOutput.innerHTML = generateMorse(plaintextInput.value))
);

/* View in fullscreen */
function openFullscreen() {
  if (rootPageElement.requestFullscreen) {
    rootPageElement.requestFullscreen();
  } else if (rootPageElement.webkitRequestFullscreen) {
    /* Safari */
    rootPageElement.webkitRequestFullscreen();
  } else if (rootPageElement.msRequestFullscreen) {
    /* IE11 */
    rootPageElement.msRequestFullscreen();
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

const randomColor = Math.floor(Math.random() * 16777215).toString(16);

/* Init strobo */
btnLight.addEventListener("click", function () {
  console.log("[i] Light");
  openFullscreen();

  for (symbol in morseOutput.value) {
    console.log(symbol);
    rootPageElement.style.backgroundColor = "#" + randomColor;
  }
});
