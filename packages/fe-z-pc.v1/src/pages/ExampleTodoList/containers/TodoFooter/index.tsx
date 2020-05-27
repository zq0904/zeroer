import { connect, ConnectedProps } from 'react-redux'
import { State } from '../../store'
import { createTodoListAction } from '../../actions'
import { TodoList } from '../../types'
import TodoFooter, { OwnProps } from '../../module/TodoFooter'

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
  // 只有这个对象的key对应的值发生变化才会 render对应的组件
  // 而 mobx observe 自动查找依赖项 差距...有点大
  // ownProps 默认会透传
  list: state.todos.list,
  // filterType: ownProps.filterType,
})

const mapDispatchToProps = {
  setTodosList: (payload: TodoList) => createTodoListAction(payload),
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(TodoFooter)
