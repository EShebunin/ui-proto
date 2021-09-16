import { ref } from 'vue';
import { getProperties } from '@/api';

export default function useReferences() {
  /**
   * Массив с объектами "Укрупненное наименование груза"
   * @type {import('@vue/reactivity').ToRef<Array<{id: Number, name: String}>>}
   * */
  const bigArray = ref([]);

  /** Получение массива "Укрепненных наименований груза" */
  const getBigArray = async () => {
    bigArray.value = await getProperties('big');
  };

  /**
   * Массив с объектами "Объектов"
   * @type {import('@vue/reactivity').ToRef<Array<{id: Number, name: String}>>}
   * */
  const objectArray = ref([]);

  /** Получение массива "Объектов" */
  const getObjectArray = async () => {
    objectArray.value = await getProperties('object');
  };

  /**
   * Массив с объектами "Место складирования в порту"
   * @type {import('@vue/reactivity').ToRef<Array<{id: Number, name: String}>>}
   * */
  const placeArray = ref([]);

  /** Получение массива "Место складирования в порту" */
  const getPlaceArray = async () => {
    placeArray.value = await getProperties('place');
  };

  /**
   * Массив с объектами "Порт"
   * @type {import('@vue/reactivity').ToRef<Array<{id: Number, name: String}>>}
   * */
  const portArray = ref([]);

  /** Получение массива "Порт" */
  const getPortArray = async () => {
    portArray.value = await getProperties('port');
  };

  /**
   * Массив с объектами "Грузополучатель"
   * @type {import('@vue/reactivity').ToRef<Array<{id: Number, name: String}>>}
   * */
  const receiverArray = ref([]);

  /** Получение массива "Грузополучатель" */
  const getReceiverArray = async () => {
    receiverArray.value = await getProperties('receiver');
  };

  /**
   * Массив с объектами "Грузоотправитель"
   * @type {import('@vue/reactivity').ToRef<Array<{id: Number, name: String}>>}
   * */
  const senderArray = ref([]);

  /** Получение массива "Грузоотправитель" */
  const getSenderArray = async () => {
    senderArray.value = await getProperties('sender');
  };

  /**
   *  Массив с объектами "Тип операции"
   * @type {import('@vue/reactivity').ToRef<Array<{id: Number, name: String}>>}
   * */
  const typeArray = ref([]);

  /** Получение массива "Тип операции" */
  const getTypeArray = async () => {
    typeArray.value = await getProperties('type');
  };

  return {
    bigArray,
    objectArray,
    placeArray,
    portArray,
    receiverArray,
    senderArray,
    typeArray,
    getBigArray,
    getObjectArray,
    getPlaceArray,
    getPortArray,
    getReceiverArray,
    getSenderArray,
    getTypeArray,
  };
}
