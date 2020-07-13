export const getters = {
  getTodoList(state: any) {
    function getCurrTodoList(isDone: boolean) {
      const currTodoList = []
      for (const index in state.todoList) {
        if (state.todoList[index].isDone === isDone) {
          currTodoList.push(state.todoList[index])
        }
      }
      return currTodoList
    }
    switch (state.filterType) {
      case 'ALL':
        return state.todoList
      case 'TODO':
        return getCurrTodoList(false)
      case 'DONE':
        return getCurrTodoList(true)
    }
  },
  getFilterType(state: any) {
    return state.filterType
  },
  getAllCount(state: any) {
    return Object.keys(state.todoList).length
  },
  getDoneCount(state: any) {
    return Object.keys(state.todoList).filter(value => {
      return state.todoList[value].isDone
    }).length
  },
  getActiveCount(state: any) {
    return Object.keys(state.todoList).filter(value => {
      return !state.todoList[value].isDone
    }).length
  }
}
