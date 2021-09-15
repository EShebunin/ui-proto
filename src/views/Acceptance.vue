<template>
  <div>
    <main-header title="Прием груза">
      <template #button>
        <Menu as="div" class="relative ml-[53px]">
          <MenuButton class="header__button"> + Добавить </MenuButton>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="
                absolute
                z-10
                mt-[2px]
                px-[12px]
                py-[14px]
                rounded-lg
                bg-white
                border border-borderColor
              "
            >
              <MenuItem v-slot="{ active }">
                <button
                  type="button"
                  class="text-[18px] block"
                  :class="active ? 'text-[#036B84]' : 'text-[#675A5A]'"
                  @click="setIsOpenModal(true)"
                >
                  Трубы
                </button>
              </MenuItem>

              <MenuItem v-slot="{ active }">
                <button
                  type="button"
                  class="text-[18px] block"
                  :class="active ? 'text-[#036B84]' : 'text-[#675A5A]'"
                  @click="setIsOpenModal(true)"
                >
                  Контейнеры
                </button>
              </MenuItem>

              <MenuItem v-slot="{ active }">
                <button
                  type="button"
                  class="text-[18px] block"
                  :class="active ? 'text-[#036B84]' : 'text-[#675A5A]'"
                  @click="setIsOpenModal(true)"
                >
                  Ген. груз
                </button>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </template>
    </main-header>

    <main-table :headers="mainTableHeader" :data="formatTableData" />

    <TransitionRoot appear :show="isOpenModal" as="template">
      <Dialog as="div">
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-textGray bg-opacity-50" />
          </TransitionChild>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div class="min-h-screen flex items-center transform">
              <form-admission
                class="bg-white shadow-xl mx-auto"
                @closeForm="setIsOpenModal(false)"
              />
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script>
import {
  Dialog,
  DialogOverlay,
  TransitionRoot,
  TransitionChild,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from '@headlessui/vue';
import MainHeader from '@/components/MainHeader.vue';
import MainTable from '@/components/MainTable.vue';
import FormAdmission from '@/components/FormAdmission.vue';

import { getProperties, getTableInfo } from '@/api';

export default {
  components: {
    MainHeader,
    MainTable,
    FormAdmission,
    Dialog,
    DialogOverlay,
    TransitionRoot,
    TransitionChild,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  },

  data() {
    return {
      /** @type {boolean} */
      isOpenModal: false,

      mainTableHeader: {
        id: '№',
        type: 'Тип операции',
        transport_type: 'Тип ТС',
        tag: 'ТН/ЖДН',
        sender: 'Грузоотправитель',
        receiver: 'Грузополучатель',
        send_date: 'Дата отгрузки',
        receive_date: 'Дата приёмки',
        big: 'Укрупненное наименование груза',
        port: 'Порт выгрузки',
        object: 'Объект',
      },
      mainTableData: [],

      /**
       * Массив с объектами "Укрупненное наименование груза"
       * @type {Array.<{id: Number, name: String}>}
       * */
      bigArray: [],
      /**
       * Массив с объектами "Объектов"
       * @type {Array.<{id: Number, name: String}>}
       * */
      objectArray: [],
      /**
       * Массив с объектами "Место складирования в порту"
       * @type {Array.<{id: Number, name: String}>}
       * */
      placeArray: [],
      /**
       * Массив с объектами "Порт"
       * @type {Array.<{id: Number, name: String}>}
       * */
      portArray: [],
      /**
       * Массив с объектами "Грузополучатель"
       * @type {Array.<{id: Number, name: String}>}
       * */
      receiverArray: [],
      /**
       * Массив с объектами "Грузоотправитель"
       * @type {Array.<{id: Number, name: String}>}
       * */
      senderArray: [],
      /**
       *  Массив с объектами "Тип операции"
       * @type {Array.<{id: Number, name: String}>}
       * */
      typeArray: [],
    };
  },

  computed: {
    tableKeys() {
      return Object.keys(this.mainTableHeader);
    },
    /** @returns {Array} */
    formatTableData() {
      return this.mainTableData.map((item) => ({
        id: item.id,
        type: this.getPropertiesValue(item.type, this.typeArray).name,
        transport_type: item.transport_type,
        tag: item.tag,
        sender: this.getPropertiesValue(item.sender, this.senderArray).name,
        receiver: this.getPropertiesValue(item.receiver, this.receiverArray)
          .name,
        send_date: new Date(item.send_date).toLocaleDateString(),
        receive_date: new Date(item.receive_date).toLocaleDateString(),
        big: this.getPropertiesValue(item.big, this.bigArray).name,
        port: this.getPropertiesValue(item.port, this.portArray).name,
        // object: this.getPropertiesValue(item.object, this.objectArray).name,
        object: 'пусто',
      }));
    },
  },

  async created() {
    this.bigArray = await getProperties('big');
    this.objectArray = await getProperties('object');
    this.placeArray = await getProperties('place');
    this.portArray = await getProperties('port');
    this.receiverArray = await getProperties('receiver');
    this.senderArray = await getProperties('sender');
    this.typeArray = await getProperties('type');

    this.mainTableData = await getTableInfo();
  },

  methods: {
    /** @param {Boolean} value */
    setIsOpenModal(value) {
      this.isOpenModal = value;
    },

    getPropertiesValue(id, array) {
      return array.find((item) => item.id === id);
    },
  },
};
</script>
