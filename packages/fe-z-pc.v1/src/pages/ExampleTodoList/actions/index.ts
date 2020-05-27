
import { TodoList, TodoAction, SET_TODO_LIST } from '../types'

// 注意这里直接使用 ts类型推理 推出更为详细的action
export const createTodoListAction = (payload: TodoList): TodoAction => ({
  type: SET_TODO_LIST,
  payload
})
