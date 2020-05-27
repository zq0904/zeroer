import {
  Todo,
  TodoAction,
  SET_TODO_LIST,
} from '../../types'

const initialTodos: Todo = {
  list: []
}

export default (state = initialTodos, action: TodoAction) => {
  switch (action.type) {
    case SET_TODO_LIST:
      return {
        ...state,
        list: [...action.payload],
      }
    default:
      return state
  }
}
