const MS_IN_DAY = 86400000;//или лучше формулой?
class NewsApi {
  constructor (baseUrl, languige, parameters) {
    this.baseUrl = baseUrl;
    this.languige = languige;
    this.parameters = parameters;
  }
  getNews(searchWord) {
    const currentDate = new Date();
    const previousDateInMs = 6 * MS_IN_DAY;
    const previousDate = new Date(currentDate.getTime()-previousDateInMs);
    const fromDate = previousDate.toISOString().slice(0, 10);
    const toDate = currentDate.toISOString().slice(0,10);

    return fetch (`${this.baseUrl}${searchWord}$from=${fromDate}&to=${toDate}&language=ru&${this.parameters}`)

    .then(res => res.ok ? Promise.resolve(res.json()) : Promise.reject(`Ошибка: ${res.status}`))
  }
}

