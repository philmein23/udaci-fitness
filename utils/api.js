import { AsyncStorage } from 'react-native';
import { CALENDAR_STORAGE_KEY } from './_calendar';

export function submitEntry({ key, value }) {
  return AsyncStorage.setItem(
    CALENDAR_STORAGE_KEY,
    JSON.stringify({
      [key]: value
    })
  );
}

export function removeEntry({ key }) {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(entry => {
    const data = JSON.parse(entry);
    data[key] = undefined;

    delete entry[key];

    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
  });
}
