<template>
  <div
    class="
      max-w-[1048px]
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
          :disabled="!placeArray.length"
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

    <div class="form__table mb-[12px] w-full">
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
              v-for="item in headTable"
              :key="item.id"
              :style="{ width: item.size }"
              class="modal-table__cell"
            >
              {{ item.name }}
            </th>
          </tr>
        </thead>

        <tbody class="modal-table__body">
          <tr
            v-for="(row, indexRow) in dataTable"
            :key="indexRow"
            class="modal-table__row"
          >
            <td v-for="item in row" :key="item.id" class="modal-table__cell">
              <field-contenteditable
                v-if="item.id !== 'pipe_tag'"
                v-model="item.name"
                tag="div"
                :contenteditable="true"
                :no-n-l="true"
                :no-h-t-m-l="true"
                class="
                  text-[12px] text-textBlack
                  leading-[14px]
                  w-full
                  h-[30px]
                  focus:outline-none
                  focus:ring-2 focus:ring-[#8DD6FF]
                "
              />
              <field-select
                v-else
                v-model="item.name"
                :options="packageArray"
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

import { sendDocToBackend } from '@/api';
import useReferences from '@/composables/useReferences';
import shippingNames from '@/composables/shippingNames';

export default {
  components: { FieldSelect, FieldText, FieldDate, FieldContenteditable },

  props: {
    shippingName: { type: String, default: '', required: false },
  },

  emits: ['closeForm', 'confirmForm'],

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
      transportArray,
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
      transportArray,
    };
  },

  data() {
    return {
      // Для таличной части
      headTable: [],
      dataTable: [],

      // Общая часть
      /** Порт выгрузки */
      port: { id: '', name: '' },

      /** Вид ТС */
      transport: { id: '', name: '' },
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
    /**
     * Проверка формы на корректность заполнения данными
     * TODO: требуется уточнение
     *  */
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

    /**
     * Модификация видов транспорта под единый вид всех справочников
     */
    transportOptions() {
      return this.transportArray.map((item) => ({
        id: item.id,
        name: item.type,
      }));
    },

    /** Форматирование табличной части для передачи на бек */
    formatEntities() {
      return this.dataTable.map((arr) => {
        const mod = {};
        arr.forEach((object) => {
          if (object.id !== 'pipe_tag') {
            mod[object.id] = object.name;
          } else {
            mod[object.id] = object.name.id;
          }
        });
        return mod;
      });
    },
  },
  mounted() {
    if (this.shippingName === shippingNames.pipes) {
      this.headTable = [
        { id: 'name', name: 'Наименование груза', size: '118px' },
        { id: 'inplace_count', name: 'Кол-во мест', size: '55px' },
        { id: 'pipe_tag', name: 'Род упаковки', size: '90px' },
        { id: 'weight', name: 'Вес брутто (тн)', size: '77px' },
        { id: 'length', name: 'Длина (м)', size: '71px' },
        { id: 'diameter', name: 'Диаметр (м)', size: '87px' },
        { id: 'thickness', name: 'Толщина стенки (м)', size: '74px' },
        { id: 'segment_number', name: '№ сегмента', size: '84px' },
        { id: 'place_number', name: 'Номер места', size: '55px' },
        { id: 'extra', name: 'Оговорка', size: '240px' },
        { id: 'fu', name: 'Ф/Е', size: '46px' },
      ];
    }
    if (this.shippingName === shippingNames.cargo) {
      // this.headTable = {
      //   name: 'Наименование груза',
      //   inplace_count: 'Кол-во мест',
      //   pipe_tag: 'Род упаковки',
      //   weight: 'Вес брутто',
      //   length: 'Длина',
      //   width: 'Ширина',
      //   height: 'Высота',
      //   place_number: 'Номер места',
      //   extra: 'Оговорка',
      //   fu: 'Ф/Е',
      // };
    }
    if (this.shippingName === shippingNames.crisper) {
      // this.headTable = {
      //   name: 'Наименование груза',
      //   inplace_count: 'Кол-во мест',
      //   pipe_tag: 'Род упаковки',
      //   weight: 'Вес брутто',
      //   length: 'Длина',
      //   width: 'Ширина',
      //   height: 'Высота',
      //   crisper_number: '№ контейнера',
      //   place_number: 'Номер места',
      //   extra: 'Оговорка',
      //   fu: 'Ф/Е',
      // };
    }
  },

  methods: {
    addRowTable() {
      let itemForDataTable = {};
      if (this.shippingName === shippingNames.pipes) {
        itemForDataTable = [
          { id: 'name', name: '' },
          { id: 'inplace_count', name: '' },
          { id: 'pipe_tag', name: { id: '', name: '' } },
          { id: 'weight', name: '' },
          { id: 'length', name: '' },
          { id: 'diameter', name: '' },
          { id: 'thickness', name: '' },
          { id: 'segment_number', name: '' },
          { id: 'place_number', name: '' },
          { id: 'extra', name: '' },
          { id: 'fu', name: '' },
        ];
      }
      if (this.shippingName === shippingNames.cargo) {
        // itemForDataTable = {
        //   name: '',
        //   inplace_count: '',
        //   pipe_tag: '',
        //   weight: '',
        //   length: '',
        //   width: '',
        //   height: '',
        //   place_number: '',
        //   extra: '',
        //   fu: '',
        // };
      }
      if (this.shippingName === shippingNames.crisper) {
        // itemForDataTable = {
        //   name: '',
        //   inplace_count: '',
        //   pipe_tag: '',
        //   weight: '',
        //   length: '',
        //   width: '',
        //   height: '',
        //   crisper_number: '',
        //   place_number: '',
        //   extra: '',
        //   fu: '',
        // };
      }

      this.dataTable.push(itemForDataTable);
    },

    async save() {
      const document = {
        big: this.big.id,
        contract: this.contract,
        danger_class: this.danger_class,
        entities: [...this.formatEntities],
        extra: this.extra,
        object: this.object.id,
        place: this.place.id,
        port: this.port.id,
        receive_date: this.receive_date,
        receiver: this.receiver.id,
        send_date: this.send_date,
        sender: this.sender.id,
        tag: this.tag,
        transport_tag: this.transport_tag,
        transport_type: this.transport.name,
        type: 1,
      };

      try {
        await sendDocToBackend(document);
        this.$emit('confirmForm');
      } catch (e) {
        this.$emit('confirmForm');
      }
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

.modal-table {
  @apply table-fixed;
  @apply w-full;
  @apply cursor-default;
  @apply border border-borderColor;

  &__row {
    @apply border-t border-borderColor;
    @apply odd:bg-[#ECEDEE];
  }

  &__cell {
    @apply text-textGray text-left;
    @apply text-[11px];
    @apply leading-[13px];
    @apply p-2;
    @apply border-borderColor;
    @apply border-r;
    @apply last-of-type:border-r-0;
    @apply min-w-[50px];
    @apply break-words;
  }
}
</style>
