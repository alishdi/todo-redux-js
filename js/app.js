import { addTodo, removeTodo, doTodo, getAllTodos } from "../Redux/actions.js"
import { addToDoAction, removeTodoAction, doTodoAction, getAllTodosAction } from "../Redux/actionCreators.js";

window.removeToDoHandler = removeToDoHandler
window.doTodoHandler = doTodoHandler
const inputElem = document.querySelector('.todo-input');
const addToDoBtn = document.querySelector('.todo-button')
const todosContainer = document.querySelector('.todo-list')
const filteTodo = document.querySelector('.filter-todo')
// Create Todolist Reducer
function todolistReducer(state = [], action) {
    console.log('action', action);
    switch (action.type) {
        case getAllTodos: {
            return state
        }
        case addTodo: {
            let newState = [...state]
            let newTodObj = {
                id: crypto.randomUUID(),
                title: action.title,
                isCompleted: false

            }
            newState.push(newTodObj)
            return newState
        }
        case removeTodo: {
            let newState = [...state]
            let finalState = newState.filter(todo => todo.id !== action.id)

            return finalState
        }
        case doTodo: {
            let newState = [...state];
            newState.some(todo => {
                if (todo.id === action.id) {
                    todo.isCompleted = !todo.isCompleted
                }
            })
            return newState
        }

        default: {
            return state
        }
    }
}

// Create Store
const store = Redux.createStore(todolistReducer)
filteTodo.addEventListener('change', event => {
    store.dispatch(getAllTodosAction())
    let todos = store.getState()


    if (event.target.value === 'all') {
        generateTodoInDom(todos)
    } else if (event.target.value === 'completed') {
        let completeTodos = todos.filter(todo => todo.isCompleted)
        generateTodoInDom(completeTodos)
    } else if (event.target.value === 'incomplete') {
        let incompleteTodos = todos.filter(todo => !todo.isCompleted)
        generateTodoInDom(incompleteTodos)
    }

   
})


addToDoBtn.addEventListener('click', event => {
    event.preventDefault()
    const inputVAlue = inputElem.value.trim();
    if (inputVAlue !== '') {

        store.dispatch(addToDoAction(inputVAlue))
    }
    const todos = store.getState()
    inputElem.value = ''
    console.log('todos', todos);
    generateTodoInDom(todos)
})


function generateTodoInDom(todos) {
    todosContainer.innerHTML = ''
    todos.forEach(todo => {
        let template = `
        <div class="todo ${todo.isCompleted && 'completed'}">
        <li class="todo-item">${todo.title}</li>
        <button class="complete-btn" onclick='doTodoHandler("${todo.id}")'><i class="fas fa-check-circle"></i></button>
        <button class="trash-btn" onclick='removeToDoHandler("${todo.id}")'><i class="fas fa-trash"></i></button>
      </div>`;
        todosContainer.innerHTML += template

    })

}

function removeToDoHandler(id) {

    store.dispatch(removeTodoAction(id));
    const todos = store.getState();
    console.log(todos);
    generateTodoInDom(todos)

}

function doTodoHandler(id) {
    console.log(id);
    store.dispatch(doTodoAction(id))
    const todos = store.getState()
    generateTodoInDom(todos)
}