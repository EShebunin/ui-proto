<template>
  <header class="header">
    <nav class="header__nav">
      <Menu as="div" class="relative">
        <MenuButton class="header__link">
          <shipping-icon />
          <span>Приемка</span>
        </MenuButton>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems class="absolute z-10 p-2 shadow-lg bg-white">
            <MenuItem v-slot="{ active }">
              <button
                type="button"
                class="header__button"
                :class="{ 'm-active': active }"
                @click="openModalAdmission"
              >
                Трубы
              </button>
            </MenuItem>

            <MenuItem v-slot="{ active }">
              <button
                type="button"
                class="header__button"
                :class="{ 'm-active': active }"
                @click="openModalAdmission"
              >
                Ген. груз
              </button>
            </MenuItem>

            <MenuItem v-slot="{ active }">
              <button
                type="button"
                class="header__button"
                :class="{ 'm-active': active }"
                @click="openModalAdmission"
              >
                Контейнер
              </button>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </nav>
  </header>
</template>

<script>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import ShippingIcon from './Icons/ShippingIcon.vue';

export default {
  components: { ShippingIcon, Menu, MenuButton, MenuItems, MenuItem },

  emits: ['openModalAdmission'],

  methods: {
    openModalAdmission() {
      requestAnimationFrame(() => this.$emit('openModalAdmission'));
    },
  },
};
</script>
