const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const showMoadal = document.querySelector("#change");
const modelTodo = document.querySelector("main");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
    // JSON.stringify() = JS 값이나 객체를 JSON 문자열로 변환
    localStorage.setItem("todos",JSON.stringify(toDos));
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newTodo) {
    const liTag = document.createElement("li");
    liTag.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteTodo);
    liTag.appendChild(span);
    liTag.appendChild(button)
    toDoList.appendChild(liTag);
}

function handleToDoSubmit(evnet) {
    evnet.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text:newToDo,
        id: Date.now(),
    };
    // localStorage 는 array 형태는 저장 못시킨다. (Text만 가능)
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    // reflash하고 다시 localStorage에 저장시키면 전의 저장값은 없어지고 새로운 값만 들어간다. 그래서 기존에 있던 데이터를 변수에 담아줌
    toDos = parsedToDos;
    // 배열의 길이만큼 foreach(action)
    parsedToDos.forEach(paintToDo);
}
// 이거도 되네
// sayHello("11111111111111111");

/**
 * filter(); 
 * 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환.
 */

let isModal = true;
function handleModalChange(){
    if(isModal){
        modelTodo.classList.remove('hidden');
        showMoadal.innerText = 'Hide \nTodo List';
        isModal = false;
    }else{
        modelTodo.classList.add('hidden');
        showMoadal.innerText = 'Show \nTodo List';
        isModal = true;
    }
}

showMoadal.addEventListener('click', handleModalChange)