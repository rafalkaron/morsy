const plaintextInput = document.getElementById("plaintextInput");
const btnGenerate = document.querySelector(".btn-generate");
const morseOutput = document.getElementById("morseOutput");

/* Uppercase all characters */
const upperCase = (inputText) => {
  const upperCased = inputText.toUpperCase(inputText);
  console.log(`[Uppercase] ${upperCased}`);
  return upperCased;
};

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
