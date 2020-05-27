import { connect } from 'react-redux'
import { State, Dispatch } from '../../store'
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

export type MapStateToProps = ReturnType<typeof mapStateToProps>

function mapStateToProps (state: State, ownProps: { filterType: FilterType }) {
  return {
    list: state.todos.list,
    filterTodoList: filterTodoListByFilterType(state.todos.list, ownProps.filterType)
  }
}

export type MapDispatchToProps = ReturnType<typeof mapDispatchToProps>

function mapDispatchToProps (dispatch: Dispatch) {
  return {
    setTodoList (payload: TodoList) {
      dispatch(createTodoListAction(payload))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoMain)
