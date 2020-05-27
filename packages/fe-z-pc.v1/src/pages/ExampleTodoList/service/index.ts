import { TODO_LIST_URI } from './uri'
import { TodoList } from '../types'

const request = (uri: string): any => new Promise(resolve => {
  setTimeout(() => {
    resolve({
      flag: 1,
      data: {
        list: [{
          text: '测试1',
          id: 91,
          complete: false,
        }, {
          text: '测试2',
          id: 92,
          complete: true,
        }, {
          text: '测试3',
          id: 94,
          complete: true,
        }]
      }
    })
  }, 1000)
})

interface GetTodoList {
  (): Promise<{ flag: 0 | 1; data: { list: TodoList } }>;
}
export const getTodoList: GetTodoList = () => request(TODO_LIST_URI)
