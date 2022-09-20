<script lang="ts" setup>
import { ref } from 'vue';
import { addTodoItem, subscribeTodosRead, updateTodoItem } from '~/store';
import type { TodoType, FireBaseTodoType } from '~/types';
import '~/static/main.scss';

// get the firebase instance
const input = ref('');
function addTodo() {
  if (input.value === '') {
    alert('Please enter a todo item');
    return;
  };
  addTodoItem(input.value);
  input.value = '';
}

function handleItemClick(todo: FireBaseTodoType){
  console.log(todo);
  todo.value.done = !todo.value.done;
  updateTodoItem(todo.id, todo.value)
}

const todos = ref([] as FireBaseTodoType[]);
subscribeTodosRead((data) => {
  todos.value = data
});
</script>
<template>
  <div id="todo-container" class="dark">
    <el-header>
      <el-row >
        <el-col :span="6">
          <el-row justify="center">
            <el-input v-model="input" placeholder="Enter a todo item"></el-input>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row justify="center">
            <el-button plain type="primary" @click="addTodo">Add</el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="20" justify="center">
          <ul v-if="todos.length > 0">
            <li v-for="(todo, i) in todos" :key="i" @click="handleItemClick(todo)">
              <el-checkbox  v-model="todo.value.done"></el-checkbox>
              {{ todo.value.value }}
            </li>
          </ul>
      </el-row>
    </el-main>
  </div>
</template>

<style lang="scss" scoped>
#todo-container{
  padding: 12px;
}
li {
  list-style: none;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

// blink effect on clicked
li:active {
  animation: blink 0.5s;
}

// create a dark theme

</style>

