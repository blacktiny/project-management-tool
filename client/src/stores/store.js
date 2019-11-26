import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import sidebarReducer from './Sidebar/reducer'
import themeReducer from './Theme/reducer'
import tasksReducer from './Task/reducer'

const store = createStore(
  combineReducers({
    tasks: tasksReducer,
    sidebar: sidebarReducer,
    theme: themeReducer
  }),
  applyMiddleware(
    thunk
  )
);

export default store
