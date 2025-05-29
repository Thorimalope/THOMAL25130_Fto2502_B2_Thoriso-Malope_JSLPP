
import {
  saveToLocalStorage,
  loadTaskFromLocalStorage,
} from "./storage.js";

import {
  addTaskToBoard,
  closeAndResetModal,
} from "./addToDom.js";

// Fetched elements from DOM

const modal = document.querySelector(".modal-wrapper");
const titleInput = document.getElementById("title-input");
const descriptionInput = document.getElementById("description-input");
const selectedStatus = document.getElementById("select");

// Populating the Modal

document.addEventListener("click", function (event) {
  const card = event.target.closest(".card");
  if (!card) return;

  const taskId = card.getAttribute("data-id");
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const task = tasks.find(t => t.id === parseInt(taskId));

  if (task) {
    titleInput.value = task.title;
    descriptionInput.value = task.description;
    selectedStatus.value = task.status.toLowerCase();

    currentTaskId = task.id;

    modal.style.display = "flex";
  }
});

// Modal close button

const closeButton = document.getElementById("close-btn");

closeButton.addEventListener("click", function () {
  modal.style.display = "none";
})



// Add Task Modal Elements

const addTaskModal = document.querySelector(".newTask-modal-wrapper");


// close button for new task modal

const newCloseButton = document.getElementById("new-close-btn");

newCloseButton.addEventListener("click", function () {
    addTaskModal.style.display = "none";
})



// Create new task button

const addNewTaskButton = document.getElementById("create-task-btn");

addNewTaskButton.addEventListener("click", function () {
    addTaskModal.style.display = "flex";
    console.log("Create new task?");
})

// Functions to save the new task and add it to the board

const newTaskBtn = document.getElementById("new-task-btn");

newTaskBtn.addEventListener("click", function () {

    const newTitleInput = document.getElementById("new-title-input").value;
    const newDescriptionInput = document.getElementById("new-description-input").value;
    const newSelectedStatus = document.getElementById("new-select").value;
 

  const newTask = {
    id: Date.now(),
    title: newTitleInput,
    description: newDescriptionInput,
    status: newSelectedStatus
  };

  saveToLocalStorage(newTask);
  addTaskToBoard(newTask);
  closeAndResetModal();
});

// Fetch Data from API

const apiUrl = "https://jsl-kanban-api.vercel.app/"

async function apiData() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    if (!tasks) {
        try {
            const response = await fetch(apiUrl);
                tasks = await response.json();
            localStorage.setItem("tasks", JSON.stringify(tasks));
        } catch (err) {
            console.error("Error fetching tasks from API:", err);
            return;
        }
    }

    tasks.forEach(task => addTaskToBoard(task));
}

window.addEventListener("DOMContentLoaded", apiData);


/*document.addEventListener("DOMContentLoaded", () => {
  loadTaskFromLocalStorage();
});*/


// Saving an edit

let currentTaskId = null; 

const saveButton = document.getElementById("save-changes-btn");

saveButton.addEventListener("click", function () {
  const titleInput = document.getElementById("title-input").value;
  const descriptionInput = document.getElementById("description-input").value;
  const selectedStatus = document.getElementById("select").value;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Find the index of the task to update
  const index = tasks.findIndex(t => t.id == currentTaskId);
  if (index !== -1) {
    // Update the task
    tasks[index] = {
      id: currentTaskId,
      title: titleInput,
      description: descriptionInput,
      status: selectedStatus
    };

    // Save updated array back to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

  } else {
    console.error("Task not found for editing.");
  }

  document.querySelector(".modal-wrapper").style.display = "none";
}); 

// Delete a Task

const deleteButton = document.getElementById("delete-btn");

deleteButton.addEventListener("click", function () {
  if (confirm("Are you sure you want to delete?")) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== currentTaskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    const cardToRemove = document.querySelector(`.card[data-id="${currentTaskId}"]`);
    if (cardToRemove) {
      cardToRemove.remove();
    }

    document.querySelector(".modal-wrapper").style.display = "none";
  } else {
    deleteButton = null;
  }

})

// Toggle Theme function

const toggleButton = document.getElementById("my-toggle");
const projectBody = document.getElementById("body");

toggleButton.addEventListener("change", function () {
  if (toggleButton.checked) {
    body.classList.add("dark-theme");
  } else {
    body.classList.remove("dark-theme");
  }
})