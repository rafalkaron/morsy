const plaintextInput = document.getElementById("plaintextInput");
const btnGenerate = document.querySelector(".btn-generate");
const morseOutput = document.getElementById("morseOutput");

const generateMorse = (inputText) => {
  const lowerCased = text.toLowerCase(text);
  console.log(lowerCased);
};

btnGenerate.addEventListener("click", function () {
  console.log("[i] Generate Morse");
  morseOutput.innerHTML = plaintextInput.value;
  //morseOutput.innerHTML = generateMorse(plaintextInput.value);
});
