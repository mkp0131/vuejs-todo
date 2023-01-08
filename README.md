# todo

## state 정의

```json
{
  todos: [
    {id, text, status}
  ],
}
```

## 개발 사항

- [x] todo 리스트 보여주기
- [x] todo 추가
- [x] todo 삭제
- [ ] todo 업데이트

# 코드정리

## [vue] props 의 타입을 체크

- props 의 타입체크가 기본적으로 내장

### 기본제공 타입

```
String
Number
Boolean
Array
Object
Date
Function
Symbol
```

### 실제사용

```js
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object
}
```

## [vue] 반복문 map

- 지속적으로 알아봐야함. 20230107
- `key` 는 문자열이랑 숫자만 가능!

```js
<template>
  <div>
    <ul v-for="(todo, i) in todos" v-bind:key="i">
      <li>
        <label>
          <input type="checkbox" />
          {{ todo.text }}
        </label>
        <button>삭제</button>
      </li>
    </ul>
  </div>
</template>
```

## [vue] onclick 파라미터 전달

- 그냥 파라미터를 쓰면된다. 문법파괴....

```js
<button v-on:click="deleteTodo('체크', 'dsaf')">삭제</button>
```

## [vue] scss 사용

### 설치(오류날시 설치하자)

- 설치후 재시작한다.

```
npm i sass-loader node-sass
```

### 사용법

- scoped 는 현재 컴포넌트에서만 css 를 사용한다.

```js
<style lang="scss" scoped>
h1 {
  color: red;
  p {
    background: blue;
  }
}
</style>
```

## [vue] LifeCycle, 라이프사이클, created

### created

- created 컴포넌트 생성시 실행한다.(한번만 실행)
- created는 data와 events가 활성화되어 접근할 수 있지만 템플릿과 가상돔은 마운트 및 렌더링되지 않은 상태

```js
<script>
import TodoList from "./components/TodoList.vue";
import TodoForm from "./components/TodoForm.vue";

export default {
  components: {
    TodoList,
    TodoForm,
  },
  data: function () {
    return {
      todos: [
        { id: 1, text: "안녕", status: "active" },
        { id: 2, text: "현대", status: "active" },
      ],
    };
  },
  methods: {
    doAddTodo: function (txt) {
      const todo = { id: Math.random(), text: txt, status: "active" };
      this.todos.push(todo);
    },
    doDeleteTodo: function (todo) {
      this.todos = this.todos.filter((t) => t.id !== todo.id);
    },
  },
  created: function () {
    console.log("✅ 생성");
  },
};
</script>
```

### mounted

- created 와 동일하게 컴포넌트 실행시 실행
- 컴포넌트, 템플릿, 렌더링된 돔에 접근 가능

## [vue] 모달 컴포넌트 modal, <slot>

- 공식코드예제: https://codesandbox.io/s/github/vuejs/v2.vuejs.org/tree/master/src/v2/examples/vue-20-modal-component?from-embed=&file=/index.html:291-1096

### <slot> 리액트의 children

- 리액트의 children 처럼 컴포넌트를 전달받아 템플릿에 사용

### 모달 팝업

- `components/common/AlertModal.vue` 생성

```vue
<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"> default header </slot>
          </div>

          <div class="modal-body">
            <slot name="body"> default body </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
```

- 사용

```vue
<modal v-if="showModal" @close="showModal = false">
```

## [vue] vuex 전역 state 관리

### 설치

- 공식문서vue2: https://v3.vuex.vuejs.org/
- 공식문서vue3: https://vuex.vuejs.org/

```
// vue2
npm i vuex@3.6.2
// vue3
npm install vuex@next --save
```

### 사용

- `store/store.js` 파일을 생성

```js
import Vue from "vue";
import Vuex from "vuex";

// Vue.use(): Vue 플러그인 기능
// Vue 에 글러벌로 사용을 하기 원할때 사용한다.
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});
```

- `src/main.js` 에 `vuex` 설정

```js
import Vue from "vue";
import App from "./App.vue";
// vuex 추가
import { store } from "./store/store";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  // vuex 추가
  store,
}).$mount("#app");
```

- store 에 값을 사용

```js
// state 의 값 사용
<p>{{ this.$store.state.message }}</p>
// getter 의 값 사용
<p>{{ this.$store.getters.doubleNumber }}</p>
// mutation 사용
this.$store.commit("doDeleteTodo", todo);
// actions 사용
this.$store.dispatch('fetchData');
```

### Vuex 기술 요소

- state: 여러 컴포넌트에 공유되는 데이터
- getters: 연산된 state 값을 접근하는 속성 / computed 처럼 기존의 state의 값을 계산하여 가져온다.
- mutations: state 값을 변경하는 이벤트 메소드 / 값을 변경 할 수 있는 유일한 방법
- actions: 비동기 처리 로직을 선언하는 메소드

### 헬퍼 함수

#### mapState

- vuex에 선언한 state속성을 뷰 컴포넌트에 더 쉽게 연결해주는 헬퍼
- `this.$store.state.num` => `this.num` 이런식으로 사용 가능

```js
// App.vue
import { mapState } from 'vuex'

computed() {
  ...mapState(['num'])
  // num() { return this.$store.state.num; }
}

// store.js
state: {
  num: 10
}

// <p>{{ this.$store.state.num }}</p>
<p>{{ this.num }}</p>
```

#### mapGetters

- Vuex에 선언한 getters 속성을 뷰 컴포넌트에 더 쉽게 연결해주는 헬퍼

```js
// App.vue
import { mapGetters } from 'vuex'

computed() { ...mapGetters(['reverseMessage']) }

// store.js
getters: {
  reverseMessage(state) {
    return state.msg.split('').reverse().join('');
  }
}

// <p>{{ this.$store.getters.reverseMessage }}</p>
<p>{{ this.reverseMessage }}</p>
```

- 부가설명

```js
// 1. 이런 코드를
computed() { reverseMessage() {
  return this.$store.getters.reverseMessage;
} }
// 2. mapGetters 를 활용하여 축약 할 수 있다.
computed() { ...mapGetters(['reverseMessage']) }
```

- obj 로도 가능하다.

```js
computed() { ...mapGetters({revMsg: 'reverseMessage'}) }
```

#### mapMutations

```js
// App.vue
import { mapMutations } from 'vuex'

methods: {
  ...mapMutations(['clickBtn']),
  authLogin(){},
  displayYable(){}
}

// store.js
mutations: {
  clickBtn(state){
    alert(state.msg);
  }
}

<button @click="clickBtn">popup message</button>
```

#### mapActions

- Vuex에 선언한 actions 속성을 뷰 컴포넌트에 더 쉽게 연결해주는 헬퍼

```js
// App.vue
import { mapActions } from 'vuex'

methods: {
  ...mapActions(['delayClickBtn']),
}

// store.js
mutations: {
  delayClickBtn(context){
    setTimeout(() => context.commit('clickBtn'), 2000);
  }
}

<button @click="delayClickBtn">delay popup message</button>
```

#### 헬퍼의 유연한 문법

1. Vuex에 선언한 속성을 그대로 컴포넌트에 연결하는 문법

```js
// 배열 리터럴
...mapMutations([
  'clickBtn',	// 'clickBtn': clickBtn
  'addNumber'	// addNumber(인자)
])
```

2. Vuex에 선언한 속성을 컴포넌트의 특정 메소드에 연결하는 문법

```js
// 객체 리터럴
...mapMutations({
  popupMsg: 'clickBtn'	// 컴포넌트 메소드명: store의 Mutation명
})
```

### 모듈화

- `store/modules/todo.js` 파일을 생성

```js
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
```

- `stroe.js` 에 modules 를 등록

```js
import Vue from "vue";
import Vuex from "vuex";
import todo from "./modules/todo";

// Vue.use(): Vue 플러그인 기능
// Vue 에 글러벌로 사용을 하기 원할때 사용한다.
Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: { todo },
});
```

- 접근시에는 modules 등록할때 사용한 키로 사용한다.

```js
    <ul v-for="(todo, i) in this.$store.state.todo.todos" v-bind:key="i">
```

- mapState 는 이런 형식으로 사용

```js
  computed: {
    ...mapState({ todos: (state) => state.todo.todos }),
  },
```
