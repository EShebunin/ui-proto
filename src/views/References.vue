<template>
  <main-header title="Справочники">
    <template #button>
      <button
        type="button"
        class="
          header__button
          flex
          items-center
          justify-between
          w-[140px]
          ml-[53px]
        "
      >
        <span>+</span>
        <span>Добавить</span>
      </button>
    </template>
  </main-header>

  <div class="references__content flex items-start w-full">
    <ul class="references__list px-[24px] max-w-[475px] flex-1">
      <li v-for="(item, index) in list" :key="item.id">
        <button
          type="button"
          class="
            w-full
            text-left
            py-[13px]
            text-[18px]
            leading-[21px]
            hover:text-[#036B84]
          "
          :class="{ 'text-[#036B84]': index === activeItemIndex }"
          @click="selectItem(index)"
        >
          {{ item.name }}
        </button>
      </li>
    </ul>

    <main-table :headers="tableHeader" :data="tableData" class="flex-auto" />
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue';
import MainTable from '@/components/MainTable.vue';

import useReferences from '@/composables/useReferences';

export default {
  components: { MainHeader, MainTable },

  setup() {
    const {
      bigArray,
      objectArray,
      placeArray,
      portArray,
      receiverArray,
      senderArray,
      typeArray,
      packageArray,
    } = useReferences();

    return {
      bigArray,
      objectArray,
      placeArray,
      portArray,
      receiverArray,
      senderArray,
      typeArray,
      packageArray,
    };
  },

  data() {
    return {
      list: [
        { id: 'port', name: 'Порт перевалки' },
        { id: 'sender', name: 'Грузоотправители' },
        { id: 'receiver', name: 'Грузополучатели' },
        // Что это если есть укрупненка
        // { id: 'big', name: 'Наименование груза' },
        { id: 'big', name: 'Укрупненное наименование груза' },
        { id: 'package', name: 'Род упаковки' },
        { id: 'place', name: 'Место складирования' },
        // Что это если есть Место
        // { id: '', name: 'Зона складирования' },
        // Не добавлен
        // { id: '', name: 'Статус работ на площадке' },
      ],

      activeItemIndex: 0,
    };
  },

  computed: {
    /**
     * Выбранный элемент из списка
     * @return {{id: String, name: String}}
     */
    selectedItem() {
      return this.list[this.activeItemIndex];
    },
    tableHeader() {
      return {
        id: '№',
        name: this.selectedItem.name,
      };
    },
    tableData() {
      return this[`${this.selectedItem.id}Array`];
    },
  },

  methods: {
    /**
     * Выбор элемента из списка
     * @param {Number} index
     */
    selectItem(index) {
      this.activeItemIndex = index;
    },
  },
};
</script>
