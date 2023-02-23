const firstNameInput = document.querySelector("#first-name-input");
const lastNameInput = document.querySelector("#last-name-input");
const emailInput = document.querySelector("#email-input");
const form = document.querySelector("form");
const formContainer = document.querySelector(".form");
const welcome = document.querySelector("#welcome");
const submitButton = document.querySelector("#submit-button");
const loader = document.querySelector("#loader");

// check if user has signed up before

if (localStorage.getItem("firstName")) {
  addUser();
  cardAnimation();
  showTopics();
} else {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    loader.classList.remove("hide");

    const user = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
    };

    console.log(user);

    localStorage.setItem("firstName", user.firstName);
    localStorage.setItem("lastName", user.lastName);

    setTimeout(() => {
      addUser(user);
      cardAnimation();
    }, 1000);

    setTimeout(() => {
      showTopics();
    }, 2000);
  });
}

// end of check

// Form Validation

document.addEventListener("keyup", (event) => {
  if (nameCheck() && emailCheck()) {
    console.log("all fields have value");
    submitButton.disabled = false;
  } else submitButton.disabled = true;
});

function nameCheck() {
  const regEx = /^([a-zA-Z]{2,6})*$/;
  if (regEx.test(firstNameInput.value) && regEx.test(lastNameInput.value)) {
    return true;
  }
  return false;
}

function emailCheck() {
  if (!emailInput.value) {
    return false;
  }
  const regEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
  return regEx.test(emailInput.value);
}

// end of "Form Validation"

// add information from sign-up to page

function addUser(user) {
  loader.classList.add("hide");
  formContainer.classList.add("hide");
  if (localStorage.getItem("firstName")) {
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");

    welcome.innerHTML += `
        <div>
            <h1>Welcome to a course-assignment project I've been working on, ${firstName}&nbsp;${lastName}.</h1>
            <p>You will be able to see through characters, books and movies from the legendary <strong>The Lord of the Rings</strong> world.</p>
        </div>
    `;
  } else {
    welcome.innerHTML += `
        <div>
            <h1>Welcome to a course-assignment project I've been working on, <br >${user.firstName}&nbsp;${user.lastName}.</h1>
            <p>You will be able to scroll through characters from <strong>The Lord of the Rings</strong>, check their wiki, get some info about them and also search for a specific character.</p>
        </div>
    `;
  }
}

// end of add information

// some animations and show/hide

function cardAnimation() {
  setTimeout(() => {
    const card = document.querySelectorAll(".card");
    card.forEach((card) => card.classList.add("animate-after"));
  }, 200);
}

function showTopics() {
  const topics = document.querySelector(".topics-container");
  topics.classList.remove("hide");
}
