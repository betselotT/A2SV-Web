document.getElementById("listingTask").addEventListener("submit", function(event) {
    event.preventDefault(); 

    var task = document.getElementById("task").value;

    addTask(task);

    document.getElementById("listingTask").reset();
});

function addTask(task) {
    var table = document.getElementById("listingTable").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    cell1.innerHTML = task;
    cell2.innerHTML = "Delete";
    cell2.addEventListener("click", function(event) {
        cell1.remove();
        cell2.remove();
    });
}
