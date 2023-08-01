"user strict";

const form = document.querySelector("#form");
const title = document.querySelector("#title");
const text = document.querySelector("#text");
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
let flag = false;
let deleteTagsArr = [];

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

  if (isEditedItem()) {
    if (!flag) {
      editNote();
      createNote(formData);
      showToast("Note edited successfully");
    } else {
      showToast("Edit Tags is On", "red");
    }
  } else {
    if (!flag) {
      createNote(formData);
      form.reset();
      showToast("Note added successfully");
    } else {
      showToast("Edit Tags is On", "red");
    }
  }
});

btnCheckmark.addEventListener("click", function () {
  const formData = Object.fromEntries(new FormData(form).entries());
  const getTagsArr = getLocalStorage("tags");

  if (deleteTagsArr.length > 0) {
    deleteTagsArr.forEach((item) => {
      const removeItem = getTagsArr.indexOf(item);
      if (removeItem >= 0) {
        getTagsArr.splice(removeItem, 1);
      }
    });
  }

  // console.log(deleteTagsArr);
  // console.log(getTagsArr);
  setLocalStorage(getTagsArr, "tags");

  deleteTagsArr = [];
  createTags(formData);
  showTags();
  showEditedItem();
});

btnCancel.addEventListener("click", function () {
  showTags();
  showEditedItem();
});

iconsBox.addEventListener("click", function (e) {
  const iconsArr = Array.from(e.target.classList);
  let btnDelete = selectQueries().first;
  let tagLabel = selectQueries().second;

  const shake = function () {
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
  };

  btnDelete.forEach((item) => {
    item.addEventListener("click", function (e) {
      const tagTarget = e.target.closest(".tag__label");
      tagTarget.style.display = "none";

      const target = e.target.parentElement.htmlFor.slice(5);
      deleteTagsArr.push(target);

      shake();
    });
  });

  if (iconsArr.includes("checkbox__icon--edit")) {
    flag = true;

    addTagsBox.innerHTML = `
    <input
     type="text"
     name="tag__0"
     class="add__tag"
     placeholder="Tag Name"
     minlength="2"
     maxlength="15"
  />
    `;
    shake();
  }

  if (
    iconsArr.includes("checkbox__icon--checkmark") ||
    iconsArr.includes("checkbox__icon--cancel")
  ) {
    flag = false;

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

const selectQueries = function () {
  const btnDelete = document.querySelectorAll(".icon__delete");
  const tagLabel = document.querySelectorAll(".tag__label");
  return {
    first: btnDelete,
    second: tagLabel,
  };
};

const getLocalStorage = (keyName) => JSON.parse(localStorage.getItem(keyName));

const setLocalStorage = (items, keyName) =>
  localStorage.setItem(keyName, JSON.stringify(items));

const createTags = function (data) {
  const getTagsArr = getLocalStorage("tags");
  const tagArr = getTagsArr ? getTagsArr : [];

  for (const key in data) {
    if (key.includes("tag")) {
      if (data[key] !== "") {
        tagArr.push(data[key]);
      }
    }
  }

  setLocalStorage(tagArr, "tags");
};

const showTags = function () {
  const getTags = getLocalStorage("tags");

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
  data.id = Date.now();
  const getNotes = getLocalStorage("notes");
  const notes = getNotes ? getNotes : [];
  notes.push(data);
  setLocalStorage(notes, "notes");
};

const editNote = function () {
  const getEditID = isEditedItem();
  const notes = getLocalStorage("notes");

  notesArr = notes.filter((note) => note.id !== getEditID);

  setLocalStorage(notesArr, "notes");
  localStorage.removeItem("selectedNote");
};

const showEditedItem = function () {
  const getEditID = isEditedItem();
  const notesArr = getLocalStorage("notes");
  const tagsArr = document.querySelectorAll(".tag");
  let tagValue = [];

  if (getEditID) {
    const editedValue = notesArr.find((item) => item.id === getEditID);

    for (const key in editedValue) {
      if (key.includes("label")) {
        if (editedValue[key] !== "all") {
          tagValue.push(editedValue[key]);
        }
      }
    }

    tagsArr.forEach((item) => {
      if (tagValue.includes(item.value)) {
        item.checked = "checked";
      }
    });

    title.value = editedValue.title;
    text.value = editedValue.text;
  }
};

const isEditedItem = function () {
  const getEditItem = getLocalStorage("selectedNote");

  return getEditItem;
};

const showToast = function (text, color = "green") {
  window.scrollTo(0, 0);
  toast.textContent = text;
  toast.style.display = "block";
  toast.style.backgroundColor = color;
  setTimeout(() => (toast.style.transform = "scale(1)"), 100);

  if (color === "green") {
    setTimeout(() => location.assign("notes.html"), 2000);
  }
};

document.addEventListener("DOMContentLoaded", showTags);
document.addEventListener("DOMContentLoaded", showEditedItem);
