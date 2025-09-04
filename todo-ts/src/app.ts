interface Task {
  id: number;
  name: string;
  dueDate: string;
  completed: boolean;
}

class TodoApp {
  private tasks: Task[] = [];
  private taskListEl: HTMLElement;
  private taskNameInput: HTMLInputElement;
  private taskDateInput: HTMLInputElement;
  private addTaskBtn: HTMLButtonElement;

  constructor() {
    this.taskListEl = document.getElementById("taskList")!;
    this.taskNameInput = document.getElementById("taskName") as HTMLInputElement;
    this.taskDateInput = document.getElementById("taskDate") as HTMLInputElement;
    this.addTaskBtn = document.getElementById("addTaskBtn") as HTMLButtonElement;

    this.loadTasks();
    this.render();

    this.addTaskBtn.addEventListener("click", () => this.addTask());
  }

  private loadTasks(): void {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  private saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  private addTask(): void {
    const name = this.taskNameInput.value.trim();
    const dueDate = this.taskDateInput.value;

    if (!name || !dueDate) return alert("Please enter task name and due date");

    const newTask: Task = {
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

  private toggleTask(id: number): void {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.saveTasks();
    this.render();
  }

  private deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
    this.render();
  }

  private render(): void {
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
      if (task.completed) text.classList.add("completed");
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