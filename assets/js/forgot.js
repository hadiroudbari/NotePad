import { showToast } from "./general.js";

("user strict");

const formForgot = document.querySelector("#form");

formForgot.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(form).entries());

  findUser(formData);
});

const findUser = (data) => {
  const getUsers = JSON.parse(localStorage.getItem("users"));
  const getUsersArr = getUsers ?? [];

  if (getUsersArr.length > 0) {
    const user = getUsersArr.find((item) => item.email === data.email);

    if (user) {
      showToast(`Your Password is </br></br> "${user.password__1}"`, "brown");
    } else {
      showToast("Invalid Email Address", "red");
    }
  } else {
    showToast("No User Exist Please Create One", "blue", "signup");
  }
};
