export const showToast = function (text, color = "green", address) {
  const toast = document.querySelector("#toast");
  toast.innerHTML = text;
  toast.style.display = "block";
  toast.style.backgroundColor = color;
  setTimeout(() => (toast.style.transform = "scale(1)"), 100);

  if (color !== "red" && color !== "brown") {
    setTimeout(() => location.assign(`./${address}.html`), 2000);
  }
};
