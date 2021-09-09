<template>
  <header class="header">
    <nav class="header__nav">
      <a href="#" class="header__link" @click.prevent="openModalAdmission">
        <shipping-icon />
        <span>Приемка</span>
      </a>
    </nav>
  </header>
</template>

<script>
import ShippingIcon from './Icons/ShippingIcon.vue';

export default {
  components: { ShippingIcon },

  emits: ['openModalAdmission'],

  methods: {
    openModalAdmission() {
      this.$emit('openModalAdmission');
    },
  },
};
</script>

<style lang="postcss">
.header {
  @apply flex py-[41px];
  @apply text-[20px] leading-[24px];

  &__nav {
    @apply px-[60px];
  }

  &__link {
    @apply flex items-center gap-3;
  }
}
</style>
