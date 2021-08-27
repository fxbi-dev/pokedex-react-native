import * as axios from 'axios';

// axios-cache-adapter with localforage is used due to the PokeApi rule to cache every request as possible
import { setupCache } from 'axios-cache-adapter';
import localforage from 'localforage'
import { driverWithSerialization } from '@aveq-research/localforage-asyncstorage-driver';

// There are no types for this one :c
import { TextEncoder, TextDecoder } from 'text-encoding-polyfill';

export let axiosInstance: axios.AxiosInstance;

export async function init() {
  console.debug('Axios cache init started')
  const cacheDriver = driverWithSerialization({
    serialize: (value, callback) => {
      callback(JSON.stringify(value), null)
    },
    deserialize: (value) => {
      return JSON.parse(value)
    },
    stringToBuffer: (string) => {
      return new TextEncoder().encode(string)
    },
    bufferToString: (buffer) => {
      return new TextDecoder().decode(buffer)
    }
  });
  await localforage.defineDriver(cacheDriver);
  await localforage.setDriver(cacheDriver._driver);

  const cache = setupCache({
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    store: localforage,
    limit: false,
    clearOnStale: true,
    // debug: true,
  })
  
  axiosInstance = axios.default.create({
    adapter: cache.adapter,
  }) 
  console.debug('Axios cache init ended')
}

export const BASE_URL = 'https://pokeapi.co/api/v2';