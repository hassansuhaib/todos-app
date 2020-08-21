import { v4 as uuidv4 } from 'uuid'

// Setup the empty todos array

let todos = []
const form = document.querySelector('#new-form')

// loadTodos
// Arguments: none
// Return value: none

const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos');
    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        return []
    }
}

// saveTodos
// Arguments: none
// Return value: none

const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// getTodos
// Arguments: none
// Return value: todos array

const getTodos = () => todos

// createTodo
// Arguments: todo text
// Return value: none

const createTodo = (text) => {
    const newTodo = {
        id: uuidv4(),
        text: text,
        completed: false
    }
    todos.push(newTodo)
    saveTodos()
}

// removeTodo
// Arguments: id of todo to remove
// Return value: none

const removeTodo = (id) => {
    const itemToRemove = todos.findIndex((todo) => todo.id === id)
    todos.splice(itemToRemove, 1)
    saveTodos()
}

// toggleTodo
// Arguments: id of todo to toggle
// Return value: none


const toggleTodo = (id) => {
    const todo = todos.find((item) => item.id === id);
    if (todo) {
        todo.completed = !todo.completed;
    }
    saveTodos()
}

// Make sure to call loadTodos and setup the exports

todos = loadTodos()

export { loadTodos, saveTodos, createTodo, removeTodo, toggleTodo, getTodos }