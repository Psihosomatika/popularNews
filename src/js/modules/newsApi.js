import { MS_IN_DAY} from '../constants/constants.js'

export default class NewsApi {
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

    const res = await fetch(`${this.baseUrl}${searchWord}&from=${fromDate}&to=${toDate}&language=ru&${this.parameters}`);
    //fetch(`${this.options.baseUrl}q=${phrase}&from=${weekAgo}&to=${currentDate}&pageSize=100&language=${this.options.lang}&sortBy=publishedAt&apiKey=${this.options.apiKey}
    /*const api = new NewsApi({
  baseUrl: 'https://newsapi.org/v2/everything?',
  apiKey: 'e0d4edaf7bc24c56befea2a3b9e45f82',
  lang: 'ru'
  })
  export const URL_START = 'https://newsapi.org/v2/everything?q=';
export const URL_END = 'sortBy=popularity&pageSize=100&apiKey=da509dbac2d74492a4498c044ca28d18';
  */

    return await (res.ok ? Promise.resolve(res.json()) : Promise.reject(`Ошибка: ${res.status}`));

  }
}
