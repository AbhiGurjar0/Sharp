class TodoApp {
    constructor() {
        this.tasks = [];
        this.taskListEl = document.getElementById("taskList");
        this.taskNameInput = document.getElementById("taskName");
        this.taskDateInput = document.getElementById("taskDate");
        this.addTaskBtn = document.getElementById("addTaskBtn");
        this.loadTasks();
        this.render();
        this.addTaskBtn.addEventListener("click", () => this.addTask());
    }
    loadTasks() {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            this.tasks = JSON.parse(storedTasks);
        }
    }
    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
    addTask() {
        const name = this.taskNameInput.value.trim();
        const dueDate = this.taskDateInput.value;
        if (!name || !dueDate)
            return alert("Please enter task name and due date");
        const newTask = {
            id: Date.now(),
            name,
            dueDate,
            completed: false
        };
        this.tasks.push(newTask);
        this.saveTasks();
        this.render();
        this.taskNameInput.value = "";
        this.taskDateInput.value = "";
    }
    toggleTask(id) {
        this.tasks = this.tasks.map(task => task.id === id ? Object.assign(Object.assign({}, task), { completed: !task.completed }) : task);
        this.saveTasks();
        this.render();
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.render();
    }
    render() {
        this.taskListEl.innerHTML = "";
        this.tasks.forEach(task => {
            const li = document.createElement("li");
            const label = document.createElement("label");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", () => this.toggleTask(task.id));
            label.appendChild(checkbox);
            const text = document.createElement("span");
            text.textContent = `${task.name} (Due: ${task.dueDate})`;
            if (task.completed)
                text.classList.add("completed");
            label.appendChild(text);
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => this.deleteTask(task.id));
            li.appendChild(label);
            li.appendChild(deleteBtn);
            this.taskListEl.appendChild(li);
        });
    }
}
new TodoApp();
export {};
