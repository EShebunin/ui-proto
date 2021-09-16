<template>
  <div class="app bg-gray-200">
    <div class="max-w-7xl px-2 mx-auto">
      <div class="p-2 w-[420px]">
        <h2>Выбор одного значения из списка</h2>
        <Listbox v-model="selectedPerson">
          <div class="relative z-10 mt-1">
            <ListboxButton
              class="
                relative
                w-full
                py-2
                pl-3
                pr-10
                text-left
                bg-white
                rounded-lg
                shadow-md
                cursor-default
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-opacity-75
                focus-visible:ring-white
                focus-visible:ring-offset-orange-300
                focus-visible:ring-offset-2
                focus-visible:border-indigo-500
                sm:text-sm
              "
            >
              <span class="block truncate">{{ selectedPerson.name }}</span>
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
                <SelectorIcon
                  class="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <transition
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="
                  absolute
                  w-full
                  py-1
                  mt-1
                  overflow-auto
                  text-base
                  bg-white
                  rounded-md
                  shadow-lg
                  max-h-60
                  ring-1 ring-black ring-opacity-5
                  focus:outline-none
                  sm:text-sm
                "
              >
                <ListboxOption
                  v-slot="{ active, selected }"
                  v-for="person in people"
                  :key="person.name"
                  :value="person"
                  as="template"
                >
                  <li
                    :class="[
                      active
                        ? 'text-yellow-900 bg-yellow-100'
                        : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-10 pr-4',
                    ]"
                  >
                    <span
                      :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'block truncate',
                      ]"
                      >{{ person.name }}</span
                    >
                    <span
                      v-if="selected"
                      class="
                        absolute
                        inset-y-0
                        left-0
                        flex
                        items-center
                        pl-3
                        text-yellow-600
                      "
                    >
                      <CheckIcon class="w-5 h-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>

      <div class="p-2 w-[420px]">
        <h2>Выбор одного значения из списка с поиском</h2>
        <Listbox v-model="selectedPerson">
          <div class="relative mt-1">
            <ListboxButton
              class="
                relative
                w-full
                py-2
                pl-3
                pr-10
                text-left
                bg-white
                rounded-lg
                shadow-md
                cursor-default
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-opacity-75
                focus-visible:ring-white
                focus-visible:ring-offset-orange-300
                focus-visible:ring-offset-2
                focus-visible:border-indigo-500
                sm:text-sm
              "
            >
              <span class="block truncate">{{ selectedPerson.name }}</span>
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
                <SelectorIcon
                  class="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <transition
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="
                  absolute
                  w-full
                  py-1
                  mt-1
                  overflow-auto
                  text-base
                  bg-white
                  rounded-md
                  shadow-lg
                  max-h-60
                  ring-1 ring-black ring-opacity-5
                  focus:outline-none
                  sm:text-sm
                "
              >
                <div class="p-2">
                  <input
                    v-model="search"
                    name="search"
                    id="search"
                    class="
                      w-full
                      p-2
                      text-left
                      bg-white
                      border border-yellow-900
                      rounded-lg
                      shadow-md
                      cursor-default
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-opacity-75
                      focus-visible:ring-gray-100
                      focus-visible:ring-offset-orange-300
                      focus-visible:ring-offset-2
                      focus-visible:border-indigo-500
                      sm:text-sm
                    "
                  />
                </div>

                <ListboxOption
                  v-slot="{ active, selected }"
                  v-for="person in filteredOptions"
                  :key="person.name"
                  :value="person"
                  as="template"
                >
                  <li
                    :class="[
                      active
                        ? 'text-yellow-900 bg-yellow-100'
                        : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-10 pr-4',
                    ]"
                  >
                    <span
                      :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'block truncate',
                      ]"
                      >{{ person.name }}</span
                    >
                    <span
                      v-if="selected"
                      class="
                        absolute
                        inset-y-0
                        left-0
                        flex
                        items-center
                        pl-3
                        text-yellow-600
                      "
                    >
                      <CheckIcon class="w-5 h-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>

      <div class="p-2 w-[420px]">
        <h2>Выбор даты (использован браузерный стандартный)</h2>
        <input
          type="date"
          name="date"
          id="date"
          class="
            w-full
            p-2
            text-left
            bg-white
            rounded-lg
            shadow-md
            cursor-default
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-opacity-75
            focus-visible:ring-white
            focus-visible:ring-offset-orange-300
            focus-visible:ring-offset-2
            focus-visible:border-indigo-500
            sm:text-sm
          "
        />
      </div>

      <div class="p-2 w-[420px]">
        <h2>Ввод значений</h2>
        <input
          name="value"
          id="value"
          class="
            w-full
            p-2
            text-left
            bg-white
            rounded-lg
            shadow-md
            cursor-default
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-opacity-75
            focus-visible:ring-gray-100
            focus-visible:ring-offset-orange-300
            focus-visible:ring-offset-2
            focus-visible:border-indigo-500
            sm:text-sm
          "
        />
      </div>
      <div class="p-2 w-[420px]">
        <h2>Ввод числовых значений(стандартный браузерный)</h2>
        <input
          type="number"
          name="number"
          id="number"
          class="
            w-[60px]
            p-2
            text-left
            bg-white
            rounded-lg
            shadow-md
            cursor-default
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-opacity-75
            focus-visible:ring-gray-100
            focus-visible:ring-offset-orange-300
            focus-visible:ring-offset-2
            focus-visible:border-indigo-500
            sm:text-sm
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid';

export default {
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    CheckIcon,
    SelectorIcon,
  },

  setup() {
    const people = [
      { name: 'АМТП (Экономия/Бакарица)' },
      { name: 'Речной порт' },
      { name: 'АТФ' },
    ];
    const selectedPerson = ref(people[0]);

    return {
      people,
      selectedPerson,
    };
  },

  data() {
    return {
      search: '',
    };
  },

  computed: {
    filteredOptions() {
      if (this.search.length === 0) {
        return this.people;
      }
      return this.people.filter(
        (item) =>
          item.name.toLowerCase().indexOf(this.search.trim().toLowerCase()) >= 0,
      );
    },
  },
};
</script>

<style lang="postcss"></style>
