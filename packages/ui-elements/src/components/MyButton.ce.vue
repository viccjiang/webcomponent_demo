<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
  }>(),
  {
    label: 'Click me',
    variant: 'primary',
    disabled: false,
  },
);

const emit = defineEmits<{
  (e: 'click-me', payload: { at: number }): void;
}>();

function handleClick() {
  emit('click-me', { at: Date.now() });
}
</script>

<template>
  <button
    :class="['my-btn', variant, { disabled }]"
    :disabled="disabled"
    type="button"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<style>
:host {
  display: inline-block;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

.my-btn {
  appearance: none;
  border: none;
  border-radius: 8px;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.2s ease, background 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.my-btn.primary {
  background: #4f46e5;
  color: #fff;
}

.my-btn.primary:hover {
  background: #4338ca;
}

.my-btn.secondary {
  background: #e5e7eb;
  color: #111827;
}

.my-btn.secondary:hover {
  background: #d1d5db;
}

.my-btn:active {
  transform: translateY(1px);
}

.my-btn.disabled,
.my-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
