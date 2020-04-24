export default class GithubApi {
  constructor(url) {
    this.url = url;
  }
  async getCommits() {
    const res = await fetch(this.url);
    return await (res.ok ? Promise.resolve(res.json()) : Promise.reject(`Ошибка: ${res.status}`));
  }
}


