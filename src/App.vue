<template>
  <div class="text-textBlack">
    <main-header @openModalAdmission="openModalAdmission" />

    <main-table :headers="mainTableHeader" :data="mainTableData" />

    <TransitionRoot appear :show="isOpenModalAdmission" as="template">
      <Dialog as="div" @close="closeModalAdmission">
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
            as="div"
            class="min-h-screen flex items-center"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <form-admission
              class="transition-all transform bg-white shadow-xl mx-auto"
              @closeForm="closeModalAdmission"
            />
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
} from '@headlessui/vue';
import MainHeader from './components/MainHeader.vue';
import MainTable from './components/MainTable.vue';
import FormAdmission from './components/FormAdmission.vue';

export default {
  components: {
    MainHeader,
    MainTable,
    FormAdmission,
    Dialog,
    DialogOverlay,
    TransitionRoot,
    TransitionChild,
  },

  data() {
    return {
      /** @type {string[]} */
      mainTableHeader: [
        '№',
        'Тип ТС',
        'Номер ТС',
        'ТН/ЖДН',
        'Грузоотправитель',
        'Грузополучатель',
        'Дата отгрузки',
        'Дата приемки',
        'Кол-во мест',
        'Вес',
        'Упаковка',
        'Наименование груза',
        'Укрупненное наименование груза',
        'Порт выгрузки',
        'Приемный акт',
        '№ места',
        'Объект',
        'Договор поставки',
        'Место складирования в порту',
        'Длина',
        'Ширина',
        'Высота',
        'Ф/Е',
        'Класс опасности',
        'Оговорки',
        'Номер контейнера',
        'Диаметр',
        'Толщина стенки',
        '№ трубы',
        '№ сегмента',
        'Статус',
        'Дата расхода',
        '№ расходного ордера',
      ],
      /** @type {Array.<string[]>} */
      mainTableData: [
        [
          '№',
          'Тип ТС',
          'Номер ТС',
          'ТН/ЖДН',
          'Грузоотправитель',
          'Грузополучатель',
          'Дата отгрузки',
          'Дата приемки',
          'Кол-во мест',
          'Вес',
          'Упаковка',
          'Наименование груза',
          'Укрупненное наименование груза',
          'Порт выгрузки',
          'Приемный акт',
          '№ места',
          'Объект',
          'Договор поставки',
          'Место складирования в порту',
          'Длина',
          'Ширина',
          'Высота',
          'Ф/Е',
          'Класс опасности',
          'Оговорки',
          'Номер контейнера',
          'Диаметр',
          'Толщина стенки',
          '№ трубы',
          '№ сегмента',
          'Статус',
          'Дата расхода',
          '№ расходного ордера',
        ],
        [
          '№',
          'Тип ТС',
          'Номер ТС',
          'ТН/ЖДН',
          'Грузоотправитель',
          'Грузополучатель',
          'Дата отгрузки',
          'Дата приемки',
          'Кол-во мест',
          'Вес',
          'Упаковка',
          'Наименование груза',
          'Укрупненное наименование груза',
          'Порт выгрузки',
          'Приемный акт',
          '№ места',
          'Объект',
          'Договор поставки',
          'Место складирования в порту',
          'Длина',
          'Ширина',
          'Высота',
          'Ф/Е',
          'Класс опасности',
          'Оговорки',
          'Номер контейнера',
          'Диаметр',
          'Толщина стенки',
          '№ трубы',
          '№ сегмента',
          'Статус',
          'Дата расхода',
          '№ расходного ордера',
        ],
      ],
      /** @type {boolean} */
      isOpenModalAdmission: true,
    };
  },

  methods: {
    closeModalAdmission() {
      this.isOpenModalAdmission = false;
    },

    openModalAdmission() {
      this.isOpenModalAdmission = true;
    },
  },
};
</script>

<style lang="postcss"></style>
