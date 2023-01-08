<template>
  <form v-on:submit="onSubmit">
    <input type="text" v-model="todo" />
    <button>확인</button>
  </form>
</template>

<script>
export default {
  data: function () {
    return {
      todo: "",
    };
  },
  methods: {
    onSubmit: function (e) {
      e.preventDefault();
      this.$store.commit("doAddTodo", this.todo);
      this.todo = "";
    },
  },
};
</script>

<style></style>
