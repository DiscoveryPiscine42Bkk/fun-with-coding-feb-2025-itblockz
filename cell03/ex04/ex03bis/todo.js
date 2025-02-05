$(document).ready(function(){
    checkCookie();
    $("#addTodoButton").on("click", addTodo);
});

function removeTodo() {
    if (confirm(`Remove TO DO "${$(this).text()}"`)) {
        $(this).remove();
        setCookie("list", `[${getTodoList().toString()}]`, 365);
    }
}

function createTodo(todo) {
    return $("<div>").text(todo).on("click", removeTodo);
}

function addTodo() {
    const todo = prompt("Enter your TO DO");
    if (todo != null && todo != "") {
        const $child = createTodo(todo);
        $("#ft-list").prepend($child);
        setCookie("list", `[${getTodoList().toString()}]`, 365);
    }
}

function getTodoList() {
    return $("#ft-list div").map(function(){
        return $(this).text();
    }).get();
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
    if (!todoList || todoList == "[]") {
        return;
    }
    todoList = todoList.substring(1, todoList.length - 1).split(",");
    const $parent = $("#ft-list");
    todoList.forEach(todo => {
        const $child = createTodo(todo);
        $parent.append($child);
    });
}
