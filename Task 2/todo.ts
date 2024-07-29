interface TodoItem {
  task: string;
}

document
  .getElementById("listingTask")!
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const taskInput = document.getElementById("task") as HTMLInputElement;
    const task: string = taskInput.value;

    createTask(task);

    (document.getElementById("listingTask") as HTMLFormElement).reset();
  });

function createTask(task: string): void {
  const table = document
    .getElementById("listingTable")!
    .getElementsByTagName("tbody")[0];
  const newRow = table.insertRow();
  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);

  cell1.innerHTML = task;
  cell2.innerHTML = "Delete";
  cell3.innerHTML = "Edit";

  cell2.addEventListener("click", function (event) {
    newRow.remove();
  });

  cell3.addEventListener("click", function (event) {
    const newTask = prompt("What is your edited task?") as string;
    if (newTask !== null) {
      cell1.innerHTML = newTask;
    }
  });
}
