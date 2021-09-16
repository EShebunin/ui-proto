<template>
  <span :contenteditable="!disabled" :value="modelValue" @input="update">{{
    modelValue
  }}</span>
</template>

<script>
export default {
  props: {
    /** @type {String} */
    modelValue: { type: String, required: true },
    /** @type {Boolean} */
    disabled: { type: Boolean, default: false, required: false },
  },

  emits: ['update:modelValue'],

  methods: {
    /** @param {KeyboardEvent} e */
    update(e) {
      this.$emit('update:modelValue', e.target.textContent);
    },
  },
};
</script>
