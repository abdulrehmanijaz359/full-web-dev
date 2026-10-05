<!-- Vue demo: Vite + Vue  (npm create vue@latest) -->
<!-- Replace src/App.vue with this file and import the shared CSS. -->
<script setup>
import { ref, computed } from "vue";
import "./shared.css";

const count = ref(0);
const todos = ref([]);
const text = ref("");

function addTodo() {
  const title = text.value.trim();
  if (!title) return;
  todos.value.push({ id: Date.now(), title, done: false });
  text.value = "";
}

function remove(id) {
  todos.value = todos.value.filter((t) => t.id !== id);
}

const remaining = computed(() => todos.value.filter((t) => !t.done).length);
</script>

<template>
  <main class="app">
    <h1>Vue demo</h1>

    <section class="card">
      <h2>Counter</h2>
      <div class="counter">
        <button class="ghost" @click="count--">−</button>
        <output>{{ count }}</output>
        <button @click="count++">+</button>
      </div>
    </section>

    <section class="card">
      <h2>To-do list</h2>
      <div class="add">
        <input v-model="text" @keydown.enter="addTodo" placeholder="What needs doing?" />
        <button @click="addTodo">Add</button>
      </div>

      <p v-if="todos.length === 0" class="empty">Nothing here yet. Add your first task.</p>
      <ul v-else>
        <li v-for="t in todos" :key="t.id" :class="{ done: t.done }">
          <input type="checkbox" v-model="t.done" />
          <span>{{ t.title }}</span>
          <button class="ghost" @click="remove(t.id)">Remove</button>
        </li>
      </ul>
      <p class="summary">{{ remaining }} of {{ todos.length }} tasks left</p>
    </section>
  </main>
</template>
