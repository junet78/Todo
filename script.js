document.addEventListener('DOMContentLoaded', (event) => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.text}</span>
                <button onclick="deleteTask(${index})">Delete</button>
                <button onclick="toggleComplete(${index})">${task.completed ? 'Uncomplete' : 'Complete'}</button>
                <button onclick="editTask(${index})">Edit</button>
            `;
            taskList.appendChild(li);
        });
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    window.toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    window.editTask = (index) => {
        const newTaskText = prompt('Edit task:', tasks[index].text);
        if (newTaskText) {
            tasks[index].text = newTaskText;
            saveTasks();
            renderTasks();
        }
    };

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    });

    renderTasks();
});
