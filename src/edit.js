import { getTodos, saveTodos, removeTodo } from './todos'

const todoId = location.hash.substring(1)
const todos = getTodos()
console.log(todos)
let todo = todos.find((item) => item.id === todoId)

// if (!todo) {
//     location.assign('/index.html');
// }

const inputArea = document.querySelector('#task');
const doneButton = document.querySelector('#done');
const removeButton = document.querySelector('#remove');

inputArea.value = todo.text;
inputArea.addEventListener('input', (e) => {
    todo.text = e.target.value;
    saveTodos();
});

doneButton.addEventListener('click', () => {
    location.assign('/index.html');
});

removeButton.addEventListener('click', () => {
    removeTodo(todo.id);
    saveTodos();
    location.assign('/index.html');
});

window.addEventListener('storage', (e) => {
    if (e.key === 'todos') {
        todos = JSON.parse(e.newValue);
        let todo = todos.find((item) => item.id === todoId);

        if (!todo) {
            location.assign('/index.html');
        }
        inputArea.value = todo.text;
    }
})