<template>
    <div class="todolist">
        <h2>Vue TODOS</h2>
        <a-row>
            <a-col :xs="{ span: 14, offset: 5 }" 
                :lg="{ span: 14, offset: 5 }">
                <a-card :bordered="false">
                    <a-input-search id="todoInput" placeholder="What needs to be done?" size="large" v-model="newTodo" @keyup.enter="addTodo(newTodo)" @search="addTodo(newTodo)">
                        <a-button icon="plus" type="primary"  slot="enterButton" @search="addTodo(newTodo)"></a-button>
                    </a-input-search>
                </a-card>
            </a-col>

            <a-col v-if="todoList.length > 0" :xs="{ span: 14, offset: 5 }" :lg="{ span: 14, offset: 5 }">
                <a-card :bordered="false">
                    <a-list bordered>
                        <a-list-item :class="{
                                'list-item': true, 
                                'list-item-done': item.isDone
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
                                <a-col style="text-align: left; vertical-align: middle" :xs="{ span: 12 }" :lg="{ span: 12 }">
                                    <a-progress v-if="filterType === 'ALL'" type="circle" :width="30" :percent="donePercentage"  :showInfo="true" :format="() => ``" />
                                    <span style="font-size: 20px; height: 28px; margin-left: 5px; vertical-align: middle;">
                                        {{ currRemaining() }}
                                    </span>
                                </a-col>
                                <a-col style="text-align: right;" :xs="{ span: 12 }" :lg="{ span: 12 }">
                                    <a-radio-group buttonStyle="solid" default-value="ALL" v-model="filterType">
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
            this.donePercentage = (activeItem / totalItem) * 100;
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
.list-item-done {
    text-decoration: line-through;
}

.ant-input-group-wrapper, .ant-list {
    border-radius: 4px;
    transition: box-shadow .28s cubic-bezier(.4,0,.2,1);
    transition: -webkit-box-shadow .28s cubic-bezier(.4,0,.2,1);
    box-shadow: 0 3px 4px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    -webkit-box-shadow: 0 3px 4px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}

.ant-card-body {
    padding: 0 !important;
}
</style>
