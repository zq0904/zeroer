import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import RootReducer from './reducer'

const store = createStore(
  RootReducer,
  applyMiddleware(
    thunkMiddleware
  )
)

export type Dispatch = typeof store.dispatch

export type State = ReturnType<typeof RootReducer>

export default store
