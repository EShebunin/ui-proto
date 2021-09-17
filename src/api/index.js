import makeRequest from './makeRequest';

export async function getTableInfo() {
  const { data } = await makeRequest({
    url: '/doc',
    method: 'GET',
  });
  return data;
}

export async function getProperties(property) {
  const { data } = await makeRequest({
    url: `/properties/${property}`,
    method: 'GET',
  });

  return data;
}

export async function sendDocToBackend(objectDoc) {
  const { data } = await makeRequest({
    url: '/doc/1',
    method: 'PUT',
    data: objectDoc,
  });

  return data;
}
