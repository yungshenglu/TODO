import { types } from './types';
import TodoItem from '@/models/TodoItem';

export const mutations = {
    [types.ADDTODO](state: any, newTodo: string) {
        if (newTodo !== '') {
            state.todoList.push(new TodoItem(newTodo));
        }
    },
    [types.REMOVETODO](state: any, item: TodoItem) {
        state.todoList.splice(state.todoList.indexOf(item), 1);
    },
    [types.UPDATETODO](state: any, payload: any) {
        const targetItem = state.todoList.filter((target: TodoItem) => {
            return (target.getToken === payload.token);
        })[0];
        targetItem.updateContent(payload.content);
    },
    [types.TOGGLETODO](state: any, itemToken: string) {
        const targetItem = state.todoList.filter((target: TodoItem) => {
            return (target.getToken === itemToken);
        })[0];
        targetItem.toggleIsCompleted();
        targetItem.toggleCompletedDate();
    },
    [types.TOGGLEEDIT](state: any, itemToken: string) {
        const targetItem = state.todoList.filter((target: TodoItem) => {
            return (target.getToken === itemToken);
        })[0];
        targetItem.toggleIsEdit();
    },
};
