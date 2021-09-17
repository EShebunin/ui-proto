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
    <h2 class="form__header">
      <span>Прием груза&nbsp;</span>
      <span v-if="shippingName">({{ shippingName }})</span>
    </h2>

    <div class="form__body mb-[14px]">
      <div>
        <div class="flex justify-between mb-[12px]">
          <field-select
            v-model="port"
            :options="portArray"
            label="Порт выгрузки"
            class="w-full mr-[27px]"
          />
          <!-- TODO: Добавить справочник тип транспорта -->
          <field-select
            v-model="transport"
            :options="transportOptions"
            label="Вид ТС"
            class="max-w-[90px]"
          />
        </div>

        <field-select
          v-model="sender"
          :options="senderArray"
          label="Грузооправитель"
          class="mb-[12px]"
        />
        <field-select
          v-model="receiver"
          :options="receiverArray"
          label="Грузополучатель"
          class="mb-[12px]"
        />
        <field-select
          v-model="place"
          :options="placeArray"
          label="Место складирования в порту"
        />
      </div>

      <div>
        <div class="flex justify-between mb-[12px]">
          <field-select
            v-model="object"
            :options="objectArray"
            label="Объект"
            class="max-w-[90px]"
          />
          <field-text
            id="number-transport"
            v-model="transport_tag"
            label="Номер ТС"
            class="max-w-[90px]"
          />
          <field-text
            id="waybill"
            v-model="tag"
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
            v-model="send_date"
            label="Дата отгрузки"
            class="max-w-[120px]"
          />
        </div>

        <div class="flex justify-between mb-[12px]">
          <field-text
            id="danger-level"
            v-model="danger_class"
            label="Кл. опасности"
            class="max-w-[90px]"
          />
          <field-date
            id="date-in"
            v-model="receive_date"
            label="Дата приемки"
            class="max-w-[120px]"
          />
        </div>

        <field-select
          v-model="big"
          :options="bigArray"
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
              v-for="(value, key) in headTable"
              :key="key"
              class="modal-table__cell break-words"
            >
              {{ value }}
            </th>
          </tr>
        </thead>

        <tbody class="modal-table__body">
          <tr
            v-for="(row, indexRow) in dataTable"
            :key="indexRow"
            class="modal-table__row"
          >
            <td
              v-for="(value, key) in row"
              :key="key"
              class="modal-table__cell break-all"
            >
              <field-contenteditable
                v-model="row[key]"
                tag="span"
                :contenteditable="true"
                :no-n-l="true"
                :no-h-t-m-l="true"
                class="
                  text-[12px] text-textBlack
                  leading-[14px]
                  inline-block
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
      v-model="extra"
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
import FieldContenteditable from 'vue-contenteditable';
import FieldDate from './FieldDate.vue';
import FieldSelect from './FieldSelect.vue';
import FieldText from './FieldText.vue';

import useReferences from '@/composables/useReferences';

export default {
  components: { FieldSelect, FieldText, FieldDate, FieldContenteditable },

  props: {
    shippingName: { type: String, default: '', required: false },
  },

  emits: ['closeForm'],

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
      headTable: {
        name: 'Наименование груза',
        inplace_count: 'Кол-во мест',
        pipe_tag: 'Род упаковки',
        weight: 'Вес брутто',
        length: 'Длина',
        width: 'Ширина',
        height: 'Высота',
        segment_number: '№ сегмента',
        diameter: 'Диаметр',
        thickness: 'Толщина стенки',
        place_number: 'Номер места',
        extra: 'Оговорка',
        fu: 'Ф/Е',
      },
      dataTable: [],

      /** Порт выгрузки */
      port: { id: '', name: '' },

      /** Вид ТС */
      transport: { id: '', name: '' },
      // TODO: добавить справочник вида авто
      transportOptions: [{ id: 1, name: 'Авто' }],
      /** Грузооправитель */
      sender: { id: '', name: '' },
      /** Грузополучатель */
      receiver: { id: '', name: '' },
      /** Место складирования в порту */
      place: { id: '', name: '' },
      /** Объект */
      object: { id: '', name: '' },
      /** Укрупненное наименование груза */
      big: { id: '', name: '' },
      /** Номер ТС */
      transport_tag: '',
      /** ТН/ЖДН/КС */
      tag: '',
      /** Приемный акт */
      act: '',
      /** Кл. опасности */
      danger_class: '',
      /** Дата отгрузки */
      send_date: '',
      /** Дата приемки */
      receive_date: '',
      /** Договор поставки */
      contract: '',
      /** Общая оговорка */
      extra: '',
    };
  },

  computed: {
    /** Проверка формы на корректность заполнения данными */
    isNotValidForm() {
      return (
        !this.big.id &&
        !this.contract &&
        !this.danger_class &&
        !this.object.id &&
        !this.port.id &&
        !this.place.id &&
        !this.receive_date &&
        !this.send_date &&
        !this.sender.id &&
        !this.receiver.id &&
        !this.tag &&
        !this.transport_tag &&
        !this.transport.id
      );
    },
  },

  methods: {
    addRowTable() {
      this.dataTable.push({
        name: '',
        inplace_count: '',
        pipe_tag: '',
        weight: '',
        length: '',
        width: '',
        height: '',
        segment_number: '',
        diameter: '',
        thickness: '',
        place_number: '',
        extra: '',
        fu: '',
      });
    },

    save() {
      if (!this.isNotValidForm) {
        const document = {
          big: this.big.id,
          contract: this.contract,
          danger_class: this.danger_class,
          entities: this.dataTable,
          extra: this.extra,
          // id: 1, Как я его сформирую?
          object: this.object.id,
          place: this.place.id,
          port: this.port.id,
          receive_date: this.receive_date,
          receiver: this.receiver.id,
          send_date: this.send_date,
          sender: this.sender.id,
          tag: this.tag,
          transport_tag: this.transport_tag,
          transport_type: this.transport.id,
          type: 1,
        };

        console.log(document);
      } else {
        console.log('не сформирован документ');
      }

      // this.$emit('closeForm');
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
