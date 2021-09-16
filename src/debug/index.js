import table from './data/table.json';
import big from './data/big.json';
import port from './data/port.json';
import type from './data/type.json';
import contragent from './data/contragent.json';
import object from './data/object.json';
import place from './data/place.json';

export function debugTableInfo() {
  return new Promise((resolve) => resolve({ data: table }));
}

export function debugProperties(property) {
  if (property === 'big') {
    return new Promise((resolve) => resolve({ data: big }));
  }
  if (property === 'object') {
    return new Promise((resolve) => resolve({ data: object }));
  }
  if (property === 'place') {
    return new Promise((resolve) => resolve({ data: place }));
  }
  if (property === 'port') {
    return new Promise((resolve) => resolve({ data: port }));
  }
  if (property === 'contragent') {
    return new Promise((resolve) => resolve({ data: contragent }));
  }
  if (property === 'contragent') {
    return new Promise((resolve) => resolve({ data: contragent }));
  }
  if (property === 'type') {
    return new Promise((resolve) => resolve({ data: type }));
  }
  return undefined;
}

export default {
  debugTableInfo,
};
