<template>
    <div class="todolist">
        <h2>Simple TodoList</h2>
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="New TODO" aria-label="New TODO" aria-describedby="button-addon2" v-model="newTodo">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="addTodo">
                    Add
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TodoList extends Vue {
    newTodo: string = '';
    
    addTodo() {
        // Log for testing
        console.log('newTodo: ', this.newTodo);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>