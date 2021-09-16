<template>
  <aside class="aside" @mouseover="overHandler" @mouseleave="leaveHandler">
    <nav class="flex">
      <ul class="aside__list" :class="{ 'mod-shadow': !isHovered }">
        <li class="aside__item">
          <router-link to="/" exact class="aside__link">
            <clipboard-add-icon />
          </router-link>
        </li>
        <li class="aside__item">
          <router-link to="/references" class="aside__link">
            <references-icon />
          </router-link>
        </li>
      </ul>

      <transition
        enter-active-class="transition ease-out origin-left"
        enter-from-class="transform translate-x-[-70px] opacity-0"
        enter-to-class="transform translate-x-0 opacity-100"
        leave-active-class="transition ease-in origin-left"
        leave-from-class="transform translate-x-0 opacity-100"
        leave-to-class="transform translate-x-[-70px] opacity-0"
      >
        <ul v-if="isHovered" class="aside__list aside__list--hovered">
          <li class="aside__item">
            <router-link to="/" exact class="aside__link">
              Приём груза
            </router-link>
          </li>
          <li class="aside__item">
            <router-link to="/references" class="aside__link">
              Справочники
            </router-link>
          </li>
        </ul>
      </transition>
    </nav>
  </aside>
</template>

<script>
import ClipboardAddIcon from './Icons/ClipboardAddIcon.vue';
import ReferencesIcon from './Icons/ReferencesIcon.vue';

export default {
  components: { ClipboardAddIcon, ReferencesIcon },

  data() {
    return {
      isHovered: false,
      timeout: null,
    };
  },

  methods: {
    /** @param {Boolean} value */
    setIsHovered(value) {
      this.isHovered = value;
    },

    overHandler() {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        this.setIsHovered(true);
      }, 250);
    },

    leaveHandler() {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        this.setIsHovered(false);
      }, 0);
    },
  },
};
</script>

<style lang="postcss">
.aside {
  @apply fixed;
  @apply z-10;
  @apply bg-white;

  &__list {
    @apply h-screen;
    @apply px-[20px];
    @apply py-[30px];

    &--hovered {
      box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.4);
    }

    &.mod-shadow {
      box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.15);
    }
  }

  &__item {
    @apply mb-[18px];
  }

  &__link {
    @apply text-[#AAB4BE] text-[18px];
    @apply leading-[30px];

    &.router-link-active {
      @apply text-[#036B84];
    }

    svg {
      @apply fill-current;
    }
  }
}
</style>
