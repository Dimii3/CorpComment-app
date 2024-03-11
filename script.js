const textareaEl = document.querySelector(".form__textarea");
const counterNum = document.querySelector(".counter");

const inputHandler = (maxChars = 150, event) => {
  // set the maximum numbers of characters
  const maximumChars = maxChars;
  // control the number of current chars
  const currentNumChars = event.target.value.length;
  counterNum.textContent = maximumChars - currentNumChars;
};

textareaEl.addEventListener("input", (e) => {
  inputHandler(150, e);
});
