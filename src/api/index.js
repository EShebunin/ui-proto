// import makeRequest from './makeRequest';

import { debugProperties, debugTableInfo } from '@/debug';

/** @returns {Promise<Array>} */
export async function getTableInfo() {
  const { data } = await debugTableInfo();

  return data;
}

/** @returns {Promise<Array<{id: Number, name: String}>>} */
export async function getProperties(property) {
  const { data } = await debugProperties(property);

  return data;
}
