<template>
  <div
    class="
      py-[22px]
      px-[24px]
      text-textBlack
      border border-borderColor
      rounded-md
    "
  >
    <h2 class="form__header">Прием груза</h2>

    <div class="form__body mb-[14px]">
      <div>
        <div class="grid grid-cols-3 gap-4 mb-[12px]">
          <field-select label="ТС" />
          <field-text id="number-vehicle" label="Номер ТС" />
          <field-text id="waybill" label="ТН/ЖДН" />
        </div>
        <field-select label="Грузооправитель" class="mb-[12px]" />
        <field-select label="Грузополучатель" />
      </div>

      <div>
        <field-select label="Порт выгрузки" class="mb-[12px]" />
        <field-select label="Место складирования в порту" class="mb-[12px]" />
        <div class="grid grid-cols-2 gap-[81px] mb-[12px]">
          <field-text id="act" label="Приемный акт" />
          <field-select label="Объект" />
        </div>
        <div class="grid grid-cols-2 gap-[81px]">
          <field-text id="contract" label="Договор поставки" />
          <field-text id="count-place" label="Кол-во мест" />
        </div>
      </div>

      <div class="flex justify-self-end">
        <field-date id="date-out" label="Дата отгрузки" class="mr-12" />
        <field-date id="date-in" label="Дата приемки" />
      </div>
    </div>

    <div class="form__table mb-[12px]">
      <button
        type="button"
        class="
          bg-[#8DD6FF]
          rounded-[4px]
          text-[11px]
          leading-[13px]
          px-[10px]
          py-[5px]
        "
      >
        Добавить
      </button>

      <div class="table mt-2">
        <div class="table__head border-b border-borderColor">
          <div
            v-for="(name, index) in arrayForTable"
            :key="index"
            class="table__cell"
          >
            {{ name }}
          </div>
        </div>
        <div class="table__body">
          <div
            v-for="(name, index) in arrayForTable"
            :key="index"
            class="table__cell"
          >
            -
          </div>
        </div>
      </div>
    </div>

    <field-text id="share-note" label="Общая оговорка" class="mb-[24px]" />

    <div class="form__footer">
      <div class="float-right">
        <button
          type="button"
          class="
            rounded-[4px]
            text-textGray text-[12px]
            leading-[18px]
            px-[14px]
            py-[6px]
            mr-[22px]
          "
        >
          Отмена
        </button>
        <button
          type="button"
          class="
            bg-[#FFE316]
            rounded-[4px]
            text-textBlack text-[12px]
            leading-[18px]
            px-[14px]
            py-[6px]
          "
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FieldDate from './FieldDate.vue';
import FieldSelect from './FieldSelect.vue';
import FieldText from './FieldText.vue';

export default {
  components: { FieldSelect, FieldText, FieldDate },

  data() {
    return {
      arrayForTable: [
        'Номер места',
        'Наименование груза',
        'Укрупненное наименование груза',
        'Род упаковки список выбор',
        'Класс опасности',
        '№ контейнера',
        '№ сегмента',
        'Диаметр',
        'Толщина стенки',
        'Длина',
        'Ширина',
        'Высота',
        'Кол-во мест',
        'Вес',
        'Ф\\Е',
        'Оговорка',
      ],
    };
  },
};
</script>

<style lang="postcss">
.form {
  &__header {
    @apply text-[14px];
    @apply leading-[16px];
    @apply font-bold;
    @apply mb-[14px];
  }
  &__body {
    @apply grid;
    @apply grid-cols-[321px,321px,1fr];
    @apply gap-[65px];
  }
}
</style>
