<template>
  <div class="font-bold">Hello</div>
</template>

<script>
export default {
  data() {
    return {
      string: '',
    };
  },

  created() {
    this.mymethod();
  },

  methods: {
    async mymethod() {
      const promise = new Promise((resolve) => resolve('Hello'));
      const hello = await promise;
      console.log(hello);
    },
  },
};
</script>

<style lang="postcss"></style>
