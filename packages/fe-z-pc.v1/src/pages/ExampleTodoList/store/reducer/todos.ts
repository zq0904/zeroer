import {
  Todo,
  TodoAction,
  SET_TODO_LIST,
  SET_TODO_LOADING,
} from '../../types'

const initialTodos: Todo = {
  list: [],
  loading: false,
}

export default (state = initialTodos, action: TodoAction): Todo => {
  switch (action.type) {
    case SET_TODO_LIST:
      return {
        ...state,
        list: [...action.payload],
      }
    case SET_TODO_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}
