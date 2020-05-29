
import {
  TodoList,
  TodoAction,
  SET_TODO_LIST,
  Loading,
  SET_TODO_LOADING,
} from '../types'
import { ThunkAction } from 'redux-thunk'
import { State } from '../store'
import { getTodoList } from '../service'

// 注意这里直接使用 ts类型推理 推出更为详细的action
export const createTodoListAction = (payload: TodoList): TodoAction => ({
  type: SET_TODO_LIST,
  payload
})

export const thunkCreateTodoListAction = (): ThunkAction<void, State, unknown, TodoAction> => async (dispaatch, getState, extraArgument) => {
  const { flag, msg, data } = await getTodoList()
  if (flag !== 1) return alert(msg)
  dispaatch(createTodoListAction(data.list))
}

export const createTodoLoadingAction = (payload: Loading): TodoAction => ({
  type: SET_TODO_LOADING,
  payload
})
