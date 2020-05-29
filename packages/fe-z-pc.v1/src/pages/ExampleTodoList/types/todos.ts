export type TodoListItem = { id: number; text: string; complete: boolean }

export type TodoList = TodoListItem[]

export type Loading = boolean

export type Todo = {
  list: TodoList;
  loading: Loading;
}

// actionType

export const SET_TODO_LIST = 'SET_TODO_LIST' // 设置 Todos模块下 list字段
export const SET_TODO_LOADING = 'SET_TODO_LOADING' // 设置 Todos模块下 loading字段

// action

export interface SetTodoListAction {
  type: typeof SET_TODO_LIST;
  payload: TodoList;
}

export interface SetTodoLoadingAction {
  type: typeof SET_TODO_LOADING;
  payload: Loading;
}

export type TodoAction = SetTodoListAction | SetTodoLoadingAction // 可以多个联合类型
