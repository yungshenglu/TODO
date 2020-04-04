<template>
    <div class="todolist">
        <h2>Simple TodoList</h2>
        <a-row>
            <a-col :xs="{ span: 20, offset: 2 }" 
                :lg="{ span: 14, offset: 4 }">
                <a-input-search placeholder="Add a Task" size="large" v-model="newTodo" @keyup.enter="addTodo(newTodo)" @search="addTodo(newTodo)">
                    <a-button icon="plus" type="primary"  slot="enterButton" @search="addTodo(newTodo)"></a-button>
                </a-input-search>
            </a-col>
<br/>
            <a-col :xs="{ span: 20, offset: 2 }" 
                :lg="{ span: 16, offset: 4 }">
                

                <a-list bordered :dataSource="data">
                    <a-list-item :class="{
                            'list-group-item': true, 
                            'list-group-item-secondary': item.isCompleted
                        }"
                        v-for="(item, index) of currTodoList" :key="index" 
                        >
                        <a-checkbox @change="updateStatus(item)">
                            {{ item.content }}
                        </a-checkbox>
                        <a-icon type="close" @click.stop="removeTodo(item)" />
                    </a-list-item>
                </a-list>
            </a-col>
        </a-row>
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
        console.log(this.$store.state.todoList)
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

    public updateTodo(item: TodoItem, newContent: string) {
        // Dispatch action to updateTodo
        this.$store.dispatch('updateTodo', {
            token: item.getToken,
            content: newContent
        });
    }

    public clearInput() {
        this.newTodo = '';
    }

    public updateStatus(item: TodoItem) {
        this.$store.dispatch('updateStatus', item.getToken);
    }

    // TEST
    private mounted() {
        this.$store.state.todoList.push(new TodoItem('Hello World'));
        this.$store.state.todoList.push(new TodoItem('Vue is fun!'));
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.list-group-item-secondary > label {
    text-decoration: line-through;
}

</style>
