const tasks = document.querySelector("#tasks");
const completedTasks = document.querySelector("#completedTasks");
const input = document.querySelector("#taskInput");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskText = input.value.trim();
    if (!taskText) {
        return;
    }

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    li.append(checkbox, document.createTextNode(` ${taskText}`));
    tasks.appendChild(li);

    input.value = "";
});

tasks.addEventListener("change", (event) => {
    if (event.target.matches('input[type="checkbox"]') && event.target.checked) {
        const li = event.target.closest("li");
        li.classList.add("completed");
        completedTasks.appendChild(li);
    }
});