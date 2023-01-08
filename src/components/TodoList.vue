<template>
  <div>
    <h1>투두리스트</h1>
    <ul v-for="(todo, i) in this.todos" v-bind:key="i">
      <li>
        <label>
          <input type="checkbox" />
          {{ todo.text }}
        </label>
        <button v-on:click="deleteTodo(todo)">삭제</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  computed: {
    ...mapState({ todos: (state) => state.todo.todos }),
  },
  methods: {
    ...mapMutations({ deleteTodo: "doDeleteTodo" }),
  },
};
</script>

<style></style>
