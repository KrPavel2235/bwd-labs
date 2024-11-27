// Элементы
const addTaskButton = document.getElementById('addTaskButton');
const taskModal = document.getElementById('taskModal');
const closeModalButton = document.querySelector('.close');
const cancelButton = document.getElementById('cancelButton');
const taskForm = document.getElementById('taskForm');

// Открытие модального окна
addTaskButton.addEventListener('click', () => {
    taskModal.style.display = 'block';
});

// Закрытие модального окна (по кнопке "×")
closeModalButton.addEventListener('click', () => {
    taskModal.style.display = 'none';
});

// Закрытие модального окна (по кнопке "Отмена")
cancelButton.addEventListener('click', () => {
    taskModal.style.display = 'none';
});

// Закрытие модального окна при клике вне контента
window.addEventListener('click', (event) => {
    if (event.target === taskModal) {
        taskModal.style.display = 'none';
    }
});

// Обработка формы
taskForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Останавливаем отправку формы

    // Получение данных
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;

    // Здесь добавьте логику для добавления задачи (например, добавление в список)
    console.log(`Название: ${title}, Описание: ${description}`);

    // Закрытие модального окна
    taskModal.style.display = 'none';

    // Очистка формы
    taskForm.reset();
});


function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDescription = document.getElementById('taskDescription');
    const taskText = taskInput.value;
    const descriptionText = taskDescription.value;

    if (taskText === '') {
        alert('Введите название задачи');
        return;
    }

    const taskBox = createTaskBox(taskText, descriptionText);
    document.getElementById('tasks').appendChild(taskBox);
    taskInput.value = '';  // Очистить поле ввода
    taskDescription.value = '';  // Очистить поле описания
    taskModal.style.display = 'none'
}

function createTaskBox(title, description) {
    const taskBox = document.createElement('div');
    taskBox.className = 'task-box';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onclick = function () {
        moveTask(this, 'tasks');
    };

    const taskName = document.createElement('span');
    taskName.innerText = title;

    const taskDescription = document.createElement('p');  // Новый элемент для описания
    taskDescription.innerText = description;
    taskDescription.style.marginTop = '5px';  // Отступ сверху для описания

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Удалить';
    deleteButton.onclick = function () {
        taskBox.remove();
    };

    taskBox.appendChild(checkbox);
    taskBox.appendChild(taskName);
    taskBox.appendChild(taskDescription);  // Добавляем описание в задачу
    taskBox.appendChild(deleteButton);

    // Рандомизация угла наклона и фона (как и ранее)
    const randomRotate = Math.floor(Math.random() * 10 - 5) + 'deg';
    const randomColor = getRandomColor();
    taskBox.style.setProperty('--random-rotate', randomRotate);
    taskBox.style.setProperty('--random-color', randomColor);

    return taskBox;
}

function getRandomColor() {
    const colors = ['#fffae3', '#fff0e3', '#e3fff5', '#e3f4ff', '#f5e3ff'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function moveTask(checkbox, currentColumn) {
    const taskBox = checkbox.parentElement;

    if (currentColumn === 'tasks') {
        document.getElementById('inProgress').appendChild(taskBox);
        checkbox.checked = false;
        checkbox.onclick = function () {
            moveTask(this, 'inProgress');
        };
    } else if (currentColumn === 'inProgress') {
        document.getElementById('done').appendChild(taskBox);
        checkbox.checked = false;
        checkbox.disabled = true;
    }
}

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

const currentPath = window.location.pathname;

const navLinks = document.querySelectorAll('.nav-links li a');

navLinks.forEach(link =>{
    const linkPath = new URL(link.herf).pathname
    if (linkPath === currentPath){
        link.classList.add('active');
        link.setAttribute('aria-disabled','true');
    }
});

const navLinksBurger = document.querySelectorAll('.sidebar ul li a');

navLinksBurger.forEach(link =>{
    const linkPath = new URL(link.herf).pathname
    if (linkPath === currentPath){
        link.classList.add('active');
        link.setAttribute('aria-disabled','true');
    }
});




