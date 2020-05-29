import { connect, ConnectedProps } from 'react-redux'
import { State } from '../../store'
import { createTodoListAction } from '../../actions'
import { TodoList, FilterType } from '../../types'
import TodoFooter from '../../module/TodoFooter'

interface OwnProps {
  filterType: FilterType;
}

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
  // 只有这个对象的key对应的值发生变化才会 render对应的组件
  // 而 mobx observe 自动查找依赖项 差距...有点大
  list: state.todos.list,
})

const mapDispatchToProps = {
  setTodosList: (payload: TodoList) => createTodoListAction(payload),
}

const connector = connect(mapStateToProps, mapDispatchToProps)

// ownProps 默认会透传 类型需要处理下
export type PropsFromRedux = ConnectedProps<typeof connector> & OwnProps

export default connector(TodoFooter)
