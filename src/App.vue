<template>
    <div id="app">
        <TodoList></TodoList>
        <span style="color: #BFBFBF">View on
            <a-button type="link" style="padding: 0; color: #BFBFBF;" href="https://github.com/yungshenglu/Vue-TodoList/">GitHub</a-button>
        </span>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodoList from './components/TodoList.vue';

@Component({
    components: {
        TodoList,
    },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
