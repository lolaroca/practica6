let tasks = [];

let test = [];
for (let i = 0; i < 20; i++) {
    test.push({
        id: i,
        todo: `This is the task #${i}`,
    });
}

const showElement = (selector) => {
    // Add the class hidden to the element
    // with the passed selector
    const element = $(selector);
    if (element.hasClass("hidden")) {
        element.removeClass("hidden");
    }
};

const hideBodies = () => {
    // Hide both the tasks and the picture
    const bodies = $("#tasks-container > .col");
    for (let body of bodies) {
        if (!$(body).hasClass("hidden")) {
            $(body).addClass("hidden");
        }
    }
};

const showNothing = () => {
    // Show the picture of no-content
    hideBodies();
    showElement("#task-none");
};

const showTasks = () => {
    // Show the tasks
    hideBodies();
    showElement("#tasks");
};

const deleteTask = async (task) => {
    // Find the index of the task
    let index = tasks.indexOf(task);
    // If it doesn't find the task (becuase it doesn't exist)
    // it will return -1
    if (index !== -1) {
        // Call server
        let request = await fetch("/tasks/" + task.id, {
            method: "DELETE",
            credentials: "same-origin",
    
        });
        if(request.status==200){
            // Remove from the array
            tasks.splice(index, 1);
            // Remove from the HTML
            $(`#task-${task.id}`).remove();
            // If there are no more tasks left, show nothing
            if (tasks.length == 0) {
                showNothing();
            }

        }
    }
};

const addTask = (task) => {
    // Save task in memory
    tasks.push(task);

    // Create HTML, inserting information
    let html = `
        <div class="row task" id="task-${task.id}">
            <div class="col-8">
                <h3>${task.todo}</h3>
            </div>
            <div class="col-4">
                <button id="button-task-${task.id}" class="btn btn-outline-danger">Eliminar</button>
            </div>
        </div>
    `;

    // Add the HTML first, so it shows at the top
    $("#tasks").prepend(html);
    // Create an event for the button we have just created
    // so when we press it, it deletes the task
    // it is associated with
    $(`#button-task-${task.id}`).on("click", () => {
        deleteTask(task);
    });


    showTasks();
};

const addTasks = (tasksToAdd) => {
    // For each task in the list, tasksToAdd
    // Add the task
    tasksToAdd.forEach((task) => addTask(task));
};

const getTasks = async () => {
    // Call server
    let request  = await fetch ("/tasks");
    if(request.status==200){
        let data = await request.json();
        addTasks(data);
    }
};

const postTask = async (todo) => {
    // Call server
    let request = await fetch("/tasks", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            id: 0,
            todo: todo,
        }),
        dataType: "json",

    });
    if(request.status==200){
        let data = await request.json();
        addTask(data);
    }
};

const start = () => {
    // For testing purposes
    getTasks();
    if(tasks.length==0){
        showNothing();
    }else{
        showTasks();
    }
    
};

const parseTask = () => {
    const value = $("#todo").val();
    if (value.trim() == "") {
        return;
    }

    // Post new task

    // For testing purposes
    const id = tasks[tasks.length - 1].id + 1;
    addTask({
        id: id,
        todo: value,
    });
};

$("#add").on("click", () => {
    // When the button #add is clicked
    // get the task and call the server
    parseTask();
});

$(document).ready(() => {
    // When the document loads,
    // get all the tasks
    start();
});