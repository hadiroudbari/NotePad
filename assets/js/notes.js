"user strict";

const cardsBox = document.querySelector(".cards__box");
const tagList = document.querySelector(".tag__list");
const noNote = document.querySelector(".null__notes");

const getLocalStorage = (keyName) => JSON.parse(localStorage.getItem(keyName));

const setLocalStorage = (items, keyName) =>
  localStorage.setItem(keyName, JSON.stringify(items));

const createNotes = function (notes) {
  cardsBox.innerHTML = "";

  notes.forEach((note) => {
    html = `
    <div class="card__item">
            <div class="title">
              <h4>${note.title}</h4>
              <div class="icons">
                <a href="#"
                onclick="selectNote(${note.id})"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="card__icon card__edit"
                    viewBox="0 0 512 512"
                    width="25"
                    height="25"
                  >
                    <path
                      d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="32"
                    />
                    <path
                      d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z"
                    />
                  </svg>
                </a>
                <a href="#"
                onclick="deleteNote(${note.id})"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="card__icon card__delete"
                    viewBox="0 0 512 512"
                    width="25"
                    height="25"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="32"
                      d="M368 368L144 144M368 144L144 368"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <p>
            ${note.text}
            </p>
          </div>
    `;

    cardsBox.insertAdjacentHTML("beforeend", html);
  });
};

const createTags = function (tags) {
  tagList.innerHTML = `
  <li class="tag__item active">all</li>
  `;

  tags.forEach((tag) => {
    html = `
    <li class="tag__item">${tag}</li>
    `;

    tagList.insertAdjacentHTML("beforeend", html);
  });
};

const showNotes = function (tagArr) {
  const notes = getLocalStorage("notes");
  const notesArr = notes ? notes : [];

  if (tagArr) {
    noNote.style.display = "none";
    createNotes(tagArr);
  } else {
    if (notesArr.length > 0) {
      noNote.style.display = "none";
      createNotes(notesArr);
    } else {
      cardsBox.innerHTML = "";
      noNote.style.display = "block";
    }
  }
};

const showTags = function () {
  const tagsArr = getLocalStorage("tags");

  if (tagsArr.length > 0) {
    createTags(tagsArr);
  }
};

const showCategory = function () {
  const catItems = document.querySelectorAll(".tag__item");
  catItems.forEach((item) => {
    item.addEventListener("click", function () {
      const getNotes = getLocalStorage("notes");
      let notesArr = [];
      getNotes.forEach((note) => {
        for (const key in note) {
          if (key.includes("label")) {
            // console.log(note[key] === item.textContent);
            if (note[key] === item.textContent) {
              notesArr.push(note);
            }
          }
        }
      });
      console.log(notesArr);
      showNotes(notesArr);
    });
  });
};

const deleteNote = function (id) {
  const notes = getLocalStorage("notes");

  const notesArr = notes.filter((note) => note.id !== id);

  localStorage.removeItem("notes");
  if (notesArr.length > 0) {
    setLocalStorage(notesArr, "notes");
  }

  showNotes();
};

const selectNote = function (id) {
  setLocalStorage(id, "selectedNote");
  location.assign("add.html");
};

const init = function () {
  showNotes();
  showTags();
  showCategory();
};

document.addEventListener("DOMContentLoaded", init);
