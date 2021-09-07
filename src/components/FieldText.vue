<template>
  <div class="flex flex-col">
    <label :for="id" class="field__label">{{ label }}</label>

    <input :id="id" type="text" class="field__input" />
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, default: '', required: false },
    id: { type: String, default: 'field-text', required: true },
  },
};
</script>
