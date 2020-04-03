<template>
    <div class="todolist">
        <h2>Simple TodoList</h2>
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Add a Task" aria-label="Add a Task" aria-describedby="button-addon2" v-model="newTodo" @keyup.enter="addTodo">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="addTodo">+</button>
            </div>
        </div>
        <ul class="list-group">
            <li :class="{
                    'list-group-item': true, 
                    'list-group-item-secondary': item.completed
                }" 
                v-for="(item, index) in todoList" :key="index" 
                @click="item.toggleChecked()">
                {{ item.content }}
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click.stop="removeTodo(item)">
                    <span aria-hidden="true">&times;</span>
                </button>
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

    public removeTodo(item: TodoItem) {
        this.todoList = this.todoList.filter((removedTarget) => {
            return (removedTarget !== item);
        });
    }

    public clearInput() {
        this.newTodo = '';
    }

    // TEST
    private mounted() {
        this.todoList.push(new TodoItem('Hello World'));
        this.todoList.push(new TodoItem('Vue is fun!'));
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.list-group-item-secondary {
    text-decoration: line-through;
}

</style>
