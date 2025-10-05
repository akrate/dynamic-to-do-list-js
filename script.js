document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    loadTasks();

    addButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText); 
            taskInput.value = "";
        } else {
            alert("Please enter a task.");
        }
    });

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                addTask(taskText);
                taskInput.value = "";
            } else {
                alert("Please enter a task.");
            }
        }
    });

    function addTask(taskText, save = true) {
        const li = document.createElement("li");
        li.textContent = taskText;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        removeBtn.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            const tasks = getStoredTasks();
            tasks.push(taskText);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }

    function loadTasks() {
        const tasks = getStoredTasks();
        tasks.forEach(task => {
            addTask(task, false);
        });
    }

    function getStoredTasks() {
        return JSON.parse(localStorage.getItem("tasks") || "[]");
    }

    function removeTaskFromStorage(taskText) {
        let tasks = getStoredTasks();
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
