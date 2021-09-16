<template>
  <div class="search__field flex items-center">
    <Listbox v-model="category" as="div" class="flex flex-col">
      <div class="relative">
        <ListboxButton
          as="button"
          class="
            flex
            items-center
            border
            rounded-tl-lg rounded-bl-lg
            border-borderColor border-r-0
            text-[#DBE2EA] text-[11px]
            py-[9px]
            px-[14px]
            whitespace-nowrap
            focus:outline-none
          "
        >
          <span class="inline-block leading-[17px]">{{ category }}</span>
          <ChevronDownIcon class="w-[17px] h-[17px]" aria-hidden="true" />
        </ListboxButton>

        <ListboxOptions class="field__dropdown">
          <ListboxOption
            v-for="(item, index) in categories"
            v-slot="{ active }"
            :key="index"
            :value="item"
            as="template"
          >
            <li
              :title="item"
              :class="[
                active ? ' bg-borderColor' : 'bg-white',
                'cursor-pointer select-none p-2 text-[12px]  leading-[14px]',
              ]"
            >
              <span class="block truncate">{{ item }}</span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </div>
    </Listbox>

    <div class="relative">
      <input
        type="text"
        class="
          w-[334px]
          text-[16px]
          leading-[21px]
          border border-borderColor
          rounded-tr-lg rounded-br-lg
          focus:outline-none
          focus:ring-2
          focus:ring-[#8DD6FF]
          focus:border-[#8DD6FF]
          pl-[14px]
          pr-[34px]
          py-[7px]
        "
      />
      <span
        class="
          absolute
          inset-y-0
          right-[9px]
          flex
          items-center
          pointer-events-none
        "
      >
        <SearchIcon class="w-[19px] h-[19px] text-[#DBE2EA]" />
      </span>
    </div>

    <slider-icon class="ml-[12px] w-6 h-6 fill-current text-[#DBE2EA]" />
  </div>
</template>

<script>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { ChevronDownIcon, SearchIcon } from '@heroicons/vue/solid';
import SliderIcon from './Icons/SliderIcon.vue';

export default {
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    ChevronDownIcon,
    SearchIcon,
    SliderIcon,
  },

  data() {
    return {
      category: 'Все категории',

      categories: ['Все категории', 'Все категории', 'Все категории'],
    };
  },
};
</script>
