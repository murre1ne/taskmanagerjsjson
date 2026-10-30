const tasks = document.querySelector("#tasks");
const completedTasks = document.querySelector("#completedTasks");
const input = document.querySelector("#taskInput");
const form = document.querySelector("form");
const storageKey = "tasks";
const savedTasks = localStorage.getItem(storageKey);
const taskItems = savedTasks
    ? JSON.parse(savedTasks)
    : [
        { text: "HTML", completed: false },
        { text: "CSS", completed: false },
        { text: "JavaScript", completed: false },
        { text: "Completed Task 1", completed: true },
        { text: "Completed Task 2", completed: true },
    ];

function saveTasks() {
    localStorage.setItem(storageKey, JSON.stringify(taskItems));
}

function renderTasks() {
    tasks.replaceChildren();
    completedTasks.replaceChildren();

    taskItems.forEach((task, index) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        li.dataset.index = index;
        li.append(checkbox, document.createTextNode(` ${task.text}`));

        if (task.completed) {
            li.classList.add("completed");
            completedTasks.appendChild(li);
        } else {
            tasks.appendChild(li);
        }
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskText = input.value.trim();
    if (!taskText) {
        return;
    }

    taskItems.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    if (savedTasks === null) {
        saveTasks();
    }
    input.value = "";
});

function updateTask(event) {
    if (!event.target.matches('input[type="checkbox"]')) {
        return;
    }

    const li = event.target.closest("li");
    const index = Number(li.dataset.index);
    taskItems[index].completed = event.target.checked;
    saveTasks();
    renderTasks();
}

tasks.addEventListener("change", updateTask);
completedTasks.addEventListener("change", updateTask);

renderTasks();