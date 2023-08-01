"user strict";

const form = document.querySelector("#form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(form).entries());

  validateUser(formData);
});

const validateUser = function (data) {
  const getUsers = JSON.parse(localStorage.getItem("users"));
  const getUsersArr = getUsers ? getUsers : [];

  if (getUsersArr.length > 0) {
    const user = getUsersArr.find(
      (item) =>
        item.username === data.username && item.password__1 === data.password
    );
    if (user) {
      showToast("Login Successfully");
    } else {
      showToast("Invalid Username or Password", "red");
    }
  } else {
    showToast("No User Exist Please Create One", "blue");
  }
};

const showToast = function (text, color = "green") {
  toast.textContent = text;
  toast.style.display = "block";
  toast.style.backgroundColor = color;
  setTimeout(() => (toast.style.transform = "scale(1)"), 100);

  if (color === "green") {
    setTimeout(() => location.assign("notes.html"), 2000);
  } else if (color === "blue") {
    setTimeout(() => location.assign("signup.html"), 2000);
  }
};
