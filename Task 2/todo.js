document
    .getElementById("listingTask")
    .addEventListener("submit", function (event) {
    event.preventDefault();
    var taskInput = document.getElementById("task");
    var task = taskInput.value;
    addTask(task);
    document.getElementById("listingTask").reset();
});
function addTask(task) {
    var table = document
        .getElementById("listingTable")
        .getElementsByTagName("tbody")[0];
    var newRow = table.insertRow();
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    cell1.innerHTML = task;
    cell2.innerHTML = "Delete";
    cell3.innerHTML = "Edit";
    cell2.addEventListener("click", function (event) {
        newRow.remove();
    });
    cell3.addEventListener("click", function (event) {
        var newTask = prompt("What is your edited task?");
        if (newTask !== null) {
            cell1.innerHTML = newTask;
        }
    });
}
