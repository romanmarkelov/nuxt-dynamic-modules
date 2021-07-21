import axios from 'axios';

export default class HttpClient {
  constructor(timeout) {
    const preparedAxios = axios.create({
      timeout,
    });

    return preparedAxios;
  }
}
