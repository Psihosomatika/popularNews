import { MS_IN_DAY} from '../constants/constants.js'

export default class NewsApi {
  constructor (baseUrl, parameters) {
    this.baseUrl = baseUrl;
    this.parameters = parameters;
    this.getNews = this.getNews.bind(this);
  }

  async getNews(searchWord) {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const currentDate = new Date();
    const previousDateInMs = 6 * MS_IN_DAY;
    const previousDate = new Date(currentDate.getTime()-previousDateInMs);
    const fromDate = previousDate.toISOString().slice(0, 10);
    const toDate = currentDate.toISOString().slice(0,10);

    const res = await fetch(`${proxyurl}` + `${this.baseUrl}${searchWord}&from=${fromDate}&to=${toDate}&language=ru&${this.parameters}`);
    return await (res.ok ? Promise.resolve(res.json()) : Promise.reject(`Ошибка: ${res.status}`));

  }
}
