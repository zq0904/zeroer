export type TodoListItem = { id: number; text: string; complete: boolean }

export type TodoList = TodoListItem[]

export type Todo = {
  list: TodoList;
}

// actionType

export const SET_TODO_LIST = 'SET_TODO_LIST' // 设置 Todos模块下 list字段

// action

export interface SetTodoListAction {
  type: typeof SET_TODO_LIST;
  payload: TodoList;
}

export type TodoAction = SetTodoListAction // 可以多个联合类型
