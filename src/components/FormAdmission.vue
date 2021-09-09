<template>
  <div
    class="
      max-w-[996px]
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
        <div class="flex justify-between mb-[12px]">
          <field-select label="Порт выгрузки" class="w-full mr-[27px]" />
          <field-select label="Вид ТС" class="max-w-[90px]" />
        </div>

        <field-select label="Грузооправитель" class="mb-[12px]" />
        <field-select label="Грузополучатель" class="mb-[12px]" />
        <field-select label="Место складирования в порту" />
      </div>

      <div>
        <div class="flex justify-between mb-[12px]">
          <field-select label="Объект" class="max-w-[90px]" />
          <field-text
            id="number-vehicle"
            label="Номер ТС"
            class="max-w-[90px]"
          />
          <field-text id="waybill" label="ТН/ЖДН" class="max-w-[120px]" />
        </div>

        <div class="flex justify-between mb-[12px]">
          <field-text id="act" label="Приемный акт" class="max-w-[90px]" />
          <field-date
            id="date-out"
            label="Дата отгрузки"
            class="max-w-[120px]"
          />
        </div>

        <div class="flex justify-between mb-[12px]">
          <field-text
            id="danger-level"
            label="Кл. опасности"
            class="max-w-[90px]"
          />
          <field-date id="date-in" label="Дата приемки" class="max-w-[120px]" />
        </div>

        <field-select label="Укрупненное наименование груза" />
      </div>

      <div class="flex justify-self-end">
        <field-text
          id="contract"
          label="Договор поставки"
          class="max-w-[120px]"
        />
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
          py-[6px]
        "
      >
        Добавить
      </button>

      <table class="modal-table mt-2">
        <thead class="modal-table__head">
          <tr>
            <th
              v-for="(name, index) in arrayForTable"
              :key="index"
              class="modal-table__cell font-normal"
            >
              {{ name }}
            </th>
          </tr>
        </thead>

        <tbody class="modal-table__body">
          <tr>
            <td
              v-for="(name, index) in arrayForTable"
              :key="index"
              class="modal-table__cell"
            >
              -
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <field-text id="share-note" label="Общая оговорка" class="mb-[24px]" />

    <div class="form__footer flex">
      <button
        type="button"
        class="
          rounded-[4px]
          text-textGray text-[12px]
          leading-[18px]
          px-[14px]
          py-[6px]
          mr-[22px]
          ml-auto
        "
        @click="cancel"
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
        @click="save"
      >
        Сохранить
      </button>
    </div>
  </div>
</template>

<script>
import FieldDate from './FieldDate.vue';
import FieldSelect from './FieldSelect.vue';
import FieldText from './FieldText.vue';

export default {
  components: { FieldSelect, FieldText, FieldDate },

  emits: ['closeForm'],

  data() {
    return {
      arrayForTable: [
        'Наименование груза',
        'Кол-во мест',
        'Род упаковки',
        'Вес брутто',
        'Длина',
        'Ширина',
        'Высота',
        '№ сегмента',
        'Диаметр',
        'Толщина стенки',
        'Номер места',
        'Оговорка',
        'Ф/Е',
      ],
    };
  },

  methods: {
    save() {
      this.$emit('closeForm');
    },
    cancel() {
      this.$emit('closeForm');
    },
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
    @apply grid-cols-[321px,348px,1fr];
    @apply gap-[48px];
  }
}
</style>
