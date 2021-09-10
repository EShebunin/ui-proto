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
          <field-select
            v-model="waterfront"
            :options="waterfrontOptions"
            label="Порт выгрузки"
            class="w-full mr-[27px]"
          />
          <field-select
            v-model="transport"
            :options="transportOptions"
            label="Вид ТС"
            class="max-w-[90px]"
          />
        </div>

        <field-select
          v-model="sender"
          :options="senderOptions"
          label="Грузооправитель"
          class="mb-[12px]"
        />
        <field-select
          v-model="recipient"
          :options="recipientOptions"
          label="Грузополучатель"
          class="mb-[12px]"
        />
        <field-select
          v-model="place"
          :options="placeOptions"
          label="Место складирования в порту"
        />
      </div>

      <div>
        <div class="flex justify-between mb-[12px]">
          <field-select
            v-model="objectPlace"
            :options="objectPlaceOptions"
            label="Объект"
            class="max-w-[90px]"
          />
          <field-text
            id="number-transport"
            v-model="numberTransport"
            label="Номер ТС"
            class="max-w-[90px]"
          />
          <field-text
            id="waybill"
            v-model="waybill"
            label="ТН/ЖДН"
            class="max-w-[120px]"
          />
        </div>

        <div class="flex justify-between mb-[12px]">
          <field-text
            id="act"
            v-model="act"
            label="Приемный акт"
            class="max-w-[90px]"
          />
          <field-date
            id="date-out"
            v-model="dateOut"
            label="Дата отгрузки"
            class="max-w-[120px]"
          />
        </div>

        <div class="flex justify-between mb-[12px]">
          <field-text
            id="danger-level"
            v-model="dangerLevel"
            label="Кл. опасности"
            class="max-w-[90px]"
          />
          <field-date
            id="date-in"
            v-model="dateIn"
            label="Дата приемки"
            class="max-w-[120px]"
          />
        </div>

        <field-select
          v-model="fullName"
          :options="fullNameOptions"
          label="Укрупненное наименование груза"
        />
      </div>

      <div class="flex justify-self-end">
        <field-text
          id="contract"
          v-model="contract"
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
          active:bg-opacity-50
        "
        @click="addRowTable"
      >
        Добавить
      </button>

      <table class="modal-table mt-2">
        <thead class="modal-table__head">
          <tr>
            <th
              v-for="item in arrayForHeadTable"
              :key="item.id"
              class="modal-table__cell break-words"
            >
              {{ item.name }}
            </th>
          </tr>
        </thead>

        <tbody class="modal-table__body">
          <tr
            v-for="(array, indexRow) in arrayForDataTable"
            :key="indexRow"
            class="modal-table__row"
          >
            <td
              v-for="(item, indexCol) in array"
              :key="indexCol"
              class="modal-table__cell break-all"
            >
              <field-textarea
                v-model="item.name"
                class="
                  text-[10px] text-textBlack
                  leading-[12px]
                  w-full
                  focus:outline-none focus:ring-2 focus:ring-[#8DD6FF]
                "
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <field-text
      id="share-note"
      v-model="shareNote"
      label="Общая оговорка"
      class="mb-[24px]"
    />

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
          active:bg-textGray active:bg-opacity-50
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
          active:bg-opacity-50
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
import FieldTextarea from './FieldTextarea.vue';

export default {
  components: { FieldSelect, FieldText, FieldDate, FieldTextarea },

  emits: ['closeForm'],

  data() {
    return {
      /** @type {Array.<{id: String name: String}>} */
      arrayForHeadTable: [
        { id: 'name', name: 'Наименование груза' },
        { id: 'count', name: 'Кол-во мест' },
        { id: 'type-pack', name: 'Род упаковки' },
        { id: 'gross-weight', name: 'Вес брутто' },
        { id: 'length', name: 'Длина' },
        { id: 'width', name: 'Ширина' },
        { id: 'height', name: 'Высота' },
        { id: 'num-seg', name: '№ сегмента' },
        { id: 'diameter', name: 'Диаметр' },
        { id: 'thickness', name: 'Толщина стенки' },
        { id: 'num-place', name: 'Номер места' },
        { id: 'note', name: 'Оговорка' },
        { id: 'f-e', name: 'Ф/Е' },
      ],

      /** @type {Array.<{id: String name: String}[]>} */
      arrayForDataTable: [],

      waterfront: { id: 'empty', name: '' },
      waterfrontOptions: [{ id: 1, name: 'Архангельск' }],

      transport: { id: 'empty', name: '' },
      transportOptions: [{ id: 1, name: 'Авто' }],

      sender: { id: 'empty', name: '' },
      senderOptions: [
        { id: 1, name: 'АО "Соединительные детали трубоповодов”' },
      ],

      recipient: { id: 'empty', name: '' },
      recipientOptions: [{ id: 1, name: 'Закнефтегазстрой-Прометей' }],

      place: { id: 'empty', name: '' },
      placeOptions: [{ id: 1, name: 'Площадка сварки' }],

      objectPlace: { id: 'empty', name: '' },
      objectPlaceOptions: [{ id: 1, name: 'СШ' }],

      fullName: { id: 'empty', name: '' },
      fullNameOptions: [{ id: 1, name: 'Трубная продукция' }],

      numberTransport: '',

      waybill: '',

      act: '',

      dangerLevel: '',

      dateOut: '',

      dateIn: '',

      contract: '',

      shareNote: '',
    };
  },

  methods: {
    addRowTable() {
      this.arrayForDataTable.push([
        { id: 'name', name: '' },
        { id: 'count', name: '' },
        { id: 'type-pack', name: '' },
        { id: 'gross-weight', name: '' },
        { id: 'length', name: '' },
        { id: 'width', name: '' },
        { id: 'height', name: '' },
        { id: 'num-seg', name: '' },
        { id: 'diameter', name: '' },
        { id: 'thickness', name: '' },
        { id: 'num-place', name: '' },
        { id: 'note', name: '' },
        { id: 'f-e', name: '' },
      ]);
    },

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
