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

import useReferences from '@/composables/useReferences';

export default {
  components: {
    MainAside,
  },

  setup() {
    const {
      getBigArray,
      getObjectArray,
      getPlaceArray,
      getPortArray,
      getReceiverArray,
      getSenderArray,
      getTypeArray,
      getPackageArray,
      getTransportArray,
    } = useReferences();

    return {
      getBigArray,
      getObjectArray,
      getPlaceArray,
      getPortArray,
      getReceiverArray,
      getSenderArray,
      getTypeArray,
      getPackageArray,
      getTransportArray,
    };
  },

  async created() {
    await Promise.all([
      this.getBigArray(),
      this.getObjectArray(),
      this.getPlaceArray(),
      this.getPortArray(),
      this.getReceiverArray(),
      this.getSenderArray(),
      this.getTypeArray(),
      this.getPackageArray(),
      this.getTransportArray(),
    ]);
  },
};
</script>
