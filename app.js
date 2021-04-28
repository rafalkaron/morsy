/* Global variables */
const plaintextInput = document.getElementById("plaintextInput");
const morseOutput = document.getElementById("morseOutput");
const btnLight = document.getElementById("btnLight");
const btnPlay = document.getElementById("btnPlay");
const btnStop = document.getElementById("btnStop");
const btnRepeat = document.getElementById("btnRepeat");
const btnClear = document.getElementById("btnClear");
const btnPause = document.getElementById("btnPause");
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

const morseOutputDefault =
  ". -. - . .-. /-.-- --- ..- .-. /-- . ... ... .- --. . /.... . .-. . .-.-.- .-.-.- .-.-.-";
morseOutput.innerHTML = morseOutputDefault;

/* Place cursor in the input field automatically */
plaintextInput.focus();
plaintextInput.select();

const allowedCharacters = Object.keys(morseDictionary);

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
    /* Remove the redundant space at the end */
    morse = morse.slice(0, -1);
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

/* BEEPER */
const soundDot = new Audio("assets/beeps/dot.mp3");
const soundDash = new Audio("assets/beeps/dash.mp3");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

btnStop.classList.add("disabled");
btnStop.disabled = true;
btnPause.classList.add("disabled");
btnPause.disabled = true;

/* Light */
let light = false;
btnLight.addEventListener("click", async function () {
  if (light === false) {
    light = true;
    console.log("[i] Light");
    btnLight.focus();
    btnLight.classList.add("focused");
  } else if (light === true) {
    light = false;
    console.log("[i] Darkness");
    btnLight.blur();
    btnLight.classList.remove("focused");
    rootPageElement.style.backgroundColor = "#118ab2";
  }
});

/* Repeat */
let repeat = false;
btnRepeat.addEventListener("click", function () {
  if (repeat === false) {
    repeat = true;
    console.log("[i] Repeat");
    btnRepeat.focus();
    btnRepeat.classList.add("focused");
  } else if (repeat === true) {
    repeat = false;
    console.log("[i] Don't repeat");
    btnRepeat.blur();
    btnRepeat.classList.remove("focused");
  }
});

/* Pause */
let pause = false;
btnPause.addEventListener("click", function () {
  if (pause === false) {
    pause = true;
    console.log("[i] Pause");
    btnPause.focus();
    btnPause.classList.add("focused");
  } else if (pause === true) {
    pause = false;
    console.log("[i] Continue");
    btnPause.blur();
    btnPause.classList.remove("focused");
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
  btnPause.classList.remove("disabled");
  btnPause.disabled = false;
  btnClear.disabled = true;
  btnClear.classList.add("disabled");
  plaintextInput.disabled = true;

  await sleep(250);

  /* Stop */
  let play = true;
  btnStop.addEventListener("click", function () {
    play = false;
    console.log("[i] Stop playing");
  });

  while (play === true) {
    for (symbol of morseOutputArray) {
      while (pause === true) {
        await sleep(500);
        console.log("Paused...");

        /* TODO: Remove duplicated code */
        if (play === false) {
          btnStop.classList.add("disabled");
          btnStop.disabled = true;
          btnPause.classList.add("disabled");
          btnPause.disabled = true;
          btnPause.blur();
          plaintextInput.disabled = false;
          repeat = false;
          btnRepeat.blur();
          btnRepeat.classList.remove("focused");
          break;
        }
      }

      if (play === false) {
        btnStop.classList.add("disabled");
        btnStop.disabled = true;
        btnPause.classList.add("disabled");
        btnPause.disabled = true;
        btnPause.blur();
        plaintextInput.disabled = false;
        repeat = false;
        btnRepeat.blur();
        btnRepeat.classList.remove("focused");
        break;
      }
      if (symbol === ".") {
        console.log(`${symbol} : dot`);
        await sleep(100);
        if (light === true) {
          rootPageElement.style.backgroundColor = "white";
        }
        soundDot.play();
        await sleep(150);
        if (light === true) {
          rootPageElement.style.backgroundColor = "black";
        }
      } else if (symbol === "-") {
        console.log(`${symbol} : dash`);
        await sleep(100);
        if (light === true) {
          rootPageElement.style.backgroundColor = "white";
        }
        soundDash.play();
        await sleep(315);
        if (light === true) {
          rootPageElement.style.backgroundColor = "black";
        }
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
  rootPageElement.style.backgroundColor = "#118ab2";
  btnPlay.classList.remove("disabled");
  btnPlay.disabled = false;
  btnStop.classList.add("disabled");
  btnStop.disabled = true;
  btnPause.classList.add("disabled");
  btnPause.disabled = true;
  plaintextInput.disabled = false;
  btnClear.disabled = false;
  btnClear.classList.remove("disabled");
});

/* BUTTON: clear */
btnClear.addEventListener("click", function () {
  plaintextInput.value = null;
  morseOutput.innerHTML = morseOutputDefault;
  plaintextInput.focus();
  plaintextInput.select();
  console.log("[i] Clear");
  btnClear.blur();
  morseOutput.style.color = "#757575";
});
