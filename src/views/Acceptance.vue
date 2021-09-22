<template>
  <main-header title="Прием груза">
    <template #button>
      <Menu as="div" class="relative ml-[53px]">
        <MenuButton
          class="header__button flex items-center justify-between w-[140px]"
        >
          <span>+</span>
          <span>Добавить</span>
        </MenuButton>

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
              inset-x-0
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
                class="
                  text-[18px] text-left
                  leading-[21px]
                  block
                  w-full
                  mb-[9px]
                "
                :class="active ? 'text-[#036B84]' : 'text-[#675A5A]'"
                @click="openModalPipes"
              >
                Трубы
              </button>
            </MenuItem>

            <MenuItem v-slot="{ active }">
              <button
                type="button"
                class="
                  text-[18px] text-left
                  leading-[21px]
                  block
                  w-full
                  mb-[9px]
                "
                :class="active ? 'text-[#036B84]' : 'text-[#675A5A]'"
                @click="openModalCrisper"
              >
                Контейнеры
              </button>
            </MenuItem>

            <MenuItem v-slot="{ active }">
              <button
                type="button"
                class="text-[18px] text-left leading-[21px] block w-full"
                :class="active ? 'text-[#036B84]' : 'text-[#675A5A]'"
                @click="openModalCargo"
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
              :shipping-name="shippingName"
              class="bg-white shadow-xl mx-auto"
              @closeForm="setIsOpenModal(false)"
              @confirmForm="closeModal"
            />
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
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

import { getTableInfo } from '@/api';
import useReferences from '@/composables/useReferences';
import shippingNames from '@/composables/shippingNames';

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

  setup() {
    const {
      bigArray,
      objectArray,
      placeArray,
      portArray,
      receiverArray,
      senderArray,
      typeArray,
    } = useReferences();

    return {
      bigArray,
      objectArray,
      placeArray,
      portArray,
      receiverArray,
      senderArray,
      typeArray,
    };
  },

  data() {
    return {
      /** @type {Boolean} */
      isOpenModal: false,

      /**
       * Наименование типа принимаемого груза
       * @type {String}
       * */
      shippingName: '',

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
    };
  },

  computed: {
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
        object: item.object,
      }));
    },
  },

  async created() {
    await this.getDocs();
  },

  methods: {
    /** @param {Boolean} value */
    setIsOpenModal(value) {
      this.isOpenModal = value;
    },

    closeModal() {
      this.getDocs();
      this.setIsOpenModal(false);
    },

    openModalPipes() {
      this.shippingName = shippingNames.pipes;
      requestAnimationFrame(() => {
        this.setIsOpenModal(true);
      });
    },

    openModalCrisper() {
      this.shippingName = shippingNames.crisper;
      requestAnimationFrame(() => {
        this.setIsOpenModal(true);
      });
    },

    openModalCargo() {
      this.shippingName = shippingNames.cargo;
      requestAnimationFrame(() => {
        this.setIsOpenModal(true);
      });
    },

    getPropertiesValue(id, array) {
      return array.find((item) => item.id === id);
    },

    async getDocs() {
      this.mainTableData = await getTableInfo();
    },
  },
};
</script>
