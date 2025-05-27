
// Functions to save and load the task from local storage

import { addTaskToBoard } from "./addToDom.js";

export function saveToLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadTaskFromLocalStorage() {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    const tasks = JSON.parse(saved);
    tasks.forEach(task =>addTaskToBoard(task)); 
  }
}