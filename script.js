const MAX_CHARS = 150;

const textareaEl = document.querySelector(".form__textarea");
const counterNum = document.querySelector(".counter");
const feedbackList = document.querySelector(".feedbacks");
const submitBtn = document.querySelector(".submit-btn");
// FORM
const formEl = document.querySelector(".form");

const inputHandler = (event) => {
  // control the number of current chars
  const currentNumChars = event.target.value.length;
  counterNum.textContent = MAX_CHARS - currentNumChars;
};

textareaEl.addEventListener("input", (e) => {
  inputHandler(e);
});

const showVisualIndicator = (textCheck) => {
  const className = textCheck ? "form--valid" : "form--invalid";
  formEl.classList.add(className);
  setTimeout(() => {
    formEl.classList.remove(className);
  }, 3000);
};

const submitHandler = (e) => {
  e.preventDefault();
  //   get user text
  const userText = textareaEl.value;
  //   basic validation
  if (userText.includes("#") && userText.length >= 5) {
    showVisualIndicator(userText);
  } else {
    showVisualIndicator(userText);
    textareaEl.focus();
    return;
  }
  const hashtag = userText.split(" ").find((word) => word.includes("#"));
  const company = hashtag.substring(1);
  const badgeLetter = company.substring(0, 1).toUpperCase();
  const upvateCount = 0;
  const daysAgo = 0;

  //   create feedback item
  const feedbackItem = `<li class="feedback">
  <button class="upvote">
      <i class="fa-solid fa-caret-up upvote__icon"></i>
      <span class="upvote__count">${upvateCount}</span>
  </button>
  <section class="feedback__badge">
      <p class="feedback__letter">${badgeLetter}</p>
  </section>
  <div class="feedback__content">
      <p class="feedback__company">${company}</p>
      <p class="feedback__text">${userText}</p>
  </div>
  <p class="feedback__date">${daysAgo === 0 ? "new" : daysAgo + "d"}</p>
</li>`;

  feedbackList.insertAdjacentHTML("afterbegin", feedbackItem);
  //   reset
  textareaEl.value = "";
  submitBtn.blur();
  counterNum.textContent = MAX_CHARS;
};

formEl.addEventListener("submit", (e) => {
  submitHandler(e);
});
