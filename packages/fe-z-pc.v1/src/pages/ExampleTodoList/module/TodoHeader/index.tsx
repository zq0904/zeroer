import React, { useState, FC, ChangeEvent, KeyboardEvent } from 'react'
import { PropsFromRedux } from '../../containers/TodoHeader'
import './index.scss'

const clsPrefix = 'todo-header'

const TodoHeader: FC<PropsFromRedux> = ({ list, setTodoList }) => {
  const [val, setVal] = useState('')

  /**
   * 全选change
   */
  const handleSelectAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoList(
      list.map(v => {
        v.complete = e.target.checked
        return v
      })
    )
  }

  /**
   * text文本输入框 Change
   */
  const handleInputTextChange = (e: ChangeEvent<HTMLInputElement>) => setVal(e.target.value)

  /**
   * text文本输入框 回车
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!(e.keyCode === 13)) return
    const text = val.trim()
    if (!text) return
    setTodoList([
      ...list,
      {
        id: (list.length > 0 ? list[list.length - 1].id : 0) + 1,
        text,
        complete: false,
      }
    ])
    setVal('')
  }

  return (
    <div className={clsPrefix}>
      {
        list.length > 0 && (
          <input
            className={clsPrefix + '-input-checkbox'}
            type="checkbox"
            checked={list.every(({ complete }) => complete)}
            onChange={handleSelectAllChange}
          />
        )
      }
      <input
        className={clsPrefix + '-input-text'}
        type="text"
        value={val}
        onChange={handleInputTextChange}
        onKeyDown={handleKeyDown}
      />
      <button>发起一个异步请求</button>
    </div>
  )
}

export default TodoHeader
