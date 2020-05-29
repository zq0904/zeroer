import { connect, ConnectedProps } from 'react-redux'
import { State } from '../../store'
import { TodoList, FilterType } from '../../types'
import { createTodoListAction } from '../../actions'
import TodoMain from '../../module/TodoMain'

/**
 * 根据filterType 过滤todoList
 */
function filterTodoListByFilterType (list: TodoList, filterType: FilterType) {
  switch (filterType) {
    case FilterType.Complete:
      return list.filter(({ complete }) => complete)
    case FilterType.Unfinished:
      return list.filter(({ complete }) => !complete)
    case FilterType.All:
    default:
      return list
  }
}

interface OwnProps {
  filterType: FilterType;
}

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
  list: state.todos.list,
  filterTodoList: filterTodoListByFilterType(state.todos.list, ownProps.filterType)
})

const mapDispatchToProps = {
  setTodoList: (payload: TodoList) => createTodoListAction(payload)
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type PropsFromRedux = ConnectedProps<typeof connector> & OwnProps

export default connector(TodoMain)
