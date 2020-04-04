<template>
    <div class="todolist">
        <h2>Simple TodoList</h2>
        <a-row>
            <a-col :xs="{ span: 20, offset: 2 }" 
                :lg="{ span: 16, offset: 4 }">
                <a-list bordered>
                    <a-list-item :class="{
                            'list-group-item': true, 
                            'list-group-item-secondary': item.isCompleted
                        }"  
                        v-for="(item, index) of todoList" :key="index">
                        <a-checkbox @change="toggleTodo(item)"></a-checkbox>
                        
                        <label v-if="!item.isEdit" @click="toggleEdit(item)">
                            {{ item.content }}
                        </label>
                        <input type="text" v-if="item.isEdit"
                            @keyup.enter="updateTodo(item, $event.target.value)"
                            :value="item.content" />
                        <a-icon type="close" @click.stop="removeTodo(item)" />
                    </a-list-item>
                </a-list>
            </a-col>

            <a-col :xs="{ span: 20, offset: 2 }" 
                :lg="{ span: 14, offset: 4 }">
                <a-input-search placeholder="Add a Task" size="large" v-model="newTodo" @keyup.enter="addTodo(newTodo)" @search="addTodo(newTodo)">
                    <a-button icon="plus" type="primary"  slot="enterButton" @search="addTodo(newTodo)"></a-button>
                </a-input-search>
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

    constructor() {
        super();
        this.newTodo = '';
        this.todoList = this.$store.getters.getTodoList;
    }

    public addTodo(newTodo: string) {  
        this.$store.dispatch('addTodo', newTodo);
        this.newTodo = '';
    }

    public removeTodo(item: TodoItem) {
        this.$store.dispatch('removeTodo', item);
    }

    public updateTodo(item: TodoItem, newContent: string) {
        this.$store.dispatch('updateTodo', {
            token: item.getToken,
            content: newContent
        });
        this.toggleEdit(item);
    }

    public toggleEdit(item: TodoItem) {
        this.$store.dispatch('toggleEdit', item.getToken);
    }

    public toggleTodo(item: TodoItem) {
        this.$store.dispatch('toggleTodo', item.getToken);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-group-item-secondary {
    text-decoration: line-through;
}
</style>
