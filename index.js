
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


document.addEventListener("DOMContentLoaded", () => {
  loadTaskFromLocalStorage();
});
