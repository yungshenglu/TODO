<template>
    <div class="todolist">
        <h2>Simple TodoList</h2>
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Add a Task" aria-label="Add a Task" aria-describedby="button-addon2" v-model="newTodo" @keyup.enter="addTodo(newTodo)">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="addTodo(newTodo)">+</button>
            </div>
        </div>
        <ul class="list-group">
            <li :class="{
                    'list-group-item': true, 
                    'list-group-item-secondary': item.completed
                }" 
                v-for="(item, index) of currTodoList" :key="index" 
                @click="this.$store.dispatch('toggleChecked', item)">
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
import store from "@/store/index";
import TodoItem from '@/models/TodoItem';

@Component({
    components: {}
})
export default class TodoList extends Vue {
    private newTodo: string;
    private todoList: TodoItem[];
    private logs: string;

    constructor() {
        super();
        this.newTodo = '';
        this.todoList = [];
        this.logs = '';
    }

    get currTodoList(): TodoList[] {
        // Update to current TodoList
        this.updateTodoList();
        return this.$store.state.todoList;
    }

    public updateTodoList() {
        this.todoList = this.$store.state.todoList;
    }

    public addTodo(newTodo: string) {        
        // Dispatch action to addTodo
        this.$store.dispatch('addTodo', newTodo);
        // Clear the input
        this.clearInput();
    }

    public removeTodo(item: TodoItem) {
        // Dispatch action to removeTodo
        this.$store.dispatch('removeTodo', item);
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
