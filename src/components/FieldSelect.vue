<template>
  <Listbox
    :model-value="modelValue"
    :disabled="disabled"
    as="div"
    class="flex flex-col"
    @update:modelValue="update"
  >
    <ListboxLabel class="field__label">{{ label }}</ListboxLabel>

    <div class="relative">
      <ListboxButton as="template">
        <input :value="modelValue.name" readonly class="field__input m-icon" />
      </ListboxButton>

      <span
        class="
          absolute
          inset-y-0
          right-0
          flex
          items-center
          pr-2
          pointer-events-none
        "
      >
        <ChevronDownIcon class="w-5 h-5 text-borderColor" aria-hidden="true" />
      </span>

      <ListboxOptions class="field__dropdown">
        <ListboxOption
          v-for="option in options"
          v-slot="{ active }"
          :key="option.id"
          :value="option"
          as="template"
        >
          <li
            :title="option.name"
            :class="[
              active ? ' bg-borderColor' : 'bg-white',
              'cursor-default select-none p-2 text-[12px] leading-[14px]',
            ]"
          >
            <span class="block truncate">{{ option.name }}</span>
          </li>
        </ListboxOption>
      </ListboxOptions>
    </div>
  </Listbox>
</template>

<script>
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/solid';

export default {
  components: {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    ChevronDownIcon,
  },

  props: {
    label: { type: String, default: '', required: false },
    /** @type {Array.<{id: Number|String, name: String}>} */
    options: { type: Array, required: true },
    /** @type {{id: Number|String, name: String}} */
    modelValue: { type: Object, required: true },
    disabled: { type: Boolean, default: false, required: false },
  },

  emits: ['update:modelValue'],

  methods: {
    /** @param {{id: Number|String, name: String}} value */
    update(value) {
      this.$emit('update:modelValue', value);
    },
  },
};
</script>
