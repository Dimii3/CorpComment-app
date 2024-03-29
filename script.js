const MAX_CHARS = 150;
const BASE_API_URL = "https://bytegrad.com/course-assets/js/1/api";

const textareaEl = document.querySelector(".form__textarea");
const counterNum = document.querySelector(".counter");
const feedbackList = document.querySelector(".feedbacks");
const submitBtn = document.querySelector(".submit-btn");
const hashtagsList = document.querySelector(".hashtags");
// FORM
const formEl = document.querySelector(".form");

const renderFeedbackItem = (feedbackData) => {
  //   create feedback item
  const feedbackItem = `<li class="feedback">
  <button class="upvote">
      <i class="fa-solid fa-caret-up upvote__icon"></i>
      <span class="upvote__count">${feedbackData.upvoteCount}</span>
  </button>
  <section class="feedback__badge">
      <p class="feedback__letter">${feedbackData.badgeLetter}</p>
  </section>
  <div class="feedback__content">
      <p class="feedback__company">${feedbackData.company}</p>
      <p class="feedback__text">${feedbackData.text}</p>
  </div>
  <p class="feedback__date">${
    feedbackData.daysAgo === 0 ? "new" : feedbackData.daysAgo + "d"
  }</p>
</li>`;

  feedbackList.insertAdjacentHTML("afterbegin", feedbackItem);
};

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
  const text = textareaEl.value;
  //   basic validation
  if (text.includes("#") && text.length >= 5) {
    showVisualIndicator(text);
  } else {
    showVisualIndicator("");
    textareaEl.focus();
    return;
  }
  const hashtag = text.split(" ").find((word) => word.includes("#"));
  const company = hashtag.substring(1);
  const badgeLetter = company.substring(0, 1).toUpperCase();
  const upvoteCount = 0;
  const daysAgo = 0;

  // create feedback object
  const feedbackItem = {
    upvoteCount,
    company,
    badgeLetter,
    daysAgo,
    text,
  };

  renderFeedbackItem(feedbackItem);
  // send feedbackItem to the server
  fetch(`${BASE_API_URL}/feedbacks`, {
    method: "POST",
    body: JSON.stringify(feedbackItem),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        return console.log("Something went wrong");
      }
      console.log("Succesfully submitted");
    })
    .catch((err) => {
      console.error(err);
    });

  //   reset
  textareaEl.value = "";
  submitBtn.blur();
  counterNum.textContent = MAX_CHARS;
};

formEl.addEventListener("submit", (e) => {
  submitHandler(e);
});

fetch(`${BASE_API_URL}/feedbacks`)
  .then((res) => res.json())
  .then(({ feedbacks }) => {
    feedbacks.forEach((feedbackItem) => {
      renderFeedbackItem(feedbackItem);
    });
    document.querySelector(".spinner").remove();
  })
  .catch((err) => {
    feedbackList.innerHTML = `<small class="error-message"> Ops.. something went wrong 😯 </small>`;
    document.querySelector(".spinner").remove();
    console.error(err.message);
  });

const clickHandler = (event) => {
  const clickedEl = event.target;
  const upvoteIntention = clickedEl.className.includes("upvote");
  if (upvoteIntention) {
    const upvoteBtn = clickedEl.closest(".upvote");
    upvoteBtn.disabled = true;
    const upvoteCountEl = upvoteBtn.querySelector(".upvote__count");
    let upvoteCountNumber = +upvoteCountEl.textContent++;
  } else {
    clickedEl.closest(".feedback").classList.toggle("feedback--expand");
  }
};

feedbackList.addEventListener("click", clickHandler);

const hashFilter = (event) => {
  const clickedEl = event.target;
  if (clickedEl.className.includes("hashtags")) return;

  const selectedHash = clickedEl.textContent.substring(1).toLowerCase().trim();
  const allExistingHash = [...feedbackList.children].forEach((item) => {
    item.style.display = "grid";
    const companyHashs = item
      .querySelector(".feedback__company")
      .textContent.toLowerCase()
      .trim();
    if (selectedHash !== companyHashs) item.style.display = "none";
  });
};

hashtagsList.addEventListener("click", hashFilter);
