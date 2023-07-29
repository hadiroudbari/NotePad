"user strict";

const form = document.querySelector("#form");
const btnEdit = document.querySelector(".checkbox__icon--edit");
const btnCheckmark = document.querySelector(".checkbox__icon--checkmark");
const btnCancel = document.querySelector(".checkbox__icon--cancel");
const iconsBox = document.querySelector(".checkbox__icons");
const btnDelete = document.querySelectorAll(".icon__delete");
const tagLabel = document.querySelectorAll(".tag__label");
const tagAdd = document.querySelector(".checkbox__tags--add");
const addLink = document.querySelector(".add__link");
const addTagsBox = document.querySelector(".add__tags--box");
const checkBoxTags = document.querySelector(".checkbox__items");

let count = 1;
addLink.addEventListener("click", function (e) {
  e.preventDefault();

  const html = `
  <input
    type="text"
    name="tag__${count}"
    class="add__tag"
    placeholder="Tag Name"
    minlength="2"
    maxlength="15"
  />
  `;
  count++;
  addTagsBox.insertAdjacentHTML("beforeend", html);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(form).entries());

  console.log(formData);

  createNote(formData);
  createTags(formData);
  form.reset();
  // showToast("Note added successfully");
});

const getLocalStorage = (keyName) => JSON.parse(localStorage.getItem(keyName));

const setLocalStorage = (items, keyName) =>
  localStorage.setItem(keyName, JSON.stringify(items));

const createTags = function (data) {
  const getTagsArr = getLocalStorage("tags");
  const tagArr = getTagsArr ? getTagsArr : [];

  for (const key in data) {
    if (key.includes("tag")) {
      tagArr.push(data[key]);
    }
  }

  setLocalStorage(tagArr, "tags");
};

const showTags = function () {
  const getTags = getLocalStorage("tags");
  console.log(getTags);

  checkBoxTags.innerHTML = `
            <div class="checkbox__item">
              <label for="tag__all" class="tag__label">
                all
                <input
                  checked="checked"
                  value="all"
                  type="checkbox"
                  name="label__all"
                  class="tag"
                  id="tag__all"
                />
                <span class="checkmark"></span>
              </label>
            </div>
  `;

  getTags.forEach((item) => {
    const html = `
    <div class="checkbox__item">
      <label for="tag__${item}" class="tag__label">
        <ion-icon
          class="icon__delete"
          name="close-circle-outline"
        ></ion-icon>${item}
        <input
          value="${item}"
          type="checkbox"
          name="label__${item}"
          class="tag"
          id="tag__${item}"
        />
        <span class="checkmark"></span>
      </label>
    </div>
    `;
    checkBoxTags.insertAdjacentHTML("beforeend", html);
  });
};

const createNote = function (data) {
  const getNotes = getLocalStorage("notes");
  const notes = getNotes ? getNotes : [];
  notes.push(data);
  setLocalStorage(notes, "notes");
};

iconsBox.addEventListener("click", function (e) {
  const iconsArr = Array.from(e.target.classList);

  if (iconsArr.includes("checkbox__icon--edit")) {
    btnEdit.style.display = "none";
    btnCheckmark.style.display = "block";
    btnCancel.style.display = "block";
    iconsBox.style.width = "5rem";
    tagAdd.style.display = "block";
    btnDelete.forEach((item) => {
      item.style.display = "block";
    });
    tagLabel.forEach((item) => {
      item.style.animation = "shake 0.75s infinite";
    });
  }

  if (
    iconsArr.includes("checkbox__icon--checkmark") ||
    iconsArr.includes("checkbox__icon--cancel")
  ) {
    btnEdit.style.display = "block";
    btnCheckmark.style.display = "none";
    btnCancel.style.display = "none";
    iconsBox.style.width = "3rem";
    tagAdd.style.display = "none";
    btnDelete.forEach((item) => {
      item.style.display = "none";
    });
    tagLabel.forEach((item) => {
      item.style.animation = "";
    });
  }
});

const showToast = function (text, color = "green") {
  toast.textContent = text;
  toast.style.display = "block";
  toast.style.backgroundColor = color;
  setTimeout(() => (toast.style.transform = "scale(1)"), 100);

  if (color === "green") {
    setTimeout(() => location.assign("notes.html"), 2000);
  }
};

document.addEventListener("DOMContentLoaded", showTags);
