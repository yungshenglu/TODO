<template>
    <div class="todolist">
        <h2>Simple TodoList</h2>
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="New TODO" aria-label="New TODO" aria-describedby="button-addon2" v-model="newTodo">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="addTodo" @keyup.enter="addTodo">
                    Add
                </button>
            </div>
        </div>
        <ul class="list-group">
            <li :class="{
                    'list-group-item': true, 
                    'list-group-item-secondary': item.completed
                }" 
                v-for="(item, index) in todoList" :key="index" 
                @click="item.toggleChecked()">
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

/**
 * For record each todo in the todoList
 */
class TodoItem {
    private content: string;
    private completed: boolean;
    private createDate: object;
    private completedDate: object;

    constructor(content: string) {
        this.content = content;
        this.completed = false;
        this.createDate = new Date();
        this.completedDate = {};
    }

    public toggleChecked() {
        this.completed = !this.completed;
        this.completedDate = (this.completed) ? new Date() : {};
    }
}

@Component
export default class TodoList extends Vue {
    private newTodo: string = '';
    private todoList: TodoItem[] = [];

    public addTodo() {
        // Create a item for each newTodo and push into todoList
        const todoItem = new TodoItem(this.newTodo);
        this.todoList.push(todoItem);
        // Clear the input
        this.clearInput();
    }

    public removeTodo() {
        
    }

    public clearInput() {
        this.newTodo = '';
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
