function addTodo() {
    const todo = prompt("Enter your TO DO");
    if (todo != null && todo != "") {
        const newChild = document.createElement("div");
        newChild.textContent = todo;
        newChild.addEventListener("click", () => removeTodo(newChild));

        const parent = document.getElementById("ft-list");
        parent.insertBefore(newChild, parent.firstChild);

        setCookie("list", `[${getTodoList().toString()}]`, 365);
    }
}

function removeTodo(element) {
    if (confirm(`Remove TO DO "${element.textContent}"`)) {
        element.remove();

        setCookie("list", `[${getTodoList().toString()}]`, 365);
    }
}

function getTodoList() {
    let todoList = [];
    const ftList = document.getElementById("ft-list").childNodes;

    for (let index = 0; index < ftList.length; index++) {
        const element = ftList[index];
        todoList.push(element.textContent);
    }
    
    return todoList;
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
}

function getCookie(cname) {
    const ca = document.cookie.split(";");
    
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].split("=");
        if (c.length != 2) {
            continue;
        }

        const name = c[0].trim();
        const val = c[1].trim();
        
        if (name == cname) {
            return val;
        }
    }

    return null;
}

function checkCookie() {
    let todoList = getCookie("list");
    if (todoList == null) {
        return;
    }
    todoList = todoList.substring(1, todoList.length - 1).split(",");
    
    const parent = document.getElementById("ft-list");
    for (const todo of todoList) {
        const child = document.createElement("div");
        child.textContent = todo;
        child.addEventListener("click", () => removeTodo(child));
        parent.appendChild(child);
    }
}
