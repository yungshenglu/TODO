import { types } from './types'

export const actions = {
  addTodo({ commit }: any, newTodo: string) {
    commit(types.ADDTODO, newTodo)
  },
  removeTodo({ commit }: any, item: any) {
    commit(types.REMOVETODO, item)
  },
  updateTodo({ commit }: any, payload: any) {
    commit(types.UPDATETODO, payload)
  },
  filterTodo({ commit }: any, filterType: string) {
    commit(types.FILTERTODO, filterType)
  },
  toggleTodo({ commit }: any, itemToken: string) {
    commit(types.TOGGLETODO, itemToken)
  },
  toggleEdit({ commit }: any, itemToken: string) {
    commit(types.TOGGLEEDIT, itemToken)
  }
}
