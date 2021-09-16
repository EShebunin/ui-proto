<template>
  <header class="header">
    <h1 class="header__title">{{ title }}</h1>

    <div class="header__controls">
      <!-- TODO: Add serach fields -->
      <field-text id="header-search" class="w-[450px]" />
      <slot name="button" />
    </div>
  </header>
</template>

<script>
import FieldText from './FieldText.vue';

export default {
  components: { FieldText },
  props: {
    /** @type {String} */
    title: { type: String, default: '', required: false },
  },
};
</script>

<style lang="postcss">
.header {
  @apply px-[21px];
  @apply pt-[32px];
  @apply pb-[14px];

  &__title {
    @apply text-[24px] text-[#036B84];
    @apply font-bold;
    @apply leading-[28px];
    @apply mb-[9px];
  }

  &__button {
    @apply bg-[#036B84];
    @apply px-[13px];
    @apply py-[7px];
    @apply rounded-lg;
    @apply text-[18px] text-white;
    @apply leading-[21px];
  }

  &__controls {
    @apply flex items-center;
  }
}
</style>
