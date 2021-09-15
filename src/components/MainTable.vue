<template>
  <table class="main-table" role="grid">
    <thead class="main-table__head" role="rowgroup">
      <tr class="main-table__row" role="row">
        <th
          v-for="(value, key) in headers"
          :key="key"
          :title="value"
          role="columnheader"
          class="main-table__cell font-normal"
        >
          {{ value }}
        </th>
      </tr>
    </thead>

    <tbody class="main-table__body" role="rowgroup">
      <tr
        v-for="(object, rowIndex) in data"
        :key="rowIndex"
        tabindex="0"
        role="row"
        class="
          main-table__row
          cursor-pointer
          hover:bg-blue-50
          focus:bg-blue-100
        "
      >
        <td
          v-for="(value, key) in object"
          :key="key"
          :title="value"
          role="gridcell"
          class="border-r border-borderColor last-of-type:border-r-0 p-[2px]"
        >
          <div class="main-table__cell m-body">
            {{ value }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    /** @type {Object} */
    headers: { type: Object, required: true },
    /** @type {Array} */
    data: { type: Array, required: true },
  },

  methods: {},
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

    &.m-body {
      @apply px-[12px] py-[11px];
    }
  }
}
</style>
