<template>
    <div class="todolist">
        <h2 id="todo-title">TODOS</h2>
        <a-row>
            <a-col :xs="{ span: 14, offset: 5 }" :lg="{ span: 14, offset: 5 }">
                <a-card :bordered="false">
                    <a-input-search id="todoInput" placeholder="What needs to be done?" size="large" 
                        v-model="newTodo" 
                        @keyup.enter="addTodo(newTodo)" 
                        @search="addTodo(newTodo)">
                        <a-button icon="plus" type="primary"  slot="enterButton" 
                            @search="addTodo(newTodo)"></a-button>
                    </a-input-search>
                </a-card>
            </a-col>

            <a-col :xs="{ span: 14, offset: 5 }" :lg="{ span: 14, offset: 5 }"
                v-if="todoList.length > 0">
                <a-card :bordered="false">
                    <a-list bordered>
                        <a-list-item :class="{
                                'todo-item': true, 
                                'todo-item-done': item.isDone
                            }"  
                            v-for="(item, index) of filterTodo(filterType)" :key="index">
                            <a-checkbox :checked="item.isDone" 
                                @change="toggleTodo(item)"></a-checkbox>
                            <label class="todo-item-content" 
                                v-if="!item.isEdit" 
                                @click="toggleEdit(item)">
                                {{ item.content }}
                            </label>
                            <a-input class="todo-item-edit" type="text" allowClear 
                                v-if="item.isEdit" 
                                v-model="item.content"
                                @keyup.enter="updateTodo(item, $event.target.value)" :value="item.content">
                            </a-input>
                            <a-icon class="todo-item-close" type="close" 
                                @click.stop="removeTodo(item)" />
                        </a-list-item>
                        <div slot="header">
                            <a-row class="todo-header">
                                <a-col id="todo-header-progress" :xs="{ span: 12 }" :lg="{ span: 12 }">
                                    <a-progress type="circle" :width="30" :percent="donePercentage"  :showInfo="true" :format="() => ``"
                                        v-if="filterType === 'ALL'"  />
                                    <span id="todo-header-remain">
                                        {{ currRemaining() }}
                                    </span>
                                </a-col>
                                <a-col id='todo-header-tabs' :xs="{ span: 12 }" :lg="{ span: 12 }">
                                    <a-radio-group buttonStyle="solid" default-value="ALL" 
                                        v-model="filterType">
                                        <a-radio-button value="ALL">ALL</a-radio-button>
                                        <a-radio-button value="ACTIVE">ACTIVE</a-radio-button>
                                        <a-radio-button value="DONE">DONE</a-radio-button>
                                    </a-radio-group>
                                </a-col>
                            </a-row>
                        </div>
                    </a-list>
                </a-card>
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
    private donePercentage: number;

    constructor() {
        super();
        this.newTodo = '';
        this.todoList = this.$store.state.todoList;
        this.filterType = this.$store.getters.getFilterType;
        this.donePercentage = 0;
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
            let remain: number = 0;
            let remainStatus: string = '';
            if (this.filterType === 'ACTIVE') {
                remain = this.$store.state.todoList.filter((item: TodoItem) => !item.getIsDone).length;
                remainStatus = 'active';
            } else {
                remain = this.$store.state.todoList.filter((item: TodoItem) => item.getIsDone).length;
                remainStatus = 'done';
            }

            if (remain > 1) {
                return `${remain} items are ` + remainStatus;
            } else {
                return `${remain} item is ` + remainStatus;
            }
        } else {
            const activeItem = this.$store.state.todoList.filter((item: TodoItem) => item.getIsDone).length;
            const totalItem = this.$store.state.todoList.length;
            this.donePercentage = (activeItem / totalItem) * 100;
            return `${activeItem}/${totalItem}`;
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
@import 'src/scss/default.scss';
import firebaseConfig from '../firebaseConfig';

#todo-title {
    color: $primary-color;
    font-size: 60px; 
    font-weight: bold; 
    margin-bottom: 0;
}

.todo-header {
    #todo-header-progress {
        text-align: left;
        vertical-align: middle;

        #todo-header-remain {
            font-size: 20px;
            height: 28px; 
            margin-left: 5px; 
            vertical-align: middle;
        }
    }

    #todo-header-tabs {
        text-align: right;
    }
}

.todo-item {
    &.todo-item-done {
        text-decoration: line-through;
    }

    .todo-item-content {
        text-align:left; 
        width: 87%;
    }

    .todo-item-edit {
        width: 87%;
    }

    .todo-item-close {
        color: $close-color;
    }
}

.ant-input-group-wrapper, .ant-list {
    border-radius: 4px;
    @include card-transition;
    @include card-box-shadow;
}
</style>
