import {URL_START, URL_END, MS_IN_DAY} from '../constants/constants.js'

class NewsApi {
  constructor (baseUrl, parameters) {
    this.baseUrl = baseUrl;
    this.parameters = parameters;
    this.getNews = this.getNews.bind(this);
  }

  async getNews(searchWord) {
    const currentDate = new Date();
    const previousDateInMs = 6 * MS_IN_DAY;
    const previousDate = new Date(currentDate.getTime()-previousDateInMs);
    const fromDate = previousDate.toISOString().slice(0, 10);
    const toDate = currentDate.toISOString().slice(0,10);
    console.log(`${this.baseUrl}${searchWord}&from=${fromDate}&to=${toDate}&language=ru&${this.parameters}`);

    const res = await fetch(`${this.baseUrl}${searchWord}&from=${fromDate}&to=${toDate}&language=ru&${this.parameters}`);
    return await (res.ok ? Promise.resolve(res.json()) : Promise.reject(`Ошибка: ${res.status}`));
  }
}
const newsApi = new NewsApi(URL_START, URL_END);
