import { getTodos, removeTodo, saveTodos, toggleTodo } from './todos'
import { getFilters } from './filters'

const myDiv = document.querySelector('#myDiv')

// renderTodos
// Arguments: none
// Return value: none

const renderTodos = () => {
    const todos = getTodos()
    const {searchResult, hideCompleted} = getFilters()
    const results = todos.filter((todo) => todo.text.toLowerCase().includes(searchResult.toLowerCase()));

    //Filters the incomplete todos
    const incompleteTodos = results.filter((todo) => !todo.completed)

    myDiv.innerHTML = ''
    generateSummaryDOM(incompleteTodos)

    if (results.length > 0) {
        if (hideCompleted) {
            incompleteTodos.forEach((todo) => {
                generateTodoDOM(todo);
            });
        } else {
            //Shows all the todos in the brower
            results.forEach((todo) => {
                generateTodoDOM(todo);
            });
        }
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No todos to show'
        myDiv.appendChild(messageEl)
    }

}

// generateTodoDOM
// Arguments: todo
// Return value: the todo element

const generateTodoDOM = (todo) => {
    // Creating the elements
    const newDiv = document.createElement('div')
    const newCheckbox = document.createElement('input')
    const newTask = document.createElement('a')
    const deleteButton = document.createElement('button')

    // Adding the stuff to elements
    // NewTask
    newTask.textContent = todo.text;
    newTask.addEventListener('click', () => {
        const address = `/edit.html#${todo.id}`
        newTask.setAttribute('href', address)
        location.assign(address)
    })

    // Checkbox
    newCheckbox.setAttribute('type', 'checkbox')
    newCheckbox.checked = todo.completed
    newCheckbox.addEventListener('change', (e) => {
        toggleTodo(todo.id)
        renderTodos()
    })

    // DeleteButton
    deleteButton.textContent = 'Remove'
    deleteButton.addEventListener('click', () => {
        removeTodo(todo.id)
        renderTodos()
    })

    // Appending everything to the div
    newDiv.appendChild(deleteButton)
    newDiv.appendChild(newCheckbox)
    newDiv.appendChild(newTask)

    newDiv.classList.add('todo')
    myDiv.appendChild(newDiv)
}

// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element

const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h3')
    const plural = incompleteTodos.length === 1 ? '' : 's'
    summary.classList.add('list-title')
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} pending.`
    myDiv.appendChild(summary)
    return summary
}

// Make sure to set up the exports

export { renderTodos, generateTodoDOM, generateSummaryDOM }