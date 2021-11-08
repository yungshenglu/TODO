import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'
import TodoItem from '@/models/TodoItem'

Vue.use(Vuex)

const STORAGE_KEY = 'Vue-TodoList'
export default new Vuex.Store({
  state: {
    todoList: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]') as TodoItem[],
    filterType: 'ALL'
  },
  mutations,
  actions,
  getters,
  plugins: [
    store => {
      store.subscribe((mutation, state) => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todoList))
      })
    }
  ],
  strict: true
})
