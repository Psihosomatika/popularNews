
class GithubApi {
  constructor (url) {
    this.url = url;
  }
  getCommits (){
    return fetch (url)

    .then(res => res.ok ? Promise.resolve(res.json()) : Promise.reject(`Ошибка: ${res.status}`))
  }
}

