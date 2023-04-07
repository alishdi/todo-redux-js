import { addTodo, doTodo, removeTodo, getAllTodos } from "./actions.js"
function getAllTodosAction(value) {
    return {
        type: getAllTodos,
        
    }
}
function addToDoAction(value) {
    return {
        type: addTodo,
        title: value
    }
}
function removeTodoAction(id) {
    return {
        type: removeTodo,
        id
    }
}
function doTodoAction(id) {
    return {
        type: doTodo,
        id
    }
}

export {
    addToDoAction,
    removeTodoAction,
    doTodoAction,
    getAllTodosAction

}