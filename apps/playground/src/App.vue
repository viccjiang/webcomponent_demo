<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
const variant = ref<'primary' | 'secondary'>('primary');
const label = ref('Hello Web Component');

function onClickMe(event: Event) {
  const detail = (event as CustomEvent<{ at: number }>).detail;
  count.value += 1;
  if (import.meta.env.DEV) {
    console.log('[App.vue] click-me received', detail);
  }
}

function toggleVariant() {
  variant.value = variant.value === 'primary' ? 'secondary' : 'primary';
}
</script>

<template>
  <main class="container">
    <header>
      <h1>UI Elements Playground</h1>
      <p>透過 <code>@demo/ui-elements</code> 的建置產物驗證 Web Component。</p>
    </header>

    <section class="card">
      <h2>1. Props / Slots</h2>
      <my-button :label="label" :variant="variant" @click-me="onClickMe" />
      <my-button variant="secondary" @click-me="onClickMe">
        我是 slot 內容
      </my-button>

      <div class="controls">
        <label>
          label:
          <input v-model="label" type="text" />
        </label>
        <button type="button" @click="toggleVariant">
          切換 variant（目前：{{ variant }}）
        </button>
      </div>
    </section>

    <section class="card">
      <h2>2. Events</h2>
      <p>已觸發 <strong>{{ count }}</strong> 次 <code>click-me</code> 事件。</p>
    </section>

    <section class="card">
      <h2>3. Shadow DOM</h2>
      <p>
        打開 DevTools 觀察
        <code>&lt;my-button&gt;</code> 內的
        <code>#shadow-root</code>，樣式不會洩漏到外部。
      </p>
    </section>
  </main>
</template>

<style scoped>
.container {
  max-width: 720px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  color: #1f2937;
}

header h1 {
  margin-bottom: 0.25rem;
}

.card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  margin-top: 1.25rem;
}

.card h2 {
  margin-top: 0;
  font-size: 1.1rem;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  margin-top: 1rem;
}

.controls input {
  padding: 0.35rem 0.5rem;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  margin-left: 0.4rem;
}

code {
  background: #eef2ff;
  padding: 0.05em 0.35em;
  border-radius: 4px;
  font-size: 0.95em;
}
</style>
