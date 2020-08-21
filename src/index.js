// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary

// --

// Add necessary imports

import { renderTodos } from './views'
import { createTodo, saveTodos, getTodos } from './todos'
import { getFilters, setFilters } from './filters'

// Render initial todos

const filters = getFilters()
const todos = getTodos()

console.log(todos)

renderTodos()

// Set up search text handler

const input = document.querySelector('#search')
input.addEventListener('input', (e) => {
    setFilters({
        searchResult: e.target.value
    })
    renderTodos()
})

// Set up checkbox handler

const hideCompleted = document.querySelector('#hide-completed');
hideCompleted.addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})

// Set up form submission handler

const form = document.querySelector('#new-form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.addTodo.value.trim()

    if (text.length > 0) {
        createTodo(text)
        renderTodos()
        e.target.elements.addTodo.value = ''
    }
})

// Bonus: Add a watcher for local storage

window.addEventListener('storage', (e) => {
    if (e.key === 'todos') {
        todos = JSON.parse(e.newValue)
        saveTodos()
        renderTodos()
    }
})
