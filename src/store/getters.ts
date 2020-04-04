
export const getters = {
    getTodoList(state: any) {
        function getCurrTodoList(isCompleted: boolean) {
            const currTodoList = [];
            for (const index in state.todoList) {
                if (state.todoList[index].isCompleted === isCompleted) {
                    currTodoList.push(state.todoList[index]);
                }
            }
            return currTodoList;
        }
        switch (state.filter) {
            case 'ALL':
                return state.todoList;
            case 'DONE':
                return getCurrTodoList(true);
            case 'TODO':
                return getCurrTodoList(false);
        }
    },
};
