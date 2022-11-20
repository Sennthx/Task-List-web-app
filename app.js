// Selecting items to use
const taskInput = document.querySelector('#task');
const addBtn = document.querySelector("#add-task");
const ul = document.querySelector(".collection");
const clearTaskBtn = document.querySelector("#clear-tasks");
const filterInput = document.querySelector("#filter");
const filterError = document.querySelector("#error-msg");

// Onload
loadTasks();

// Adding action listeners to items
addBtn.addEventListener("click", addTask);
clearTaskBtn.addEventListener("click", clearTask);
ul.addEventListener("click", clearItem);
filterInput.addEventListener("input", filtering);

// Adding function to Add Task button
function addTask(e){
    // Checking if the task input has any value
    if(taskInput.value === ""){
        alert("Please add a task first!");
    }
    else{
        const textNode = taskInput.value;
        let tasks; 
        // Checking if the key data pair "tasks" is initialized
        if(localStorage.getItem("tasks") === null){
            tasks = [];
        }
        else{
            // Things stored in the local storage are stored as a string
            // Getting the data from the local storage and parsing it from a string into an array
            tasks = JSON.parse(localStorage.getItem("tasks"));
        }
        // Adding new tasks to the tasks array and update the local storage
        tasks.push(textNode);
        // Parsing data into a string using JSON.stringify
        localStorage.setItem("tasks", JSON.stringify(tasks));
        // Insert a li into ul
        const li = document.createElement("li");
        // Giving a class name to the li
        li.className = "collection-item";
        // Inserting a textnode and a link with an icon into li
        li.innerHTML = `
                        ${textNode}
                        <a href="#" class="delete-item secondary-content">
                        <i class="material-icons orange-text">clear</i>
                        </a>`;
        // Appending the created li into the ul
        ul.appendChild(li);
        }
        e.preventDefault();
}

function clearTask(e){
    // Getting the the data from local storage as and parsing it into an array
    const givenTaskList = JSON.parse(localStorage.getItem("tasks"));
    // Splicing all the elements from the array
    givenTaskList.splice(0,givenTaskList.length);
    // Updateing the local storage tasks key value pair with an empy array
    localStorage.setItem("tasks", JSON.stringify(givenTaskList));
    // Deleting all of the li items from the ul
    ul.innerHTML = "";
    e.preventDefault();
}

function clearItem(e){
    // Finding the to be deleted li element by getting the icons parents parent element and then delete said li
    if(e.target.parentElement.classList.contains("delete-item")){
        const givenTarget = e.target.parentElement.parentElement.childNodes[0];
        // Getting the current key value pair of local storage
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        // Finding the index of the same element from the array as the text content of the item to be deleted, after that delete said element; 
        tasks.splice(tasks.indexOf(givenTarget.textContent),1);
        // Updateing the local storage key value pair
        localStorage.setItem("tasks", JSON.stringify(tasks));
        // Removing the deleted item from the ul
        e.target.parentElement.parentElement.remove();
    }
    e.preventDefault();
}

//Global variable for filtering

function filtering(e){  
    // Getting the text of the filter input
    let filterText = filterInput.value;
    // Getting all of the list items from the ul
    const listElements = ul.children;
    // Cheching all of the li's text content and then substring as much as the length of the filter text and if it is not the same as the filter text it's getting hidden else shown
    for(let i = 0; i < ul.children.length; i++){
        if(ul.children[i].textContent.trim().substring(0, filterText.length) !== filterText){
            ul.children[i].style.display = "none";
        }
        else{
            ul.children[i].style.display = "block";
        }
    }
}

function loadTasks(){
    // After refresh checking the content of the local storage key value pair, if there is no data, nothing is loaded else all elements are inserted
    if(localStorage.getItem("tasks") !== null){
        const tasksToLoad = JSON.parse(localStorage.getItem("tasks"));
        for (let i = 0; i < tasksToLoad.length; i++) {
            let givenTask = tasksToLoad[i];
            const li = document.createElement("li");
            li.className = "collection-item";
            li.innerHTML = `${givenTask}<a href="#" class="delete-item secondary-content">
            <i class="material-icons orange-text">clear</i>
                                        </a>`;
        ul.appendChild(li);
        }
    }
}