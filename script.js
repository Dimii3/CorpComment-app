const textareaEl = document.querySelector(".form__textarea");
const counterNum = document.querySelector(".counter");
const feedbackList = document.querySelector(".feedbacks");
const submitBtn = document.querySelector(".submit-btn");
// FORM
const formEl = document.querySelector(".form");

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

const submitHandler = (e) => {
  e.preventDefault();
  //   get user text
  const userText = textareaEl.value;
  //   basic validation
  if (userText.includes("#") && userText.length >= 5) {
    formEl.classList.add("form--valid");
    setTimeout(() => {
      formEl.classList.remove("form--valid");
    }, 3000);
  } else {
    formEl.classList.add("form--invalid");
    setTimeout(() => {
      formEl.classList.remove("form--invalid");
    }, 3000);
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
  counterNum.textContent = 150;
};

formEl.addEventListener("submit", (e) => {
  submitHandler(e);
});
