import { ref, computed } from 'vue';
import { getProperties } from '@/api';

/**
 * Массив с объектами "Укрупненное наименование груза"
 * @type {import('@vue/reactivity').ToRef<Array<{id: Number, name: String}>>}
 * */
const bigArray = ref([]);
/**
 * Массив с объектами "Объектов"
 * @type {import('@vue/reactivity').ToRef<Array<{id: String}>>}
 * */
const objectArray = ref([]);
/**
 * Массив с объектами "Место складирования в порту"
 * @type {import('@vue/reactivity').ToRef<Array<{id: Number, name: String}>>}
 * */
const placeArray = ref([]);
/**
 * Массив с объектами "Порт"
 * @type {import('@vue/reactivity').ToRef<Array<{id: Number, name: String}>>}
 * */
const portArray = ref([]);
/**
 * Массив с объектами "Грузополучатель"
 * @type {import('@vue/reactivity').ToRef<Array<{id: Number, name: String}>>}
 * */
const receiverArray = ref([]);
/**
 * Массив с объектами "Грузоотправитель"
 * @type {import('@vue/reactivity').ToRef<Array<{id: Number, name: String}>>}
 * */
const senderArray = ref([]);
/**
 *  Массив с объектами "Тип операции"
 * @type {import('@vue/reactivity').ToRef<Array<{id: Number, name: String}>>}
 * */
const typeArray = ref([]);
/**
 * Массив с объектами "Род упаковки"
 * @type {import('@vue/reactivity').ToRef<Array<{id: Number, name: String}>>}
 */
const packageArray = ref([]);

export default function useReferences() {
  /** Получение массива "Укрепненных наименований груза" */
  const getBigArray = async () => {
    bigArray.value = await getProperties('big');
  };

  /** Получение массива "Объектов" */
  const getObjectArray = async () => {
    objectArray.value = await getProperties('object');
  };

  /** Получение массива "Место складирования в порту" */
  const getPlaceArray = async () => {
    placeArray.value = await getProperties('place');
  };

  /** Получение массива "Порт" */
  const getPortArray = async () => {
    portArray.value = await getProperties('port');
  };

  /** Получение массива "Грузополучатель" */
  const getReceiverArray = async () => {
    receiverArray.value = await getProperties('contragent');
  };

  /** Получение массива "Грузоотправитель" */
  const getSenderArray = async () => {
    senderArray.value = await getProperties('contragent');
  };

  /** Получение массива "Тип операции" */
  const getTypeArray = async () => {
    typeArray.value = await getProperties('type');
  };

  /** Получение массива "Род упаковки" */
  const getPackageArray = async () => {
    packageArray.value = await getProperties('package');
  }

  return {
    bigArray,
    objectArray: computed(() =>
      objectArray.value.map((item) => ({ id: item.id, name: item.id })),
    ),
    placeArray,
    portArray,
    receiverArray,
    senderArray,
    typeArray,
    packageArray,
    getBigArray,
    getObjectArray,
    getPlaceArray,
    getPortArray,
    getReceiverArray,
    getSenderArray,
    getTypeArray,
    getPackageArray,
  };
}
