const reducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO': {
            let newTodo = {
                id: crypto.randomUUID(),
                title: action.title
            };

            return [...state, newTodo]

        }
        case 'REMOVE_TODO': {
            let newState = [...state].filter(todo => todo.id !== action.id)
            return newState

        }



        default:
            return state

    }
}


const createStore = (reducer) => {

    let state;

    function dispatch(action) {
        state = reducer(state, action)
    }

    function getState() {
        return state
    }


    return {
        dispatch,
        getState
    }
}

let store = createStore(reducer)

console.log(store.getState());

