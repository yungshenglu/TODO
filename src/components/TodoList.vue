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

            <a-col v-if="todoList.length > 0" :xs="{ span: 20, offset: 2 }" :lg="{ span: 16, offset: 4 }">
                <a-list bordered>
                    <a-list-item :class="{
                            'list-group-item': true, 
                            'list-group-item-secondary': item.isDone
                        }"  
                        v-for="(item, index) of filterTodo(filterType)" :key="index">
                        <a-checkbox :checked="item.isDone" @change="toggleTodo(item)"></a-checkbox>
                        <label style="text-align:left; width: 87%;" v-if="!item.isEdit" @click="toggleEdit(item)">
                            {{ item.content }}
                        </label>
                        <a-input type="text" style="width: 87%;" allowClear v-if="item.isEdit"
                        v-model="item.content"
                            @keyup.enter="updateTodo(item, $event.target.value)"
                            :value="item.content">
                        </a-input>
                        <a-icon type="close" style="color: red" @click.stop="removeTodo(item)" />
                    </a-list-item>
                    <div slot="header">
                        <a-row>
                            <a-col style="text-align: left;" :xs="{ span: 5 }" :lg="{ span: 5 }">
                                <span style="font-size: 18px;">
                                    {{ currRemaining() }}
                                </span>
                            </a-col>
                            <a-col style="text-align: right;" :xs="{ span: 7, offset: 12 }" :lg="{ span: 7, offset: 12 }">
                                <a-radio-group default-value="ALL" v-model="filterType">
                                    <a-radio-button value="ALL">ALL</a-radio-button>
                                    <a-radio-button value="ACTIVE">ACTIVE</a-radio-button>
                                    <a-radio-button value="DONE">DONE</a-radio-button>
                                </a-radio-group>
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
        this.todoList = this.$store.state.todoList;
        this.filterType = this.$store.getters.getFilterType;
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
        if (this.filterType !== 'ALL') {
            let remain = this.$store.state.todoList.filter((item: TodoItem) => (this.filterType === 'ACTIVE') ? !item.getIsDone : item.getIsDone).length;
            let remainStatus = (this.filterType === 'ACTIVE') ? 'active' : 'done';
            if (remain > 1) {
                return `${remain} items are ` + remainStatus;
            } else {
                return `${remain} item is ` + remainStatus;
            }
        } else {
            let activeItem = this.$store.state.todoList.filter((item: TodoItem) => item.getIsDone).length;
            let totalItem = this.$store.state.todoList.length;
            return `${activeItem}/${totalItem}`
        }
    }

    public filterTodo(filterType: string) {
        this.filterType = filterType;
        this.$store.dispatch('filterTodo', this.filterType);
        return this.$store.getters.getTodoList;
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
