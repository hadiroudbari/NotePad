import { showToast } from "./general.js";

("user strict");

// Password Validation

const inputRgsPassword = document.querySelector("#password__1");
const registerWarningPass = document.querySelector(
  ".warning__register--password"
);

let arrValidation = [],
  passValidation;

const passwordValidation = () => {
  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;
  if (inputRgsPassword.value.match(lowerCaseLetters)) {
    document.querySelector("#letter").classList.add("valid");
    arrValidation.push("1");
  } else {
    document.querySelector("#letter").classList.remove("valid");
  }
  if (inputRgsPassword.value.match(upperCaseLetters)) {
    document.querySelector("#capital").classList.add("valid");
    arrValidation.push("2");
  } else {
    document.querySelector("#capital").classList.remove("valid");
  }
  if (inputRgsPassword.value.match(numbers)) {
    document.querySelector("#number").classList.add("valid");
    arrValidation.push("3");
  } else {
    document.querySelector("#number").classList.remove("valid");
  }
  if (inputRgsPassword.value.length >= 8) {
    document.querySelector("#length").classList.add("valid");
    arrValidation.push("4");
  } else {
    document.querySelector("#length").classList.remove("valid");
  }

  if ([...new Set(arrValidation)].length == 4) {
    passValidation = true;
    arrValidation = [];
  } else {
    passValidation = false;
  }

  if (passValidation) {
    registerWarningPass.classList.add("Done");
    registerWarningPass.classList.remove("Wrong");
  } else {
    registerWarningPass.classList.add("Wrong");
  }
};

inputRgsPassword.addEventListener("keyup", passwordValidation);

inputRgsPassword.addEventListener("focus", () => {
  registerWarningPass.style.display = "table";
  registerWarningPass.innerHTML = `
  <div id="message">
    <h3>Password must contain :</h3>
    <p id="letter" class="invalid">A <b>lowercase</b> letter</p>
    <p id="capital" class="invalid">A <b>capital (uppercase)</b> letter</p>
    <p id="number" class="invalid">A <b>number</b></p>
    <p id="length" class="invalid">Minimum <b>8 characters</b></p>
  </div>`;
  if (passValidation) {
    document
      .querySelectorAll(".invalid")
      .forEach((p) => p.classList.add("valid"));
  }
  passwordValidation();
});

inputRgsPassword.addEventListener("blur", () => {
  registerWarningPass.style.display = "none";
  registerWarningPass.innerHTML = "";
});

// Sign Up

const form = document.querySelector("#form");
const inputPassword = document.querySelector("#password__1");
const passON = document.querySelector(".pass_ON");
const passOFF = document.querySelector(".pass_OFF");

const CreateUserFormData = (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(form).entries());

  const emailValidation = formData.email.split("@")[1].split(".");

  console.log(emailValidation);
  if (
    (emailValidation[0] === "gmail" || emailValidation[0] === "email") &&
    emailValidation[1] === "com"
  ) {
    if (!passValidation) {
      showToast("Password NOT Valid", "red");
      return;
    } else {
      if (formData.password__1 === formData.password__2) {
        createUser(formData);
      } else {
        showToast("Passwords NOT Match", "red");
      }
    }
  } else {
    showToast("Email NOT Valid", "red");
  }
};
form.addEventListener("submit", CreateUserFormData);

const createUser = function (data) {
  data.id = Math.floor(Math.random() * 10000000000);
  data.user_date = Date.now();
  data.user_notes = [];
  data.user_tasks = [];
  data.user_status = true;
  const getUsers = JSON.parse(localStorage.getItem("users"));
  const userDataArr = getUsers ? getUsers : [];

  const isUsername = userDataArr.some(
    (item) => item.username === data.username
  );

  const isEmail = userDataArr.some((item) => item.email === data.email);

  if (isUsername) {
    showToast("Username already exist", "red");
  } else if (isEmail) {
    showToast("Email already exist", "red");
  } else {
    userDataArr.push(data);
    localStorage.setItem("users", JSON.stringify(userDataArr));
    showToast("Your Account CREATED Successfully", "green", "select");
    form.reset();
  }
};

inputPassword.addEventListener("keyup", () => {
  if (inputPassword.value !== "") {
    passON.classList.add("active");
  } else {
    inputPassword.type = "password";
    passON.classList.remove("active");
    passOFF.classList.remove("active");
  }
});

passON.addEventListener("click", () => {
  inputPassword.type = "text";
  passON.classList.remove("active");
  passOFF.classList.add("active");
});

passOFF.addEventListener("click", () => {
  inputPassword.type = "password";
  passOFF.classList.remove("active");
  passON.classList.add("active");
});

const init = () => {
  form.reset();
};

window.addEventListener("DOMContentLoaded", init);
