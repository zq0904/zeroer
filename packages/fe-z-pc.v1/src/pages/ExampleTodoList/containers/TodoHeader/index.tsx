import { connect, ConnectedProps } from 'react-redux'
import TodoHeader from '../../module/TodoHeader'
import { State } from '../../store'
import { createTodoListAction } from '../../actions'
import { TodoList } from '../../types'

const mapStateToProps = (state: State) => ({
  list: state.todos.list,
})

const mapDispatchToProps = {
  setTodoList: (payload: TodoList) => createTodoListAction(payload),
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(TodoHeader)
