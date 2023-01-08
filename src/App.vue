<template>
  <div>
    <h1>
      {{ this.$store.state.siteName }} Todos
      <p>안녕</p>
    </h1>
    <todo-list />
    <todo-form />
    <alert-modal v-if="showModal" @close="showModal = false" />
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue";
import TodoForm from "./components/TodoForm.vue";
import AlertModal from "./components/common/AlertModal.vue";

export default {
  components: {
    TodoList,
    TodoForm,
    AlertModal,
  },
  data: function () {
    return {
      showModal: false,
    };
  },
  methods: {},
  created: function () {
    console.log("✅ 생성");
  },
};
</script>

<style lang="scss" scoped>
h1 {
  color: red;
  p {
    background: blue;
  }
}
</style>
