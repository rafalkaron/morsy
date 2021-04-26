const plaintextInput = document.getElementById("plaintextInput");
const morseOutput = document.getElementById("morseOutput");
const btnLight = document.getElementById("btnLight");
const btnPlay = document.getElementById("btnPlay");
const btnStop = document.getElementById("btnStop");
const btnRepeat = document.getElementById("btnRepeat");
const rootPageElement = document.documentElement;

/* Place cursor in the input field automatically */
plaintextInput.focus();
plaintextInput.select();

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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

btnStop.classList.add("disabled");
btnStop.disabled = true;

/* Repeat */
let repeat = false;
btnRepeat.addEventListener("click", function () {
  if (repeat === false) {
    repeat = true;
    console.log("[i] Repeat");
    btnRepeat.focus();
  } else if (repeat === true) {
    repeat = false;
    console.log("[i] Don't repeat");
    btnRepeat.blur();
  }
});

btnPlay.addEventListener("click", async function () {
  console.clear();
  console.log("[i] Play");
  let morseOutputArray = Array.from(morseOutput.value);

  btnPlay.classList.add("disabled");
  btnPlay.disabled = true;
  btnStop.classList.remove("disabled");
  btnStop.disabled = false;
  plaintextInput.disabled = true;

  await sleep(250);

  let play = true;

  btnStop.addEventListener("click", function () {
    play = false;
    console.log("[i] Stop playing");
  });

  while (play === true) {
    for (symbol of morseOutputArray) {
      if (play === false) {
        btnStop.classList.add("disabled");
        btnStop.disabled = true;
        plaintextInput.disabled = false;
        break;
      }
      if (symbol === ".") {
        console.log(`${symbol} : dot`);
        await sleep(100);
        soundDot.play();
        await sleep(150);
      } else if (symbol === "-") {
        console.log(`${symbol} : dash`);
        await sleep(100);
        soundDash.play();
        await sleep(315);
      } else if (symbol === " ") {
        console.log(`${symbol} : break`);
        await sleep(100);
      } else if (symbol === "/") {
        console.log(`${symbol} : space`);
        await sleep(150);
      } else {
        console.log(`${symbol} : UNKNOWN`);
      }
    }
    if (repeat === false) {
      break;
    }
  }
  btnPlay.classList.remove("disabled");
  btnPlay.disabled = false;
  btnStop.classList.add("disabled");
  btnStop.disabled = true;
  plaintextInput.disabled = false;
});
