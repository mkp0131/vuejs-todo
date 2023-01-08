const state = {
  todos: [{ id: 1, text: "스토어", status: "active" }],
};

const mutations = {
  // 첫인자는 기본적으로 state 가 들어간다.(기존 값)
  // 두번째 인자부터는 값을 전달하는데 사용(payload)
  // 변경된 값을 return 해준다.
  doAddTodo(state, txt) {
    const todo = { id: Math.random(), text: txt, status: "active" };
    state.todos.push(todo);
  },
  doDeleteTodo(state, todo) {
    state.todos = state.todos.filter((t) => t.id !== todo.id);
  },
};

const actions = {
  fetchData() {
    // await 되는지 확인해야함.
  },
};

export default { state, mutations, actions };
