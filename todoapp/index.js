import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-c712b-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const notesInDB = ref(database, "notes")

const inputFieldEl = document.getElementById("input-field")
const nameFieldEl = document.getElementById("name-field")
const addButtonEl = document.getElementById("add-button")
const notesListEl = document.getElementById("notes-list")

onValue(notesInDB, (snapshot) => {
    const data = snapshot.val();
    notesListEl.innerHTML = "";
    for (let id in data) {
        renderNotes(data[id], id);
    }
});


addButtonEl.addEventListener("click", () => {
    let nameValue = nameFieldEl.value;
    let inputValue = inputFieldEl.value;

    if (inputValue.trim() === "" || nameValue.trim() === "") {
        alert("Please enter a name and a note.");
    } else {
        let note = {
            name: nameValue,
            note: inputValue,
            timestamp: Date.now()
        };

        push(notesInDB, note);
        clearInputFieldEl();
        clearNameFieldEl();  
    }
});

function clearNotesListEl() {
    notesListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function clearNameFieldEl() {
    nameFieldEl.value = ""
}

function renderNotes(note, id) {
    const noteEl = document.createElement("li");

    let date = new Date(note.timestamp);
    let dateString = date.toLocaleDateString();

    
    noteEl.innerHTML = `${note.note}hahaha <span id="span-name"><code>&#8212;</code>${note.name}</span><span id="span-date">,  ${dateString}</span>`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", () => {
        noteEl.remove();

        const noteRef = ref(database, 'notes/' + id);
        remove(noteRef);
    });

    noteEl.appendChild(deleteButton);
    notesListEl.appendChild(noteEl);
}

