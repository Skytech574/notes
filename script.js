var typed = new Typed(".auto-type",{
    strings : ["coding","working","studing","NOTES"],
    typeSpeed: 100,
    backSpeed:100,
    backDelay:100,
    loop:false,
    showCursor: false 

})





// Selecting Main Containers and Buttons
const folderContainer = document.querySelector(".folder-container");
const createFolderBtn = document.querySelector(".create-folder-btn");

// Load Folders from Local Storage
function loadFolders() {
    folderContainer.innerHTML = localStorage.getItem("folders") || "";
    attachEventListeners(); // Reattach event listeners after loading
}

// Save Folders to Local Storage
function updateStorage() {
    localStorage.setItem("folders", folderContainer.innerHTML);
}

// Function to Create a New Folder
createFolderBtn.addEventListener("click", () => {
    let folder = document.createElement("div");
    folder.className = "folder";

    // Folder Header (Collapsible)
    let folderHeader = document.createElement("div");
    folderHeader.className = "folder-header";
    folderHeader.textContent = "New Folder";
    folderHeader.setAttribute("contenteditable", "true"); // Allow renaming

    // Add Note Button
    let addNoteBtn = document.createElement("button");
    addNoteBtn.textContent = "Add Note";
    addNoteBtn.className = "add-note-btn";

    // Notes Container (Holds Notes)
    let notesContainer = document.createElement("div");
    notesContainer.className = "notes-container collapsed"; // Hidden by default

    // Delete Folder Button
    let deleteFolderBtn = document.createElement("img");
    deleteFolderBtn.src = "delete.png";
    deleteFolderBtn.className = "delete-folder-btn";

    // Append Elements to Folder
    folder.appendChild(folderHeader);
    folder.appendChild(addNoteBtn);
    folder.appendChild(deleteFolderBtn);
    folder.appendChild(notesContainer);

    // Add Folder to Folder Container
    folderContainer.appendChild(folder);
    updateStorage();

    // Toggle Notes Visibility on Folder Click
    folderHeader.addEventListener("click", () => {
        notesContainer.classList.toggle("collapsed");
    });

    // Add Note Inside Folder
    addNoteBtn.addEventListener("click", () => {
        addNote(notesContainer);
    });

    // Delete Folder
    deleteFolderBtn.addEventListener("click", () => {
        folder.remove();
        updateStorage();
    });
});

// Function to Add a New Note
function addNote(container) {
    let inputbox = document.createElement("p");
    inputbox.className = "inputbox";
    inputbox.setAttribute("contenteditable", "true");

    let deleteImg = document.createElement("img");
    deleteImg.src = "delete.png";
    deleteImg.className = "delete-note-btn";

    // Append Elements
    inputbox.appendChild(deleteImg);
    container.appendChild(inputbox);

    updateStorage();

    // Delete Note
    deleteImg.addEventListener("click", () => {
        inputbox.remove();
        updateStorage();
    });

    // Update Storage on Edit
    inputbox.addEventListener("input", updateStorage);
}

// Attach Event Listeners After Loading from Storage
function attachEventListeners() {
    document.querySelectorAll(".folder-header").forEach(header => {
        header.addEventListener("click", () => {
            header.parentElement.querySelector(".notes-container").classList.toggle("collapsed");
        });
    });

    document.querySelectorAll(".add-note-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const notesContainer = e.target.parentElement.querySelector(".notes-container");
            addNote(notesContainer);
        });
    });

    document.querySelectorAll(".delete-folder-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.target.parentElement.remove();
            updateStorage();
        });
    });

    document.querySelectorAll(".delete-note-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.target.parentElement.remove();
            updateStorage();
        });
    });
}

// Load Existing Data from Local Storage on Page Load
loadFolders();
