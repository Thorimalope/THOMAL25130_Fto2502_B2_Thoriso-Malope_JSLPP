
// Functions to add task to the board upon field population and to close and refresh the modal upon save


 export function addTaskToBoard(task) {
  const column = document.getElementById(`${task.status}-column`);

  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", task.id);
  card.innerHTML = `
    <p>${task.title}</p>
  `;

  column.appendChild(card);

}

export function closeAndResetModal() {

  const addTaskModal = document.querySelector(".newTask-modal-wrapper");
  addTaskModal.style.display = "none";
  document.getElementById("new-title-input").value = "";
  document.getElementById("new-description-input").value = "";
  document.getElementById("new-select").value = "todo";
}