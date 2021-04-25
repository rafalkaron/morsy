const plaintextInput = document.getElementById("plaintextInput");
const morseOutput = document.getElementById("morseOutput");
const btnLight = document.getElementById("btnLight");
const btnPlay = document.getElementById("btnPlay");
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

morseOutput.innerHTML =
  ". -. - . .-. /-.-- --- ..- .-. /-- . ... ... .- --. . /.... . .-. . .-.-.- .-.-.- .-.-.-";
morseOutput.style.color = "#757575";

/* Generate Morse code */
const generateMorse = (inputText) => {
  let morse = inputText.toUpperCase(inputText);
  /* Remove enters */
  morse = morse.replace(/(\r\n|\n|\r)/gm, "");
  /* Replace multiple spaces with a single space */
  morse = morse.replace(/  +/g, " ");
  let uniqueCharacters = Array.from(new Set(morse));
  let found = uniqueCharacters.every((r) => allowedCharacters.indexOf(r) >= 0);
  let invalidCharacters = uniqueCharacters.filter(
    (el) => !allowedCharacters.includes(el)
  );

  if (plaintextInput.value === "") {
    plaintextInput.style.borderColor = "black";
    morseOutput.style.color = "#757575";
    morseOutput.style.fontWeight = "500";
    btnPlay.classList.remove("disabled");
    btnPlay.disabled = false;
    return ". -. - . .-. /-.-- --- ..- .-. /-- . ... ... .- --. . /.... . .-. . .-.-.- .-.-.- .-.-.-";
  } else if (found === true && plaintextInput.value !== "") {
    morse = morse.replace(/./gi, (m) => morseDictionary[m]);
    plaintextInput.style.borderColor = "black";
    morseOutput.style.color = "black";
    morseOutput.style.fontWeight = "500";
    btnPlay.classList.remove("disabled");
    btnPlay.disabled = false;
    return morse;
  } else {
    plaintextInput.style.borderColor = "#B33C1B";
    morseOutput.style.fontWeight = "bold";
    morseOutput.style.color = "#B33C1B";
    console.log(`[!] Illegal Symbol`);
    btnPlay.classList.add("disabled");
    btnPlay.disabled = true;
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

/* Init strobo 
btnLight.addEventListener("click", function () {
  console.log("[i] Light");
  openFullscreen();

  for (symbol in morseOutput.value) {
    console.log(symbol);
    rootPageElement.style.backgroundColor = "orange";
  }
});
*/

/* BEEPER */
const soundDot = new Audio("assets/beeps/dot.mp3");
const soundDash = new Audio("assets/beeps/dash.mp3");

btnPlay.addEventListener("click", function () {
  console.log("[i] Play");
  morseOutputArray = Array.from(morseOutput.value);

  morseOutputArray.forEach(function (symbol, index) {
    if (symbol === ".") {
      console.log(`${symbol} : dot`);
      soundDot.play();
      setTimeout(1000);
    } else if (symbol === "-") {
      console.log(`${symbol} : dash`);
      soundDash.play();
      setTimeout(1000);
    } else if (symbol === " ") {
      console.log(`${symbol} : break`);
      setTimeout(1000);
    } else if (symbol === "/") {
      console.log(`${symbol} : space`);
      setTimeout(1000);
    } else {
      console.log(`${symbol} : UNKNOWN`);
    }
  });
});
