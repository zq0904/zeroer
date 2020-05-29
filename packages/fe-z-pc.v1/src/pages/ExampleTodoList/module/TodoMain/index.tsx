import React, { FC } from 'react'
import classnames from 'classnames'
import { PropsFromRedux } from '../../containers/TodoMain'
import './index.scss'

const clsPrefix = 'todo-main'

const TodoMain: FC<PropsFromRedux> = ({ list, filterTodoList, setTodoList }) => {
  if (list.length === 0) return null

  return (
    <ul className={clsPrefix}>
      {
        filterTodoList.map(({ id, text, complete }) => (
          <li key={id} className={clsPrefix + '-item'} >
            <label className={clsPrefix + '-item-complete'}>
              <input type="checkbox"
                checked={complete}
                onChange={e => {
                  setTodoList(
                    list.map(v => {
                      if (v.id === id) v.complete = e.target.checked
                      return v
                    })
                  )
                }}
              />
              <span className="checkbox"></span>
            </label>
            <span
              className={classnames(clsPrefix + '-item-text', { unfinished: complete })}
              onClick={() => {
                setTodoList(
                  list.map(v => {
                    if (v.id === id) v.complete = !complete
                    return v
                  })
                )
              }}
            >
              { text }
            </span>
            <a
              href=" "
              className={clsPrefix + '-item-del'}
              onClick={(e) => {
                e.preventDefault()
                setTodoList(list.filter((v) => v.id !== id))
              }}
            >删除这一项</a>
          </li>
        ))
      }
    </ul>
  )
}

export default TodoMain
