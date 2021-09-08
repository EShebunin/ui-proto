<template>
  <table class="main-table" role="grid">
    <thead class="main-table__head" role="rowgroup">
      <tr class="main-table__row" role="row">
        <th
          v-for="(item, index) in headers"
          :key="index"
          :title="item"
          role="columnheader"
          class="main-table__cell font-normal"
        >
          {{ item }}
        </th>
      </tr>
    </thead>

    <tbody class="main-table__body" role="rowgroup">
      <tr
        v-for="(array, rowIndex) in data"
        :key="rowIndex"
        class="main-table__row"
        role="row"
      >
        <td
          v-for="(item, colIndex) in array"
          :key="colIndex"
          :title="item"
          role="gridcell"
          class="border-r border-borderColor last-of-type:border-r-0 p-[2px]"
        >
          <div
            class="main-table__cell m-body"
            tabindex="0"
            contenteditable="true"
            @input="inputHandler"
          >
            {{ item }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    /** @type {string[]} */
    headers: { type: Array, required: true },
    /** @type {Array.<string[]>} */
    data: { type: Array, required: true },
  },

  methods: {
    inputHandler(e) {
      console.log(e.target.textContent);
    },
  },
};
</script>

<style lang="postcss">
.main-table {
  @apply border border-borderColor;
  @apply border-collapse;

  &__head {
    @apply cursor-default;
    @apply bg-[#F0F2F4];
    @apply border-b border-borderColor;
  }

  &__row {
    @apply border-b border-borderColor;
    @apply last-of-type:border-b-0;
    @apply even:bg-[#F9FAFB];
  }

  &__cell {
    @apply truncate;
    @apply text-[18px] leading-[21px];
    @apply min-w-[50px];
    @apply px-[14px] py-[13px];
    @apply border-r border-borderColor;
    @apply last-of-type:border-r-0;
    @apply focus:outline-none;
    @apply focus:ring-2;
    @apply focus:ring-[#8DD6FF];

    &.m-body {
      @apply border-r-0;
      @apply px-[12px] py-[11px];
    }
  }
}
</style>
