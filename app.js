const plaintextInput = document.getElementById("plaintextInput");
const btnGenerate = document.querySelector(".btn-generate");
const morseOutput = document.getElementById("morseOutput");

btnGenerate.addEventListener("click", function () {
  console.log(plaintextInput.value);
  morseOutput.innerHTML = plaintextInput.value;
});
