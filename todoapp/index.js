import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-c712b-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const notesInDB = ref(database, "notes")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const notesListEl = document.getElementById("notes-list")

addButtonEl.addEventListener("click", () => {
    let inputValue = inputFieldEl.value

    push(notesInDB, inputValue)
    renderNotes(inputValue)
    clearInputFieldEl()

})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function renderNotes(itemValue) {
    notesListEl.innerHTML += `<li>${itemValue}</li>`
}

// https://www.youtube.com/watch?v=UFD4SP91tSM 44:46
// don't forget to run http-server in the terminal