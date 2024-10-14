const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("Enter a task");
        return;
    }

    addTaskToDOM(inputBox.value);
    inputBox.value = "";
}

function addTaskToDOM(task) {
    let li = document.createElement("li");


    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = function() {
        li.classList.toggle('checked', checkbox.checked);
    };

    li.appendChild(checkbox);
    li.innerHTML += `<strong>${task}</strong>`;

    let subtaskInput = document.createElement("input");
    subtaskInput.placeholder = "Add a subtask...";
    let addSubtaskBtn = document.createElement("button");
    addSubtaskBtn.innerText = "Subtask";

    addSubtaskBtn.onclick = function() {
        if (subtaskInput.value !== '') {
            addSubtaskToDOM(li, subtaskInput.value);
            subtaskInput.value = "";
        } else {
            alert("Add a subtask");
        }
    };

    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.onclick = function() {
        let newTask = prompt("Edit task:", task);
        if (newTask) {
            li.querySelector('strong').innerText = newTask;
        }
    };

    li.appendChild(subtaskInput);
    li.appendChild(addSubtaskBtn);
    li.appendChild(editBtn);
    
    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);
    listContainer.appendChild(li);

    span.onclick = function() {
        li.remove();
    };
}

function addSubtaskToDOM(parentLi, subtask) {
    let subtaskLi = document.createElement("li");
    subtaskLi.innerHTML = subtask;

    let editSubtaskBtn = document.createElement("button");
    editSubtaskBtn.innerText = "Edit";
    editSubtaskBtn.onclick = function() {
        let newSubtask = prompt("Edit subtask:", subtaskLi.innerText);
        if (newSubtask) {
            subtaskLi.innerText = newSubtask;
        }
    };
    
    let subtaskCheckbox = document.createElement("input");
    subtaskCheckbox.type = "checkbox";
    subtaskCheckbox.onclick = function() {
        subtaskLi.classList.toggle('checked', subtaskCheckbox.checked);
    };

    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    subtaskLi.appendChild(subtaskCheckbox);
    subtaskLi.appendChild(span);
    subtaskLi.appendChild(editSubtaskBtn);
    parentLi.appendChild(subtaskLi);
    
    parentLi.appendChild(document.createElement('br'));

    span.onclick = function() {
        subtaskLi.remove();
    };
}

listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI' && e.target.parentElement === listContainer) {
        e.target.classList.toggle('checked');
    }
}, false);
