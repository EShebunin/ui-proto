<template>
  <div class="text-textBlack">
    <main-aside />
    <div class="ml-[70px]">
      <router-view />
    </div>
  </div>
</template>

<script>
import MainAside from './components/MainAside.vue';

export default {
  components: {
    MainAside,
  },
};
</script>
