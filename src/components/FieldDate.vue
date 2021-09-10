<template>
  <div class="flex flex-col">
    <label :for="id" class="field__label">{{ label }}</label>

    <input
      :id="id"
      type="date"
      class="field__input"
      :value="modelValue"
      @input="update"
    />
  </div>
</template>

<script>
export default {
  props: {
    /** @type {String} */
    label: { type: String, default: '', required: false },
    /** @type {String} */
    id: { type: String, default: 'field-text', required: true },
    /** @type {String} */
    modelValue: { type: String, required: true },
  },

  emits: ['update:modelValue'],

  methods: {
    /** @param {Event} e */
    update(e) {
      this.$emit('update:modelValue', e.target.value);
    },
  },
};
</script>
