<template>
    <div class="todolist">
        <h2>Simple TodoList</h2>
        <a-row>
            <a-col :xs="{ span: 20, offset: 2 }" 
                :lg="{ span: 14, offset: 4 }">
                <a-input-search placeholder="What needs to be done?" size="large" v-model="newTodo" @keyup.enter="addTodo(newTodo)" @search="addTodo(newTodo)">
                    <a-button icon="plus" type="primary"  slot="enterButton" @search="addTodo(newTodo)"></a-button>
                </a-input-search>
            </a-col>

            <a-col :xs="{ span: 20, offset: 2 }" :lg="{ span: 16, offset: 4 }">
                <a-list bordered>
                    <a-list-item :class="{
                            'list-group-item': true, 
                            'list-group-item-secondary': item.isCompleted
                        }"  
                        v-for="(item, index) of todoList" :key="index">
                        <a-checkbox @change="toggleTodo(item)"></a-checkbox>
                        <label style="text-align:left; width: 87%;" v-if="!item.isEdit" @click="toggleEdit(item)">
                            {{ item.content }}
                        </label>
                        <a-input type="text" style="width: 87%;" allowClear v-if="item.isEdit"
                        v-model="item.content"
                            @keyup.enter="updateTodo(item, $event.target.value)"
                            :value="item.content">
                        </a-input>
                        <a-icon type="close" @click.stop="removeTodo(item)" />
                    </a-list-item>
                    <div slot="header">
                        <a-row>
                            <a-col style="text-align: left;" :xs="{ span: 4 }" :lg="{ span: 4 }">
                                <span style="font-size: 18px;">
                                    {{ currRemaining() }}
                                </span>
                            </a-col>
                            <a-col style="text-align: right;" :xs="{ span: 8, offset: 12 }" :lg="{ span: 8, offset: 12 }">
                                <a-button-group v-model="filterTodo">
                                    <a-button value="ALL">ALL</a-button>
                                    <a-button value="ACTIVE">ACTIVE</a-button>
                                    <a-button value="DONE">DONE</a-button>
                                </a-button-group>
                            </a-col>
                        </a-row>
                    </div>
                </a-list>
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import store from '@/store/index';
import TodoItem from '@/models/TodoItem';

@Component({
    components: {},
})
export default class TodoList extends Vue {
    private newTodo: string;
    private todoList: TodoItem[];
    private filterType: string;

    constructor() {
        super();
        this.newTodo = '';
        this.todoList = this.$store.getters.getTodoList;
        this.filterType = 'ALL';
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
            content: newContent,
        });
        this.toggleEdit(item);
    }

    public currRemaining(): string {
        return `${
            this.$store.state.todoList.filter((item: TodoItem) => !item.getIsDone).length
        } items left`;
    }

    public filterTodo(filterType: string) {
        this.filterType = filterType;
        this.$store.dispatch('filterTodo', this.filterType);
        this.todoList = this.$store.getters.getTodoList;
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
