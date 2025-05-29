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


const deleteButton = document.getElementById("delete-btn");

deleteButton.addEventListener("click", function () {
    confirm("Are you sure you want to delete?");

})