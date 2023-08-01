"user strict";

const signUpBtn = document.querySelector("#submit");
const form = document.querySelector("#form");
const toast = document.querySelector("#toast");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(form).entries());

  if (formData.password__1 === formData.password__2) {
    createUser(formData);
    form.reset();
  } else {
    showToast("Passwords NOT Match", "red");
  }
});

const createUser = function (data) {
  data.id = Date.now();
  const getUser = JSON.parse(localStorage.getItem("users"));
  const userDataArr = getUser ? getUser : [];

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
    showToast("Your Account CREATED Successfully");
  }
};

const showToast = function (text, color = "green") {
  toast.textContent = text;
  toast.style.display = "block";
  toast.style.backgroundColor = color;
  setTimeout(() => (toast.style.transform = "scale(1)"), 100);

  if (color === "green") {
    setTimeout(() => location.assign("notes.html"), 2000);
  }
};
