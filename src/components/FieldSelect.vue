<template>
  <Listbox v-model="selectedPerson" as="div" class="flex flex-col">
    <ListboxLabel class="field__label">{{ label }}</ListboxLabel>

    <div class="relative">
      <ListboxButton as="template">
        <input :value="selectedPerson.name" class="field__input m-icon" />
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
          v-for="person in people"
          v-slot="{ active }"
          :key="person.id"
          :value="person"
          as="template"
        >
          <li
            :title="person.name"
            :class="[
              active ? ' bg-borderColor' : 'bg-white',
              'cursor-default select-none p-2 text-[12px] leading-[14px]',
            ]"
          >
            <span class="block truncate">{{ person.name }}</span>
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
  },

  data() {
    return {
      selectedPerson: { id: 1, name: 'Авто' },

      people: [
        { id: 1, name: 'Авто' },
        { id: 2, name: 'Авто' },
        { id: 3, name: 'Авто' },
        { id: 4, name: 'Авто' },
        { id: 5, name: 'Авто' },
      ],
    };
  },
};
</script>
