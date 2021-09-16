<template>
  <textarea
    :value="modelValue"
    :style="{ height: textareaHeight }"
    class="resize-none bg-transparent"
    @input="update"
  ></textarea>
</template>

<script>
export default {
  props: {
    /** @type {String} */
    modelValue: { type: String, required: true },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      textareaHeight: '22px',
    };
  },

  methods: {
    /** @param {KeyboardEvent} e */
    update(e) {
      this.resize(e.target);
      this.$emit('update:modelValue', e.target.value);
    },

    /**
     * Ресайзит текстареа по содержимому
     * @param {Element} node
     */
    resize(node) {
      this.textareaHeight = '';
      this.$nextTick(() => {
        this.textareaHeight = node ? `${node.scrollHeight}px` : '';
      });
    },
  },
};
</script>
